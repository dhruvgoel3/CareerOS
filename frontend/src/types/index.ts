export interface UserProfile {
  id: string;
  name: string;
  email: string;
  title: string;
  headline: string;
  avatarUrl: string;
  experienceLevel: string;
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
  priority: 'High' | 'Medium' | 'Low';
  keyResults: { id: string; text: string; done: boolean }[];
}

export interface CareerMilestone {
  id: string;
  userId: string;
  title: string;
  companyOrOrg: string;
  role: string;
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
  level: number;
  marketDemand: 'Very High' | 'High' | 'Moderate';
  targetLevel: number;
  verified: boolean;
  recommendedResources: { title: string; type: 'Course' | 'Book' | 'Project' | 'Docs'; url: string; timeHours: number }[];
}

export interface InterviewQuestion {
  id: string;
  category: string;
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
