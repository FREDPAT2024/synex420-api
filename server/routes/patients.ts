import { Router, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

// GET /api/patients — list all
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const patients = await db.collection('patients')
      .find({})
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray();
    res.json(patients);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/patients/:id
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const patient = await db.collection('patients').findOne({ patientId: req.params.id });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/patients — register
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const data = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user?.email,
    };
    // Use patientId as unique key
    const existing = await db.collection('patients').findOne({ patientId: data.patientId });
    if (existing) return res.status(409).json({ error: 'Patient ID already exists' });
    await db.collection('patients').insertOne(data);
    res.status(201).json({ patientId: data.patientId });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/patients/:id
router.patch('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    await db.collection('patients').updateOne(
      { patientId: req.params.id },
      { $set: { ...req.body, updatedAt: new Date() } }
    );
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
