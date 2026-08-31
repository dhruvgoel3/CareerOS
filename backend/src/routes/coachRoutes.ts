import { Router, Request, Response } from 'express';
import { AIEngineService } from '../services/aiEngine.js';
import { mockUser } from '../data/mockDatabase.js';

const router = Router();

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { messages, persona } = req.body;
    const response = await AIEngineService.generateCoachResponse(
      messages || [],
      persona || 'tech_lead',
      {
        title: mockUser.title,
        targetRole: mockUser.targetRole,
        targetSalary: mockUser.targetSalary
      }
    );
    return res.json({
      success: true,
      message: response,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/roadmap', async (req: Request, res: Response) => {
  const { currentRole, targetRole, timelineMonths } = req.body;
  const target = targetRole || mockUser.targetRole;
  
  const roadmapData = {
    targetRole: target,
    currentRole: currentRole || mockUser.title,
    estimatedDuration: `${timelineMonths || 6} Months`,
    phases: [
      {
        phase: 1,
        title: 'Foundational Systems & Core Deep-Dive',
        duration: 'Month 1-2',
        focus: 'Distributed Systems, Concurrency, and Profiling',
        milestones: [
          'Master Database Sharding, Replication, and ACID vs BASE trade-offs',
          'Optimize query indices and implement Redis distributed caching',
          'Deploy automated load-testing suite with k6 simulating 20k RPS'
        ]
      },
      {
        phase: 2,
        title: 'Architecture & Production Readiness',
        duration: 'Month 3-4',
        focus: 'Event Streams, Resiliency Patterns, and Infrastructure as Code',
        milestones: [
          'Design an Event-Driven service using Kafka/RabbitMQ with dead-letter queues',
          'Set up OpenTelemetry distributed tracing and Grafana dashboard alerts',
          'Author an RFC for zero-downtime database schema migrations'
        ]
      },
      {
        phase: 3,
        title: 'Cross-Functional Leadership & Strategic Delivery',
        duration: 'Month 5-6',
        focus: 'Team Velocity, Mentorship, and System Scale',
        milestones: [
          'Lead technical design review for a Tier-1 business initiative',
          'Conduct 10+ candidate technical interviews and improve hiring rubrics',
          'Publish an internal or open-source engineering post on scaling lessons learned'
        ]
      }
    ]
  };

  return res.json({ success: true, roadmap: roadmapData });
});

router.post('/salary-insights', (req: Request, res: Response) => {
  const { role, location, experience } = req.body;
  return res.json({
    success: true,
    data: {
      role: role || mockUser.targetRole,
      location: location || 'San Francisco, CA / Remote',
      experienceLevel: experience || 'Senior (4-7 YOE)',
      baseSalaryRange: '$170,000 - $205,000',
      totalCompensationRange: '$210,000 - $265,000',
      marketTrend: '+8.4% YoY demand for AI & Distributed Systems engineers',
      topPayingSkills: ['Distributed Systems', 'Kubernetes / Cloud', 'AI Workflows & RAG', 'React 19 / Modern TS'],
      negotiationTips: [
        'Research level-equivalent band (L5 at Google, IC5 at Stripe, Senior at Startups)',
        'Negotiate equity refreshers and signing bonuses rather than getting stuck on base caps',
        'Frame your value in terms of latency reduction and revenue enablement'
      ]
    }
  });
});

export default router;
