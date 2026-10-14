import axios from 'axios';
import {
  UserProfile,
  CareerGoal,
  CareerMilestone,
  ResumeData,
  JobOpportunity,
  JobApplication,
  SkillItem,
  InterviewQuestion,
  Mentor,
  CommunityPost
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const api = {
  // Auth & Profile
  getUserProfile: async (): Promise<UserProfile> => {
    try {
      const res = await apiClient.get('/auth/me');
      return res.data.user;
    } catch {
      return defaultFallbackUser;
    }
  },
  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const res = await apiClient.put('/auth/profile', data);
    return res.data.user;
  },

  // Career Goals & Milestones
  getGoals: async (): Promise<CareerGoal[]> => {
    try {
      const res = await apiClient.get('/career/goals');
      return res.data.goals;
    } catch {
      return defaultFallbackGoals;
    }
  },
  createGoal: async (goal: Partial<CareerGoal>): Promise<CareerGoal> => {
    const res = await apiClient.post('/career/goals', goal);
    return res.data.goal;
  },
  updateGoal: async (id: string, updates: Partial<CareerGoal>): Promise<CareerGoal> => {
    const res = await apiClient.put(`/career/goals/${id}`, updates);
    return res.data.goal;
  },
  deleteGoal: async (id: string): Promise<void> => {
    await apiClient.delete(`/career/goals/${id}`);
  },
  getTimeline: async (): Promise<CareerMilestone[]> => {
    try {
      const res = await apiClient.get('/career/timeline');
      return res.data.milestones;
    } catch {
      return defaultFallbackMilestones;
    }
  },
  addMilestone: async (milestone: Partial<CareerMilestone>): Promise<CareerMilestone> => {
    const res = await apiClient.post('/career/timeline', milestone);
    return res.data.milestone;
  },

  // AI Career Coach
  sendCoachMessage: async (messages: { role: string; content: string }[], persona: string = 'tech_lead') => {
    const res = await apiClient.post('/coach/chat', { messages, persona });
    return res.data;
  },
  generateRoadmap: async (currentRole: string, targetRole: string) => {
    const res = await apiClient.post('/coach/roadmap', { currentRole, targetRole });
    return res.data.roadmap;
  },
  getSalaryInsights: async (role: string) => {
    const res = await apiClient.post('/coach/salary-insights', { role });
    return res.data.data;
  },

  // Resume Builder
  getResumes: async (): Promise<ResumeData[]> => {
    try {
      const res = await apiClient.get('/resume');
      return res.data.resumes;
    } catch {
      return [defaultFallbackResume];
    }
  },
  updateResume: async (id: string, data: Partial<ResumeData>): Promise<ResumeData> => {
    const res = await apiClient.put(`/resume/${id}`, data);
    return res.data.resume;
  },
  analyzeATS: async (resume: Partial<ResumeData>) => {
    const res = await apiClient.post('/resume/analyze-ats', { resume });
    return res.data.analysis;
  },
  enhanceBullet: async (bullet: string, roleTitle?: string) => {
    const res = await apiClient.post('/resume/enhance-bullet', { bullet, roleTitle });
    return res.data;
  },

  // Skills
  getSkills: async (): Promise<SkillItem[]> => {
    try {
      const res = await apiClient.get('/skills');
      return res.data.skills;
    } catch {
      return defaultFallbackSkills;
    }
  },
  addSkill: async (skill: Partial<SkillItem>): Promise<SkillItem> => {
    const res = await apiClient.post('/skills', skill);
    return res.data.skill;
  },
  updateSkill: async (id: string, updates: Partial<SkillItem>): Promise<SkillItem> => {
    const res = await apiClient.put(`/skills/${id}`, updates);
    return res.data.skill;
  },
  getSkillGaps: async (role?: string) => {
    const res = await apiClient.get('/skills/gap-analysis', { params: { role } });
    return res.data;
  },

  // Jobs & Applications
  getJobs: async (): Promise<JobOpportunity[]> => {
    try {
      const res = await apiClient.get('/jobs');
      return res.data.jobs;
    } catch {
      return defaultFallbackJobs;
    }
  },
  getApplications: async (): Promise<JobApplication[]> => {
    try {
      const res = await apiClient.get('/jobs/applications');
      return res.data.applications;
    } catch {
      return defaultFallbackApplications;
    }
  },
  createApplication: async (app: Partial<JobApplication>): Promise<JobApplication> => {
    const res = await apiClient.post('/jobs/applications', app);
    return res.data.application;
  },
  updateApplication: async (id: string, updates: Partial<JobApplication>): Promise<JobApplication> => {
    const res = await apiClient.put(`/jobs/applications/${id}`, updates);
    return res.data.application;
  },
  deleteApplication: async (id: string): Promise<void> => {
    await apiClient.delete(`/jobs/applications/${id}`);
  },

  // Interviews
  getQuestions: async (category?: string, difficulty?: string): Promise<InterviewQuestion[]> => {
    try {
      const res = await apiClient.get('/interviews/questions', { params: { category, difficulty } });
      return res.data.questions;
    } catch {
      return defaultFallbackQuestions;
    }
  },
  evaluateAnswer: async (question: string, answer: string, category: string) => {
    const res = await apiClient.post('/interviews/evaluate', { question, answer, category });
    return res.data.evaluation;
  },

  // Network
  getMentors: async (): Promise<Mentor[]> => {
    try {
      const res = await apiClient.get('/network/mentors');
      return res.data.mentors;
    } catch {
      return defaultFallbackMentors;
    }
  },
  bookMentor: async (mentorId: string, preferredDate: string, topic: string) => {
    const res = await apiClient.post('/network/mentors/book', { mentorId, preferredDate, topic });
    return res.data;
  },
  getPosts: async (): Promise<CommunityPost[]> => {
    try {
      const res = await apiClient.get('/network/posts');
      return res.data.posts;
    } catch {
      return defaultFallbackPosts;
    }
  },
  createPost: async (content: string, tags: string[]): Promise<CommunityPost> => {
    const res = await apiClient.post('/network/posts', { content, tags });
    return res.data.post;
  },
  likePost: async (id: string) => {
    const res = await apiClient.post(`/network/posts/${id}/like`);
    return res.data.post;
  },

  // Analytics
  getAnalytics: async () => {
    const res = await apiClient.get('/analytics');
    return res.data.analytics;
  }
};

