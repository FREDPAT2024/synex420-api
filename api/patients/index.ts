import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../_lib/db';
import { requireAuth, handleOptions, setCors } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  setCors(res);
  const user = requireAuth(req, res);
  if (!user) return;

  const db = await connectDB();

  if (req.method === 'GET') {
    try {
      const patients = await db.collection('patients').find({}).sort({ createdAt: -1 }).limit(500).toArray();
      return res.json(patients);
    } catch (err: any) { return res.status(500).json({ error: err.message }); }
  }

  if (req.method === 'POST') {
    try {
      const data = { ...req.body, createdAt: new Date(), updatedAt: new Date(), createdBy: user.email };
      const existing = await db.collection('patients').findOne({ patientId: data.patientId });
      if (existing) return res.status(409).json({ error: 'Patient ID already exists' });
      await db.collection('patients').insertOne(data);
      return res.status(201).json({ patientId: data.patientId });
    } catch (err: any) { return res.status(500).json({ error: err.message }); }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
