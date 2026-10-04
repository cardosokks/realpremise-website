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
    <section className="py-14 sm:py-20 border-t border-black/[0.08] dark:border-white/[0.08] bg-[#fcf9fa] dark:bg-[#0f0d0e] transition-colors overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-24"
      >
        <div className="bg-gradient-to-br from-white via-[#faf3f6] to-white dark:from-[#1a1318] dark:via-[#241b20] dark:to-[#1a1318] text-[#1c1418] dark:text-white rounded-3xl p-8 sm:p-14 lg:p-16 shadow-xl border border-black/[0.08] dark:border-white/[0.08] relative overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d4789a]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c9a84c]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
            
            <div className="w-14 h-14 rounded-2xl bg-[#faebf2] dark:bg-[#d4789a]/15 border border-[#d4789a]/30 text-[#be5980] dark:text-[#e8b0c4] flex items-center justify-center mx-auto shadow-md">
              <Mail className="w-7 h-7" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#120c10] dark:text-white">
              Inscreva-se na Newsletter Técnica
            </h2>

            <p className="text-base sm:text-lg text-[#68515e] dark:text-[#b89aa8] font-normal leading-relaxed">
              Receba novos estudos de caso, análises de automações n8n, design de alta conversão e atualizações dos novos projetos lançados no ecossistema <strong className="text-[#120c10] dark:text-white font-semibold">REAL PREMISE</strong>.
            </p>

            {successMsg && (
              <div className="p-4 bg-emerald-50 dark:bg-[#d4789a]/20 border border-emerald-300 dark:border-[#d4789a]/40 text-emerald-800 dark:text-[#f5eff2] text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-[#e8b0c4] shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 bg-rose-50 dark:bg-rose-500/20 border border-rose-300 dark:border-rose-400/40 text-rose-800 dark:text-rose-200 text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="pt-3 flex flex-col sm:flex-row items-center gap-3.5 max-w-2xl mx-auto">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome (opcional)"
                className="w-full sm:w-1/3 px-5 py-3.5 text-sm sm:text-base bg-white dark:bg-[#0f0d0e] border border-black/15 dark:border-white/10 rounded-2xl text-[#1c1418] dark:text-white placeholder-[#8e7383] dark:placeholder-[#7a6070] focus:outline-hidden focus:ring-2 focus:ring-[#d4789a] min-h-[50px] shadow-xs"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@dominio.com"
                className="w-full sm:flex-1 px-5 py-3.5 text-sm sm:text-base bg-white dark:bg-[#0f0d0e] border border-black/15 dark:border-white/10 rounded-2xl text-[#1c1418] dark:text-white placeholder-[#8e7383] dark:placeholder-[#7a6070] focus:outline-hidden focus:ring-2 focus:ring-[#d4789a] min-h-[50px] shadow-xs"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-bold text-[#0f0d0e] bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] hover:brightness-110 rounded-2xl transition-all shadow-xl shadow-[#d4789a]/25 flex items-center justify-center gap-2.5 shrink-0 disabled:opacity-50 min-h-[50px] cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#0f0d0e]" />
                <span>{submitting ? 'Inscrevendo...' : 'Inscrever'}</span>
              </button>
            </form>

          </div>
        </div>
      </motion.div>
    </section>
  );
};