// Fallbacks to guarantee 100% smooth UI render
const defaultFallbackUser: UserProfile = {
  id: 'user-001',
  name: 'Alex Rivera',
  email: 'alex.rivera@careeros.dev',
  title: 'Full Stack Engineer & AI Systems Builder',
  headline: 'Passionate software architect focused on distributed systems, modern React, and AI agents.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  experienceLevel: 'Mid-Level',
  targetRole: 'Senior Full Stack & AI Engineer',
  targetIndustry: 'B2B SaaS / Developer Tools',
  targetSalary: '$165,000 - $190,000',
  location: 'San Francisco, CA (Open to Remote)',
  bio: 'Building developer infrastructure and user-centric intelligent web apps.',
  github: 'https://github.com/alexrivera-dev',
  linkedin: 'https://linkedin.com/in/alexrivera-eng',
  portfolio: 'https://alexrivera.engineer',
  skills: ['TypeScript', 'React.js', 'Node.js', 'Next.js', 'Python', 'PostgreSQL', 'Docker', 'System Design'],
  readinessScore: 86,
  streakDays: 14
};

const defaultFallbackGoals: CareerGoal[] = [
  {
    id: 'goal-1',
    userId: 'user-001',
    title: 'Master Distributed Systems & High-Load Architecture',
    category: 'Skill',
    targetDate: '2026-11-15',
    progress: 75,
    completed: false,
    priority: 'High',
    keyResults: [
      { id: 'kr-1', text: 'Complete System Design Blueprint (CAP, Partitioning, Sharding)', done: true },
      { id: 'kr-2', text: 'Build a distributed rate limiter in Redis & Go', done: true },
      { id: 'kr-3', text: 'Conduct 3 peer mock system design interviews with Staff engineers', done: false }
    ]
  },
  {
    id: 'goal-2',
    userId: 'user-001',
    title: 'Land a Senior Fullstack / AI Platform Role',
    category: 'Job Search',
    targetDate: '2026-10-30',
    progress: 60,
    completed: false,
    priority: 'High',
    keyResults: [
      { id: 'kr-4', text: 'Refine ATS-tailored resume targeting Tier 1 tech companies', done: true },
      { id: 'kr-5', text: 'Submit 25 curated applications via warm referrals', done: true },
      { id: 'kr-6', text: 'Clear technical onsite interviews with 2+ offers', done: false }
    ]
  }
];

