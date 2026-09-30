import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Linkedin, Globe, Sparkles, Award, 
  ChevronRight, ChevronLeft, Play, Pause, X, 
  ArrowRight, Mail, Code2, Cpu, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TeamMember } from '../types';

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers }) => {
  const activeMembers = teamMembers.filter(m => m.active !== false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [detailModalMember, setDetailModalMember] = useState<TeamMember | null>(null);

  const rosterListRef = useRef<HTMLDivElement>(null);
  const autoPlayDuration = 5500; // 5.5s per member

  const totalMembers = activeMembers.length;
  // Clamp index in case team members count changes
  const currentIndex = totalMembers > 0 ? Math.min(selectedIndex, totalMembers - 1) : 0;
  const selectedMember = totalMembers > 0 ? activeMembers[currentIndex] : null;

  // Auto-play transition effect - continues uninterrupted even during hover
  useEffect(() => {
    if (!isAutoPlaying || detailModalMember !== null || totalMembers <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % totalMembers);
    }, autoPlayDuration);

    return () => clearInterval(timer);
  }, [isAutoPlaying, detailModalMember, totalMembers]);

  // Keep active item scrolled into view strictly INSIDE the container without pulling window scroll
  useEffect(() => {
    if (rosterListRef.current && totalMembers > 1) {
      const container = rosterListRef.current;
      const activeBtn = container.children[currentIndex] as HTMLElement;
      if (activeBtn) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeBtn.getBoundingClientRect();
        const relativeTop = activeRect.top - containerRect.top + container.scrollTop;
        const targetScroll = relativeTop - (container.clientHeight / 2) + (activeBtn.clientHeight / 2);

        container.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex, totalMembers]);

  // Safe fallback if activeMembers is empty - placed AFTER all hooks
  if (totalMembers === 0 || !selectedMember) {
    return null;
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % totalMembers);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + totalMembers) % totalMembers);
  };

  return (
    <section 
      id="equipe" 
      aria-label="Conheça nossa equipe"
      className="relative py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/60 transition-colors overflow-hidden"
    >
      {/* Anchor for backward compatibility */}
      <div id="criadores" className="absolute -top-20" />

      {/* Subtle ambient light aura */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl rounded-full pointer-events-none -z-0" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 sm:px-12 md:px-24 lg:px-32 2xl:px-64 space-y-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200/80 dark:border-slate-800/80 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span>Corpo Técnico & Arquitetura de Software</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              {totalMembers > 1 ? 'Conheça nossa equipe' : 'Liderança Técnica & Arquitetura'}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {totalMembers > 1 
                ? 'Engenharia de software, design e escalabilidade do ecossistema REALPREMISE.'
                : 'Engenheiro de software e arquiteto de soluções responsável pela concepção, design de sistemas e escalabilidade do ecossistema REALPREMISE.'}
            </p>
          </div>

          {/* Autoplay & Slider Controls (Shown only if multiple members exist) */}
          {totalMembers > 1 && (
            <div className="flex items-center gap-3 self-start sm:self-end shrink-0">
              {/* Auto-play toggle button */}
              <button
                type="button"
                onClick={() => setIsAutoPlaying(prev => !prev)}
                aria-label={isAutoPlaying ? "Pausar rotação automática" : "Ativar rotação automática"}
                className="p-3 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer shadow-2xs min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={isAutoPlaying ? "Pausar transição automática" : "Ativar transição automática"}
              >
                {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              {/* Counter */}
              <div className="text-sm font-mono text-slate-600 dark:text-slate-300 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xs min-h-[44px] flex items-center justify-center">
                <span className="font-bold text-slate-900 dark:text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="mx-1.5 opacity-40">/</span>
                <span>{String(totalMembers).padStart(2, '0')}</span>
              </div>

              {/* Prev/Next Buttons */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Membro anterior"
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer shadow-2xs min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Próximo membro"
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer shadow-2xs min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Countdown Progress Bar (Only when rotating multiple members) */}
        {isAutoPlaying && detailModalMember === null && totalMembers > 1 && (
          <div className="w-full h-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-full overflow-hidden -mt-6">
            <motion.div
              key={currentIndex}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: autoPlayDuration / 1000, ease: 'linear' }}
              className="h-full bg-indigo-600 dark:bg-indigo-400"
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAYOUT A: SINGLE LEAD ARCHITECT SHOWCASE (WHEN 1 MEMBER EXISTS) */}
        {/* ========================================================================= */}
        {totalMembers === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Grand Showcase Portrait Stage */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
              <div className="relative flex-1 min-h-[480px] sm:min-h-[560px] lg:min-h-[600px] rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-900 shadow-2xl group">
                <img
                  src={selectedMember.avatarUrl}
                  alt={`Foto de ${selectedMember.name}`}
                  className="w-full h-full object-cover object-top sm:object-center filter brightness-[0.95] transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200';
                  }}
                />
                
                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/10 text-white text-xs sm:text-sm font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Perfil Oficial</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/90 backdrop-blur-md text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg">
                    <Award className="w-4 h-4" />
                    <span>Liderança Técnica</span>
                  </div>
                </div>

                {/* Base Name Strip */}
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white drop-shadow-md">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-indigo-300 font-mono mt-1">
                    {selectedMember.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Comprehensive Profile & Competencies Details */}
            <div className="lg:col-span-7 xl:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    <Code2 className="w-4 h-4" />
                    <span>Biografia & Trajetória Técnica</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white mt-1">
                    {selectedMember.name}
                  </h3>
                  <p className="text-base sm:text-lg font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                    {selectedMember.role}
                  </p>
                </div>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {selectedMember.bio}
                </p>

                {/* Tech Stack & Core Competencies */}
                {selectedMember.skills && selectedMember.skills.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Principais Competências & Stack de Engenharia
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedMember.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-2xs flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions & Verified Links */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                
                {/* Full Profile Modal Trigger */}
                <button
                  type="button"
                  onClick={() => setDetailModalMember(selectedMember)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-2xl transition-all shadow-xl shadow-indigo-500/25 cursor-pointer group min-h-[48px]"
                >
                  <span>Ver perfil e projetos completos</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                {/* Verified Professional Channels */}
                <div className="flex items-center gap-3">
                  {selectedMember.githubUrl && (
                    <a
                      href={selectedMember.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                      title="GitHub Perfil"
                      aria-label={`GitHub de ${selectedMember.name}`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}

                  {selectedMember.linkedinUrl && (
                    <a
                      href={selectedMember.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-slate-600 dark:text-slate-300 hover:text-sky-600 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                      title="LinkedIn Perfil"
                      aria-label={`LinkedIn de ${selectedMember.name}`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}

                  {selectedMember.email && (
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="p-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                      title="Enviar E-mail"
                      aria-label={`E-mail de ${selectedMember.name}`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>

              </div>

            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* LAYOUT B: EDITORIAL ALBUM + SIDE TRACKLIST (WHEN > 1 MEMBER EXISTS) */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT: Grand Showcase Album Photo Stage (7-8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
              <div className="relative flex-1 min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] xl:min-h-[700px] rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-900 shadow-2xl group">
                
                {/* Photo with AnimatePresence */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMember.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={selectedMember.avatarUrl}
                      alt={`Foto de ${selectedMember.name}`}
                      className="w-full h-full object-cover object-top sm:object-center filter brightness-[0.92]"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200';
                      }}
                    />
                    
                    {/* Subtle Gradient Overlays for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent hidden sm:block" />
                  </motion.div>
                </AnimatePresence>

                {/* Top Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 text-white text-xs sm:text-sm font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Álbum de Talentos</span>
                  </div>

                  {selectedMember.featured && (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/90 backdrop-blur-md text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg">
                      <Award className="w-4 h-4" />
                      <span>Liderança Técnica</span>
                    </div>
                  )}
                </div>

                {/* Base Information Sheet */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10 space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedMember.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight drop-shadow-md">
                          {selectedMember.name}
                        </h3>
                        <p className="text-base sm:text-lg font-semibold text-indigo-300 font-mono mt-1.5">
                          {selectedMember.role}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-slate-200/95 line-clamp-2 leading-relaxed max-w-2xl">
                        {selectedMember.bio}
                      </p>

                      {/* Bottom Action Bar */}
                      <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                        {/* "Ver perfil completo" modal trigger */}
                        <button
                          type="button"
                          onClick={() => setDetailModalMember(selectedMember)}
                          className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-2xl transition-all shadow-xl cursor-pointer group min-h-[48px]"
                        >
                          <span>Ver perfil completo</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </button>

                        {/* Professional Socials */}
                        <div className="flex items-center gap-2.5">
                          {selectedMember.githubUrl && (
                            <a
                              href={selectedMember.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 text-white/90 hover:text-white bg-slate-950/70 backdrop-blur-md border border-white/15 rounded-2xl hover:bg-white/20 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                              title="GitHub Perfil"
                              aria-label={`GitHub de ${selectedMember.name}`}
                            >
                              <Github className="w-5 h-5" />
                            </a>
                          )}

                          {selectedMember.linkedinUrl && (
                            <a
                              href={selectedMember.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 text-white/90 hover:text-sky-300 bg-slate-950/70 backdrop-blur-md border border-white/15 rounded-2xl hover:bg-white/20 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                              title="LinkedIn Perfil"
                              aria-label={`LinkedIn de ${selectedMember.name}`}
                            >
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}

                          {selectedMember.email && (
                            <a
                              href={`mailto:${selectedMember.email}`}
                              className="p-3 text-white/90 hover:text-indigo-300 bg-slate-950/70 backdrop-blur-md border border-white/15 rounded-2xl hover:bg-white/20 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                              title="E-mail"
                              aria-label={`E-mail de ${selectedMember.name}`}
                            >
                              <Mail className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </div>

            {/* RIGHT: Side Album Tracklist (4-5 cols) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                  <span>Lista da Equipe</span>
                  <span>{totalMembers} Integrantes</span>
                </div>

                {/* Scrollable Side Tracklist */}
                <div 
                  ref={rosterListRef}
                  className="max-h-[500px] sm:max-h-[580px] lg:max-h-[640px] xl:max-h-[700px] overflow-y-auto space-y-3 pr-1.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700"
                  role="tablist"
                  aria-label="Lista lateral da equipe"
                >
                  {activeMembers.map((member, index) => {
                    const isSelected = index === currentIndex;
                    return (
                      <button
                        key={member.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedIndex(index)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer min-h-[64px] ${
                          isSelected
                            ? 'bg-slate-900 text-white dark:bg-indigo-600 dark:text-white border-transparent shadow-lg scale-[1.01]'
                            : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Number Index */}
                          <span className={`text-xs font-mono font-bold w-6 shrink-0 text-center ${
                            isSelected ? 'text-indigo-300 dark:text-indigo-200' : 'text-slate-400 dark:text-slate-500'
                          }`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          {/* Miniature Square Thumbnail */}
                          <div className={`w-12 h-12 rounded-2xl overflow-hidden shrink-0 border ${
                            isSelected ? 'border-white/40 ring-2 ring-white/20' : 'border-slate-200 dark:border-slate-700'
                          }`}>
                            <img
                              src={member.avatarUrl}
                              alt={member.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
                              }}
                            />
                          </div>

                          <div className="min-w-0">
                            <h4 className={`text-sm sm:text-base font-bold truncate ${
                              isSelected ? 'text-white' : 'text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                            }`}>
                              {member.name}
                            </h4>
                            <p className={`text-xs sm:text-sm truncate font-mono mt-0.5 ${
                              isSelected ? 'text-indigo-200 dark:text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                            }`}>
                              {member.role}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 pr-1">
                          <ChevronRight className={`w-5 h-5 transition-transform ${
                            isSelected ? 'text-white translate-x-1' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600'
                          }`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* RICH TEAM MEMBER PROFILE MODAL ("VER PERFIL COMPLETO") */}
      <AnimatePresence>
        {detailModalMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-member-name"
            >
              {/* Modal Header Cover */}
              <div className="relative h-48 sm:h-56 bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-950 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img
                  src={detailModalMember.avatarUrl}
                  alt={detailModalMember.name}
                  className="w-full h-full object-cover object-center filter blur-xs scale-110 opacity-40"
                />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setDetailModalMember(null)}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Fechar modal de perfil"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Avatar Badge on Cover */}
                <div className="absolute -bottom-10 left-6 sm:left-8 z-20 flex items-end gap-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl bg-slate-800 shrink-0">
                    <img
                      src={detailModalMember.avatarUrl}
                      alt={detailModalMember.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Body Content (Scrollable) */}
              <div className="p-6 sm:p-8 pt-14 space-y-6 overflow-y-auto flex-1">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 id="modal-member-name" className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                      {detailModalMember.name}
                    </h3>
                    {detailModalMember.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                        Lead Architect
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400 font-mono mt-1">
                    {detailModalMember.role}
                  </p>
                </div>

                {/* Biography */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Sobre & Trajetória
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {detailModalMember.bio}
                  </p>
                </div>

                {/* Skills */}
                {detailModalMember.skills && detailModalMember.skills.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Competências & Tecnologias
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {detailModalMember.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1 rounded-xl text-xs font-mono font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Channels / Socials */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {detailModalMember.githubUrl && (
                      <a
                        href={detailModalMember.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-bold"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {detailModalMember.linkedinUrl && (
                      <a
                        href={detailModalMember.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors text-xs font-bold"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </a>
                    )}

                    {detailModalMember.email && (
                      <a
                        href={`mailto:${detailModalMember.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors text-xs font-bold"
                      >
                        <Mail className="w-4 h-4" />
                        <span>E-mail</span>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setDetailModalMember(null)}
                    className="px-5 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  >
                    Fechar
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
