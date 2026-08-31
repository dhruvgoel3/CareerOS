import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import coachRoutes from './routes/coachRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import skillsRoutes from './routes/skillsRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';
import interviewsRoutes from './routes/interviewsRoutes.js';
import networkRoutes from './routes/networkRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Socket.io initialization
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'CareerOS API Engine',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/coach', coachRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/interviews', interviewsRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/analytics', analyticsRoutes);

// Real-time socket events
io.on('connection', (socket) => {
  console.log(`🔌 Client connected to CareerOS live stream: ${socket.id}`);

  socket.on('join_coach_session', (data) => {
    socket.join(`coach_${data.userId || 'default'}`);
    socket.emit('coach_status', { online: true, message: 'AI Coach is ready.' });
  });

  socket.on('live_interview_audio_chunk', (data) => {
    // Simulate real-time speech analytics & confidence feedback
    socket.emit('live_interview_feedback', {
      pacing: 'Optimal (135 words/min)',
      fillerWordCount: 0,
      confidenceMeter: 94,
      tone: 'Assertive and structured'
    });
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

server.listen(PORT, () => {
  console.log(`🚀 CareerOS Backend API running smoothly at http://localhost:${PORT}`);
  console.log(`⚡ Health check available at http://localhost:${PORT}/api/health`);
});
