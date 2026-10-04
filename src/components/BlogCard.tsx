import React from 'react';
import { ArrowRight, Clock, Eye, Edit3, Trash2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogPost, User } from '../types';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  onSelect: (post: BlogPost) => void;
  searchQuery?: string;
  currentUser: User | null;
  onEdit?: (post: BlogPost) => void;
  onDelete?: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  index = 0,
  onSelect,
  searchQuery,
  currentUser,
  onEdit,
  onDelete
}) => {
  // Helper to highlight search term in title or summary
  const highlightText = (text: string, query?: string) => {
    if (!query || !query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-amber-200 dark:bg-amber-900/60 text-slate-900 dark:text-amber-100 rounded-xs px-0.5 font-semibold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-white dark:bg-[#1a1318] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#d4789a]/50 p-6 justify-between space-y-4 shadow-xs"
    >
      
      {/* Featured Cover Image (Visual Header) */}
      {post.coverUrl && (
        <div
          onClick={() => onSelect(post)}
          className="relative -mx-6 -mt-6 mb-2 aspect-video overflow-hidden bg-[#f4ecf0] dark:bg-slate-950 cursor-pointer"
        >
          <img
            src={post.coverUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* AI Judge Badge if evaluated */}
          {post.judgeScore !== undefined && post.judgeScore > 0 && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-white/90 dark:bg-slate-950/85 backdrop-blur-md text-[#ae8d3c] dark:text-amber-300 border border-[#c9a84c]/30 flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 text-[#c9a84c] dark:text-amber-400" />
              <span>IA Score: {post.judgeScore}/100</span>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#68515e] dark:text-[#b89aa8] font-medium">
          <span className="text-[#be5980] dark:text-[#e8b0c4] font-semibold">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Eye className="w-3 h-3 text-[#d4789a]" />
            <span>{(post.viewsCount || 0).toLocaleString('pt-BR')}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{post.readTime}</span>
          </span>
        </div>

        {/* Title */}
        <h2
          onClick={() => onSelect(post)}
          className="text-xl font-bold font-display text-[#120c10] dark:text-white group-hover:text-[#be5980] dark:group-hover:text-[#e8b0c4] cursor-pointer transition-colors leading-snug"
        >
          {highlightText(post.title, searchQuery)}
        </h2>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-[#68515e] dark:text-[#b89aa8] line-clamp-3 leading-relaxed">
          {highlightText(post.summary, searchQuery)}
        </p>

        {/* Tag Cloud */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono text-[#68515e] dark:text-[#f5eff2] bg-[#f4ecf0] dark:bg-[#241b20] border border-black/[0.06] dark:border-white/[0.08] rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Author & Comments */}
      <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
        
        {/* Author */}
        <div className="flex items-center gap-2.5">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-7 h-7 rounded-full object-cover border border-[#d4789a]/30"
          />
          <span className="text-xs font-medium text-[#1c1418] dark:text-[#f5eff2]">
            {post.author.name}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelect(post)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#be5980] dark:text-[#e8b0c4] hover:text-[#9e4d6b] dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Ler Artigo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Admin Edit/Delete */}
          {currentUser && (
            <div className="flex items-center gap-1 pl-2 border-l border-black/[0.08] dark:border-white/[0.08]">
              <button
                onClick={() => onEdit && onEdit(post)}
                className="p-1 text-[#68515e] dark:text-[#b89aa8] hover:text-[#be5980] dark:hover:text-[#e8b0c4] rounded-md"
                title="Editar Artigo"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete && onDelete(post)}
                className="p-1 text-[#68515e] dark:text-[#b89aa8] hover:text-rose-600 dark:hover:text-rose-400 rounded-md"
                title="Excluir Artigo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>

    </motion.article>
  );
};
