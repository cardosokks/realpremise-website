import React from 'react';
import { Layout, Globe, Cpu, Server, Database, Bot, ArrowRight, MessageSquare } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    { title: 'Landing Pages', icon: Layout, description: 'Design moderno focado em conversão e performance.' },
    { title: 'Sites Institucionais', icon: Globe, description: 'Identidade digital profissional e robusta.' },
    { title: 'Sistemas IoT', icon: Cpu, description: 'Conectividade inteligente e controle em tempo real.' },
    { title: 'SaaS', icon: Server, description: 'Sistemas escaláveis com arquitetura limpa.' },
    { title: 'Crawlers', icon: Database, description: 'Extração e análise inteligente de dados.' },
    { title: 'Automações', icon: Bot, description: 'Processos otimizados para eficiência total.' },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-[1600px] mx-auto px-8 sm:px-10 md:px-16 lg:px-20 2xl:px-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight mb-6">
            Soluções Especializadas
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Engenharia de ponta para transformar desafios complexos em produtos digitais de alto impacto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center mb-8 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-24 bg-indigo-600 rounded-3xl p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-8">Pronto para transformar sua ideia em realidade?</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => {
                  const chatWidget = document.querySelector('[aria-label="Atendimento Online e Suporte"] button');
                  if (chatWidget instanceof HTMLElement) chatWidget.click();
                }}
                className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-lg flex items-center gap-3 text-lg cursor-pointer"
              >
                <MessageSquare className="w-6 h-6" />
                Falar no Chat
              </button>
              <button
                onClick={() => {
                  const whatsappLink = 'https://wa.me/556192035053';
                  window.open(whatsappLink, '_blank');
                }}
                className="px-10 py-5 bg-indigo-700 text-white rounded-2xl font-bold hover:bg-indigo-800 transition-all flex items-center gap-3 border border-indigo-500 text-lg cursor-pointer"
              >
                Falar no WhatsApp
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
