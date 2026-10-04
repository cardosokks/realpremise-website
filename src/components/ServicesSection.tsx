import React from 'react';
import { Layout, Smartphone, Globe, Cpu, Database, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    { title: 'Landing Pages & Sites', icon: Layout, description: 'Design exclusivo de alta conversão, responsivo e ultra-rápido.' },
    { title: 'Soluções n8n & IA', icon: Sparkles, description: 'Fluxos automatizados que conectam WhatsApp, CRM e inteligência artificial.' },
    { title: 'Aplicações Web (SaaS)', icon: Globe, description: 'Sistemas escaláveis em React e TypeScript com banco de dados em tempo real.' },
    { title: 'Design System & UI/UX', icon: Smartphone, description: 'Identidade visual moderna com acessibilidade e fluidez para mobile e desktop.' },
    { title: 'Crawlers & Dados', icon: Database, description: 'Extração, saneamento e análise inteligente de dados web.' },
    { title: 'Sistemas Conectados', icon: Cpu, description: 'Conectividade ágil, integrações de APIs e controle em tempo real.' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#fcf9fa] dark:bg-[#0f0d0e] border-t border-black/[0.08] dark:border-white/[0.08] transition-colors">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-24">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faebf2] dark:bg-[#1a1318] border border-[#d4789a]/35 text-[#be5980] dark:text-[#e8b0c4] text-xs sm:text-sm font-semibold mb-4">
            <span>Soluções & Diferenciais REAL PREMISE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#120c10] dark:text-white tracking-tight mb-6">
            Soluções Especializadas
          </h2>
          <p className="text-lg sm:text-xl text-[#68515e] dark:text-[#b89aa8] max-w-3xl mx-auto">
            Do design refinado à automação inteligente, transformamos desafios complexos em produtos digitais de alto impacto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="group bg-white dark:bg-[#1a1318] p-8 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] shadow-xs hover:shadow-2xl hover:shadow-[#d4789a]/10 hover:border-[#d4789a]/40 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#faebf2] dark:bg-[#241b20] border border-[#d4789a]/30 flex items-center justify-center mb-8 text-[#be5980] dark:text-[#e8b0c4] group-hover:scale-110 group-hover:text-[#c9a84c] dark:group-hover:text-[#f0c870] transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#120c10] dark:text-white mb-4">{service.title}</h3>
                <p className="text-[#68515e] dark:text-[#b89aa8] leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-24 bg-gradient-to-r from-white via-[#faf3f6] to-white dark:from-[#1a1318] dark:via-[#241b20] dark:to-[#1a1318] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl p-10 sm:p-16 text-center text-[#120c10] dark:text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4789a]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-8">Pronto para transformar sua ideia em realidade?</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => {
                  const chatWidget = document.querySelector('[aria-label="Atendimento Online e Suporte"] button');
                  if (chatWidget instanceof HTMLElement) chatWidget.click();
                }}
                className="px-10 py-5 bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] text-[#0f0d0e] rounded-2xl font-bold hover:brightness-110 transition-all shadow-xl shadow-[#d4789a]/25 flex items-center gap-3 text-lg cursor-pointer"
              >
                <MessageSquare className="w-6 h-6 text-[#0f0d0e]" />
                <span>Falar no Chat</span>
              </button>
              <a
                href="https://wa.me/5561981916368"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-[#f4ecf0] dark:bg-[#241b20] text-[#1c1418] dark:text-[#f5eff2] rounded-2xl font-bold hover:bg-[#efe4ea] dark:hover:bg-[#32232a] transition-all flex items-center gap-3 border border-black/[0.08] dark:border-white/10 hover:border-[#d4789a]/40 text-lg cursor-pointer"
              >
                <span>Falar no WhatsApp</span>
                <ArrowRight className="w-6 h-6 text-[#ae8d3c] dark:text-[#f0c870]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
