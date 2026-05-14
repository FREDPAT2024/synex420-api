import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../_lib/db';
import { requireAuth, handleOptions, setCors } from '../_lib/auth';

const MEASURES = [
  { code: 'HBA1C',     label: 'HbA1c Test',              intervalDays: 90,  priority: 'High' },
  { code: 'FOOT_EXAM', label: 'Foot Examination',        intervalDays: 180, priority: 'High' },
  { code: 'EYE_EXAM',  label: 'Retinal / Eye Screening', intervalDays: 365, priority: 'Medium' },
  { code: 'BP_CHECK',  label: 'Blood Pressure Check',    intervalDays: 30,  priority: 'High' },
  { code: 'STATIN_RX', label: 'Statin Review',           intervalDays: 365, priority: 'Medium' },
  { code: 'DM_EDU',    label: 'Diabetes Education',      intervalDays: 365, priority: 'Low' },
];

function computeGaps(records: any[]) {
  const now = new Date();
  return MEASURES.map(m => {
    const sorted = records.filter(r => r.measureCode === m.code).sort((a,b) => new Date(b.doneAt).getTime() - new Date(a.doneAt).getTime());
    const last = sorted[0] ? new Date(sorted[0].doneAt) : null;
    const due = last ? new Date(last.getTime() + m.intervalDays * 86400000) : new Date(now.getTime() - 1);
    const overdueDays = Math.max(0, Math.floor((now.getTime() - due.getTime()) / 86400000));
    return { ...m, lastDone: last, dueDate: due, overdueDays };
  }).filter(g => g.overdueDays > 0);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  setCors(res);
  if (!requireAuth(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const db = await connectDB();
    const diabetics = await db.collection('patients').find({
      $or: [
        { conditions: { $regex: 'diabet', $options: 'i' } },
        { diagnosisCodes: { $in: ['E11','E10','E13'] } },
      ]
    }).toArray();

    const result = [];
    for (const p of diabetics) {
      const records = await db.collection('care_records').find({ patientId: p.patientId }).toArray();
      const gaps = computeGaps(records);
      if (gaps.length > 0) {
        const lastContact = records.sort((a,b) => new Date(b.doneAt).getTime() - new Date(a.doneAt).getTime())[0]?.doneAt || null;
        result.push({
          patientId: p.patientId,
          patientName: `${p.firstName} ${p.lastName}`,
          phone: p.phone,
          gaps,
          totalGaps: gaps.length,
          highPriorityGaps: gaps.filter(g => g.priority === 'High').length,
          lastContact,
        });
      }
    }
    result.sort((a,b) => b.highPriorityGaps - a.highPriorityGaps || b.totalGaps - a.totalGaps);
    res.json(result);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
}
