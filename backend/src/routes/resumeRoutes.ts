import { Router, Request, Response } from 'express';
import { mockResumes } from '../data/mockDatabase.js';
import { AIEngineService } from '../services/aiEngine.js';

const router = Router();

let resumes = [...mockResumes];

router.get('/', (req: Request, res: Response) => {
  return res.json({ success: true, resumes });
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const resume = resumes.find(r => r.id === id) || resumes[0];
  return res.json({ success: true, resume });
});

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = resumes.findIndex(r => r.id === id);
  const updatedData = {
    ...req.body,
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  // Re-calculate ATS score on update
  const atsAnalysis = AIEngineService.analyzeResumeATS(updatedData);
  updatedData.atsScore = atsAnalysis.score;

  if (index !== -1) {
    resumes[index] = { ...resumes[index], ...updatedData };
    return res.json({ success: true, resume: resumes[index] });
  } else {
    resumes.push(updatedData);
    return res.json({ success: true, resume: updatedData });
  }
});

router.post('/analyze-ats', (req: Request, res: Response) => {
  const resumeData = req.body.resume || resumes[0];
  const analysis = AIEngineService.analyzeResumeATS(resumeData);
  return res.json({ success: true, analysis });
});

router.post('/enhance-bullet', (req: Request, res: Response) => {
  const { bullet, roleTitle } = req.body;
  const result = AIEngineService.enhanceBulletPoint(bullet, roleTitle);
  return res.json({ success: true, ...result });
});

export default router;
