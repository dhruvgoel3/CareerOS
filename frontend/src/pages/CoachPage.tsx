import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Compass,
  DollarSign,
  Briefcase,
  ChevronRight,
  RefreshCw,
  Copy,
  Check,
  ShieldAlert,
  Award,
  Layers
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { api } from '../services/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const CoachPage: React.FC = () => {
  const { user } = useCareer();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      role: 'assistant',
      content: `👋 Hello Alex! I am your **AI Career Coach & Technical Advisor**.

I am tuned to help you break through from **${user?.title || 'Mid/Senior Fullstack'}** to **${user?.targetRole || 'Staff / Lead Architect'}**.

Here are some high-impact areas we can work on:
- 💼 **Salary & Equity Negotiation**: Simulate counter-offer scripts for $185k–$220k bands.
- 🗺️ **Career Roadmap Generation**: Build your quarter-by-quarter technical promotion strategy.
- 🎯 **System Architecture & Design**: Practice trade-off explanations (CAP, Kafka, Caching).
- 📝 **Resume Polish & STAR Bullets**: Rewrite weak accomplishments into quantified metrics.

How can I help you accelerate today?`,
      timestamp: 'Just now'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<'tech_lead' | 'executive_coach' | 'startup_founder' | 'resume_specialist'>('tech_lead');
  const [activeTab, setActiveTab] = useState<'chat' | 'roadmap' | 'salary'>('chat');
  const [roadmap, setRoadmap] = useState<any>(null);
  const [salaryData, setSalaryData] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputMessage;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const chatHistory = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      const response = await api.sendCoachMessage(chatHistory, selectedPersona);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `bot-fallback-${Date.now()}`,
        role: 'assistant',
        content: `### 🎯 Strategic Recommendation\n\nTo move toward **${user?.targetRole}**, focus heavily on cross-team architectural initiatives and quantifying every production milestone in terms of latency, availability, and revenue impact.\n\nWould you like to generate a step-by-step roadmap or drill into interview questions?`,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    try {
      const data = await api.generateRoadmap(user?.title || 'Full Stack Engineer', user?.targetRole || 'Senior Staff Engineer');
      setRoadmap(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSalary = async () => {
    try {
      const data = await api.getSalaryInsights(user?.targetRole || 'Senior Full Stack Engineer');
      setSalaryData(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (activeTab === 'roadmap' && !roadmap) {
      handleGenerateRoadmap();
    }
    if (activeTab === 'salary' && !salaryData) {
      handleLoadSalary();
    }
  }, [activeTab]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const personas = [
    { id: 'tech_lead', label: 'FAANG Tech Lead', desc: 'Focuses on systems scale, RFCs, and code review rigor' },
    { id: 'executive_coach', label: 'Executive Career Mentor', desc: 'Specializes in promotion packets, leadership, and salary negotiation' },
    { id: 'startup_founder', label: 'Y Combinator Founder', desc: 'Values 10x shipping velocity, ownership, and zero-to-one problem solving' },
    { id: 'resume_specialist', label: 'ATS Resume Specialist', desc: 'Optimizes keywords, STAR metric formatting, and recruiter conversion' }
  ];

  const starterPrompts = [
    'How should I respond to a low initial salary offer of $160k?',
    'Give me a 30-60-90 day plan for transitioning into a Staff Engineer role.',
    'How do I explain trade-offs between Redis caching and PostgreSQL partitioning in an interview?',
    'Critique my promotion pitch to my Engineering Director.'
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Module Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <Bot className="w-4 h-4" />
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-white">AI Career Coach</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Autonomous mentorship, career strategy, and compensation intelligence.</p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'chat' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Advisor Chat
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'roadmap' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Career Roadmap
          </button>
          <button
            onClick={() => setActiveTab('salary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'salary' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Salary Intelligence
          </button>
        </div>
      </div>

      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Persona Picker & Starter Prompts */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Coach Persona</h3>
              <div className="space-y-2">
                {personas.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPersona(p.id as any)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                      selectedPersona === p.id
                        ? 'bg-brand-600/20 border-brand-500/40 text-white shadow-sm'
                        : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-200">{p.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Starters */}
            <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Quick Coaching Prompts</h3>
              <div className="space-y-2">
                {starterPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full text-left p-2 rounded-xl bg-white/[0.02] hover:bg-brand-600/15 border border-white/5 hover:border-brand-500/30 text-xs text-slate-300 hover:text-brand-200 transition-all leading-snug"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Chat Window */}
          <div className="lg:col-span-3 flex flex-col h-[650px] glass-card rounded-3xl border border-white/10 overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-brand-500/20">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`relative max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20 rounded-tr-sm'
                      : 'glass-panel border border-white/10 text-slate-200 rounded-tl-sm'
                  }`}>
                    <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                    
                    <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400/80">
                      <span>{msg.timestamp}</span>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="hover:text-white transition-colors"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/10 text-slate-300 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-brand-300 font-mono animate-pulse pl-11">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Coach is analyzing career benchmarks...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-slate-900/60 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder={`Ask your ${personas.find(p => p.id === selectedPersona)?.label}...`}
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="p-3 rounded-2xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white shadow-lg shadow-brand-500/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">
                Career Roadmap: <span className="gradient-brand">{user?.title} → {user?.targetRole}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Structured 6-month progression milestones with verifiable deliverables.</p>
            </div>
            <button
              onClick={handleGenerateRoadmap}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Regenerate Roadmap
            </button>
          </div>

          {roadmap && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roadmap.phases.map((phase: any) => (
                <div key={phase.phase} className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                      Phase {phase.phase}: {phase.duration}
                    </span>
                    <span className="text-xs font-bold text-slate-400 font-mono">Month {phase.phase * 2 - 1}-{phase.phase * 2}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{phase.title}</h3>
                    <p className="text-xs text-brand-400 font-medium mt-1">Focus: {phase.focus}</p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Target Deliverables</p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {phase.milestones.map((m: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-400 mt-0.5 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'salary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
              <span className="text-xs font-bold uppercase text-slate-400">Target Role Base Band</span>
              <p className="text-2xl font-black text-white font-mono">{salaryData?.baseSalaryRange || '$170,000 - $205,000'}</p>
              <p className="text-xs text-emerald-400 font-medium">+8.4% YoY Market Premium</p>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
              <span className="text-xs font-bold uppercase text-slate-400">Total Compensation (TC)</span>
              <p className="text-2xl font-black text-brand-300 font-mono">{salaryData?.totalCompensationRange || '$210,000 - $265,000'}</p>
              <p className="text-xs text-slate-400">Includes annual equity + target bonus</p>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-2">
              <span className="text-xs font-bold uppercase text-slate-400">Negotiation Leverage</span>
              <p className="text-2xl font-black text-amber-400 font-mono">Very High</p>
              <p className="text-xs text-slate-400">3 Active interview pipelines active</p>
            </div>
          </div>

          {/* Tactical Negotiation Playbook */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Tactical Offer Counter-Script Playbook
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <p className="font-bold text-brand-300">Scenario: Pushing for Upper Band Base Salary</p>
                <p className="text-slate-300 italic">
                  "I'm thrilled about the team's vision on the core AI platform. Based on my distributed systems leadership and current competitive market benchmarks, I was targeting $195k base. If we can meet at $195k, I am ready to sign today."
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <p className="font-bold text-brand-300">Scenario: When Base is Capped (Signing Bonus & Equity)</p>
                <p className="text-slate-300 italic">
                  "I understand the base band constraint for this level. To bridge the difference from my target, could we explore a $25,000 upfront signing bonus or an additional 15% equity grant with standard 4-year vesting?"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
