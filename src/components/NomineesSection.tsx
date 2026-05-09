import React from 'react';
import { BentoCard, BentoGrid } from './magicui/bento-grid';
import { Award, Star, Users, Lightbulb, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import vintageFloral from '/Users/mynamegee/.gemini/antigravity/brain/2e65533a-bc8e-45ad-aaff-b1c5c26d90e9/vintage_floral_white_bg_1778251860709.png';

const nominees = [
  {
    name: "Best Organization",
    className: "md:col-span-2",
    background: (
      <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle, #D96A1D, transparent)' }} />
    ),
    Icon: Users,
    description: "Honoring the organization that has shown exceptional teamwork and impact.",
    href: "#",
    cta: "View Nominees",
  },
  {
    name: "Outstanding Student",
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle, #4C7A1A, transparent)' }} />
    ),
    Icon: Star,
    description: "Recognizing individual excellence in academics and leadership.",
    href: "#",
    cta: "View Nominees",
  },
  {
    name: "Innovation Award",
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle, #F08A2B, transparent)' }} />
    ),
    Icon: Lightbulb,
    description: "Celebrating creative solutions and forward-thinking projects.",
    href: "#",
    cta: "View Nominees",
  },
  {
    name: "Community Service",
    className: "md:col-span-2",
    background: (
      <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle, #C93A1D, transparent)' }} />
    ),
    Icon: Heart,
    description: "For those who have gone above and beyond to serve the community.",
    href: "#",
    cta: "View Nominees",
  },
];

export function NomineesSection() {
  return (
    <section id="nominees" className="relative py-32 px-6 overflow-hidden">
      {/* Watercolor Blooms in corners */}
      <motion.img 
        src={vintageFloral} 
        className="absolute -top-12 -right-12 w-48 h-48 object-contain opacity-50 pointer-events-none mix-blend-multiply"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.img 
        src={vintageFloral} 
        className="absolute -bottom-12 -left-12 w-48 h-48 object-contain opacity-50 pointer-events-none rotate-180 mix-blend-multiply"
        animate={{ y: [0, 10, 0], rotate: [180, 185, 180] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />

      <div className="absolute top-0 right-0 w-64 h-64 organic-blob opacity-[0.03] bg-[#D96A1D]"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 organic-blob-2 opacity-[0.03] bg-[#4C7A1A]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="font-montserrat text-xs tracking-[0.4em] uppercase px-8 py-3 inline-block hand-drawn-border bg-white/90 text-[#D96A1D] -rotate-1">
              Recognizing Talent
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl mb-8 leading-tight text-[#0B3A0A]">
            2026 Nominees
          </h2>
          <div className="flex justify-center mb-8 gap-2">
            <div className="w-16 h-px bg-[#D96A1D] self-center opacity-40"></div>
            <Sparkles className="w-6 h-6 text-[#F08A2B] animate-sparkle" />
            <div className="w-16 h-px bg-[#D96A1D] self-center opacity-40"></div>
          </div>
          <p className="font-cormorant text-2xl md:text-3xl italic max-w-2xl mx-auto leading-relaxed" style={{ color: '#4C7A1A' }}>
            Discover the exceptional individuals and organizations nominated for this year's prestigious awards.
          </p>
        </motion.div>

        <div className="relative p-8 fairytale-frame bg-white/40 backdrop-blur-[2px] rounded-sm">
          <BentoGrid className="bg-transparent gap-10">
            {nominees.map((nominee, idx) => (
              <BentoCard 
                key={idx} 
                {...nominee} 
                className={`${nominee.className} bg-[#fffcf5]/80 hover:bg-white/95 transition-all duration-500`}
              />
            ))}
          </BentoGrid>
          
          {/* Decorative Corner Florals */}
          <motion.img
            src={vintageFloral}
            className="absolute -top-12 -right-12 w-56 h-56 object-contain opacity-60 floral-decoration-img pointer-events-none mix-blend-multiply"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={vintageFloral}
            className="absolute -bottom-12 -left-12 w-56 h-56 object-contain opacity-60 floral-decoration-img pointer-events-none mix-blend-multiply"
            style={{ rotate: 180 }}
            animate={{ rotate: [180, 188, 172, 180] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      
      {/* Floating Sparkles */}
      <Sparkles className="absolute top-24 left-12 w-8 h-8 opacity-40 text-[#F08A2B] animate-pulse" />
      <Sparkles className="absolute bottom-24 right-12 w-10 h-10 opacity-30 text-[#F08A2B] animate-pulse" />
    </section>
  );
}
