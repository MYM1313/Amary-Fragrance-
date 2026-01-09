import React from 'react';
import { Instagram, Mail, ArrowRight, Sparkles } from 'lucide-react';

const Connect: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-white relative overflow-hidden flex items-center justify-center">
      {/* Cinematic Background elements for depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-brand-gold/5 blur-[120px] rounded-full animate-gentle-float" />
        <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-rose-200/10 blur-[120px] rounded-full animate-gentle-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 perspective-[2000px]">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          
          {/* 3D Floating Panel Container */}
          <div 
            className="w-full relative group transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform hover:scale-[1.02] hover:-translate-y-4 hover:[transform:rotateX(2deg)_rotateY(1deg)]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Ambient Glow Behind (Light Source) */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-brand-gold/20 via-rose-200/20 to-brand-gold/20 rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* The 3D Glass Prism Card */}
            <div className="relative rounded-[3.5rem] bg-white/60 backdrop-blur-3xl border border-white/80 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.6)] animate-fade-in-up overflow-hidden transition-all duration-1000 group-hover:shadow-[0_50px_100px_-20px_rgba(197,160,89,0.15),0_20px_40px_-10px_rgba(0,0,0,0.1)]">
              
              {/* Internal Depth Gradient (Top Highlight) */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/90 to-transparent opacity-80 pointer-events-none" />
              
              {/* Dynamic Sheen Effect */}
              <div className="absolute -inset-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2s] ease-in-out pointer-events-none" />

              <div className="relative p-10 md:p-16 flex flex-col items-center text-center z-10">
                
                <div className="mb-8 flex flex-col items-center gap-4">
                  <span 
                    className="text-[10px] font-bold tracking-[0.6em] text-brand-gold uppercase opacity-0 animate-fade-in-up" 
                    style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
                  >
                    The Archival Entry
                  </span>
                  
                  <h2 
                    className="font-serif text-4xl md:text-6xl text-brand-dark leading-tight tracking-tight mb-4 opacity-0 animate-fade-in-up drop-shadow-sm" 
                    style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
                  >
                    Connect with <br />
                    <span className="italic font-light">AMARY</span>
                  </h2>
                  
                  <p 
                    className="text-brand-dark/60 text-xs md:text-sm font-light leading-relaxed tracking-wide italic max-w-md opacity-0 animate-fade-in-up" 
                    style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
                  >
                    Step into our private world and experience the silence of true luxury. Our concierge is at your disposal.
                  </p>
                </div>

                <div 
                  className="flex flex-col gap-4 w-full max-w-sm mt-4 opacity-0 animate-fade-in-up" 
                  style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
                >
                  
                  {/* Instagram 3D Button */}
                  <a 
                    href="https://www.instagram.com/amary.aroma?igsh=N2tnMjdyZWJtd2N4&utm_source=qr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/btn relative overflow-hidden flex items-center justify-between px-10 py-5 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(220,39,67,0.25)] active:scale-95 shadow-md"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-center gap-4 relative z-10">
                      <Instagram size={18} className="group-hover/btn:rotate-12 transition-transform duration-500" />
                      <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Instagram DM</span>
                    </div>
                    <ArrowRight size={16} className="relative z-10 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-2 transition-all duration-500" />
                  </a>

                  {/* Email 3D Button */}
                  <a 
                    href="mailto:amaryaroma@gmail.com" 
                    className="group/btn relative overflow-hidden flex items-center justify-between px-10 py-5 rounded-2xl bg-brand-dark text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] active:scale-95 shadow-md"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-center gap-4 relative z-10">
                      <Mail size={18} className="text-brand-gold group-hover/btn:scale-110 transition-transform duration-500" />
                      <span className="text-[10px] font-bold tracking-[0.4em] uppercase">EMAIL</span>
                    </div>
                    <div className="relative z-10 w-6 h-[1px] bg-white/20 group-hover/btn:w-10 transition-all duration-500" />
                  </a>
                </div>

                <div 
                  className="mt-12 flex justify-center gap-8 opacity-0 animate-fade-in" 
                  style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}
                >
                  <Sparkles size={12} className="text-brand-gold animate-pulse" />
                  <Sparkles size={12} className="text-brand-gold animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <Sparkles size={12} className="text-brand-gold animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

              </div>
            </div>

            {/* Grounding Shadow for 3D effect */}
            <div className="absolute -bottom-12 left-[10%] w-[80%] h-8 bg-black/10 blur-[40px] rounded-[100%] opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100" />
          </div>
          
          <div 
            className="mt-16 text-center opacity-0 animate-fade-in" 
            style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
          >
            <span className="text-[8px] tracking-[0.8em] text-brand-muted uppercase font-bold">
              EST. MMXXVI • PARIS • JAIPUR
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;