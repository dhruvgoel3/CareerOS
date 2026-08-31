import React, { useState } from 'react';
import {
  Target,
  ShieldCheck,
  Award,
  BookOpen,
  ExternalLink,
  Plus,
  Zap,
  TrendingUp,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { useCareer } from '../context/CareerContext';
import { triggerConfetti } from '../utils/confetti';

export const SkillsPage: React.FC = () => {
  const { skills, updateSkill, showToast, user } = useCareer();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [activeQuizSkill, setActiveQuizSkill] = useState<any>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const categories = ['All', 'Frontend', 'Backend', 'System Architecture', 'Cloud & DevOps', 'Data & AI', 'Soft Skills'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  // Radar data preparation
  const radarData = skills.slice(0, 6).map(s => ({
    subject: s.name.split('/')[0].split('&')[0].trim(),
    current: s.level,
    target: s.targetLevel,
    fullMark: 100
  }));

  const handleStartQuiz = (skill: any) => {
    setActiveQuizSkill(skill);
    setQuizAnswer(null);
    setQuizModalOpen(true);
  };

  const handleCompleteQuiz = () => {
    if (quizAnswer === null) return;
    if (activeQuizSkill) {
      updateSkill(activeQuizSkill.id, { verified: true, level: Math.min(98, activeQuizSkill.level + 4) });
      triggerConfetti();
      showToast(`🎉 Verified Assessment Passed for ${activeQuizSkill.name}!`, 'success');
    }
    setQuizModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <Target className="w-4 h-4" />
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-white">Skill Intelligence & Gap Matrix</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Multi-dimensional skill auditing, Radar mastery mapping, and verified competency assessments.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <span>Overall Readiness: </span>
            <strong className="font-mono text-emerald-200">{user?.readinessScore || 86}%</strong>
          </div>
        </div>
      </div>

      {/* Top Visual: Radar Chart vs Gap Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Radar Chart (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10 flex flex-col items-center justify-center min-h-[380px]">
          <div className="w-full flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              Skill Radar Matrix (Current vs Staff Benchmark)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Normalized 0-100</span>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.05)" />
                <Radar name="Current Mastery" dataKey="current" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                <Radar name="Target Staff Level" dataKey="target" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} strokeDasharray="3 3" />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gap Insights & Target Role Benchmark (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Target Role Gap Analysis</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-mono">
                {user?.targetRole}
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">Distributed Systems & Sharding</span>
                  <span className="text-amber-400 font-mono">Gap: -8%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: '82%' }} />
                </div>
                <p className="text-[10px] text-slate-400">Recommended: Design a distributed rate limiter & read DDIA chapters 5 & 7.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">Production Kubernetes & Observability</span>
                  <span className="text-amber-400 font-mono">Gap: -10%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: '78%' }} />
                </div>
                <p className="text-[10px] text-slate-400">Recommended: Setup Prometheus + Grafana alerts on EKS cluster.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">TypeScript & Modern React</span>
                  <span className="text-emerald-400 font-mono">Exceeds (+2%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: '94%' }} />
                </div>
                <p className="text-[10px] text-slate-400">Top-tier mastery confirmed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === c
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map(skill => (
          <div key={skill.id} className="glass-card glass-card-hover rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-brand-400 uppercase font-semibold">{skill.category}</span>
                <h4 className="font-bold text-sm text-white mt-0.5">{skill.name}</h4>
              </div>
              {skill.verified ? (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              ) : (
                <button
                  onClick={() => handleStartQuiz(skill)}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-600/20 hover:bg-brand-600/40 text-brand-300 border border-brand-500/30 transition-all"
                >
                  Verify Skill
                </button>
              )}
            </div>

            {/* Progress Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono font-semibold">
                <span className="text-slate-400">Mastery Level:</span>
                <span className="text-white">{skill.level}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={e => updateSkill(skill.id, { level: Number(e.target.value) })}
                className="w-full accent-brand-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Recommended Learning Resources */}
            {skill.recommendedResources && skill.recommendedResources.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Curated Learning</p>
                {skill.recommendedResources.map((r, idx) => (
                  <a
                    key={idx}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-xs text-slate-300 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <BookOpen className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span className="truncate text-[11px] font-medium">{r.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{r.timeHours}h</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Skill Quiz Assessment Modal */}
      {quizModalOpen && activeQuizSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl glass-panel border border-white/10 p-6 space-y-5 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-400 font-bold uppercase">Competency Assessment</span>
                <h3 className="text-base font-bold text-white mt-0.5">{activeQuizSkill.name}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">Score Requirement: 90%</span>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
              <p className="font-semibold text-slate-200 leading-relaxed">
                Question: In high-concurrency systems, how do you handle cache stampedes (thundering herd) when a hot key expires?
              </p>
              <div className="space-y-2 pt-2">
                {[
                  'Option A: Query database immediately without locks and write back to cache.',
                  'Option B: Use a Mutex (Distributed Lock) so only one worker queries the database while others wait.',
                  'Option C: Increase web server CPU threads infinitely.',
                  'Option D: Disable caching entirely and rely on raw database sharding.'
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuizAnswer(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs ${
                      quizAnswer === idx
                        ? 'bg-brand-600/30 border-brand-500 text-white font-semibold'
                        : 'bg-slate-900 border-white/5 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setQuizModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteQuiz}
                disabled={quizAnswer === null}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-brand-500/25"
              >
                Submit Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
