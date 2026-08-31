import { v4 as uuidv4 } from 'uuid';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  title: string;
  headline: string;
  avatarUrl: string;
  experienceLevel: 'Student' | 'Entry-Level' | 'Mid-Level' | 'Senior' | 'Lead / Staff';
  targetRole: string;
  targetIndustry: string;
  targetSalary: string;
  location: string;
  bio: string;
  github: string;
  linkedin: string;
  portfolio: string;
  skills: string[];
  readinessScore: number;
  streakDays: number;
}

export interface CareerGoal {
  id: string;
  userId: string;
  title: string;
  category: 'Skill' | 'Project' | 'Job Search' | 'Networking' | 'Certification';
  targetDate: string;
  progress: number;
  completed: boolean;
  keyResults: { id: string; text: string; done: boolean }[];
  priority: 'High' | 'Medium' | 'Low';
}

export interface CareerMilestone {
  id: string;
  userId: string;
  title: string;
  role: string;
  companyOrOrg: string;
  date: string;
  type: 'Work' | 'Education' | 'Certification' | 'Project' | 'Promotion';
  description: string;
  skillsAcquired: string[];
  icon: string;
}

export interface ResumeData {
  id: string;
  userId: string;
  title: string;
  template: 'modern' | 'minimal' | 'executive' | 'compact';
  targetRole: string;
  atsScore: number;
  lastUpdated: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    summary: string;
  };
  experience: {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    bullets: string[];
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    honors?: string;
  }[];
  projects: {
    id: string;
    title: string;
    techStack: string[];
    link?: string;
    bullets: string[];
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    credentialUrl?: string;
  }[];
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract' | 'Remote';
  salaryRange: string;
  experience: 'Entry-Level' | 'Mid-Level' | 'Senior';
  description: string;
  requiredSkills: string[];
  niceToHave: string[];
  postedDaysAgo: number;
  applicantsCount: number;
  matchScore: number;
  matchReasons: string[];
  missingSkills: string[];
}

export interface JobApplication {
  id: string;
  userId: string;
  jobId?: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  stage: 'Wishlist' | 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';
  appliedDate: string;
  nextStepDate?: string;
  notes: string;
  contactPerson?: string;
  link?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'System Architecture' | 'Soft Skills' | 'Data & AI';
  level: number; // 0 to 100
  marketDemand: 'Very High' | 'High' | 'Moderate';
  targetLevel: number;
  verified: boolean;
  recommendedResources: { title: string; type: 'Course' | 'Book' | 'Project' | 'Docs'; url: string; timeHours: number }[];
}

export interface InterviewQuestion {
  id: string;
  category: 'System Design' | 'Algorithms' | 'Frontend' | 'Backend' | 'Behavioral (STAR)' | 'DevOps';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  frameworkTip: string;
  sampleAnswer: string;
  keyPoints: string[];
  commonMistakes: string[];
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  bio: string;
  expertise: string[];
  yearsExperience: number;
  rating: number;
  reviewsCount: number;
  hourlyRate: string;
  availableDays: string[];
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  hasLiked?: boolean;
}

// Initial Mock Database State
export const mockUser: UserProfile = {
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
  bio: 'Building developer infrastructure and user-centric intelligent web apps. Constantly sharpening systems design and high-performance frontend engineering.',
  github: 'https://github.com/alexrivera-dev',
  linkedin: 'https://linkedin.com/in/alexrivera-eng',
  portfolio: 'https://alexrivera.engineer',
  skills: ['TypeScript', 'React.js', 'Node.js', 'Next.js', 'Python', 'PostgreSQL', 'Docker', 'System Design', 'TailwindCSS', 'Redis'],
  readinessScore: 86,
  streakDays: 14
};

export const mockGoals: CareerGoal[] = [
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
  },
  {
    id: 'goal-3',
    userId: 'user-001',
    title: 'Publish 3 Open Source Engineering Case Studies',
    category: 'Networking',
    targetDate: '2026-12-01',
    progress: 33,
    completed: false,
    priority: 'Medium',
    keyResults: [
      { id: 'kr-7', text: 'Write deep-dive on React 19 Concurrent rendering internals', done: true },
      { id: 'kr-8', text: 'Publish post on building autonomous subagents with WebSocket', done: false },
      { id: 'kr-9', text: 'Reach 1,000 GitHub stars on open-source starter repo', done: false }
    ]
  }
];

