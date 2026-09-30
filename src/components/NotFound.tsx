import React from 'react';
import { SearchX, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (section: string) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-6">
      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
        <SearchX className="w-10 h-10 text-slate-400 dark:text-slate-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Página não encontrada</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
      </div>
      <button
        onClick={() => onNavigate('projetos')}
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Voltar para Projetos</span>
      </button>
    </div>
  );
};
