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
    const [total, submitted, approved, rejected, paid, amountAgg] = await Promise.all([
      db.collection('nhif_claims').countDocuments(),
      db.collection('nhif_claims').countDocuments({ status: 'Submitted' }),
      db.collection('nhif_claims').countDocuments({ status: { $in: ['Approved','Partially Approved'] } }),
      db.collection('nhif_claims').countDocuments({ status: 'Rejected' }),
      db.collection('nhif_claims').countDocuments({ status: 'Paid' }),
      db.collection('nhif_claims').aggregate([{ $group: { _id: null, total: { $sum: '$claimedAmount' } } }]).toArray(),
    ]);
    res.json({ total, submitted, approved, rejected, paid, totalClaimedAmount: amountAgg[0]?.total || 0 });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
}
