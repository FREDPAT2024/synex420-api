import { Router, Response } from 'express';
import { getDB } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

/**
 * NHIF Claims — Module 1
 * Handles NHIF/SHA insurance claim submissions for Kenyan facilities.
 */

// GET /api/nhif-claims — list all claims
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const { status, patientId, from, to } = req.query as any;
    const filter: any = {};
    if (status) filter.status = status;
    if (patientId) filter.patientId = patientId;
    if (from || to) {
      filter.serviceDate = {};
      if (from) filter.serviceDate.$gte = new Date(from);
      if (to) filter.serviceDate.$lte = new Date(to);
    }
    const claims = await db.collection('nhif_claims')
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray();
    res.json(claims);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/nhif-claims/:id
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const claim = await db.collection('nhif_claims').findOne({ claimId: req.params.id });
    if (!claim) return res.status(404).json({ error: 'Claim not found' });
    res.json(claim);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/nhif-claims — submit new claim
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const {
      patientId, patientName, nhifNumber, membershipNo,
      scheme, facilityCode, facilityName,
      diagnosisCodes, procedureCodes,
      serviceDate, dischargeDate,
      claimedAmount, items,
      admissionType, wardType, attendingDoctor,
    } = req.body;

    // Validation
    const required = ['patientId', 'nhifNumber', 'facilityCode', 'diagnosisCodes', 'serviceDate', 'claimedAmount'];
    const missing = required.filter(k => !req.body[k]);
    if (missing.length) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
    }

    // Generate claim ID
    const seq = await db.collection('counters').findOneAndUpdate(
      { _id: 'nhif_claim_seq' as any },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    const claimId = `NHIF-${new Date().getFullYear()}-${String(seq?.seq || 1).padStart(5, '0')}`;

    const claim = {
      claimId,
      patientId, patientName, nhifNumber, membershipNo,
      scheme: scheme || 'NHIF',
      facilityCode, facilityName,
      diagnosisCodes: Array.isArray(diagnosisCodes) ? diagnosisCodes : [diagnosisCodes],
      procedureCodes: procedureCodes || [],
      serviceDate: new Date(serviceDate),
      dischargeDate: dischargeDate ? new Date(dischargeDate) : null,
      claimedAmount: Number(claimedAmount),
      approvedAmount: null,
      items: items || [],
      admissionType: admissionType || 'Outpatient',
      wardType: wardType || 'General',
      attendingDoctor: attendingDoctor || req.user?.name,
      status: 'Submitted',
      submittedBy: req.user?.email,
      submittedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      timeline: [{ event: 'Claim Submitted', by: req.user?.email, at: new Date() }],
    };

    await db.collection('nhif_claims').insertOne(claim);
    res.status(201).json({ claimId, message: 'Claim submitted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/nhif-claims/:id/status — update claim status
router.patch('/:id/status', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const { status, approvedAmount, rejectionReason } = req.body;
    const validStatuses = ['Submitted', 'Under Review', 'Approved', 'Partially Approved', 'Rejected', 'Paid'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }
    const update: any = {
      status,
      updatedAt: new Date(),
      $push: { timeline: { event: `Status → ${status}`, by: req.user?.email, at: new Date(), note: rejectionReason } },
    };
    if (approvedAmount != null) update.approvedAmount = Number(approvedAmount);
    if (rejectionReason) update.rejectionReason = rejectionReason;

    const result = await db.collection('nhif_claims').updateOne(
      { claimId: req.params.id },
      { $set: { status, approvedAmount: approvedAmount != null ? Number(approvedAmount) : undefined, updatedAt: new Date() },
        $push: { timeline: { event: `Status → ${status}`, by: req.user?.email, at: new Date() } } as any }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Claim not found' });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/nhif-claims/stats/summary
router.get('/stats/summary', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const [total, submitted, approved, rejected, paid, totalAmount] = await Promise.all([
      db.collection('nhif_claims').countDocuments(),
      db.collection('nhif_claims').countDocuments({ status: 'Submitted' }),
      db.collection('nhif_claims').countDocuments({ status: { $in: ['Approved', 'Partially Approved'] } }),
      db.collection('nhif_claims').countDocuments({ status: 'Rejected' }),
      db.collection('nhif_claims').countDocuments({ status: 'Paid' }),
      db.collection('nhif_claims').aggregate([{ $group: { _id: null, total: { $sum: '$claimedAmount' } } }]).toArray(),
    ]);
    res.json({
      total, submitted, approved, rejected, paid,
      totalClaimedAmount: totalAmount[0]?.total || 0,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
