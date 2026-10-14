import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  FileText,
  Target,
  Briefcase,
  Mic,
  Users,
  BarChart3,
  Settings,
  Flame,
  Search,
  Bell,
  Menu,
  X,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Command
} from 'lucide-react';
import { useCareer } from '../../context/CareerContext';

export const AppLayout: React.FC = () => {
  const { user, toasts, showToast } = useCareer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCmdOpen(false);
        setNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { to: '/dashboard', label: 'Career Dashboard', icon: LayoutDashboard, badge: null },
    { to: '/coach', label: 'AI Career Coach', icon: Bot, badge: 'AI Pro' },
    { to: '/resume', label: 'Resume Builder', icon: FileText, badge: 'ATS 92' },
    { to: '/skills', label: 'Skill Intelligence', icon: Target, badge: null },
    { to: '/jobs', label: 'Job & Internship Hub', icon: Briefcase, badge: '5 Active' },
    { to: '/interviews', label: 'Interview Prep', icon: Mic, badge: 'Mock AI' },
    { to: '/network', label: 'Network & Mentors', icon: Users, badge: null },
    { to: '/analytics', label: 'Career Analytics', icon: BarChart3, badge: null },
    { to: '/settings', label: 'Settings & Profile', icon: Settings, badge: null },
  ];

  const quickActions = [
    { title: 'Chat with AI Career Coach', subtitle: 'Simulate salary negotiation or career strategy', icon: Bot, path: '/coach' },
    { title: 'Evaluate Resume with ATS Scanner', subtitle: 'Grade bullet points with STAR formula', icon: FileText, path: '/resume' },
    { title: 'Start AI Mock Interview', subtitle: 'Practice System Design or Behavioral round', icon: Mic, path: '/interviews' },
    { title: 'Track New Job Application', subtitle: 'Add to drag-and-drop Kanban pipeline', icon: Briefcase, path: '/jobs' },
    { title: 'Assess Technical Skills & Gaps', subtitle: 'Benchmark against Staff Engineer roles', icon: Target, path: '/skills' },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-in slide-in-from-top-3 ${
              toast.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-rose-950/80 border-rose-500/40 text-rose-200'
                : 'bg-brand-950/80 border-brand-500/40 text-brand-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-current" />
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-2xl p-4 shrink-0">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20 border border-brand-400/30">
            <span className="font-bold text-lg text-white font-mono">OS</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base tracking-tight text-white">CareerOS</h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono font-bold">v1.0</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Open-Source Career OS</p>
          </div>
        </div>

        {/* Global Action Button */}
        <button
          onClick={() => setCmdOpen(true)}
          className="flex items-center justify-between w-full px-3 py-2 mb-4 text-xs font-medium text-slate-300 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-all group"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-400" />
            Quick Command...
          </span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 rounded border border-white/10 text-slate-400 font-mono">⌘K</kbd>
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30 shadow-sm shadow-brand-500/10 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                    isActive ? 'bg-brand-500/30 text-brand-200' : 'bg-white/5 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom User Profile Card */}
        <div className="pt-3 mt-auto border-t border-white/5">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-500/30 transition-all">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-brand-500/40 shrink-0"
              />
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Alex Rivera'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.targetRole || 'Senior Engineer'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 text-[10px] font-mono font-bold shrink-0">
              <Flame className="w-3 h-3 fill-amber-400" />
              {user?.streakDays || 14}d
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-white/5 bg-slate-900/40 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Workspace:</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[11px] text-slate-300">
                {user?.targetIndustry || 'Developer Tools & SaaS'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Career Readiness Score Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">Market Readiness:</span>
              <span className="font-bold font-mono text-emerald-200">{user?.readinessScore || 86}%</span>
            </div>

            {/* AI Assistant Quick Pill */}
            <button
              onClick={() => navigate('/coach')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-600/30 to-indigo-600/30 border border-brand-500/40 text-brand-200 text-xs font-semibold hover:from-brand-600/50 hover:to-indigo-600/50 transition-all shadow-sm shadow-brand-500/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span className="hidden sm:inline">Ask Career Coach</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(prev => !prev)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-slate-900" />
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-panel p-4 shadow-2xl border border-white/10 z-50 animate-in fade-in-50 zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Career Updates</h3>
                    <span className="text-[10px] text-brand-400 font-mono font-medium">3 New</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="font-semibold text-white">Interview Reminder</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">Anthropic Technical Round scheduled in 3 days.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="font-semibold text-white">ATS Resume Score Boost</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">Your ATS score is now 92% (+14% this month).</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="font-semibold text-white">14-Day Growth Streak 🔥</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">You are in the top 5% of active career planners.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Outlet Scroll Container */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex flex-col w-72 max-w-full bg-slate-900 p-5 z-10 border-r border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-white font-mono">OS</div>
                <span className="font-extrabold text-white">CareerOS</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1.5">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.to);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                      isActive ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Command Palette (Cmd+K) Modal */}
      {cmdOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setCmdOpen(false)} />
          <div className="relative w-full max-w-xl rounded-2xl glass-panel border border-brand-500/30 shadow-2xl p-4 overflow-hidden animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10 px-2">
              <Search className="w-4 h-4 text-brand-400" />
              <input
                type="text"
                placeholder="Type a command or jump to module..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                autoFocus
              />
              <kbd className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded border border-white/10 font-mono">ESC</kbd>
            </div>
            <div className="py-3 space-y-1.5">
              <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick Actions</p>
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate(action.path);
                      setCmdOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-600/15 hover:border hover:border-brand-500/20 text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-brand-500/20 flex items-center justify-center text-slate-300 group-hover:text-brand-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-brand-200">{action.title}</p>
                        <p className="text-[11px] text-slate-400">{action.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 group-hover:text-brand-400 font-mono">Jump →</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
