# 📡 CareerOS API Reference

CareerOS provides a comprehensive REST & WebSocket API suite for career planning, AI coaching, resume evaluation, skill radar tracking, and opportunity pipelines.

Base URL: `http://localhost:5001/api`

---

## 1. Authentication & Profile (`/api/auth`)

### `POST /api/auth/login`
- **Description**: Authenticate user and receive JWT bearer token.
- **Request Body**:
  ```json
  { "email": "alex.rivera@careeros.dev", "password": "password" }
  ```
- **Response**: `{ "success": true, "token": "...", "user": { ... } }`

### `GET /api/auth/me`
- **Description**: Fetch current authenticated user profile.

### `PUT /api/auth/profile`
- **Description**: Update profile details, target role, and compensation bands.

---

## 2. Career Goals & Timeline (`/api/career`)

### `GET /api/career/goals`
- **Description**: Retrieve active career objectives and OKRs.

### `POST /api/career/goals`
- **Description**: Create a new career goal with quantifiable deliverables.

### `GET /api/career/timeline`
- **Description**: Retrieve historical milestones (Work, Education, Certifications).

---

## 3. AI Career Coach (`/api/coach`)

### `POST /api/coach/chat`
- **Description**: Conversational career advice stream with persona selection.
- **Request Body**:
  ```json
  {
    "messages": [{ "role": "user", "content": "How do I negotiate for a Staff level role?" }],
    "persona": "tech_lead"
  }
  ```

### `POST /api/coach/roadmap`
- **Description**: Generates multi-phase 6-month progression roadmap from current role to target role.

### `POST /api/coach/salary-insights`
- **Description**: Calculates salary percentiles, base/total comp bands, and negotiation scripts.

---

## 4. Resume Builder & ATS Scorer (`/api/resume`)

### `GET /api/resume`
- **Description**: Retrieve active resume versions.

### `POST /api/resume/analyze-ats`
- **Description**: Evaluates resume text against ATS standards (Action Verbs, Metric Density, Keyword match).

### `POST /api/resume/enhance-bullet`
- **Description**: Rewrites weak bullet points using the Google X-Y-Z and STAR formulas.

---

## 5. Skill Intelligence (`/api/skills`)

### `GET /api/skills`
- **Description**: Returns all tracked skills with normalized mastery levels (0-100).

### `GET /api/skills/gap-analysis?role=Senior+Engineer`
- **Description**: Calculates skill gaps and missing proficiencies against target roles.

### `POST /api/skills/assess`
- **Description**: Verifies skill competency through technical quiz evaluations.

---

## 6. Jobs & Application Pipeline (`/api/jobs`)

### `GET /api/jobs`
- **Description**: Filterable job & internship opportunities with AI match scores.

### `GET /api/jobs/applications`
- **Description**: Kanban board application stages (Wishlist -> Applied -> Screening -> Interview -> Offer).

### `PUT /api/jobs/applications/:id`
- **Description**: Update application stage or interview notes.

---

## 7. AI Mock Interviews (`/api/interviews`)

### `GET /api/interviews/questions`
- **Description**: 150+ categorized questions (System Design, Algorithms, STAR Behavioral, Frontend, Backend).

### `POST /api/interviews/evaluate`
- **Description**: Real-time AI grading of candidate answers with scores on Depth, Clarity, Structure, and Follow-up drills.

---

## 8. Professional Network & Mentorship (`/api/network`)

### `GET /api/network/mentors`
- **Description**: Directory of verified Staff/Principal engineers for 1-on-1 mentorship.

### `POST /api/network/posts`
- **Description**: Publish a career milestone or technical learning log to the community.
