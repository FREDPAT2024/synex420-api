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
      const { status, patientId } = req.query as any;
      const filter: any = {};
      if (status) filter.status = status;
      if (patientId) filter.patientId = patientId;
      const claims = await db.collection('nhif_claims').find(filter).sort({ createdAt: -1 }).limit(500).toArray();
      return res.json(claims);
    } catch (err: any) { return res.status(500).json({ error: err.message }); }
  }

  if (req.method === 'POST') {
    try {
      const { diagnosisCodes, serviceDate, claimedAmount } = req.body;
      const missing = ['patientId','nhifNumber','facilityCode','diagnosisCodes','serviceDate','claimedAmount'].filter(k => !req.body[k]);
      if (missing.length) return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });

      const seq = await db.collection('counters').findOneAndUpdate(
        { _id: 'nhif_claim_seq' as any },
        { $inc: { seq: 1 } },
        { upsert: true, returnDocument: 'after' }
      );
      const claimId = `NHIF-${new Date().getFullYear()}-${String(seq?.seq ?? 1).padStart(5, '0')}`;

      const claim = {
        claimId,
        ...req.body,
        diagnosisCodes: Array.isArray(diagnosisCodes) ? diagnosisCodes : String(diagnosisCodes).split(',').map((s:string) => s.trim()),
        procedureCodes: req.body.procedureCodes || [],
        serviceDate: new Date(serviceDate),
        dischargeDate: req.body.dischargeDate ? new Date(req.body.dischargeDate) : null,
        claimedAmount: Number(claimedAmount),
        approvedAmount: null,
        status: 'Submitted',
        submittedBy: user.email,
        attendingDoctor: req.body.attendingDoctor || user.name,
        submittedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        timeline: [{ event: 'Claim Submitted', by: user.email, at: new Date() }],
      };

      await db.collection('nhif_claims').insertOne(claim);
      return res.status(201).json({ claimId, message: 'Claim submitted successfully' });
    } catch (err: any) { return res.status(500).json({ error: err.message }); }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
