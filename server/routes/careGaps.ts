import { Router, Response } from 'express';
import { getDB } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

/**
 * Care Gap — Diabetes Module (Module 3)
 *
 * Detects patients with diabetes who are missing key care measures:
 *  - HbA1c test (due every 3 months)
 *  - Foot exam (due every 6 months)
 *  - Eye exam / retinal screening (due every 12 months)
 *  - BP check (due every visit)
 *  - Statin / ACE inhibitor prescription review (annual)
 *  - Diabetes Education attendance (annual)
 *
 * Gaps are computed on-the-fly from care_records collection.
 */

const CARE_MEASURES = [
  { code: 'HBA1C',      label: 'HbA1c Test',              intervalDays: 90,  priority: 'High' },
  { code: 'FOOT_EXAM',  label: 'Foot Examination',        intervalDays: 180, priority: 'High' },
  { code: 'EYE_EXAM',   label: 'Retinal / Eye Screening', intervalDays: 365, priority: 'Medium' },
  { code: 'BP_CHECK',   label: 'Blood Pressure Check',    intervalDays: 30,  priority: 'High' },
  { code: 'STATIN_RX',  label: 'Statin Review',           intervalDays: 365, priority: 'Medium' },
  { code: 'DM_EDU',     label: 'Diabetes Education',      intervalDays: 365, priority: 'Low' },
];

function computeGaps(careRecords: any[]): { code: string; label: string; lastDone: Date | null; dueDate: Date; overdueDays: number; priority: string }[] {
  const now = new Date();
  return CARE_MEASURES.map(measure => {
    const records = careRecords
      .filter(r => r.measureCode === measure.code)
      .sort((a, b) => new Date(b.doneAt).getTime() - new Date(a.doneAt).getTime());
    const last = records[0] ? new Date(records[0].doneAt) : null;
    const due = last
      ? new Date(last.getTime() + measure.intervalDays * 86400000)
      : new Date(now.getTime() - 1); // never done → already overdue
    const overdueDays = Math.max(0, Math.floor((now.getTime() - due.getTime()) / 86400000));
    return { ...measure, lastDone: last, dueDate: due, overdueDays };
  }).filter(g => g.overdueDays > 0);
}

// GET /api/care-gaps — all diabetic patients with open gaps
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    // Get all diabetic patients
    const diabeticPatients = await db.collection('patients')
      .find({ $or: [{ conditions: 'Diabetes' }, { 'conditions': /diabet/i }, { diagnosisCodes: { $in: ['E11', 'E10', 'E13'] } }] })
      .toArray();

    const result = [];
    for (const patient of diabeticPatients) {
      const records = await db.collection('care_records')
        .find({ patientId: patient.patientId })
        .toArray();
      const gaps = computeGaps(records);
      if (gaps.length > 0) {
        result.push({
          patientId: patient.patientId,
          patientName: `${patient.firstName} ${patient.lastName}`,
          phone: patient.phone,
          gaps,
          totalGaps: gaps.length,
          highPriorityGaps: gaps.filter(g => g.priority === 'High').length,
          lastContact: records.sort((a, b) => new Date(b.doneAt).getTime() - new Date(a.doneAt).getTime())[0]?.doneAt || null,
        });
      }
    }

    // Sort by high priority gaps desc
    result.sort((a, b) => b.highPriorityGaps - a.highPriorityGaps || b.totalGaps - a.totalGaps);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/care-gaps/patient/:patientId — gaps for one patient
router.get('/patient/:patientId', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const patient = await db.collection('patients').findOne({ patientId: req.params.patientId });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    const records = await db.collection('care_records')
      .find({ patientId: req.params.patientId })
      .toArray();
    const gaps = computeGaps(records);
    res.json({ patient, gaps, careHistory: records.sort((a, b) => new Date(b.doneAt).getTime() - new Date(a.doneAt).getTime()) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/care-gaps/record — mark a care measure as done
router.post('/record', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const { patientId, measureCode, notes, result: testResult, doneAt } = req.body;
    if (!patientId || !measureCode) {
      return res.status(400).json({ error: 'patientId and measureCode are required' });
    }
    const measure = CARE_MEASURES.find(m => m.code === measureCode);
    if (!measure) {
      return res.status(400).json({ error: `Unknown measureCode. Valid: ${CARE_MEASURES.map(m => m.code).join(', ')}` });
    }
    await db.collection('care_records').insertOne({
      patientId, measureCode,
      measureLabel: measure.label,
      notes: notes || '',
      result: testResult || '',
      doneAt: doneAt ? new Date(doneAt) : new Date(),
      recordedBy: req.user?.email,
      createdAt: new Date(),
    });
    res.status(201).json({ success: true, message: `${measure.label} recorded for patient ${patientId}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/care-gaps/stats — population-level summary
router.get('/stats/summary', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const diabeticCount = await db.collection('patients').countDocuments({
      $or: [{ conditions: 'Diabetes' }, { diagnosisCodes: { $in: ['E11', 'E10', 'E13'] } }],
    });
    // Patients with at least one care record
    const withCareRecords = await db.collection('care_records').distinct('patientId');
    const gapsByMeasure: any[] = [];
    for (const m of CARE_MEASURES) {
      const done = await db.collection('care_records').countDocuments({ measureCode: m.code });
      gapsByMeasure.push({ code: m.code, label: m.label, totalRecorded: done });
    }
    res.json({ diabeticPatients: diabeticCount, patientsWithRecords: withCareRecords.length, gapsByMeasure });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
