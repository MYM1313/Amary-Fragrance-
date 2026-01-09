import React from 'react';

const Essence: React.FC = () => {
  return (
    <section className="relative min-h-[65vh] flex items-center py-16 md:py-24 overflow-hidden bg-[#FAF9F6]">
      {/* Light Theme Background - High Key Luxury Texture */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2000&auto=format&fit=crop" 
          alt="Essence philosophy background" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Soft Light Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/95 via-[#FAF9F6]/70 to-transparent" />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full perspective-[2500px]">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16 animate-fade-in-up" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Section Header - Floating Layer 1 */}
          <div className="space-y-6 transform transition-transform duration-1000 hover:translate-z-4">
            <div className="flex items-center gap-4">
              <div className="w-0.5 h-10 bg-brand-gold shadow-[0_4px_20px_rgba(197,160,89,0.4)]" />
              <span className="text-[9px] font-bold tracking-[0.5em] text-brand-dark/60 uppercase">
                Our Philosophy
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-7xl text-brand-dark leading-[0.85] tracking-tight drop-shadow-sm mix-blend-multiply">
              Essence over <br />
              <span className="italic text-brand-gold block mt-2 ml-6 md:ml-12 transform translate-z-10 transition-transform duration-700">Excess.</span>
            </h2>
          </div>

          {/* 3D Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative">
            
            {/* Left: Text Block (Base Layer) */}
            <div className="space-y-8 relative z-10">
              <p className="text-brand-dark/80 text-base md:text-xl font-light leading-relaxed max-w-sm drop-shadow-sm">
                In a world of noise, we choose silence. We believe true luxury lies not in what you add, but in what you take away.
              </p>
              
              <div className="flex items-center gap-6 pt-4">
                 <div className="group w-14 h-14 rounded-full border border-brand-dark/5 flex items-center justify-center text-brand-dark bg-white/60 backdrop-blur-md shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] transition-all duration-500 hover:scale-105 hover:bg-white hover:shadow-lg">
                   <span className="text-lg font-serif font-bold group-hover:scale-110 transition-transform">AA</span>
                 </div>
                 <div className="h-px w-10 bg-brand-dark/20" />
                 <span className="text-[8px] font-bold tracking-[0.4em] text-brand-dark/50 uppercase">Mastery through balance</span>
              </div>
            </div>

            {/* Right: Floating 3D Card (Elevated Layer) */}
            <div className="lg:-mt-6 lg:ml-auto w-full max-w-sm transform rotate-y-[-6deg] rotate-x-[4deg] hover:rotate-y-0 hover:rotate-x-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] cursor-default" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* Card Container */}
              <div className="relative p-8 md:p-10 rounded-[2rem] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[15px_30px_60px_-15px_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(255,255,255,0.8)] group overflow-hidden">
                
                {/* Dynamic Light Sheen */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-[2s] pointer-events-none" />
                
                <p className="text-base md:text-lg italic text-brand-dark/90 leading-relaxed font-serif relative z-10 drop-shadow-sm transform translate-z-8 transition-transform duration-700">
                  "Every bottle is a study in restraint—a quiet conversation between the wearer and the world, composed of only the most essential notes."
                </p>
                
                {/* 3D Decorative Abstract Shape floating behind */}
                <div className="absolute -top-8 -right-8 text-brand-gold/10 transform translate-z-[-20px] scale-125 group-hover:rotate-[20deg] transition-transform duration-[2s]">
                   <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="50" cy="50" r="50" />
                   </svg>
                </div>

                <div className="absolute bottom-6 right-6 w-8 h-8 border border-brand-dark/10 rounded-full flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-1 h-1 bg-brand-gold rounded-full" />
                </div>
              </div>

              {/* Floor Shadow for Levitation Effect */}
              <div className="absolute -bottom-6 left-8 right-8 h-4 bg-black/5 blur-xl rounded-[50%] transform scale-x-90 group-hover:scale-x-100 transition-transform duration-1000" />
            </div>

          </div>
          
        </div>
      </div>

      {/* Bottom Decoration - Integrated into light theme */}
      <div className="absolute bottom-8 right-8 opacity-30 hidden md:block mix-blend-multiply pointer-events-none">
        <div className="flex items-center gap-3 text-brand-dark">
          <span className="text-[7px] tracking-[0.3em] uppercase font-bold">Vol. 01 Archive</span>
          <div className="w-10 h-px bg-current" />
        </div>
      </div>
    </section>
  );
};

export default Essence;