import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Edit3, Trash2, CheckCircle, Sparkles, User, Key, Layers, 
  BookOpen, MessageSquare, Mail, Download, RefreshCw, Send, AlertCircle, 
  MessageCircle, Phone, Building2, Upload, Link2, ExternalLink, Image as ImageIcon,
  Users, BarChart3, LayoutDashboard, Globe, Shield, ChevronRight, Search, 
  SlidersHorizontal, Check, Eye, ArrowLeft, Menu, Tag, Linkedin, Github,
  Bot, Play, Clock, Calendar, CheckCircle2, Loader2
} from 'lucide-react';
import { 
  Project, BlogPost, Comment, Subscriber, User as UserType, ChatSession, Partner, TeamMember, AutonomousNewsTask 
} from '../types';
import { 
  createProject, updateProject, deleteProject, createBlogPost, updateBlogPost, 
  deleteBlogPost, updateProfile, generateAiBlogPost, fetchChatSessions, 
  sendAdminReply, markChatSessionRead, deleteChatSession, createPartner, 
  updatePartner, deletePartner, fetchTeamMembers, createTeamMember, 
  updateTeamMember, deleteTeamMember, deleteComment, deleteSubscriber,
  fetchAutonomousTasks, createAutonomousTask, updateAutonomousTask, deleteAutonomousTask, runAutonomousTask
} from '../services/api';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType;
  projects: Project[];
  blogPosts: BlogPost[];
  comments: Comment[];
  subscribers: Subscriber[];
  partners?: Partner[];
  teamMembers?: TeamMember[];
  onRefreshData: () => void;
  onLogout: () => void;
}

type AdminTab = 'dashboard' | 'projects' | 'blog' | 'ai-tasks' | 'team' | 'partners' | 'chats' | 'comments' | 'subscribers' | 'profile';

