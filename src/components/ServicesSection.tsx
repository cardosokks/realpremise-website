import React from 'react';
import { Layout, Globe, Cpu, Server, Database, Bot, ArrowRight, MessageSquare } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    { title: 'Landing Pages', icon: Layout, description: 'Alta conversão e design moderno.' },
    { title: 'Sites Institucionais', icon: Globe, description: 'Presença digital profissional.' },
    { title: 'Sistemas IOT', icon: Cpu, description: 'Conectividade e controle inteligente.' },
    { title: 'SaaS', icon: Server, description: 'Software como serviço escalável.' },
    { title: 'Crawlers', icon: Database, description: 'Extração e análise de dados.' },
    { title: 'Automações', icon: Bot, description: 'Processos otimizados e eficientes.' },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight mb-4">
          Nossos Serviços Especializados
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
          Transformamos ideias complexas em soluções digitais robustas, escaláveis e de alto desempenho.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 bg-indigo-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">Pronto para transformar sua ideia em realidade?</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                const chatWidget = document.querySelector('[aria-label="Atendimento Online e Suporte"] button');
                if (chatWidget instanceof HTMLElement) chatWidget.click();
              }}
              className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Falar no Chat
            </button>
            <button
              onClick={() => {
                const whatsappLink = 'https://wa.me/556192035053';
                window.open(whatsappLink, '_blank');
              }}
              className="px-8 py-4 bg-indigo-700 text-white rounded-2xl font-bold hover:bg-indigo-800 transition-colors flex items-center gap-2 border border-indigo-500"
            >
              Falar no WhatsApp
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
