import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../_lib/db';
import { requireAuth, handleOptions, setCors } from '../_lib/auth';

const THRESHOLDS = {
  systolic: { low: 90, high: 160 }, diastolic: { low: 60, high: 100 },
  hr: { low: 50, high: 110 }, temp: { low: 36.0, high: 38.5 },
  spO2: { low: 94 }, rbs: { low: 3.9, high: 11.1 },
};

function evalAlerts(d: any): string[] {
  const alerts: string[] = [];
  if (d.bp) {
    const [sys, dia] = d.bp.split('/').map(Number);
    if (sys > THRESHOLDS.systolic.high) alerts.push(`HIGH SYSTOLIC BP: ${sys} mmHg`);
    if (sys < THRESHOLDS.systolic.low)  alerts.push(`LOW SYSTOLIC BP: ${sys} mmHg`);
    if (dia > THRESHOLDS.diastolic.high) alerts.push(`HIGH DIASTOLIC BP: ${dia} mmHg`);
    if (dia < THRESHOLDS.diastolic.low)  alerts.push(`LOW DIASTOLIC BP: ${dia} mmHg`);
  }
  if (d.hr) {
    const hr = Number(d.hr);
    if (hr > THRESHOLDS.hr.high) alerts.push(`TACHYCARDIA: HR ${hr} bpm`);
    if (hr < THRESHOLDS.hr.low)  alerts.push(`BRADYCARDIA: HR ${hr} bpm`);
  }
  if (d.temp) {
    const t = Number(d.temp);
    if (t > THRESHOLDS.temp.high) alerts.push(`FEVER: ${t}°C`);
    if (t < THRESHOLDS.temp.low)  alerts.push(`HYPOTHERMIA: ${t}°C`);
  }
  if (d.spO2 && Number(d.spO2) < THRESHOLDS.spO2.low) alerts.push(`LOW SpO2: ${d.spO2}%`);
  if (d.rbs) {
    const r = Number(d.rbs);
    if (r > THRESHOLDS.rbs.high) alerts.push(`HYPERGLYCAEMIA: RBS ${r} mmol/L`);
    if (r < THRESHOLDS.rbs.low)  alerts.push(`HYPOGLYCAEMIA: RBS ${r} mmol/L`);
  }
  return alerts;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  setCors(res);
  const user = requireAuth(req, res);
  if (!user) return;
  const db = await connectDB();

  if (req.method === 'GET') {
    try {
      const filter: any = {};
      if (req.query.patientId) filter.patientId = req.query.patientId;
      if (req.query.hasAlerts === 'true') filter['alerts.0'] = { $exists: true };
      const vitals = await db.collection('rpm_vitals').find(filter).sort({ recordedAt: -1 }).limit(200).toArray();
      return res.json(vitals);
    } catch (err: any) { return res.status(500).json({ error: err.message }); }
  }

  if (req.method === 'POST') {
    try {
      const { patientId } = req.body;
      if (!patientId) return res.status(400).json({ error: 'patientId is required' });

      let bmi = req.body.bmi;
      if (!bmi && req.body.weight && req.body.height) {
        const h = Number(req.body.height) / 100;
        bmi = (Number(req.body.weight) / (h * h)).toFixed(1);
      }

      const alerts = evalAlerts(req.body);
      const record = {
        ...req.body, bmi,
        alerts,
        alertResolved: alerts.length === 0,
        recordedAt: new Date(),
        recordedBy: user.email,
        createdAt: new Date(),
      };

      const result = await db.collection('rpm_vitals').insertOne(record);

      if (alerts.length > 0) {
        await db.collection('alert_log').insertOne({
          type: 'RPM_VITAL', patientId,
          vitalRecordId: result.insertedId,
          alerts, resolvedAt: null, resolvedBy: null, createdAt: new Date(),
        });
      }

      return res.status(201).json({
        id: result.insertedId, alerts,
        message: alerts.length > 0
          ? `Vitals saved. ${alerts.length} alert(s) generated.`
          : 'Vitals recorded successfully.',
      });
    } catch (err: any) { return res.status(500).json({ error: err.message }); }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
