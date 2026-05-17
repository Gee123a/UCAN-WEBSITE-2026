import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Star, Sparkles, Trophy, User, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

// Assets
import WallTransp1 from '../assets/assets UCAN/Ballroom/wall /WallTransp1.png';
import WallTransp2 from '../assets/assets UCAN/Ballroom/wall /WallTransp2.png';
import Wall1 from '../assets/assets UCAN/Ballroom/wall /Wall1.png';
import Wall2 from '../assets/assets UCAN/Ballroom/wall /Wall2.png';
import Pillar1 from '../assets/assets UCAN/Ballroom/Pillar/Pillar.png';
import Pillar2 from '../assets/assets UCAN/Ballroom/Pillar/Pillar (1).png';
import MirrorFrame from '../assets/assets UCAN/Ballroom/Mirror/Mirror.png';
import MirrorGenerated from '../assets/assets UCAN/Ballroom/Mirror/Gemini_Generated_Image_zae898zae898zae8.png';
import DoorAsset from '../assets/assets UCAN/Ballroom/Mirror/Door.png';
import FiligreeBorder from '../assets/assets UCAN/invitation filigri/filigri_invitation card.png';
import ExcellenceHall from '../assets/ucan_excellence_hall_1778252558379.png';
import Ballroom1 from '../assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom1.png';
import Ballroom2 from '../assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom2.png';
import Ballroom3 from '../assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom3.png';

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
      },
      { 
        name: "Kevin Jonathan", 
        role: "Student Union President", 
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
        description: "A visionary leader who united student voices for structural campus improvements."
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

      // Far Wall Parallax
      gsap.to('.ballroom-wall-2', {
        x: () => -(totalWidth - windowWidth) * 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      // Pillar Parallax (Distant)
      gsap.to('.ballroom-pillar-distant', {
        x: () => -(totalWidth - windowWidth) * 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        }
      });

      // Pillar Parallax (Near)
      gsap.to('.ballroom-pillar-near', {
        x: () => -(totalWidth - windowWidth) * 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        }
      });

      // Category Room Background Cross-fades
      const rooms = [Ballroom1, Ballroom2, Ballroom3];
      nomineeCategories.forEach((category, i) => {
        gsap.to(`.ballroom-room-${i % rooms.length}`, {
          opacity: 0.3,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: `.category-section-${i}`,
            containerAnimation: mainTween,
            start: "left 60%",
            end: "left 20%",
            scrub: true,
          }
        });
      });
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        gsap.to(sectionRef.current, {
          '--light-x': `${x}%`,
          '--light-y': `${y}%`,
          duration: 0.5
        });
      });

      // Individual Card Animations (Flourish)
      const cards = gsap.utils.toArray<HTMLElement>('.nominee-card');
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            scale: 0.9,
            rotateY: 15,
            y: 30
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
              start: "left 95%",
              end: "left 70%",
              scrub: true,
            }
          }
        );

        // Hover tilt + Sheen effect
        const inner = card.querySelector('.storybook-card');
        const sheen = card.querySelector('.mirror-sheen');
        if (inner) {
          card.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            gsap.to(inner, {
              rotateX: rotateX,
              rotateY: rotateY,
              scale: 1.02,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true
            });

            if (sheen) {
              gsap.to(sheen, {
                x: (x / rect.width) * 100 - 50,
                y: (y / rect.height) * 100 - 50,
                duration: 0.5,
                ease: "power2.out"
              });
            }
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
            if (sheen) {
              gsap.to(sheen, { x: 0, y: 0, duration: 0.5 });
            }
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
    <section ref={sectionRef} className="relative overflow-hidden bg-parchment min-h-screen">
      {/* Ballroom Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Category-Specific Full Room Views */}
        <div className="absolute inset-0 z-0">
          {[Ballroom1, Ballroom2, Ballroom3].map((room, i) => (
            <div 
              key={i}
              className={`absolute inset-0 ballroom-wall ballroom-room-${i} opacity-0 transition-opacity duration-1000 scale-105`}
              style={{ 
                backgroundImage: `url(${room})`, 
                backgroundPosition: 'center',
                filter: 'brightness(0.6) sepia(0.2)'
              }}
            />
          ))}
        </div>
        
        {/* Layer 2: Fixed Base Wall */}
        <div 
          className="absolute inset-0 ballroom-wall opacity-10 scale-110"
          style={{ backgroundImage: `url(${Wall1})`, backgroundAttachment: 'fixed' }}
        />
        {/* Layer 2: Scrolling Wall Texture */}
        <div 
          className="absolute inset-y-0 ballroom-wall-2 w-[400vw] opacity-15"
          style={{ backgroundImage: `url(${Wall2})`, backgroundRepeat: 'repeat-x' }}
        />
        {/* Layer 3: Extra Texture Layer */}
        <div 
          className="absolute inset-y-0 ballroom-wall-2 w-[400vw] opacity-10 mix-blend-multiply"
          style={{ backgroundImage: `url(${WallTransp2})`, backgroundRepeat: 'repeat-x', transform: 'translateX(-20%)' }}
        />
        {/* Atmospheric Lighting */}
        <div className="absolute inset-0 z-10 ballroom-lighting" />
        <div 
          className="absolute inset-0 z-20 ballroom-overlay"
          style={{ backgroundImage: `url(${WallTransp1})` }}
        />
      </div>

      {/* Floating Parallax Elements (Pillars) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {/* Distant Pillars */}
        <motion.img 
          src={Pillar1} 
          className="absolute top-0 left-[40vw] h-[80%] object-contain opacity-20 blur-[4px] ballroom-pillar-distant"
        />
        <motion.img 
          src={Pillar2} 
          className="absolute top-0 left-[180vw] h-[80%] object-contain opacity-20 blur-[4px] ballroom-pillar-distant"
        />
        
        {/* Near Pillars (Fast Parallax) */}
        <motion.img 
          src={Pillar1} 
          className="absolute top-0 left-[10vw] h-full object-contain opacity-60 ballroom-pillar-near z-[40]"
        />
        <motion.img 
          src={Pillar2} 
          className="absolute top-0 left-[150vw] h-full object-contain opacity-60 ballroom-pillar-near z-[40]"
        />
        <motion.img 
          src={Pillar1} 
          className="absolute top-0 left-[300vw] h-full object-contain opacity-60 ballroom-pillar-near z-[40]"
        />
      </div>

      {/* Fixed Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-brand-orange/10">
        <div 
          ref={progressBarRef}
          className="h-full bg-brand-orange origin-left scale-x-0 shadow-[0_0_10px_rgba(217,106,29,0.5)]"
        />
      </div>

      <div ref={horizontalRef} className="relative z-30 flex h-screen w-max items-center px-[5vw] gap-[8vw]">
        {/* Compact Intro Slide */}
        <div className="flex-shrink-0 w-[80vw] sm:w-[50vw] flex flex-col justify-center relative items-center text-center">
          <div className="relative z-10 p-12 flex flex-col items-center">
            <div className="relative mb-12 group">
              <img 
                src={MirrorFrame} 
                className="w-48 h-48 sm:w-64 sm:h-64 object-contain animate-float-slow group-hover:scale-110 transition-transform duration-700" 
                alt="Magic Mirror"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-brand-orange animate-twinkle" />
              </div>
            </div>
            
            <span className="px-6 py-2 inline-block font-montserrat text-[10px] tracking-[0.6em] uppercase text-brand-orange bg-white/40 backdrop-blur-md border border-brand-orange/20 mb-8 rounded-full">
              The Gallery of Excellence
            </span>
            <h2 className="text-[12vw] sm:text-[8vw] leading-[0.8] text-brand-green font-black mb-8 font-cinzel tracking-tighter">
              THE <br/> <span className="text-brand-orange italic">LEGENDS</span>
            </h2>
            <p className="font-cormorant text-2xl sm:text-3xl italic text-brand-green-accent max-w-md leading-relaxed">
              "Walk through the royal halls to discover those who carved their names in the university's legacy."
            </p>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 text-brand-orange group cursor-pointer">
            <span className="font-montserrat text-[10px] tracking-[0.4em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">Scroll to Explore</span>
            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-4"
            >
              <div className="w-24 h-px bg-current" />
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </div>
        </div>

        {/* Category Sections */}
        {nomineeCategories.map((category, i) => (
          <div 
            key={category.id} 
            className={`category-section-${i} flex-shrink-0 flex items-center gap-[5vw] pr-[5vw] border-l border-dashed border-brand-orange/20 pl-[5vw]`}
          >
            {/* Category Header Slide */}
            <div className="category-header w-[80vw] sm:w-[35vw] flex flex-col justify-center items-center text-center relative group">
              <div className="relative w-full aspect-square max-w-[300px] mb-8 flex items-center justify-center">
                <img 
                  src={MirrorFrame} 
                  alt="Decorative Mirror" 
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                />
                <div className="relative z-10 p-8">
                  <div className="header-icon w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-white shadow-xl mb-4 sm:mb-6 text-brand-orange border border-brand-orange/10 mx-auto">
                    <category.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl text-brand-green font-bold mb-2 font-cinzel leading-tight">{category.title}</h3>
                  <p className="font-montserrat text-[10px] sm:text-xs tracking-widest uppercase text-brand-orange/80 mb-2">{category.subtitle}</p>
                </div>
              </div>
              <div className="w-16 h-1 bg-brand-green-accent rounded-full opacity-40" />
            </div>

            {/* Nominee Cards */}
            {category.nominees.map((nominee, idx) => (
              <div key={idx} className="nominee-card flex-shrink-0 w-[340px] sm:w-[450px] group relative" style={{ perspective: '2000px' }}>
                <div className="storybook-card p-0 overflow-hidden border-none shadow-2xl transition-all duration-1000 bg-transparent rounded-2xl golden-bloom">
                  <div className="aspect-[3/4.5] relative overflow-hidden bg-parchment-dark">
                    <ImageWithFallback src={nominee.image} alt={nominee.name} className="card-image w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    
                    {/* Mirror Sheen Overlay */}
                    <div className="mirror-sheen" />
                    
                    {/* Filigree Corners */}
                    <div className="filigree-corner filigree-top-left" style={{ backgroundImage: `url(${FiligreeBorder})` }} />
                    <div className="filigree-corner filigree-top-right" style={{ backgroundImage: `url(${FiligreeBorder})` }} />
                    <div className="filigree-corner filigree-bottom-left" style={{ backgroundImage: `url(${FiligreeBorder})` }} />
                    <div className="filigree-corner filigree-bottom-right" style={{ backgroundImage: `url(${FiligreeBorder})` }} />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/30 to-transparent opacity-80 z-10" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-10 text-white z-20">
                      <motion.div>
                        <p className="text-brand-orange font-montserrat text-[10px] tracking-[0.4em] uppercase mb-4 font-bold opacity-80">{nominee.role}</p>
                        <h4 className="text-3xl sm:text-4xl font-cinzel mb-4 leading-tight drop-shadow-xl">{nominee.name}</h4>
                        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-brand-orange via-gold to-transparent transition-all duration-1000 mb-6" />
                        <p className="text-sm text-parchment/80 leading-relaxed font-cormorant italic opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                          "{nominee.description}"
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Mirror Frame Effect */}
                <img 
                  src={MirrorFrame} 
                  className="absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)] object-fill z-30 pointer-events-none opacity-40 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-[1.02]" 
                  alt=""
                />
              </div>
            ))}
          </div>
        ))}

        {/* Final Slide */}
        <div className="flex-shrink-0 w-[100vw] sm:w-[60vw] flex flex-col justify-center items-center text-center px-10 relative">
          <div className="relative mb-12 group">
            <img 
              src={MirrorGenerated} 
              className="absolute -inset-20 w-[calc(100%+160px)] h-[calc(100%+160px)] object-contain opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-1000"
              alt=""
            />
            <img 
              src={DoorAsset} 
              className="w-48 h-48 sm:w-80 sm:h-80 object-contain animate-float group-hover:scale-110 transition-transform duration-700" 
              alt="Grand Door"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Trophy className="w-16 h-16 sm:w-24 sm:h-24 text-brand-orange drop-shadow-[0_0_15px_rgba(217,106,29,0.5)]" />
            </div>
            <div className="absolute -inset-10 bg-brand-orange/20 blur-[80px] rounded-full -z-10 animate-pulse" />
          </div>
          
          <h3 className="text-4xl sm:text-7xl text-brand-green font-cinzel mb-6 tracking-tight">The Journey <br/><span className="text-brand-orange italic">Continues</span></h3>
          <p className="font-cormorant text-2xl sm:text-3xl italic text-brand-green-accent max-w-lg mb-12 leading-relaxed">
            "Your presence is the final brushstroke in this masterpiece of achievement."
          </p>
          
          <button 
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="vintage-button scale-125 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-10 transition-opacity" />
            <span className="relative z-10 font-bold">RESERVE YOUR SEAT</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-3 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
}
