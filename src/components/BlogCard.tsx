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
      className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-800 p-6 justify-between space-y-4"
    >
      
      {/* Featured Cover Image (Visual Header) */}
      {post.coverUrl && (
        <div
          onClick={() => onSelect(post)}
          className="relative -mx-6 -mt-6 mb-2 aspect-video overflow-hidden bg-slate-950 cursor-pointer"
        >
          <img
            src={post.coverUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

          {/* AI Judge Badge if evaluated */}
          {post.judgeScore !== undefined && post.judgeScore > 0 && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-slate-950/85 backdrop-blur-md text-amber-300 border border-amber-400/30 flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>IA Score: {post.judgeScore}/100</span>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Eye className="w-3 h-3 text-indigo-500" />
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
          className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 cursor-pointer transition-colors leading-snug"
        >
          {highlightText(post.title, searchQuery)}
        </h2>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
          {highlightText(post.summary, searchQuery)}
        </p>

        {/* Tag Cloud */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Author & Comments */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        
        {/* Author */}
        <div className="flex items-center gap-2.5">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {post.author.name}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelect(post)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
          >
            <span>Ler Artigo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Admin Edit/Delete */}
          {currentUser && (
            <div className="flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-800">
              <button
                onClick={() => onEdit && onEdit(post)}
                className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md"
                title="Editar Artigo"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete && onDelete(post)}
                className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md"
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
