import React, { useState } from 'react';
import { Home, BookOpen, Moon, Sun, UserCheck, Lock, Search, Menu, X, Users, MessageCircle } from 'lucide-react';
import { User, ThemeMode } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  currentUser: User | null;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenLogin: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  theme,
  onToggleTheme,
  onOpenLogin,
  onOpenAdmin,
  activeSection,
  onNavigate,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'projetos', label: 'Início', icon: Home },
    { id: 'blog', label: 'Artigos', icon: BookOpen },
    { id: 'equipe', label: 'Equipe', icon: Users }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-[#0f0d0e]/95 backdrop-blur-md transition-colors shadow-xs">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Official Logo & Brand Name */}
        <a
          href="#projetos"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('projetos');
          }}
          className="focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d4789a] rounded-xl group py-1 shrink-0"
          title="REAL PREMISE"
        >
          <Logo size="md" showText={true} variant="color" />
        </a>

        {/* Zone 2: Navigation Links (Shown on Desktop screens >= 1024px to keep tablet uncluttered) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2" aria-label="Navegação principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 xl:px-5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-all min-h-[40px] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d4789a] ${
                  isActive
                    ? 'text-[#a83d65] dark:text-white bg-[#faebf2] dark:bg-[#241b20] border border-[#d4789a]/35 shadow-sm shadow-[#d4789a]/10'
                    : 'text-[#68515e] dark:text-[#b89aa8] hover:text-[#1c1418] dark:hover:text-white hover:bg-[#f4ecf0] dark:hover:bg-[#1a1318]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${isActive ? 'text-[#be5980] dark:text-[#e8b0c4]' : 'text-[#8e7383] dark:text-[#7a6070]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Buscar no site"
            className="min-h-[40px] min-w-[40px] p-2 text-[#68515e] dark:text-[#b89aa8] hover:text-[#1c1418] dark:hover:text-white hover:bg-[#f4ecf0] dark:hover:bg-[#1a1318] rounded-xl transition-colors focus:outline-hidden flex items-center justify-center cursor-pointer"
            title="Buscar artigos e projetos"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle Button (Icon Only) */}
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            className="min-h-[40px] min-w-[40px] p-2 text-[#68515e] dark:text-[#b89aa8] hover:text-[#1c1418] dark:hover:text-white hover:bg-[#f4ecf0] dark:hover:bg-[#1a1318] rounded-xl transition-colors focus:outline-hidden flex items-center justify-center cursor-pointer"
            title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-[#f0c870] shrink-0" />
            ) : (
              <Moon className="w-5 h-5 text-[#9e4d6b] shrink-0" />
            )}
          </button>

          {/* CTA: Falar com Consultor (Shown on Large Desktop >= 1280px to prevent tablet crowding) */}
          <a
            href="https://wa.me/5561981916368"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-2 px-4 py-2 xl:px-5 xl:py-2.5 rounded-full text-xs xl:text-sm font-bold text-[#0f0d0e] bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] hover:brightness-110 shadow-lg shadow-[#d4789a]/25 transition-all cursor-pointer min-h-[40px]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Falar com Consultor</span>
          </a>

          {/* Admin CMS Access */}
          {currentUser ? (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#9e4d6b] dark:text-[#e8b0c4] bg-[#faebf2] dark:bg-[#241b20] border border-[#d4789a]/35 rounded-xl hover:bg-[#fcebf2] dark:hover:bg-[#32232a] transition-all min-h-[40px] cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Painel</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="min-h-[40px] min-w-[40px] p-2 text-[#8e7383] dark:text-[#7a6070] hover:text-[#9e4d6b] dark:hover:text-[#e8b0c4] hover:bg-[#f4ecf0] dark:hover:bg-[#1a1318] rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              title="Acesso Administrativo"
              aria-label="Acesso Administrativo"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Tablet & Mobile Menu Toggle (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden min-h-[44px] min-w-[44px] p-2 text-[#68515e] dark:text-[#b89aa8] hover:text-[#1c1418] dark:hover:text-white hover:bg-[#f4ecf0] dark:hover:bg-[#1a1318] rounded-xl flex items-center justify-center cursor-pointer transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Tablet & Mobile Drawer (< 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0f0d0e] px-4 sm:px-6 py-4 space-y-2.5 animate-in slide-in-from-top-3 duration-200">
          <nav aria-label="Navegação móvel e tablet" className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-base font-semibold rounded-xl transition-colors text-left min-h-[48px] cursor-pointer ${
                    isActive
                      ? 'bg-[#faebf2] dark:bg-[#241b20] text-[#a83d65] dark:text-[#e8b0c4] border border-[#d4789a]/35'
                      : 'text-[#68515e] dark:text-[#b89aa8] hover:bg-[#f4ecf0] dark:hover:bg-[#1a1318] hover:text-[#1c1418] dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 text-[#d4789a] shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA inside drawer for tablet & mobile */}
          <div className="pt-2">
            <a
              href="https://wa.me/5561981916368"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-bold text-[#0f0d0e] bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] min-h-[48px] shadow-md hover:brightness-110"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Falar com Consultor</span>
            </a>
          </div>

          <div className="pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
            <button
              onClick={() => {
                onToggleTheme();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl bg-[#f4ecf0] dark:bg-[#1a1318] text-[#1c1418] dark:text-[#f5eff2] min-h-[48px] cursor-pointer hover:bg-[#efe4ea] dark:hover:bg-[#241b20]"
            >
              <span>Tema da Aplicação</span>
              <div className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-[#f0c870]" />
                    <span className="text-xs text-[#b89aa8]">Modo Escuro Ativo</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#9e4d6b]" />
                    <span className="text-xs text-[#68515e]">Modo Claro Ativo</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
