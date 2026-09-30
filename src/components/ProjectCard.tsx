import React, { useState } from 'react';
import { ExternalLink, Eye, MessageSquare, Edit3, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Project, User } from '../types';

interface ProjectCardProps {
  project: Project;
  index?: number;
  onPreview: (project: Project) => void;
  currentUser: User | null;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index = 0,
  onPreview,
  currentUser,
  onEdit,
  onDelete
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-800/80"
    >
      
      {/* Screenshot Container */}
      <div 
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
        onClick={() => onPreview(project)}
      >
        {!imgError && project.screenshotUrl ? (
          <img
            src={project.screenshotUrl}
            alt={`Captura de tela do site ${project.title}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-900 text-slate-300 text-center">
            <span className="font-display font-bold text-xl text-white mb-1">{project.title}</span>
            <span className="text-sm text-slate-400 font-mono">{project.category}</span>
          </div>
        )}

        {/* Category Label */}
        <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl tracking-wide shadow-md">
          {project.category}
        </div>

        {/* Hover/Touch Quick Overlay (Desktop hover + accessible button bar) */}
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-3 p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(project);
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-900 bg-white rounded-xl shadow-xl hover:bg-slate-100 transition-all cursor-pointer min-h-[44px]"
          >
            <Eye className="w-4 h-4 text-slate-900" />
            <span>Visualizar Detalhes</span>
          </button>
          
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-3 text-white bg-slate-900/90 rounded-xl hover:bg-slate-800 transition-colors shadow-xl min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              title="Abrir site em nova aba"
              aria-label={`Abrir ${project.title} em nova aba`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div>
          {/* Metadata Header */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-2.5 font-medium">
            {project.client && <span className="font-semibold text-slate-700 dark:text-slate-300">{project.client}</span>}
            {project.client && <span aria-hidden="true">·</span>}
            <span>{project.completedDate}</span>
          </div>

          {/* Title */}
          <h2
            onClick={() => onPreview(project)}
            className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white cursor-pointer group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug"
          >
            {project.title}
          </h2>

          {/* Description */}
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 rounded-lg border border-slate-200/80 dark:border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Bar (Always touch-friendly on mobile) */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-slate-400">
              <Eye className="w-4 h-4 text-indigo-500" />
              <span>{(project.viewsCount || 0).toLocaleString('pt-BR')} views</span>
            </span>

            <button
              type="button"
              onClick={() => onPreview(project)}
              className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer min-h-[44px]"
              aria-label={`Ver ${project.commentsCount || 0} comentários`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{project.commentsCount || 0}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Open Link on Mobile */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 rounded-xl"
              >
                <span>Acessar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Admin Edit/Delete */}
            {currentUser && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit && onEdit(project)}
                  className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                  title="Editar Projeto"
                  aria-label="Editar Projeto"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete && onDelete(project)}
                  className="p-2 text-slate-500 hover:text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                  title="Excluir Projeto"
                  aria-label="Excluir Projeto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.article>
  );
};
