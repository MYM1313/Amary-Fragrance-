import React from 'react';

const Heritage: React.FC = () => {
  return (
    <section id="heritage" className="relative h-[40vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-brand-light">
      {/* Refined Background Image with High-End Treatment */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury heritage visual" 
          className="w-full h-full object-cover grayscale-[0.2] brightness-[0.95] contrast-[1.05] scale-105"
        />
        {/* Soft light veil for consistent brand feel */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px]" />
      </div>

      {/* Decorative Minimal Element to anchor the space */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="w-[1px] h-32 bg-gradient-to-b from-brand-gold/0 via-brand-gold/40 to-brand-gold/0 animate-fade-in" />
        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/30 animate-pulse" />
      </div>
    </section>
  );
};

export default Heritage;