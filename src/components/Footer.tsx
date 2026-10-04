import React, { useState, useEffect } from 'react';
import { Mail, ArrowUp, Github, Linkedin, Lock, UserCheck, Sparkles, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { User } from '../types';

interface FooterProps {
  onOpenLogin: () => void;
  onOpenAdmin: () => void;
  currentUser: User | null;
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLogin,
  onOpenAdmin,
  currentUser,
  onNavigate
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative border-t border-black/[0.08] dark:border-white/[0.08] bg-[#f4ecf0] dark:bg-[#0f0d0e] pt-16 pb-12 transition-colors overflow-hidden">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#d4789a]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#c9a84c]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-24 space-y-12 sm:space-y-14">
        
        {/* Top Call-to-Action Banner */}
        <div className="bg-gradient-to-r from-white via-[#faf3f6] to-white dark:from-[#1a1318] dark:via-[#241b20] dark:to-[#1a1318] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl p-8 sm:p-12 text-[#120c10] dark:text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faebf2] dark:bg-[#d4789a]/20 border border-[#d4789a]/35 text-[#be5980] dark:text-[#e8b0c4] text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-[#c9a84c] dark:text-[#f0c870]" />
              <span>Desenvolvimento Sob Medida & Arquitetura</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-[#120c10] dark:text-white">
              Pronto para tirar o seu projeto do papel?
            </h3>
            <p className="text-sm sm:text-base text-[#68515e] dark:text-[#b89aa8] max-w-2xl">
              Entre em contato diretamente para consultoria de projetos, criação de sistemas web de alta escalabilidade e automações digitais.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('equipe')}
              className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-[#1c1418] dark:text-[#f5eff2] bg-white dark:bg-[#241b20] border border-black/[0.08] dark:border-white/10 hover:border-[#d4789a]/40 hover:bg-[#faf3f6] dark:hover:bg-[#32232a] transition-all shadow-xs cursor-pointer flex items-center gap-2 min-h-[48px]"
            >
              <span>Conhecer Nossa Equipe</span>
            </button>
            <a
              href="mailto:ricardo.estudos1998@gmail.com"
              className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-[#0f0d0e] bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] hover:brightness-110 transition-all shadow-md shadow-[#d4789a]/25 flex items-center gap-2 min-h-[48px]"
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
            <Logo size="lg" badgeSubtitle="Estúdio de Criação & Engenharia Web" variant="color" />

            <p className="text-sm sm:text-base text-[#68515e] dark:text-[#b89aa8] leading-relaxed max-w-md">
              Criamos experiências digitais sofisticadas e sistemas web de alto desempenho com foco em design, usabilidade e excelência técnica.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/cardosokks"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[#68515e] dark:text-[#b89aa8] hover:text-[#1c1418] dark:hover:text-white rounded-xl bg-white dark:bg-[#1a1318] border border-black/[0.06] dark:border-white/[0.06] hover:border-[#d4789a]/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-xs"
                title="GitHub"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/ricardo-cardoso-4509b5334"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[#68515e] dark:text-[#b89aa8] hover:text-[#ae8d3c] dark:hover:text-[#f0c870] rounded-xl bg-white dark:bg-[#1a1318] border border-black/[0.06] dark:border-white/[0.06] hover:border-[#c9a84c]/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-xs"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5561981916368"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[#68515e] dark:text-[#b89aa8] hover:text-[#be5980] dark:hover:text-[#e8b0c4] rounded-xl bg-white dark:bg-[#1a1318] border border-black/[0.06] dark:border-white/[0.06] hover:border-[#d4789a]/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-xs"
                title="WhatsApp Oficial"
                aria-label="WhatsApp Oficial"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3: Navegação Rápida */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#120c10] dark:text-white font-mono">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm text-[#68515e] dark:text-[#b89aa8]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('projetos')}
                  className="hover:text-[#be5980] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Início / Galeria de Projetos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('blog')}
                  className="hover:text-[#be5980] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Artigos & Notícias
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('equipe')}
                  className="hover:text-[#be5980] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Corpo Técnico & Equipe
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Serviços */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#120c10] dark:text-white font-mono">
              Especialidades
            </h4>
            <ul className="space-y-2.5 text-sm text-[#68515e] dark:text-[#b89aa8]">
              <li>Landing Pages de Alta Conversão</li>
              <li>Sites Institucionais Responsivos</li>
              <li>Automações n8n & Atendimento</li>
              <li>Aplicações SaaS & Dashboards</li>
            </ul>
          </div>

          {/* Column 5: Gestão & Acesso */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#120c10] dark:text-white font-mono">
              Administração
            </h4>
            <div className="space-y-3">
              {currentUser ? (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#be5980] dark:text-[#e8b0c4] bg-[#faebf2] dark:bg-[#241b20] border border-[#d4789a]/35 rounded-xl hover:bg-[#fcebf2] dark:hover:bg-[#32232a] transition-colors min-h-[44px] cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Painel CMS</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#68515e] dark:text-[#b89aa8] hover:text-[#1c1418] dark:hover:text-white bg-white dark:bg-[#1a1318] border border-black/[0.08] dark:border-white/[0.08] rounded-xl hover:bg-[#faf3f6] dark:hover:bg-[#241b20] transition-colors min-h-[44px] cursor-pointer shadow-xs"
                >
                  <Lock className="w-4 h-4" />
                  <span>Acesso Restrito</span>
                </button>
              )}
              <p className="text-xs text-[#8e7383] dark:text-[#7a6070]">
                Gestão de publicações, mídias e moderação em tempo real.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#8e7383] dark:text-[#7a6070]">
          <p>© {new Date().getFullYear()} REAL PREMISE. Todos os direitos reservados.</p>

          <div className="flex items-center gap-4">
            <span>Desenvolvido com padrão de alta fidelidade e acessibilidade.</span>

            {showScrollTop && (
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Voltar ao topo da página"
                className="p-2.5 rounded-xl bg-white dark:bg-[#1a1318] border border-black/[0.08] dark:border-white/[0.08] text-[#68515e] dark:text-[#b89aa8] hover:text-[#1c1418] dark:hover:text-white hover:border-[#d4789a]/40 transition-all shadow-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
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
