import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const fadeDistance = window.innerHeight * 0.6;
          setScrollProgress(Math.min(1, scrollY / fadeDistance));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contentOpacity = 1 - (scrollProgress * 1.5);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-dark">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <img 
          src="https://ik.imagekit.io/jabzmiuta/Whisk_b2e27c3a800313cb7de4440f5c306ba0dr.jpeg" 
          alt="Luxury fragrance heritage" 
          className="w-full h-full object-cover brightness-[0.7] scale-105"
          style={{ 
            transform: `scale(${1.05 + scrollProgress * 0.05})`, 
            transition: 'transform 0.1s linear' 
          }}
          loading="eager"
        />
        {/* Soft Global Glassmorphic Layer */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-white/[0.02]" />
        {/* Shadow Depth Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-brand-dark/60" />
      </div>

      {/* Content Container */}
      <div 
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6" 
        style={{ opacity: Math.max(0, contentOpacity) }}
      >
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.6em] text-white/50 uppercase mb-10 block">
            Maison Amora • Paris & Jaipur
          </span>
        </div>

        {/* Focused Title Panel */}
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="inline-block py-8 md:py-12 px-12 md:px-20 rounded-[2.5rem] backdrop-blur-md bg-white/[0.04] border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brand-light leading-[1.1] tracking-tight">
              A Fragrance <br />
              <span className="italic font-light opacity-90">That Lingers</span>
            </h1>
          </div>
        </div>

        {/* Subtitle - Outside the Title Panel */}
        <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <p className="text-brand-light/70 font-light text-lg md:text-xl mb-12 leading-relaxed tracking-wide italic">
            Handcrafted notes of earth and air, <br className="hidden md:block" /> 
            captured in the Eternal Whispered City.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link 
              to="/shop"
              className="group inline-flex bg-brand-light text-brand-dark px-14 py-5 rounded-full items-center gap-4 hover:bg-brand-gold hover:text-white transition-all duration-700 shadow-2xl transform hover:scale-105 active:scale-95"
            >
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Explore</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="text-[9px] font-bold tracking-[0.4em] text-white/40 hover:text-white uppercase transition-colors py-4 px-6 border-b border-white/0 hover:border-white/20">
              The Ritual
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Bottom Elements */}
      <div 
        className="absolute bottom-12 left-12 hidden lg:block animate-fade-in" 
        style={{ animationDelay: '1200ms' }}
      >
        <div className="flex items-center gap-4 text-white/20">
          <div className="w-12 h-[1px] bg-current" />
          <span className="text-[9px] tracking-[0.4em] uppercase font-bold">Volume I: The Archive</span>
        </div>
      </div>

      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 text-[9px] tracking-[0.5em] uppercase animate-pulse" 
        style={{ opacity: 1 - scrollProgress * 2 }}
      >
        Scroll to Begin
      </div>
    </section>
  );
};

export default Hero;