import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ObjectId } from 'mongodb';
import { connectDB } from '../_lib/db';
import { requireAuth, handleOptions, setCors } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  setCors(res);
  const user = requireAuth(req, res);
  if (!user) return;
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const db = await connectDB();
    await db.collection('rpm_vitals').updateOne(
      { _id: new ObjectId(req.query.id as string) },
      { $set: { alertResolved: true, resolvedBy: user.email, resolvedAt: new Date() } }
    );
    res.json({ success: true });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
}
