import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  badgeSubtitle?: string;
  variant?: 'color' | 'monochrome' | 'white';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  badgeSubtitle,
  variant = 'white'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-10 h-10 sm:w-12 sm:h-12',
    xl: 'w-14 h-14 sm:w-16 sm:h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-xl',
    xl: 'text-lg sm:text-2xl'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* 
        Container com formato circular (rounded-full)
        Versão 'white': fundo branco puro com anel de contraste e alta visibilidade
      */}
      {variant === 'white' ? (
        <div
          className={`relative ${sizeClasses[size]} rounded-full p-[1.5px] bg-white dark:bg-white shadow-sm ring-1 ring-slate-200/90 dark:ring-white/40 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 overflow-hidden`}
        >
          <img
            src="/images/real_premise_minimal_logo_1790719519164.jpg"
            alt="REALPREMISE Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      ) : variant === 'monochrome' ? (
        <div
          className={`relative ${sizeClasses[size]} rounded-full p-[2px] bg-gradient-to-tr from-black via-zinc-800 to-zinc-600 dark:from-zinc-950 dark:via-zinc-800 dark:to-zinc-700 shadow-md shadow-black/10 ring-1 ring-zinc-300 dark:ring-zinc-700 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 overflow-hidden`}
          style={{
            background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)'
          }}
        >
          <img
            src="/images/real_premise_minimal_logo_1790719519164.jpg"
            alt="REALPREMISE Logo"
            className="w-full h-full object-cover rounded-full grayscale contrast-125 brightness-100 dark:brightness-105"
          />
        </div>
      ) : (
        <div
          className={`relative ${sizeClasses[size]} rounded-full p-[2px] bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 dark:from-indigo-500 dark:via-sky-500 dark:to-violet-600 shadow-md shadow-indigo-500/20 ring-1 ring-slate-200 dark:ring-slate-800 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 overflow-hidden`}
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%)'
          }}
        >
          <img
            src="/images/real_premise_minimal_logo_1790719519164.jpg"
            alt="REALPREMISE Logo"
            className="w-full h-full object-cover rounded-full mix-blend-normal"
          />
        </div>
      )}

      {/* Brand Text Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-black font-display tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${textSizes[size]}`}
          >
            REALPREMISE
          </span>
          {badgeSubtitle && (
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 leading-none mt-0.5">
              {badgeSubtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
