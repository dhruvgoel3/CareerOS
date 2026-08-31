import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { mockUser } from '../data/mockDatabase.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'careeros_secret_jwt_key_2026';

let currentUser = { ...mockUser };

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Standard demo login accepting any password or prefilled credentials
  const token = jwt.sign({ id: currentUser.id, email: currentUser.email }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({
    success: true,
    message: 'Successfully logged in to CareerOS',
    token,
    user: currentUser
  });
});

router.post('/register', (req: Request, res: Response) => {
  const { name, email, targetRole } = req.body;
  currentUser = {
    ...currentUser,
    name: name || currentUser.name,
    email: email || currentUser.email,
    targetRole: targetRole || currentUser.targetRole
  };
  const token = jwt.sign({ id: currentUser.id, email: currentUser.email }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({
    success: true,
    message: 'Account created successfully',
    token,
    user: currentUser
  });
});

router.get('/me', (req: Request, res: Response) => {
  return res.json({
    success: true,
    user: currentUser
  });
});

router.put('/profile', (req: Request, res: Response) => {
  const updates = req.body;
  currentUser = {
    ...currentUser,
    ...updates
  };
  return res.json({
    success: true,
    message: 'Profile updated successfully',
    user: currentUser
  });
});

export default router;
