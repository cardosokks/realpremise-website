import React from 'react';
import { Search, Sparkles, PenTool, Layout, Rocket, ArrowRight, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { PartnersTicker } from './PartnersTicker';
import { Partner } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onNavigate?: (section: string) => void;
  partners?: Partner[];
  projectsCount?: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onNavigate,
  partners = [],
  projectsCount = 12
}) => {
  const categories = ['Todos', 'SaaS', 'E-Commerce', 'Portfólio', 'Web App', 'Landing Page'];

  return (
    <section className="relative bg-white dark:bg-slate-950 text-slate-900 dark:text-white pt-8 pb-10 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-14 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors overflow-hidden">
      
      {/* Soft Ambient Radial Aura Background */}
      <div className="absolute top-1/3 right-0 -translate-y-1/2 w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] bg-gradient-to-tr from-indigo-500/15 via-sky-400/15 to-purple-500/10 dark:from-indigo-600/20 dark:via-sky-500/10 dark:to-purple-600/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 sm:w-[450px] sm:h-[450px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16 w-full space-y-10 sm:space-y-12">
        
        {/* ROW 1: Hero Main Grid (Typography + Emblem) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typography, CTAs & Stats */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Kicker Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>REALPREMISE · Engenharia de Software & Design Digital</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-[1.08] text-balance"
            >
              Vamos Trabalhar Juntos para Criar Projetos Incríveis
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed text-balance max-w-3xl mx-auto lg:mx-0"
            >
              Visão criativa e engenharia de software de ponta para transformar ideias em experiências web impactantes, com design refinado, altíssimo desempenho e acessibilidade.
            </motion.p>

            {/* Pill CTAs (Responsive Stack on Mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) {
                    onNavigate('projetos');
                  } else {
                    const el = document.getElementById('projetos-section') || document.getElementById('main-content');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer min-h-[52px]"
              >
                <span>Explorar Projetos</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) {
                    onNavigate('equipe');
                  } else {
                    const el = document.getElementById('equipe') || document.getElementById('criadores');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 border-2 border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2.5 cursor-pointer min-h-[52px]"
              >
                <Users className="w-5 h-5 text-indigo-500" />
                <span>Nossa Equipe</span>
              </button>
            </motion.div>

            {/* Technical Metrics Row (Real Project Stats) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
            >
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
                  {projectsCount}+
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Projetos no portfólio
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
                  Full-Stack
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  React & Spring Boot
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
                  WCAG 2.1
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Acessibilidade AA
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Showcase Emblem */}
          <div className="lg:col-span-5 xl:col-span-4 relative flex flex-col items-center justify-center pt-4 lg:pt-0">
            
            <div className="relative w-full max-w-[280px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex items-center justify-center">
              
              {/* Distant Orbit 1: Outer Rotating Ring with Glowing Satellites */}
              <div
                className="absolute w-80 h-80 sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full border border-indigo-500/25 dark:border-indigo-400/20 pointer-events-none animate-[spin_24s_linear_infinite]"
                style={{ borderStyle: 'dashed' }}
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_14px_rgba(99,102,241,0.8)] border border-white dark:border-slate-900" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
              </div>

              {/* Distant Orbit 2: Mid Counter-Rotating Ring */}
              <div
                className="absolute w-72 h-72 sm:w-[330px] sm:h-[330px] lg:w-[380px] lg:h-[380px] rounded-full border border-sky-400/20 dark:border-sky-400/25 pointer-events-none animate-[spin_36s_linear_infinite_reverse]"
                style={{ borderStyle: 'dotted' }}
              >
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] border border-white dark:border-slate-900" />
              </div>

              {/* Distant Orbit 3: Ambient Radial Glow & Soft Pulse Ring */}
              <div className="absolute inset-2 sm:inset-4 rounded-full border border-indigo-500/15 dark:border-indigo-400/15 animate-pulse pointer-events-none" />
              <div className="absolute -inset-6 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-2xl pointer-events-none" />

              {/* CENTRAL LOGO EMBLEM */}
              <div
                className="relative w-56 h-56 sm:w-68 sm:h-68 lg:w-76 lg:h-76 rounded-full p-2.5 overflow-hidden shadow-2xl shadow-indigo-500/30 border-4 border-white dark:border-slate-800 flex items-center justify-center group shrink-0 transition-transform duration-700 hover:scale-[1.03] z-10"
                style={{
                  background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 35%, #6366f1 70%, #7c3aed 100%)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20 pointer-events-none rounded-full" />
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-400/30 rounded-full blur-2xl pointer-events-none" />

                <img
                  src="/src/assets/images/real_premise_minimal_logo_1790719519164.jpg"
                  alt="REALPREMISE Logo Oficial"
                  className="w-full h-full object-cover rounded-full shadow-md relative z-10 transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* FLOATING SKILL BADGES */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-1 -right-2 sm:-right-4 lg:-right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-2 sm:p-3 shadow-xl flex items-center gap-2 sm:gap-2.5 z-20"
              >
                <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <PenTool className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 pr-1 whitespace-nowrap">
                  UI & Design System
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-6 -left-3 sm:-left-6 lg:-left-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-2 sm:p-3 shadow-xl flex items-center gap-2 sm:gap-2.5 z-20"
              >
                <div className="p-1.5 sm:p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Layout className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 pr-1 whitespace-nowrap">
                  Arquitetura Web
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute bottom-1 -right-3 sm:-right-2 lg:-right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-2 sm:p-3 shadow-xl flex items-center gap-2 sm:gap-2.5 z-20"
              >
                <div className="p-1.5 sm:p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 shrink-0">
                  <Rocket className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 pr-1 whitespace-nowrap">
                  SaaS & Escalabilidade
                </span>
              </motion.div>

            </div>

          </div>

        </div>

        {/* SECTION: PARTNERS TICKER */}
        {partners && partners.length > 0 && (
          <div className="pt-4 sm:pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
            <PartnersTicker partners={partners} />
          </div>
        )}

      </div>

    </section>
  );
};
