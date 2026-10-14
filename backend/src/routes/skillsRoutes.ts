import { Router, Request, Response } from 'express';
import { mockSkills, mockUser } from '../data/mockDatabase.js';

const router = Router();

let skills = [...mockSkills];

router.get('/', (req: Request, res: Response) => {
  return res.json({ success: true, skills });
});

router.post('/', (req: Request, res: Response) => {
  const { name, category, level, targetLevel } = req.body;
  const newSkill = {
    id: `sk-${Date.now()}`,
    name,
    category: category || 'Frontend',
    level: level || 70,
    marketDemand: 'High' as const,
    targetLevel: targetLevel || 90,
    verified: false,
    recommendedResources: [
      { title: `Complete Masterclass in ${name}`, type: 'Course' as const, url: 'https://careeros.dev/learn', timeHours: 10 }
    ]
  };
  skills.push(newSkill);
  return res.status(201).json({ success: true, skill: newSkill });
});

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = skills.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Skill not found' });
  }
  skills[index] = { ...skills[index], ...req.body };
  return res.json({ success: true, skill: skills[index] });
});

router.post('/assess', (req: Request, res: Response) => {
  const { skillId, answers } = req.body;
  // Calculate verified score
  const index = skills.findIndex(s => s.id === skillId);
  if (index !== -1) {
    skills[index].verified = true;
    skills[index].level = Math.min(98, skills[index].level + 5);
  }
  return res.json({
    success: true,
    message: 'Skill assessment completed! Verified badge awarded.',
    score: 92,
    skill: index !== -1 ? skills[index] : null
  });
});

router.get('/gap-analysis', (req: Request, res: Response) => {
  const targetRole = req.query.role || mockUser.targetRole;
  
  const gaps = [
    { skill: 'Distributed Systems & High Concurrency', current: 82, required: 92, gap: 10, priority: 'High' },
    { skill: 'Production Kubernetes & Cloud Observability', current: 78, required: 88, gap: 10, priority: 'High' },
    { skill: 'AI Workflows & Vector Embeddings', current: 80, required: 88, gap: 8, priority: 'Medium' },
    { skill: 'Staff-Level Technical Communication', current: 84, required: 90, gap: 6, priority: 'Medium' }
  ];

  return res.json({
    success: true,
    targetRole,
    readinessScore: 86,
    gaps,
    recommendations: [
      'Focus 4 hours/week on Distributed Systems blueprints (Raft consensus, Sharding)',
      'Deploy a containerized microservice to EKS with Prometheus alerts to bridge DevOps gap'
    ]
  });
});

export default router;
