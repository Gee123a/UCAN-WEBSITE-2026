import React, { useState } from 'react';
import { Star, Heart, Sparkles } from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('Please login with your student account to RSVP');
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 relative" 
            style={{
              background: 'rgba(217, 106, 29, 0.12)',
              border: '3px dotted #D96A1D'
            }}
          >
            <Star className="w-12 h-12 absolute" style={{ color: '#D96A1D', fill: '#D96A1D' }} />
          </motion.div>
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-cinzel text-5xl mb-6" 
            style={{ color: '#0B3A0A' }}
          >
            RSVP Confirmed
          </motion.h4>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-cormorant text-3xl mb-3 italic" 
            style={{ color: '#D96A1D' }}
          >
            {formData.name}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="font-montserrat mb-2" 
            style={{ color: '#6D8F2B' }}
          >
            We look forward to celebrating with you
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-montserrat text-sm tracking-wider" 
            style={{ color: '#4C7A1A' }}
          >
            May 29, 2026 · Dian Auditorium
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}>
            <Heart className="absolute -top-4 -left-4 w-10 h-10" style={{ color: '#C93A1D', fill: '#C93A1D', transform: 'rotate(25deg)' }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 }}>
            <Star className="absolute -top-4 -right-4 w-10 h-10 animate-twinkle" style={{ color: '#F08A2B', fill: '#F08A2B', transform: 'rotate(-20deg)' }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6 }}>
            <Sparkles className="absolute -bottom-4 -left-4 w-10 h-10" style={{ color: '#4C7A1A', transform: 'rotate(-10deg)' }} />
          </motion.div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 organic-blob" style={{ background: '#D96A1D', opacity: 0.6 }}></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`relative mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoggedIn ? 'max-w-4xl' : 'max-w-xl'}`} ref={containerRef}>
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="p-8 md:p-14 relative parchment-bg overflow-hidden" 
        style={{
          borderRadius: '8px 32px 8px 32px / 32px 8px 32px 8px',
          boxShadow: '0 10px 40px -10px rgba(109, 143, 43, 0.15), inset 0 0 60px rgba(217, 106, 29, 0.05)',
          border: '1px solid rgba(217, 106, 29, 0.2)'
        }}
      >
        <div className="absolute inset-0 sketch-line opacity-[0.03] pointer-events-none" />
        
        {/* Softened Decorative Flourishes */}
        <Star className="absolute top-4 left-4 w-8 h-8 opacity-40 animate-twinkle" style={{ color: '#F08A2B', fill: '#F08A2B', transform: 'rotate(20deg)' }} />
        <Heart className="absolute top-4 right-4 w-7 h-7 opacity-40" style={{ color: '#C93A1D', fill: '#C93A1D', transform: 'rotate(-15deg)' }} />
        <Sparkles className="absolute bottom-4 left-4 w-8 h-8 opacity-40 animate-twinkle" style={{ color: '#4C7A1A', transform: 'rotate(10deg)' }} />
        <div className="absolute -bottom-4 -right-4 w-24 h-24 organic-blob blur-2xl" style={{ background: '#D96A1D', opacity: 0.15 }}></div>

        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div 
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="text-center py-12 md:py-20 flex flex-col items-center relative z-10"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-cinzel text-4xl md:text-5xl mb-3" 
                style={{ color: '#0B3A0A' }}
              >
                Reserve Your Seat
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-montserrat mb-12 tracking-wider text-sm md:text-base italic" 
                style={{ color: '#6D8F2B' }}
              >
                Student authentication required to proceed
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.9)", boxShadow: "0 10px 25px -5px rgba(217, 106, 29, 0.2)" }}
                className="bg-white/70 backdrop-blur-md border border-white/60 shadow-sm rounded-2xl p-8 flex flex-col items-center gap-4 transition-all duration-300"
              >
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                      try {
                        const decoded = jwtDecode(credentialResponse.credential);
                        const email = (decoded as any).email;
                        
                        // Validate email domain
                        if (!email || (!email.endsWith('@student.ciputra.ac.id') && !email.endsWith('@staff.ciputra.ac.id') && !email.endsWith('.ciputra.ac.id'))) {
                          setError('Please use your ciputra.ac.id email account ');
                          return;
                        }
                        
                        if (decoded && (decoded as any).name) {
                          setFormData(prev => ({ ...prev, name: (decoded as any).name }));
                        }
                        // Store email for form submission
                        (window as any).__ciputraEmail = email;
                        setError('');
                        onLogin();
                      } catch (e) {
                        console.error("Error decoding JWT", e);
                        setError('Failed to verify account. Please try again.');
                      }
                    }
                  }}
                  onError={() => {
                    setError('Google Login Failed');
                  }}
                  useOneTap
                />
              </motion.div>
              
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-600 mt-6 font-montserrat text-sm"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 font-cormorant text-sm opacity-80" 
                style={{ color: '#4C7A1A' }}
              >
                Please use your @ciputra.ac.id account
              </motion.p>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit} 
              className="space-y-10 relative z-10"
            >
              <motion.div variants={itemVariants}>
                <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>Full Name</label>
                <motion.div whileTap={{ scale: 0.995 }} className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/60 focus:bg-white/90 focus:outline-none font-cormorant text-2xl transition-all duration-300 shadow-sm focus:shadow-md"
                    placeholder="Enter your full name"
                    style={{
                      borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                      border: '2px solid rgba(238, 221, 186, 0.8)',
                      color: '#0B3A0A'
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#D96A1D')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(238, 221, 186, 0.8)')}
                  />
                  <Star className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-20 group-focus-within:opacity-100 group-focus-within:text-[#D96A1D] transition-all duration-500" style={{ color: '#D96A1D' }} />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>NIM (Student ID)</label>
                <motion.div whileTap={{ scale: 0.995 }} className="relative group">
                  <input
                    type="text"
                    name="nim"
                    value={formData.nim}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/60 focus:bg-white/90 focus:outline-none font-cormorant text-2xl transition-all duration-300 shadow-sm focus:shadow-md"
                    placeholder="Enter your NIM"
                    style={{
                      borderRadius: '15px 255px 15px 225px/225px 15px 255px 15px',
                      border: '2px solid rgba(238, 221, 186, 0.8)',
                      color: '#0B3A0A'
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#D96A1D')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(238, 221, 186, 0.8)')}
                  />
                  <Heart className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-20 group-focus-within:opacity-100 group-focus-within:text-[#C93A1D] transition-all duration-500" style={{ color: '#C93A1D' }} />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>Major / Program Studi</label>
                <motion.div whileTap={{ scale: 0.995 }} className="relative group">
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/60 focus:bg-white/90 focus:outline-none font-cormorant text-2xl transition-all duration-300 shadow-sm focus:shadow-md"
                    placeholder="Enter your major"
                    style={{
                      borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                      border: '2px solid rgba(238, 221, 186, 0.8)',
                      color: '#0B3A0A'
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#D96A1D')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(238, 221, 186, 0.8)')}
                  />
                  <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-20 group-focus-within:opacity-100 group-focus-within:text-[#4C7A1A] transition-all duration-500" style={{ color: '#4C7A1A' }} />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>Organization</label>
                <motion.div whileTap={{ scale: 0.995 }} className="relative group">
                  <select
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/60 focus:bg-white/90 focus:outline-none font-cormorant text-2xl transition-all duration-300 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    style={{
                      borderRadius: '15px 255px 15px 225px/225px 15px 255px 15px',
                      border: '2px solid rgba(238, 221, 186, 0.8)',
                      color: '#0B3A0A'
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#D96A1D')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(238, 221, 186, 0.8)')}
                  >
                    <option value="" style={{ background: '#F4E7CB', color: '#6D8F2B' }}>Select your organization</option>
                    {organizations.map((org, index) => (
                      <option key={index} value={org} style={{ background: '#F4E7CB', color: '#0B3A0A' }}>{org}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-focus-within:opacity-100 transition-all duration-500">
                    <Star className="w-5 h-5" style={{ color: '#F08A2B' }} />
                  </div>
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-md border border-red-200 bg-red-50/80 text-red-700 text-center font-montserrat text-sm">
                      {error}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={itemVariants} className="mt-12">
                <motion.button
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-8 py-6 font-montserrat text-sm tracking-widest uppercase transition-colors duration-300 flex justify-center items-center relative overflow-hidden ${
                    isLoading ? 'bg-amber-950/40 text-amber-100/50 cursor-not-allowed' : 'vintage-button-primary'
                  }`}
                >
                  {/* Subtle shine effect on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12"
                    initial={{ x: '-200%' }}
                    whileHover={{ x: '300%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                  <span className="relative z-10 font-semibold">{isLoading ? 'SUBMITTING...' : 'SUBMIT RSVP'}</span>
                  <Sparkles className="w-5 h-5 relative z-10 ml-3" />
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
