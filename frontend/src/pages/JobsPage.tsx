import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ExternalLink,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Sparkles,
  CheckCircle2,
  Trash2,
  Clock,
  Kanban
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { JobApplication } from '../types';

export const JobsPage: React.FC = () => {
  const { jobs, applications, moveApplicationStage, addApplication, deleteApplication, showToast } = useCareer();
  const [viewMode, setViewMode] = useState<'opportunities' | 'pipeline'>('opportunities');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedExp, setSelectedExp] = useState<string>('All');
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);

  // New application form
  const [appTitle, setAppTitle] = useState('');
  const [appCompany, setAppCompany] = useState('');
  const [appLocation, setAppLocation] = useState('Remote');
  const [appSalary, setAppSalary] = useState('$180,000');
  const [appStage, setAppStage] = useState<JobApplication['stage']>('Wishlist');
  const [appNotes, setAppNotes] = useState('');

  const kanbanStages: JobApplication['stage'][] = ['Wishlist', 'Applied', 'Screening', 'Interview', 'Offer'];

  const filteredJobs = jobs.filter(j => {
    const matchesQuery = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || j.type === selectedType;
    const matchesExp = selectedExp === 'All' || j.experience === selectedExp;
    return matchesQuery && matchesType && matchesExp;
  });

  const handleTrackJob = (job: any) => {
    addApplication({
      jobId: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salaryRange.split('+')[0].trim(),
      stage: 'Wishlist',
      notes: `Matched skills: ${job.requiredSkills.join(', ')}`
    });
  };

  const handleCreateCustomApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appTitle.trim() || !appCompany.trim()) return;
    addApplication({
      title: appTitle,
      company: appCompany,
      location: appLocation,
      salary: appSalary,
      stage: appStage,
      notes: appNotes
    });
    setAppTitle('');
    setAppCompany('');
    setAppNotes('');
    setAddAppModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <Briefcase className="w-4 h-4" />
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-white">Job & Internship Hub</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">AI-matched opportunities, salary benchmarks, and drag-and-drop application pipeline.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('opportunities')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'opportunities' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Opportunity Matcher
            </button>
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'pipeline' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kanban Pipeline ({applications.length})
            </button>
          </div>

          <button
            onClick={() => setAddAppModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Application
          </button>
        </div>
      </div>

      {viewMode === 'opportunities' ? (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs by title, company, or tech stack..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 focus:outline-none"
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
              </select>

              <select
                value={selectedExp}
                onChange={e => setSelectedExp(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 focus:outline-none"
              >
                <option value="All">All Levels</option>
                <option value="Senior">Senior</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Entry-Level">Entry-Level</option>
              </select>
            </div>
          </div>

          {/* Job Opportunities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map(job => {
              const isAlreadyTracked = applications.some(a => a.jobId === job.id || (a.company === job.company && a.title === job.title));
              return (
                <div
                  key={job.id}
                  className="glass-card glass-card-hover rounded-3xl p-6 border border-white/10 space-y-4 relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={job.logo} alt={job.company} className="w-11 h-11 rounded-2xl object-cover ring-1 ring-white/10" />
                        <div>
                          <h3 className="text-base font-bold text-white leading-snug">{job.title}</h3>
                          <p className="text-xs text-brand-300 font-semibold">{job.company}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                        {job.matchScore}% Match
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-slate-500" /> {job.salaryRange}</span>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300">{job.type}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {job.description}
                    </p>

                    {/* AI Match Reasons */}
                    <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 space-y-1">
                      <p className="text-[10px] font-bold text-brand-300 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Why You Match
                      </p>
                      <p className="text-[11px] text-slate-300">{job.matchReasons[0]}</p>
                    </div>

                    {/* Required Skills Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {job.requiredSkills.map((sk, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-[11px] text-slate-500 font-mono">Posted {job.postedDaysAgo}d ago • {job.applicantsCount} applicants</span>
                    {isAlreadyTracked ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" /> In Pipeline
                      </span>
                    ) : (
                      <button
                        onClick={() => handleTrackJob(job)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600/30 hover:bg-brand-600 text-brand-200 hover:text-white border border-brand-500/40 text-xs font-bold transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" /> Track Application
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Kanban Application Board */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {kanbanStages.map(stage => {
            const stageApps = applications.filter(a => a.stage === stage);
            return (
              <div key={stage} className="min-w-[240px] flex flex-col rounded-2xl bg-slate-900/50 border border-white/10 p-3 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      stage === 'Offer' ? 'bg-emerald-400 animate-ping' :
                      stage === 'Interview' ? 'bg-indigo-400' :
                      stage === 'Screening' ? 'bg-purple-400' : 'bg-slate-400'
                    }`} />
                    {stage}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-bold">
                    {stageApps.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[650px] pr-1">
                  {stageApps.map(app => (
                    <div
                      key={app.id}
                      className="glass-card rounded-2xl p-4 border border-white/10 space-y-3 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs font-bold text-white">{app.title}</h4>
                          <p className="text-[11px] text-brand-300 font-semibold">{app.company}</p>
                        </div>
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-[10px] text-slate-400 space-y-1 font-mono">
                        <p>{app.salary}</p>
                        {app.nextStepDate && <p className="text-amber-400 font-semibold">Next: {app.nextStepDate}</p>}
                      </div>

                      {app.notes && (
                        <p className="text-[11px] text-slate-300 bg-white/[0.02] p-2 rounded-lg border border-white/5 leading-snug">
                          {app.notes}
                        </p>
                      )}

                      {/* Stage Selector Dropdown */}
                      <div className="pt-2 border-t border-white/5">
                        <select
                          value={app.stage}
                          onChange={e => moveApplicationStage(app.id, e.target.value as any)}
                          className="w-full text-[10px] px-2 py-1 rounded-lg bg-slate-950 border border-white/10 text-slate-300 font-semibold focus:outline-none"
                        >
                          {kanbanStages.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                  {stageApps.length === 0 && (
                    <div className="p-6 text-center text-slate-600 text-xs font-medium border border-dashed border-white/5 rounded-xl">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Custom Application Modal */}
      {addAppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl glass-panel border border-white/10 p-6 space-y-4 animate-in fade-in-50 zoom-in-95">
            <h3 className="text-base font-bold text-white">Track Custom Job Application</h3>
            <form onSubmit={handleCreateCustomApp} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Role Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Distributed Systems Engineer"
                  value={appTitle}
                  onChange={e => setAppTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Company</label>
                <input
                  type="text"
                  placeholder="e.g. Stripe / Figma / OpenAI"
                  value={appCompany}
                  onChange={e => setAppCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Location</label>
                  <input
                    type="text"
                    value={appLocation}
                    onChange={e => setAppLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Target Salary</label>
                  <input
                    type="text"
                    value={appSalary}
                    onChange={e => setAppSalary(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Pipeline Stage</label>
                <select
                  value={appStage}
                  onChange={e => setAppStage(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                >
                  {kanbanStages.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Notes & Next Steps</label>
                <textarea
                  rows={2}
                  placeholder="Referral contact or upcoming interview date..."
                  value={appNotes}
                  onChange={e => setAppNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAddAppModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25"
                >
                  Add to Kanban
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
