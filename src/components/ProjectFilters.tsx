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
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a6070] pointer-events-none" aria-hidden="true" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar projetos por nome ou tecnologia..."
          aria-label="Buscar projetos por título ou tecnologia"
          className="w-full pl-12 pr-12 py-3 text-sm sm:text-base bg-[#1a1318] border border-white/[0.08] rounded-2xl shadow-xs focus:ring-2 focus:ring-[#d4789a]/50 focus:border-[#d4789a] focus:outline-hidden transition-all text-[#f5eff2] placeholder:text-[#7a6070] min-h-[48px]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Limpar filtro de busca"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs text-[#b89aa8] hover:text-white font-bold cursor-pointer rounded-lg hover:bg-[#241b20] transition-colors"
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
              className={`px-4 sm:px-5 py-2.5 text-sm sm:text-base font-semibold rounded-2xl transition-all whitespace-nowrap shrink-0 min-h-[44px] flex items-center justify-center cursor-pointer focus:outline-hidden ${
                isSelected
                  ? 'bg-gradient-to-r from-[#e8b0c4] via-[#d4789a] to-[#c9a84c] text-[#0f0d0e] font-bold shadow-lg shadow-[#d4789a]/25'
                  : 'bg-[#1a1318] border border-white/[0.08] text-[#b89aa8] hover:border-[#d4789a]/40 hover:text-white'
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
