import React from 'react';
import { Search } from 'lucide-react';

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = ['Todos', 'SaaS', 'E-Commerce', 'Portfólio', 'Web App', 'Landing Page'];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-5 pb-8">
      
      {/* Search Bar */}
      <div className="relative w-full md:w-96 lg:w-[420px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" aria-hidden="true" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar projetos por nome ou tecnologia..."
          aria-label="Buscar projetos por título ou tecnologia"
          className="w-full pl-12 pr-12 py-3 text-sm sm:text-base bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all text-slate-900 dark:text-white placeholder:text-slate-400 min-h-[48px]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Limpar filtro de busca"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Category Filter Pills (Horizontal Scrollable on Mobile) */}
      <div
        className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full -mx-4 px-4 sm:mx-0 sm:px-0"
        role="group"
        aria-label="Filtrar projetos por categoria"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              aria-pressed={isSelected}
              className={`px-4 sm:px-5 py-2.5 text-sm sm:text-base font-semibold rounded-2xl transition-all whitespace-nowrap shrink-0 min-h-[44px] flex items-center justify-center cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isSelected
                  ? 'bg-indigo-600 text-white dark:bg-indigo-500 shadow-md ring-1 ring-indigo-500'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

    </div>
  );
};
