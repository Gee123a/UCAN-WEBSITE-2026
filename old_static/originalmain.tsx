import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock, Users, Award, Star, Sparkles, Gift, ArrowRight, Heart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="
          alt="Error loading image"
          {...rest}
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={() => setDidError(true)}
    />
  );
}

export default function UCANWebsite() {
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    major: '',
    organization: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const nominees = [
    { name: "Sarah Chen", category: "Academic Excellence" },
    { name: "Michael Rodriguez", category: "Leadership Award" },
    { name: "Priya Sharma", category: "Innovation & Creativity" },
    { name: "David Kim", category: "Entrepreneurship" },
    { name: "Amanda Silva", category: "Community Impact" },
    { name: "James Wilson", category: "Research Excellence" },
    { name: "Elena Petrova", category: "Arts & Culture" },
    { name: "Ryan Thompson", category: "Sports Achievement" },
  ];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const organizations = [
    'BEM UC',
    'HMPS Akuntansi',
    'HMPS Manajemen',
    'HMPS Psikologi',
    'HMPS Teknik Informatika',
    'HMPS Desain Komunikasi Visual',
    'HIMAFE',
    'KMK',
    'PMK',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please login with your student account to RSVP');
      return;
    }
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: '#F4E7CB' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        
        .font-cinzel {
          font-family: 'Cinzel', serif;
        }
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }
        
        body {
          font-family: 'Montserrat', sans-serif;
        }

        @keyframes gentleFall {
          0% { 
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { 
            transform: translateY(110vh) translateX(15px) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-content {
          animation: marqueeScroll 45s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.3) rotate(180deg); }
        }

        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }

        .wavy-border {
          clip-path: polygon(
            0% 2%, 5% 0%, 10% 1%, 15% 0%, 20% 2%, 25% 1%, 30% 0%, 35% 1%, 40% 0%, 45% 2%, 50% 1%, 55% 0%, 60% 1%, 65% 0%, 70% 2%, 75% 1%, 80% 0%, 85% 2%, 90% 1%, 95% 0%, 100% 2%,
            100% 98%, 95% 100%, 90% 99%, 85% 100%, 80% 98%, 75% 99%, 70% 100%, 65% 99%, 60% 100%, 55% 98%, 50% 99%, 45% 100%, 40% 99%, 35% 100%, 30% 98%, 25% 99%, 20% 100%, 15% 98%, 10% 99%, 5% 100%, 0% 98%
          );
        }

        .torn-edge {
          position: relative;
        }

        .torn-edge::after {
          content: '';
          position: absolute;
          inset: 0;
          background: inherit;
          clip-path: polygon(
            0% 3%, 2% 1%, 4% 3%, 6% 2%, 8% 4%, 10% 2%, 12% 3%, 14% 1%, 16% 4%, 18% 2%, 20% 3%, 22% 1%, 24% 4%, 26% 2%, 28% 3%, 30% 1%, 32% 4%, 34% 2%, 36% 3%, 38% 1%, 40% 4%, 42% 2%, 44% 3%, 46% 1%, 48% 4%, 50% 2%, 52% 3%, 54% 1%, 56% 4%, 58% 2%, 60% 3%, 62% 1%, 64% 4%, 66% 2%, 68% 3%, 70% 1%, 72% 4%, 74% 2%, 76% 3%, 78% 1%, 80% 4%, 82% 2%, 84% 3%, 86% 1%, 88% 4%, 90% 2%, 92% 3%, 94% 1%, 96% 4%, 98% 2%, 100% 3%,
            100% 97%, 98% 99%, 96% 97%, 94% 99%, 92% 96%, 90% 98%, 88% 97%, 86% 99%, 84% 96%, 82% 98%, 80% 97%, 78% 99%, 76% 96%, 74% 98%, 72% 97%, 70% 99%, 68% 96%, 66% 98%, 64% 97%, 62% 99%, 60% 96%, 58% 98%, 56% 97%, 54% 99%, 52% 96%, 50% 98%, 48% 97%, 46% 99%, 44% 96%, 42% 98%, 40% 97%, 38% 99%, 36% 96%, 34% 98%, 32% 97%, 30% 99%, 28% 96%, 26% 98%, 24% 97%, 22% 99%, 20% 96%, 18% 98%, 16% 97%, 14% 99%, 12% 96%, 10% 98%, 8% 97%, 6% 99%, 4% 96%, 2% 98%, 0% 97%
          );
          pointer-events: none;
        }

        .organic-blob {
          border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
        }

        .organic-blob-2 {
          border-radius: 48% 52% 68% 32% / 42% 57% 43% 58%;
        }

        .hand-drawn-border {
          position: relative;
        }

        .hand-drawn-border::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          background: transparent;
          border: 3px solid currentColor;
          pointer-events: none;
        }
      `}</style>

      {/* Decorative Floating Elements - More Organic */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `gentleFall ${20 + Math.random() * 15}s linear infinite`,
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
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 px-6">
        {/* Large Organic Decorative Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] organic-blob pointer-events-none" style={{ 
          background: 'radial-gradient(circle, rgba(217, 106, 29, 0.15), transparent)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        
        <div className="absolute top-20 right-0 w-[400px] h-[400px] organic-blob-2 pointer-events-none" style={{ 
          background: 'radial-gradient(circle, rgba(76, 122, 26, 0.12), transparent)',
          animation: 'float 10s ease-in-out infinite',
          animationDelay: '2s'
        }}></div>

        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] organic-blob pointer-events-none" style={{ 
          background: 'radial-gradient(circle, rgba(240, 138, 43, 0.12), transparent)',
          animation: 'float 9s ease-in-out infinite',
          animationDelay: '1s'
        }}></div>

        {/* Scattered Decorative Florals */}
        <div className="absolute top-16 left-12 pointer-events-none" style={{ animation: 'sway 4s ease-in-out infinite' }}>
          <div className="relative">
            <div className="w-20 h-20 rounded-full" style={{ background: '#D96A1D', opacity: 0.5 }}></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full" style={{ background: '#F08A2B', opacity: 0.7 }}></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full" style={{ background: '#C93A1D', opacity: 0.6 }}></div>
          </div>
        </div>

        <div className="absolute top-32 right-24 pointer-events-none" style={{ animation: 'sway 5s ease-in-out infinite', animationDelay: '1s' }}>
          <Star className="w-12 h-12" style={{ color: '#F08A2B', fill: '#F08A2B', opacity: 0.6, animation: 'twinkle 3s ease-in-out infinite' }} />
        </div>

        <div className="absolute bottom-32 left-32 pointer-events-none" style={{ animation: 'float 6s ease-in-out infinite' }}>
          <Heart className="w-14 h-14" style={{ color: '#C93A1D', fill: '#C93A1D', opacity: 0.5 }} />
        </div>

        <div className="absolute bottom-20 right-1/4 pointer-events-none">
          <Sparkles className="w-10 h-10" style={{ color: '#6D8F2B', opacity: 0.5, animation: 'twinkle 4s ease-in-out infinite' }} />
        </div>

        {/* Multiple Small Organic Shapes Scattered */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-6 h-6 organic-blob pointer-events-none"
            style={{
              background: i % 3 === 0 ? '#D96A1D' : i % 3 === 1 ? '#6D8F2B' : '#F08A2B',
              opacity: 0.2 + (Math.random() * 0.3),
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}

        <motion.div 
          className="relative z-10 text-center max-w-5xl mx-auto"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6"
          >
            <div className="inline-block px-8 py-3 relative hand-drawn-border" style={{
              background: 'rgba(255, 255, 255, 0.8)',
              color: '#D96A1D',
              boxShadow: '3px 3px 0px rgba(217, 106, 29, 0.2)',
              transform: 'rotate(-1deg)'
            }}>
              <span className="font-montserrat text-sm tracking-[0.3em] uppercase" style={{ color: '#C93A1D' }}>May 29, 2026</span>
              <div className="absolute -top-2 -left-2 w-5 h-5 organic-blob" style={{ background: '#F08A2B' }}></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 organic-blob-2" style={{ background: '#D96A1D' }}></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 organic-blob" style={{ background: '#6D8F2B' }}></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative mb-8"
          >
            <h1 
              className="font-cinzel text-7xl md:text-9xl lg:text-[12rem] tracking-tight leading-none mb-10"
              style={{
                color: '#0B3A0A',
                textShadow: '3px 3px 0px rgba(217, 106, 29, 0.15)',
                fontWeight: 800
              }}
            >
              AWARDING
            </h1>
            
            <h2 
              className="font-cinzel text-6xl md:text-8xl lg:text-[9rem] tracking-tight leading-none"
              style={{
                color: '#D96A1D',
                textShadow: '2px 2px 0px rgba(11, 58, 10, 0.12)',
                fontWeight: 800
              }}
            >
              NIGHT 2026
            </h2>

            {/* Floating Decorations Around Title */}
            <Star className="absolute -top-8 left-[8%] w-10 h-10" style={{ 
              color: '#F08A2B', 
              fill: 'none',
              strokeWidth: 2.5,
              animation: 'twinkle 3s ease-in-out infinite',
              transform: 'rotate(15deg)'
            }} />
            <Star className="absolute top-[15%] right-[12%] w-7 h-7" style={{ 
              color: '#C93A1D', 
              fill: 'none',
              strokeWidth: 2.5,
              animation: 'twinkle 2.5s ease-in-out infinite', 
              animationDelay: '0.5s',
              transform: 'rotate(-20deg)'
            }} />
            <Heart className="absolute bottom-[5%] left-[3%] w-9 h-9" style={{ 
              color: '#6B0F2C', 
              fill: 'none',
              strokeWidth: 2,
              animation: 'float 4s ease-in-out infinite',
              transform: 'rotate(10deg)'
            }} />
            <Sparkles className="absolute top-[45%] right-[5%] w-10 h-10" style={{ 
              color: '#6D8F2B',
              strokeWidth: 2,
              animation: 'twinkle 2.8s ease-in-out infinite', 
              animationDelay: '1s',
              transform: 'rotate(-15deg)'
            }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mb-8 relative"
          >
            <p className="font-cormorant text-3xl md:text-4xl tracking-wide italic mb-3" style={{ color: '#4C7A1A' }}>
              Universitas Ciputra
            </p>
            <svg className="mx-auto" width="180" height="8" viewBox="0 0 180 8">
              <path d="M 5 4 Q 45 0, 90 4 T 175 4" stroke="#D96A1D" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center font-montserrat text-sm tracking-wider mb-10"
            style={{ color: '#6D8F2B' }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" style={{ color: '#D96A1D' }} />
              <span>DIAN AUDITORIUM</span>
            </div>
            <span className="hidden md:block" style={{ color: '#D96A1D' }}>✦</span>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: '#D96A1D' }} />
              <span>16:30 - 22:00</span>
            </div>
          </motion.div>

          <motion.button
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-5 font-montserrat text-sm tracking-widest uppercase flex items-center gap-4 mx-auto group relative overflow-hidden transition-all duration-500 hand-drawn-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            whileHover={{ scale: 1.05, y: -3, rotate: 1 }}
            style={{
              color: '#0B3A0A',
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '4px 4px 0px rgba(217, 106, 29, 0.25)',
              transform: 'rotate(-0.5deg)',
              borderColor: '#D96A1D'
            }}
          >
            <span className="relative z-10">RESERVE YOUR SEAT</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8 font-montserrat text-xs tracking-[0.3em] uppercase"
            style={{ color: '#C93A1D' }}
          >
            Every Story Begins with a Little Sparkle ✨
          </motion.p>
        </motion.div>
      </section>

      {/* About Section - Organic Shapes */}
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
              {/* Floating Blobs */}
              <div className="absolute -top-12 -left-12 w-24 h-24 organic-blob" style={{ background: '#F08A2B', opacity: 0.3 }}></div>
              <div className="absolute -bottom-12 -right-12 w-28 h-28 organic-blob-2" style={{ background: '#6D8F2B', opacity: 0.25 }}></div>
              
              <div className="relative p-12 bg-white/70 backdrop-blur-sm" style={{
                borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                boxShadow: '8px 8px 0px rgba(217, 106, 29, 0.15), 0 10px 30px rgba(217, 106, 29, 0.1)',
                border: '3px dashed #4C7A1A',
                transform: 'rotate(-0.5deg)'
              }}>
                <div className="mb-6">
                  <span className="font-montserrat text-xs tracking-[0.4em] uppercase inline-block px-5 py-2 hand-drawn-border" style={{ 
                    color: '#D96A1D',
                    borderColor: '#D96A1D',
                    background: 'rgba(217, 106, 29, 0.08)',
                    transform: 'rotate(1deg)'
                  }}>Annual Celebration</span>
                </div>
                
                <h3 className="font-cinzel text-5xl md:text-6xl mb-6 leading-tight" style={{ color: '#0B3A0A' }}>
                  Shaping Dreams,<br />
                  Honoring Excellence
                </h3>
                
                <svg className="mb-8" width="120" height="6" viewBox="0 0 120 6">
                  <path d="M 2 3 Q 30 0, 60 3 T 118 3" stroke="#D96A1D" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
                
                <p className="font-montserrat text-lg leading-relaxed mb-6" style={{ color: '#4C7A1A' }}>
                  The Universitas Ciputra Awarding Night is an annual formal event recognizing students who have excelled in <span style={{ color: '#D96A1D', fontWeight: 600 }}>academics, leadership, entrepreneurship, and creativity</span>.
                </p>
                
                <p className="font-cormorant text-lg leading-relaxed italic" style={{ color: '#6D8F2B' }}>
                  Beyond recognition, we aim to inspire and motivate by showcasing excellence and dedication, encouraging others to strive for meaningful achievements within their community.
                </p>

                <Star className="absolute -top-4 -right-4 w-10 h-10" style={{ 
                  color: '#F08A2B', 
                  fill: '#F08A2B',
                  transform: 'rotate(20deg)',
                  animation: 'twinkle 3s ease-in-out infinite'
                }} />
                <Heart className="absolute -bottom-4 -left-4 w-8 h-8" style={{ 
                  color: '#C93A1D', 
                  fill: '#C93A1D',
                  transform: 'rotate(-15deg)'
                }} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="relative overflow-hidden" style={{
                borderRadius: '15px 255px 15px 225px/225px 15px 255px 15px',
                border: '4px solid #D96A1D',
                boxShadow: '10px 10px 0px rgba(76, 122, 26, 0.15)',
                transform: 'rotate(0.5deg)'
              }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1768508950778-9ba70d4445e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZm9ybWFsJTIwZXZlbnQlMjBnYWxhJTIwZGlubmVyfGVufDF8fHx8MTc3ODE1MTEyMXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Elegant event"
                  className="w-full h-[550px] object-cover"
                />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(to top, rgba(244, 231, 203, 0.8), transparent)'
                }}></div>
                <div className="absolute bottom-0 left-0 right-0 p-8" style={{
                  background: 'linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(244, 231, 203, 0.9))',
                  borderTop: '3px dashed #4C7A1A'
                }}>
                  <span className="font-cormorant text-2xl italic" style={{ color: '#0B3A0A' }}>A Night of Excellence</span>
                </div>
              </div>
              
              <Sparkles className="absolute -top-6 -left-6 w-12 h-12" style={{ 
                color: '#4C7A1A',
                animation: 'twinkle 3s ease-in-out infinite',
                transform: 'rotate(-25deg)'
              }} />
              <div className="absolute -top-4 -right-4 w-10 h-10 organic-blob" style={{ background: '#D96A1D', opacity: 0.7 }}></div>
              <Heart className="absolute -bottom-6 -left-6 w-10 h-10" style={{ 
                color: '#F08A2B', 
                fill: '#F08A2B',
                transform: 'rotate(15deg)'
              }} />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 organic-blob-2" style={{ background: '#6D8F2B', opacity: 0.6 }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Details - Organic Card Layout */}
      <section className="relative py-24 px-6" style={{ background: 'linear-gradient(to bottom, rgba(237, 224, 212, 0.3), transparent)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <span className="font-montserrat text-xs tracking-[0.4em] uppercase px-6 py-2 inline-block hand-drawn-border" style={{ 
                color: '#C93A1D',
                borderColor: '#C93A1D',
                background: 'rgba(255, 255, 255, 0.8)',
                transform: 'rotate(-1deg)'
              }}>Event Details</span>
            </div>
            <h3 className="font-cinzel text-5xl md:text-6xl leading-tight mb-5" style={{ color: '#0B3A0A' }}>
              Everything You Need to Know
            </h3>
            <svg className="mx-auto" width="200" height="8" viewBox="0 0 200 8">
              <path d="M 5 4 Q 50 0, 100 4 T 195 4" stroke="#D96A1D" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <circle cx="100" cy="4" r="3" fill="#F08A2B"/>
            </svg>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Event Card - Organic */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 p-10 relative bg-white/85 backdrop-blur-sm"
              style={{
                borderRadius: '225px 15px 255px 15px/15px 255px 15px 225px',
                boxShadow: '10px 10px 0px rgba(217, 106, 29, 0.15)',
                border: '3px dashed #4C7A1A',
                transform: 'rotate(-0.3deg)'
              }}
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 organic-blob" style={{ background: '#F08A2B', opacity: 0.5 }}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ 
                    background: 'rgba(217, 106, 29, 0.12)',
                    border: '3px dotted #D96A1D'
                  }}>
                    <Calendar className="w-10 h-10" style={{ color: '#D96A1D' }} />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-5xl" style={{ color: '#0B3A0A' }}>May 29, 2026</h4>
                    <p className="font-montserrat text-sm tracking-wide" style={{ color: '#6D8F2B' }}>Thursday Evening</p>
                  </div>
                </div>

                <svg className="mb-8 w-full" height="4" viewBox="0 0 400 4">
                  <path d="M 2 2 L 398 2" stroke="#D96A1D" strokeWidth="2" strokeDasharray="8,5" strokeLinecap="round"/>
                </svg>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-3" style={{ color: '#D96A1D' }}>
                      <Clock className="w-6 h-6" />
                      <span className="font-montserrat text-xs tracking-widest uppercase">Time</span>
                    </div>
                    <p className="font-cinzel text-4xl" style={{ color: '#0B3A0A' }}>16:30 - 22:00</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-3" style={{ color: '#D96A1D' }}>
                      <MapPin className="w-6 h-6" />
                      <span className="font-montserrat text-xs tracking-widest uppercase">Venue</span>
                    </div>
                    <p className="font-cinzel text-3xl" style={{ color: '#0B3A0A' }}>Dian Auditorium</p>
                    <p className="font-montserrat text-sm" style={{ color: '#6D8F2B' }}>Floor 7, UC Main Building</p>
                  </div>
                </div>

                <a 
                  href="https://maps.app.goo.gl/NDzTsk9A4draMqkk9?g_st=ic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-3 px-8 py-4 font-montserrat text-xs tracking-widest uppercase transition-all duration-300 hand-drawn-border hover:-translate-y-1 hover:rotate-1"
                  style={{
                    borderColor: '#4C7A1A',
                    color: '#0B3A0A',
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '3px 3px 0px rgba(76, 122, 26, 0.2)'
                  }}
                >
                  GET DIRECTIONS
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              
              <Star className="absolute top-6 right-6 w-8 h-8" style={{ 
                color: '#F08A2B', 
                fill: '#F08A2B', 
                animation: 'twinkle 3s ease-in-out infinite',
                transform: 'rotate(25deg)'
              }} />
            </motion.div>

            {/* Dress Code Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 p-8 relative bg-white/85 backdrop-blur-sm"
              style={{
                borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px',
                boxShadow: '8px 8px 0px rgba(76, 122, 26, 0.15)',
                border: '3px dashed #D96A1D',
                transform: 'rotate(0.5deg)'
              }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ 
                background: 'rgba(76, 122, 26, 0.12)',
                border: '3px dotted #4C7A1A'
              }}>
                <Users className="w-8 h-8" style={{ color: '#4C7A1A' }} />
              </div>
              <h4 className="font-cinzel text-4xl mb-4" style={{ color: '#0B3A0A' }}>Dress Code</h4>
              <p className="font-cormorant text-3xl mb-3 italic" style={{ color: '#D96A1D' }}>Formal Earth Tone</p>
              <p className="font-montserrat text-sm tracking-wide leading-relaxed" style={{ color: '#6D8F2B' }}>
                Browns · Beiges · Creams · Terracotta · Olive
              </p>
              
              <Heart className="absolute -bottom-4 -right-4 w-10 h-10" style={{ 
                color: '#C93A1D', 
                fill: '#C93A1D',
                transform: 'rotate(-20deg)'
              }} />
            </motion.div>

            {/* Performance Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5 relative overflow-hidden group"
              style={{ 
                borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                boxShadow: '8px 8px 0px rgba(76, 122, 26, 0.15)',
                border: '4px solid #F08A2B',
                transform: 'rotate(-0.4deg)'
              }}
            >
              <div className="absolute inset-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1771833727474-376bf191a7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjBsaXZlJTIwcGVyZm9ybWFuY2UlMjBlbGVnYW50fGVufDF8fHx8MTc3ODE1MTEyMXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Performance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(to top, rgba(244, 231, 203, 0.95), rgba(244, 231, 203, 0.6), transparent)'
                }}></div>
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="mb-4">
                  <div className="inline-block px-4 py-2 hand-drawn-border" style={{
                    borderColor: '#D96A1D',
                    background: 'rgba(255, 255, 255, 0.95)',
                    transform: 'rotate(-1deg)'
                  }}>
                    <span className="font-montserrat text-xs tracking-wider uppercase" style={{ color: '#D96A1D' }}>Featured</span>
                  </div>
                </div>
                <h4 className="font-cinzel text-3xl mb-2" style={{ color: '#0B3A0A' }}>Special Musical Performance</h4>
                <p className="font-montserrat text-sm" style={{ color: '#4C7A1A' }}>Live entertainment throughout the evening</p>
              </div>
              
              <Sparkles className="absolute top-6 right-6 w-10 h-10" style={{ 
                color: '#F08A2B', 
                animation: 'twinkle 2.5s ease-in-out infinite',
                transform: 'rotate(-30deg)'
              }} />
            </motion.div>

            {/* Door Prize Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="lg:col-span-7 p-8 relative bg-white/85 backdrop-blur-sm"
              style={{
                borderRadius: '15px 255px 15px 225px/225px 15px 255px 15px',
                boxShadow: '8px 8px 0px rgba(217, 106, 29, 0.15)',
                border: '3px dashed #C93A1D',
                transform: 'rotate(0.3deg)'
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ 
                    background: 'rgba(201, 58, 29, 0.12)',
                    border: '3px dotted #C93A1D'
                  }}>
                    <Gift className="w-10 h-10" style={{ color: '#C93A1D' }} />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-3xl mb-1" style={{ color: '#0B3A0A' }}>Door Prize & Souvenirs</h4>
                    <p className="font-montserrat text-xs tracking-wider uppercase" style={{ color: '#D96A1D' }}>Exclusive Rewards</p>
                  </div>
                </div>
                <div className="space-y-3 font-montserrat text-sm leading-relaxed" style={{ color: '#4C7A1A' }}>
                  <p>All attendees receive exclusive UCAN 2026 souvenirs to commemorate this special evening.</p>
                  <p style={{ color: '#6D8F2B' }}>Stay until the end for a chance to win exciting door prizes announced during the event.</p>
                </div>
              </div>
              
              <div className="absolute -top-4 -left-4 w-12 h-12 organic-blob" style={{ background: '#F08A2B', opacity: 0.6 }}></div>
              <Star className="absolute -bottom-4 -right-4 w-10 h-10" style={{ 
                color: '#4C7A1A', 
                fill: '#4C7A1A',
                transform: 'rotate(35deg)'
              }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <motion.section 
        id="rsvp" 
        className="relative py-24 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-3xl mx-auto relative">
          <div className="mb-16 text-center">
            <div className="inline-block mb-6">
              <span className="font-montserrat text-xs tracking-[0.4em] uppercase px-6 py-2 inline-block hand-drawn-border" style={{ 
                color: '#D96A1D',
                borderColor: '#D96A1D',
                background: 'rgba(255, 255, 255, 0.95)',
                transform: 'rotate(-0.5deg)'
              }}>Confirm Attendance</span>
            </div>
            <h3 className="font-cinzel text-5xl md:text-6xl mb-5 leading-tight" style={{ color: '#0B3A0A' }}>RSVP</h3>
            <svg className="mx-auto mb-6" width="150" height="8" viewBox="0 0 150 8">
              <path d="M 5 4 Q 37.5 0, 75 4 T 145 4" stroke="#D96A1D" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
            <p className="font-montserrat tracking-wide" style={{ color: '#6D8F2B' }}>Login with your student account to reserve your seat</p>
          </div>
          
          {!isSubmitted ? (
            <div className="p-12 relative bg-white/90 backdrop-blur-sm" style={{
              borderRadius: '225px 15px 255px 15px/15px 255px 15px 225px',
              boxShadow: '12px 12px 0px rgba(217, 106, 29, 0.15)',
              border: '3px dashed #4C7A1A'
            }}>
              <Star className="absolute -top-4 -left-4 w-10 h-10" style={{ 
                color: '#F08A2B', 
                fill: '#F08A2B',
                transform: 'rotate(20deg)',
                animation: 'twinkle 3s ease-in-out infinite'
              }} />
              <Heart className="absolute -top-4 -right-4 w-9 h-9" style={{ 
                color: '#C93A1D', 
                fill: '#C93A1D',
                transform: 'rotate(-15deg)'
              }} />
              <Sparkles className="absolute -bottom-4 -left-4 w-9 h-9" style={{ 
                color: '#4C7A1A',
                transform: 'rotate(10deg)',
                animation: 'twinkle 4s ease-in-out infinite'
              }} />
              <div className="absolute -bottom-4 -right-4 w-10 h-10 organic-blob" style={{ background: '#D96A1D', opacity: 0.7 }}></div>
              
              {!isLoggedIn ? (
                <div className="text-center py-16">
                  <p className="font-montserrat mb-10 tracking-wide text-lg" style={{ color: '#4C7A1A' }}>Student account authentication required</p>
                  <button
                    onClick={() => setIsLoggedIn(true)}
                    className="px-10 py-5 font-montserrat text-sm tracking-widest uppercase transition-all duration-500 inline-flex items-center gap-3 hand-drawn-border hover:-translate-y-2 hover:rotate-1"
                    style={{
                      borderColor: '#D96A1D',
                      color: '#0B3A0A',
                      background: 'rgba(255, 255, 255, 0.95)',
                      boxShadow: '4px 4px 0px rgba(217, 106, 29, 0.2)'
                    }}
                  >
                    LOGIN WITH STUDENT ACCOUNT
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div>
                    <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-4 bg-transparent focus:outline-none font-cormorant text-2xl transition-colors"
                      placeholder="Enter your full name"
                      style={{
                        borderBottom: '2px dashed #EEDDBA',
                        color: '#0B3A0A'
                      }}
                      onFocus={(e) => e.target.style.borderBottom = '2px dashed #D96A1D'}
                      onBlur={(e) => e.target.style.borderBottom = '2px dashed #EEDDBA'}
                    />
                  </div>

                  <div>
                    <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>NIM (Student ID)</label>
                    <input
                      type="text"
                      name="nim"
                      value={formData.nim}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-4 bg-transparent focus:outline-none font-cormorant text-2xl transition-colors"
                      placeholder="Enter your NIM"
                      style={{
                        borderBottom: '2px dashed #EEDDBA',
                        color: '#0B3A0A'
                      }}
                      onFocus={(e) => e.target.style.borderBottom = '2px dashed #D96A1D'}
                      onBlur={(e) => e.target.style.borderBottom = '2px dashed #EEDDBA'}
                    />
                  </div>

                  <div>
                    <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>Major / Program Studi</label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-4 bg-transparent focus:outline-none font-cormorant text-2xl transition-colors"
                      placeholder="Enter your major"
                      style={{
                        borderBottom: '2px dashed #EEDDBA',
                        color: '#0B3A0A'
                      }}
                      onFocus={(e) => e.target.style.borderBottom = '2px dashed #D96A1D'}
                      onBlur={(e) => e.target.style.borderBottom = '2px dashed #EEDDBA'}
                    />
                  </div>

                  <div>
                    <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>Organization</label>
                    <select
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-4 bg-transparent focus:outline-none font-cormorant text-2xl transition-colors"
                      style={{
                        borderBottom: '2px dashed #EEDDBA',
                        color: '#0B3A0A'
                      }}
                      onFocus={(e) => e.target.style.borderBottom = '2px dashed #D96A1D'}
                      onBlur={(e) => e.target.style.borderBottom = '2px dashed #EEDDBA'}
                    >
                      <option value="" style={{ background: '#F4E7CB', color: '#6D8F2B' }}>Select your organization</option>
                      {organizations.map((org, index) => (
                        <option key={index} value={org} style={{ background: '#F4E7CB', color: '#0B3A0A' }}>{org}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-12 px-8 py-6 font-montserrat text-sm tracking-widest uppercase transition-all duration-500 hover:-translate-y-2"
                    style={{
                      borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                      background: '#D96A1D',
                      color: '#F4E7CB',
                      boxShadow: '6px 6px 0px rgba(11, 58, 10, 0.25)',
                      border: 'none'
                    }}
                  >
                    SUBMIT RSVP
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="p-16 text-center relative bg-white/95 backdrop-blur-sm" style={{
              borderRadius: '225px 15px 255px 15px/15px 255px 15px 225px',
              boxShadow: '12px 12px 0px rgba(217, 106, 29, 0.15)',
              border: '3px dashed #4C7A1A'
            }}>
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8" style={{ 
                background: 'rgba(217, 106, 29, 0.12)',
                border: '3px dotted #D96A1D'
              }}>
                <Star className="w-12 h-12" style={{ color: '#D96A1D', fill: '#D96A1D' }} />
              </div>
              <h4 className="font-cinzel text-5xl mb-6" style={{ color: '#0B3A0A' }}>RSVP Confirmed</h4>
              <p className="font-cormorant text-3xl mb-3 italic" style={{ color: '#D96A1D' }}>{formData.name}</p>
              <p className="font-montserrat mb-2" style={{ color: '#6D8F2B' }}>We look forward to celebrating with you</p>
              <p className="font-montserrat text-sm tracking-wider" style={{ color: '#4C7A1A' }}>May 29, 2026 · Dian Auditorium</p>
              
              <Heart className="absolute -top-4 -left-4 w-10 h-10" style={{ 
                color: '#C93A1D', 
                fill: '#C93A1D',
                transform: 'rotate(25deg)'
              }} />
              <Star className="absolute -top-4 -right-4 w-10 h-10" style={{ 
                color: '#F08A2B', 
                fill: '#F08A2B',
                transform: 'rotate(-20deg)',
                animation: 'twinkle 3s ease-in-out infinite'
              }} />
              <Sparkles className="absolute -bottom-4 -left-4 w-10 h-10" style={{ 
                color: '#4C7A1A',
                transform: 'rotate(-10deg)'
              }} />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 organic-blob" style={{ background: '#D96A1D', opacity: 0.6 }}></div>
            </div>
          )}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative py-16 px-6" style={{
        background: 'rgba(237, 224, 212, 0.5)',
        borderTop: '2px dashed #D96A1D'
      }}>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h4 className="font-cinzel text-4xl mb-3" style={{ color: '#0B3A0A' }}>Universitas Ciputra</h4>
              <p className="font-lora text-2xl italic" style={{ color: '#D96A1D' }}>Shaping Dreams, Honoring Excellence</p>
            </div>
            
            <div className="flex flex-col md:items-end gap-4 font-montserrat text-sm" style={{ color: '#6D8F2B' }}>
              <a 
                href="https://maps.app.goo.gl/NDzTsk9A4draMqkk9?g_st=ic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-colors flex items-center gap-2 hover:underline"
                style={{ color: '#4C7A1A' }}
              >
                <MapPin className="w-5 h-5" />
                Dian Auditorium, Floor 7
              </a>
              <span className="tracking-wider" style={{ color: '#6D8F2B' }}>May 29, 2026 · 16:30 - 22:00</span>
            </div>
          </div>

          <svg className="mx-auto mb-10" width="300" height="4" viewBox="0 0 300 4">
            <path d="M 2 2 L 298 2" stroke="#D96A1D" strokeWidth="2" strokeDasharray="6,4" strokeLinecap="round"/>
          </svg>
          
          <div className="text-center">
            <p className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#6D8F2B' }}>
              © 2026 Universitas Ciputra. All rights reserved.
            </p>
          </div>

          <div className="absolute top-8 left-8 w-16 h-16 organic-blob" style={{ background: '#F08A2B', opacity: 0.2 }}></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 organic-blob-2" style={{ background: '#4C7A1A', opacity: 0.15 }}></div>
        </div>
      </footer>
    </div>
  );
}