export const mockMilestones: CareerMilestone[] = [
  {
    id: 'm-1',
    userId: 'user-001',
    title: 'Full Stack Engineer',
    companyOrOrg: 'CloudVanguard Technologies',
    role: 'Full Stack Engineer',
    date: 'Jan 2024 - Present',
    type: 'Work',
    description: 'Spearheaded real-time collaboration engine used by 120k+ daily developers. Reduced end-to-end latency by 42%.',
    skillsAcquired: ['TypeScript', 'WebSockets', 'Redis Streams', 'PostgreSQL', 'Docker'],
    icon: 'briefcase'
  },
  {
    id: 'm-2',
    userId: 'user-001',
    title: 'AWS Certified Solutions Architect Associate',
    companyOrOrg: 'Amazon Web Services',
    role: 'Certified Architect',
    date: 'Sep 2024',
    type: 'Certification',
    description: 'Scored 920/1000 demonstrating deep mastery in VPC, ECS, S3, IAM, and high-availability multi-region architectures.',
    skillsAcquired: ['AWS', 'Cloud Architecture', 'Security', 'Terraform'],
    icon: 'award'
  },
  {
    id: 'm-3',
    userId: 'user-001',
    title: 'Software Engineer',
    companyOrOrg: 'Nexus Pulse SaaS',
    role: 'Frontend & API Engineer',
    date: 'Jun 2022 - Dec 2023',
    type: 'Work',
    description: 'Engineered analytics dashboards with React & GraphQL, cutting bundle payload by 38% and boosting Lighthouse score to 99.',
    skillsAcquired: ['React', 'GraphQL', 'TailwindCSS', 'Jest', 'CI/CD'],
    icon: 'briefcase'
  },
  {
    id: 'm-4',
    userId: 'user-001',
    title: 'B.S. in Computer Science',
    companyOrOrg: 'University of California, Berkeley',
    role: 'Undergraduate Student',
    date: '2018 - 2022',
    type: 'Education',
    description: 'Graduated Magna Cum Laude. Focused on Algorithms, Operating Systems, and Distributed Computing.',
    skillsAcquired: ['Algorithms', 'Data Structures', 'C++', 'Computer Architecture'],
    icon: 'graduation-cap'
  }
];

export const mockResumes: ResumeData[] = [
  {
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
      summary: 'High-impact Full Stack & AI Systems Engineer with 4+ years of experience designing fault-tolerant distributed web applications, high-performance real-time UI architectures, and production LLM workflows. Proven track record scaling systems to 100k+ MAU with 99.98% uptime.'
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
          'Reduced API p99 latency by 42% (from 320ms to 185ms) through automated Redis caching hierarchies, query index optimization, and connection pooling.',
          'Led a cross-functional team of 5 engineers to deliver the core AI workflow orchestration feature, generating $420,000 in incremental ARR within 90 days.'
        ]
      },
      {
        id: 'exp-2',
        role: 'Software Engineer',
        company: 'Nexus Pulse SaaS',
        location: 'San Francisco, CA',
        startDate: 'Jun 2022',
        endDate: 'Dec 2023',
        current: false,
        bullets: [
          'Engineered responsive analytics dashboards in React, TypeScript, and GraphQL, processing over 15 million metrics queries per day.',
          'Overhauled the web client bundling strategy with code splitting and tree shaking, reducing initial payload by 38% and boosting Lighthouse performance score to 99.',
          'Authored comprehensive E2E test suites in Playwright and unit tests in Jest, raising test coverage from 54% to 89% and eliminating production regressions.'
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
        gpa: '3.88 / 4.0',
        honors: 'Magna Cum Laude, Dean\'s Honor List'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'CareerOS - Open Source AI Career Operating System',
        techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'TailwindCSS', 'Socket.IO'],
        link: 'https://github.com/Bugbaar/CareerOS',
        bullets: [
          'Created an end-to-end career acceleration platform featuring live ATS resume grading, interactive skill gap radar, and AI mock interview simulations.',
          'Implemented modular REST APIs and WebSocket streams for real-time coaching feedback, achieving sub-100ms response evaluation.'
        ]
      },
      {
        id: 'proj-2',
        title: 'Distributed Stream Analytics Engine',
        techStack: ['Go', 'Apache Kafka', 'PostgreSQL', 'Docker'],
        link: 'https://github.com/alexrivera-dev/stream-analytics',
        bullets: [
          'Constructed high-throughput telemetry ingestion pipeline handling 50,000 events/sec with resilient consumer group failover.'
        ]
      }
    ],
    skills: [
      {
        category: 'Languages & Core',
        items: ['TypeScript', 'JavaScript (ES2024)', 'Python', 'Go', 'SQL', 'HTML5/CSS3']
      },
      {
        category: 'Frameworks & Libraries',
        items: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'TailwindCSS', 'Redux Toolkit', 'GraphQL']
      },
      {
        category: 'Cloud, Data & Tools',
        items: ['PostgreSQL', 'Redis', 'MongoDB', 'AWS (S3, ECS, RDS)', 'Docker', 'Git', 'CI/CD']
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect - Associate',
        issuer: 'Amazon Web Services',
        issueDate: 'Sep 2024',
        credentialUrl: 'https://aws.amazon.com/verification'
      }
    ]
  }
];

