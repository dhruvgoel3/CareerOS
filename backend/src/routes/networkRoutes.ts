import { Router, Request, Response } from 'express';
import { mockMentors, mockPosts, mockUser } from '../data/mockDatabase.js';

const router = Router();

let mentors = [...mockMentors];
let posts = [...mockPosts];

// Community feed
router.get('/posts', (req: Request, res: Response) => {
  return res.json({ success: true, posts });
});

router.post('/posts', (req: Request, res: Response) => {
  const { content, tags } = req.body;
  const newPost = {
    id: `post-${Date.now()}`,
    authorName: mockUser.name,
    authorTitle: mockUser.title,
    authorAvatar: mockUser.avatarUrl,
    timeAgo: 'Just now',
    content,
    tags: tags || ['CareerOS', 'Discussion'],
    likesCount: 0,
    commentsCount: 0,
    hasLiked: false
  };
  posts.unshift(newPost);
  return res.status(201).json({ success: true, post: newPost });
});

router.post('/posts/:id/like', (req: Request, res: Response) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  post.hasLiked = !post.hasLiked;
  post.likesCount += post.hasLiked ? 1 : -1;
  return res.json({ success: true, post });
});

// Mentors
router.get('/mentors', (req: Request, res: Response) => {
  return res.json({ success: true, mentors });
});

router.post('/mentors/book', (req: Request, res: Response) => {
  const { mentorId, preferredDate, topic } = req.body;
  const mentor = mentors.find(m => m.id === mentorId);
  return res.json({
    success: true,
    message: `1-on-1 mentorship session requested with ${mentor?.name || 'Mentor'}. Confirmation sent to your email.`,
    session: {
      mentorName: mentor?.name,
      preferredDate: preferredDate || 'Next Tuesday, 4:00 PM EST',
      topic: topic || 'System Architecture & Career Strategy Review',
      status: 'Confirmed'
    }
  });
});

export default router;
