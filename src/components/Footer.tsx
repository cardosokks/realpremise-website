import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Lock,
  ArrowUp,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { User } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  currentUser: User | null;
  onOpenLogin: () => void;
  onOpenAdmin: () => void;
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentUser,
  onOpenLogin,
  onOpenAdmin,
  onNavigate
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950 pt-16 pb-12 transition-colors overflow-hidden">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16 space-y-14">
        
        {/* Top Call-to-Action Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-900/90 dark:via-indigo-950/80 dark:to-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Desenvolvimento Sob Medida & Arquitetura</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white">
              Pronto para tirar o seu projeto do papel?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              Entre em contato diretamente para consultoria de projetos, criação de sistemas web de alta escalabilidade e parcerias.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('equipe')}
              className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md cursor-pointer flex items-center gap-2 min-h-[48px]"
            >
              <span>Conhecer Nossa Equipe</span>
            </button>
            <a
              href="mailto:ricardo.estudos1998@gmail.com"
              className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/30 transition-all shadow-md flex items-center gap-2 min-h-[48px]"
            >
              <Mail className="w-4 h-4" />
              <span>Enviar Mensagem</span>
            </a>
          </div>
        </div>

        {/* Main Multi-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 pt-4">
          
          {/* Column 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" badgeSubtitle="Estúdio de Criação & Engenharia Web" variant="white" />

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Criamos experiências digitais sofisticadas e sistemas web de alto desempenho com foco em design, usabilidade e excelência técnica.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/cardosokks"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="GitHub"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://linkedin.com/in/cardosokks"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-slate-500 hover:text-sky-600 rounded-xl hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="mailto:ricardo.estudos1998@gmail.com"
                className="p-3 text-slate-500 hover:text-indigo-600 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="E-mail de Contato"
                aria-label="E-mail de Contato"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 3: Links Rápidos */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('projetos')}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1 cursor-pointer"
                >
                  Galeria de Projetos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('blog')}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1 cursor-pointer"
                >
                  Artigos & Tech Journal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('equipe')}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1 cursor-pointer"
                >
                  Corpo Técnico & Equipe
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Especialidades */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Especialidades
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              <li>Aplicações SaaS & Dashboards</li>
              <li>E-Commerce & Pagamentos</li>
              <li>Arquitetura em Nuvem & DevOps</li>
              <li>Inteligência Artificial & Agentes</li>
            </ul>
          </div>

          {/* Column 5: Gestão & Acesso */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Administração
            </h4>
            <div className="space-y-3">
              {currentUser ? (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors min-h-[44px] cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Painel CMS</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors min-h-[44px] cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Acesso Restrito</span>
                </button>
              )}
              <p className="text-xs text-slate-400">
                Gestão de publicações, mídias e moderação em tempo real.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} REALPREMISE. Todos os direitos reservados.</p>

          <div className="flex items-center gap-4">
            <span>Desenvolvido com padrão de alta fidelidade e acessibilidade.</span>

            {showScrollTop && (
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Voltar ao topo da página"
                className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white transition-all shadow-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
