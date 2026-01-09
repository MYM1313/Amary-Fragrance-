import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const socialLinks = (
  <div className="flex justify-center gap-8 mb-16">
    <a 
      href="https://www.instagram.com/amary.aroma?igsh=N2tnMjdyZWJtd2N4&utm_source=qr" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full border border-black/[0.03] bg-white/50 backdrop-blur-sm flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-700 shadow-sm hover:shadow-xl transform hover:-translate-y-1.5 group"
    >
      <Instagram size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
    </a>
    <a 
      href="mailto:amaryaroma@gmail.com" 
      className="w-12 h-12 rounded-full border border-black/[0.03] bg-white/50 backdrop-blur-sm flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-700 shadow-sm hover:shadow-xl transform hover:-translate-y-1.5 group"
    >
      <Mail size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
    </a>
  </div>
);

const FooterEnd = () => (
  <div className="space-y-6 pt-12 border-t border-black/[0.03]">
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-[8px] tracking-[0.45em] text-brand-muted uppercase font-bold opacity-50">
      <span>QUIET LUXURY</span>
      <div className="w-[3px] h-[3px] rounded-full bg-brand-gold/40" />
      <span>ESSENTIAL FORM</span>
      <div className="w-[3px] h-[3px] rounded-full bg-brand-gold/40" />
      <span>MODERN HERITAGE</span>
    </div>
    <div className="flex flex-col items-center gap-4">
      <p className="text-[9px] tracking-[0.55em] text-brand-muted uppercase opacity-30 font-medium">
        © 2026 AMARY AMORA • THE ART OF RESTRAINT
      </p>
      <p className="text-[7px] tracking-[0.3em] text-brand-muted uppercase opacity-40 hover:opacity-80 transition-opacity duration-700 font-sans cursor-default">
        CRAFTED BY RAIMAL SANDHU
      </p>
    </div>
  </div>
);

const FullFooter: React.FC = () => {
  const footerLinks = [
    { name: 'Home', href: '#' },
    { name: 'The Archive', href: '#fragments' },
    { name: 'Collections', href: '#collections' },
    { name: 'Philosophy', href: '#why-amary' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#FAF9F6] pt-12 pb-12 border-t border-black/[0.02] relative overflow-hidden">
      {/* Subtle depth gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/[0.01]" />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Brand Section - Compact */}
        <div className="mb-10 flex flex-col items-center group cursor-default">
          <div className="w-14 h-14 mb-4 transform transition-transform duration-1000 group-hover:scale-105 relative rounded-full bg-white border border-black/[0.03] flex items-center justify-center shadow-sm overflow-hidden">
             <img 
               src="https://ik.imagekit.io/jabzmiuta/ChatGPT%20Image%20Jan%209,%202026,%2001_31_03%20PM.png" 
               alt="Amary Aroma Logo" 
               className="w-full h-full object-cover"
             />
          </div>
          <h2 className="font-serif text-2xl md:text-4xl tracking-[0.55em] text-brand-dark font-medium uppercase leading-none transition-all duration-700 group-hover:tracking-[0.6em]">
            AMARY AMORA
          </h2>
        </div>

        {/* Compact Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 max-w-3xl mx-auto">
          {footerLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-[9px] font-bold tracking-[0.35em] text-brand-muted uppercase hover:text-brand-dark transition-all duration-500 relative group py-1"
            >
              {item.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-brand-gold transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full opacity-60" />
            </a>
          ))}
        </nav>

        {socialLinks}
        <FooterEnd />
      </div>
    </footer>
  );
};

export default FullFooter;