const defaultFallbackMilestones: CareerMilestone[] = [
  {
    id: 'm-1',
    userId: 'user-001',
    title: 'Full Stack Engineer',
    companyOrOrg: 'CloudVanguard Technologies',
    role: 'Full Stack Engineer',
    date: 'Jan 2024 - Present',
    type: 'Work',
    description: 'Spearheaded real-time collaboration engine used by 120k+ daily developers.',
    skillsAcquired: ['TypeScript', 'WebSockets', 'Redis', 'PostgreSQL', 'Docker'],
    icon: 'briefcase'
  }
];

const defaultFallbackResume: ResumeData = {
  id: 'res-001',
  userId: 'user-001',
  title: 'Senior Full Stack & AI Platform Resume (2026 ATS Master)',
  template: 'modern',
  targetRole: 'Senior Full Stack Engineer',
  atsScore: 92,
  lastUpdated: '2026-08-28',
  personalInfo: {
    fullName: 'Alex Rivera',
    email: 'alex.rivera@careeros.dev',
    phone: '+1 (415) 892-4912',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/alexrivera-eng',
    github: 'https://github.com/alexrivera-dev',
    website: 'https://alexrivera.engineer',
    summary: 'High-impact Full Stack & AI Systems Engineer with 4+ years of experience designing fault-tolerant distributed web applications, high-performance real-time UI architectures, and production LLM workflows.'
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Full Stack Engineer',
      company: 'CloudVanguard Technologies',
      location: 'San Francisco, CA',
      startDate: 'Jan 2024',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected and deployed a multi-tenant real-time sync engine using WebSockets and Redis Pub/Sub, serving 120,000+ daily active developers.',
        'Reduced API p99 latency by 42% through automated Redis caching hierarchies, query index optimization, and connection pooling.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2018',
      endDate: '2022',
      gpa: '3.88 / 4.0'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'CareerOS - Open Source AI Career Operating System',
      techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'TailwindCSS'],
      bullets: ['Created an end-to-end career acceleration platform with live ATS resume grading and AI mock interviews.']
    }
  ],
  skills: [
    { category: 'Languages & Core', items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'] },
    { category: 'Frameworks', items: ['React.js', 'Next.js', 'Node.js', 'Express', 'TailwindCSS'] }
  ],
  certifications: [
    { id: 'cert-1', name: 'AWS Certified Solutions Architect - Associate', issuer: 'Amazon Web Services', issueDate: 'Sep 2024' }
  ]
};

