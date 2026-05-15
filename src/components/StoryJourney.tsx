import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Star, Sparkles, Trophy, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

const nomineeCategories = [
  {
    id: "orgs",
    title: "Outstanding Organization",
    subtitle: "The Pillars of Community",
    icon: Users,
    color: "#D96A1D",
    nominees: [
      { 
        name: "Student Council 2026", 
        role: "Excellence in Leadership", 
        image: "https://images.unsplash.com/photo-1523240715632-d984bb4b9749?auto=format&fit=crop&q=80&w=800",
        description: "Driving impactful initiatives and fostering student engagement across all departments."
      },
      { 
        name: "Entrepreneurship Club", 
        role: "Vibrant Ecosystem", 
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
        description: "Incubating the next generation of business leaders and startup pioneers."
      },
      { 
        name: "Social Impact Society", 
        role: "Community Catalyst", 
        image: "https://images.unsplash.com/photo-1517048676732-d676936d9b28?auto=format&fit=crop&q=80&w=800",
        description: "Making a tangible difference through dedicated social service and outreach programs."
      },
    ]
  },
  {
    id: "students",
    title: "Exceptional Student",
    subtitle: "Future Visionaries",
    icon: Star,
    color: "#4C7A1A",
    nominees: [
      { 
        name: "Aria Wijaya", 
        role: "Academic Excellence", 
        image: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=800",
        description: "Consistently achieving top honors in International Business and research."
      },
      { 
        name: "Budi Santoso", 
        role: "Innovation Leader", 
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
        description: "Winner of multiple national tech competitions and developer of community tools."
      },
      { 
        name: "Celine Tan", 
        role: "Creative Arts", 
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
        description: "Bringing stories to life through digital storytelling and mixed media art."
      },
    ]
  },
  {
    id: "leadership",
    title: "Leadership Award",
    subtitle: "Leading the Way",
    icon: Trophy,
    color: "#C93A1D",
    nominees: [
      { 
        name: "David Kurniawan", 
        role: "Campus Ambassador", 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
        description: "Representing UC's values with integrity and passion in global forums."
      },
      { 
        name: "Elsa Putri", 
        role: "Event Directress", 
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
        description: "Orchestrating the university's largest cultural festivals with flawless execution."
      }
    ]
  },
  {
    id: "innovation",
    title: "Innovation Award",
    subtitle: "Breaking Boundaries",
    icon: Lightbulb,
    color: "#F08A2B",
    nominees: [
      { 
        name: "Eco-Stream Project", 
        role: "Sustainability", 
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
        description: "A revolutionary way to manage waste in urban areas using AI sensors."
      },
      { 
        name: "AURA Health App", 
        role: "Med-Tech", 
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
        description: "Personalized wellness tracking designed specifically for the student lifestyle."
      },
      { 
        name: "VR Campus Tour", 
        role: "Digital Experience", 
        image: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?auto=format&fit=crop&q=80&w=800",
        description: "An immersive virtual reality journey through our university's legacy."
      }
    ]
  },
  {
    id: "impact",
    title: "Social Impact",
    subtitle: "Heart of the City",
    icon: Sparkles,
    color: "#6D8F2B",
    nominees: [
      { 
        name: "Village Bridge Proj.", 
        role: "Rural Empowerment", 
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "Empowering local artisans through digital marketplace integration."
      },
      { 
        name: "EduCare Initiative", 
        role: "Education for All", 
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
        description: "Providing free tutoring and mentorship to underprivileged youth in Surabaya."
      }
    ]
  }
];