export const mockSkills: SkillItem[] = [
  {
    id: 'sk-1',
    name: 'TypeScript / Modern JavaScript',
    category: 'Frontend',
    level: 94,
    marketDemand: 'Very High',
    targetLevel: 95,
    verified: true,
    recommendedResources: [
      { title: 'Total TypeScript Advanced Workshop by Matt Pocock', type: 'Course', url: 'https://totaltypescript.com', timeHours: 12 },
      { title: 'TypeScript Compiler API & AST Masterclass', type: 'Docs', url: 'https://github.com/microsoft/TypeScript', timeHours: 8 }
    ]
  },
  {
    id: 'sk-2',
    name: 'React.js & Next.js Architecture',
    category: 'Frontend',
    level: 92,
    marketDemand: 'Very High',
    targetLevel: 95,
    verified: true,
    recommendedResources: [
      { title: 'React 19 Concurrent Mode Deep Dive', type: 'Docs', url: 'https://react.dev', timeHours: 6 },
      { title: 'Building High-Performance Web Applications', type: 'Book', url: 'https://web.dev', timeHours: 14 }
    ]
  },
  {
    id: 'sk-3',
    name: 'Node.js & Express / Microservices',
    category: 'Backend',
    level: 88,
    marketDemand: 'Very High',
    targetLevel: 90,
    verified: true,
    recommendedResources: [
      { title: 'Node.js Internals: Event Loop & libuv', type: 'Course', url: 'https://nodejs.org', timeHours: 10 }
    ]
  },
  {
    id: 'sk-4',
    name: 'System Design & High-Load Architecture',
    category: 'System Architecture',
    level: 82,
    marketDemand: 'Very High',
    targetLevel: 90,
    verified: false,
    recommendedResources: [
      { title: 'Designing Data-Intensive Applications by Martin Kleppmann', type: 'Book', url: 'https://dataintensive.net', timeHours: 25 },
      { title: 'ByteByteGo System Design Pro Course by Alex Xu', type: 'Course', url: 'https://bytebytego.com', timeHours: 20 }
    ]
  },
  {
    id: 'sk-5',
    name: 'PostgreSQL, Redis & Distributed Data',
    category: 'Backend',
    level: 85,
    marketDemand: 'High',
    targetLevel: 90,
    verified: true,
    recommendedResources: [
      { title: 'Use The Index, Luke! Database Tuning Guide', type: 'Docs', url: 'https://use-the-index-luke.com', timeHours: 8 }
    ]
  },
  {
    id: 'sk-6',
    name: 'Docker, Kubernetes & Cloud (AWS)',
    category: 'Cloud & DevOps',
    level: 78,
    marketDemand: 'High',
    targetLevel: 85,
    verified: true,
    recommendedResources: [
      { title: 'Production Kubernetes Deep Dive by Kelsey Hightower', type: 'Course', url: 'https://kubernetes.io', timeHours: 16 }
    ]
  },
  {
    id: 'sk-7',
    name: 'AI Workflows, LLM Prompt Engineering & RAG',
    category: 'Data & AI',
    level: 80,
    marketDemand: 'Very High',
    targetLevel: 90,
    verified: false,
    recommendedResources: [
      { title: 'DeepLearning.AI: Building AI Agents & Vector DBs', type: 'Course', url: 'https://deeplearning.ai', timeHours: 15 }
    ]
  },
  {
    id: 'sk-8',
    name: 'Leadership, Mentorship & Technical Communication',
    category: 'Soft Skills',
    level: 84,
    marketDemand: 'High',
    targetLevel: 90,
    verified: true,
    recommendedResources: [
      { title: 'The Staff Engineer\'s Path by Tanya Reilly', type: 'Book', url: 'https://staffeng.com', timeHours: 12 }
    ]
  }
];

export const mockJobs: JobOpportunity[] = [
  {
    id: 'job-101',
    title: 'Senior Full Stack Engineer (AI Platform)',
    company: 'Anthropic / Frontier Systems',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
    location: 'San Francisco, CA (Hybrid / Remote)',
    type: 'Full-time',
    salaryRange: '$180,000 - $225,000 + Equity',
    experience: 'Senior',
    description: 'We are seeking a Senior Full Stack Engineer to architect collaborative AI interfaces, agent orchestration backends, and low-latency visualization tools.',
    requiredSkills: ['TypeScript', 'React.js', 'Node.js', 'System Design', 'PostgreSQL'],
    niceToHave: ['Python', 'Docker', 'Redis', 'LLM orchestration'],
    postedDaysAgo: 2,
    applicantsCount: 48,
    matchScore: 95,
    matchReasons: [
      'Matches your core stack: TypeScript, React, Node.js, and System Design',
      'Target compensation matches your $165k-$190k baseline expectation',
      'Strong alignment with your AI platform experience and open source contributions'
    ],
    missingSkills: ['Kubernetes in production']
  },
  {
    id: 'job-102',
    title: 'Staff Frontend & Architecture Engineer',
    company: 'Stripe Developer Experience',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=120',
    location: 'Remote (US/Canada)',
    type: 'Full-time',
    salaryRange: '$195,000 - $240,000 + Equity',
    experience: 'Senior',
    description: 'Lead the next evolution of developer portals, API dashboards, and design systems powering millions of global transactions.',
    requiredSkills: ['TypeScript', 'React.js', 'Design Systems', 'Performance Optimization', 'Web Architecture'],
    niceToHave: ['GraphQL', 'Playwright', 'WebAssembly'],
    postedDaysAgo: 4,
    applicantsCount: 76,
    matchScore: 91,
    matchReasons: [
      'Top-tier match on modern React 19 / TypeScript and web performance metrics',
      'Matches your desired remote environment and high-impact scale'
    ],
    missingSkills: ['Large-scale Design System Governance']
  },
  {
    id: 'job-103',
    title: 'AI Systems & Full Stack Software Engineer',
    company: 'Perplexity Labs',
    logo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&q=80&w=120',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salaryRange: '$170,000 - $210,000 + 0.15% Equity',
    experience: 'Mid-Level',
    description: 'Build lightning-fast conversational search experiences and distributed indexing pipelines supporting real-time generative summaries.',
    requiredSkills: ['React.js', 'Node.js', 'Python', 'Redis', 'WebSockets'],
    niceToHave: ['Vector Databases', 'FastAPI', 'AWS'],
    postedDaysAgo: 1,
    applicantsCount: 34,
    matchScore: 89,
    matchReasons: [
      'Excellent match on WebSocket real-time feeds, Redis, and React',
      'Fits your target role title and location'
    ],
    missingSkills: ['Vector indexing algorithms']
  },
  {
    id: 'job-104',
    title: 'Senior Distributed Backend Engineer',
    company: 'Datadog Observability',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=120',
    location: 'New York, NY / Remote',
    type: 'Full-time',
    salaryRange: '$175,000 - $215,000',
    experience: 'Senior',
    description: 'Scale ingestion pipelines processing millions of spans, traces, and metrics per second with ultra-low latency guarantees.',
    requiredSkills: ['Go', 'Distributed Systems', 'Kafka', 'PostgreSQL', 'Docker'],
    niceToHave: ['eBPF', 'Rust', 'Kubernetes'],
    postedDaysAgo: 5,
    applicantsCount: 89,
    matchScore: 82,
    matchReasons: [
      'Matches your distributed systems and Go project foundations',
      'Solid compensation package'
    ],
    missingSkills: ['High-throughput Kafka clustering', 'eBPF telemetry']
  },
  {
    id: 'job-105',
    title: 'Software Engineering Fellow / Intern',
    company: 'OpenAI Research & Applied Eng',
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=120',
    location: 'San Francisco, CA',
    type: 'Internship',
    salaryRange: '$65 - $80 / hr',
    experience: 'Entry-Level',
    description: 'Work alongside research scientists and engineers building evaluation frameworks and interactive developer platforms.',
    requiredSkills: ['Python', 'TypeScript', 'Algorithms', 'Deep Learning Basics'],
    niceToHave: ['PyTorch', 'Next.js'],
    postedDaysAgo: 3,
    applicantsCount: 310,
    matchScore: 84,
    matchReasons: [
      'Great prestige and high hourly rate for research-driven learning',
      'Strong fit with your CS fundamentals and AI enthusiasm'
    ],
    missingSkills: ['PyTorch custom kernels']
  }
];

export const mockApplications: JobApplication[] = [
  {
    id: 'app-1',
    userId: 'user-001',
    jobId: 'job-101',
    title: 'Senior Full Stack Engineer (AI Platform)',
    company: 'Anthropic / Frontier Systems',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$190,000 + Equity',
    stage: 'Interview',
    appliedDate: '2026-08-20',
    nextStepDate: '2026-09-03',
    notes: 'Recruiter screen cleared with high praise. Technical architecture round scheduled with Staff Engineer on Thursday 2 PM.',
    contactPerson: 'Sarah Jenkins (Talent Lead)',
    link: 'https://anthropic.com/careers'
  },
  {
    id: 'app-2',
    userId: 'user-001',
    jobId: 'job-102',
    title: 'Staff Frontend & Architecture Engineer',
    company: 'Stripe Developer Experience',
    location: 'Remote (US)',
    salary: '$210,000 + Equity',
    stage: 'Screening',
    appliedDate: '2026-08-24',
    nextStepDate: '2026-09-02',
    notes: 'Referred by Michael Chang (Staff Eng). Recruiter initial call on Tuesday morning.',
    contactPerson: 'David Miller',
    link: 'https://stripe.com/jobs'
  },
  {
    id: 'app-3',
    userId: 'user-001',
    jobId: 'job-103',
    title: 'AI Systems & Full Stack Software Engineer',
    company: 'Perplexity Labs',
    location: 'San Francisco, CA',
    salary: '$185,000 + 0.15%',
    stage: 'Applied',
    appliedDate: '2026-08-27',
    notes: 'Submitted customized resume with high ATS score 94%. Waiting for hiring manager review.',
    link: 'https://perplexity.ai/careers'
  },
  {
    id: 'app-4',
    userId: 'user-001',
    title: 'Senior Product Engineer',
    company: 'Linear App',
    location: 'Remote (Global)',
    salary: '$180,000',
    stage: 'Wishlist',
    appliedDate: '2026-08-28',
    notes: 'Preparing custom portfolio showcase highlighting synchronous WebSockets and keyboard shortcut architecture.',
    link: 'https://linear.app/careers'
  },
  {
    id: 'app-5',
    userId: 'user-001',
    title: 'Staff Platform Engineer',
    company: 'Vercel Infrastructure',
    location: 'Remote',
    salary: '$220,000',
    stage: 'Offer',
    appliedDate: '2026-07-15',
    nextStepDate: '2026-09-05',
    notes: 'Formal offer received ($205k base + $55k RSU/yr). Reviewing counter-offer strategy with Career Coach!',
    contactPerson: 'Elena Rostova (Director of Engineering)',
    link: 'https://vercel.com/careers'
  }
];

