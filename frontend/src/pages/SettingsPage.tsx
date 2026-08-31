import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Key,
  Database,
  Save,
  CheckCircle2,
  Sparkles,
  Server,
  Globe,
  Github,
  Linkedin
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

export const SettingsPage: React.FC = () => {
  const { user, updateUser, showToast } = useCareer();

  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Rivera',
    email: user?.email || 'alex.rivera@careeros.dev',
    title: user?.title || 'Full Stack Engineer & AI Systems Builder',
    targetRole: user?.targetRole || 'Senior Full Stack & AI Engineer',
    targetIndustry: user?.targetIndustry || 'Developer Tools / B2B SaaS',
    targetSalary: user?.targetSalary || '$165,000 - $190,000',
    location: user?.location || 'San Francisco, CA (Open to Remote)',
    bio: user?.bio || 'Building developer infrastructure and high-performance intelligent web apps.',
    github: user?.github || 'https://github.com/alexrivera-dev',
    linkedin: user?.linkedin || 'https://linkedin.com/in/alexrivera-eng',
    portfolio: user?.portfolio || 'https://alexrivera.engineer'
  });

  const [apiKey, setApiKey] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUser(formData);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
            <Settings className="w-4 h-4" />
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-white">System Settings & Profile</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">Manage your CareerOS profile, target benchmarks, and AI engine preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Card */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-brand-400" />
              Professional Identity & Target Roles
            </h2>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Primary Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Current Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Target Dream Role</label>
              <input
                type="text"
                value={formData.targetRole}
                onChange={e => setFormData({ ...formData, targetRole: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-brand-500 font-semibold"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Target Industry</label>
              <input
                type="text"
                value={formData.targetIndustry}
                onChange={e => setFormData({ ...formData, targetIndustry: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Target Compensation Band</label>
              <input
                type="text"
                value={formData.targetSalary}
                onChange={e => setFormData({ ...formData, targetSalary: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">Location Preference</label>
            <input
              type="text"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">Professional Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Links & Socials */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            Socials & Public Engineering Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">GitHub</label>
              <input
                type="text"
                value={formData.github}
                onChange={e => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">LinkedIn</label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">Portfolio Website</label>
              <input
                type="text"
                value={formData.portfolio}
                onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Engine Connectivity & Status */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            Engine Status & Infrastructure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-slate-400 font-medium">Backend API Service</span>
              <p className="font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Operational (Port 5001)
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-slate-400 font-medium">Real-Time Stream Engine</span>
              <p className="font-bold text-brand-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" /> Socket.IO Connected
              </p>
            </div>
          </div>
        </div>

        {/* Save Actions Bar */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 transition-all"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving Changes...' : 'Save Profile & Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
};