export function StoryJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !horizontalRef.current) return;

    const ctx = gsap.context(() => {
      const horizontalContainer = horizontalRef.current!;
      const totalWidth = horizontalContainer.scrollWidth;
      const windowWidth = window.innerWidth;

      // Horizontal Scroll Animation
      const mainTween = gsap.to(horizontalContainer, {
        x: () => -(totalWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          end: () => `+=${totalWidth - windowWidth}`,
        }
      });

      // Progress Bar Animation
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth - windowWidth}`,
        }
      });

      // Individual Card Animations (Flourish)
      const cards = gsap.utils.toArray<HTMLElement>('.nominee-card');
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            scale: 0.8,
            rotateY: 25,
            y: 50
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainTween,
              start: "left 90%",
              end: "left 60%",
              scrub: true,
            }
          }
        );

        // Hover tilt effect
        const inner = card.querySelector('.storybook-card');
        if (inner) {
          card.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            gsap.to(inner, {
              rotateX: rotateX,
              rotateY: rotateY,
              scale: 1.05,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(inner, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true
            });
          });
        }
      });

      // Category Header Flourish
      const headers = gsap.utils.toArray<HTMLElement>('.category-header');
      headers.forEach((header) => {
        gsap.from(header.querySelectorAll('h3, p, .header-icon'), {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: header,
            containerAnimation: mainTween,
            start: "left 80%",
            end: "left 40%",
            scrub: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-parchment">
      {/* Fixed Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-brand-orange/10">
        <div 
          ref={progressBarRef}
          className="h-full bg-brand-orange origin-left scale-x-0"
        />
      </div>

      <div ref={horizontalRef} className="flex h-screen w-max items-center px-[5vw] gap-[8vw]">
        {/* Compact Intro Slide */}
        <div className="flex-shrink-0 w-[60vw] sm:w-[40vw] flex flex-col justify-center relative">
          <div className="absolute -top-12 -left-12 w-32 h-32 organic-blob bg-brand-orange opacity-20 animate-pulse" />
          <div className="relative z-10">
            <span className="hand-drawn-border-sm px-4 py-2 inline-block font-montserrat text-[10px] tracking-[0.4em] uppercase text-brand-orange bg-white/80 -rotate-1 mb-6">
              The Journey of Excellence
            </span>
            <h2 className="text-[10vw] sm:text-[6vw] leading-[0.9] text-brand-green font-extrabold mb-4 font-cinzel">
              THE <br/> <span className="text-brand-orange font-bold italic">NOMINEES</span>
            </h2>
            <p className="font-cormorant text-xl sm:text-2xl italic text-brand-green-accent max-w-sm leading-relaxed">
              Scroll through the scrolls to explore our university's most brilliant sparks.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4 text-brand-orange">
            <span className="font-montserrat text-[10px] tracking-[0.3em] uppercase">Scroll Right</span>
            <div className="w-16 h-px bg-current" />
            <ArrowRight className="w-4 h-4 animate-bounce-x" />
          </div>
        </div>

        {/* Category Sections */}
        {nomineeCategories.map((category) => (
          <div 
            key={category.id} 
            className="flex-shrink-0 flex items-center gap-[5vw] pr-[5vw] border-l border-dashed border-brand-orange/20 pl-[5vw]"
          >
            {/* Category Header Slide */}
            <div className="category-header w-[70vw] sm:w-[25vw] flex flex-col justify-center">
              <div className="header-icon w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-white shadow-xl mb-4 sm:mb-6 text-brand-orange border border-brand-orange/10">
                <category.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-3xl sm:text-4xl text-brand-green font-bold mb-2 font-cinzel leading-tight">{category.title}</h3>
              <p className="font-montserrat text-[10px] sm:text-xs tracking-widest uppercase text-brand-orange/80 mb-4 sm:mb-6">{category.subtitle}</p>
              <div className="w-10 h-1 bg-brand-green-accent rounded-full opacity-40" />
            </div>

            {/* Nominee Cards */}
            {category.nominees.map((nominee, idx) => (
              <div key={idx} className="nominee-card flex-shrink-0 w-[300px] sm:w-[380px] group relative" style={{ perspective: '1000px' }}>
                <div className="storybook-card p-0 overflow-hidden border-none shadow-2xl transition-all duration-700 hover:shadow-brand-green/10">
                  <div className="aspect-[3/4.2] relative overflow-hidden bg-parchment-dark">
                    <ImageWithFallback src={nominee.image} alt={nominee.name} className="card-image w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-green/95 via-brand-green/40 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white z-20">
                      <motion.div
                        initial={false}
                        animate={{ y: 0 }}
                        className="transform transition-transform duration-500"
                      >
                        <p className="text-brand-orange font-montserrat text-[10px] tracking-[0.3em] uppercase mb-2 font-bold">{nominee.role}</p>
                        <h4 className="text-2xl sm:text-3xl font-cinzel mb-4 leading-tight">{nominee.name}</h4>
                        <div className="h-px w-0 group-hover:w-full bg-brand-orange/30 transition-all duration-700 mb-4" />
                        <p className="text-xs sm:text-sm text-parchment/80 leading-relaxed font-montserrat opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          {nominee.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Card Flourish Corner */}
                    <div className="absolute top-4 right-4 w-12 h-12 organic-blob bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                      <Sparkles className="w-5 h-5 text-brand-orange animate-twinkle" />
                    </div>
                  </div>
                </div>
                
                {/* Background Shadow/Glow */}
                <div className="absolute -inset-2 bg-brand-green/5 blur-2xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        ))}

        {/* Final Slide */}
        <div className="flex-shrink-0 w-[85vw] sm:w-[50vw] flex flex-col justify-center items-center text-center px-10">
          <div className="relative mb-8 sm:mb-12">
            <Trophy className="w-16 h-16 sm:w-24 sm:h-24 text-brand-orange animate-float relative z-10" />
            <div className="absolute inset-0 bg-brand-orange/20 blur-3xl rounded-full scale-150 animate-pulse" />
          </div>
          <h3 className="text-4xl sm:text-6xl text-brand-green font-cinzel mb-4 sm:mb-6">And Many More...</h3>
          <p className="font-cormorant text-2xl sm:text-3xl italic text-brand-green-accent max-w-lg mb-10 leading-relaxed">
            Each nominee represents a chapter in our university's grand tale of achievement.
          </p>
          <button 
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="vintage-button scale-110 group"
          >
            <span className="relative z-10">RESERVE YOUR SEAT</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
