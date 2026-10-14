import { Router, Request, Response } from 'express';
import { mockAnalyticsData } from '../data/mockDatabase.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.json({
    success: true,
    analytics: mockAnalyticsData
  });
});

export default router;
