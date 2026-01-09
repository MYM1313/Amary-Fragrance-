import React from 'react';
import { Instagram, Mail, ArrowRight, Globe, Shield, Sparkles } from 'lucide-react';

const Connect: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-brand-light relative overflow-hidden flex items-center justify-center">
      {/* Cinematic Background elements for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-2%] w-[35%] h-[35%] bg-brand-gold/5 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[-5%] right-[-2%] w-[35%] h-[35%] bg-brand-gold/5 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          
          <div className="w-full relative group transition-all duration-1000 hover:scale-[1.01] animate-fade-in-up">
            
            {/* The Reflective Glass Stack - Zoomed Out Elegant Panel */}
            <div className="relative rounded-[3.5rem] p-[1.5px] bg-gradient-to-br from-white/70 via-brand-gold/15 to-white/40 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.1)] transition-shadow duration-1000 group-hover:shadow-[0_80px_150px_-40px_rgba(0,0,0,0.15)]">
              
              {/* Glass Inner Surface */}
              <div className="relative bg-white/40 backdrop-blur-[32px] p-10 md:p-16 rounded-[3.5rem] overflow-hidden border border-white/40">
                
                {/* Reflective Light Streak */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[100%] transition-all duration-[2s] ease-in-out" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  
                  <div className="mb-6 flex flex-col items-center gap-4">
                    <span className="text-[10px] font-bold tracking-[0.6em] text-brand-gold uppercase opacity-60">The Archival Entry</span>
                    <h2 className="font-serif text-4xl md:text-6xl text-brand-dark leading-tight tracking-tight mb-4">
                      Connect with <br />
                      <span className="italic font-light">AMARY</span>
                    </h2>
                    <p className="text-brand-dark/50 text-xs md:text-sm font-light leading-relaxed tracking-wide italic max-w-md">
                      Step into our private world and experience the silence of true luxury. Our concierge is at your disposal.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 w-full max-w-sm mt-8">
                    
                    {/* Instagram Gradient Button */}
                    <a 
                      href="https://www.instagram.com/amary.aroma?igsh=N2tnMjdyZWJtd2N4&utm_source=qr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden flex items-center justify-between px-10 py-5 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white transition-all duration-700 hover:scale-105 hover:shadow-[0_20px_40px_rgba(220,39,67,0.3)] active:scale-95"
                    >
                      <div className="flex items-center gap-4">
                        <Instagram size={18} className="group-hover/btn:rotate-12 transition-transform duration-500" />
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Instagram DM</span>
                      </div>
                      <ArrowRight size={16} className="opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-x-2 transition-all duration-500" />
                    </a>

                    {/* Email Button */}
                    <a 
                      href="mailto:amaryaroma@gmail.com" 
                      className="group/btn relative overflow-hidden flex items-center justify-between px-10 py-5 rounded-2xl bg-brand-dark text-white transition-all duration-700 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-95"
                    >
                      <div className="flex items-center gap-4">
                        <Mail size={18} className="text-brand-gold group-hover/btn:scale-110 transition-transform duration-500" />
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase">EMAIL</span>
                      </div>
                      <div className="w-6 h-[1px] bg-white/20 group-hover/btn:w-10 transition-all duration-500" />
                    </a>
                  </div>

                  <div className="mt-12 flex justify-center gap-8 opacity-20">
                    <Sparkles size={12} className="text-brand-gold animate-pulse" />
                    <Sparkles size={12} className="text-brand-gold animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <Sparkles size={12} className="text-brand-gold animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>

                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center opacity-15">
            <span className="text-[8px] tracking-[0.8em] text-brand-muted uppercase font-bold">
              EST. MMXXVI • PARIS • JAIPUR
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
};

export default Connect;