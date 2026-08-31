import { Router, Request, Response } from 'express';
import { mockJobs, mockApplications } from '../data/mockDatabase.js';

const router = Router();

let jobs = [...mockJobs];
let applications = [...mockApplications];

// Job listings catalog
router.get('/', (req: Request, res: Response) => {
  const { type, location, experience } = req.query;
  let filtered = [...jobs];

  if (type) {
    filtered = filtered.filter(j => j.type.toLowerCase() === (type as string).toLowerCase());
  }
  if (experience) {
    filtered = filtered.filter(j => j.experience.toLowerCase() === (experience as string).toLowerCase());
  }

  return res.json({ success: true, jobs: filtered });
});

router.get('/applications', (req: Request, res: Response) => {
  return res.json({ success: true, applications });
});

router.post('/applications', (req: Request, res: Response) => {
  const newApp = {
    id: `app-${Date.now()}`,
    userId: 'user-001',
    jobId: req.body.jobId,
    title: req.body.title || 'Software Engineer',
    company: req.body.company || 'Tech Company',
    location: req.body.location || 'Remote',
    salary: req.body.salary || '$160,000',
    stage: req.body.stage || 'Wishlist',
    appliedDate: new Date().toISOString().split('T')[0],
    notes: req.body.notes || '',
    contactPerson: req.body.contactPerson || '',
    link: req.body.link || ''
  };
  applications.push(newApp);
  return res.status(201).json({ success: true, application: newApp });
});

router.put('/applications/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = applications.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }
  applications[index] = { ...applications[index], ...req.body };
  return res.json({ success: true, application: applications[index] });
});

router.delete('/applications/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  applications = applications.filter(a => a.id !== id);
  return res.json({ success: true, message: 'Application deleted' });
});

export default router;
