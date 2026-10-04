import React, { useState } from 'react';
import { Partner } from '../types';

interface PartnersTickerProps {
  partners: Partner[];
  className?: string;
}

const PartnerLogoItem: React.FC<{ partner: Partner }> = ({ partner }) => {
  const [hasError, setHasError] = useState(false);

  const content = (
    <div
      className="h-7 sm:h-8 lg:h-9 max-w-[130px] flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer"
      title={partner.name}
    >
      {!hasError && partner.logoUrl ? (
        <img
          src={partner.logoUrl}
          alt={`${partner.name} logo`}
          className="h-full w-auto max-h-7 sm:max-h-8 lg:max-h-9 object-contain filter drop-shadow-xs dark:brightness-110 opacity-80 hover:opacity-100 transition-all duration-300"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      ) : (
        <span className="text-xs sm:text-sm font-bold font-display text-slate-600 dark:text-slate-300 tracking-wider shrink-0 uppercase whitespace-nowrap">
          {partner.name}
        </span>
      )}
    </div>
  );

  if (partner.websiteUrl) {
    return (
      <a
        href={partner.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg shrink-0"
        aria-label={`Visitar site de ${partner.name}`}
      >
        {content}
      </a>
    );
  }

  return <div className="shrink-0">{content}</div>;
};

export const PartnersTicker: React.FC<PartnersTickerProps> = ({ partners, className = '' }) => {
  // Filter active partners
  const activePartners = partners.filter(p => p.active !== false);

  if (activePartners.length === 0) return null;

  // Duplicate items for a continuous, seamless infinite loop
  const marqueeItems = [...activePartners, ...activePartners, ...activePartners, ...activePartners];

  return (
    <div
      aria-label="Logos de Empresas e Parceiros"
      className={`relative w-full overflow-hidden flex items-center py-2.5 sm:py-3.5 ${className}`}
    >
      {/* Vignette Gradient Masks (Left & Right fade) */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#fcf9fa] dark:from-[#0f0d0e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#fcf9fa] dark:from-[#0f0d0e] to-transparent z-10 pointer-events-none" />

      {/* Infinite Left-Scrolling Marquee Track */}
      <div className="overflow-hidden w-full relative flex items-center">
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 lg:gap-16 py-1">
          {marqueeItems.map((partner, index) => (
            <PartnerLogoItem key={`${partner.id}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
};
