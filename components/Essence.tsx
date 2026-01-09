import React from 'react';

const Essence: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center py-16 md:py-24 overflow-hidden bg-brand-dark">
      {/* Full-width Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=2400&auto=format&fit=crop" 
          alt="Essence philosophy background" 
          className="w-full h-full object-cover brightness-[0.4] contrast-[1.1]"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl space-y-12 md:space-y-16 animate-fade-in-up">
          
          {/* Section Header */}
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-1 h-14 bg-brand-gold shadow-[0_0_15px_rgba(197,160,89,0.5)]" />
              <span className="text-[11px] font-bold tracking-[0.6em] text-white/50 uppercase">
                Our Philosophy
              </span>
            </div>

            <h2 className="font-serif text-6xl md:text-9xl text-white leading-[0.85] tracking-tight drop-shadow-2xl">
              Essence over <br />
              <span className="italic text-brand-gold/90 block mt-4 ml-6 md:ml-12">Excess.</span>
            </h2>
          </div>

          {/* Descriptive Content with Glassmorphic Enhancement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-10">
              <p className="text-white/90 text-xl md:text-3xl font-light leading-relaxed max-w-xl drop-shadow-lg">
                In a world of noise, we choose silence. We believe true luxury lies not in what you add, but in what you take away.
              </p>
              
              <div className="flex items-center gap-6 pt-4">
                 <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-brand-gold backdrop-blur-md bg-white/5 shadow-2xl">
                   <span className="text-xl font-serif font-bold">AA</span>
                 </div>
                 <div className="h-px w-12 bg-white/20" />
                 <span className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase">Mastery through balance</span>
              </div>
            </div>

            <div className="lg:mt-12">
              <div className="relative p-10 md:p-14 rounded-[3rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.3)] transform hover:scale-[1.02] transition-transform duration-1000">
                <p className="text-sm md:text-xl italic text-white/80 leading-relaxed font-serif relative z-10">
                  "Every bottle is a study in restraint—a quiet conversation between the wearer and the world, composed of only the most essential notes."
                </p>
                {/* Decorative background accent */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-gold">
                      <path d="M20 20H40V40H20V20Z" fill="currentColor" />
                   </svg>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Subtle Scroll Hint or Decoration */}
      <div className="absolute bottom-12 right-12 opacity-20 hidden md:block">
        <div className="flex items-center gap-4 text-white">
          <span className="text-[9px] tracking-[0.4em] uppercase font-bold">Vol. 01 Archive</span>
          <div className="w-16 h-px bg-current" />
        </div>
      </div>
    </section>
  );
};

export default Essence;