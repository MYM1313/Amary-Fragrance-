import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, X, ArrowRight, Mail, Menu, ShoppingBag, User, LayoutDashboard } from 'lucide-react';
import { useGlobalStore } from '../StoreContext';

const LogoAA: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`relative ${className} flex items-center justify-center rounded-full bg-white border border-brand-gold/20 overflow-hidden shadow-sm`}>
    <img 
      src="https://ik.imagekit.io/jabzmiuta/ChatGPT%20Image%20Jan%209,%202026,%2001_31_03%20PM.png" 
      alt="Amary Aroma Logo" 
      className="w-full h-full object-cover"
    />
  </div>
);

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const prevScrollPosRef = useRef(0);
  const { cart } = useGlobalStore();
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollPos = window.pageYOffset;
          const prevScrollPos = prevScrollPosRef.current;
          const isScrollingUp = prevScrollPos > currentScrollPos;
          
          if (currentScrollPos < 50 || isSidebarOpen) {
            setVisible(true);
          } else {
            setVisible(isScrollingUp);
          }
          
          prevScrollPosRef.current = currentScrollPos;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSidebarOpen]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'unset';
  }, [isSidebarOpen]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { name: 'Home', href: '/', id: '01' },
    { name: 'Shop Collection', href: '/shop', id: '02' },
    { name: 'My Orders', href: '/orders', id: '03' },
  ];

  return (
    <>
      {/* Refined Navigation Bar */}
      <header className={`fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] px-6 md:px-12 py-3 border-b border-black/[0.04] shadow-sm ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          <Link to="/" className="cursor-pointer transition-transform hover:scale-105 active:scale-95">
            <LogoAA className="w-12 h-12 md:w-14 md:h-14" />
          </Link>

          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <span className="font-serif text-xl md:text-2xl font-bold text-brand-dark tracking-normal uppercase transition-colors group-hover:text-brand-gold">
              AMARY AMORA
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative w-10 h-10 flex items-center justify-center rounded-full bg-brand-light hover:bg-white hover:shadow-lg transition-all duration-500 group">
              <ShoppingBag size={20} className="text-brand-dark group-hover:text-brand-gold transition-colors duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-light hover:bg-white hover:shadow-lg transition-all duration-500 group"
              aria-label="Open Menu"
            >
              <Menu size={20} className="text-brand-dark group-hover:text-brand-gold transition-colors duration-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Deep Background Blur Overlay */}
      <div 
        className={`fixed inset-0 z-[110] bg-black/20 backdrop-blur-xl transition-all duration-1000 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsSidebarOpen(false)} 
      />

      {/* Premium Plain White Sidebar (55% Width) */}
      <div 
        className={`fixed top-0 right-0 h-full w-[90%] md:w-[55%] z-[120] bg-white shadow-[-30px_0_100px_rgba(0,0,0,0.15)] transition-all duration-[1200ms] cubic-bezier(0.23,1,0.32,1) transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full flex flex-col relative z-10 p-10 md:p-20 overflow-y-auto no-scrollbar">
          
          {/* Enhanced Header Section */}
          <div className={`flex justify-between items-start mb-16 transition-all duration-1000 transform ${isSidebarOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-[0.3em] text-brand-dark uppercase leading-none">AMARY AMORA</h2>
                <div className="flex items-center gap-3 mt-3">
                   <div className="w-6 h-[1px] bg-brand-gold/40" />
                   <span className="text-[8px] font-bold tracking-[0.5em] text-brand-gold uppercase">Catalogue Selection</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center bg-brand-light hover:bg-white hover:border-brand-gold/20 hover:rotate-90 transition-all duration-700 shadow-sm"
            >
              <X size={18} strokeWidth={1} className="text-brand-dark" />
            </button>
          </div>

          {/* Staggered Compact Menu Cards */}
          <nav className="flex flex-col gap-4 flex-grow">
            {menuItems.map((item, index) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className={`group flex items-center justify-between px-8 py-5 rounded-[2rem] bg-brand-light/50 border border-black/[0.02] transition-all duration-[900ms] cubic-bezier(0.23,1,0.32,1) transform hover:bg-white hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-1 ${isSidebarOpen ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
                style={{ transitionDelay: `${index * 80 + 300}ms` }}
              >
                <div className="flex items-center gap-6">
                  <span className="font-serif text-[11px] italic text-brand-gold/40 group-hover:text-brand-gold transition-colors duration-500">{item.id}</span>
                  <span className="text-[10px] md:text-[11px] font-bold tracking-[0.45em] text-brand-dark/70 group-hover:text-brand-dark uppercase transition-all duration-500">
                    {item.name}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-brand-gold group-hover:shadow-brand-gold/30 transition-all duration-700">
                  <ArrowRight size={14} className="opacity-20 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-500 group-hover:text-white" />
                </div>
              </Link>
            ))}
          </nav>

          {/* Premium Refined Footer */}
          <div className={`mt-auto pt-14 border-t border-black/[0.04] transition-all duration-[1.2s] delay-700 transform ${isSidebarOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
              <a href="mailto:amaryaroma@gmail.com" className="flex items-center gap-4 py-4 px-10 rounded-full border border-black/[0.06] text-brand-dark hover:border-brand-gold/40 transition-all duration-700 shadow-sm group">
                <Mail size={14} className="text-brand-gold group-hover:scale-110 transition-transform duration-500" />
                <span className="text-[8px] font-bold tracking-[0.3em] uppercase">Concierge</span>
              </a>
            </div>

            <div className="flex justify-between items-center px-4 opacity-25">
              <span className="text-[7px] font-bold tracking-[0.5em] uppercase text-brand-muted">EST. MMXXVI</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                <span className="text-[7px] font-bold tracking-[0.5em] uppercase text-brand-muted">Private Selection Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
