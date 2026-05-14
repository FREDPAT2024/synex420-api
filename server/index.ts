import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import authRoutes from './routes/auth';
import patientRoutes from './routes/patients';
import nhifClaimsRoutes from './routes/nhifClaims';
import rpmVitalsRoutes from './routes/rpmVitals';
import careGapsRoutes from './routes/careGaps';

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Request logger (dev) ───────────────────────────────────
app.use((req, _res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  }
  next();
});

// ── Routes ─────────────────────────────────────────────────
app.use('/api/auth',        authRoutes);
app.use('/api/patients',    patientRoutes);
app.use('/api/nhif-claims', nhifClaimsRoutes);
app.use('/api/rpm-vitals',  rpmVitalsRoutes);
app.use('/api/care-gaps',   careGapsRoutes);

// ── Health check ───────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Synex420 API', ts: new Date().toISOString() });
});

// ── 404 handler ────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// ── Global error handler ───────────────────────────────────
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('[Server Error]', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// ── Start ──────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Synex420 API running on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health\n`);
  });
}).catch(err => {
  console.error('[Fatal] Failed to connect to MongoDB:', err.message);
  process.exit(1);
});
