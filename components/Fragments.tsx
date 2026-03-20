import React, { useState, useEffect, useRef, useMemo } from 'react';
import SectionTitle from './SectionTitle.tsx';
import { useGlobalStore } from '../StoreContext.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Fragments: React.FC = () => {
  const { products } = useGlobalStore();
  
  // Map products to fragments for the home page display
  const fragments = useMemo(() => {
    if (products.length === 0) return [];
    return products.slice(0, 6).map(p => ({
      id: p.id,
      volume: '',
      title: p.name,
      subtitle: p.tagline,
      category: p.category,
      image: p.image
    }));
  }, [products]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);
  const isInternalScroll = useRef(false);

  // Scroll Trigger: triggers swipe to next card immediately when section is first viewed
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasTriggeredRef.current && fragments.length > 0) {
          hasTriggeredRef.current = true;
          // Trigger immediate swipe (400ms)
          setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % fragments.length);
          }, 400);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [fragments.length]);

  // Continuous auto-swipe logic every 3s when in view
  useEffect(() => {
    if (isPaused || !isInView || fragments.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % fragments.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex, isInView, fragments.length]);

  // Sync state with physical scroll position (Programmatic Scroll)
  useEffect(() => {
    if (containerRef.current && !isPaused) { 
      isInternalScroll.current = true;
      const targetElement = containerRef.current.children[activeIndex] as HTMLElement;
      if (targetElement) {
        const scrollTarget = targetElement.offsetLeft - 24; 
        containerRef.current.scrollTo({
          left: scrollTarget,
          behavior: 'smooth'
        });
      }
      setTimeout(() => { isInternalScroll.current = false; }, 600);
    }
  }, [activeIndex]);

  const handleScroll = () => {
    if (containerRef.current) {
      if (!isInternalScroll.current) {
        const scrollLeft = containerRef.current.scrollLeft;
        const firstChild = containerRef.current.children[0] as HTMLElement;
        if (!firstChild) return;
        
        const itemWidth = firstChild.clientWidth;
        const gap = 24;
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
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setTimeout(() => setIsPaused(false), 3000);

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
                    loading="eager"
                    className="w-full h-full object-cover transition-transform duration-[4s] group-hover/card:scale-110"
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
            
            <div className="w-6 flex-shrink-0" />
          </div>

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