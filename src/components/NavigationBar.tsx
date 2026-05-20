import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Organization Logos
import UCANLogo from '../assets/ucanLogos/UCAN.webp';

const NavigationBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
  };

  return (
    <>
      {/* Desktop Nav - Hidden on Mobile */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 hidden md:block ${
          isScrolled ? 'nav-glass py-2 shadow-xl' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          <motion.a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-brand-orange blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
              <img src={UCANLogo} className="w-full h-full object-contain relative z-10" alt="UCAN 2026" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-[#0B3A0A] leading-none">UCAN 2026</span>
              <span className="font-script text-lg text-[#D96A1D] mt-0.5 leading-none">Awarding Night</span>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="flex items-center gap-12">
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
      </motion.nav>
    </>
  );
};

export default NavigationBar;
