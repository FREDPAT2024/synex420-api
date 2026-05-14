import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { connectDB } from '../_lib/db';
import { signToken, handleOptions, setCors } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  setCors(res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, password, name, role = 'clinician' } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'email, password and name are required' });

    const db = await connectDB();
    const existing = await db.collection('users').findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 12);
    const result = await db.collection('users').insertOne({ email, name, role, password: hash, createdAt: new Date() });
    const token = signToken({ id: result.insertedId.toString(), email, name, role });
    res.status(201).json({ token, user: { id: result.insertedId, email, name, role } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
