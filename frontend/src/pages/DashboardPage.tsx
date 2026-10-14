import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  Target,
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  Briefcase,
  Award,
  GraduationCap,
  Calendar,
  Zap,
  Flame,
  FileText,
  Mic,
  ShieldCheck,
  Building2,
  MapPin,
  DollarSign
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

export const DashboardPage: React.FC = () => {
  const { user, goals, milestones, resume, jobs, toggleGoalKeyResult, addGoal, addMilestone } = useCareer();
  const navigate = useNavigate();

  const [newGoalModalOpen, setNewGoalModalOpen] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState<'Skill' | 'Project' | 'Job Search' | 'Networking'>('Skill');
  const [newGoalPriority, setNewGoalPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const [newMilestoneModalOpen, setNewMilestoneModalOpen] = useState(false);
  const [mTitle, setMTitle] = useState('');
  const [mCompany, setMCompany] = useState('');
  const [mType, setMType] = useState<'Work' | 'Education' | 'Certification' | 'Project'>('Work');
  const [mDesc, setMDesc] = useState('');

  const completedGoalsCount = goals.filter(g => g.completed || g.progress === 100).length;
  const overallGoalProgress = goals.length > 0 ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length) : 0;

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    addGoal({
      title: newGoalTitle,
      category: newGoalCategory,
      priority: newGoalPriority,
      progress: 0,
      completed: false,
      targetDate: '2026-12-31',
      keyResults: [
        { id: `kr-${Date.now()}-1`, text: 'Define measurable milestone 1', done: false },
        { id: `kr-${Date.now()}-2`, text: 'Complete peer review & validation', done: false }
      ]
    });
    setNewGoalTitle('');
    setNewGoalModalOpen(false);
  };

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mTitle.trim()) return;
    addMilestone({
      title: mTitle,
      companyOrOrg: mCompany || 'Independent',
      role: mTitle,
      type: mType,
      date: new Date().getFullYear().toString(),
      description: mDesc,
      skillsAcquired: ['Execution', 'Leadership']
    });
    setMTitle('');
    setMCompany('');
    setMDesc('');
    setNewMilestoneModalOpen(false);
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'Certification':
        return Award;
      case 'Education':
        return GraduationCap;
      default:
        return Briefcase;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-card p-6 lg:p-8 border border-white/10 bg-gradient-to-br from-slate-900/90 via-brand-950/40 to-slate-900/90">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-brand-400" />
              <span>CareerOS Growth Velocity</span>
            </div>
            <h1 className="text-2xl lg:text-4xl font-black tracking-tight text-white">
              Welcome back, <span className="gradient-brand">{user?.name || 'Alex'}</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Targeting <strong className="text-white font-semibold">{user?.targetRole}</strong> in {user?.targetIndustry}. You are currently on a <span className="text-amber-400 font-bold">{user?.streakDays || 14}-day</span> momentum streak!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/coach')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              AI Career Coach
            </button>
            <button
              onClick={() => navigate('/resume')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              ATS Score: {resume?.atsScore || 92}%
            </button>
          </div>
        </div>

        {/* Quick Snapshot Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <p className="text-[11px] font-medium text-slate-400">Market Readiness</p>
            <p className="text-xl font-extrabold text-emerald-400 font-mono mt-1">{user?.readinessScore || 86}%</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Top 8% in Candidate Pool</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <p className="text-[11px] font-medium text-slate-400">Target Compensation</p>
            <p className="text-xl font-extrabold text-white font-mono mt-1">$175k - $210k</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Includes equity benchmarks</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <p className="text-[11px] font-medium text-slate-400">Goal Completion</p>
            <p className="text-xl font-extrabold text-brand-400 font-mono mt-1">{overallGoalProgress}%</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{completedGoalsCount} of {goals.length} OKRs finished</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <p className="text-[11px] font-medium text-slate-400">Active Pipeline</p>
            <p className="text-xl font-extrabold text-indigo-400 font-mono mt-1">3 Onsite Rounds</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Anthropic, Stripe & Perplexity</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Goals & OKRs (Left) + Career Timeline & Feed (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Career Goals & OKRs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-400" />
              <h2 className="text-lg font-bold text-white">Active Career Goals & OKRs</h2>
            </div>
            <button
              onClick={() => setNewGoalModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600/20 hover:bg-brand-600/30 border border-brand-500/30 text-brand-300 text-xs font-semibold transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Goal
            </button>
          </div>

          <div className="space-y-4">
            {goals.map(goal => (
              <div
                key={goal.id}
                className="glass-card glass-card-hover rounded-2xl p-5 border border-white/10 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        goal.category === 'Skill' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        goal.category === 'Job Search' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {goal.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Target: {goal.targetDate}</span>
                    </div>
                    <h3 className="font-bold text-sm lg:text-base text-white">{goal.title}</h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-extrabold font-mono text-brand-300">{goal.progress}%</span>
                    <p className="text-[10px] text-slate-500">Progress</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>

                {/* Key Results Checklist */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Key Deliverables (Click to check)</p>
                  <div className="space-y-1.5">
                    {goal.keyResults.map(kr => (
                      <button
                        key={kr.id}
                        onClick={() => toggleGoalKeyResult(goal.id, kr.id)}
                        className="flex items-center gap-2.5 w-full text-left p-2 rounded-xl hover:bg-white/[0.04] transition-all group"
                      >
                        {kr.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 group-hover:text-brand-400 shrink-0" />
                        )}
                        <span className={`text-xs ${kr.done ? 'line-through text-slate-500 font-normal' : 'text-slate-200 font-medium'}`}>
                          {kr.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div
              onClick={() => navigate('/interviews')}
              className="glass-card glass-card-hover rounded-2xl p-5 border border-white/10 cursor-pointer space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">AI Mock Interview Arena</h4>
                <p className="text-xs text-slate-400 mt-1">Practice System Design, Algorithms, and STAR Behavioral questions with real-time scoring.</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-400">
                Launch Simulator <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            <div
              onClick={() => navigate('/skills')}
              className="glass-card glass-card-hover rounded-2xl p-5 border border-white/10 cursor-pointer space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">Skill Intelligence & Gap Analysis</h4>
                <p className="text-xs text-slate-400 mt-1">Benchmark your skill matrix against Tier-1 Staff and Principal engineering standards.</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                Explore Matrix <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Career Timeline & High-Match Opportunities */}
        <div className="space-y-6">
          {/* Career Timeline */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-400" />
                <h3 className="text-sm font-bold text-white">Career Timeline</h3>
              </div>
              <button
                onClick={() => setNewMilestoneModalOpen(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {milestones.map((m, idx) => {
                const Icon = getMilestoneIcon(m.type);
                return (
                  <div key={m.id} className="relative group">
                    <div className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-brand-500 flex items-center justify-center" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-brand-400 uppercase">{m.date}</span>
                        <span className="text-[10px] text-slate-500">{m.type}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white">{m.title}</h4>
                      <p className="text-[11px] text-slate-400">{m.companyOrOrg}</p>
                      {m.description && (
                        <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">{m.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Opportunity Feed Highlights */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Top Matched Roles</h3>
              </div>
              <button onClick={() => navigate('/jobs')} className="text-xs font-bold text-brand-400 hover:text-brand-300">
                View All ({jobs.length})
              </button>
            </div>

            <div className="space-y-3">
              {jobs.slice(0, 3).map(job => (
                <div
                  key={job.id}
                  onClick={() => navigate('/jobs')}
                  className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={job.logo} alt={job.company} className="w-6 h-6 rounded object-cover" />
                      <span className="text-xs font-semibold text-white group-hover:text-brand-300 transition-colors">{job.company}</span>
                    </div>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {job.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-200 truncate">{job.title}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{job.location}</span>
                    <span className="text-white font-semibold">{job.salaryRange.split('+')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      {newGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl glass-panel border border-white/10 p-6 space-y-4 animate-in fade-in-50 zoom-in-95">
            <h3 className="text-base font-bold text-white">Create Career Objective</h3>
            <form onSubmit={handleCreateGoal} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Goal Title</label>
                <input
                  type="text"
                  placeholder="e.g. Master High-Throughput Kafka Systems"
                  value={newGoalTitle}
                  onChange={e => setNewGoalTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Category</label>
                  <select
                    value={newGoalCategory}
                    onChange={e => setNewGoalCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                  >
                    <option value="Skill">Skill</option>
                    <option value="Job Search">Job Search</option>
                    <option value="Project">Project</option>
                    <option value="Networking">Networking</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Priority</label>
                  <select
                    value={newGoalPriority}
                    onChange={e => setNewGoalPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewGoalModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Milestone Modal */}
      {newMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl glass-panel border border-white/10 p-6 space-y-4 animate-in fade-in-50 zoom-in-95">
            <h3 className="text-base font-bold text-white">Record Career Milestone</h3>
            <form onSubmit={handleCreateMilestone} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Title / Role</label>
                <input
                  type="text"
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={mTitle}
                  onChange={e => setMTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Organization / Company</label>
                <input
                  type="text"
                  placeholder="e.g. Amazon Web Services"
                  value={mCompany}
                  onChange={e => setMCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Milestone Type</label>
                <select
                  value={mType}
                  onChange={e => setMType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                >
                  <option value="Work">Work Experience</option>
                  <option value="Certification">Certification</option>
                  <option value="Education">Education</option>
                  <option value="Project">Open Source Project</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Impact & Learnings</label>
                <textarea
                  placeholder="Brief description of outcomes and skills acquired..."
                  value={mDesc}
                  onChange={e => setMDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewMilestoneModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
