import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { mockGoals, mockMilestones, mockUser } from '../data/mockDatabase.js';

const router = Router();

let goals = [...mockGoals];
let milestones = [...mockMilestones];

// Goals endpoints
router.get('/goals', (req: Request, res: Response) => {
  return res.json({ success: true, goals });
});

router.post('/goals', (req: Request, res: Response) => {
  const newGoal = {
    id: `goal-${Date.now()}`,
    userId: mockUser.id,
    title: req.body.title || 'New Career Objective',
    category: req.body.category || 'Skill',
    targetDate: req.body.targetDate || '2026-12-31',
    progress: req.body.progress || 0,
    completed: false,
    priority: req.body.priority || 'Medium',
    keyResults: req.body.keyResults || [
      { id: `kr-${Date.now()}-1`, text: 'Define measurable milestone 1', done: false },
      { id: `kr-${Date.now()}-2`, text: 'Execute implementation & review', done: false }
    ]
  };
  goals.unshift(newGoal);
  return res.status(201).json({ success: true, message: 'Goal created', goal: newGoal });
});

router.put('/goals/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = goals.findIndex(g => g.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Goal not found' });
  }
  goals[index] = { ...goals[index], ...req.body };
  return res.json({ success: true, goal: goals[index] });
});

router.delete('/goals/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  goals = goals.filter(g => g.id !== id);
  return res.json({ success: true, message: 'Goal deleted' });
});

// Milestones / Career Timeline endpoints
router.get('/timeline', (req: Request, res: Response) => {
  return res.json({ success: true, milestones });
});

router.post('/timeline', (req: Request, res: Response) => {
  const newMilestone = {
    id: `m-${Date.now()}`,
    userId: mockUser.id,
    title: req.body.title || 'Career Milestone',
    companyOrOrg: req.body.companyOrOrg || 'Self / Organization',
    role: req.body.role || 'Engineer',
    date: req.body.date || '2026',
    type: req.body.type || 'Work',
    description: req.body.description || '',
    skillsAcquired: req.body.skillsAcquired || [],
    icon: req.body.icon || 'briefcase'
  };
  milestones.unshift(newMilestone);
  return res.status(201).json({ success: true, milestone: newMilestone });
});

router.delete('/timeline/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  milestones = milestones.filter(m => m.id !== id);
  return res.json({ success: true, message: 'Milestone deleted' });
});

// Summary overview
router.get('/overview', (req: Request, res: Response) => {
  const completedGoals = goals.filter(g => g.completed || g.progress === 100).length;
  return res.json({
    success: true,
    data: {
      user: mockUser,
      totalGoals: goals.length,
      completedGoals,
      activeGoals: goals.length - completedGoals,
      totalMilestones: milestones.length,
      streakDays: mockUser.streakDays,
      readinessScore: mockUser.readinessScore
    }
  });
});

export default router;
