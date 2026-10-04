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
  variant = 'color'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-11 h-11 sm:w-12 sm:h-12',
    xl: 'w-14 h-14 sm:w-16 sm:h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-xl',
    xl: 'text-lg sm:text-2xl'
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* 
        Container com formato circular e anel gradiente Rosa/Dourado oficial da REAL PREMISE
      */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full p-[2px] shadow-lg shadow-brand-500/20 ring-1 ring-brand-400/40 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 overflow-hidden bg-gradient-to-tr from-[#e8b0c4] via-[#d4789a] to-[#c9a84c]`}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#0f0d0e] p-[1px]">
          <img
            src="/logo.png"
            alt="REAL PREMISE Logo"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = '/img/logo.png';
            }}
          />
        </div>
      </div>

      {/* Brand Text Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-black font-display tracking-tight text-white leading-tight transition-colors ${textSizes[size]}`}
          >
            REAL <span className="bg-gradient-to-r from-[#e8b0c4] to-[#c9a84c] bg-clip-text text-transparent">PREMISE</span>
          </span>
          {badgeSubtitle && (
            <span className="text-[10px] sm:text-[11px] font-mono text-[#b89aa8] leading-none mt-0.5">
              {badgeSubtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
