import React, { useState } from 'react';
import { Star, Heart, Sparkles, ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { motion, AnimatePresence } from 'framer-motion';

interface RSVPFormProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  showBorder?: boolean;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export function RSVPForm({ isLoggedIn, onLogin, showBorder: _showBorder, containerRef }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    major: '',
    organization: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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

  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    if (name === 'name' && value.trim().length < 3) {
      errorMsg = 'Your true name is too brief for the scrolls';
    } else if (name === 'nim' && !/^\d{8,12}$/.test(value)) {
      errorMsg = 'The royal ID must be 8 to 12 mystical digits';
    } else if (name === 'major' && value.trim().length < 2) {
      errorMsg = 'Pray, tell us which field of study you pursue';
    } else if (name === 'organization' && !value) {
      errorMsg = 'Choose the guild you represent in this quest';
    }
    setValidationErrors(prev => ({ ...prev, [name]: errorMsg }));
    return !errorMsg;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('Please login with your student account to RSVP');
      return;
    }

    // Validate all fields
    const isNameValid = validateField('name', formData.name);
    const isNimValid = validateField('nim', formData.nim);
    const isMajorValid = validateField('major', formData.major);
    const isOrgValid = validateField('organization', formData.organization);

    if (!isNameValid || !isNimValid || !isMajorValid || !isOrgValid) {
      setError('Please fix the errors in the form before submitting.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          email: (window as any).__ciputraEmail
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit RSVP. Please try again.');
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('RSVP submit error:', err);
      setError('Network error. Unable to connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Animation variants for staggered form fields
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="p-16 text-center relative parchment-bg overflow-hidden"
          style={{
            borderRadius: '255px 25px 225px 25px/25px 225px 25px 255px',
            boxShadow: '12px 12px 0px rgba(217, 106, 29, 0.15)',
            border: '2px solid rgba(217, 106, 29, 0.3)'
          }}
        >
          <div className="absolute inset-0 sketch-line opacity-5 pointer-events-none" />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 relative bg-brand-orange/10 border-2 border-dashed border-brand-orange" 
          >
            <Star className="w-12 h-12 absolute text-brand-orange fill-brand-orange" />
          </motion.div>
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-cinzel text-5xl mb-6 text-brand-green" 
          >
            RSVP Confirmed
          </motion.h4>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-cormorant text-3xl mb-3 italic text-brand-orange" 
          >
            {formData.name}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="font-montserrat mb-2 text-brand-green-accent" 
          >
            We look forward to celebrating with you
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-montserrat text-sm tracking-wider text-brand-green-accent" 
          >
            May 29, 2026 · Dian Auditorium
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}>
            <Heart className="absolute -top-4 -left-4 w-10 h-10 text-brand-red fill-brand-red rotate-[25deg]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 }}>
            <Star className="absolute -top-4 -right-4 w-10 h-10 animate-twinkle text-brand-orange fill-brand-orange -rotate-[20deg]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6 }}>
            <Sparkles className="absolute -bottom-4 -left-4 w-10 h-10 text-brand-green-accent -rotate-[10deg]" />
          </motion.div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 organic-blob bg-brand-orange/60"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-4xl" ref={containerRef}>
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div 
            key="login-portal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50, filter: "blur(20px)" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="p-10 md:p-20 text-center relative overflow-hidden flex flex-col items-center bg-white/80 backdrop-blur-3xl shadow-[0_40px_120px_-20px_rgba(11,58,10,0.3)] border-t-2 border-brand-orange/30"
            style={{
              borderRadius: '4px',
              border: '12px double rgba(217, 106, 29, 0.4)',
              outline: '1px solid rgba(217, 106, 29, 0.1)',
              outlineOffset: '8px'
            }}
          >
            {/* Animated Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [-20, -100],
                  x: Math.random() * 200 - 100
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.8
                }}
                className="absolute w-1 h-1 bg-brand-orange rounded-full pointer-events-none"
                style={{ bottom: '20%', left: `${20 + i * 15}%` }}
              />
            ))}

            {/* Ornate Corner Decorations */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-brand-orange/40 rounded-tl-sm -m-2" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-brand-orange/40 rounded-tr-sm -m-2" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-brand-orange/40 rounded-bl-sm -m-2" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-brand-orange/40 rounded-br-sm -m-2" />

            <div className="absolute inset-0 sketch-line opacity-5 pointer-events-none" />
            
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotateY: [0, 15, -15, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="mb-10 relative perspective-[1000px]"
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-brand-orange via-brand-gold to-brand-orange flex items-center justify-center shadow-[0_15px_40px_rgba(217,106,29,0.4)] border-4 border-white/20">
                <Lock className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="absolute -inset-6 bg-brand-orange/20 blur-2xl rounded-full -z-10 animate-pulse" />
              <div className="absolute -top-4 -right-4">
                <Sparkles className="w-8 h-8 text-brand-orange animate-twinkle" />
              </div>
            </motion.div>

            <span className="font-montserrat text-[10px] tracking-[0.6em] uppercase text-brand-orange mb-6 font-bold flex items-center gap-4">
              <div className="w-8 h-px bg-brand-orange/40" />
              The Royal Gate
              <div className="w-8 h-px bg-brand-orange/40" />
            </span>

            <h2 className="font-cinzel text-4xl md:text-7xl mb-8 text-brand-green leading-tight">
              Unlock the <br/><span className="text-brand-orange italic drop-shadow-sm">Grand Invitation</span>
            </h2>
            
            <p className="font-cormorant italic text-2xl md:text-3xl mb-14 text-brand-green-accent max-w-2xl leading-relaxed">
              "Only the chosen of Ciputra may pass these golden gates. Present your magical student credentials to proceed to the royal guestbook."
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 group"
            >
              <div className="absolute -inset-4 bg-brand-orange/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-1 rounded-2xl bg-gradient-to-r from-brand-orange via-brand-gold to-brand-orange shadow-2xl">
                <div className="bg-white rounded-[14px] p-2 overflow-hidden">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (credentialResponse.credential) {
                        try {
                          const decoded = jwtDecode(credentialResponse.credential);
                          const email = (decoded as any).email;
                          
                          if (!email || (!email.endsWith('@student.ciputra.ac.id') && !email.endsWith('@staff.ciputra.ac.id') && !email.endsWith('.ciputra.ac.id'))) {
                            setError('Only official @ciputra.ac.id accounts possess the magic to enter');
                            return;
                          }
                          
                          if (decoded && (decoded as any).name) {
                            setFormData(prev => ({ ...prev, name: (decoded as any).name }));
                          }
                          (window as any).__ciputraEmail = email;
                          setError('');
                          onLogin();
                        } catch (e) {
                          console.error("Error decoding JWT", e);
                          setError('The portal magic flickered. Please try again.');
                        }
                      }
                    }}
                    onError={() => {
                      setError('The golden portal is momentarily closed. Try again later.');
                    }}
                    theme="filled_blue"
                    shape="pill"
                    size="large"
                    text="signin_with"
                    width="340"
                  />
                </div>
              </div>
            </motion.div>
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-10 px-8 py-4 bg-red-50 border border-red-200 text-red-600 font-montserrat text-xs rounded-full flex items-center gap-4 shadow-sm"
                >
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  <span className="tracking-wide">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-20 flex items-center gap-8 opacity-40">
              <div className="h-px w-20 bg-brand-green" />
              <Star className="w-5 h-5 text-brand-orange" />
              <div className="h-px w-20 bg-brand-green" />
            </div>
          </motion.div>

        ) : (
          <motion.div 
            key="rsvp-form"
            layout
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="p-8 md:p-14 relative parchment-bg overflow-hidden shadow-[0_20px_50px_rgba(11,58,10,0.15)]" 
            style={{
              borderRadius: '4px',
              border: '2px solid rgba(217, 106, 29, 0.2)',
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png"), radial-gradient(circle at center, transparent 0%, rgba(217, 106, 29, 0.03) 100%)'
            }}
          >
            <div className="absolute inset-0 sketch-line opacity-[0.03] pointer-events-none" />
            
            <div className="flex flex-col items-center text-center mb-12 relative">
              <div className="absolute -top-10 flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 text-brand-orange/40 animate-twinkle`} style={{ animationDelay: `${i * 0.5}s` }} />
                ))}
              </div>
              <span className="px-6 py-1.5 mb-6 font-montserrat text-[10px] tracking-[0.5em] uppercase text-brand-orange bg-brand-orange/5 border border-brand-orange/20 rounded-full">
                Identity Verified
              </span>
              <h2 className="font-cinzel text-4xl md:text-6xl text-brand-green mb-3">Royal Guestbook</h2>
              <p className="font-cormorant italic text-2xl text-brand-green-accent">Sign your name in the eternal scrolls</p>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent mt-6 rounded-full" />
            </div>

            <motion.form 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit} 
              className="grid md:grid-cols-2 gap-x-10 gap-y-8 relative z-10"
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="rsvp-name" className="block font-montserrat text-[10px] tracking-widest uppercase mb-3 text-brand-orange font-semibold">Full Name</label>
                <motion.div whileTap={{ scale: 0.99 }} className="relative group">
                  <input
                    id="rsvp-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => validateField('name', formData.name)}
                    required
                    className={`w-full px-5 py-3 bg-white/60 focus:bg-white/90 focus:outline-none font-cormorant text-xl transition-all duration-300 border-b-2 ${validationErrors.name ? 'border-red-400' : 'border-brand-orange/20 focus:border-brand-orange'}`}
                    placeholder="Enter your name"
                  />
                  <Star className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 text-brand-orange" />
                </motion.div>
                <AnimatePresence>
                  {validationErrors.name && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] mt-2 font-montserrat">{validationErrors.name}</motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="rsvp-nim" className="block font-montserrat text-[10px] tracking-widest uppercase mb-3 text-brand-orange font-semibold">NIM (Student ID)</label>
                <motion.div whileTap={{ scale: 0.99 }} className="relative group">
                  <input
                    id="rsvp-nim"
                    type="text"
                    name="nim"
                    value={formData.nim}
                    onChange={handleChange}
                    onBlur={() => validateField('nim', formData.nim)}
                    required
                    className={`w-full px-5 py-3 bg-white/60 focus:bg-white/90 focus:outline-none font-cormorant text-xl transition-all duration-300 border-b-2 ${validationErrors.nim ? 'border-red-400' : 'border-brand-orange/20 focus:border-brand-orange'}`}
                    placeholder="Enter your NIM"
                  />
                  <Heart className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 text-brand-red" />
                </motion.div>
                <AnimatePresence>
                  {validationErrors.nim && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] mt-2 font-montserrat">{validationErrors.nim}</motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="rsvp-major" className="block font-montserrat text-[10px] tracking-widest uppercase mb-3 text-brand-orange font-semibold">Major / Program Studi</label>
                <motion.div whileTap={{ scale: 0.99 }} className="relative group">
                  <input
                    id="rsvp-major"
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    onBlur={() => validateField('major', formData.major)}
                    required
                    className={`w-full px-5 py-3 bg-white/60 focus:bg-white/90 focus:outline-none font-cormorant text-xl transition-all duration-300 border-b-2 ${validationErrors.major ? 'border-red-400' : 'border-brand-orange/20 focus:border-brand-orange'}`}
                    placeholder="Enter your major"
                  />
                  <Sparkles className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 text-brand-green-accent" />
                </motion.div>
                <AnimatePresence>
                  {validationErrors.major && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] mt-2 font-montserrat">{validationErrors.major}</motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="rsvp-organization" className="block font-montserrat text-[10px] tracking-widest uppercase mb-3 text-brand-orange font-semibold">Organization</label>
                <motion.div whileTap={{ scale: 0.99 }} className="relative group">
                  <select
                    id="rsvp-organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    onBlur={() => validateField('organization', formData.organization)}
                    required
                    className={`w-full px-5 py-3 bg-white/60 focus:bg-white/90 focus:outline-none font-cormorant text-xl transition-all duration-300 border-b-2 appearance-none cursor-pointer ${validationErrors.organization ? 'border-red-400' : 'border-brand-orange/20 focus:border-brand-orange'}`}
                  >
                    <option value="" className="bg-parchment">Select your guild</option>
                    {organizations.map((org, index) => (
                      <option key={index} value={org} className="bg-parchment">{org}</option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-focus-within:opacity-100">
                    <Star className="w-4 h-4 text-brand-orange" />
                  </div>
                </motion.div>
                <AnimatePresence>
                  {validationErrors.organization && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] mt-2 font-montserrat">{validationErrors.organization}</motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="md:col-span-2 mt-8">
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 mb-6 rounded-lg bg-red-50 border border-red-100 text-red-700 text-center font-montserrat text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-5 font-montserrat text-xs tracking-[0.3em] uppercase transition-all duration-500 flex justify-center items-center relative overflow-hidden rounded-xl shadow-lg ${
                    isLoading ? 'bg-brand-green/40 text-white/50 cursor-not-allowed' : 'bg-brand-green text-white hover:bg-brand-green-accent'
                  }`}
                >
                  <span className="relative z-10 font-bold">{isLoading ? 'Sealing the Scroll...' : 'Sign the Guestbook'}</span>
                  {!isLoading && <ArrowRight className="w-5 h-5 relative z-10 ml-3 animate-bounce-x" />}
                </motion.button>
              </div>
            </motion.form>
            
            <Star className="absolute top-4 left-4 w-8 h-8 opacity-20 animate-twinkle text-brand-orange fill-brand-orange" />
            <Heart className="absolute bottom-4 right-4 w-8 h-8 opacity-20 text-brand-red fill-brand-red" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