export const mockQuestions: InterviewQuestion[] = [
  {
    id: 'q-1',
    category: 'System Design',
    difficulty: 'Hard',
    question: 'Design a globally distributed Rate Limiter for an API gateway serving 500,000 requests/second.',
    frameworkTip: 'Structure using: 1. Requirements (Functional/Non-Functional) -> 2. High-Level Diagram -> 3. Algorithm (Token Bucket vs Leaky Bucket vs Sliding Window) -> 4. Storage & Concurrency (Redis Cluster, Lua scripts) -> 5. Failure modes & latency.',
    sampleAnswer: 'To handle 500k RPS with sub-5ms latency, we deploy edge API gateways with local token bucket caches synchronized asynchronously to a multi-region Redis cluster using sliding window counters with Lua scripts for atomic increments. We handle network partitions by falling back to local heuristic rate limits.',
    keyPoints: ['Sliding window log vs counter algorithms', 'Redis Lua atomic executions', 'Local memory in-process fast path', 'Consistent hashing across gateway instances'],
    commonMistakes: ['Single point of failure database', 'Race conditions with non-atomic GET-and-SET', 'Ignoring clock drift across servers']
  },
  {
    id: 'q-2',
    category: 'Behavioral (STAR)',
    difficulty: 'Medium',
    question: 'Tell me about a time you had a significant technical disagreement with a teammate or lead. How did you resolve it?',
    frameworkTip: 'Use STAR: Situation (context of conflict) -> Task (what needed to be achieved) -> Action (how you gathered objective data, communicated empathetically, and tested hypotheses) -> Result (the consensus reached and project outcome).',
    sampleAnswer: 'At CloudVanguard, our team was divided between using GraphQL vs REST with HTTP/2 for our real-time notification engine. I set up a measurable benchmark prototype comparing throughput, payload compression, and client caching ergonomics. We reviewed the data collaboratively and reached a unified decision to use GraphQL subscriptions for live feeds while retaining REST for batch exports.',
    keyPoints: ['Data-driven decision making over ego', 'Empathetic listening and acknowledging trade-offs', 'Commitment to team velocity once decided'],
    commonMistakes: ['Blaming the colleague', 'Claiming you were simply 100% right without showing compromise', 'Focusing on personal friction instead of engineering outcome']
  },
  {
    id: 'q-3',
    category: 'Frontend',
    difficulty: 'Medium',
    question: 'Explain how React Concurrent Mode and the useTransition / useDeferredValue hooks work under the hood.',
    frameworkTip: 'Explain fiber reconciliation, priority lanes (SyncLane, TransitionLane), time-slicing with MessageChannel scheduler, and avoiding UI freezes during heavy re-renders.',
    sampleAnswer: 'In React 18+, React splits work into priority lanes. Urgent updates (typing, clicking) run on high-priority sync lanes, while transitions run on low-priority lanes. React uses time-slicing to yield control back to the main thread every 5ms so user inputs never stutter, discarding intermediate fiber work if a higher priority interrupt occurs.',
    keyPoints: ['Fiber work-in-progress tree cloning', 'Time slicing & Scheduler priority queues', 'Difference between useTransition and debounce'],
    commonMistakes: ['Confusing concurrent rendering with multi-threading web workers', 'Assuming useTransition speeds up slow JS execution itself instead of just scheduling']
  },
  {
    id: 'q-4',
    category: 'Algorithms',
    difficulty: 'Medium',
    question: 'Design an LRU (Least Recently Used) Cache with O(1) time complexity for both get() and put() operations.',
    frameworkTip: 'Combine a Hash Map (for O(1) key lookups) with a Doubly Linked List (for O(1) node additions, removals, and promotions to head).',
    sampleAnswer: 'We maintain a doubly linked list where the head represents the most recently accessed node and the tail represents the least recently used node. A hash map stores keys mapped directly to node references in the linked list. On get, we locate the node in O(1) via map and move it to the head. On put, if at capacity, we evict the tail node and delete it from map, then prepend the new node.',
    keyPoints: ['Doubly linked list sentinel head/tail nodes', 'O(1) dictionary pointer lookup', 'Capacity eviction edge cases'],
    commonMistakes: ['Using a single array (O(N) shift operation)', 'Forgetting to update node pointers in both directions']
  },
  {
    id: 'q-5',
    category: 'Backend',
    difficulty: 'Hard',
    question: 'How would you prevent the "Double-Spend" or race condition issue in a high-concurrency payment processing API?',
    frameworkTip: 'Discuss Idempotency Keys, Database Locks (Pessimistic SELECT FOR UPDATE vs Optimistic version columns), Distributed Locks (Redlock), and Event-Driven Sagas.',
    sampleAnswer: 'We enforce three defense layers: 1) Client Idempotency Keys stored with unique constraints in Redis/Postgres. 2) Optimistic concurrency control on account balances with version checks (`WHERE id = ? AND version = ?`). 3) For cross-service transactions, we implement the Saga pattern with transactional outbox and idempotency deduplication on payment webhooks.',
    keyPoints: ['Idempotency keys with TTL', 'Optimistic vs Pessimistic locking trade-offs', 'Transactional outbox pattern'],
    commonMistakes: ['Relying solely on in-memory locks in a distributed multi-server setup', 'Not handling duplicate webhooks from payment gateways']
  }
];

