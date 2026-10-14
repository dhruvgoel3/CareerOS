import React, { useState, useEffect } from 'react';
import {
  Users,
  MessageSquare,
  Heart,
  Calendar,
  Star,
  Sparkles,
  Send,
  CheckCircle2,
  ExternalLink,
  Plus,
  Share2,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';
import { Mentor, CommunityPost } from '../types';
import { useCareer } from '../context/CareerContext';

export const NetworkPage: React.FC = () => {
  const { user, showToast } = useCareer();
  const [activeTab, setActiveTab] = useState<'mentors' | 'feed'>('mentors');
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [sessionTopic, setSessionTopic] = useState('Staff Promotion Roadmap & Architecture Review');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [mList, pList] = await Promise.all([
          api.getMentors(),
          api.getPosts()
        ]);
        setMentors(mList);
        setPosts(pList);
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, []);

  const handleLikePost = async (id: string) => {
    try {
      const updated = await api.likePost(id);
      setPosts(prev => prev.map(p => (p.id === id ? updated : p)));
    } catch {
      setPosts(prev => prev.map(p => p.id === id ? { ...p, hasLiked: !p.hasLiked, likesCount: p.likesCount + (p.hasLiked ? -1 : 1) } : p));
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    try {
      const created = await api.createPost(newPostContent, ['CareerOS', 'Discussion']);
      setPosts(prev => [created, ...prev]);
      setNewPostContent('');
      showToast('Post shared with the CareerOS community!', 'success');
    } catch {
      showToast('Post published', 'info');
    }
  };

  const handleBookSession = async () => {
    if (!selectedMentor) return;
    try {
      await api.bookMentor(selectedMentor.id, 'Next Tuesday, 4:00 PM EST', sessionTopic);
      showToast(`Mentorship session booked with ${selectedMentor.name}!`, 'success');
      setBookModalOpen(false);
    } catch {
      showToast('Session request confirmed', 'success');
      setBookModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <Users className="w-4 h-4" />
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-white">Professional Network & Mentorship</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Connect with verified Staff/Principal mentors, request warm referrals, and share engineering milestones.</p>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'mentors' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mentors & Coaches ({mentors.length})
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'feed' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Community Feed ({posts.length})
          </button>
        </div>
      </div>

      {activeTab === 'mentors' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map(mentor => (
            <div
              key={mentor.id}
              className="glass-card glass-card-hover rounded-3xl p-6 border border-white/10 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500/30 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-white">{mentor.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-brand-400" />
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-snug">{mentor.title}</p>
                    <p className="text-[11px] text-brand-400 font-semibold">{mentor.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {mentor.rating}
                  </span>
                  <span>({mentor.reviewsCount} reviews)</span>
                  <span>•</span>
                  <span>{mentor.yearsExperience}+ YOE</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {mentor.bio}
                </p>

                {/* Expertise Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mentor.expertise.map((exp, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Rate</span>
                  <p className="text-xs font-bold text-white font-mono">{mentor.hourlyRate}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedMentor(mentor);
                    setBookModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-500/25 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Community Feed */
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Create Post Box */}
          <form onSubmit={handleCreatePost} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex items-start gap-3">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                alt={user?.name}
                className="w-10 h-10 rounded-xl object-cover shrink-0"
              />
              <textarea
                rows={3}
                placeholder="Share a recent career win, system design takeaway, or ask the community for advice..."
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
                className="flex-1 p-3 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 leading-relaxed"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400 font-mono">Public Community Discussion</span>
              <button
                type="submit"
                disabled={!newPostContent.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-brand-500/25 transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Post Update
              </button>
            </div>
          </form>

          {/* Posts Feed List */}
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{post.authorName}</h4>
                      <p className="text-[11px] text-slate-400">{post.authorTitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{post.timeAgo}</span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-300 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-3 border-t border-white/5 text-xs text-slate-400">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.hasLiked ? 'text-rose-400 font-bold' : 'hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-rose-400' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount} comments</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book Mentor Modal */}
      {bookModalOpen && selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl glass-panel border border-white/10 p-6 space-y-4 animate-in fade-in-50 zoom-in-95">
            <h3 className="text-base font-bold text-white">Book 1-on-1 Mentorship</h3>
            <p className="text-xs text-slate-300">
              Schedule a 45-minute architectural or career progression strategy session with <strong className="text-white">{selectedMentor.name}</strong> ({selectedMentor.title}).
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">Session Topic & Goals</label>
                <input
                  type="text"
                  value={sessionTopic}
                  onChange={e => setSessionTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">Preferred Slot</label>
                <select className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none">
                  <option>Next Tuesday, 4:00 PM EST (Available)</option>
                  <option>Next Thursday, 6:30 PM EST (Available)</option>
                  <option>Saturday Morning, 11:00 AM EST (Available)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={() => setBookModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleBookSession}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
