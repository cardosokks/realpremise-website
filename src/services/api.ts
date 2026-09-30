import { Project, BlogPost, Comment, Subscriber, User, AuthResponse, ChatSession, ChatMessage, Partner, TeamMember, AutonomousNewsTask } from '../types';
import { INITIAL_PARTNERS, INITIAL_TEAM_MEMBERS } from '../data/initialData';

const TOKEN_KEY = 'devgallery_jwt_token';

export const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setStoredToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const authHeaders = (): HeadersInit => {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// ================= AUTH =================
export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Falha ao autenticar.');
  }

  if (data.token) {
    setStoredToken(data.token);
  }
  return data;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/auth/me', {
      headers: authHeaders()
    });
    if (!res.ok) {
      removeStoredToken();
      return null;
    }
    const data = await res.json();
    return data.user;
  } catch (err) {
    return null;
  }
}

export function logout() {
  removeStoredToken();
}

export async function updateProfile(data: { name?: string; email?: string; newPassword?: string; avatar?: string }) {
  const res = await fetch('/api/auth/profile', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Erro ao atualizar perfil.');
  return resData;
}

// ================= PROJECTS =================
export async function fetchProjects(filters?: { category?: string; search?: string; tag?: string; featured?: boolean }): Promise<Project[]> {
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.tag) params.append('tag', filters.tag);
  if (filters?.featured) params.append('featured', 'true');

  const url = `/api/projects${params.toString() ? '?' + params.toString() : ''}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao carregar projetos.');
  return data;
}

export async function fetchProjectById(id: string): Promise<Project & { comments: Comment[] }> {
  const res = await fetch(`/api/projects/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Projeto não encontrado.');
  return data;
}

export async function createProject(project: Partial<Project>): Promise<Project> {
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(project)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao criar projeto.');
  return data;
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project> {
  const res = await fetch(`/api/projects/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(project)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao atualizar projeto.');
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`/api/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao excluir projeto.');
}

// ================= BLOG =================
export async function fetchBlogPosts(filters?: { category?: string; tag?: string; search?: string }): Promise<BlogPost[]> {
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.tag) params.append('tag', filters.tag);
  if (filters?.search) params.append('search', filters.search);

  const url = `/api/blog${params.toString() ? '?' + params.toString() : ''}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao carregar artigos.');
  return data;
}

export async function fetchBlogPostById(idOrSlug: string): Promise<BlogPost & { comments: Comment[] }> {
  const res = await fetch(`/api/blog/${idOrSlug}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Artigo não encontrado.');
  return data;
}

export async function createBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(post)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao criar artigo.');
  return data;
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
  const res = await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(post)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao atualizar artigo.');
  return data;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const res = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao excluir artigo.');
}

// ================= COMMENTS =================
export async function fetchComments(targetType?: 'project' | 'blog', targetId?: string): Promise<Comment[]> {
  const params = new URLSearchParams();
  if (targetType) params.append('targetType', targetType);
  if (targetId) params.append('targetId', targetId);

  const url = `/api/comments${params.toString() ? '?' + params.toString() : ''}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao carregar comentários.');
  return data;
}

export async function postComment(comment: { targetType: 'project' | 'blog'; targetId: string; authorName: string; authorEmail: string; content: string }): Promise<Comment> {
  const res = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao enviar comentário.');
  return data;
}

export async function approveComment(id: string): Promise<Comment> {
  const res = await fetch(`/api/comments/${id}/approve`, {
    method: 'PUT',
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao aprovar comentário.');
  return data;
}

export async function likeComment(id: string): Promise<{ id: string; likes: number }> {
  const res = await fetch(`/api/comments/${id}/like`, { method: 'POST' });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao curtir comentário.');
  return data;
}

export async function deleteComment(id: string): Promise<void> {
  const res = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao remover comentário.');
}

// ================= NEWSLETTER =================
export async function subscribeNewsletter(email: string, name?: string): Promise<{ message: string }> {
  const res = await fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao se inscrever.');
  return data;
}

export async function fetchSubscribers(): Promise<Subscriber[]> {
  const res = await fetch('/api/newsletter/subscribers', {
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao carregar inscritos.');
  return data;
}

export async function deleteSubscriber(id: string): Promise<void> {
  const res = await fetch(`/api/newsletter/subscribers/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao remover inscrito.');
}

