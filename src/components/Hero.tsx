import React from 'react';
import { PenTool, Layout, Rocket, ArrowRight, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Partner, HeroVideoSettings } from '../types';
import { INITIAL_HERO_SETTINGS } from '../data/initialData';

interface HeroProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  onNavigate?: (section: string) => void;
  partners?: Partner[];
  projectsCount?: number;
  heroSettings?: HeroVideoSettings;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  projectsCount = 12,
  heroSettings = INITIAL_HERO_SETTINGS
}) => {
  const isVideoEnabled = heroSettings?.enabled !== false;
  const currentVideoUrl = heroSettings?.videoUrl || INITIAL_HERO_SETTINGS.videoUrl;
  const currentPosterUrl = heroSettings?.posterUrl || INITIAL_HERO_SETTINGS.posterUrl;
  const currentFallbackUrl = heroSettings?.fallbackVideoUrl || INITIAL_HERO_SETTINGS.fallbackVideoUrl;
  const videoOpacity = heroSettings?.opacity !== undefined ? heroSettings.opacity : 0.25;

  return (
    <section className="relative bg-[#fcf9fa] dark:bg-[#0f0d0e] text-[#1c1418] dark:text-[#f5eff2] pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-black/[0.08] dark:border-white/[0.08] transition-colors overflow-hidden lg:h-[85vh] lg:flex lg:flex-col lg:justify-center">
      
      {/* Background Video Loop (Muted, AutoPlay, PlaysInline, Continuous Loop) */}
      {isVideoEnabled && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            key={currentVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            style={{ opacity: videoOpacity }}
            className={`w-full h-full object-cover filter saturate-150 contrast-125 transition-opacity duration-700 ${heroSettings?.blurEffect ? 'blur-[2px]' : ''}`}
            poster={currentPosterUrl}
          >
            <source
              src={currentVideoUrl}
              type="video/mp4"
            />
            {currentFallbackUrl && currentFallbackUrl !== currentVideoUrl && (
              <source
                src={currentFallbackUrl}
                type="video/mp4"
              />
            )}
          </video>

          {/* Ambient Gradient Overlays for High Contrast & WCAG 2.1 AA Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fcf9fa]/80 via-transparent to-[#fcf9fa] dark:from-[#0f0d0e]/85 dark:via-[#0f0d0e]/40 dark:to-[#0f0d0e]" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#fcf9fa]/50 to-[#fcf9fa] dark:via-[#0f0d0e]/60 dark:to-[#0f0d0e]" />
        </div>
      )}

      {/* Soft Ambient Radial Aura Background (Rose & Gold Glows from Real Premise) */}
      <div className="absolute top-1/3 right-0 -translate-y-1/2 w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] bg-gradient-to-tr from-[#d4789a]/15 via-[#c9a84c]/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 sm:w-[450px] sm:h-[450px] bg-[#9e4d6b]/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#d4789a]/30 to-transparent z-10" />

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16 w-full space-y-10 sm:space-y-12">
        
        {/* ROW 1: Hero Main Grid (Typography + Emblem) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typography, CTAs & Stats */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold font-display tracking-tight text-[#120c10] dark:text-white leading-[1.08] text-balance"
            >
              Criamos Landing Pages, Sites e{' '}
              <span className="bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#f0c870] bg-clip-text text-transparent">
                Soluções Incríveis
              </span>
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-[#68515e] dark:text-[#b89aa8] font-normal leading-relaxed text-balance max-w-3xl mx-auto lg:mx-0"
            >
              Do design de alta conversão à engenharia inteligente de sistemas, transformamos ideias em experiências web impactantes, com acabamento refinado e altíssimo desempenho.
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
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-[#0f0d0e] bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] hover:brightness-110 shadow-xl shadow-[#d4789a]/30 hover:shadow-[#d4789a]/50 transition-all flex items-center justify-center gap-2.5 cursor-pointer min-h-[52px]"
              >
                <span>Explorar Projetos</span>
                <ArrowRight className="w-5 h-5 text-[#0f0d0e]" />
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
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-[#1c1418] dark:text-[#f5eff2] bg-white dark:bg-[#1a1318]/80 border border-black/[0.08] dark:border-white/10 hover:border-[#d4789a]/50 hover:bg-[#faf3f6] dark:hover:bg-[#241b20] transition-all flex items-center justify-center gap-2.5 cursor-pointer min-h-[52px] shadow-xs"
              >
                <Users className="w-5 h-5 text-[#c9a84c] dark:text-[#f0c870]" />
                <span>Nossa Equipe</span>
              </button>
            </motion.div>

            {/* Technical Metrics Row (Real Project Stats with Gold Accents) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-black/[0.08] dark:border-white/[0.08] grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
            >
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display bg-gradient-to-r from-[#be5980] to-[#c9a84c] dark:from-[#e8b0c4] dark:to-[#f0c870] bg-clip-text text-transparent">
                  +{projectsCount > 0 ? projectsCount : 180}
                </div>
                <div className="text-xs sm:text-sm text-[#68515e] dark:text-[#b89aa8] font-medium mt-0.5">
                  Sites & Soluções
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#ae8d3c] dark:text-[#f0c870]">
                  99.8%
                </div>
                <div className="text-xs sm:text-sm text-[#68515e] dark:text-[#b89aa8] font-medium mt-0.5">
                  Satisfação Clientes
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#be5980] dark:text-[#e8b0c4]">
                  &lt; 2s
                </div>
                <div className="text-xs sm:text-sm text-[#68515e] dark:text-[#b89aa8] font-medium mt-0.5">
                  Tempo Otimizado
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Showcase Emblem */}
          <div className="lg:col-span-5 xl:col-span-4 relative flex flex-col items-center justify-center pt-4 lg:pt-0">
            
            <div className="relative w-full max-w-[280px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex items-center justify-center">
              
              {/* Distant Orbit 1: Outer Rotating Ring with Glowing Satellites */}
              <div
                className="absolute w-80 h-80 sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full border border-[#d4789a]/25 pointer-events-none animate-[spin_24s_linear_infinite]"
                style={{ borderStyle: 'dashed' }}
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#e8b0c4] to-[#d4789a] shadow-[0_0_14px_rgba(212,120,154,0.8)] border border-[#0f0d0e]" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#f0c870] shadow-[0_0_10px_rgba(240,200,112,0.8)]" />
              </div>

              {/* Distant Orbit 2: Mid Counter-Rotating Ring */}
              <div
                className="absolute w-72 h-72 sm:w-[330px] sm:h-[330px] lg:w-[380px] lg:h-[380px] rounded-full border border-[#c9a84c]/25 pointer-events-none animate-[spin_36s_linear_infinite_reverse]"
                style={{ borderStyle: 'dotted' }}
              >
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 rounded-full bg-[#e8b0c4] shadow-[0_0_12px_rgba(232,176,196,0.8)] border border-[#0f0d0e]" />
              </div>

              {/* Distant Orbit 3: Ambient Radial Glow & Soft Pulse Ring */}
              <div className="absolute inset-2 sm:inset-4 rounded-full border border-[#d4789a]/20 animate-pulse pointer-events-none" />
              <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#d4789a]/15 via-[#c9a84c]/10 to-transparent blur-2xl pointer-events-none" />

              {/* CENTRAL LOGO EMBLEM (Using the official Logo image from realpremise-lite) */}
              <div
                className="relative w-56 h-56 sm:w-68 sm:h-68 lg:w-76 lg:h-76 rounded-full p-2.5 overflow-hidden shadow-2xl shadow-[#d4789a]/35 border-4 border-[#241b20] flex items-center justify-center group shrink-0 transition-transform duration-700 hover:scale-[1.03] z-10"
                style={{
                  background: 'linear-gradient(135deg, #e8b0c4 0%, #d4789a 50%, #c9a84c 100%)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/20 pointer-events-none rounded-full" />
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#f0c870]/30 rounded-full blur-2xl pointer-events-none" />

                <img
                  src="/logo.png"
                  alt="REAL PREMISE Logo Oficial"
                  className="w-full h-full object-cover rounded-full shadow-md relative z-10 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/img/logo.png';
                  }}
                />
              </div>

              {/* FLOATING SKILL BADGES (Real Premise Aesthetics) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-1 -right-2 sm:-right-4 lg:-right-6 bg-white/95 dark:bg-[#1a1318]/95 backdrop-blur-md border border-[#d4789a]/30 rounded-2xl p-2 sm:p-3 shadow-xl flex items-center gap-2 sm:gap-2.5 z-20"
              >
                <div className="p-1.5 sm:p-2 rounded-xl bg-[#faebf2] dark:bg-[#d4789a]/15 border border-[#d4789a]/30 text-[#be5980] dark:text-[#e8b0c4] shrink-0">
                  <PenTool className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1c1418] dark:text-[#f5eff2] pr-1 whitespace-nowrap">
                  UI & Design System
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-6 -left-3 sm:-left-6 lg:-left-8 bg-white/95 dark:bg-[#1a1318]/95 backdrop-blur-md border border-[#c9a84c]/30 rounded-2xl p-2 sm:p-3 shadow-xl flex items-center gap-2 sm:gap-2.5 z-20"
              >
                <div className="p-1.5 sm:p-2 rounded-xl bg-[#fbf9f1] dark:bg-[#c9a84c]/15 border border-[#c9a84c]/30 text-[#ae8d3c] dark:text-[#f0c870] shrink-0">
                  <Layout className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1c1418] dark:text-[#f5eff2] pr-1 whitespace-nowrap">
                  Arquitetura Web
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute bottom-1 -right-3 sm:-right-2 lg:-right-4 bg-white/95 dark:bg-[#1a1318]/95 backdrop-blur-md border border-[#d4789a]/30 rounded-2xl p-2 sm:p-3 shadow-xl flex items-center gap-2 sm:gap-2.5 z-20"
              >
                <div className="p-1.5 sm:p-2 rounded-xl bg-[#faebf2] dark:bg-[#d4789a]/15 border border-[#d4789a]/30 text-[#be5980] dark:text-[#e8b0c4] shrink-0">
                  <Rocket className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1c1418] dark:text-[#f5eff2] pr-1 whitespace-nowrap">
                  Alta Conversão
                </span>
              </motion.div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
