import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavigationBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'nominees', 'gallery', 'rsvp'];
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero', id: 'hero' },
    { name: 'NOMINEES', href: '#nominees', id: 'nominees' },
    { name: 'RSVP', href: '#rsvp', id: 'rsvp' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        isScrolled ? 'nav-glass py-4 shadow-xl' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        <motion.a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-12 h-12 border-2 border-[#D96A1D] rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform bg-white/40 backdrop-blur-sm">
            <span className="font-cinzel text-2xl font-bold text-[#D96A1D]">U</span>
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-[#0B3A0A] leading-none">UCAN 2026</span>
            <span className="font-montserrat text-[10px] tracking-[0.4em] text-[#D96A1D] mt-1 uppercase font-semibold">Awarding Night</span>
          </div>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`nav-link font-bold text-[11px] tracking-[0.3em] ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#rsvp"
            onClick={(e) => scrollToSection(e, '#rsvp')}
            className="vintage-button !px-8 !py-3 !text-[11px] !bg-[#0B3A0A] !text-white hover:!bg-[#D96A1D] transition-colors shadow-lg border-2 border-white/20"
          >
            JOIN THE ROYALTY
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#0B3A0A] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Ornamental Bottom Border */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden opacity-30">
          <div className="w-[200%] h-full flex">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex-1 border-b-[3px] border-dashed border-[#D96A1D] mx-1" />
            ))}
          </div>
        </div>
      )}


      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden nav-glass border-t border-[#D96A1D]/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`nav-link text-base ${activeSection === link.id ? 'active font-bold' : ''}`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#rsvp"
                onClick={(e) => scrollToSection(e, '#rsvp')}
                className="vintage-button-primary w-full justify-center"
              >
                JOIN THE ROYALTY
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavigationBar;
