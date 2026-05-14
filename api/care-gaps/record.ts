import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../_lib/db';
import { requireAuth, handleOptions, setCors } from '../_lib/auth';

const MEASURE_LABELS: Record<string,string> = {
  HBA1C:'HbA1c Test', FOOT_EXAM:'Foot Examination',
  EYE_EXAM:'Retinal / Eye Screening', BP_CHECK:'Blood Pressure Check',
  STATIN_RX:'Statin Review', DM_EDU:'Diabetes Education',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  setCors(res);
  const user = requireAuth(req, res);
  if (!user) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { patientId, measureCode, notes, result: testResult, doneAt } = req.body;
    if (!patientId || !measureCode) return res.status(400).json({ error: 'patientId and measureCode are required' });
    if (!MEASURE_LABELS[measureCode]) return res.status(400).json({ error: `Unknown measureCode. Valid: ${Object.keys(MEASURE_LABELS).join(', ')}` });

    const db = await connectDB();
    await db.collection('care_records').insertOne({
      patientId, measureCode,
      measureLabel: MEASURE_LABELS[measureCode],
      notes: notes || '', result: testResult || '',
      doneAt: doneAt ? new Date(doneAt) : new Date(),
      recordedBy: user.email,
      createdAt: new Date(),
    });
    res.status(201).json({ success: true, message: `${MEASURE_LABELS[measureCode]} recorded for ${patientId}` });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
}
