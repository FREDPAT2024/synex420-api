import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../_lib/db';
import { requireAuth, handleOptions, setCors } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  setCors(res);
  const user = requireAuth(req, res);
  if (!user) return;

  const { id } = req.query;
  const db = await connectDB();

  if (req.method === 'GET') {
    try {
      const patient = await db.collection('patients').findOne({ patientId: id });
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
      return res.json(patient);
    } catch (err: any) { return res.status(500).json({ error: err.message }); }
  }

  if (req.method === 'PATCH') {
    try {
      await db.collection('patients').updateOne(
        { patientId: id },
        { $set: { ...req.body, updatedAt: new Date() } }
      );
      return res.json({ success: true });
    } catch (err: any) { return res.status(500).json({ error: err.message }); }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
