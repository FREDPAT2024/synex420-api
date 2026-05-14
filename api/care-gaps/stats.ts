import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../_lib/db';
import { requireAuth, handleOptions, setCors } from '../_lib/auth';

const MEASURES = [
  { code:'HBA1C', label:'HbA1c Test' }, { code:'FOOT_EXAM', label:'Foot Examination' },
  { code:'EYE_EXAM', label:'Retinal / Eye Screening' }, { code:'BP_CHECK', label:'Blood Pressure Check' },
  { code:'STATIN_RX', label:'Statin Review' }, { code:'DM_EDU', label:'Diabetes Education' },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  setCors(res);
  if (!requireAuth(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const db = await connectDB();
    const [diabeticCount, withRecords] = await Promise.all([
      db.collection('patients').countDocuments({ $or: [{ conditions: { $regex:'diabet', $options:'i' } }, { diagnosisCodes: { $in:['E11','E10','E13'] } }] }),
      db.collection('care_records').distinct('patientId'),
    ]);
    const gapsByMeasure = await Promise.all(MEASURES.map(async m => ({
      code: m.code, label: m.label,
      totalRecorded: await db.collection('care_records').countDocuments({ measureCode: m.code }),
    })));
    res.json({ diabeticPatients: diabeticCount, patientsWithRecords: withRecords.length, gapsByMeasure });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
}
