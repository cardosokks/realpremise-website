import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { subscribeNewsletter } from '../services/api';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await subscribeNewsletter(email, name);
      setSuccessMsg(res.message || 'Inscrição realizada com sucesso!');
      setEmail('');
      setName('');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao processar inscrição.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-900/40 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16"
      >
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-14 lg:p-16 shadow-2xl border border-indigo-500/25 relative overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
            
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center mx-auto shadow-md">
              <Mail className="w-7 h-7" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
              Inscreva-se na Newsletter Técnica
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Receba novos estudos de caso de arquitetura, análises de performance com <strong className="text-white font-semibold">Spring Boot, React & Cloud</strong> e atualizações dos novos projetos lançados no ecossistema.
            </p>

            {successMsg && (
              <div className="p-4 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 bg-rose-500/20 border border-rose-400/40 text-rose-200 text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="pt-3 flex flex-col sm:flex-row items-center gap-3.5 max-w-2xl mx-auto">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome (opcional)"
                className="w-full sm:w-1/3 px-5 py-3.5 text-sm sm:text-base bg-slate-950/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-400 min-h-[50px]"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@dominio.com"
                className="w-full sm:flex-1 px-5 py-3.5 text-sm sm:text-base bg-slate-950/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-400 min-h-[50px]"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2.5 shrink-0 disabled:opacity-50 min-h-[50px] cursor-pointer"
              >
                <Send className="w-4 h-4 text-indigo-600" />
                <span>{submitting ? 'Inscrevendo...' : 'Inscrever'}</span>
              </button>
            </form>

          </div>
        </div>
      </motion.div>
    </section>
  );
};
