import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../_lib/db';
import { requireAuth, handleOptions, setCors } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  setCors(res);
  if (!requireAuth(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const db = await connectDB();
    const alerts = await db.collection('rpm_vitals')
      .find({ 'alerts.0': { $exists: true }, alertResolved: { $ne: true } })
      .sort({ recordedAt: -1 }).limit(100).toArray();
    res.json(alerts);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
}