// ================= AI GENERATOR =================
export async function generateAiBlogPost(promptData: { projectTitle?: string; projectTech?: string[]; topicPrompt?: string; category?: string }) {
  const res = await fetch('/api/ai/generate-blog', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(promptData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro na geração por IA.');
  return data;
}

// ================= MESSAGES & LIVE CHAT =================
export async function fetchChatSessions(): Promise<ChatSession[]> {
  const res = await fetch('/api/messages', {
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao carregar mensagens.');
  return data;
}

export async function fetchChatSession(sessionId: string): Promise<ChatSession> {
  const res = await fetch(`/api/messages?sessionId=${encodeURIComponent(sessionId)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Sessão de chat não encontrada.');
  return data;
}

export async function sendClientMessage(payload: { sessionId?: string; clientName?: string; clientEmail?: string; clientPhone?: string; text: string }): Promise<{ session: ChatSession; message: ChatMessage }> {
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao enviar mensagem.');
  return data;
}

export async function sendAdminReply(sessionId: string, text: string): Promise<{ session: ChatSession; message: ChatMessage }> {
  const res = await fetch('/api/messages/reply', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ sessionId, text })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao enviar resposta.');
  return data;
}

export async function markChatSessionRead(sessionId: string): Promise<ChatSession> {
  const res = await fetch(`/api/messages/${sessionId}/read`, {
    method: 'PUT',
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao marcar como lida.');
  return data;
}

export async function deleteChatSession(sessionId: string): Promise<void> {
  const res = await fetch(`/api/messages/${sessionId}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao excluir conversa.');
}

// ================= PARTNERS =================
const PARTNERS_STORAGE_KEY = 'realpremise_partners_cache';

export async function fetchPartners(): Promise<Partner[]> {
  try {
    const res = await fetch('/api/partners');
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('Usando cache local de parceiros');
  }

  const cached = localStorage.getItem(PARTNERS_STORAGE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }
  return INITIAL_PARTNERS;
}

export async function createPartner(partner: Omit<Partner, 'id'>): Promise<Partner> {
  const res = await fetch('/api/partners', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(partner)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao cadastrar parceiro.');

  // Update local cache
  const cached = localStorage.getItem(PARTNERS_STORAGE_KEY);
  const current: Partner[] = cached ? JSON.parse(cached) : INITIAL_PARTNERS;
  const updated = [...current, data];
  localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(updated));

  return data;
}

export async function updatePartner(id: string, updates: Partial<Partner>): Promise<Partner> {
  const res = await fetch(`/api/partners/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(updates)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao atualizar parceiro.');

  // Update local cache
  const cached = localStorage.getItem(PARTNERS_STORAGE_KEY);
  if (cached) {
    const current: Partner[] = JSON.parse(cached);
    const updated = current.map(p => (p.id === id ? { ...p, ...data } : p));
    localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(updated));
  }

  return data;
}

export async function deletePartner(id: string): Promise<void> {
  const res = await fetch(`/api/partners/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao excluir parceiro.');

  // Update local cache
  const cached = localStorage.getItem(PARTNERS_STORAGE_KEY);
  if (cached) {
    const current: Partner[] = JSON.parse(cached);
    const updated = current.filter(p => p.id !== id);
    localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(updated));
  }
}

// ================= TEAM MEMBERS =================
const TEAM_STORAGE_KEY = 'realpremise_team_cache';

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetch('/api/team');
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('Usando cache local de membros da equipe');
  }

  const cached = localStorage.getItem(TEAM_STORAGE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }
  return INITIAL_TEAM_MEMBERS;
}

export async function createTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  const res = await fetch('/api/team', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(member)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao cadastrar membro da equipe.');

  // Update local cache
  const cached = localStorage.getItem(TEAM_STORAGE_KEY);
  const current: TeamMember[] = cached ? JSON.parse(cached) : INITIAL_TEAM_MEMBERS;
  const updated = [...current, data];
  localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(updated));

  return data;
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember> {
  const res = await fetch(`/api/team/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(updates)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao atualizar membro da equipe.');

  // Update local cache
  const cached = localStorage.getItem(TEAM_STORAGE_KEY);
  if (cached) {
    const current: TeamMember[] = JSON.parse(cached);
    const updated = current.map(m => (m.id === id ? { ...m, ...data } : m));
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(updated));
  }

  return data;
}

export async function deleteTeamMember(id: string): Promise<void> {
  const res = await fetch(`/api/team/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao excluir membro da equipe.');

  // Update local cache
  const cached = localStorage.getItem(TEAM_STORAGE_KEY);
  if (cached) {
    const current: TeamMember[] = JSON.parse(cached);
    const updated = current.filter(m => m.id !== id);
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(updated));
  }
}

// ================= AUTONOMOUS AI NEWS TASKS =================
export async function fetchAutonomousTasks(): Promise<AutonomousNewsTask[]> {
  const res = await fetch('/api/ai/tasks', {
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao carregar tarefas autônomas.');
  return data;
}

export async function createAutonomousTask(task: Omit<AutonomousNewsTask, 'id' | 'createdAt' | 'articlesGeneratedCount'>): Promise<AutonomousNewsTask> {
  const res = await fetch('/api/ai/tasks', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(task)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao criar tarefa autônoma.');
  return data;
}

export async function updateAutonomousTask(id: string, updates: Partial<AutonomousNewsTask>): Promise<AutonomousNewsTask> {
  const res = await fetch(`/api/ai/tasks/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(updates)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao atualizar tarefa autônoma.');
  return data;
}

export async function deleteAutonomousTask(id: string): Promise<void> {
  const res = await fetch(`/api/ai/tasks/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao excluir tarefa autônoma.');
}

export async function runAutonomousTask(id: string): Promise<{ message: string; task: AutonomousNewsTask; post: BlogPost }> {
  const res = await fetch(`/api/ai/tasks/${id}/run`, {
    method: 'POST',
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao executar tarefa autônoma.');
  return data;
}