const defaultFallbackSkills: SkillItem[] = [
  {
    id: 'sk-1',
    name: 'TypeScript / Modern JavaScript',
    category: 'Frontend',
    level: 94,
    marketDemand: 'Very High',
    targetLevel: 95,
    verified: true,
    recommendedResources: [{ title: 'Total TypeScript Advanced Workshop', type: 'Course', url: '#', timeHours: 12 }]
  },
  {
    id: 'sk-2',
    name: 'React.js & Architecture',
    category: 'Frontend',
    level: 92,
    marketDemand: 'Very High',
    targetLevel: 95,
    verified: true,
    recommendedResources: [{ title: 'React 19 Concurrent Mode Deep Dive', type: 'Docs', url: '#', timeHours: 6 }]
  },
  {
    id: 'sk-3',
    name: 'System Design & High-Load Architecture',
    category: 'System Architecture',
    level: 82,
    marketDemand: 'Very High',
    targetLevel: 90,
    verified: false,
    recommendedResources: [{ title: 'Designing Data-Intensive Applications', type: 'Book', url: '#', timeHours: 25 }]
  }
];

const defaultFallbackJobs: JobOpportunity[] = [
  {
    id: 'job-101',
    title: 'Senior Full Stack Engineer (AI Platform)',
    company: 'Anthropic / Frontier Systems',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
    location: 'San Francisco, CA (Hybrid / Remote)',
    type: 'Full-time',
    salaryRange: '$180,000 - $225,000 + Equity',
    experience: 'Senior',
    description: 'We are seeking a Senior Full Stack Engineer to architect collaborative AI interfaces and agent backends.',
    requiredSkills: ['TypeScript', 'React.js', 'Node.js', 'System Design', 'PostgreSQL'],
    niceToHave: ['Python', 'Docker', 'Redis'],
    postedDaysAgo: 2,
    applicantsCount: 48,
    matchScore: 95,
    matchReasons: ['Matches your core stack: TypeScript, React, Node.js, and System Design'],
    missingSkills: ['Kubernetes in production']
  }
];

const defaultFallbackApplications: JobApplication[] = [
  {
    id: 'app-1',
    userId: 'user-001',
    jobId: 'job-101',
    title: 'Senior Full Stack Engineer (AI Platform)',
    company: 'Anthropic / Frontier Systems',
    location: 'San Francisco, CA',
    salary: '$190,000 + Equity',
    stage: 'Interview',
    appliedDate: '2026-08-20',
    nextStepDate: '2026-09-03',
    notes: 'Technical architecture round scheduled with Staff Engineer on Thursday.'
  }
];

const defaultFallbackQuestions: InterviewQuestion[] = [
  {
    id: 'q-1',
    category: 'System Design',
    difficulty: 'Hard',
    question: 'Design a globally distributed Rate Limiter for an API gateway serving 500,000 requests/second.',
    frameworkTip: 'Requirements -> High-Level -> Algorithm (Token/Sliding Window) -> Redis Cluster & Lua -> Failure modes.',
    sampleAnswer: 'Deploy edge API gateways with local memory caches synchronized asynchronously to multi-region Redis cluster using sliding window Lua scripts.',
    keyPoints: ['Sliding window counter', 'Redis Lua atomic operations', 'Local heuristic fallback'],
    commonMistakes: ['Single DB bottleneck', 'Race conditions without atomic locks']
  }
];

const defaultFallbackMentors: Mentor[] = [
  {
    id: 'men-1',
    name: 'Dr. Priya Sharma',
    title: 'Staff Software Architect & Ex-Google Tech Lead',
    company: 'Frontier AI Systems',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    bio: '14+ years in distributed systems and Staff engineering promotions.',
    expertise: ['System Design', 'Staff Promotion Path', 'Distributed Systems'],
    yearsExperience: 14,
    rating: 4.98,
    reviewsCount: 142,
    hourlyRate: '$140/hr (Free 15-min intro)',
    availableDays: ['Tuesdays', 'Thursdays']
  }
];

const defaultFallbackPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Jordan Taylor',
    authorTitle: 'Senior Infrastructure Engineer @ Datadog',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    timeAgo: '2 hours ago',
    content: '🎉 Just accepted my Staff Engineer offer! Structured mock interview practice made the difference.',
    tags: ['CareerWin', 'StaffEngineer'],
    likesCount: 68,
    commentsCount: 19,
    hasLiked: true
  }
];
