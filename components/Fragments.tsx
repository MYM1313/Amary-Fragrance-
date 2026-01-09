import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from './SectionTitle.tsx';
import { Fragment } from '../types.ts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const fragments: Fragment[] = [
  {
    id: '1',
    volume: '',
    title: 'Umberwoods',
    subtitle: 'Deep woods, warm resin, quiet depth',
    category: '',
    image: 'https://ik.imagekit.io/jabzmiuta/Whisk_b73d334af45d4abb6e642f6990847ca5dr.jpeg',
  },
  {
    id: '2',
    volume: '',
    title: 'Desert Sand',
    subtitle: 'Sun-warmed minerals and dry air',
    category: '',
    image: 'https://ik.imagekit.io/jabzmiuta/Whisk_ed08ba2c496f212b43c4c180125164dedr.jpeg',
  },
  {
    id: '3',
    volume: '',
    title: 'Vanilla Drift',
    subtitle: 'Soft sweetness carried on air',
    category: '',
    image: 'https://ik.imagekit.io/jabzmiuta/Whisk_626f487ac2979c990bd4d5ba4c76701adr.jpeg',
  },
  {
    id: '4',
    volume: '',
    title: 'Saffron Mist',
    subtitle: 'Spiced warmth in a gentle haze',
    category: '',
    image: 'https://ik.imagekit.io/jabzmiuta/Whisk_abc86ecd06687cda4874764be9a3edfadr.jpeg',
  },
];

const Fragments: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);
  const isInternalScroll = useRef(false);

  // Auto-swipe logic with timer reset on index change
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % fragments.length);
    }, 3500); // Slightly slower for more relaxed pace
    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  // Scroll Trigger: engaging user with a smooth swipe when section is first viewed
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          // Gentle nudge to show interactivity
          setTimeout(() => {
            if (containerRef.current) {
               containerRef.current.scrollBy({ left: 40, behavior: 'smooth' });
               setTimeout(() => containerRef.current?.scrollBy({ left: -40, behavior: 'smooth' }), 600);
            }
          }, 700);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Sync state with physical scroll position (Programmatic Scroll)
  useEffect(() => {
    if (containerRef.current && !isPaused) { // Only auto-scroll if not paused by user interaction
      isInternalScroll.current = true;
      const targetElement = containerRef.current.children[activeIndex] as HTMLElement;
      if (targetElement) {
        // Calculate offset to center or align start properly with padding
        const scrollTarget = targetElement.offsetLeft - 24; // 24 is the padding left
        containerRef.current.scrollTo({
          left: scrollTarget,
          behavior: 'smooth'
        });
      }
      // Reset internal scroll flag after animation completes
      setTimeout(() => { isInternalScroll.current = false; }, 800);
    }
  }, [activeIndex]); // Remove isPaused from dependency to avoid jump on pause

  const handleScroll = () => {
    if (containerRef.current) {
      // If user is manually scrolling, we update the active index to match their position
      if (!isInternalScroll.current) {
        const scrollLeft = containerRef.current.scrollLeft;
        const firstChild = containerRef.current.children[0] as HTMLElement;
        if (!firstChild) return;
        
        const itemWidth = firstChild.clientWidth;
        const gap = 24; // gap-6 is 24px
        const totalWidth = itemWidth + gap;
        
        const newIndex = Math.round(scrollLeft / totalWidth);
        
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < fragments.length) {
          setActiveIndex(newIndex);
        }
      }
    }
  };

  const handleManualNav = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    // Longer pause after manual navigation button click
    setTimeout(() => setIsPaused(false), 8000);
  };

  // Touch Handlers for Mobile Inertia
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => {
    // Resume auto-swipe after a delay to let momentum settle
    setTimeout(() => setIsPaused(false), 4000);
  };

  return (
    <section 
      id="fragments" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-white overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="The Archive" title="Scent Fragments" />

        <div className="relative group/main">
          {/* 
             Enhanced Scroll Container:
             - scroll-pl-6: Ensures the first item snaps 24px from the left, respecting padding.
             - snap-x snap-mandatory: Enforces clean stops.
             - cursor-grab: Indicates dragging capability.
          */}
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth px-1 scroll-pl-1 md:scroll-pl-0 cursor-grab active:cursor-grabbing"
          >
            {fragments.map((fragment) => (
              <div 
                key={fragment.id} 
                className="flex-shrink-0 w-[55vw] sm:w-[30vw] md:w-[22vw] lg:w-[16vw] snap-start group/card"
              >
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-brand-dark shadow-sm transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:shadow-xl group-hover/card:-translate-y-2">
                  <img 
                    src={fragment.image} 
                    alt={fragment.title}
                    className="w-full h-full object-cover transition-transform duration-[4s] group-hover/card:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover/card:opacity-85" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="font-serif text-lg text-white mb-1 transform transition-transform duration-700 group-hover/card:-translate-y-1">
                      {fragment.title}
                    </h3>
                    <p className="text-white/60 text-[9px] font-light leading-relaxed italic">
                      {fragment.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Spacer for right side scrolling feel */}
            <div className="w-6 flex-shrink-0" />
          </div>

          {/* Premium Dots Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {fragments.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManualNav(i)}
                className="p-2 group/dot"
                aria-label={`Show fragment ${i + 1}`}
              >
                <div className={`transition-all duration-700 rounded-full ${
                  activeIndex === i 
                    ? 'w-10 h-1.5 bg-brand-gold shadow-[0_0_12px_rgba(197,160,89,0.5)]' 
                    : 'w-1.5 h-1.5 bg-brand-gold/20 group-hover/dot:bg-brand-gold/50'
                }`} />
              </button>
            ))}
          </div>

          <button 
            onClick={() => handleManualNav((activeIndex - 1 + fragments.length) % fragments.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/main:opacity-100 transition-all duration-500 bg-white/95 backdrop-blur-xl w-10 h-10 rounded-full flex items-center justify-center shadow-xl border border-black/5 text-brand-dark hover:text-brand-gold z-20 hidden md:flex transform hover:scale-110"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => handleManualNav((activeIndex + 1) % fragments.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/main:opacity-100 transition-all duration-500 bg-white/95 backdrop-blur-xl w-10 h-10 rounded-full flex items-center justify-center shadow-xl border border-black/5 text-brand-dark hover:text-brand-gold z-20 hidden md:flex transform hover:scale-110"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Fragments;