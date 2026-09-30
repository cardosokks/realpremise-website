import React, { useState } from 'react';
import { MessageSquare, Heart, CheckCircle, Trash2, Send, ShieldAlert, UserCheck } from 'lucide-react';
import { Comment, User } from '../types';

interface CommentSectionProps {
  targetType: 'project' | 'blog';
  targetId: string;
  comments: Comment[];
  currentUser: User | null;
  onAddComment: (commentData: { targetType: 'project' | 'blog'; targetId: string; authorName: string; authorEmail: string; content: string }) => Promise<void>;
  onLikeComment: (id: string) => void;
  onApproveComment: (id: string) => void;
  onDeleteComment: (id: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  targetType,
  targetId,
  comments,
  currentUser,
  onAddComment,
  onLikeComment,
  onApproveComment,
  onDeleteComment
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [likedIds, setLikedIds] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) {
      setErrorMsg('Por favor, informe seu nome e seu comentário.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    try {
      await onAddComment({
        targetType,
        targetId,
        authorName: authorName.trim(),
        authorEmail: authorEmail.trim(),
        content: content.trim()
      });
      setContent('');
      setSuccessMsg('Comentário publicado com sucesso!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao enviar comentário.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = (id: string) => {
    if (likedIds.includes(id)) return;
    onLikeComment(id);
    setLikedIds([...likedIds, id]);
  };

  const filteredComments = comments.filter(c => c.targetType === targetType && c.targetId === targetId);

  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-500" />
          <span>Comentários ({filteredComments.length})</span>
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Discussão aberta à comunidade
        </span>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Deixe um comentário
        </h4>

        {successMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs rounded-lg flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Seu Nome *
            </label>
            <input
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Ex: Ana Maria"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              E-mail (não publicado)
            </label>
            <input
              type="email"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              placeholder="seu.email@dominio.com"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Comentário *
          </label>
          <textarea
            required
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva sua dúvida, feedback técnico ou sugestão..."
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Enviando...' : 'Publicar Comentário'}</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4 pt-2">
        {filteredComments.length === 0 ? (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center py-6">
            Nenhum comentário ainda. Seja o primeiro a comentar!
          </p>
        ) : (
          filteredComments.map((comm) => (
            <div
              key={comm.id}
              className={`p-4 rounded-xl border transition-colors ${
                !comm.approved
                  ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40'
                  : 'bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={comm.authorAvatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(comm.authorName)}`}
                    alt={comm.authorName}
                    className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {comm.authorName}
                      </span>
                      {!comm.approved && (
                        <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-1.5 py-0.5 rounded-md">
                          Aguardando Aprovação
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {comm.createdAt}
                    </span>
                  </div>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => handleLike(comm.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-colors ${
                    likedIds.includes(comm.id)
                      ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Curtir comentário"
                >
                  <Heart className={`w-3.5 h-3.5 ${likedIds.includes(comm.id) ? 'fill-current text-rose-500' : ''}`} />
                  <span>{comm.likes}</span>
                </button>
              </div>

              {/* Comment Content */}
              <p className="mt-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-11">
                {comm.content}
              </p>

              {/* Admin Moderation Actions */}
              {currentUser && (
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end gap-2 text-xs">
                  {!comm.approved && (
                    <button
                      onClick={() => onApproveComment(comm.id)}
                      className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Aprovar</span>
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteComment(comm.id)}
                    className="flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:underline font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Excluir</span>
                  </button>
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </section>
  );
};
