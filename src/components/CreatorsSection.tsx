import React from 'react';
import { Github, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export const CreatorsSection: React.FC = () => {
  return (
    <section id="criadores" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 transition-colors overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Equipe & Engenharia</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Conheça os Nossos Criadores
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            A mente e a engenharia por trás do REALPREMISE e de seus projetos digitais.
          </p>
        </div>

        {/* Creator Card Container */}
        <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10">
          
          {/* Creator Portrait Photo & Brand Emblem */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-xl border-2 border-indigo-500/30 bg-slate-200 dark:bg-slate-800">
                <img
                  src="/src/assets/images/creator_ricardo_cardoso_1790710494036.jpg"
                  alt="Retrato de Ricardo Cardoso"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md border border-slate-700 shadow-md">
                @cardosokks
              </div>
            </div>

            {/* Official Brand Logo */}
            <img
              src="/src/assets/images/real_premise_minimal_logo_1790719519164.jpg"
              alt="REALPREMISE"
              className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-800"
            />
          </div>

          {/* Creator Description & Info */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <div className="flex flex-col sm:flex-row items-center md:items-start sm:items-baseline gap-2">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Ricardo Cardoso
                </h3>
                <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                  Criador & Arquiteto Lead
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Engenheiro de Software Full-Stack & Especialista em IA
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Especialista em arquitetura de software, desenvolvimento de aplicações web de alta performance e integração de modelos de Inteligência Artificial. Com vasta experiência no ecossistema <strong className="text-slate-900 dark:text-white font-semibold">Spring Boot</strong>, <strong className="text-slate-900 dark:text-white font-semibold">PostgreSQL</strong>, <strong className="text-slate-900 dark:text-white font-semibold">Angular</strong>, <strong className="text-slate-900 dark:text-white font-semibold">React</strong> e <strong className="text-slate-900 dark:text-white font-semibold">Segurança JWT</strong>, lidera a criação e manutenção dos projetos exibidos no REALPREMISE.
            </p>

            {/* Skills & Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 pt-1">
              <span className="px-2.5 py-1 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
                Java / Spring Boot 3
              </span>
              <span className="px-2.5 py-1 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
                PostgreSQL & SQL
              </span>
              <span className="px-2.5 py-1 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
                Angular & React
              </span>
              <span className="px-2.5 py-1 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
                Integração com IA / Gemini
              </span>
            </div>

            {/* Actions & Links */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3 border-t border-slate-200/80 dark:border-slate-800">
              <a
                href="https://github.com/cardosokks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 rounded-xl transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub @cardosokks</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href="mailto:contato@realpremise.com"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar E-mail</span>
              </a>
            </div>

          </div>

        </div>

      </motion.div>
    </section>
  );
};
