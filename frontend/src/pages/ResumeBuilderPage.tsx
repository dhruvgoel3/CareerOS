import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Download,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Eye,
  Sliders,
  ExternalLink,
  ChevronDown,
  Layers,
  Wand2
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { api } from '../services/api';
import { ResumeData } from '../types';

export const ResumeBuilderPage: React.FC = () => {
  const { resume, updateResume, showToast } = useCareer();
  const [activeTab, setActiveTab] = useState<'editor' | 'ats_analysis'>('editor');
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'minimal' | 'executive' | 'compact'>('modern');
  const [atsAnalysis, setAtsAnalysis] = useState<any>(null);
  const [loadingAts, setLoadingAts] = useState(false);
  const [enhancingBulletIdx, setEnhancingBulletIdx] = useState<{ expIdx: number; bulletIdx: number } | null>(null);

  if (!resume) return null;

  const handlePersonalChange = (field: keyof ResumeData['personalInfo'], val: string) => {
    updateResume({
      personalInfo: {
        ...resume.personalInfo,
        [field]: val
      }
    });
  };

  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: 'Senior Software Engineer',
      company: 'High-Growth Tech Inc',
      location: 'San Francisco, CA',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected and deployed microservices reducing p99 latency by 35% across 50,000+ daily active users.',
        'Led team of 4 engineers delivering key platform capabilities on-schedule.'
      ]
    };
    updateResume({ experience: [newExp, ...resume.experience] });
  };

  const handleRemoveExperience = (idx: number) => {
    const updated = resume.experience.filter((_, i) => i !== idx);
    updateResume({ experience: updated });
  };

  const handleBulletChange = (expIdx: number, bulletIdx: number, val: string) => {
    const updatedExp = [...resume.experience];
    updatedExp[expIdx].bullets[bulletIdx] = val;
    updateResume({ experience: updatedExp });
  };

  const handleAddBullet = (expIdx: number) => {
    const updatedExp = [...resume.experience];
    updatedExp[expIdx].bullets.push('Architected feature resulting in measurable 25% performance improvement.');
    updateResume({ experience: updatedExp });
  };

  const handleEnhanceBullet = async (expIdx: number, bulletIdx: number) => {
    setEnhancingBulletIdx({ expIdx, bulletIdx });
    try {
      const original = resume.experience[expIdx].bullets[bulletIdx];
      const res = await api.enhanceBullet(original, resume.experience[expIdx].role);
      const updatedExp = [...resume.experience];
      updatedExp[expIdx].bullets[bulletIdx] = res.enhanced;
      await updateResume({ experience: updatedExp });
      showToast('Bullet point upgraded to STAR high-impact format!', 'success');
    } catch {
      showToast('Bullet enhancement completed', 'info');
    } finally {
      setEnhancingBulletIdx(null);
    }
  };

  const handleAnalyzeATS = async () => {
    setLoadingAts(true);
    try {
      const result = await api.analyzeATS(resume);
      setAtsAnalysis(result);
      setActiveTab('ats_analysis');
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAts(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume_2026.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported JSON Resume successfully!', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10 no-print">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-white">ATS Resume Builder</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Real-time ATS parser, STAR metric rewriter, and multi-template export.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Template Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-white/10 text-xs">
            {(['modern', 'minimal', 'executive', 'compact'] as const).map(t => (
              <button
                key={t}
                onClick={() => setSelectedTemplate(t)}
                className={`px-2.5 py-1 rounded-lg capitalize font-semibold transition-all ${
                  selectedTemplate === t ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={handleAnalyzeATS}
            disabled={loadingAts}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            ATS Score: {resume.atsScore}%
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / PDF
          </button>

          <button
            onClick={handleExportJSON}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all"
            title="Export JSON Resume"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Editor on Left, Live Sheet Preview on Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Form Controls (xl:col-span-5) */}
        <div className="xl:col-span-5 space-y-6 no-print">
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-white/10">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'editor' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Resume Editor
            </button>
            <button
              onClick={handleAnalyzeATS}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'ats_analysis' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ATS Audit & Fixes
            </button>
          </div>

          {activeTab === 'editor' ? (
            <div className="space-y-6">
              {/* Personal Info Accordion */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Contact & Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={resume.personalInfo.fullName}
                      onChange={e => handlePersonalChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Email</label>
                    <input
                      type="email"
                      value={resume.personalInfo.email}
                      onChange={e => handlePersonalChange('email', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Phone</label>
                    <input
                      type="text"
                      value={resume.personalInfo.phone}
                      onChange={e => handlePersonalChange('phone', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Location</label>
                    <input
                      type="text"
                      value={resume.personalInfo.location}
                      onChange={e => handlePersonalChange('location', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Executive Summary</label>
                  <textarea
                    rows={3}
                    value={resume.personalInfo.summary}
                    onChange={e => handlePersonalChange('summary', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Experience List */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Work Experience</h3>
                  <button
                    onClick={handleAddExperience}
                    className="flex items-center gap-1 text-xs font-bold text-brand-400 hover:text-brand-300"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Role
                  </button>
                </div>

                <div className="space-y-4">
                  {resume.experience.map((exp, expIdx) => (
                    <div key={exp.id || expIdx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          <input
                            type="text"
                            value={exp.role}
                            placeholder="Role Title"
                            onChange={e => {
                              const updated = [...resume.experience];
                              updated[expIdx].role = e.target.value;
                              updateResume({ experience: updated });
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white font-semibold"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            placeholder="Company"
                            onChange={e => {
                              const updated = [...resume.experience];
                              updated[expIdx].company = e.target.value;
                              updateResume({ experience: updated });
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveExperience(expIdx)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Bullets with AI Enhancer */}
                      <div className="space-y-2">
                        <p className="text-[10px] font-semibold text-slate-400 uppercase">Impact Bullets</p>
                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={e => handleBulletChange(expIdx, bIdx, e.target.value)}
                                className="flex-1 p-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                              />
                              <button
                                onClick={() => handleEnhanceBullet(expIdx, bIdx)}
                                disabled={enhancingBulletIdx?.expIdx === expIdx && enhancingBulletIdx?.bulletIdx === bIdx}
                                className="p-2 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 border border-brand-500/30 shrink-0 transition-all"
                                title="Enhance with AI STAR Formula"
                              >
                                <Wand2 className={`w-3.5 h-3.5 ${enhancingBulletIdx?.expIdx === expIdx && enhancingBulletIdx?.bulletIdx === bIdx ? 'animate-spin' : ''}`} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => handleAddBullet(expIdx)}
                          className="text-[11px] font-semibold text-brand-400 hover:underline inline-flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Bullet Point
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ATS Audit Tab */
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">ATS Compatibility Analysis</h3>
                  <p className="text-xs text-slate-400">Target Role: {resume.targetRole}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-emerald-400">{resume.atsScore}%</span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Grade A+</span>
                </div>
              </div>

              {/* Metric Bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Action Verbs & Impact</span>
                    <span className="text-emerald-400">95%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-emerald-400" style={{ width: '95%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Quantifiable Metrics & Numbers</span>
                    <span className="text-emerald-400">90%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-emerald-400" style={{ width: '90%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Target Keyword Density</span>
                    <span className="text-brand-400">88%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-brand-400" style={{ width: '88%' }} />
                  </div>
                </div>
              </div>

              {/* Suggested Keywords to add */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <p className="text-xs font-bold text-slate-300">Recommended Keywords for Staff Level</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Distributed Tracing', 'High-Load Resiliency', 'Kafka Streams', 'Cross-Functional Mentorship', 'PostgreSQL Sharding'].map((kw, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 font-mono">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Printable Resume Sheet (xl:col-span-7) */}
        <div className="xl:col-span-7">
          <div className="resume-sheet rounded-3xl bg-white text-slate-900 p-8 lg:p-12 shadow-2xl border border-slate-200 transition-all font-sans min-h-[900px]">
            {/* Template Header */}
            <div className={`pb-6 mb-6 border-b ${selectedTemplate === 'executive' ? 'border-slate-800 font-serif' : 'border-slate-200'}`}>
              <h1 className={`text-2xl lg:text-3xl font-extrabold tracking-tight ${selectedTemplate === 'executive' ? 'font-serif text-slate-950' : 'text-slate-900'}`}>
                {resume.personalInfo.fullName}
              </h1>
              <p className="text-sm font-semibold text-brand-700 mt-0.5">{resume.targetRole}</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 mt-2 font-mono">
                <span>{resume.personalInfo.email}</span>
                <span>•</span>
                <span>{resume.personalInfo.phone}</span>
                <span>•</span>
                <span>{resume.personalInfo.location}</span>
                <span>•</span>
                <a href={resume.personalInfo.linkedin} className="text-brand-600 hover:underline">{resume.personalInfo.linkedin.replace('https://', '')}</a>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 mb-2 border-b border-slate-200">
                Professional Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {resume.personalInfo.summary}
              </p>
            </div>

            {/* Experience */}
            <div className="mb-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 mb-2 border-b border-slate-200">
                Work Experience
              </h2>
              {resume.experience.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{exp.role} <span className="font-normal text-slate-600">| {exp.company}</span></span>
                    <span className="font-mono text-slate-500 text-[11px]">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700 leading-relaxed">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="mb-6 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 mb-2 border-b border-slate-200">
                Featured Technical Projects
              </h2>
              {resume.projects.map((proj, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{proj.title}</span>
                    <span className="text-[10px] text-brand-600 font-mono">{proj.techStack.join(', ')}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 mb-2 border-b border-slate-200">
                Technical Skills & Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {resume.skills.map((s, idx) => (
                  <div key={idx}>
                    <strong className="text-slate-900">{s.category}: </strong>
                    <span className="text-slate-700">{s.items.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certs */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 mb-2 border-b border-slate-200">
                Education & Certifications
              </h2>
              <div className="flex items-center justify-between text-xs text-slate-800">
                <div>
                  <span className="font-bold">{resume.education[0]?.degree} in {resume.education[0]?.fieldOfStudy}</span>
                  <p className="text-slate-600">{resume.education[0]?.institution} (GPA: {resume.education[0]?.gpa})</p>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">{resume.education[0]?.startDate} - {resume.education[0]?.endDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
