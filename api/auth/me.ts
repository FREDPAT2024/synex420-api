import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAuth, handleOptions, setCors } from '../_lib/auth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;
  setCors(res);
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const user = requireAuth(req, res);
  if (!user) return;
  res.json({ user });
}
