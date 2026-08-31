import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  CareerGoal,
  CareerMilestone,
  ResumeData,
  JobOpportunity,
  JobApplication,
  SkillItem
} from '../types';
import { api } from '../services/api';
import { triggerConfetti } from '../utils/confetti';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface CareerContextType {
  user: UserProfile | null;
  goals: CareerGoal[];
  milestones: CareerMilestone[];
  resume: ResumeData | null;
  skills: SkillItem[];
  jobs: JobOpportunity[];
  applications: JobApplication[];
  loading: boolean;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
  addGoal: (goal: Partial<CareerGoal>) => Promise<void>;
  toggleGoalKeyResult: (goalId: string, krId: string) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  addMilestone: (milestone: Partial<CareerMilestone>) => Promise<void>;
  updateResume: (updates: Partial<ResumeData>) => Promise<void>;
  updateSkill: (id: string, updates: Partial<SkillItem>) => Promise<void>;
  moveApplicationStage: (id: string, newStage: JobApplication['stage']) => Promise<void>;
  addApplication: (app: Partial<JobApplication>) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [goals, setGoals] = useState<CareerGoal[]>([]);
  const [milestones, setMilestones] = useState<CareerMilestone[]>([]);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [userData, goalsData, timelineData, resumesData, skillsData, jobsData, appsData] = await Promise.all([
          api.getUserProfile(),
          api.getGoals(),
          api.getTimeline(),
          api.getResumes(),
          api.getSkills(),
          api.getJobs(),
          api.getApplications()
        ]);
        setUser(userData);
        setGoals(goalsData);
        setMilestones(timelineData);
        setResume(resumesData[0] || null);
        setSkills(skillsData);
        setJobs(jobsData);
        setApplications(appsData);
      } catch (err) {
        console.error('Failed to load initial CareerOS data', err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const updateUser = async (updates: Partial<UserProfile>) => {
    try {
      const updated = await api.updateProfile(updates);
      setUser(updated);
      showToast('Profile updated successfully', 'success');
    } catch (e) {
      if (user) {
        setUser({ ...user, ...updates });
        showToast('Profile saved locally', 'info');
      }
    }
  };

  const addGoal = async (goal: Partial<CareerGoal>) => {
    try {
      const created = await api.createGoal(goal);
      setGoals(prev => [created, ...prev]);
      showToast('New career objective added!', 'success');
    } catch {
      const tempGoal = {
        id: `goal-${Date.now()}`,
        userId: 'user-001',
        title: goal.title || 'New Goal',
        category: goal.category || 'Skill',
        targetDate: goal.targetDate || '2026-12-31',
        progress: 0,
        completed: false,
        priority: goal.priority || 'Medium',
        keyResults: goal.keyResults || []
      };
      setGoals(prev => [tempGoal, ...prev]);
      showToast('Goal created', 'success');
    }
  };

  const toggleGoalKeyResult = async (goalId: string, krId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const updatedKrs = goal.keyResults.map(kr =>
      kr.id === krId ? { ...kr, done: !kr.done } : kr
    );
    const completedCount = updatedKrs.filter(kr => kr.done).length;
    const progress = Math.round((completedCount / (updatedKrs.length || 1)) * 100);
    const isNowCompleted = progress === 100;

    const updatedGoal = {
      ...goal,
      keyResults: updatedKrs,
      progress,
      completed: isNowCompleted
    };

    setGoals(prev => prev.map(g => (g.id === goalId ? updatedGoal : g)));

    if (isNowCompleted && !goal.completed) {
      triggerConfetti();
      showToast(`🎉 Goal completed: ${goal.title}`, 'success');
    }

    try {
      await api.updateGoal(goalId, { keyResults: updatedKrs, progress, completed: isNowCompleted });
    } catch (e) {
      // Local state is already updated
    }
  };

  const deleteGoal = async (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    showToast('Goal removed', 'info');
    try {
      await api.deleteGoal(id);
    } catch {}
  };

  const addMilestone = async (milestone: Partial<CareerMilestone>) => {
    try {
      const created = await api.addMilestone(milestone);
      setMilestones(prev => [created, ...prev]);
      showToast('Career milestone recorded!', 'success');
    } catch {
      const tempM: CareerMilestone = {
        id: `m-${Date.now()}`,
        userId: 'user-001',
        title: milestone.title || 'Milestone',
        companyOrOrg: milestone.companyOrOrg || 'Self',
        role: milestone.role || 'Role',
        date: milestone.date || '2026',
        type: milestone.type || 'Work',
        description: milestone.description || '',
        skillsAcquired: milestone.skillsAcquired || [],
        icon: milestone.icon || 'briefcase'
      };
      setMilestones(prev => [tempM, ...prev]);
      showToast('Milestone saved', 'success');
    }
  };

  const updateResume = async (updates: Partial<ResumeData>) => {
    if (!resume) return;
    const updated = { ...resume, ...updates };
    setResume(updated);
    try {
      const res = await api.updateResume(resume.id, updates);
      setResume(res);
      showToast('Resume saved and ATS score refreshed!', 'success');
    } catch {
      showToast('Resume draft saved', 'info');
    }
  };

  const updateSkill = async (id: string, updates: Partial<SkillItem>) => {
    setSkills(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
    try {
      await api.updateSkill(id, updates);
      showToast('Skill level updated', 'success');
    } catch {}
  };

  const moveApplicationStage = async (id: string, newStage: JobApplication['stage']) => {
    setApplications(prev => prev.map(a => (a.id === id ? { ...a, stage: newStage } : a)));
    if (newStage === 'Offer') {
      triggerConfetti();
      showToast('🎉 Congratulations on your Job Offer!', 'success');
    } else {
      showToast(`Application moved to ${newStage}`, 'info');
    }
    try {
      await api.updateApplication(id, { stage: newStage });
    } catch {}
  };

  const addApplication = async (app: Partial<JobApplication>) => {
    try {
      const created = await api.createApplication(app);
      setApplications(prev => [...prev, created]);
      showToast('Application tracked in pipeline', 'success');
    } catch {
      const tempApp: JobApplication = {
        id: `app-${Date.now()}`,
        userId: 'user-001',
        title: app.title || 'Engineer',
        company: app.company || 'Company',
        location: app.location || 'Remote',
        salary: app.salary || '$160,000',
        stage: app.stage || 'Wishlist',
        appliedDate: new Date().toISOString().split('T')[0],
        notes: app.notes || '',
        contactPerson: app.contactPerson || '',
        link: app.link || ''
      };
      setApplications(prev => [...prev, tempApp]);
      showToast('Application added', 'success');
    }
  };

  const deleteApplication = async (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    showToast('Application removed', 'info');
    try {
      await api.deleteApplication(id);
    } catch {}
  };

  return (
    <CareerContext.Provider
      value={{
        user,
        goals,
        milestones,
        resume,
        skills,
        jobs,
        applications,
        loading,
        toasts,
        showToast,
        updateUser,
        addGoal,
        toggleGoalKeyResult,
        deleteGoal,
        addMilestone,
        updateResume,
        updateSkill,
        moveApplicationStage,
        addApplication,
        deleteApplication
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
};
