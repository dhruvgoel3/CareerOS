import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Zap,
  PieChart as PieIcon,
  Calendar,
  Download,
  Printer,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { api } from '../services/api';
import { useCareer } from '../context/CareerContext';

export const AnalyticsPage: React.FC = () => {
  const { user, showToast } = useCareer();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await api.getAnalytics();
        setAnalytics(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  const handlePrintReport = () => {
    window.print();
  };

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center h-64 text-brand-300 font-mono animate-pulse text-xs">
        Loading comprehensive career metrics...
      </div>
    );
  }

  const { applicationFunnel, skillMasteryTrajectory, salaryBenchmarking, weeklyActivity, metricsSummary } = analytics;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 no-print">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-white">Career Growth Analytics</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Multi-dimensional progress intelligence, application funnel conversion velocity, and skill trajectory.</p>
        </div>

        <button
          onClick={handlePrintReport}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 transition-all self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          Export Growth Report
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Interview Pass Rate</span>
          <p className="text-2xl font-black text-emerald-400 font-mono">{metricsSummary.interviewPassRate}</p>
          <p className="text-[10px] text-slate-500">Industry Avg: 38%</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">ATS Resume Grade</span>
          <p className="text-2xl font-black text-brand-300 font-mono">{metricsSummary.atsResumeScore}%</p>
          <p className="text-[10px] text-slate-500">Tier-1 ATS Match Index</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Est. Market Value</span>
          <p className="text-2xl font-black text-white font-mono">{metricsSummary.estimatedMarketValue}</p>
          <p className="text-[10px] text-slate-500">San Francisco & Remote base</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Weekly Learning Velocity</span>
          <p className="text-2xl font-black text-indigo-400 font-mono">{metricsSummary.weeklyStudyHours} hrs</p>
          <p className="text-[10px] text-slate-500">Systems + AI Focus</p>
        </div>
      </div>

      {/* Main Charts: Skill Velocity (Area) & Application Funnel (Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Skill Mastery Velocity (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">6-Month Skill Mastery Velocity</h3>
              <p className="text-[11px] text-slate-400">Progression from Mid-Level to Staff Engineer standards</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300">
              +28% Net Growth
            </span>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={skillMasteryTrajectory}>
                <defs>
                  <linearGradient id="colorFrontend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSysDesign" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} domain={[40, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="frontend" name="React & TypeScript" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorFrontend)" />
                <Area type="monotone" dataKey="systemDesign" name="System Architecture" stroke="#ec4899" fillOpacity={1} fill="url(#colorSysDesign)" />
                <Area type="monotone" dataKey="backend" name="Distributed Backend" stroke="#3b82f6" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Conversion Funnel (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white">Application Pipeline Funnel</h3>
            <p className="text-[11px] text-slate-400">Conversion stages across active opportunities</p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationFunnel} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} width={120} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="value" name="Candidates / Roles" radius={[0, 8, 8, 0]}>
                  {applicationFunnel.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weekly Activity & Study Velocity */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Weekly Discipline & Interview Practice Cadence</h3>
            <p className="text-[11px] text-slate-400">Daily breakdown of coding problems solved, study hours, and applications dispatched</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">14-Day Streak Active 🔥</span>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="problemsSolved" name="Mock / Practice Drills" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="studyHours" name="Study Hours" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
