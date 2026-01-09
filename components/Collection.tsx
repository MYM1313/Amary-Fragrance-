import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from './SectionTitle.tsx';
import { Product } from '../types.ts';
import { Instagram, ArrowRight, ArrowUpRight, Sparkle } from 'lucide-react';

export const products: Product[] = [
  {
    id: '1',
    name: "IGNITE QUEST",
    tagline: 'Oud & Moonflower',
    image: 'https://ik.imagekit.io/jabzmiuta/Gemini_Generated_Image_s7nc4as7nc4as7nc.png',
    description: "An enigmatic blend of oud and moonflower, designed for the quiet observers of the night.",
    story: "Midnight Silk was conceived in the twilight hours of an Udaipur monsoon, where the earth meets the deep, resinous air.",
    highlights: ["Sandalwood Base", "Hand-harvested Saffron", "Molecular Oud"],
    details: ["Extrait de Parfum", "High Longevity", "Unisex", "Italian Glass"],
    usage: "Apply to pulse points. Allow to settle.",
    gallery: ['https://ik.imagekit.io/jabzmiuta/Gemini_Generated_Image_s7nc4as7nc4as7nc.png']
  },
  {
    id: '2',
    name: "DARCY DARK",
    tagline: 'Evening Bloom',
    image: 'https://ik.imagekit.io/jabzmiuta/Gemini_Generated_Image_3wd4ul3wd4ul3wd4.png',
    description: "A sensual tribute to the evening bloom, capturing the essence of night jasmine.",
    story: "Eve Intense is our most personal creation, a fragrance that evolves with the wearer through the evening.",
    highlights: ["Indian Jasmine", "Smoky Vanilla", "Bergamot"],
    details: ["Oil base", "High projection", "Velvet pack", "Artisanal"],
    usage: "Spray onto pulse points or hair brush.",
    gallery: ['https://ik.imagekit.io/jabzmiuta/Gemini_Generated_Image_3wd4ul3wd4ul3wd4.png']
  },
  {
    id: '3',
    name: 'RADIANT AURA',
    tagline: 'Captured Light',
    image: 'https://ik.imagekit.io/jabzmiuta/Gemini_Generated_Image_8bnshw8bnshw8bns.png',
    description: "Light captured in liquid form, celebrating clarity and the freshness of a new dawn.",
    story: "Radiant Aura is a celebration of clarity, inspired by the sparkling reflections of sunlight on the Ganges.",
    highlights: ["Sea Salt", "Neroli", "White Amber"],
    details: ["Daytime", "Sparkling sillage", "Artisanal", "Pure Extract"],
    usage: "Layer for brightness.",
    gallery: ['https://ik.imagekit.io/jabzmiuta/Gemini_Generated_Image_8bnshw8bnshw8bns.png']
  },
  {
    id: '4',
    name: "EVE INTENSE",
    tagline: 'Rare Resin & Spice',
    image: 'https://ik.imagekit.io/jabzmiuta/Gemini_Generated_Image_fs97trfs97trfs97.png',
    description: "The fire of discovery, a robust scent for those who walk the untraveled path.",
    story: "Amber Soul is for the pathfinders, blending raw leather with the warmth of ancient spice.",
    highlights: ["Vetiver", "Cardamom", "Leather"],
    details: ["Robust", "Unisex", "Hand-stamped", "Sustainable"],
    usage: "Apply to neck and chest.",
    gallery: ['https://ik.imagekit.io/jabzmiuta/Gemini_Generated_Image_fs97trfs97trfs97.png']
  },
];

interface CollectionProps {
  onSelectProduct?: (product: Product) => void;
}

