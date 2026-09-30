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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para o Blog</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Social Share Dropdown / Actions */}
            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-sky-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Compartilhar no X (Twitter)"
            >
              <Share2 className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyLink}
              className="p-2 text-slate-500 hover:text-indigo-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Copiar Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
          
          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{post.category}</span>
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

            <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900 dark:text-white">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1">
              {post.summary}
            </p>

            {/* Author Lockup */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-700"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{post.author.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{post.author.role}</p>
              </div>
            </div>
          </div>

          {/* Featured Cover Image */}
          {post.coverUrl && (
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 shadow-xl border border-slate-200 dark:border-slate-800">
              <img
                src={post.coverUrl}
                alt={post.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {post.judgeScore !== undefined && post.judgeScore > 0 && (
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl text-xs font-bold font-mono bg-slate-950/85 backdrop-blur-md text-amber-300 border border-amber-400/40 flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Aprovado pelo Julgador Editorial de IA ({post.judgeScore}/100)</span>
                </div>
              )}
            </div>
          )}

          {/* Real Source Reference Bar (if factual news was crawled) */}
          {post.sourceUrl && (
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono">Fonte Factual Pesquisada na Web:</span>
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
              >
                <span>Acessar Publicação Original</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Related Project Showcase Box (if linked) */}
          {relatedProject && (
            <div className="p-4 sm:p-5 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-semibold">
                  Projeto de Referência
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {relatedProject.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                  {relatedProject.description}
                </p>
              </div>

              {onOpenProject && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenProject(relatedProject);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver Projeto Ao Vivo</span>
                </button>
              )}
            </div>
          )}

          {/* Markdown Content Section with Internal Promotional Ads */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 space-y-4 leading-relaxed text-sm sm:text-base">
            {post.content.split('\n\n').map((paragraph, idx) => {
              // Inject Internal Ad Banner after 2nd paragraph
              const showAd = idx === 2;

              let renderedParagraph = null;
              if (paragraph.startsWith('### ')) {
                renderedParagraph = (
                  <h3 key={idx} className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mt-6 mb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              } else if (paragraph.startsWith('```')) {
                const codeText = paragraph.replace(/```[a-z]*/g, '').trim();
                renderedParagraph = (
                  <pre key={idx} className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm rounded-xl overflow-x-auto border border-slate-800">
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
                    <div className="my-8 p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 rounded-3xl text-white shadow-xl relative overflow-hidden not-prose">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="relative z-10 space-y-3 text-center sm:text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
                          <span>Anúncio Oficial REALPREMISE</span>
                        </div>
                        <h4 className="text-xl font-extrabold font-display tracking-tight text-white">
                          🚀 Crie Seu Site Com um Especialista em Engenharia Web
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                          Sistemas sob medida, e-commerce de alta performance, plataformas SaaS e portfólios institucionais com design exclusivo e usabilidade impecável.
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                          <a
                            href="https://wa.me/556192035053?text=Olá!%20Li%20um%20artigo%20no%20blog%20e%20gostaria%20de%20criar%20meu%20site%20com%20um%20especialista."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md flex items-center gap-2"
                          >
                            <span>Falar no WhatsApp (+55 61 9203-5053)</span>
                          </a>
                          <a
                            href="mailto:contato@realpremise.com"
                            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/30 transition-all shadow-md flex items-center gap-2"
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
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Comments Section */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
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
