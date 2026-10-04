import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, ArrowLeft, Share2, Copy, Check, ExternalLink, MessageSquare, Sparkles } from 'lucide-react';
import { BlogPost, Project, Comment, User } from '../types';
import { CommentSection } from './CommentSection';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  relatedProject?: Project;
  onOpenProject?: (project: Project) => void;
  currentUser: User | null;
  comments: Comment[];
  onAddComment: (commentData: { targetType: 'project' | 'blog'; targetId: string; authorName: string; authorEmail: string; content: string }) => Promise<void>;
  onLikeComment: (id: string) => void;
  onApproveComment: (id: string) => void;
  onDeleteComment: (id: string) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  onClose,
  relatedProject,
  onOpenProject,
  currentUser,
  comments,
  onAddComment,
  onLikeComment,
  onApproveComment,
  onDeleteComment
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareTitle = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(window.location.href);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0f0d0e]/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-modal-title"
        className="relative w-full max-w-4xl max-h-[94vh] sm:max-h-[92vh] flex flex-col bg-[#1a1318] border border-white/[0.08] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[#f5eff2]"
      >
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0f0d0e]">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#b89aa8] hover:text-white transition-colors min-h-[44px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#e8b0c4]" />
            <span>Voltar para o Blog</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Social Share Dropdown / Actions */}
            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#b89aa8] hover:text-white rounded-xl hover:bg-[#241b20] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              title="Compartilhar no X (Twitter)"
              aria-label="Compartilhar no X"
            >
              <Share2 className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyLink}
              className="p-2 text-[#b89aa8] hover:text-white rounded-xl hover:bg-[#241b20] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              title="Copiar Link"
              aria-label="Copiar link do artigo"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              aria-label="Fechar janela do artigo"
              className="p-2 text-[#b89aa8] hover:text-white rounded-xl hover:bg-[#241b20] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#1a1318]">
          
          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#b89aa8]">
              <span className="text-[#f0c870] font-semibold">{post.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.publishedAt}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <h1 id="blog-modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white leading-tight">
              {post.title}
            </h1>

            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={post.author.avatar}
                  alt={`Foto de ${post.author.name}`}
                  className="w-10 h-10 rounded-full object-cover border border-[#d4789a]/35 shadow-sm"
                />
                <div>
                  <span className="text-sm font-bold text-white block">{post.author.name}</span>
                  <span className="text-xs text-[#b89aa8]">{post.author.role}</span>
                </div>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {post.coverUrl && (
            <div className="rounded-2xl overflow-hidden aspect-[16/9] w-full bg-[#0f0d0e] border border-white/[0.08]">
              <img
                src={post.coverUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Related Project Banner */}
          {relatedProject && (
            <div className="p-4 sm:p-5 bg-[#241b20] border border-[#d4789a]/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#e8b0c4] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#f0c870]" />
                  <span>PROJETO RELACIONADO A ESTE ARTIGO</span>
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">{relatedProject.title}</h4>
                <p className="text-xs text-[#b89aa8] line-clamp-1">{relatedProject.description}</p>
              </div>
              {onOpenProject && (
                <button
                  type="button"
                  onClick={() => onOpenProject(relatedProject)}
                  className="px-4 py-2 text-xs font-bold text-[#0f0d0e] bg-gradient-to-r from-[#e8b0c4] to-[#c9a84c] rounded-xl hover:brightness-110 transition-colors shadow-xs shrink-0 cursor-pointer min-h-[40px]"
                >
                  Ver Projeto
                </button>
              )}
            </div>
          )}

          {/* Markdown Content Section with Internal Promotional Ads */}
          <div className="prose prose-invert max-w-none text-[#f5eff2] space-y-4 leading-relaxed text-sm sm:text-base">
            {post.content.split('\n\n').map((paragraph, idx) => {
              // Inject Internal Ad Banner after 2nd paragraph
              const showAd = idx === 2;

              let renderedParagraph = null;
              if (paragraph.startsWith('### ')) {
                renderedParagraph = (
                  <h3 key={idx} className="text-lg sm:text-xl font-bold font-display text-white mt-6 mb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              } else if (paragraph.startsWith('```')) {
                const codeText = paragraph.replace(/```[a-z]*/g, '').trim();
                renderedParagraph = (
                  <pre key={idx} className="p-4 bg-[#0f0d0e] text-[#f0c870] font-mono text-xs sm:text-sm rounded-xl overflow-x-auto border border-white/10">
                    <code>{codeText}</code>
                  </pre>
                );
              } else {
                renderedParagraph = <p key={idx}>{paragraph}</p>;
              }

              return (
                <React.Fragment key={idx}>
                  {renderedParagraph}

                  {/* INTERNAL SELF-PROMOTIONAL AD CARD */}
                  {showAd && (
                    <div className="my-8 p-6 bg-gradient-to-r from-[#1a1318] via-[#241b20] to-[#1a1318] border border-[#d4789a]/35 rounded-3xl text-white shadow-xl relative overflow-hidden not-prose">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4789a]/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="relative z-10 space-y-3 text-center sm:text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4789a]/20 border border-[#d4789a]/35 text-[#e8b0c4] text-xs font-bold">
                          <span>Soluções Digitais REAL PREMISE</span>
                        </div>
                        <h4 className="text-xl font-extrabold font-display tracking-tight text-white">
                          Crie Seu Site com Design de Alta Conversão & Automações n8n
                        </h4>
                        <p className="text-xs sm:text-sm text-[#b89aa8] max-w-xl leading-relaxed">
                          Sistemas sob medida, e-commerce de alta performance, landing pages inteligentes e portfólios institucionais com acabamento impecável.
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                          <a
                            href="https://wa.me/5561981916368?text=Olá!%20Li%20um%20artigo%20no%20blog%20e%20gostaria%20de%20criar%20meu%20site%20com%20a%20REAL%20PREMISE."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#0f0d0e] bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] hover:brightness-110 transition-all shadow-md flex items-center gap-2 min-h-[44px]"
                          >
                            <span>Falar no WhatsApp (+55 61 98191-6368)</span>
                          </a>
                          <a
                            href="mailto:ricardo.estudos1998@gmail.com"
                            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#241b20] border border-white/10 hover:border-[#d4789a]/40 transition-all shadow-md flex items-center gap-2 min-h-[44px]"
                          >
                            <span>Solicitar Orçamento</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono font-medium text-[#f5eff2] bg-[#241b20] border border-white/[0.08] rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Comments Section */}
          <div className="pt-6 border-t border-white/[0.08]">
            <CommentSection
              targetType="blog"
              targetId={post.id}
              comments={comments}
              currentUser={currentUser}
              onAddComment={onAddComment}
              onLikeComment={onLikeComment}
              onApproveComment={onApproveComment}
              onDeleteComment={onDeleteComment}
            />
          </div>

        </div>

      </div>

    </div>
  );
};
