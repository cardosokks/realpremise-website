import React, { useState } from 'react';
import { Home, BookOpen, Moon, Sun, UserCheck, Lock, Search, Menu, X, Users } from 'lucide-react';
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
    { id: 'blog', label: 'Artigos & Notícias', icon: BookOpen },
    { id: 'equipe', label: 'Equipe', icon: Users }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors shadow-2xs">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-16 lg:px-20 2xl:px-32 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Zone 1: Official Logo & Brand Name */}
        <a
          href="#projetos"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('projetos');
          }}
          className="focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl group py-1"
          title="REALPREMISE"
        >
          <Logo size="lg" showText={true} variant="white" />
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Navegação principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2.5 px-5 py-2.5 text-sm sm:text-base font-semibold rounded-xl transition-all min-h-[44px] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/90 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Buscar no site"
            className="min-h-[44px] min-w-[44px] p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center justify-center cursor-pointer"
            title="Buscar artigos e projetos"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle Button (Icon Only) */}
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            className="min-h-[44px] min-w-[44px] p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center justify-center cursor-pointer"
            title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            )}
          </button>

          {/* Admin CMS Access */}
          {currentUser ? (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all min-h-[44px] cursor-pointer shadow-2xs"
            >
              <UserCheck className="w-4 h-4" />
              <span>Painel</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="min-h-[44px] min-w-[44px] p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              title="Acesso Administrativo"
              aria-label="Acesso Administrativo"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu móvel" : "Abrir menu móvel"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden min-h-[44px] min-w-[44px] p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-2.5 animate-in slide-in-from-top-3 duration-200">
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
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-base font-semibold rounded-xl transition-colors text-left min-h-[48px] ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                onToggleTheme();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-[48px]"
            >
              <span>Tema da Aplicação</span>
              <div className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5 text-amber-400" />
                    <span className="text-sm">Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm">Modo Escuro</span>
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
