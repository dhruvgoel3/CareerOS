import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Volume2,
  Code,
  Layers,
  ChevronDown,
  ChevronUp,
  Award,
  Flame,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { InterviewQuestion } from '../types';
import { triggerConfetti } from '../utils/confetti';

export const InterviewsPage: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'simulator' | 'bank'>('simulator');
  const [bankCategory, setBankCategory] = useState<string>('All');
  const [expandedQId, setExpandedQId] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const qList = await api.getQuestions();
        setQuestions(qList);
        if (qList.length > 0) {
          setSelectedQuestion(qList[0]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadQuestions();
  }, []);

  // Timer simulation during voice recording
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      if (!userAnswer) {
        setUserAnswer('In our system architecture, we first decouple the ingestion layer with an edge API gateway and rate limiter...');
      }
    } else {
      setIsRecording(false);
    }
  };

  const handleEvaluate = async () => {
    if (!selectedQuestion || !userAnswer.trim()) return;
    setEvaluating(true);
    try {
      const res = await api.evaluateAnswer(selectedQuestion.question, userAnswer, selectedQuestion.category);
      setEvaluationResult(res);
      if (res.overallScore >= 85) {
        triggerConfetti();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluating(false);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const filteredQuestions = bankCategory === 'All'
    ? questions
    : questions.filter(q => q.category.toLowerCase().includes(bankCategory.toLowerCase()));

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <Mic className="w-4 h-4" />
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-white">AI Mock Interview Simulator</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Real-time answer grading, STAR frameworks, and high-frequency technical drills.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'simulator' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mock Arena
            </button>
            <button
              onClick={() => setActiveTab('bank')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'bank' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Question Bank ({questions.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'simulator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Question & Voice Arena (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Question Prompt Card */}
            {selectedQuestion && (
              <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    {selectedQuestion.category} • {selectedQuestion.difficulty}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Question 1 of {questions.length}</span>
                </div>

                <h2 className="text-lg lg:text-xl font-bold text-white leading-snug">
                  {selectedQuestion.question}
                </h2>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <p className="text-[10px] font-bold text-brand-300 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Structured Framework Tip
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedQuestion.frameworkTip}</p>
                </div>
              </div>
            )}

            {/* Response Input / Recording Area */}
            <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Your Response</span>
                  {isRecording && (
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-rose-400" /> REC {formatTimer(recordingSeconds)}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleToggleRecord}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isRecording
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-brand-400" />}
                  {isRecording ? 'Stop Voice Recording' : 'Start Voice Simulation'}
                </button>
              </div>

              <textarea
                rows={6}
                placeholder="Type or speak your answer using structured steps (Situation -> Architecture -> Trade-offs -> Results)..."
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 leading-relaxed font-sans"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400 font-mono">
                  {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
                </span>

                <button
                  onClick={handleEvaluate}
                  disabled={evaluating || !userAnswer.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-brand-500/25 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  {evaluating ? 'Grading Answer...' : 'Evaluate with AI'}
                </button>
              </div>
            </div>
          </div>

          {/* AI Scorecard & Feedback (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {evaluationResult ? (
              <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6 animate-in fade-in-50">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-sm font-bold text-white">AI Evaluation Scorecard</h3>
                    <p className="text-[11px] text-slate-400">Technical Rigor & Communication</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black font-mono text-emerald-400">{evaluationResult.overallScore}</span>
                    <span className="text-xs font-mono text-slate-500">/100</span>
                  </div>
                </div>

                {/* Breakdown Progress Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>Technical Depth & Trade-offs</span>
                      <span className="text-brand-300 font-mono">{evaluationResult.depthScore}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-brand-400" style={{ width: `${evaluationResult.depthScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>Structure & Logical Flow</span>
                      <span className="text-emerald-400 font-mono">{evaluationResult.structureScore}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-emerald-400" style={{ width: `${evaluationResult.structureScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>Clarity & Assertiveness</span>
                      <span className="text-indigo-400 font-mono">{evaluationResult.clarityScore}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-indigo-400" style={{ width: `${evaluationResult.clarityScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* Key Strengths */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> What You Did Well
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {evaluationResult.strengths.map((s: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvement Areas */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> How to Elevate to Staff Level
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {evaluationResult.improvementAreas.map((imp: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Follow-up Question Drill */}
                {evaluationResult.suggestedFollowUpQuestion && (
                  <div className="p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/20 space-y-1">
                    <p className="text-[10px] font-bold text-brand-300 uppercase tracking-wider">Interviewer Follow-up Drill</p>
                    <p className="text-xs text-slate-200">{evaluationResult.suggestedFollowUpQuestion}</p>
                  </div>
                )}
              </div>
            ) : (
              /* Idle Mock Tips Card */
              <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 text-center py-12">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Live AI Grading Ready</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Record your answer or type out your explanation. AI evaluates technical depth, STAR framework alignment, and communication clarity.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Question Bank Tab */
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'System Design', 'Algorithms', 'Frontend', 'Backend', 'Behavioral (STAR)'].map(cat => (
              <button
                key={cat}
                onClick={() => setBankCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  bankCategory === cat
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredQuestions.map(q => {
              const isExpanded = expandedQId === q.id;
              return (
                <div key={q.id} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300">
                          {q.category}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          q.difficulty === 'Hard' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm lg:text-base text-white">{q.question}</h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setSelectedQuestion(q);
                          setActiveTab('simulator');
                          setUserAnswer('');
                          setEvaluationResult(null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all"
                      >
                        Practice in Arena
                      </button>
                      <button
                        onClick={() => setExpandedQId(isExpanded ? null : q.id)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/5"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="pt-3 border-t border-white/5 space-y-3 text-xs animate-in fade-in-50">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <p className="font-bold text-brand-300 mb-1">Model Answer / Architecture:</p>
                        <p className="text-slate-300 leading-relaxed">{q.sampleAnswer}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                          <p className="font-bold text-emerald-300 mb-1">Key High-Scoring Points:</p>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                            {q.keyPoints.map((kp, i) => (
                              <li key={i}>{kp}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20">
                          <p className="font-bold text-rose-300 mb-1">Common Candidate Pitfalls:</p>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                            {q.commonMistakes.map((cm, i) => (
                              <li key={i}>{cm}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
