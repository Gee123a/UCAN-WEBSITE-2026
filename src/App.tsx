import { useState, useRef, useEffect } from 'react';
import {
  Calendar, MapPin, Clock, Users, Star,
  Sparkles, Gift, ArrowRight, Heart, ArrowUp
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { RSVPForm } from './components/RSVPForm';
import { ImageWithFallback } from './components/ImageWithFallback';
import { StoryJourney } from './components/StoryJourney';
import NavigationBar from './components/NavigationBar';
import Particles from './components/magicui/particles';



export default function UCANWebsite() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const heroRef = useRef(null);
  const rsvpSectionRef = useRef<HTMLElement>(null);
  const rsvpContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero content fade and parallax
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  
  // Parallax elements
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const blob1Y = useTransform(smoothProgress, [0, 1], [0, -200]);
  const blob2Y = useTransform(smoothProgress, [0, 1], [0, -350]);
  const blob3Y = useTransform(smoothProgress, [0, 1], [0, -150]);
  const decorationY = useTransform(smoothProgress, [0, 1], [0, -400]);

  const handleOpenBook = () => {
    setIsOpening(false);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpening && (
          <motion.div
            key="book-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B3A0A] overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-64 h-80 relative perspective-1000 group">
                <motion.div 
                  className="absolute inset-0 bg-[#D96A1D] rounded-r-lg shadow-2xl border-2 border-white/20 flex flex-col items-center justify-center p-6 text-center"
                  style={{ transformOrigin: "left", rotateY: 0 }}
                >
                  <Star className="w-12 h-12 text-white mb-4 animate-twinkle" />
                  <h2 className="font-cinzel text-2xl text-white font-bold">UCAN 2026</h2>
                  <div className="w-12 h-0.5 bg-white/40 my-4"></div>
                  <p className="font-montserrat text-[10px] tracking-[0.3em] text-white/80 uppercase">The Royal Invitation</p>
                </motion.div>
                
                {/* Book Spine */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-[#C93A1D] rounded-l-sm shadow-inner"></div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(240, 138, 43, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenBook}
                className="mt-12 px-8 py-3 bg-white text-[#0B3A0A] font-montserrat text-xs tracking-[0.4em] uppercase font-bold rounded-full shadow-lg transition-all"
              >
                Open the Scroll
              </motion.button>
              
              <p className="mt-6 font-cormorant text-white/60 italic text-lg">A magical evening awaits...</p>
            </motion.div>

            <Particles
              className="absolute inset-0"
              quantity={100}
              staticity={30}
              ease={50}
              color="#F08A2B"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen relative overflow-x-hidden selection:bg-[#D96A1D]/30" style={{ background: '#F4E7CB' }}>
        {!isOpening && <NavigationBar />}
        
        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>

        {/* Main Book Page Container */}
        <div className="relative pb-8 md:pb-12">
          {/* Permanent Elegant Storybook Page Frame */}
          <div className="absolute inset-2 sm:inset-3 md:inset-6 pointer-events-none z-50">
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: '120px 15px 100px 15px/15px 100px 15px 120px',
                border: '2px md:border-3 solid #D96A1D',
                boxShadow: 'inset 0 0 30px rgba(217, 106, 29, 0.08)'
              }}
            />
            <div 
              className="absolute inset-1.5 md:inset-3 opacity-60 pointer-events-none"
              style={{
                borderRadius: '120px 15px 100px 15px/15px 100px 15px 120px',
                border: '1.5px md:border-2 dashed #0B3A0A',
              }}
            />
          </div>

          {/* Particles Replacement for manual Fairy Dust */}
          <Particles
            className="fixed inset-0 pointer-events-none z-0"
            quantity={60}
            staticity={50}
            ease={50}
            color="#D96A1D"
          />

        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32 px-4 md:px-6">
          <motion.div 
            className="absolute top-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] organic-blob pointer-events-none" 
            style={{
              background: 'radial-gradient(circle, rgba(217, 106, 29, 0.18), transparent)',
              animation: 'float 12s ease-in-out infinite',
              y: blob1Y
            }}
          />

          <motion.div 
            className="absolute top-20 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] organic-blob-2 pointer-events-none" 
            style={{
              background: 'radial-gradient(circle, rgba(76, 122, 26, 0.15), transparent)',
              animation: 'float 15s ease-in-out infinite',
              animationDelay: '3s',
              y: blob2Y
            }}
          />

          <motion.div 
            className="absolute bottom-0 left-1/4 w-[225px] md:w-[450px] h-[225px] md:h-[450px] organic-blob pointer-events-none" 
            style={{
              background: 'radial-gradient(circle, rgba(240, 138, 43, 0.15), transparent)',
              animation: 'float 11s ease-in-out infinite',
              animationDelay: '1.5s',
              y: blob3Y
            }}
          />

          <div className="absolute inset-0 pointer-events-none z-10">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                aria-hidden="true"
                className="absolute w-12 h-12 flex items-center justify-center opacity-30"
                style={{
                  x: `${(i * 137) % 100}%`,
                  y: `${(i * 223) % 100}%`,
                  top: 0,
                  left: 0,
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

          <motion.div 
            className="relative z-30 text-center max-w-5xl mx-auto" 
            style={{ 
              opacity: heroOpacity,
              scale: heroScale,
              y: heroTranslateY
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <div className="inline-block px-5 py-2 sm:px-10 sm:py-4 relative hand-drawn-border bg-white/90 text-[#D96A1D] shadow-[5px_5px_0px_rgba(217,106,29,0.15)] -rotate-1">
                <span className="font-montserrat text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#C93A1D] font-semibold">May 29, 2026</span>
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
              <h1 className="text-[12vw] sm:text-8xl md:text-9xl lg:text-[12rem] tracking-tight sm:tracking-tighter leading-[0.85] sm:leading-[0.8] mb-4 text-[#0B3A0A] font-extrabold drop-shadow-[4px_4px_0px_rgba(217,106,29,0.1)] font-cinzel">
                AWARDING
              </h1>
              <h2 className="text-[10vw] sm:text-7xl md:text-8xl lg:text-[9rem] tracking-tight sm:tracking-tighter leading-none text-[#D96A1D] font-bold italic drop-shadow-[2px_2px_0px_rgba(11,58,10,0.05)] font-cinzel">
                NIGHT 2026
              </h2>

              <Star aria-hidden="true" className="absolute -top-8 left-[8%] w-10 h-10 text-[#F08A2B] fill-none stroke-[2.5] animate-twinkle rotate-[15deg]" />
              <Star aria-hidden="true" className="absolute top-[15%] right-[12%] w-7 h-7 text-[#C93A1D] fill-none stroke-[2.5] animate-twinkle [animation-delay:0.5s] -rotate-[20deg]" />
              <Heart aria-hidden="true" className="absolute bottom-[5%] left-[3%] w-9 h-9 text-[#C93A1D]/60 fill-none stroke-[2] animate-float rotate-[10deg]" />
              <Sparkles aria-hidden="true" className="absolute top-[45%] right-[5%] w-10 h-10 text-[#6D8F2B] stroke-[2] animate-twinkle [animation-delay:1s] -rotate-[15deg]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mb-8 relative"
            >
              <p className="font-cormorant text-xl min-[375px]:text-2xl md:text-4xl tracking-wide italic mb-3 text-[#0B3A0A]">
                Universitas Ciputra
              </p>
              <svg className="mx-auto w-[120px] md:w-[180px]" height="8" viewBox="0 0 180 8">
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
              className="mt-8 md:mt-16 flex flex-col items-center gap-3"
            >
              <span className="font-montserrat text-[10px] tracking-[0.5em] text-[#D96A1D]/60 uppercase">Scroll to Begin Your Journey</span>
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-12 bg-gradient-to-b from-[#D96A1D] to-transparent"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute top-16 left-12 pointer-events-none z-10 hidden lg:block" 
            style={{ 
              animation: 'sway 4s ease-in-out infinite',
              y: decorationY
            }}
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full" style={{ background: '#D96A1D', opacity: 0.3 }}></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full" style={{ background: '#F08A2B', opacity: 0.5 }}></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full" style={{ background: '#C93A1D', opacity: 0.4 }}></div>
            </div>
          </motion.div>

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

        {/* Nominees & Story Journey Section */}
        <section id="nominees" className="relative">
          <StoryJourney />
        </section>


        {/* Event Details */}
        <section className="relative py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#EDE0D4]/30 to-transparent">
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
              <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight mb-5 text-[#0B3A0A] font-cinzel">
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
                      <h4 className="text-3xl md:text-5xl text-[#0B3A0A] font-cinzel">May 29, 2026</h4>
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
                className="lg:col-span-5 storybook-card group cursor-pointer -rotate-[0.4deg] border-[#F08A2B] border-dashed"
              >
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1514525253344-f81bad393c0d?auto=format&fit=crop&q=80&w=1000"
                    alt="Performance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 vintage-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F4E7CB]/95 via-[#F4E7CB]/60 to-transparent" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end pt-20 sm:pt-32">
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
        <section id="rsvp" ref={rsvpSectionRef} className="relative py-12 md:py-24 px-4 md:px-6">
          <div className="max-w-3xl mx-auto relative">
            <p className="font-montserrat tracking-wide text-[#0B3A0A] mb-8">Login with your student account to reserve your seat</p>
            <RSVPForm isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} containerRef={rsvpContainerRef} />
          </div>
        </section>

        </div>

        {/* Footer */}
        <footer className="relative py-16 px-6 bg-[#EDE0D4]/30">
          <div className="max-w-7xl mx-auto relative">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="text-center md:text-left">
                <h4 className="text-3xl sm:text-4xl mb-3 text-[#0B3A0A] font-cinzel">Universitas Ciputra</h4>
                <p className="font-cormorant text-xl sm:text-2xl italic text-[#D96A1D]">Shaping Dreams, Honoring Excellence</p>
              </div>

              <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4 font-montserrat text-sm text-[#4C7A1A]">
                <a
                  href="https://maps.app.goo.gl/NDzTsk9A4draMqkk9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors flex items-center justify-center md:justify-end gap-2 hover:underline text-[#4C7A1A]"
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
