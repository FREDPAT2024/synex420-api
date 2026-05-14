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
      const claim = await db.collection('nhif_claims').findOne({ claimId: id });
      if (!claim) return res.status(404).json({ error: 'Claim not found' });
      return res.json(claim);
    } catch (err: any) { return res.status(500).json({ error: err.message }); }
  }

  if (req.method === 'PATCH') {
    try {
      const { status, approvedAmount, rejectionReason } = req.body;
      const validStatuses = ['Submitted','Under Review','Approved','Partially Approved','Rejected','Paid'];
      if (status && !validStatuses.includes(status))
        return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });

      const update: any = { status, updatedAt: new Date() };
      if (approvedAmount != null) update.approvedAmount = Number(approvedAmount);
      if (rejectionReason) update.rejectionReason = rejectionReason;

      const result = await db.collection('nhif_claims').updateOne(
        { claimId: id },
        {
          $set: update,
          $push: { timeline: { event: `Status → ${status}`, by: user.email, at: new Date() } } as any,
        }
      );
      if (result.matchedCount === 0) return res.status(404).json({ error: 'Claim not found' });
      return res.json({ success: true });
    } catch (err: any) { return res.status(500).json({ error: err.message }); }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