export const mockMentors: Mentor[] = [
  {
    id: 'men-1',
    name: 'Dr. Priya Sharma',
    title: 'Staff Software Architect & Ex-Google Tech Lead',
    company: 'Frontier AI Systems',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    bio: '14+ years in distributed systems, distributed ML infrastructure, and career trajectory mentoring for engineers aiming for Staff/Principal levels.',
    expertise: ['System Design', 'Staff Promotion Path', 'Distributed Systems', 'Salary Negotiation'],
    yearsExperience: 14,
    rating: 4.98,
    reviewsCount: 142,
    hourlyRate: '$140/hr (Free 15-min intro)',
    availableDays: ['Tuesdays', 'Thursdays', 'Saturdays']
  },
  {
    id: 'men-2',
    name: 'Marcus Vance',
    title: 'Director of Engineering & Hiring Manager',
    company: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    bio: 'Conducted over 350+ technical and leadership interviews. I help candidates master behavioral STAR frameworks, resume ATS framing, and offer negotiation.',
    expertise: ['Behavioral Interviews', 'Resume Strategy', 'Executive Presence', 'FAANG Hiring Process'],
    yearsExperience: 11,
    rating: 4.95,
    reviewsCount: 98,
    hourlyRate: '$120/hr',
    availableDays: ['Mondays', 'Wednesdays', 'Fridays']
  },
  {
    id: 'men-3',
    name: 'Elena Wu',
    title: 'Lead Frontend Architect',
    company: 'Vercel / Next.js Contributor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    bio: 'Passionate about modern web performance, React internals, and helping early-to-mid career developers break into tier-1 open-source and developer tooling roles.',
    expertise: ['React 19 & Next.js', 'Web Performance', 'Portfolio Reviews', 'Open Source'],
    yearsExperience: 8,
    rating: 4.99,
    reviewsCount: 114,
    hourlyRate: '$95/hr',
    availableDays: ['Weekends', 'Thursday Evenings']
  }
];

