import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from './SectionTitle.tsx';
import { Review } from '../types.ts';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews: Review[] = [
  {
    id: '1',
    name: 'Aarav Patel',
    location: 'MUMBAI',
    text: "IGNITE QUEST has a depth I haven't found in European niche houses. It feels ancient yet modern. Pure sandalwood mastery.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'NEW DELHI',
    text: "Captures the petrichor of Indian soil beautifully. Radiant Aura is my daily signature. Stunning packaging.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Ishaan Malhotra',
    location: 'BENGALURU',
    text: "Eve Intense settles into a warm, smoky vanilla that lasts 12+ hours. Feels personal and incredibly exclusive.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Diya Iyer',
    location: 'CHENNAI',
    text: "Ignite Quest is a masterpiece. The saffron note is divine. I received compliments all evening.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
];

const Reviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);
  const isInternalScroll = useRef(false);

  // Auto-swipe logic with reset on change
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  // Scroll Trigger: engagements on first sight
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setTimeout(() => setActiveIndex(1), 800);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Sync scroll
  useEffect(() => {
    if (containerRef.current && !isPaused) {
      isInternalScroll.current = true;
      const targetElement = containerRef.current.children[activeIndex] as HTMLElement;
      if (targetElement) {
        // Adjust scroll target to account for padding (24px for px-6)
        const scrollTarget = targetElement.offsetLeft - 24; 
        containerRef.current.scrollTo({
          left: scrollTarget,
          behavior: 'smooth'
        });
      }
      setTimeout(() => { isInternalScroll.current = false; }, 800);
    }
  }, [activeIndex]);

  const handleScroll = () => {
    if (containerRef.current) {
      if (!isInternalScroll.current) {
        const scrollLeft = containerRef.current.scrollLeft;
        const firstChild = containerRef.current.children[0] as HTMLElement;
        if (!firstChild) return;

        const itemWidth = firstChild.clientWidth;
        const gap = 16; // gap-4 is 16px
        const totalWidth = itemWidth + gap;
        
        const newIndex = Math.round(scrollLeft / totalWidth);
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < reviews.length) {
          setActiveIndex(newIndex);
        }
      }
    }
  };

  const handleManualNav = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  // Touch Handlers
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setTimeout(() => setIsPaused(false), 4000);

  return (
    <section 
      id="reviews" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Voices" title="Reviews" />

        <div className="relative group/main">
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth px-6 scroll-pl-6 cursor-grab active:cursor-grabbing"
          >
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="flex-shrink-0 w-[60vw] sm:w-[35vw] md:w-[260px] snap-start bg-brand-light p-6 md:p-6 rounded-[1.5rem] flex flex-col justify-between shadow-sm border border-black/[0.01] hover:bg-white transition-all duration-700 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-brand-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={8} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="text-brand-dark/80 italic text-[13px] md:text-[14px] leading-relaxed mb-6 font-serif">"{review.text}"</p>
                </div>
                <div className="flex items-center gap-3 border-t border-black/[0.02] pt-4">
                  <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700 border border-white shadow-sm" />
                  <div>
                    <h4 className="font-serif text-[11px] font-bold text-brand-dark leading-tight tracking-wide">{review.name}</h4>
                    <p className="text-[8px] tracking-[0.15em] text-brand-muted uppercase font-bold">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-4 flex-shrink-0" />
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-4">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => handleManualNav(i)} className="p-1.5 group/dot" aria-label={`Read review ${i + 1}`}>
                <div className={`transition-all duration-700 rounded-full ${
                  activeIndex === i 
                    ? 'w-8 h-1 bg-brand-gold shadow-[0_0_10px_rgba(197,160,89,0.4)]' 
                    : 'w-1.5 h-1.5 bg-brand-gold/10 group-hover/dot:bg-brand-gold/40'
                }`} />
              </button>
            ))}
          </div>

          <button onClick={() => handleManualNav((activeIndex - 1 + reviews.length) % reviews.length)} className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/main:opacity-100 transition-all duration-500 bg-white/95 backdrop-blur-xl w-9 h-9 rounded-full flex items-center justify-center shadow-lg border border-black/5 text-brand-dark hidden md:flex transform hover:scale-110"><ChevronLeft size={16} /></button>
          <button onClick={() => handleManualNav((activeIndex + 1) % reviews.length)} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/main:opacity-100 transition-all duration-500 bg-white/95 backdrop-blur-xl w-9 h-9 rounded-full flex items-center justify-center shadow-lg border border-black/5 text-brand-dark hidden md:flex transform hover:scale-110"><ChevronRight size={16} /></button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;