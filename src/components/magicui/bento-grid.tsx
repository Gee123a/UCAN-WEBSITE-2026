import { ReactNode } from "react";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

const BentoGrid = ({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[25rem] grid-cols-1 md:grid-cols-3 gap-8",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href: _href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <motion.div
    key={name}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02, rotate: 0.5 }}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden",
      "storybook-card",
      className,
    )}
  >
    <div className="absolute inset-0 z-0">{background}</div>
    
    <div className="relative z-10 flex flex-col gap-3 p-10 transition-all duration-500 group-hover:-translate-y-4">
      <div className="w-16 h-16 organic-blob flex items-center justify-center mb-6 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 bg-[#D96A1D]/10 border-2 border-dashed border-[#D96A1D]">
        <Icon className="h-8 w-8" style={{ color: '#D96A1D' }} />
      </div>
      
      <h3 className="font-cinzel text-3xl font-bold tracking-tight transition-colors" style={{ color: '#0B3A0A' }}>
        {name}
      </h3>
      <p className="font-montserrat text-base leading-relaxed max-w-sm group-hover:text-stone-900 transition-colors" style={{ color: '#4C7A1A' }}>
        {description}
      </p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-12 transform-gpu flex-row items-center p-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <button className="pointer-events-auto flex items-center gap-3 font-montserrat text-xs tracking-[0.3em] uppercase font-bold transition-all hover:gap-5" style={{ color: '#D96A1D' }}>
        {cta}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
    
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
      <Star className="w-8 h-8 text-amber-400" />
    </div>

    <div className="pointer-events-none absolute inset-0 z-0 transition-all duration-500 group-hover:bg-amber-600/[0.02]" />
  </motion.div>
);

export { BentoCard, BentoGrid };

