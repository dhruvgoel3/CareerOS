import { Router, Request, Response } from 'express';
import { mockQuestions } from '../data/mockDatabase.js';
import { AIEngineService } from '../services/aiEngine.js';

const router = Router();

let questions = [...mockQuestions];

router.get('/questions', (req: Request, res: Response) => {
  const { category, difficulty } = req.query;
  let filtered = [...questions];
  if (category) {
    filtered = filtered.filter(q => q.category.toLowerCase().includes((category as string).toLowerCase()));
  }
  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty.toLowerCase() === (difficulty as string).toLowerCase());
  }
  return res.json({ success: true, questions: filtered });
});

router.post('/evaluate', (req: Request, res: Response) => {
  const { question, answer, category } = req.body;
  if (!answer || answer.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Please provide an answer to evaluate' });
  }
  const evaluation = AIEngineService.evaluateMockAnswer(question, answer, category || 'Technical');
  return res.json({ success: true, evaluation });
});

router.post('/generate-question', (req: Request, res: Response) => {
  const { role, focusArea } = req.body;
  const customQuestion = {
    id: `custom-q-${Date.now()}`,
    category: focusArea || 'System Design',
    difficulty: 'Medium',
    question: `Design an end-to-end telemetry and alert pipeline for an enterprise ${role || 'AI Application'} supporting 100k concurrent active sessions.`,
    frameworkTip: 'Start with data ingestion scale, time-series aggregation in memory/Redis, downsampling to cold storage, and real-time alert trigger thresholds.',
    sampleAnswer: 'Deploy client-side batching agent -> Edge Load Balancer -> Kafka telemetry topic -> Stream processing engine (Flink) -> Time-Series DB (ClickHouse / InfluxDB) + Alert engine with sliding window threshold triggers.',
    keyPoints: ['Batching at edge to preserve network bandwidth', 'Stream downsampling', 'Dead-letter queues for malformed spans'],
    commonMistakes: ['Synchronous writing to standard relational DB', 'Lack of backpressure handling']
  };
  return res.json({ success: true, question: customQuestion });
});

export default router;
