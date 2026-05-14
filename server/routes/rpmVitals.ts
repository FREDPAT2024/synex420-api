import { Router, Response } from 'express';
import { getDB } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

/**
 * RPM Vitals — Module 2
 * Remote Patient Monitoring: records and retrieves patient vitals.
 * Supports alert thresholds for automated flagging.
 */

// Alert threshold definitions (clinical standards)
const THRESHOLDS = {
  systolic: { low: 90, high: 160 },
  diastolic: { low: 60, high: 100 },
  hr: { low: 50, high: 110 },
  temp: { low: 36.0, high: 38.5 },
  spO2: { low: 94, high: 100 },
  rbs: { low: 3.9, high: 11.1 },  // mmol/L
  weight: { low: 30, high: 300 },
};

function evaluateAlerts(data: any): string[] {
  const alerts: string[] = [];
  const bp = data.bp?.split('/');
  if (bp?.length === 2) {
    const sys = Number(bp[0]);
    const dia = Number(bp[1]);
    if (sys > THRESHOLDS.systolic.high) alerts.push(`HIGH BP: Systolic ${sys} mmHg`);
    if (sys < THRESHOLDS.systolic.low) alerts.push(`LOW BP: Systolic ${sys} mmHg`);
    if (dia > THRESHOLDS.diastolic.high) alerts.push(`HIGH BP: Diastolic ${dia} mmHg`);
  }
  if (data.hr) {
    const hr = Number(data.hr);
    if (hr > THRESHOLDS.hr.high) alerts.push(`TACHYCARDIA: HR ${hr} bpm`);
    if (hr < THRESHOLDS.hr.low) alerts.push(`BRADYCARDIA: HR ${hr} bpm`);
  }
  if (data.temp) {
    const temp = Number(data.temp);
    if (temp > THRESHOLDS.temp.high) alerts.push(`FEVER: Temp ${temp}°C`);
    if (temp < THRESHOLDS.temp.low) alerts.push(`HYPOTHERMIA: Temp ${temp}°C`);
  }
  if (data.spO2) {
    const spo2 = Number(data.spO2);
    if (spo2 < THRESHOLDS.spO2.low) alerts.push(`LOW SpO2: ${spo2}%`);
  }
  if (data.rbs) {
    const rbs = Number(data.rbs);
    if (rbs > THRESHOLDS.rbs.high) alerts.push(`HYPERGLYCAEMIA: RBS ${rbs} mmol/L`);
    if (rbs < THRESHOLDS.rbs.low) alerts.push(`HYPOGLYCAEMIA: RBS ${rbs} mmol/L`);
  }
  return alerts;
}

// GET /api/rpm-vitals — list vitals (optional ?patientId=)
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const filter: any = {};
    if (req.query.patientId) filter.patientId = req.query.patientId;
    if (req.query.hasAlerts === 'true') filter['alerts.0'] = { $exists: true };
    const vitals = await db.collection('rpm_vitals')
      .find(filter)
      .sort({ recordedAt: -1 })
      .limit(200)
      .toArray();
    res.json(vitals);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/rpm-vitals/alerts — all unresolved alerts
router.get('/alerts', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const alertVitals = await db.collection('rpm_vitals')
      .find({ 'alerts.0': { $exists: true }, alertResolved: { $ne: true } })
      .sort({ recordedAt: -1 })
      .limit(100)
      .toArray();
    res.json(alertVitals);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/rpm-vitals/patient/:patientId — latest vitals for one patient
router.get('/patient/:patientId', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const vitals = await db.collection('rpm_vitals')
      .find({ patientId: req.params.patientId })
      .sort({ recordedAt: -1 })
      .limit(50)
      .toArray();
    res.json(vitals);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/rpm-vitals — submit vitals reading
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const { patientId, bp, hr, temp, spO2, rbs, weight, height, bmi, pain, notes, device, source } = req.body;

    if (!patientId) return res.status(400).json({ error: 'patientId is required' });

    // Auto-calculate BMI if weight + height given and bmi not provided
    let calculatedBmi = bmi;
    if (!calculatedBmi && weight && height) {
      const h = Number(height) / 100;
      calculatedBmi = (Number(weight) / (h * h)).toFixed(1);
    }

    const alerts = evaluateAlerts({ bp, hr, temp, spO2, rbs });

    const record = {
      patientId, bp, hr, temp, spO2, rbs,
      weight, height, bmi: calculatedBmi,
      pain: pain || null,
      notes: notes || '',
      device: device || 'Manual',
      source: source || 'Clinical',
      alerts,
      alertResolved: alerts.length === 0,
      recordedAt: new Date(),
      recordedBy: req.user?.email,
      createdAt: new Date(),
    };

    const result = await db.collection('rpm_vitals').insertOne(record);

    // If alerts fired, also write to alert_log
    if (alerts.length > 0) {
      await db.collection('alert_log').insertOne({
        type: 'RPM_VITAL',
        patientId,
        vitalRecordId: result.insertedId,
        alerts,
        resolvedAt: null,
        resolvedBy: null,
        createdAt: new Date(),
      });
    }

    res.status(201).json({
      id: result.insertedId,
      alerts,
      message: alerts.length > 0
        ? `Vitals recorded. ${alerts.length} clinical alert(s) generated.`
        : 'Vitals recorded successfully.',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/rpm-vitals/:id/resolve — resolve an alert
router.patch('/:id/resolve', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const { ObjectId } = await import('mongodb');
    await db.collection('rpm_vitals').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { alertResolved: true, resolvedBy: req.user?.email, resolvedAt: new Date() } }
    );
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
