import React, { useState, useEffect } from 'react';
import { X, Monitor, Tablet, Smartphone, ExternalLink, Github, CheckCircle2, RefreshCw, MessageSquare, ShieldCheck } from 'lucide-react';
import { Project, Comment, User } from '../types';
import { CommentSection } from './CommentSection';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  currentUser: User | null;
  comments: Comment[];
  onAddComment: (commentData: { targetType: 'project' | 'blog'; targetId: string; authorName: string; authorEmail: string; content: string }) => Promise<void>;
  onLikeComment: (id: string) => void;
  onApproveComment: (id: string) => void;
  onDeleteComment: (id: string) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  currentUser,
  comments,
  onAddComment,
  onLikeComment,
  onApproveComment,
  onDeleteComment
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'details' | 'comments'>('preview');
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'w-[375px] h-[667px]';
      case 'tablet':
        return 'w-[768px] h-[800px]';
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-7xl h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Modal Top Header Bar */}
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          {/* Project Title & Status */}
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" title="Site Ativo" />
            <div>
              <h2 className="text-base font-bold font-display text-white">{project.title}</h2>
              <p className="text-xs text-slate-400 font-mono">{project.category} · {project.client || 'Projeto Próprio'}</p>
            </div>
          </div>

          {/* Viewport Switcher Controls (Interactive Tabs) */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setViewport('desktop'); setActiveTab('preview'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                viewport === 'desktop' && activeTab === 'preview'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Visualização Desktop (1440px)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => { setViewport('tablet'); setActiveTab('preview'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                viewport === 'tablet' && activeTab === 'preview'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Visualização Tablet (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => { setViewport('mobile'); setActiveTab('preview'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                viewport === 'mobile' && activeTab === 'preview'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Visualização Mobile (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* View Switcher Tabs (Preview / Detalhes / Comentários) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 font-medium rounded-lg transition-colors ${
                  activeTab === 'preview' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Preview Ao Vivo
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`px-3 py-1.5 font-medium rounded-lg transition-colors ${
                  activeTab === 'details' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Detalhes Técnicos
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`px-3 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'comments' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Comentários ({comments.length})</span>
              </button>
            </div>

            {/* External Direct Link */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                title="Abrir site diretamente"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-hidden relative flex flex-col bg-slate-950">
          
          {/* TAB 1: PREVIEW AO VIVO */}
          {activeTab === 'preview' && (
            <div className="w-full h-full flex items-center justify-center p-4 overflow-auto bg-slate-950/90">
              <div
                className={`transition-all duration-300 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col ${getViewportWidth()}`}
              >
                {/* Browser Mockup Top Bar */}
                <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 max-w-md mx-4 px-3 py-1 bg-slate-950 rounded-md font-mono text-[11px] text-slate-400 truncate text-center border border-slate-800">
                    {project.liveUrl}
                  </div>
                  <button
                    onClick={() => setIframeError(!iframeError)}
                    className="p-1 hover:text-white"
                    title="Alternar entre Iframe e Captura de Tela"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Iframe or Screenshot View */}
                <div className="flex-1 relative bg-white">
                  {!iframeError ? (
                    <iframe
                      src={project.liveUrl}
                      title={`Preview de ${project.title}`}
                      className="w-full h-full border-0"
                      onError={() => setIframeError(true)}
                    />
                  ) : (
                    <div className="relative w-full h-full overflow-auto bg-slate-900 p-4">
                      <img
                        src={project.screenshotUrl}
                        alt={`Captura de alta resolução de ${project.title}`}
                        className="w-full h-auto rounded-lg border border-slate-800 shadow-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETALHES TÉCNICOS */}
          {activeTab === 'details' && (
            <div className="w-full h-full overflow-y-auto p-6 sm:p-8 max-w-4xl mx-auto space-y-8">
              
              <div>
                <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase font-semibold">
                  {project.category} · {project.completedDate}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                  {project.title}
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-3">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Highlights List */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                  <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wide font-mono flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span>Destaques da Arquitetura & Implementação</span>
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-300">
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider">
                  Stack Tecnológico Utilizado
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-800/80 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-800">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4 text-indigo-600" />
                    <span>Visitar Aplicação Ao Vivo</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white rounded-xl transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Código no GitHub</span>
                  </a>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: COMENTÁRIOS */}
          {activeTab === 'comments' && (
            <div className="w-full h-full overflow-y-auto p-6 max-w-4xl mx-auto">
              <CommentSection
                targetType="project"
                targetId={project.id}
                comments={comments}
                currentUser={currentUser}
                onAddComment={onAddComment}
                onLikeComment={onLikeComment}
                onApproveComment={onApproveComment}
                onDeleteComment={onDeleteComment}
              />
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
