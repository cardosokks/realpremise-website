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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0f0d0e]/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container with WCAG 2.1 AA dialog role */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-7xl h-[94vh] sm:h-[92vh] flex flex-col bg-[#1a1318] border border-white/[0.08] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[#f5eff2]"
      >
        
        {/* Modal Top Header Bar */}
        <div className="px-4 py-3 bg-[#0f0d0e] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          
          {/* Project Title & Status */}
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" title="Site Ativo" aria-hidden="true" />
            <div>
              <h2 id="project-modal-title" className="text-base font-bold font-display text-white">{project.title}</h2>
              <p className="text-xs text-[#b89aa8] font-mono">{project.category} · {project.client || 'Projeto Próprio'}</p>
            </div>
          </div>

          {/* Viewport Switcher Controls (Tablet/Desktop only) */}
          <div className="hidden sm:flex items-center gap-1 bg-[#1a1318] p-1 rounded-xl border border-white/10" role="group" aria-label="Modo de visualização">
            <button
              onClick={() => { setViewport('desktop'); setActiveTab('preview'); }}
              aria-pressed={viewport === 'desktop' && activeTab === 'preview'}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer min-h-[36px] ${
                viewport === 'desktop' && activeTab === 'preview'
                  ? 'bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] text-[#0f0d0e] font-bold shadow-xs'
                  : 'text-[#b89aa8] hover:text-white'
              }`}
              title="Visualização Desktop (1440px)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => { setViewport('tablet'); setActiveTab('preview'); }}
              aria-pressed={viewport === 'tablet' && activeTab === 'preview'}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer min-h-[36px] ${
                viewport === 'tablet' && activeTab === 'preview'
                  ? 'bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] text-[#0f0d0e] font-bold shadow-xs'
                  : 'text-[#b89aa8] hover:text-white'
              }`}
              title="Visualização Tablet (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => { setViewport('mobile'); setActiveTab('preview'); }}
              aria-pressed={viewport === 'mobile' && activeTab === 'preview'}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer min-h-[36px] ${
                viewport === 'mobile' && activeTab === 'preview'
                  ? 'bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] text-[#0f0d0e] font-bold shadow-xs'
                  : 'text-[#b89aa8] hover:text-white'
              }`}
              title="Visualização Mobile (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* View Switcher Tabs (Preview / Detalhes / Comentários) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#1a1318] p-1 rounded-xl border border-white/10 text-xs" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'preview'}
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer min-h-[36px] ${
                  activeTab === 'preview' ? 'bg-[#241b20] text-[#e8b0c4] border border-[#d4789a]/30' : 'text-[#b89aa8] hover:text-white'
                }`}
              >
                Preview Ao Vivo
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'details'}
                onClick={() => setActiveTab('details')}
                className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer min-h-[36px] ${
                  activeTab === 'details' ? 'bg-[#241b20] text-[#e8b0c4] border border-[#d4789a]/30' : 'text-[#b89aa8] hover:text-white'
                }`}
              >
                Detalhes
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'comments'}
                onClick={() => setActiveTab('comments')}
                className={`px-3 py-1.5 font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
                  activeTab === 'comments' ? 'bg-[#241b20] text-[#e8b0c4] border border-[#d4789a]/30' : 'text-[#b89aa8] hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Comentários ({comments.filter(c => c.targetId === project.id).length})</span>
              </button>
            </div>

            {/* Direct External Link */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#b89aa8] hover:text-white hover:bg-[#241b20] rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                title="Abrir site original em nova aba"
                aria-label={`Abrir ${project.title} em nova aba`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-2 text-[#b89aa8] hover:text-white hover:bg-[#241b20] rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              title="Fechar (Esc)"
              aria-label="Fechar janela do projeto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Modal Main Area */}
        <div className="flex-1 overflow-hidden relative flex flex-col bg-[#0f0d0e]">
          
          {/* TAB 1: PREVIEW */}
          {activeTab === 'preview' && (
            <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 overflow-auto bg-[#0f0d0e]">
              <div className={`${getViewportWidth()} transition-all duration-300 relative rounded-xl overflow-hidden shadow-2xl bg-white border border-white/10 flex flex-col`}>
                
                {/* Simulated Browser Address Bar */}
                <div className="h-8 bg-[#1a1318] px-3 flex items-center justify-between text-xs text-[#b89aa8] border-b border-white/10 select-none shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[11px] truncate max-w-[200px] sm:max-w-md text-[#b89aa8]">{project.liveUrl || 'localhost:3000'}</span>
                  <button
                    onClick={() => setIframeError(false)}
                    className="p-1 hover:text-white"
                    title="Recarregar frame"
                    aria-label="Recarregar visualização"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>

                {/* Simulated Iframe or Fallback Screenshot */}
                <div className="flex-1 w-full h-full relative overflow-hidden bg-[#1a1318]">
                  {project.liveUrl && !iframeError ? (
                    <iframe
                      src={project.liveUrl}
                      title={`Preview do projeto ${project.title}`}
                      className="w-full h-full border-0 bg-white"
                      loading="lazy"
                      onError={() => setIframeError(true)}
                      sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-[#1a1318] text-[#f5eff2]">
                      <img
                        src={project.screenshotUrl}
                        alt={`Captura de tela do projeto ${project.title}`}
                        className="max-h-[60%] object-contain rounded-xl shadow-lg border border-white/10"
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Exibição em modo captura de alta fidelidade</p>
                        <p className="text-xs text-[#b89aa8]">Este site restringe incorporação via iframe por políticas de segurança.</p>
                      </div>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#0f0d0e] bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] rounded-xl shadow-md cursor-pointer hover:brightness-110"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Abrir no Navegador Externo</span>
                        </a>
                      )}
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
                <span className="text-xs font-mono text-[#f0c870] tracking-wider uppercase font-semibold">
                  {project.category} · {project.completedDate}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                  {project.title}
                </h2>
                <p className="text-[#b89aa8] text-base sm:text-lg leading-relaxed mt-3">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Highlights List */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="p-5 bg-[#1a1318] border border-white/[0.08] rounded-2xl space-y-3">
                  <h3 className="text-sm font-semibold text-[#e8b0c4] uppercase tracking-wide font-mono flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#f0c870]" />
                    <span>Destaques da Arquitetura & Implementação</span>
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#f5eff2]">
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#e8b0c4] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-[#7a6070] uppercase font-mono tracking-wider">
                  Stack Tecnológico Utilizado
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-mono text-[#f5eff2] bg-[#241b20] border border-white/[0.08] rounded-xl"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-white/[0.08]">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#0f0d0e] bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] hover:brightness-110 rounded-xl transition-all shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4 text-[#0f0d0e]" />
                    <span>Visitar Aplicação Ao Vivo</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#f5eff2] bg-[#241b20] border border-white/10 hover:border-[#d4789a]/40 rounded-xl transition-colors"
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
