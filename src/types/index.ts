export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  screenshotUrl: string;
  liveUrl: string;
  githubUrl?: string;
  category: 'SaaS' | 'E-Commerce' | 'Portfólio' | 'Web App' | 'Landing Page' | 'API/Backend';
  techStack: string[];
  client?: string;
  completedDate: string;
  featured: boolean;
  highlights?: string[];
  commentsCount?: number;
  viewsCount?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  coverUrl: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  projectId?: string; // Related project
  commentsCount?: number;
  viewsCount?: number;
  judgeScore?: number;
  judgeVerdict?: string;
  sourceUrl?: string;
}

export interface Comment {
  id: string;
  targetType: 'project' | 'blog';
  targetId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  approved: boolean;
  likes: number;
  replies?: Comment[];
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin';
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  order?: number;
  active?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  email?: string;
  whatsapp?: string;
  featured?: boolean;
  order?: number;
  active?: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: 'client' | 'admin';
  senderName: string;
  text: string;
  createdAt: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  createdAt: string;
  lastMessageAt: string;
  lastMessageText: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export type ThemeMode = 'light' | 'dark';

export interface AutonomousNewsTask {
  id: string;
  name: string;
  topicPrompt: string;
  category: string;
  scheduleIntervalHours: number; // e.g. 1, 3, 6, 12, 24
  targetHour?: number; // 0 to 23 for daily run
  enabled: boolean;
  autoPublish: boolean;
  lastRunAt?: string;
  lastRunStatus?: 'success' | 'error';
  lastRunMessage?: string;
  lastJudgeScore?: number;
  lastJudgeVerdict?: string;
  articlesGeneratedCount: number;
  createdAt: string;
}
