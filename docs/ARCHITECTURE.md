# 🏗️ CareerOS Architecture & Design

CareerOS is architected as a modular, full-stack open-source platform combining high-performance React frontends, robust Node.js backend microservices, real-time WebSocket streams, and intelligent career heuristics.

```
┌─────────────────────────────────────────────────────────────┐
│                    CareerOS Frontend                        │
│   (React 18 + TypeScript + Vite + Tailwind + Framer Motion) │
└──────────────┬──────────────────────────────┬───────────────┘
               │ HTTP REST                    │ WebSocket
               ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     CareerOS Backend                        │
│         (Node.js + Express + TypeScript + Socket.IO)        │
├─────────────────────────────────────────────────────────────┤
│  • Auth & Profile        • AI Career Coach                  │
│  • Goals & Milestones    • Resume ATS Scorer                │
│  • Skill Intelligence    • Job Pipeline (Kanban)            │
│  • Mock Interview Engine • Network & Mentorship             │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│      Career Data Layer       │ │    AI Intelligence Core    │
│  (In-Memory / JSON / MongoDB)│ │ (STAR Rewriter & Evaluator)│
└──────────────────────────────┘ └────────────────────────────┘
```

## Module Breakdown

1. **🧑‍💼 Career Dashboard (`/dashboard`)**: Centralizes the user's career momentum streak, active OKR goals, milestone timeline road, and market readiness score.
2. **🤖 AI Career Coach (`/coach`)**: Autonomous advisor with multi-persona selection (Tech Lead, Executive Mentor, Startup Founder, ATS Specialist), 6-month roadmap generation, and tactical salary counter-offer scripts.
3. **📝 ATS Resume Builder (`/resume`)**: Real-time resume editor with 4 professional templates, live ATS scoring meter, and automated STAR-formula bullet enhancer.
4. **🎯 Skill Intelligence (`/skills`)**: Radar chart visualization comparing user competencies with Staff Engineer benchmarks, gap analysis, and verified skill badges.
5. **💼 Job & Internship Hub (`/jobs`)**: AI opportunity matcher with fit percentages and a drag-and-drop Kanban application pipeline.
6. **🎤 AI Mock Interview Arena (`/interviews`)**: Voice simulation timer, real-time speech analytics, scorecard generation, and 150+ categorized question drills.
7. **🌍 Professional Network (`/network`)**: Verified mentor directory with 1-on-1 booking, community wins feed, and referral requests.
8. **📊 Career Analytics (`/analytics`)**: Conversion funnels, skill trajectory tracking over 6 months, and printable executive reports.
