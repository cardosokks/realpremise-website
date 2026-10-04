import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, Share2, MessageSquare, Check, Sparkles, User, ChevronRight, Copy, Heart, Phone, Mail, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost, Comment, User as UserType, Project } from '../types';
import { CommentSection } from './CommentSection';
import { updateArticleSEO } from '../utils/seo';

interface BlogPostArticlePageProps {
  post: BlogPost;
  onBackToBlog: () => void;
  relatedProject?: Project;
  onOpenProject?: (project: Project) => void;
  currentUser: UserType | null;
  comments: Comment[];
  onAddComment: (comment: { targetType: 'project' | 'blog'; targetId: string; authorName: string; authorEmail: string; content: string }) => Promise<void>;
  onLikeComment: (id: string) => void;
  onApproveComment: (id: string) => void;
  onDeleteComment: (id: string) => void;
}

export const BlogPostArticlePage: React.FC<BlogPostArticlePageProps> = ({
  post,
  onBackToBlog,
  relatedProject,
  onOpenProject,
  currentUser,
  comments,
  onAddComment,
  onLikeComment,
  onApproveComment,
  onDeleteComment
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Update SEO Title, Meta, Canonical Link & Schema.org JSON-LD when viewing article
  useEffect(() => {
    updateArticleSEO(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post]);

  const postComments = comments.filter(
    c => c.targetType === 'blog' && c.targetId === post.id
  );

  const articleUrl = `${window.location.origin}/#/blog/${post.slug || post.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(`Confira este artigo no blog da REALPREMISE: ${post.title}\n${articleUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToBlog}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Blog</span>
        </button>

        {/* Breadcrumb path */}
        <nav className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <span className="cursor-pointer hover:underline" onClick={onBackToBlog}>Início</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="cursor-pointer hover:underline" onClick={onBackToBlog}>Blog</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

      {/* Article Header Card */}
      <header className="space-y-4 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-6">
        
        {/* Category & Tags */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold font-mono text-brand-600 bg-brand-50 dark:bg-brand-950 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
            {post.category}
          </span>
          {post.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        {/* Summary */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {post.summary}
        </p>

        {/* Author & Meta Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
            />
            <div className="text-left">
              <strong className="block font-bold text-slate-900 dark:text-white">{post.author.name}</strong>
              <span className="text-[11px] text-slate-500">{post.author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedAt}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

        </div>

      </header>

      {/* Featured Cover Image */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-video">
        <img
          src={post.coverUrl}
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {post.judgeScore !== undefined && post.judgeScore > 0 && (
          <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono bg-slate-950/85 backdrop-blur-md text-amber-300 border border-amber-400/40 flex items-center gap-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Julgado & Aprovado pelo Conselho Editorial de IA ({post.judgeScore}/100)</span>
          </div>
        )}
      </div>

      {/* Real Source Reference Bar (if factual news was crawled) */}
      {post.sourceUrl && (
        <div className="p-3.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">Fonte Factual Pesquisada na Web:</span>
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1.5"
          >
            <span>Acessar Publicação Original</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Share Bar */}
      <div className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1.5">
          <Share2 className="w-4 h-4 text-brand-500" />
          <span>Compartilhar Notícia:</span>
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareWhatsapp}
            className="px-3 py-1.5 text-[11px] font-bold text-white bg-brand-primary-600 hover:bg-brand-primary-500 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-brand-primary-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copiado!' : 'Copiar URL'}</span>
          </button>
        </div>
      </div>

      {/* Main Markdown Article Content + In-Article Ad Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
        
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 space-y-4 leading-relaxed text-sm sm:text-base">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
          
          {/* IN-ARTICLE SELF-PROMOTIONAL AD CARD */}
          <div className="my-8 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 border border-brand-500/40 rounded-3xl text-white shadow-2xl relative overflow-hidden not-prose">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>Anúncio Oficial REALPREMISE</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-white leading-tight">
                🚀 Crie Seu Site Com um Especialista em Engenharia Web
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Precisa de um site moderno, aplicativo web sob medida ou e-commerce com alta taxa de conversão? Fale diretamente com o engenheiro responsável.
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <a
                  href="https://wa.me/556192035053?text=Olá!%20Li%20um%20artigo%20no%20blog%20e%20gostaria%20de%20criar%20meu%20site%20com%20um%20especialista."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-brand-primary-600" />
                  <span>Falar no WhatsApp (+55 61 9203-5053)</span>
                </a>

                <a
                  href="mailto:contato@realpremise.com"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 border border-brand-400/30 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Solicitar Orçamento</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Related Project Showcase (If associated) */}
      {relatedProject && onOpenProject && (
        <div className="p-6 bg-slate-900 text-white border border-slate-800 rounded-3xl space-y-3">
          <span className="text-xs font-mono text-brand-400 font-bold uppercase">Projeto Demonstrativo do Artigo</span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold font-display text-white">{relatedProject.title}</h4>
              <p className="text-xs text-slate-300">{relatedProject.description}</p>
            </div>
            <button
              onClick={() => onOpenProject(relatedProject)}
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Ver Projeto Completo
            </button>
          </div>
        </div>
      )}

      {/* Comment Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md">
        <CommentSection
          targetType="blog"
          targetId={post.id}
          comments={postComments}
          onAddComment={onAddComment}
          onLikeComment={onLikeComment}
          onApproveComment={onApproveComment}
          onDeleteComment={onDeleteComment}
          currentUser={currentUser}
        />
      </div>

    </article>
  );
};