// Subcomponent for Partner Thumbnail
const AdminPartnerCardItem: React.FC<{
  partner: Partner;
  onEdit: (partner: Partner) => void;
  onDelete: (id: string, name: string) => void;
}> = ({ partner, onEdit, onDelete }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-3 shadow-xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-12 h-12 rounded-xl p-1 bg-white border border-slate-200 shadow-xs flex items-center justify-center shrink-0 overflow-hidden">
          {!imgError && partner.logoUrl ? (
            <img
              src={partner.logoUrl}
              alt={partner.name}
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              {partner.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {partner.name}
            </h4>
            <span
              className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                partner.active !== false
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {partner.active !== false ? 'Ativo no Ticker' : 'Pausado'}
            </span>
          </div>

          {partner.websiteUrl ? (
            <a
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mt-0.5 truncate"
            >
              <span className="truncate">{partner.websiteUrl.replace(/^https?:\/\//, '')}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          ) : (
            <span className="text-xs text-slate-400">Sem link externo</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => onEdit(partner)}
          className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Editar parceiro"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(partner.id, partner.name)}
          className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          title="Excluir parceiro"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Subcomponent for Team Member Card in Admin
const AdminTeamMemberItem: React.FC<{
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string, name: string) => void;
}> = ({ member, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
          <img
            src={member.avatarUrl}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600';
            }}
          />
          {member.featured && (
            <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900" title="Destaque" />
          )}
        </div>

        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {member.name}
            </h4>
            <span
              className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                member.active !== false
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {member.active !== false ? 'Visível na Equipe' : 'Oculto'}
            </span>
            {member.featured && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                Lead
              </span>
            )}
          </div>

          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-mono truncate">
            {member.role}
          </p>

          <div className="flex flex-wrap gap-1 pt-0.5">
            {member.skills?.slice(0, 4).map((sk, idx) => (
              <span key={idx} className="px-1.5 py-0.5 text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                {sk}
              </span>
            ))}
            {(member.skills?.length || 0) > 4 && (
              <span className="text-[9px] text-slate-400 font-mono">
                +{(member.skills?.length || 0) - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
        <button
          type="button"
          onClick={() => onEdit(member)}
          className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Editar membro"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(member.id, member.name)}
          className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          title="Excluir membro"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  projects,
  blogPosts,
  comments,
  subscribers,
  partners = [],
  teamMembers = [],
  onRefreshData,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Live Chat Sessions State
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [selectedChatSession, setSelectedChatSession] = useState<ChatSession | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Project Modal State
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectLongDesc, setProjectLongDesc] = useState('');
  const [projectCategory, setProjectCategory] = useState<Project['category']>('SaaS');
  const [projectLiveUrl, setProjectLiveUrl] = useState('');
  const [projectGithubUrl, setProjectGithubUrl] = useState('');
  const [projectScreenshot, setProjectScreenshot] = useState('');
  const [projectTechStack, setProjectTechStack] = useState('');
  const [projectFeatured, setProjectFeatured] = useState(false);
  const [projectClient, setProjectClient] = useState('');
  const [projectUploadType, setProjectUploadType] = useState<'file' | 'link'>('file');

  // Blog Post Modal State
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postTitle, setPostTitle] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [postSummary, setPostSummary] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('Arquitetura');
  const [postTags, setPostTags] = useState('');
  const [postCoverUrl, setPostCoverUrl] = useState('');
  const [postReadTime, setPostReadTime] = useState('5 min');
  const [postUploadType, setPostUploadType] = useState<'file' | 'link'>('file');
  const [aiPromptTopic, setAiPromptTopic] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  // Partner Modal State
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [partnerName, setPartnerName] = useState('');
  const [partnerLogoUrl, setPartnerLogoUrl] = useState('');
  const [partnerWebsiteUrl, setPartnerWebsiteUrl] = useState('');
  const [partnerActive, setPartnerActive] = useState(true);
  const [partnerUploadType, setPartnerUploadType] = useState<'file' | 'link'>('file');

  // Team Member Modal State
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberBio, setMemberBio] = useState('');
  const [memberAvatarUrl, setMemberAvatarUrl] = useState('');
  const [memberSkillsInput, setMemberSkillsInput] = useState('');
  const [memberGithubUrl, setMemberGithubUrl] = useState('');
  const [memberLinkedinUrl, setMemberLinkedinUrl] = useState('');
  const [memberWebsiteUrl, setMemberWebsiteUrl] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberWhatsapp, setMemberWhatsapp] = useState('');
  const [memberFeatured, setMemberFeatured] = useState(false);
  const [memberActive, setMemberActive] = useState(true);
  const [memberUploadType, setMemberUploadType] = useState<'file' | 'link'>('file');

  // Autonomous News Tasks State
  const [autonomousTasks, setAutonomousTasks] = useState<AutonomousNewsTask[]>([]);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<AutonomousNewsTask | null>(null);
  const [taskName, setTaskName] = useState('');
  const [taskTopicPrompt, setTaskTopicPrompt] = useState('');
  const [taskCategory, setTaskCategory] = useState('Inteligência Artificial');
  const [taskInterval, setTaskInterval] = useState(6);
  const [taskTargetHour, setTaskTargetHour] = useState<string>('');
  const [taskEnabled, setTaskEnabled] = useState(true);
  const [taskAutoPublish, setTaskAutoPublish] = useState(true);
  const [runningTaskId, setRunningTaskId] = useState<string | null>(null);

  // In-App Custom Confirmation Dialog State (Zero iframe blocking)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    itemTitle?: string;
    onConfirm: () => Promise<void> | void;
  } | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // In-App Toast Notification State
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Profile Form State
  const [profName, setProfName] = useState(currentUser.name);
  const [profEmail, setProfEmail] = useState(currentUser.email);
  const [profPassword, setProfPassword] = useState('');
  const [profAvatar, setProfAvatar] = useState(currentUser.avatar);
  const [profMsg, setProfMsg] = useState('');

  // Load chat sessions when chats tab or modal opens
  const loadChatSessions = async () => {
    try {
      setChatLoading(true);
      const sessions = await fetchChatSessions();
      setChatSessions(sessions);
      if (selectedChatSession) {
        const updated = sessions.find(s => s.id === selectedChatSession.id);
        if (updated) setSelectedChatSession(updated);
      }
    } catch (e) {
      console.warn('Erro ao carregar mensagens');
    } finally {
      setChatLoading(false);
    }
  };

  // Load autonomous news tasks
  const loadAutonomousTasks = async () => {
    try {
      const tasks = await fetchAutonomousTasks();
      setAutonomousTasks(tasks);
    } catch (e) {
      console.warn('Erro ao carregar tarefas autônomas');
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadChatSessions();
      loadAutonomousTasks();
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  // File Upload Helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ================= CRUD HANDLERS =================

  // Team CRUD
  const handleOpenMemberForm = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setMemberName(member.name);
      setMemberRole(member.role);
      setMemberBio(member.bio);
      setMemberAvatarUrl(member.avatarUrl);
      setMemberSkillsInput(member.skills ? member.skills.join(', ') : '');
      setMemberGithubUrl(member.githubUrl || '');
      setMemberLinkedinUrl(member.linkedinUrl || '');
      setMemberWebsiteUrl(member.websiteUrl || '');
      setMemberEmail(member.email || '');
      setMemberWhatsapp(member.whatsapp || '');
      setMemberFeatured(Boolean(member.featured));
      setMemberActive(member.active !== false);
      setMemberUploadType(member.avatarUrl.startsWith('data:') ? 'file' : 'link');
    } else {
      setEditingMember(null);
      setMemberName('');
      setMemberRole('');
      setMemberBio('');
      setMemberAvatarUrl('');
      setMemberSkillsInput('React, TypeScript, Node.js, UI/UX');
      setMemberGithubUrl('');
      setMemberLinkedinUrl('');
      setMemberWebsiteUrl('');
      setMemberEmail('');
      setMemberWhatsapp('');
      setMemberFeatured(false);
      setMemberActive(true);
      setMemberUploadType('file');
    }
    setTeamModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberRole.trim()) {
      alert('Nome e Cargo são obrigatórios.');
      return;
    }

    const skillsArray = memberSkillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      name: memberName.trim(),
      role: memberRole.trim(),
      bio: memberBio.trim(),
      avatarUrl: memberAvatarUrl.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      skills: skillsArray,
      githubUrl: memberGithubUrl.trim() || undefined,
      linkedinUrl: memberLinkedinUrl.trim() || undefined,
      websiteUrl: memberWebsiteUrl.trim() || undefined,
      email: memberEmail.trim() || undefined,
      whatsapp: memberWhatsapp.trim() || undefined,
      featured: memberFeatured,
      active: memberActive
    };

    try {
      if (editingMember) {
        await updateTeamMember(editingMember.id, payload);
      } else {
        await createTeamMember(payload);
      }
      setTeamModalOpen(false);
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Erro ao salvar membro da equipe.');
    }
  };

  const handleDeleteMember = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Excluir Membro da Equipe',
      message: 'Tem certeza que deseja remover este membro da equipe?',
      itemTitle: name,
      onConfirm: async () => {
        try {
          setConfirmLoading(true);
          await deleteTeamMember(id);
          showToast(`Membro "${name}" excluído com sucesso.`);
          onRefreshData();
        } catch (err: any) {
          showToast(err.message || 'Erro ao excluir membro.', 'error');
        } finally {
          setConfirmLoading(false);
          setConfirmDialog(null);
        }
      }
    });
  };

  // Partner CRUD
  const handleOpenPartnerForm = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setPartnerName(partner.name);
      setPartnerLogoUrl(partner.logoUrl);
      setPartnerWebsiteUrl(partner.websiteUrl || '');
      setPartnerActive(partner.active !== false);
      setPartnerUploadType(partner.logoUrl.startsWith('data:') ? 'file' : 'link');
    } else {
      setEditingPartner(null);
      setPartnerName('');
      setPartnerLogoUrl('');
      setPartnerWebsiteUrl('');
      setPartnerActive(true);
      setPartnerUploadType('file');
    }
    setPartnerModalOpen(true);
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim() || !partnerLogoUrl.trim()) {
      showToast('Nome e Logo da Empresa são obrigatórios.', 'error');
      return;
    }

    const payload = {
      name: partnerName.trim(),
      logoUrl: partnerLogoUrl.trim(),
      websiteUrl: partnerWebsiteUrl.trim() || undefined,
      active: partnerActive
    };

    try {
      if (editingPartner) {
        await updatePartner(editingPartner.id, payload);
        showToast('Empresa parceira atualizada com sucesso.');
      } else {
        await createPartner(payload);
        showToast('Empresa parceira cadastrada com sucesso.');
      }
      setPartnerModalOpen(false);
      onRefreshData();
    } catch (err: any) {
      showToast(err.message || 'Erro ao salvar parceiro.', 'error');
    }
  };

  const handleDeletePartner = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Excluir Empresa Parceira',
      message: 'Deseja realmente remover esta empresa parceira do carrossel?',
      itemTitle: name,
      onConfirm: async () => {
        try {
          setConfirmLoading(true);
          await deletePartner(id);
          showToast(`Empresa "${name}" removida com sucesso.`);
          onRefreshData();
        } catch (err: any) {
          showToast(err.message || 'Erro ao excluir parceiro.', 'error');
        } finally {
          setConfirmLoading(false);
          setConfirmDialog(null);
        }
      }
    });
  };

  // Projects CRUD
  const handleOpenProjectForm = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectTitle(project.title);
      setProjectDesc(project.description);
      setProjectLongDesc(project.longDescription || '');
      setProjectCategory(project.category);
      setProjectLiveUrl(project.liveUrl);
      setProjectGithubUrl(project.githubUrl || '');
      setProjectScreenshot(project.screenshotUrl);
      setProjectTechStack(project.techStack.join(', '));
      setProjectFeatured(project.featured);
      setProjectClient(project.client || '');
      setProjectUploadType(project.screenshotUrl.startsWith('data:') ? 'file' : 'link');
    } else {
      setEditingProject(null);
      setProjectTitle('');
      setProjectDesc('');
      setProjectLongDesc('');
      setProjectCategory('SaaS');
      setProjectLiveUrl('');
      setProjectGithubUrl('');
      setProjectScreenshot('');
      setProjectTechStack('React, TypeScript, Tailwind CSS');
      setProjectFeatured(false);
      setProjectClient('');
      setProjectUploadType('file');
    }
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !projectDesc || !projectLiveUrl) {
      showToast('Preencha os campos obrigatórios (Título, Descrição e Link).', 'error');
      return;
    }

    const payload = {
      title: projectTitle,
      description: projectDesc,
      longDescription: projectLongDesc,
      category: projectCategory,
      liveUrl: projectLiveUrl,
      githubUrl: projectGithubUrl || undefined,
      screenshotUrl: projectScreenshot || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      techStack: projectTechStack.split(',').map(s => s.trim()).filter(Boolean),
      featured: projectFeatured,
      client: projectClient || undefined,
      completedDate: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, payload);
        showToast('Projeto atualizado com sucesso.');
      } else {
        await createProject(payload);
        showToast('Projeto publicado com sucesso.');
      }
      setProjectModalOpen(false);
      onRefreshData();
    } catch (err: any) {
      showToast(err.message || 'Erro ao salvar projeto.', 'error');
    }
  };

  const handleDeleteProject = (id: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Excluir Projeto',
      message: 'Tem certeza que deseja excluir permanentemente o projeto:',
      itemTitle: title,
      onConfirm: async () => {
        try {
          setConfirmLoading(true);
          await deleteProject(id);
          showToast(`Projeto "${title}" excluído com sucesso.`);
          onRefreshData();
        } catch (err: any) {
          showToast(err.message || 'Erro ao excluir projeto.', 'error');
        } finally {
          setConfirmLoading(false);
          setConfirmDialog(null);
        }
      }
    });
  };

  // Blog CRUD
  const handleOpenBlogForm = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setPostTitle(post.title);
      setPostSlug(post.slug);
      setPostSummary(post.summary);
      setPostContent(post.content);
      setPostCategory(post.category);
      setPostTags(post.tags.join(', '));
      setPostCoverUrl(post.coverUrl);
      setPostReadTime(post.readTime);
      setPostUploadType(post.coverUrl.startsWith('data:') ? 'file' : 'link');
    } else {
      setEditingPost(null);
      setPostTitle('');
      setPostSlug('');
      setPostSummary('');
      setPostContent('');
      setPostCategory('Arquitetura');
      setPostTags('React, Arquitetura, Performance');
      setPostCoverUrl('');
      setPostReadTime('5 min');
      setPostUploadType('file');
    }
    setBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postSummary || !postContent) {
      showToast('Título, Resumo e Conteúdo são obrigatórios.', 'error');
      return;
    }

    const payload = {
      title: postTitle,
      slug: postSlug || postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      summary: postSummary,
      content: postContent,
      category: postCategory,
      tags: postTags.split(',').map(s => s.trim()).filter(Boolean),
      coverUrl: postCoverUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
      readTime: postReadTime || '5 min',
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: 'Arquiteto de Software'
      }
    };

    try {
      if (editingPost) {
        await updateBlogPost(editingPost.id, payload);
        showToast('Artigo atualizado com sucesso.');
      } else {
        await createBlogPost(payload);
        showToast('Artigo publicado com sucesso.');
      }
      setBlogModalOpen(false);
      onRefreshData();
    } catch (err: any) {
      showToast(err.message || 'Erro ao salvar artigo.', 'error');
    }
  };

  const handleDeletePost = (id: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Excluir Artigo do Blog',
      message: 'Deseja excluir permanentemente o artigo:',
      itemTitle: title,
      onConfirm: async () => {
        try {
          setConfirmLoading(true);
          await deleteBlogPost(id);
          showToast(`Artigo "${title}" excluído com sucesso.`);
          onRefreshData();
        } catch (err: any) {
          showToast(err.message || 'Erro ao excluir artigo.', 'error');
        } finally {
          setConfirmLoading(false);
          setConfirmDialog(null);
        }
      }
    });
  };

  const handleGenerateAiPost = async () => {
    if (!aiPromptTopic) {
      showToast('Informe o tema do artigo para a Inteligência Artificial gerar.', 'error');
      return;
    }
    setAiGenerating(true);
    try {
      const generated = await generateAiBlogPost({ 
        topicPrompt: aiPromptTopic,
        category: postCategory
      });
      if (generated) {
        setPostTitle(generated.title || aiPromptTopic);
        setPostSummary(generated.summary || '');
        setPostContent(generated.content || '');
        if (generated.category) setPostCategory(generated.category);
        if (generated.tags) setPostTags(Array.isArray(generated.tags) ? generated.tags.join(', ') : generated.tags);
        if (generated.coverUrl && !postCoverUrl) setPostCoverUrl(generated.coverUrl);
        if (generated.readTime) setPostReadTime(generated.readTime);
        showToast('Artigo e estrutura gerados com sucesso pela IA!');
      }
    } catch (e: any) {
      showToast(e.message || 'Erro ao gerar artigo com IA.', 'error');
    } finally {
      setAiGenerating(false);
    }
  };

  // Autonomous News Tasks Handlers
  const handleOpenTaskForm = (task?: AutonomousNewsTask) => {
    if (task) {
      setEditingTask(task);
      setTaskName(task.name);
      setTaskTopicPrompt(task.topicPrompt);
      setTaskCategory(task.category);
      setTaskInterval(task.scheduleIntervalHours || 6);
      setTaskTargetHour(task.targetHour !== undefined ? String(task.targetHour) : '');
      setTaskEnabled(task.enabled !== false);
      setTaskAutoPublish(task.autoPublish !== false);
    } else {
      setEditingTask(null);
      setTaskName('');
      setTaskTopicPrompt('Últimos avanços em IA generativa, novos modelos de linguagem e ferramentas para desenvolvedores');
      setTaskCategory('Inteligência Artificial');
      setTaskInterval(6);
      setTaskTargetHour('8');
      setTaskEnabled(true);
      setTaskAutoPublish(true);
    }
    setTaskModalOpen(true);
  };

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim() || !taskTopicPrompt.trim()) {
      showToast('Nome da tarefa e tema/prompt são obrigatórios.', 'error');
      return;
    }

    const payload = {
      name: taskName.trim(),
      topicPrompt: taskTopicPrompt.trim(),
      category: taskCategory.trim(),
      scheduleIntervalHours: Number(taskInterval) || 6,
      targetHour: taskTargetHour !== '' ? Number(taskTargetHour) : undefined,
      enabled: taskEnabled,
      autoPublish: taskAutoPublish
    };

    try {
      if (editingTask) {
        await updateAutonomousTask(editingTask.id, payload);
        showToast('Tarefa autônoma atualizada com sucesso.');
      } else {
        await createAutonomousTask(payload);
        showToast('Nova tarefa autônoma agendada com sucesso.');
      }
      setTaskModalOpen(false);
      loadAutonomousTasks();
    } catch (err: any) {
      showToast(err.message || 'Erro ao salvar tarefa autônoma.', 'error');
    }
  };

  const handleToggleTask = async (task: AutonomousNewsTask) => {
    try {
      await updateAutonomousTask(task.id, { enabled: !task.enabled });
      showToast(`Tarefa "${task.name}" ${!task.enabled ? 'ativada' : 'pausada'}.`);
      loadAutonomousTasks();
    } catch (err: any) {
      showToast(err.message || 'Erro ao alterar estado da tarefa.', 'error');
    }
  };

  const handleDeleteTask = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Excluir Tarefa Autônoma',
      message: 'Deseja realmente remover esta rotina automática de notícias?',
      itemTitle: name,
      onConfirm: async () => {
        try {
          setConfirmLoading(true);
          await deleteAutonomousTask(id);
          showToast(`Tarefa "${name}" excluída.`);
          loadAutonomousTasks();
        } catch (err: any) {
          showToast(err.message || 'Erro ao excluir tarefa.', 'error');
        } finally {
          setConfirmLoading(false);
          setConfirmDialog(null);
        }
      }
    });
  };

  const handleRunTaskNow = async (id: string, name: string) => {
    try {
      setRunningTaskId(id);
      const res = await runAutonomousTask(id);
      showToast(`Notícia "${res.post.title}" gerada com sucesso e adicionada ao blog!`);
      loadAutonomousTasks();
      onRefreshData();
    } catch (err: any) {
      showToast(err.message || 'Erro ao executar tarefa autônoma.', 'error');
    } finally {
      setRunningTaskId(null);
    }
  };

  // Delete Comments & Subscribers
  const handleDeleteCommentItem = (id: string, authorName: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Excluir Comentário',
      message: 'Tem certeza que deseja apagar o comentário de:',
      itemTitle: authorName,
      onConfirm: async () => {
        try {
          setConfirmLoading(true);
          await deleteComment(id);
          showToast('Comentário removido com sucesso.');
          onRefreshData();
        } catch (err: any) {
          showToast(err.message || 'Erro ao excluir comentário.', 'error');
        } finally {
          setConfirmLoading(false);
          setConfirmDialog(null);
        }
      }
    });
  };

  const handleDeleteSubscriberItem = (id: string, email: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Excluir Inscrito da Newsletter',
      message: 'Deseja remover este e-mail da lista de newsletter?',
      itemTitle: email,
      onConfirm: async () => {
        try {
          setConfirmLoading(true);
          await deleteSubscriber(id);
          showToast(`Inscrito ${email} removido com sucesso.`);
          onRefreshData();
        } catch (err: any) {
          showToast(err.message || 'Erro ao excluir inscrito.', 'error');
        } finally {
          setConfirmLoading(false);
          setConfirmDialog(null);
        }
      }
    });
  };

  // Chat reply handler
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChatSession || !adminReplyText.trim()) return;

    try {
      const res = await sendAdminReply(selectedChatSession.id, adminReplyText);
      setSelectedChatSession(res.session);
      setAdminReplyText('');
      loadChatSessions();
      showToast('Resposta enviada ao cliente com sucesso.');
    } catch (err: any) {
      showToast(err.message || 'Erro ao responder mensagem.', 'error');
    }
  };

  const handleDeleteChat = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Excluir Conversa',
      message: 'Deseja excluir permanentemente este histórico de atendimento?',
      onConfirm: async () => {
        try {
          setConfirmLoading(true);
          await deleteChatSession(id);
          if (selectedChatSession?.id === id) setSelectedChatSession(null);
          loadChatSessions();
          showToast('Conversa removida com sucesso.');
        } catch (err: any) {
          showToast(err.message || 'Erro ao excluir chat.', 'error');
        } finally {
          setConfirmLoading(false);
          setConfirmDialog(null);
        }
      }
    });
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        name: profName,
        email: profEmail,
        avatar: profAvatar,
        newPassword: profPassword || undefined
      });
      setProfMsg('Perfil atualizado com sucesso!');
      setTimeout(() => setProfMsg(''), 3000);
      onRefreshData();
    } catch (err: any) {
      showToast(err.message || 'Erro ao atualizar perfil.', 'error');
    }
  };

  // Total Unread Chat Messages
  const totalUnreadChats = chatSessions.reduce((acc, s) => acc + (s.unreadCount || 0), 0);

  // Navigation Items
  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard & Métricas', icon: LayoutDashboard, count: null },
    { id: 'projects' as AdminTab, label: 'Projetos', icon: Layers, count: projects.length },
    { id: 'blog' as AdminTab, label: 'Blog & Artigos', icon: BookOpen, count: blogPosts.length },
    { id: 'ai-tasks' as AdminTab, label: 'Automação & IA', icon: Bot, count: autonomousTasks.filter(t => t.enabled).length, badge: 'Robôs' },
    { id: 'team' as AdminTab, label: 'Nossa Equipe', icon: Users, count: teamMembers.length },
    { id: 'partners' as AdminTab, label: 'Tecnologias & Stack', icon: Building2, count: partners.length },
    { id: 'chats' as AdminTab, label: 'Mensagens & Chat', icon: MessageCircle, count: chatSessions.length, highlight: totalUnreadChats > 0 ? totalUnreadChats : null },
    { id: 'comments' as AdminTab, label: 'Comentários', icon: MessageSquare, count: comments.length },
    { id: 'subscribers' as AdminTab, label: 'Inscritos Newsletter', icon: Mail, count: subscribers.length },
    { id: 'profile' as AdminTab, label: 'Perfil & Acesso', icon: Shield, count: null },
  ];

  return (
    <div className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm overflow-hidden animate-in fade-in duration-200">
      
      {/* ================= SIDEBAR NAVIGATION ================= */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Sidebar Header */}
        <div>
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold font-display text-slate-900 dark:text-white leading-tight">
                  REALPREMISE
                </h2>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  Painel de Controle CMS
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-none" aria-label="Menu administrativo">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase ${
                        isActive ? 'bg-white/20 text-white' : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {item.highlight ? (
                      <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500 text-white animate-pulse">
                        {item.highlight}
                      </span>
                    ) : item.count !== null ? (
                      <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {item.count}
                      </span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-950/40">
          <button
            type="button"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
          >
            <Globe className="w-4 h-4 text-indigo-500" />
            <span>Voltar ao Site ao Vivo</span>
          </button>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 dark:bg-indigo-950 shrink-0">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 truncate font-mono">{currentUser.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold cursor-pointer"
            >
              Sair
            </button>
          </div>
        </div>

      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 px-4 sm:px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white capitalize">
                {navItems.find(n => n.id === activeTab)?.label || 'Painel Administrativo'}
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Gerencie todos os recursos, mídias e conteúdos em tempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onRefreshData}
              className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              title="Atualizar dados"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dynamic Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          
          {/* ================= TAB 1: DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              
              {/* Metric Cards Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Projetos Publicados</span>
                    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      <Layers className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                    {projects.length}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenProjectForm()}
                    className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>+ Novo Projeto</span>
                  </button>
                </div>

                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Artigos no Blog</span>
                    <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                    {blogPosts.length}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenBlogForm()}
                    className="text-xs text-sky-600 dark:text-sky-400 font-semibold hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>+ Novo Artigo</span>
                  </button>
                </div>

                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Membros da Equipe</span>
                    <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                    {teamMembers.length}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenMemberForm()}
                    className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>+ Adicionar Membro</span>
                  </button>
                </div>

                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Empresas Parceiras</span>
                    <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                    {partners.length}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenPartnerForm()}
                    className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>+ Nova Empresa</span>
                  </button>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Ações Rápidas de Gestão
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenProjectForm()}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all text-left group cursor-pointer"
                  >
                    <Plus className="w-5 h-5 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Cadastrar Projeto</h4>
                    <p className="text-[11px] text-slate-400">Adicione novas soluções e capturas</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenBlogForm()}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 hover:bg-sky-50/30 dark:hover:bg-sky-950/20 transition-all text-left group cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-sky-600 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Artigo com IA</h4>
                    <p className="text-[11px] text-slate-400">Gere conteúdo técnico automático</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenMemberForm()}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-all text-left group cursor-pointer"
                  >
                    <Users className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Novo Membro da Equipe</h4>
                    <p className="text-[11px] text-slate-400">Cadastre fotos, cargos e redes</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenPartnerForm()}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 transition-all text-left group cursor-pointer"
                  >
                    <Building2 className="w-5 h-5 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Empresa Parceira</h4>
                    <p className="text-[11px] text-slate-400">Suba logo para o ticker contínuo</p>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 2: PROJECTS ================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">Projetos em Destaque</h3>
                  <p className="text-xs text-slate-400">Gerencie a galeria interativa de projetos do REALPREMISE.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenProjectForm()}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Projeto</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between gap-3 shadow-xs hover:border-indigo-500/40 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img src={proj.screenshotUrl} alt={proj.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded bg-slate-900/80 text-white">
                          {proj.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{proj.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{proj.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1">
                        <span>Ver Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenProjectForm(proj)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 3: BLOG ================= */}
          {activeTab === 'blog' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">Artigos do Blog</h3>
                  <p className="text-xs text-slate-400">Publique novidades, tutoriais técnicos e estudos de caso.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenBlogForm()}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Artigo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between gap-3 shadow-xs hover:border-indigo-500/40 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img src={post.coverUrl} alt={post.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-600 text-white">
                          {post.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{post.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{post.summary}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-mono text-slate-400">{post.readTime}</span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenBlogForm(post)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePost(post.id, post.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: AUTONOMOUS AI NEWS TASKS ================= */}
          {activeTab === 'ai-tasks' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                    <Bot className="w-4 h-4" />
                    <span>AUTONOMOUS AGENTS & NEWS SCHEDULER</span>
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                    Tarefas Autônomas de Notícias com IA
                  </h3>
                  <p className="text-xs text-slate-400">
                    Programe a IA para pesquisar, redigir artigos com imagem e publicar no blog de forma 100% autônoma.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenTaskForm()}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nova Tarefa Autônoma</span>
                </button>
              </div>

              {/* Status Overview Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Tarefas Ativas</span>
                    <Bot className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                    {autonomousTasks.filter(t => t.enabled).length} de {autonomousTasks.length}
                  </div>
                  <p className="text-[11px] text-emerald-500 font-mono mt-0.5">Executando em segundo plano</p>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Artigos Publicados pela IA</span>
                    <Sparkles className="w-4 h-4 text-sky-500" />
                  </div>
                  <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                    {autonomousTasks.reduce((acc, t) => acc + (t.articlesGeneratedCount || 0), 0)}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">Com imagem e Markdown completo</p>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Motor de Notícias & Qualidade</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    Crawler Web + Julgador IA
                  </div>
                  <p className="text-[11px] text-indigo-500 font-mono mt-0.5">Google News, Dev.to & Imagen</p>
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                {autonomousTasks.length === 0 ? (
                  <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                    <Bot className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
                    <p className="text-xs text-slate-400">Nenhuma tarefa autônoma cadastrada no momento.</p>
                  </div>
                ) : (
                  autonomousTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs hover:border-indigo-500/40 transition-all"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {task.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                            {task.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            task.enabled
                              ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                          }`}>
                            {task.enabled ? 'Ativa' : 'Pausada'}
                          </span>
                          {task.autoPublish && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                              Auto-Publicar
                            </span>
                          )}
                          {task.lastJudgeScore !== undefined && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800 flex items-center gap-1 font-mono">
                              <Sparkles className="w-3 h-3 text-amber-500" />
                              <span>Julgador: {task.lastJudgeScore}/100</span>
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                          {task.topicPrompt}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-mono pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Intervalo: A cada {task.scheduleIntervalHours}h</span>
                          </span>

                          {task.targetHour !== undefined && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                              <span>Horário preferencial: {String(task.targetHour).padStart(2, '0')}:00</span>
                            </span>
                          )}

                          <span>
                            Gerados: <strong className="text-slate-700 dark:text-slate-200">{task.articlesGeneratedCount || 0}</strong>
                          </span>

                          {task.lastRunAt && (
                            <span>Última execução: {task.lastRunAt}</span>
                          )}
                        </div>

                        {task.lastJudgeVerdict && (
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans italic pt-0.5 flex items-center gap-1.5">
                            <span className="text-amber-500 font-semibold font-mono">Parecer Editorial:</span>
                            <span>{task.lastJudgeVerdict}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          type="button"
                          disabled={runningTaskId === task.id}
                          onClick={() => handleRunTaskNow(task.id, task.name)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center gap-1.5 transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
                          title="Executar agora sem esperar o próximo horário"
                        >
                          {runningTaskId === task.id ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Gerando...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Executar Agora</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleTask(task)}
                          className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                          title={task.enabled ? "Pausar tarefa" : "Ativar tarefa"}
                        >
                          {task.enabled ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-slate-400" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenTaskForm(task)}
                          className="p-2 text-slate-400 hover:text-indigo-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                          title="Editar tarefa"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteTask(task.id, task.name)}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 transition-colors"
                          title="Excluir tarefa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 4: TEAM MEMBERS (NOVO) ================= */}
          {activeTab === 'team' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">Membros da Equipe</h3>
                  <p className="text-xs text-slate-400">Cadastre os profissionais e especialistas exibidos na seção "Conheça nossa equipe".</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenMemberForm()}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Membro</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <AdminTeamMemberItem
                    key={member.id}
                    member={member}
                    onEdit={handleOpenMemberForm}
                    onDelete={handleDeleteMember}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: PARTNERS ================= */}
          {activeTab === 'partners' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">Empresas e Parceiros</h3>
                  <p className="text-xs text-slate-400">Gerencie as logos exibidas no ticker de rolagem infinita da página inicial.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenPartnerForm()}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Empresa</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {partners.map((partner) => (
                  <AdminPartnerCardItem
                    key={partner.id}
                    partner={partner}
                    onEdit={handleOpenPartnerForm}
                    onDelete={handleDeletePartner}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 6: LIVE CHATS ================= */}
          {activeTab === 'chats' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">Atendimento & Mensagens</h3>
                <p className="text-xs text-slate-400">Responda aos clientes e visitantes que enviaram mensagens pelo chat.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
                {/* Session List */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2 overflow-y-auto max-h-[600px]">
                  {chatSessions.length === 0 ? (
                    <p className="text-xs text-slate-400 p-4 text-center">Nenhuma mensagem recebida ainda.</p>
                  ) : (
                    chatSessions.map((session) => (
                      <button
                        key={session.id}
                        type="button"
                        onClick={() => setSelectedChatSession(session)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                          selectedChatSession?.id === session.id
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500'
                            : 'bg-slate-50/60 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {session.clientName}
                          </h4>
                          <span className="text-[10px] text-slate-400 shrink-0">{session.lastMessageAt}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-1">{session.lastMessageText}</p>
                      </button>
                    ))
                  )}
                </div>

                {/* Active Chat Conversation */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-4 min-h-[400px]">
                  {selectedChatSession ? (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{selectedChatSession.clientName}</h4>
                          <p className="text-[11px] text-slate-400 font-mono">
                            {selectedChatSession.clientEmail || selectedChatSession.clientPhone || 'Sem contato extra'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteChat(selectedChatSession.id)}
                          className="text-xs text-rose-600 hover:underline"
                        >
                          Excluir conversa
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-3 p-2 max-h-[350px]">
                        {selectedChatSession.messages?.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}
                          >
                            <div className={`max-w-xs sm:max-w-md px-3.5 py-2.5 rounded-2xl text-xs ${
                              msg.sender === 'admin'
                                ? 'bg-indigo-600 text-white rounded-br-none'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none'
                            }`}>
                              {msg.text}
                            </div>
                            <span className="text-[9px] text-slate-400 mt-1">{msg.createdAt}</span>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleSendReply} className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <input
                          type="text"
                          value={adminReplyText}
                          onChange={(e) => setAdminReplyText(e.target.value)}
                          placeholder="Digite a resposta do administrador..."
                          className="flex-1 px-3.5 py-2 text-xs bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500"
                        >
                          Enviar
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2">
                      <MessageCircle className="w-10 h-10 opacity-30" />
                      <p className="text-xs">Selecione uma conversa à esquerda para responder.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 7: COMMENTS ================= */}
          {activeTab === 'comments' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">Comentários & Moderação</h3>
                <p className="text-xs text-slate-400">Total de {comments.length} comentários registrados.</p>
              </div>

              <div className="space-y-3">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-400">Nenhum comentário para moderação.</p>
                ) : (
                  comments.map((comm) => (
                    <div
                      key={comm.id}
                      className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{comm.authorName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{comm.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{comm.content}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteCommentItem(comm.id, comm.authorName)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
                        title="Excluir comentário"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 8: SUBSCRIBERS ================= */}
          {activeTab === 'subscribers' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">Inscritos na Newsletter</h3>
                  <p className="text-xs text-slate-400">Total de {subscribers.length} contatos ativos.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + ["Nome,Email,Data"].concat(subscribers.map(s => `"${s.name || ''}","${s.email}","${s.subscribedAt}"`)).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `inscritos_${Date.now()}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar CSV</span>
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono">
                    <tr>
                      <th className="p-3.5">Nome</th>
                      <th className="p-3.5">E-mail</th>
                      <th className="p-3.5">Data Inscrição</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3.5 font-bold">{sub.name || 'Visitante'}</td>
                        <td className="p-3.5 font-mono">{sub.email}</td>
                        <td className="p-3.5 text-slate-400">{sub.subscribedAt}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                            Ativo
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteSubscriberItem(sub.id, sub.email)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Remover inscrito"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 9: PROFILE ================= */}
          {activeTab === 'profile' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">Perfil do Administrador</h3>
                <p className="text-xs text-slate-400">Altere seus dados de exibição e senha de segurança.</p>
              </div>

              {profMsg && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-600 text-xs rounded-xl font-semibold">
                  {profMsg}
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nome</label>
                  <input
                    type="text"
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">E-mail / Usuário</label>
                  <input
                    type="text"
                    value={profEmail}
                    onChange={(e) => setProfEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nova Senha (opcional)</label>
                  <input
                    type="password"
                    value={profPassword}
                    onChange={(e) => setProfPassword(e.target.value)}
                    placeholder="Deixe em branco para não alterar"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  Salvar Alterações
                </button>
              </form>
            </div>
          )}

        </div>

      </main>

      {/* ================= MODAL: TEAM MEMBER (NOVO) ================= */}
      {teamModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 my-8 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  {editingMember ? 'Editar Membro da Equipe' : 'Cadastrar Novo Membro'}
                </h3>
              </div>
              <button type="button" onClick={() => setTeamModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4 max-h-[70vh] overflow-y-auto px-1 pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Ex: Ricardo Amorim"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Cargo / Especialidade *</label>
                  <input
                    type="text"
                    required
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                    placeholder="Ex: Lead Software Architect"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
              </div>

              {/* Avatar Selector (File or Link) */}
              <div className="space-y-2 p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Foto / Avatar de Perfil</label>
                  <div className="flex p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setMemberUploadType('file')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        memberUploadType === 'file' ? 'bg-white dark:bg-slate-900 shadow-2xs text-indigo-600' : 'text-slate-500'
                      }`}
                    >
                      Upload Arquivo
                    </button>
                    <button
                      type="button"
                      onClick={() => setMemberUploadType('link')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        memberUploadType === 'link' ? 'bg-white dark:bg-slate-900 shadow-2xs text-indigo-600' : 'text-slate-500'
                      }`}
                    >
                      Link / URL
                    </button>
                  </div>
                </div>

                {memberUploadType === 'file' ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setMemberAvatarUrl)}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                  />
                ) : (
                  <input
                    type="url"
                    value={memberAvatarUrl}
                    onChange={(e) => setMemberAvatarUrl(e.target.value)}
                    placeholder="https://exemplo.com/foto.jpg"
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                )}

                {memberAvatarUrl && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                      <img src={memberAvatarUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold">Foto carregada com sucesso</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Biografia / Resumo Profissional</label>
                <textarea
                  rows={3}
                  value={memberBio}
                  onChange={(e) => setMemberBio(e.target.value)}
                  placeholder="Breve descrição da carreira, foco técnico e realizações..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Especialidades & Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={memberSkillsInput}
                  onChange={(e) => setMemberSkillsInput(e.target.value)}
                  placeholder="React, Spring Boot, UI/UX, Docker, AWS"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              {/* Social Links Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={memberGithubUrl}
                    onChange={(e) => setMemberGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={memberLinkedinUrl}
                    onChange={(e) => setMemberLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">E-mail Direto</label>
                  <input
                    type="email"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="contato@..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">WhatsApp (com DDD)</label>
                  <input
                    type="text"
                    value={memberWhatsapp}
                    onChange={(e) => setMemberWhatsapp(e.target.value)}
                    placeholder="5511999999999"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={memberFeatured}
                    onChange={(e) => setMemberFeatured(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Membro Destaque (Lead Badge)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={memberActive}
                    onChange={(e) => setMemberActive(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Ativo no Site</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setTeamModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20"
                >
                  Salvar Membro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PARTNER COMPANY ================= */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 my-8 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  {editingPartner ? 'Editar Empresa Parceira' : 'Cadastrar Empresa Parceira'}
                </h3>
              </div>
              <button type="button" onClick={() => setPartnerModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePartner} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nome da Empresa *</label>
                <input
                  type="text"
                  required
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Ex: Stripe, Vercel, Supabase..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              {/* Logo selector */}
              <div className="space-y-2 p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Logo da Empresa *</label>
                  <div className="flex p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setPartnerUploadType('file')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        partnerUploadType === 'file' ? 'bg-white dark:bg-slate-900 shadow-2xs text-purple-600' : 'text-slate-500'
                      }`}
                    >
                      Subir Arquivo
                    </button>
                    <button
                      type="button"
                      onClick={() => setPartnerUploadType('link')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        partnerUploadType === 'link' ? 'bg-white dark:bg-slate-900 shadow-2xs text-purple-600' : 'text-slate-500'
                      }`}
                    >
                      Link URL
                    </button>
                  </div>
                </div>

                {partnerUploadType === 'file' ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setPartnerLogoUrl)}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-600 hover:file:bg-purple-100"
                  />
                ) : (
                  <input
                    type="url"
                    value={partnerLogoUrl}
                    onChange={(e) => setPartnerLogoUrl(e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                )}

                {partnerLogoUrl && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-12 h-12 rounded-xl p-1.5 bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      <img src={partnerLogoUrl} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold">Logo pronta para o ticker</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Site / Link Oficial (opcional)</label>
                <input
                  type="url"
                  value={partnerWebsiteUrl}
                  onChange={(e) => setPartnerWebsiteUrl(e.target.value)}
                  placeholder="https://empresa.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                <input
                  type="checkbox"
                  checked={partnerActive}
                  onChange={(e) => setPartnerActive(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span>Ativo no banner ticker de parceiros</span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setPartnerModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-md shadow-purple-500/20"
                >
                  Salvar Parceiro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PROJECT ================= */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 my-8 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                {editingProject ? 'Editar Projeto' : 'Cadastrar Novo Projeto'}
              </h3>
              <button type="button" onClick={() => setProjectModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 max-h-[70vh] overflow-y-auto px-1 pr-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Título do Projeto *</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Categoria</label>
                  <select
                    value={projectCategory}
                    onChange={(e) => setProjectCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  >
                    <option value="SaaS">SaaS</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Portfólio">Portfólio</option>
                    <option value="Web App">Web App</option>
                    <option value="Landing Page">Landing Page</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Cliente / Marca</label>
                  <input
                    type="text"
                    value={projectClient}
                    onChange={(e) => setProjectClient(e.target.value)}
                    placeholder="Ex: Vortex Global"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Descrição Curta *</label>
                <input
                  type="text"
                  required
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">URL da Aplicação *</label>
                  <input
                    type="url"
                    required
                    value={projectLiveUrl}
                    onChange={(e) => setProjectLiveUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Repositório GitHub</label>
                  <input
                    type="url"
                    value={projectGithubUrl}
                    onChange={(e) => setProjectGithubUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
              </div>

              {/* Screenshot Selector */}
              <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Captura de Tela</label>
                  <div className="flex p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-[10px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setProjectUploadType('file')}
                      className={`px-2 py-0.5 rounded ${projectUploadType === 'file' ? 'bg-white text-indigo-600' : 'text-slate-500'}`}
                    >
                      Arquivo
                    </button>
                    <button
                      type="button"
                      onClick={() => setProjectUploadType('link')}
                      className={`px-2 py-0.5 rounded ${projectUploadType === 'link' ? 'bg-white text-indigo-600' : 'text-slate-500'}`}
                    >
                      Link
                    </button>
                  </div>
                </div>

                {projectUploadType === 'file' ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setProjectScreenshot)}
                    className="w-full text-xs text-slate-500"
                  />
                ) : (
                  <input
                    type="url"
                    value={projectScreenshot}
                    onChange={(e) => setProjectScreenshot(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tecnologias (separadas por vírgula)</label>
                <input
                  type="text"
                  value={projectTechStack}
                  onChange={(e) => setProjectTechStack(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                <input
                  type="checkbox"
                  checked={projectFeatured}
                  onChange={(e) => setProjectFeatured(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Projeto em Destaque no topo</span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setProjectModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">
                  Cancelar
                </button>
                <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs">
                  Salvar Projeto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: BLOG POST ================= */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-5 my-8 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                {editingPost ? 'Editar Artigo' : 'Criar Novo Artigo'}
              </h3>
              <button type="button" onClick={() => setBlogModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Assistant Generator Bar */}
            <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gerador de Rascunho com IA (Gemini)</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiPromptTopic}
                  onChange={(e) => setAiPromptTopic(e.target.value)}
                  placeholder="Ex: Como otimizar queries no PostgreSQL com índices compostos"
                  className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 rounded-xl"
                />
                <button
                  type="button"
                  disabled={aiGenerating}
                  onClick={handleGenerateAiPost}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl disabled:opacity-50"
                >
                  {aiGenerating ? 'Gerando...' : 'Gerar'}
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 max-h-[60vh] overflow-y-auto px-1 pr-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Título do Artigo *</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Resumo *</label>
                <input
                  type="text"
                  required
                  value={postSummary}
                  onChange={(e) => setPostSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Conteúdo (Markdown) *</label>
                <textarea
                  rows={8}
                  required
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Categoria</label>
                  <input
                    type="text"
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tempo de Leitura</label>
                  <input
                    type="text"
                    value={postReadTime}
                    onChange={(e) => setPostReadTime(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setBlogModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">
                  Cancelar
                </button>
                <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs">
                  Salvar Artigo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: AUTONOMOUS AI TASK ================= */}
      {taskModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 my-8 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Bot className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  {editingTask ? 'Editar Tarefa Autônoma' : 'Configurar Nova Tarefa Autônoma'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTaskModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nome da Tarefa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Radar Diário de Inteligência Artificial"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tema / Assunto de Pesquisa para a IA *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ex: Últimos lançamentos de modelos de linguagem, agentes autônomos, novidades de IA e impacto no desenvolvimento de software."
                  value={taskTopicPrompt}
                  onChange={(e) => setTaskTopicPrompt(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  A IA pesquisará notícias e tutoriais reais na web sobre este tema, escolherá conteúdos não utilizados anteriormente para não repetir, reescreverá a matéria com profundidade e vinculará uma imagem temática segura e profissional.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Categoria do Blog
                  </label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  >
                    <option value="Design & UX">Design & UX</option>
                    <option value="Webdesign">Webdesign</option>
                    <option value="Inteligência Artificial">Inteligência Artificial</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Arquitetura">Arquitetura</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Segurança">Segurança</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Frequência de Execução
                  </label>
                  <select
                    value={taskInterval}
                    onChange={(e) => setTaskInterval(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                  >
                    <option value={1}>A cada 1 hora</option>
                    <option value={3}>A cada 3 horas</option>
                    <option value={6}>A cada 6 horas</option>
                    <option value={12}>A cada 12 horas</option>
                    <option value={24}>A cada 24 horas (Diário)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Horário Fixo Preferencial (opcional)
                </label>
                <select
                  value={taskTargetHour}
                  onChange={(e) => setTaskTargetHour(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                >
                  <option value="">Qualquer horário (conforme intervalo)</option>
                  <option value="6">06:00 (Manhã cedo)</option>
                  <option value="8">08:00 (Início do expediente)</option>
                  <option value="12">12:00 (Meio-dia)</option>
                  <option value="14">14:00 (Início da tarde)</option>
                  <option value="18">18:00 (Fim do dia)</option>
                  <option value="21">21:00 (Noite)</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={taskAutoPublish}
                    onChange={(e) => setTaskAutoPublish(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Publicar automaticamente no Blog
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={taskEnabled}
                    onChange={(e) => setTaskEnabled(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Tarefa Ativa
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setTaskModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Salvar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CUSTOM CONFIRMATION DIALOG (IFRAME-SAFE) ================= */}
      {confirmDialog && confirmDialog.isOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 shrink-0 border border-rose-200 dark:border-rose-900/60">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  {confirmDialog.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {confirmDialog.message}
                </p>
                {confirmDialog.itemTitle && (
                  <p className="text-xs font-bold text-slate-900 dark:text-white font-mono bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg mt-1 truncate">
                    "{confirmDialog.itemTitle}"
                  </p>
                )}
              </div>
            </div>

            <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
              Esta ação é definitiva e removerá o item imediatamente.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={confirmLoading}
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={confirmLoading}
                onClick={confirmDialog.onConfirm}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-rose-600/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {confirmLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Excluindo...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirmar Exclusão</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= IN-APP TOAST NOTIFICATION ================= */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-80 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border animate-in slide-in-from-bottom-5 duration-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          )}
          <span className="text-xs font-medium">{toast.text}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
