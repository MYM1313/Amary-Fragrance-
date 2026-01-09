import React from 'react';

const Essence: React.FC = () => {
  return (
    <section className="relative min-h-[50vh] flex items-center py-12 md:py-16 overflow-hidden bg-[#FAF9F6]">
      {/* Light Theme Background - Perfume Aesthetic */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2000&auto=format&fit=crop" 
          alt="Perfume bottle reflection" 
          className="w-full h-full object-cover opacity-40 grayscale-[0.3]"
        />
        {/* Soft Light Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/95 via-[#FAF9F6]/80 to-transparent" />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full perspective-[2500px]">
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-10 animate-fade-in-up" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Section Header - Compact */}
          <div className="space-y-4 transform transition-transform duration-1000 hover:translate-z-4">
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-6 bg-brand-gold shadow-[0_4px_20px_rgba(197,160,89,0.4)]" />
              <span className="text-[7px] font-bold tracking-[0.4em] text-brand-dark/60 uppercase">
                Our Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl text-brand-dark leading-[0.9] tracking-tight drop-shadow-sm mix-blend-multiply">
              Essence over <br />
              <span className="italic text-brand-gold block mt-1 ml-6 md:ml-8 transform translate-z-10 transition-transform duration-700">Excess.</span>
            </h2>
          </div>

          {/* 3D Content Layout - Reduced Grid Gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
            
            {/* Left: Text Block (Base Layer) */}
            <div className="space-y-6 relative z-10">
              <p className="text-brand-dark/80 text-sm md:text-base font-light leading-relaxed max-w-xs drop-shadow-sm">
                In a world of noise, we choose silence. We believe true luxury lies not in what you add, but in what you take away.
              </p>
              
              <div className="flex items-center gap-4 pt-2">
                 <div className="group w-10 h-10 rounded-full border border-brand-dark/5 flex items-center justify-center text-brand-dark bg-white/60 backdrop-blur-md shadow-[0_5px_15px_-2px_rgba(0,0,0,0.05)] transition-all duration-500 hover:scale-105 hover:bg-white hover:shadow-lg">
                   <span className="text-xs font-serif font-bold group-hover:scale-110 transition-transform">AA</span>
                 </div>
                 <div className="h-px w-6 bg-brand-dark/20" />
                 <span className="text-[6px] font-bold tracking-[0.3em] text-brand-dark/50 uppercase">Mastery</span>
              </div>
            </div>

            {/* Right: Floating 3D Card (Elevated Layer) - Smaller Card */}
            <div className="md:-mt-4 md:ml-auto w-full max-w-xs transform rotate-y-[-6deg] rotate-x-[4deg] hover:rotate-y-0 hover:rotate-x-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] cursor-default" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* Card Container */}
              <div className="relative p-6 rounded-[1.5rem] bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[10px_20px_40px_-10px_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(255,255,255,0.7)] group overflow-hidden">
                
                {/* Dynamic Light Sheen */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-[2s] pointer-events-none" />
                
                <p className="text-sm italic text-brand-dark/90 leading-relaxed font-serif relative z-10 drop-shadow-sm transform translate-z-8 transition-transform duration-700">
                  "Every bottle is a study in restraint—a quiet conversation between the wearer and the world."
                </p>
                
                {/* 3D Decorative Abstract Shape floating behind */}
                <div className="absolute -top-6 -right-6 text-brand-gold/10 transform translate-z-[-20px] scale-125 group-hover:rotate-[20deg] transition-transform duration-[2s]">
                   <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="50" cy="50" r="50" />
                   </svg>
                </div>

                <div className="absolute bottom-4 right-4 w-6 h-6 border border-brand-dark/10 rounded-full flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-0.5 h-0.5 bg-brand-gold rounded-full" />
                </div>
              </div>

              {/* Floor Shadow for Levitation Effect */}
              <div className="absolute -bottom-4 left-6 right-6 h-3 bg-black/5 blur-lg rounded-[50%] transform scale-x-90 group-hover:scale-x-100 transition-transform duration-1000" />
            </div>

          </div>
          
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-6 right-6 opacity-30 hidden md:block mix-blend-multiply pointer-events-none">
        <div className="flex items-center gap-2 text-brand-dark">
          <span className="text-[6px] tracking-[0.3em] uppercase font-bold">Vol. 01 Archive</span>
          <div className="w-8 h-px bg-current" />
        </div>
      </div>
    </section>
  );
};

export default Essence;