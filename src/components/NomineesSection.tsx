import React from 'react';
import { BentoCard, BentoGrid } from './magicui/bento-grid';
import { Award, Star, Users, Lightbulb, Heart } from 'lucide-react';

const nominees = [
  {
    name: "Best Organization",
    className: "md:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 opacity-20" />
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
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-300 opacity-20" />
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
      <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-400 opacity-20" />
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
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-500 opacity-20" />
    ),
    Icon: Heart,
    description: "For those who have gone above and beyond to serve the community.",
    href: "#",
    cta: "View Nominees",
  },
];

export function NomineesSection() {
  return (
    <section id="nominees" className="py-24 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4">
            <Award className="w-4 h-4 text-amber-700" />
            <span className="text-amber-900 text-sm">Recognizing Talent</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-amber-900 font-serif mb-6">2026 Nominees</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover the exceptional individuals and organizations nominated for this year's prestigious awards.
          </p>
        </div>

        <BentoGrid>
          {nominees.map((nominee, idx) => (
            <BentoCard key={idx} {...nominee} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
