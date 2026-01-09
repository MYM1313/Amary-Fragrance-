import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types.ts';
import { Instagram, ArrowLeft, Menu, Sparkles, Leaf, Droplets, MapPin, Gem, Hammer, Wind } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Lock background scroll
    document.body.style.overflow = 'hidden';
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, root: scrollRef.current }
    );

    const observeIds = ['p-card', 'p-name', 'p-notes', 'p-phil', 'p-desc', 'p-meta', 'p-cta'];
    
    observeIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      document.body.style.overflow = '';
      observer.disconnect();
    };
  }, []);

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(onClose, 800);
  };

  const revealClass = (id: string) => 
    `transform transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
      visibleElements.has(id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`;

  return (
    <div 
      className={`fixed inset-0 z-[600] bg-[#F2F0EB] page-overlap-shadow overflow-hidden flex flex-col perspective-[2000px] ${
        isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'
      }`}
    >
      {/* Cinematic Background Depth */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-brand-gold/10 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-rose-200/20 blur-[120px] rounded-full mix-blend-multiply" />
      </div>

      {/* 1. FIXED GLASS NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-[610] h-16 px-6 md:px-8 flex items-center justify-between bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm transition-all duration-500">
        <button 
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/50 text-brand-dark/60 hover:text-brand-dark transition-all active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
        </button>

        <span className="font-serif text-[11px] font-bold tracking-[0.3em] text-brand-dark uppercase">AMARY AMORA</span>

        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/50 text-brand-dark/60 hover:text-brand-dark transition-all active:scale-95">
          <Menu size={18} strokeWidth={1.5} />
        </button>
      </nav>

      {/* MAIN SCROLL CONTENT */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar pt-24 pb-20 selection:bg-rose-100 selection:text-rose-900"
      >
        <div className="max-w-md mx-auto px-6 flex flex-col items-center gap-5">
          
          {/* 2. COMPACT 3D PRODUCT CARD */}
          <div 
            id="p-card"
            className={`relative w-full aspect-[4/5] max-w-[260px] md:max-w-[280px] rounded-[2rem] bg-white shadow-[0_30px_60px_-10px_rgba(0,0,0,0.08)] border border-white/80 z-10 overflow-hidden group mb-2 ${revealClass('p-card')}`}
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover scale-[1.3] transition-transform duration-[3s] ease-out group-hover:scale-[1.4]"
            />
            {/* Gloss & Light Effects */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(255,255,255,0.4)] pointer-events-none rounded-[2rem]" />
          </div>

          {/* 3. GLASSMORPHIC TEXT STACK (Tight Vertical Rhythm) */}
          
          {/* NAME PANEL */}
          <div 
            id="p-name"
            className={`w-full p-6 rounded-[1.5rem] bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm text-center delay-[100ms] ${revealClass('p-name')}`}
          >
            <h1 className="font-serif text-3xl md:text-4xl text-brand-dark tracking-tight leading-none mb-2">
              {product.name}
            </h1>
            <span className="text-[9px] font-bold tracking-[0.3em] text-brand-gold uppercase opacity-90">
              {product.tagline}
            </span>
          </div>

          {/* NOTES GRID PANELS */}
          <div 
            id="p-notes"
            className={`w-full grid grid-cols-2 gap-3 delay-[200ms] ${revealClass('p-notes')}`}
          >
            <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] flex flex-col items-center text-center gap-2 transition-transform hover:scale-[1.02]">
              <Leaf size={14} strokeWidth={1.5} className="text-brand-dark/40" />
              <span className="text-[8px] font-bold tracking-[0.15em] text-brand-dark/70 uppercase leading-tight">
                {product.highlights[0] || 'Sandalwood'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] flex flex-col items-center text-center gap-2 transition-transform hover:scale-[1.02]">
              <Droplets size={14} strokeWidth={1.5} className="text-brand-dark/40" />
              <span className="text-[8px] font-bold tracking-[0.15em] text-brand-dark/70 uppercase leading-tight">
                {product.highlights[1] || 'Essence'}
              </span>
            </div>
          </div>

          {/* PHILOSOPHY STRIP */}
          <div 
            id="p-phil"
            className={`w-full py-4 px-6 rounded-2xl bg-white/30 backdrop-blur-md border border-white/30 text-center shadow-sm delay-[300ms] ${revealClass('p-phil')}`}
          >
            <span className="font-serif italic text-brand-dark/60 text-xs tracking-wider">
              "Modern restraint of heritage"
            </span>
          </div>

          {/* DESCRIPTION BLOCK */}
          <div 
            id="p-desc"
            className={`w-full p-6 md:p-8 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm relative overflow-hidden group delay-[400ms] ${revealClass('p-desc')}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-50 pointer-events-none" />
            <p className="relative font-serif text-brand-dark/70 text-sm md:text-base leading-relaxed text-justify hyphens-auto">
              {product.description} A composition that respects silence as much as sound, lingering with a deliberate, quiet intensity.
            </p>
          </div>

          {/* METADATA ROW */}
          <div 
            id="p-meta"
            className={`w-full grid grid-cols-3 gap-3 delay-[500ms] ${revealClass('p-meta')}`}
          >
            <div className="py-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/30 flex flex-col items-center gap-1">
              <MapPin size={10} className="text-brand-gold" />
              <span className="text-[7px] font-bold tracking-[0.2em] text-brand-dark/50 uppercase">Origin</span>
            </div>
            <div className="py-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/30 flex flex-col items-center gap-1">
              <Hammer size={10} className="text-brand-gold" />
              <span className="text-[7px] font-bold tracking-[0.2em] text-brand-dark/50 uppercase">Craft</span>
            </div>
            <div className="py-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/30 flex flex-col items-center gap-1">
              <Gem size={10} className="text-brand-gold" />
              <span className="text-[7px] font-bold tracking-[0.2em] text-brand-dark/50 uppercase">Edition</span>
            </div>
          </div>

          {/* CTA - ROSE GLASS */}
          <div 
            id="p-cta"
            className={`w-full mt-2 delay-[600ms] ${revealClass('p-cta')}`}
          >
            <a 
              href="https://www.instagram.com/amary.aroma?igsh=N2tnMjdyZWJtd2N4&utm_source=qr" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 backdrop-blur-xl border border-rose-200 shadow-[0_15px_30px_-8px_rgba(244,63,94,0.15)] transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_20px_40px_-8px_rgba(244,63,94,0.25)] active:scale-98 overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
              
              <Instagram size={16} className="text-rose-900/70" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-rose-950 uppercase">
                Order via Instagram
              </span>
              <div className="w-px h-3 bg-rose-900/10" />
              <Wind size={12} className="text-rose-900/40" />
            </a>
          </div>

          <div className="h-4" /> {/* Bottom spacer */}

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;