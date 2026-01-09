import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from './SectionTitle.tsx';
import { Feature } from '../types.ts';
import { Sparkles, Flower, PenTool, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const corePoints: Feature[] = [
  {
    id: '1',
    title: 'Timeless Fragrance',
    description: 'A scent that lingers, making every moment unforgettable.',
    icon: <Sparkles size={16} />,
    image: 'https://ik.imagekit.io/jabzmiuta/Whisk_a42528fd61591eba5764e9a0f5fe32b6dr.jpeg'
  },
  {
    id: '2',
    title: 'Handcrafted Elegance',
    description: 'Meticulously created with rare ingredients for true luxury.',
    icon: <PenTool size={16} />,
    image: 'https://ik.imagekit.io/jabzmiuta/Whisk_ce23003844db9c4ba7846637e4cbebe9dr.jpeg'
  },
  {
    id: '3',
    title: 'Sensory Experience',
    description: 'Captures emotions, memories, and moods in every note.',
    icon: <Flower size={16} />,
    image: 'https://ik.imagekit.io/jabzmiuta/Whisk_9f38e062ce5363aae724913538680793dr.jpeg'
  },
  {
    id: '4',
    title: 'Exclusive Legacy',
    description: 'Curated for those who desire distinction and refinement.',
    icon: <ShieldCheck size={16} />,
    image: 'https://ik.imagekit.io/jabzmiuta/Whisk_2033cb3f85c3ab488a84b394a0286d53dr.jpeg'
  },
];

const WhyAmary: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);
  const isInternalScroll = useRef(false);

  // Scroll Entrance Trigger: swipe to next on view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % corePoints.length);
          }, 800);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-swipe logic every 3.5 seconds only when in view
  useEffect(() => {
    if (isPaused || !isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % corePoints.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex, isInView]);

  // Sync state with physical scroll position
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
        const gap = 24;
        const totalWidth = itemWidth + gap;
        
        const newIndex = Math.round(scrollLeft / totalWidth);
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < corePoints.length) {
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

  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setTimeout(() => setIsPaused(false), 4000);

  return (
    <section 
      id="why-amary" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-white overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="The Core Essence" title="Why AMARY" />

        <div className="relative group/main">
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth px-1 scroll-pl-1 md:scroll-pl-0 cursor-grab active:cursor-grabbing"
          >
            {corePoints.map((point) => (
              <div 
                key={point.id} 
                className="flex-shrink-0 w-[60vw] sm:w-[35vw] md:w-[22vw] lg:w-[16vw] snap-start relative aspect-[4/5] rounded-[2rem] overflow-hidden group/card shadow-sm transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              >
                <img 
                  src={point.image} 
                  alt={point.title}
                  className="w-full h-full object-cover brightness-[0.75] transition-transform duration-[4s] group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-90" />
                <div className="absolute inset-x-3 bottom-3 p-5 rounded-[1.5rem] bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl">
                  <div className="text-brand-gold mb-2 transition-transform duration-700 group-hover/card:-translate-y-1">
                    {point.icon}
                  </div>
                  <h3 className="font-serif text-sm text-white font-medium mb-1 tracking-tight">{point.title}</h3>
                  <p className="text-white/70 text-[9px] font-light leading-relaxed italic">{point.description}</p>
                </div>
              </div>
            ))}
            <div className="w-6 flex-shrink-0" />
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            {corePoints.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManualNav(i)}
                className="p-2 transition-all duration-300 group/dot"
                aria-label={`Go to feature ${i + 1}`}
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
            onClick={() => handleManualNav((activeIndex - 1 + corePoints.length) % corePoints.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/main:opacity-100 transition-all duration-500 bg-white/95 backdrop-blur-xl w-10 h-10 rounded-full flex items-center justify-center shadow-xl border border-black/5 text-brand-dark hover:text-brand-gold z-20 hidden md:flex transform hover:scale-110"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => handleManualNav((activeIndex + 1) % corePoints.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/main:opacity-100 transition-all duration-500 bg-white/95 backdrop-blur-xl w-10 h-10 rounded-full flex items-center justify-center shadow-xl border border-black/5 text-brand-dark hover:text-brand-gold z-20 hidden md:flex transform hover:scale-110"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyAmary;