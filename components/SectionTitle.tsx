import React from 'react';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  center?: boolean;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ subtitle, title, center = true, light = false }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
      {subtitle && (
        <span className={`block uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 ${light ? 'text-gray-400' : 'text-brand-gold'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`font-serif text-4xl md:text-6xl font-bold tracking-tight ${light ? 'text-white' : 'text-brand-dark'}`}>
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;