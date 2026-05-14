import { useState, useRef, useLayoutEffect } from 'react';
import {
  Calendar, MapPin, Clock, Users, Star,
  Sparkles, Gift, ArrowRight, Heart
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { NomineesSection } from './components/NomineesSection';
import { RSVPForm } from './components/RSVPForm';
import { ImageWithFallback } from './components/ImageWithFallback';



export default function UCANWebsite() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const heroRef = useRef(null);
  const rsvpSectionRef = useRef<HTMLElement>(null);
  const rsvpContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll();

  // Measure RSVP position relative to the document (only on resize, NOT on scroll)
  const [rsvpDocRect, setRsvpDocRect] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateRect = () => {
      if (rsvpContainerRef.current) {
        const rect = rsvpContainerRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        // Only update if dimensions are non-zero to avoid initial flash issues
        if (rect.width > 0 && rect.height > 0) {
          setRsvpDocRect({
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
            width: rect.width,
            height: rect.height
          });
        }
      }
    };

    const timeoutId = setTimeout(updateRect, 500); // Wait for fonts/layout
    window.addEventListener('resize', updateRect);
    // Also re-measure after images load etc.
    window.addEventListener('load', updateRect);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('load', updateRect);
    };
  }, []);

  // --- PHASE 1: Border Reveal (Reveal from top to bottom over 25% of scroll) ---
  // We want it to be invisible at exactly 0, but appear immediately upon scroll.
  const borderRevealValue = useTransform(scrollYProgress, [0, 0.02, 0.25], [0, 0.1, 1]);
  const borderReveal = useSpring(borderRevealValue, { stiffness: 80, damping: 25 });
  
  // Reveal from top to bottom using inset clip-path
  const borderClip = useTransform(borderReveal, [0, 0.1, 1], [
    "inset(0% 0% 99% 0%)",  // Show a tiny bit of the top edge even at 0
    "inset(0% 0% 95% 0%)",  // Reveal quickly at the start
    "inset(0% 0% 0% 0%)"    // Fully revealed
  ]);
  
  // Opacity: fade in quickly but start with some visibility
  const borderOpacityBase = useTransform(scrollYProgress, [0, 0.05], [0.4, 0.9]);
  const borderOpacity = useSpring(borderOpacityBase, { stiffness: 100, damping: 30 });

  // --- PHASE 2: Morph to RSVP box (At the final stretch of scroll) ---
  // Use a smaller window at the end to allow for "manual" feel
  const morphProgressValue = useTransform(scrollYProgress, [0.94, 0.995], [0, 1]);
  const smoothMorphProgress = useSpring(morphProgressValue, { stiffness: 60, damping: 25 });

  // Position: fixed element.
  const borderTop = useTransform([smoothMorphProgress, scrollY], ([p, sy]) => {
    const progress = p as number;
    const currentSY = sy as number;
    // targetTop is where the RSVP box is currently in the viewport
    const targetTop = rsvpDocRect.top - currentSY;
    return targetTop * progress;
  });

  const borderLeft = useTransform(smoothMorphProgress, (p) => {
    return rsvpDocRect.left * p;
  });

  // Size: interpolate between viewport and RSVP box size
  const borderWidth = useTransform(smoothMorphProgress, (p) => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const target = rsvpDocRect.width || vw;
    return `${vw + (target - vw) * p}px`;
  });

  const borderHeight = useTransform(smoothMorphProgress, (p) => {
    const vh = window.innerHeight;
    const target = rsvpDocRect.height || vh;
    return `${vh + (target - vh) * p}px`;
  });

  // Hero content fade
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative">
      {/* Global Fairytale Border Frame - Top-to-Bottom Reveal + End-of-Scroll Morph */}
      <motion.div
        className="fixed pointer-events-none z-[10000] p-4 md:p-8 transition-all"
        style={{
          top: borderTop,
          left: borderLeft,
          width: borderWidth,
          height: borderHeight,
          clipPath: borderClip,
          opacity: borderOpacity,
          filter: 'drop-shadow(0 0 20px rgba(217, 106, 29, 0.15))',
        }}
      >
        {/* Layer 1: Hand-drawn outer border with asymmetric scratchbook aesthetic */}
        <div 
          className="absolute inset-0 transition-all duration-300 pointer-events-none"
          style={{
            borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
            border: '3px solid #D96A1D',
            boxShadow: 'inset 0 0 30px rgba(217, 106, 29, 0.08)'
          }}
        />
        
        {/* Layer 2: Slightly inset inner dashed accent border */}
        <div 
          className="absolute inset-3 md:inset-5 transition-all duration-300 opacity-60 pointer-events-none"
          style={{
            borderRadius: '15px 255px 15px 225px/225px 15px 255px 15px',
            border: '2px dashed #0B3A0A',
          }}
        />

        {/* Layer 3: Elegant golden vintage corner stars */}
        <div className="absolute top-6 left-6 text-[#D96A1D] opacity-80 animate-twinkle">
          <Star className="w-5 h-5 fill-[#D96A1D]" />
        </div>
        <div className="absolute top-6 right-6 text-[#D96A1D] opacity-80 animate-twinkle" style={{ animationDelay: '1s' }}>
          <Star className="w-5 h-5 fill-[#D96A1D]" />
        </div>
        <div className="absolute bottom-6 left-6 text-[#D96A1D] opacity-80 animate-twinkle" style={{ animationDelay: '1.5s' }}>
          <Star className="w-5 h-5 fill-[#D96A1D]" />
        </div>
        <div className="absolute bottom-6 right-6 text-[#D96A1D] opacity-80 animate-twinkle" style={{ animationDelay: '0.5s' }}>
          <Star className="w-5 h-5 fill-[#D96A1D]" />
        </div>
      </motion.div>

      <div className="min-h-screen relative overflow-x-hidden selection:bg-[#D96A1D]/30" style={{ background: '#F4E7CB' }}>
        {/* Magical Fairy Dust particles */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `gentleFall ${15 + Math.random() * 20}s linear infinite`,
                animationDelay: `${Math.random() * 20}s`,
              }}
            >
              {i % 4 === 0 ? (
                <div
                  className="w-3 h-3 organic-blob"
                  style={{
                    background: i % 3 === 0 ? '#D96A1D' : '#F08A2B',
                    opacity: 0.5
                  }}
                />
              ) : i % 4 === 1 ? (
                <Heart
                  className="w-2.5 h-2.5"
                  style={{
                    color: '#C93A1D',
                    fill: 'none',
                    strokeWidth: 2,
                    filter: 'drop-shadow(0 0 2px currentColor)'
                  }}
                />
              ) : i % 4 === 2 ? (
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: '#6B0F2C',
                    boxShadow: '0 0 3px #6B0F2C',
                    opacity: 0.6
                  }}
                />
              ) : (
                <Star
                  className="w-2.5 h-2.5"
                  style={{
                    color: i % 2 === 0 ? '#4C7A1A' : '#6D8F2B',
                    fill: 'none',
                    strokeWidth: 2,
                    filter: 'drop-shadow(0 0 2px currentColor)'
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 px-6">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] organic-blob pointer-events-none" style={{
            background: 'radial-gradient(circle, rgba(217, 106, 29, 0.18), transparent)',
            animation: 'float 12s ease-in-out infinite'
          }}></div>

          <div className="absolute top-20 right-0 w-[500px] h-[500px] organic-blob-2 pointer-events-none" style={{
            background: 'radial-gradient(circle, rgba(76, 122, 26, 0.15), transparent)',
            animation: 'float 15s ease-in-out infinite',
            animationDelay: '3s'
          }}></div>

          <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] organic-blob pointer-events-none" style={{
            background: 'radial-gradient(circle, rgba(240, 138, 43, 0.15), transparent)',
            animation: 'float 11s ease-in-out infinite',
            animationDelay: '1.5s'
          }}></div>

          <div className="absolute inset-0 pointer-events-none z-10">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-12 h-12 flex items-center justify-center opacity-30"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  rotate: Math.random() * 360
                }}
                animate={{
                  y: [0, -40, 40, 0],
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.2, 0.8, 1]
                }}
                transition={{
                  duration: 8 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {i % 3 === 0 ? <Star className="text-[#F08A2B] fill-[#F08A2B]/20" /> :
                  i % 3 === 1 ? <Heart className="text-[#C93A1D] fill-[#C93A1D]/20" /> :
                    <Sparkles className="text-[#6D8F2B]" />}
              </motion.div>
            ))}
          </div>

          <motion.div className="relative z-30 text-center max-w-5xl mx-auto" style={{ opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <div className="inline-block px-10 py-4 relative hand-drawn-border bg-white/90 text-[#D96A1D] shadow-[5px_5px_0px_rgba(217,106,29,0.15)] -rotate-1">
                <span className="font-montserrat text-sm tracking-[0.4em] uppercase text-[#C93A1D] font-semibold">May 29, 2026</span>
                <div className="absolute -top-2 -left-2 w-5 h-5 organic-blob bg-[#F08A2B]"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 organic-blob-2 bg-[#D96A1D] opacity-60"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-12"
            >
              <h1 className="text-8xl md:text-9xl lg:text-[12rem] tracking-tighter leading-[0.8] mb-4 text-[#0B3A0A] font-extrabold drop-shadow-[4px_4px_0px_rgba(217,106,29,0.1)] font-cinzel">
                AWARDING
              </h1>
              <h2 className="text-7xl md:text-8xl lg:text-[9rem] tracking-tighter leading-none text-[#D96A1D] font-bold italic drop-shadow-[2px_2px_0px_rgba(11,58,10,0.05)] font-cinzel">
                NIGHT 2026
              </h2>

              <Star className="absolute -top-8 left-[8%] w-10 h-10 text-[#F08A2B] fill-none stroke-[2.5] animate-twinkle rotate-[15deg]" />
              <Star className="absolute top-[15%] right-[12%] w-7 h-7 text-[#C93A1D] fill-none stroke-[2.5] animate-twinkle [animation-delay:0.5s] -rotate-[20deg]" />
              <Heart className="absolute bottom-[5%] left-[3%] w-9 h-9 text-[#C93A1D]/60 fill-none stroke-[2] animate-float rotate-[10deg]" />
              <Sparkles className="absolute top-[45%] right-[5%] w-10 h-10 text-[#6D8F2B] stroke-[2] animate-twinkle [animation-delay:1s] -rotate-[15deg]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mb-8 relative"
            >
              <p className="font-cormorant text-3xl md:text-4xl tracking-wide italic mb-3 text-[#0B3A0A]">
                Universitas Ciputra
              </p>
              <svg className="mx-auto" width="180" height="8" viewBox="0 0 180 8">
                <path d="M 5 4 Q 45 0, 90 4 T 175 4" stroke="#D96A1D" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex flex-col md:flex-row gap-6 justify-center items-center font-montserrat text-sm tracking-wider mb-10 text-[#4C7A1A]"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D96A1D]" />
                <span>DIAN AUDITORIUM</span>
              </div>
              <span className="hidden md:block text-[#D96A1D]">✦</span>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#D96A1D]" />
                <span>16:30 - 22:00</span>
              </div>
            </motion.div>

            <motion.button
              onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
              className="vintage-button mx-auto group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              <span className="relative z-10">RESERVE YOUR SEAT</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-8 font-montserrat text-xs tracking-[0.3em] uppercase text-[#C93A1D]"
            >
              Every Story Begins with a Little Sparkle ✨
            </motion.p>

            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
              className="mt-16 flex flex-col items-center gap-3"
            >
              <span className="font-montserrat text-[10px] tracking-[0.5em] text-[#D96A1D]/60 uppercase">Scroll to Begin Your Journey</span>
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-12 bg-gradient-to-b from-[#D96A1D] to-transparent"
              />
            </motion.div>
          </motion.div>

          <div className="absolute top-16 left-12 pointer-events-none z-10 hidden lg:block" style={{ animation: 'sway 4s ease-in-out infinite' }}>
            <div className="relative">
              <div className="w-20 h-20 rounded-full" style={{ background: '#D96A1D', opacity: 0.3 }}></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full" style={{ background: '#F08A2B', opacity: 0.5 }}></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full" style={{ background: '#C93A1D', opacity: 0.4 }}></div>
            </div>
          </div>

          <div className="absolute top-32 right-24 pointer-events-none z-10 hidden lg:block" style={{ animation: 'sway 5s ease-in-out infinite', animationDelay: '1s' }}>
            <Star className="w-12 h-12" style={{ color: '#F08A2B', fill: '#F08A2B', opacity: 0.4, animation: 'twinkle 3s ease-in-out infinite' }} />
          </div>

          <div className="absolute bottom-32 left-32 pointer-events-none z-10 hidden lg:block" style={{ animation: 'float 6s ease-in-out infinite' }}>
            <Heart className="w-14 h-14" style={{ color: '#C93A1D', fill: '#C93A1D', opacity: 0.3 }} />
          </div>

          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 organic-blob pointer-events-none z-10"
              style={{
                background: i % 3 === 0 ? '#D96A1D' : i % 3 === 1 ? '#6D8F2B' : '#F08A2B',
                opacity: 0.15 + (Math.random() * 0.2),
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                animation: `twinkle ${3 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            ></div>
          ))}
        </section>

        {/* About Section */}
        <section className="relative py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9 }}
                className="relative"
              >
                <div className="absolute -top-12 -left-12 w-24 h-24 organic-blob bg-[#F08A2B] opacity-30" />
                <div className="absolute -bottom-12 -right-12 w-28 h-28 organic-blob-2 bg-[#6D8F2B] opacity-25" />

                <div className="storybook-card -rotate-[0.5deg] border-dashed border-[#4C7A1A]">
                  <div className="mb-6">
                    <span className="hand-drawn-border-sm px-5 py-2 inline-block font-montserrat text-xs tracking-[0.4em] uppercase text-[#D96A1D] bg-[#D96A1D]/10 rotate-1">
                      Annual Celebration
                    </span>
                  </div>

                  <h3 className="text-5xl md:text-6xl mb-6 leading-tight text-[#0B3A0A] font-cinzel">
                    Shaping Dreams,<br />
                    Honoring Excellence
                  </h3>

                  <svg className="mb-8" width="120" height="6" viewBox="0 0 120 6">
                    <path d="M 2 3 Q 30 0, 60 3 T 118 3" stroke="#D96A1D" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>

                  <p className="font-montserrat text-lg leading-relaxed mb-6 text-[#4C7A1A]">
                    The Universitas Ciputra Awarding Night is an annual formal event recognizing students who have excelled in <span className="text-[#D96A1D] font-semibold">academics, leadership, entrepreneurship, and creativity</span>.
                  </p>

                  <p className="font-cormorant text-xl leading-relaxed italic text-[#0B3A0A]">
                    Beyond recognition, we aim to inspire and motivate by showcasing excellence and dedication, encouraging others to strive for meaningful achievements within their community.
                  </p>

                  <Star className="absolute -top-4 -right-4 w-10 h-10 text-[#F08A2B] fill-[#F08A2B] rotate-[20deg] animate-twinkle" />
                  <Heart className="absolute -bottom-4 -left-4 w-8 h-8 text-[#C93A1D] fill-[#C93A1D] -rotate-[15deg]" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9 }}
                className="relative p-6 fairytale-frame"
              >
                <div className="absolute inset-0 z-0 pointer-events-none rounded-lg border-2 border-dashed border-[#D96A1D]/40" />
                <div className="relative z-10 overflow-hidden rounded-sm shadow-[15px_15px_30px_rgba(0,0,0,0.1)]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=1000"
                    alt="University Excellence"
                    className="w-full h-[550px] object-cover vintage-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F4E7CB]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-[#F4E7CB]/90 backdrop-blur-sm border-t-2 border-dashed border-[#D96A1D]/30">
                    <span className="font-cormorant text-2xl italic text-[#0B3A0A]">A Night of Excellence</span>
                  </div>
                </div>

                <Sparkles className="absolute -top-6 -left-6 w-12 h-12 text-[#D96A1D] animate-twinkle -rotate-[25deg]" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Nominees Section */}
        <NomineesSection />

        {/* Event Details */}
        <section className="relative py-24 px-6 bg-gradient-to-b from-[#EDE0D4]/30 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-block mb-6">
                <span className="hand-drawn-border-sm px-6 py-2 inline-block font-montserrat text-xs tracking-[0.4em] uppercase text-[#C93A1D] bg-white/80 -rotate-1">
                  Event Details
                </span>
              </div>
              <h3 className="text-5xl md:text-6xl leading-tight mb-5 text-[#0B3A0A] font-cinzel">
                Everything You Need to Know
              </h3>
              <svg className="mx-auto" width="200" height="8" viewBox="0 0 200 8">
                <path d="M 5 4 Q 50 0, 100 4 T 195 4" stroke="#D96A1D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <circle cx="100" cy="4" r="3" fill="#F08A2B" />
              </svg>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Event Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="lg:col-span-7 storybook-card -rotate-[0.3deg] border-[#4C7A1A] border-dashed"
              >
                <div className="absolute -top-4 -right-4 w-20 h-20 organic-blob bg-[#F08A2B] opacity-50" />

                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#D96A1D]/10 border-[3px] border-dotted border-[#D96A1D]">
                      <Calendar className="w-10 h-10 text-[#D96A1D]" />
                    </div>
                    <div>
                      <h4 className="text-5xl text-[#0B3A0A] font-cinzel">May 29, 2026</h4>
                      <p className="font-montserrat text-sm tracking-wide text-[#6D8F2B]">Thursday Evening</p>
                    </div>
                  </div>

                  <svg className="mb-8 w-full" height="4" viewBox="0 0 400 4">
                    <path d="M 2 2 L 398 2" stroke="#D96A1D" strokeWidth="2" strokeDasharray="8,5" strokeLinecap="round" />
                  </svg>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 mb-3 text-[#D96A1D]">
                        <Clock className="w-6 h-6" />
                        <span className="font-montserrat text-xs tracking-widest uppercase">Time</span>
                      </div>
                      <p className="text-4xl text-[#0B3A0A] font-cinzel">16:30 - 22:00</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 mb-3 text-[#D96A1D]">
                        <MapPin className="w-6 h-6" />
                        <span className="font-montserrat text-xs tracking-widest uppercase">Venue</span>
                      </div>
                      <p className="text-3xl text-[#0B3A0A] font-cinzel">Dian Auditorium</p>
                      <p className="font-montserrat text-sm text-[#4C7A1A]">Floor 7, UC Main Building</p>
                    </div>
                  </div>

                  <a
                    href="https://maps.app.goo.gl/NDzTsk9A4draMqkk9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vintage-button mt-10 hover:rotate-1"
                    style={{ borderColor: '#4C7A1A' }}
                  >
                    GET DIRECTIONS
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              {/* Dress Code Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-5 storybook-card rotate-[0.5deg] border-[#D96A1D] border-dashed"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-[#4C7A1A]/10 border-[3px] border-dotted border-[#4C7A1A]">
                  <Users className="w-8 h-8 text-[#4C7A1A]" />
                </div>
                <h4 className="text-4xl mb-4 text-[#0B3A0A] font-cinzel">Dress Code</h4>
                <p className="font-cormorant text-3xl mb-3 italic text-[#D96A1D]">Formal Earth Tone</p>
                <p className="font-montserrat text-sm tracking-wide leading-relaxed text-[#6D8F2B]">
                  Browns · Beiges · Creams · Terracotta · Olive
                </p>
                <Heart className="absolute -bottom-4 -right-4 w-10 h-10 text-[#C93A1D] fill-[#C93A1D] -rotate-[20deg]" />
              </motion.div>

              {/* Performance Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="lg:col-span-5 relative overflow-hidden group rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-4 border-[#F08A2B] shadow-[8px_8px_0px_rgba(76,122,26,0.15)] -rotate-[0.4deg]"
              >
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1514525253344-f81bad393c0d?auto=format&fit=crop&q=80&w=1000"
                    alt="Performance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 vintage-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F4E7CB]/95 via-[#F4E7CB]/60 to-transparent" />
                </div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <div className="mb-4">
                    <div className="hand-drawn-border-sm px-4 py-2 inline-block bg-white/95 -rotate-1 text-[#D96A1D]">
                      <span className="font-montserrat text-xs tracking-wider uppercase">Featured</span>
                    </div>
                  </div>
                  <h4 className="text-3xl mb-2 text-[#0B3A0A] font-cinzel">Special Musical Performance</h4>
                  <p className="font-montserrat text-sm text-[#4C7A1A]">Live entertainment throughout the evening</p>
                </div>
                <Sparkles className="absolute top-6 right-6 w-10 h-10 text-[#F08A2B] animate-twinkle -rotate-[30deg]" />
              </motion.div>

              {/* Door Prize Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="lg:col-span-7 storybook-card rotate-[0.3deg] border-[#C93A1D] border-dashed"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 bg-[#C93A1D]/10 border-[3px] border-dotted border-[#C93A1D]">
                      <Gift className="w-10 h-10 text-[#C93A1D]" />
                    </div>
                    <div>
                      <h4 className="text-3xl mb-1 text-[#0B3A0A] font-cinzel">Door Prize & Souvenirs</h4>
                      <p className="font-montserrat text-xs tracking-wider uppercase text-[#D96A1D]">Exclusive Rewards</p>
                    </div>
                  </div>
                  <div className="space-y-3 font-montserrat text-sm leading-relaxed text-[#4C7A1A]">
                    <p>All attendees receive exclusive UCAN 2026 souvenirs to commemorate this special evening.</p>
                    <p className="text-[#6D8F2B]">Stay until the end for a chance to win exciting door prizes announced during the event.</p>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 w-12 h-12 organic-blob bg-[#F08A2B] opacity-60" />
                <Star className="absolute -bottom-4 -right-4 w-10 h-10 text-[#4C7A1A] fill-[#4C7A1A] rotate-[35deg]" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section id="rsvp" ref={rsvpSectionRef} className="relative py-24 px-6">
          <div className="max-w-3xl mx-auto relative">
            <div className="mb-16 text-center">
              <div className="inline-block mb-6">
                <span className="hand-drawn-border-sm px-6 py-2 inline-block font-montserrat text-xs tracking-[0.4em] uppercase text-[#D96A1D] bg-white/95 -rotate-[0.5deg]">
                  Confirm Attendance
                </span>
              </div>
              <h3 className="text-5xl md:text-6xl mb-5 leading-tight text-[#0B3A0A] font-cinzel">RSVP</h3>
              <svg className="mx-auto mb-6" width="150" height="8" viewBox="0 0 150 8">
                <path d="M 5 4 Q 37.5 0, 75 4 T 145 4" stroke="#D96A1D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
              <p className="font-montserrat tracking-wide text-[#0B3A0A]">Login with your student account to reserve your seat</p>
            </div>
            <RSVPForm isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} containerRef={rsvpContainerRef} />
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-16 px-6 bg-[#EDE0D4]/50 border-t-2 border-dashed border-[#D96A1D]">
          <div className="max-w-7xl mx-auto relative">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h4 className="text-4xl mb-3 text-[#0B3A0A] font-cinzel">Universitas Ciputra</h4>
                <p className="font-cormorant text-2xl italic text-[#D96A1D]">Shaping Dreams, Honoring Excellence</p>
              </div>

              <div className="flex flex-col md:items-end gap-4 font-montserrat text-sm text-[#4C7A1A]">
                <a
                  href="https://maps.app.goo.gl/NDzTsk9A4draMqkk9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors flex items-center gap-2 hover:underline text-[#4C7A1A]"
                >
                  <MapPin className="w-5 h-5" />
                  Dian Auditorium, Floor 7
                </a>
                <span className="tracking-wider text-[#4C7A1A]">May 29, 2026 · 16:30 - 22:00</span>
              </div>
            </div>

            <div className="flex justify-center mb-10 text-[#D96A1D] opacity-40">
              <div className="vintage-ornament max-w-md mx-auto" />
            </div>

            <div className="text-center">
              <p className="font-montserrat text-xs tracking-widest uppercase text-[#6D8F2B]">
                © 2026 Universitas Ciputra. All rights reserved.
              </p>
            </div>

            <div className="absolute top-8 left-8 w-16 h-16 organic-blob bg-[#F08A2B] opacity-20" />
            <div className="absolute bottom-8 right-8 w-20 h-20 organic-blob-2 bg-[#4C7A1A] opacity-15" />
          </div>
        </footer>

      </div>
    </div>
  );
}