export const mockPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Jordan Taylor',
    authorTitle: 'Senior Infrastructure Engineer @ Datadog',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    timeAgo: '2 hours ago',
    content: '🎉 Just accepted my Staff Engineer offer at Datadog! 3 months ago I was overwhelmed with system design. Using structured mock interview frameworks, practicing out loud, and breaking down rate limiters & caching strategies made the entire difference. Keep pushing everyone!',
    tags: ['CareerWin', 'StaffEngineer', 'InterviewPrep', 'SystemDesign'],
    likesCount: 68,
    commentsCount: 19,
    hasLiked: true
  },
  {
    id: 'post-2',
    authorName: 'Alex Rivera (You)',
    authorTitle: 'Full Stack Engineer & AI Systems Builder',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    timeAgo: '5 hours ago',
    content: '🚀 Open-sourcing CareerOS today! A fully integrated platform for career timelines, live ATS resume building, skill gap radar, and AI coaching. Looking for feedback and fellow contributors!',
    tags: ['OpenSource', 'React', 'TypeScript', 'CareerOS'],
    likesCount: 124,
    commentsCount: 32,
    hasLiked: false
  },
  {
    id: 'post-3',
    authorName: 'Kavita Patel',
    authorTitle: 'Engineering Manager @ Figma',
    authorAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    timeAgo: '1 day ago',
    content: '💡 Hiring tip from an Engineering Manager: The difference between a generic resume and a standout candidate is quantifying outcomes. Instead of "built GraphQL APIs", write "Engineered GraphQL schema serving 15M daily queries, reducing client payload by 38%". Numbers give instant credibility.',
    tags: ['HiringTips', 'ResumeBuilding', 'CareerGrowth'],
    likesCount: 215,
    commentsCount: 44,
    hasLiked: false
  }
];

export const mockAnalyticsData = {
  applicationFunnel: [
    { name: 'Discovered & Wishlist', value: 34, color: '#6366f1' },
    { name: 'Applied', value: 18, color: '#8b5cf6' },
    { name: 'Screenings', value: 8, color: '#ec4899' },
    { name: 'Technical / Onsite', value: 4, color: '#f59e0b' },
    { name: 'Offers Received', value: 2, color: '#10b981' }
  ],
  skillMasteryTrajectory: [
    { month: 'Mar 2026', frontend: 78, backend: 72, systemDesign: 60, aiWorkflows: 45 },
    { month: 'Apr 2026', frontend: 82, backend: 76, systemDesign: 68, aiWorkflows: 58 },
    { month: 'May 2026', frontend: 86, backend: 80, systemDesign: 72, aiWorkflows: 68 },
    { month: 'Jun 2026', frontend: 89, backend: 84, systemDesign: 76, aiWorkflows: 74 },
    { month: 'Jul 2026', frontend: 92, backend: 86, systemDesign: 80, aiWorkflows: 78 },
    { month: 'Aug 2026', frontend: 94, backend: 88, systemDesign: 82, aiWorkflows: 80 }
  ],
  salaryBenchmarking: [
    { percentile: '25th Percentile', salary: 135000, label: 'Entry/Mid Market' },
    { percentile: '50th Percentile (Median)', salary: 160000, label: 'Standard SF/NYC' },
    { percentile: '75th Percentile (Your Target)', salary: 185000, label: 'Tier-1 SaaS' },
    { percentile: '90th Percentile (Top Staff)', salary: 225000, label: 'Top Tier & AI Platforms' }
  ],
  weeklyActivity: [
    { day: 'Mon', problemsSolved: 3, studyHours: 2.5, applicationsSent: 1 },
    { day: 'Tue', problemsSolved: 5, studyHours: 3.5, applicationsSent: 2 },
    { day: 'Wed', problemsSolved: 2, studyHours: 2.0, applicationsSent: 0 },
    { day: 'Thu', problemsSolved: 4, studyHours: 4.0, applicationsSent: 3 },
    { day: 'Fri', problemsSolved: 6, studyHours: 3.0, applicationsSent: 1 },
    { day: 'Sat', problemsSolved: 8, studyHours: 5.0, applicationsSent: 0 },
    { day: 'Sun', problemsSolved: 4, studyHours: 3.0, applicationsSent: 1 }
  ],
  metricsSummary: {
    totalApplications: 18,
    activeInterviews: 3,
    atsResumeScore: 92,
    skillReadinessScore: 86,
    weeklyStudyHours: 23,
    estimatedMarketValue: '$180k - $210k',
    interviewPassRate: '75%'
  }
};
