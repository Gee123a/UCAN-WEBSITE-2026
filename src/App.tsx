import { useState, useRef, useEffect } from 'react';
import {
  Calendar, MapPin, Clock, Users, Star,
  Sparkles, Gift, ArrowRight, Heart, ArrowUp, Loader2,
  Video
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { RSVPForm } from './components/RSVPForm';
import { ImageWithFallback } from './components/ImageWithFallback';
import { StoryJourney } from './components/StoryJourney';
import NavigationBar from './components/NavigationBar';
import Particles from './components/magicui/particles';
import { Meteors } from './components/magicui/meteors';

// Assets for Preloading
import Wall1 from './assets/assets UCAN/Ballroom/wall /Wall1.webp';
import Wall2 from './assets/assets UCAN/Ballroom/wall /Wall2.webp';
import Ballroom1 from './assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom1.webp';
import Ballroom2 from './assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom2.webp';
import Ballroom3 from './assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom3.webp';
import Banner1 from './assets/assets UCAN/nomination assets/Hallway/Banner/Banner 1/AI Ver/Banner.webp';
import BannerNew from './assets/assets UCAN/Chamber/New/BannerNew.webp';
import PillarArch1 from './assets/assets UCAN/nomination assets/Hallway/Pillars/AI Ver/PillarArch.webp';
import Performance from './assets/Special Performance.webp';
import UcanwLogo from './assets/ucanLogos/UCANW.webp';
import BookCover from './assets/Book.jpeg';

// Dress Code Images Dynamic Import
const dresscodeModules = import.meta.glob('./assets/Dresscode/*.{png,PNG,jpeg,jpg,webp}', { eager: true });
const dresscodeImages = Object.values(dresscodeModules).map((mod: any) => mod.default);


export default function UCANWebsite() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('mock_login') === 'true';
    }
    return false;
  });
  const [isOpening, setIsOpening] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentDresscodeIndex, setCurrentDresscodeIndex] = useState(0);
  const heroRef = useRef(null);
  const rsvpSectionRef = useRef<HTMLElement>(null);
  const rsvpContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const assetsToLoad = [
      Wall1, Wall2, Ballroom1, Ballroom2, Ballroom3, Banner1, BannerNew, PillarArch1, UcanwLogo,
      BookCover,
      ...dresscodeImages
    ];
    let loadedCount = 0;

    const loadImages = async () => {
      const promises = assetsToLoad.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadedCount++;
            setLoadProgress((loadedCount / assetsToLoad.length) * 100);
            resolve(true);
          };
          img.onerror = () => {
             loadedCount++;
             setLoadProgress((loadedCount / assetsToLoad.length) * 100);
             resolve(true);
          };
        });
      });
      await Promise.all(promises);
      setTimeout(() => setAssetsLoaded(true), 800); 
    };

    loadImages();

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (dresscodeImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentDresscodeIndex((prev) => (prev + 1) % dresscodeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Lock scroll during book loading
  useEffect(() => {
    if (isOpening) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpening]);

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
    if (assetsLoaded) {
      setIsOpening(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpening && (
          <motion.div
            key="book-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #273961, #090A11)' }}
          >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/p6.webp')]"></div>
            <Meteors number={30} />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-64 aspect-[686/982] relative perspective-1000 group">
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center rounded-lg shadow-2xl border-2 border-white/20 overflow-hidden flex items-center justify-center"
                  style={{ 
                    transformOrigin: "left", 
                    rotateY: 0,
                    backgroundImage: `url(${BookCover})`
                  }}
                >
                  {/* Centered Content within the inner red area */}
                  <div className="flex flex-col items-center justify-between h-[56%] w-[75%] text-center">
                    {/* Top: Logo */}
                    <div className="flex items-center justify-center">
                      <img 
                        src={UcanwLogo} 
                        alt="UCANW Logo" 
                        className="w-28 h-28 object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]" 
                      />
                    </div>

                    {/* Middle: Title */}
                    <div className="flex flex-col items-center">
                      <h2 className="font-cinzel text-3.5xl text-white font-bold tracking-[0.12em] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                        UCAN
                        <span className="block mt-0.5">2026</span>
                      </h2>
                    </div>

                    {/* Bottom: Subtitle */}
                    <div className="w-full">
                      <p className="font-lora text-sm italic tracking-widest text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                        Let the story begin
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-12 flex flex-col items-center min-h-[100px] justify-center">
                {!assetsLoaded ? (
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                      <Loader2 className="w-8 h-8 text-[#D96A1D] animate-spin" />
                      <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-white animate-twinkle" />
                    </div>
                    <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#D96A1D] to-[#F08A2B] shadow-[0_0_15px_rgba(217,106,29,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${loadProgress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-eb-garamond text-xs tracking-wider text-white/70 font-bold italic">
                        Preparing the Ballroom
                      </span>
                      <span className="font-cinzel text-xl text-[#D96A1D] animate-pulse">
                        {Math.round(loadProgress)}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(217, 106, 29, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenBook}
                    className="px-10 py-4 bg-white text-[#0B3A0A] font-montserrat text-xs tracking-[0.4em] uppercase font-black rounded-full shadow-2xl transition-all border-2 border-[#D96A1D]/20 hover:border-[#D96A1D]/50"
                  >
                    Open the Scroll
                  </motion.button>
                )}
              </div>
              
              <p className="mt-8 font-eb-garamond text-white/60 italic text-2xl">A magical evening awaits...</p>
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
                  left: `${5 + ((i * 137) % 90)}%`,
                  top: `${5 + ((i * 223) % 90)}%`,
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
              <h1 className="text-[12vw] sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight leading-[0.85] sm:leading-[0.8] mb-4 text-[#0B3A0A] font-cinzel font-black drop-shadow-[4px_4px_0px_rgba(217,106,29,0.1)]">
                AWARDING
              </h1>
              <h2 className="text-[10vw] sm:text-7xl md:text-8xl lg:text-[10rem] tracking-tight leading-none text-[#D96A1D] font-cinzel font-bold italic drop-shadow-[2px_2px_0px_rgba(11,58,10,0.05)]">
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
              <p className="font-script text-3xl min-[375px]:text-4xl md:text-6xl tracking-wide mb-3 text-[#0B3A0A]">
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.3 }}
              className="relative max-w-2xl mx-auto my-12 px-6 sm:px-10 pt-8 pb-14 fairytale-frame bg-[#fffcf5] text-center shadow-[10px_10px_0px_rgba(217,106,29,0.15)] -rotate-1 hover:rotate-0 transition-transform duration-500 z-30"
            >
              {/* Corner Sparkle Ornaments */}
              <Sparkles className="absolute -top-3 -left-3 w-6 h-6 text-[#F08A2B] animate-twinkle" />
              <Sparkles className="absolute -bottom-3 -right-3 w-6 h-6 text-[#F08A2B] animate-twinkle [animation-delay:0.7s]" />

              <span className="font-cinzel text-xs tracking-[0.25em] text-[#C93A1D] font-bold block mb-4">
                THE History OF UCAN
              </span>

              <div className="font-eb-garamond text-base sm:text-lg md:text-xl text-[#0B3A0A] italic leading-relaxed space-y-6 mb-6">
                <p className="text-left md:text-justify indent-0 clear-both">
                  <span className="font-blackletter text-5xl sm:text-6xl md:text-7xl text-[#C93A1D] mr-2 select-none drop-shadow-[2px_2px_0px_rgba(240,138,43,0.3)] inline-block align-middle leading-none">
                    Once
                  </span>
                  {" "}every year, on a night filled with light and wonder, the Universitas Ciputra Awarding Night is held. It is a special gathering where students who have shown dedication and excellence in academics, leadership, entrepreneurship, and creativity are recognized for their journeys.
                </p>
                <p className="text-left md:text-justify clear-both">
                  And as these stories are shared, they don’t end on that stage. Instead, they spark something new that encourages others to believe in their own path, to keep trying, and to create their own story worth telling.
                </p>
              </div>

              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-35">
                <button
                  onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
                  className="vintage-button vintage-button-primary group shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    RESERVE YOUR SEAT
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>

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
              <h3 className="text-3xl md:text-5xl lg:text-7xl leading-tight mb-5 text-[#0B3A0A] font-cinzel">
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

              {/* UCAN Trailer Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="lg:col-span-5 storybook-card rotate-[0.2deg] border-[#D96A1D] border-dashed flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#D96A1D]/10 border-2 border-dotted border-[#D96A1D]">
                      <Video className="w-6 h-6 text-[#D96A1D]" />
                    </div>
                    <div>
                      <h4 className="text-2xl text-[#0B3A0A] font-cinzel">Event Trailer</h4>
                      <p className="font-montserrat text-xs tracking-wide text-[#6D8F2B]">A sneak peek into the magic</p>
                    </div>
                  </div>
                  <div 
                    className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#D96A1D]/20 bg-black/5"
                    style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)', maskImage: 'radial-gradient(white, black)', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                  >
                    <iframe
                      src="https://drive.google.com/file/d/1cJN_3MM3a5KlI-rRS7988o8YXAV6Ps6t/preview"
                      className="absolute inset-0 w-full h-full border-none rounded-2xl"
                      allow="autoplay"
                    ></iframe>
                  </div>
                </div>
              </motion.div>

              {/* Dress Code Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-4 storybook-card group cursor-pointer rotate-[0.5deg] border-[#D96A1D] border-dashed overflow-hidden relative"
              >
                <div className="absolute inset-0">
                  {dresscodeImages.map((src, idx) => (
                    <motion.img
                      key={src || idx}
                      src={src}
                      alt={`Dress Code option ${idx + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: idx === currentDresscodeIndex ? 1 : 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover vintage-image"
                      style={{ pointerEvents: idx === currentDresscodeIndex ? 'auto' : 'none' }}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F4E7CB]/95 via-[#F4E7CB]/60 to-transparent pointer-events-none" />
                </div>
                
                <div className="relative z-10 h-full flex flex-col justify-end pt-20 sm:pt-32">
                  <div className="mb-4">
                    <div className="hand-drawn-border-sm px-4 py-2 inline-block bg-white/95 -rotate-1 text-[#D96A1D]">
                      <span className="font-montserrat text-xs tracking-wider uppercase flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#D96A1D]" />
                        Royal Attire
                      </span>
                    </div>
                  </div>
                  <h4 className="text-3xl mb-2 text-[#0B3A0A] font-cinzel">Dress Code</h4>
                  <p className="font-montserrat text-sm text-[#4C7A1A]">
                    Dress in your most elegant, regal garments to fit the magical evening.
                  </p>
                </div>
                <Sparkles className="absolute top-6 right-6 w-10 h-10 text-[#F08A2B] animate-twinkle -rotate-[30deg]" />
              </motion.div>

              {/* Performance Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="lg:col-span-4 storybook-card group cursor-pointer -rotate-[0.4deg] border-[#F08A2B] border-dashed"
              >
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={Performance}
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
                className="lg:col-span-4 storybook-card rotate-[0.3deg] border-[#C93A1D] border-dashed"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-[#C93A1D]/10 border-[3px] border-dotted border-[#C93A1D]">
                  <Gift className="w-8 h-8 text-[#C93A1D]" />
                </div>
                <h4 className="text-4xl mb-4 text-[#0B3A0A] font-cinzel">Door Prize</h4>
                <p className="font-cormorant text-3xl mb-3 italic text-[#D96A1D]">Exclusive Souvenirs</p>
                <p className="font-montserrat text-sm tracking-wide leading-relaxed text-[#4C7A1A]">
                  Receive exclusive UCAN 2026 souvenirs and stand a chance to win exciting door prizes.
                </p>
                <div className="absolute -top-4 -left-4 w-12 h-12 organic-blob bg-[#F08A2B] opacity-60" />
                <Star className="absolute -bottom-4 -right-4 w-10 h-10 text-[#4C7A1A] fill-[#4C7A1A] rotate-[35deg]" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section id="rsvp" ref={rsvpSectionRef} className="relative py-12 md:py-24 px-4 md:px-6">
          <div className="max-w-3xl mx-auto relative">
            <RSVPForm isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} containerRef={rsvpContainerRef} />
          </div>
        </section>

        </div>

        {/* Footer */}
        <footer className="relative py-16 px-6 bg-[#EDE0D4]/30">
          <div className="max-w-7xl mx-auto relative">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="text-center md:text-left">
                <h4 className="text-4xl sm:text-6xl mb-3 text-[#0B3A0A] font-cinzel">Universitas Ciputra</h4>
                <p className="font-cinzel text-2xl sm:text-4xl text-[#D96A1D]">Shaping Dreams, Honoring Excellence</p>
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