const Collection: React.FC<CollectionProps> = ({ onSelectProduct }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleItems(prev => new Set(prev).add(entry.target.getAttribute('data-id') || ''));
        }
      });
    }, { threshold: 0.15 });

    const items = sectionRef.current?.querySelectorAll('.product-card');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="collections" 
      ref={sectionRef}
      className="py-12 md:py-20 bg-white relative overflow-hidden"
    >
      {/* Background Decorative Bloom */}
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-brand-gold/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto mb-12">
          <SectionTitle subtitle="Exclusives" title="The Collection" />
        </div>

        {/* ULTRA COMPACT GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-x-10 md:gap-y-10 max-w-2xl mx-auto">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              data-id={product.id}
              className={`product-card relative group cursor-pointer transition-all duration-[1.2s] cubic-bezier(0.23,1,0.32,1) ${
                visibleItems.has(product.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => onSelectProduct?.(product)}
            >
              {/* Refined Miniature Card Container */}
              <div className="relative animate-gentle-float" style={{ animationDelay: `${index * 0.4}s` }}>
                <div className="relative aspect-[1/1.2] rounded-[1.8rem] overflow-hidden bg-brand-light shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-black/[0.01] transition-all duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_40px_80px_rgba(197,160,89,0.15)] group-hover:scale-[1.08] group-hover:-translate-y-2">
                  
                  {/* REDUCED IMAGE SCALE */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover brightness-[0.98] transition-transform duration-[8s] ease-out scale-[1.0] group-hover:scale-[1.15]"
                  />

                  {/* CONTINUOUS LUXURY EFFECTS */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent w-[200%] h-full animate-light-sweep" style={{ animationDelay: `${index * 1.2}s`, animationDuration: '5s' }} />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-15">
                      <div className="w-full h-full animate-sparkle-slide flex flex-wrap gap-8 p-8" style={{ animationDelay: `${index * 0.8}s` }}>
                         <Sparkle size={6} className="text-white/40" />
                         <Sparkle size={4} className="text-white/20 translate-y-8" />
                         <Sparkle size={5} className="text-white/30 translate-x-8" />
                      </div>
                    </div>

                    <div className="absolute inset-0 gloss-overlay" />
                  </div>

                  {/* Minimal Discover Tag */}
                  <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[75%] flex items-center justify-between py-2 px-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-1000 transform group-hover:bg-brand-gold group-hover:border-brand-gold ${visibleItems.has(product.id) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${index * 150 + 400}ms` }}>
                    <span className="text-[7px] font-bold tracking-[0.3em] text-white uppercase">Open</span>
                    <ArrowRight size={10} className="text-white group-hover:translate-x-1.5 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                  </div>
                </div>
              </div>

              {/* Miniature Typography */}
              <div className="mt-6 flex flex-col items-center text-center">
                <h3 className="font-serif text-base md:text-lg text-brand-dark tracking-tight mb-1 transition-all duration-700 group-hover:text-brand-gold">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 transition-all duration-1000 group-hover:gap-4">
                  <div className="w-3 h-px bg-brand-gold/20 group-hover:bg-brand-gold/40 transition-all duration-1000" />
                  <span className="text-[7px] font-bold tracking-[0.3em] text-brand-muted uppercase transition-colors duration-700 group-hover:text-brand-dark">
                    {product.tagline}
                  </span>
                  <div className="w-3 h-px bg-brand-gold/20 group-hover:bg-brand-gold/40 transition-all duration-1000" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Boutique Footer - SOFT CTA */}
        <div className="mt-6 flex flex-col items-center">
          <div className="inline-block p-1 rounded-full bg-white/40 border border-black/[0.02] backdrop-blur-md shadow-md transition-all duration-1000 hover:scale-105">
            <a 
              href="https://www.instagram.com/amary.aroma?igsh=N2tnMjdyZWJtd2N4&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center gap-5 px-10 py-4 rounded-full bg-gradient-to-tr from-orange-400/80 via-rose-500/80 to-purple-600/80 text-white shadow-xl transform active:scale-95 transition-all duration-[900ms] overflow-hidden border border-white/20"
            >
              {/* Refined Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s]" />
              
              <Instagram size={18} className="group-hover:rotate-[15deg] text-white/90 group-hover:text-white transition-all duration-700" />
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase z-10">Discover on Instagram</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-700 z-10" />
            </a>
          </div>
          
          <div className="flex items-center gap-6 mt-6 opacity-20 grayscale transition-all duration-1000 hover:opacity-40 hover:grayscale-0">
             <div className="flex flex-col items-center gap-1">
                <span className="text-[6px] font-bold tracking-[0.3em] uppercase">Paris</span>
                <div className="w-4 h-px bg-brand-gold" />
             </div>
             <div className="flex flex-col items-center gap-1">
                <span className="text-[6px] font-bold tracking-[0.3em] uppercase">Jaipur</span>
                <div className="w-4 h-px bg-brand-gold" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;