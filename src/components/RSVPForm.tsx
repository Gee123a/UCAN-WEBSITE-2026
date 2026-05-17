import React, { useState } from 'react';
import { Star, Heart, Sparkles, ArrowRight, ShieldCheck, Mail, User, GraduationCap, Building2 } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { motion, AnimatePresence } from 'framer-motion';
import DoorAsset from '../assets/assets UCAN/Ballroom/Mirror/Door.png';
import FiligreeBorder from '../assets/assets UCAN/invitation filigri/filigri_invitation card.png';

interface RSVPFormProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  showBorder?: boolean;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export function RSVPForm({ isLoggedIn, onLogin, containerRef }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    major: '',
    organization: ''
  });
  const [userEmail, setUserEmail] = useState('');
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
      errorMsg = 'Your name must be at least 3 characters';
    } else if (name === 'nim' && !/^\d{8,12}$/.test(value)) {
      errorMsg = 'NIM must be 8-12 digits';
    } else if (name === 'major' && value.trim().length < 2) {
      errorMsg = 'Please specify your major';
    } else if (name === 'organization' && !value) {
      errorMsg = 'Please select your organization';
    }
    setValidationErrors(prev => ({ ...prev, [name]: errorMsg }));
    return !errorMsg;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('Please login first');
      return;
    }

    const isNameValid = validateField('name', formData.name);
    const isNimValid = validateField('nim', formData.nim);
    const isMajorValid = validateField('major', formData.major);
    const isOrgValid = validateField('organization', formData.organization);

    if (!isNameValid || !isNimValid || !isMajorValid || !isOrgValid) {
      setError('Please fill all fields correctly');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, email: userEmail })
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Submission failed');
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('RSVP error:', err);
      setError('Connection lost. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative mx-auto max-w-2xl px-4" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="p-12 sm:p-20 text-center relative parchment-bg shadow-[0_50px_100px_-20px_rgba(217,106,29,0.3)] border-4 border-brand-orange/30 overflow-hidden"
          style={{ borderRadius: '40px 10px 40px 10px / 10px 40px 10px 40px' }}
        >
          {/* Filigree corners */}
          <div className="filigree-corner filigree-top-left" style={{ backgroundImage: `url(${FiligreeBorder})` }} />
          <div className="filigree-corner filigree-top-right" style={{ backgroundImage: `url(${FiligreeBorder})` }} />
          <div className="filigree-corner filigree-bottom-left" style={{ backgroundImage: `url(${FiligreeBorder})` }} />
          <div className="filigree-corner filigree-bottom-right" style={{ backgroundImage: `url(${FiligreeBorder})` }} />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
              className="w-24 h-24 rounded-full bg-brand-orange/10 border-2 border-dashed border-brand-orange flex items-center justify-center mx-auto mb-10"
            >
              <Star className="w-12 h-12 text-brand-orange fill-brand-orange animate-twinkle" />
            </motion.div>
            
            <h2 className="font-cinzel text-5xl sm:text-6xl mb-6 text-brand-green leading-tight">Seal of Approval</h2>
            <p className="font-cormorant text-3xl mb-8 italic text-brand-orange">Honored guest, {formData.name}</p>
            
            <div className="h-px w-32 bg-brand-orange/30 mx-auto mb-8" />
            
            <p className="font-montserrat text-sm tracking-widest text-brand-green-accent mb-4">YOUR SCROLL HAS BEEN RECORDED</p>
            <p className="font-cormorant text-xl text-brand-green-accent/80 italic mb-10">
              "We await your arrival at the grand celebration of excellence."
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-sm mx-auto p-6 bg-white/40 rounded-2xl border border-brand-orange/10">
              <div>
                <p className="text-[10px] uppercase tracking-tighter text-brand-orange mb-1">Date</p>
                <p className="font-cinzel text-sm">May 29, 2026</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-tighter text-brand-orange mb-1">Location</p>
                <p className="font-cinzel text-sm">Dian Auditorium</p>
              </div>
            </div>
          </div>

          <Sparkles className="absolute top-10 right-10 w-8 h-8 text-brand-orange/30 animate-twinkle" />
          <Heart className="absolute bottom-10 left-10 w-8 h-8 text-brand-red/20 rotate-12" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-5xl px-4" ref={containerRef}>
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div 
            key="login-view"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
            className="fairytale-frame p-6 md:p-10 text-center overflow-hidden flex flex-col items-center bg-white/90 backdrop-blur-md max-w-xl mx-auto shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-30" />
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6 relative"
            >
              <div className="w-32 h-40 sm:w-40 sm:h-48 relative flex items-end justify-center p-2 group">
                {/* Magical Arched Frame */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange to-brand-gold rounded-t-full rounded-b-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="absolute inset-[2px] border-2 border-dashed border-brand-orange rounded-t-full rounded-b-lg opacity-50" />
                
                {/* Door Container */}
                <div className="w-full h-full rounded-t-full rounded-b-lg overflow-hidden relative shadow-inner bg-brand-orange/5">
                  <img 
                    src={DoorAsset} 
                    alt="Royal Door" 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-brand-orange animate-twinkle z-30 drop-shadow-md" />
              </div>
            </motion.div>

            <h2 className="font-cinzel text-3xl md:text-5xl text-brand-green mb-4 leading-[0.9]">
              Enter the <br/><span className="text-brand-orange italic drop-shadow-sm font-black">Ballroom</span>
            </h2>
            
            <p className="font-cormorant italic text-lg md:text-xl text-brand-green-accent mb-8 max-w-md leading-relaxed">
              "A magical invitation awaits those of Ciputra blood. Present your royal crest to reveal the guestbook."
            </p>
            
            <div className="relative p-1 rounded-full bg-gradient-to-r from-brand-orange via-brand-gold to-brand-orange shadow-lg hover:scale-105 transition-transform duration-500">
              <div className="bg-white rounded-full px-4 py-2 overflow-hidden flex justify-center items-center">
                <GoogleLogin
                  onSuccess={(res) => {
                    if (res.credential) {
                      const decoded = jwtDecode(res.credential) as any;
                      const email = decoded.email;
                      if (!email?.includes('.ciputra.ac.id')) {
                        setError('Only Ciputra magical accounts may pass');
                        return;
                      }
                      setUserEmail(email);
                      setFormData(prev => ({ ...prev, name: decoded.name || '' }));
                      setError('');
                      onLogin();
                    }
                  }}
                  onError={() => setError('Portal failed to open. Try again.')}
                  theme="outline"
                  shape="pill"
                  size="large"
                  text="signin_with"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-10 px-8 py-3 bg-red-50 text-red-600 border border-red-100 rounded-full text-xs font-montserrat flex items-center gap-3"
              >
                <ShieldCheck className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="form-view"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="parchment-bg p-8 md:p-16 relative shadow-2xl border-2 border-brand-orange/20 overflow-hidden"
            style={{ borderRadius: '2px' }}
          >
            {/* Background Texture Layers */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }} />
            
            <div className="text-center mb-16 relative">
              <span className="inline-block px-4 py-1 mb-6 font-montserrat text-[10px] tracking-[0.5em] uppercase text-brand-orange border border-brand-orange/20 rounded-full bg-brand-orange/5">
                Identity Verified
              </span>
              <h2 className="font-cinzel text-5xl md:text-7xl text-brand-green mb-4">Royal Guestbook</h2>
              <p className="font-cormorant italic text-2xl text-brand-green-accent">Sign the eternal scroll of excellence</p>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent mx-auto mt-8" />
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10 relative z-10">
              <div className="space-y-8">
                <div className="relative group">
                  <label className="block font-montserrat text-[10px] tracking-[0.3em] uppercase mb-3 text-brand-orange font-bold flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    className={`w-full px-6 py-4 bg-white/40 border-b-2 transition-all font-cormorant text-2xl focus:outline-none ${validationErrors.name ? 'border-red-400' : 'border-brand-orange/10 focus:border-brand-orange'}`}
                    placeholder="Thy true name..."
                  />
                  {validationErrors.name && <p className="text-[10px] text-red-500 mt-2 font-montserrat">{validationErrors.name}</p>}
                </div>

                <div className="relative group">
                  <label className="block font-montserrat text-[10px] tracking-[0.3em] uppercase mb-3 text-brand-orange font-bold flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" /> Student ID (NIM)
                  </label>
                  <input
                    type="text" name="nim" value={formData.nim} onChange={handleChange} required
                    className={`w-full px-6 py-4 bg-white/40 border-b-2 transition-all font-cormorant text-2xl focus:outline-none ${validationErrors.nim ? 'border-red-400' : 'border-brand-orange/10 focus:border-brand-orange'}`}
                    placeholder="The royal identifier..."
                  />
                  {validationErrors.nim && <p className="text-[10px] text-red-500 mt-2 font-montserrat">{validationErrors.nim}</p>}
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative group">
                  <label className="block font-montserrat text-[10px] tracking-[0.3em] uppercase mb-3 text-brand-orange font-bold flex items-center gap-2">
                    <GraduationCap className="w-3 h-3" /> Major / Study
                  </label>
                  <input
                    type="text" name="major" value={formData.major} onChange={handleChange} required
                    className={`w-full px-6 py-4 bg-white/40 border-b-2 transition-all font-cormorant text-2xl focus:outline-none ${validationErrors.major ? 'border-red-400' : 'border-brand-orange/10 focus:border-brand-orange'}`}
                    placeholder="Field of pursuit..."
                  />
                  {validationErrors.major && <p className="text-[10px] text-red-500 mt-2 font-montserrat">{validationErrors.major}</p>}
                </div>

                <div className="relative group">
                  <label className="block font-montserrat text-[10px] tracking-[0.3em] uppercase mb-3 text-brand-orange font-bold flex items-center gap-2">
                    <Building2 className="w-3 h-3" /> Organization
                  </label>
                  <select
                    name="organization" value={formData.organization} onChange={handleChange} required
                    className={`w-full px-6 py-4 bg-white/40 border-b-2 transition-all font-cormorant text-2xl focus:outline-none cursor-pointer appearance-none ${validationErrors.organization ? 'border-red-400' : 'border-brand-orange/10 focus:border-brand-orange'}`}
                  >
                    <option value="">Select thy guild...</option>
                    {organizations.map(org => <option key={org} value={org}>{org}</option>)}
                  </select>
                  <div className="absolute right-4 bottom-5 pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
                    <Star className="w-4 h-4 text-brand-orange" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 pt-10">
                <div className="flex items-center gap-4 p-4 bg-brand-green/5 border border-brand-green/10 rounded-2xl mb-8">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-green/60 uppercase tracking-widest">Authenticated Email</p>
                    <p className="font-montserrat text-sm font-medium text-brand-green">{userEmail}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className={`w-full py-6 font-cinzel text-xl tracking-widest transition-all duration-500 relative overflow-hidden rounded-2xl shadow-xl ${
                    isLoading ? 'bg-brand-green/40 text-white/50 cursor-not-allowed' : 'bg-brand-green text-white hover:bg-brand-green-accent'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    {isLoading ? 'Sealing the Scroll...' : 'Sign the Guestbook'}
                    {!isLoading && <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
                  </span>
                  
                  {/* Subtle shimmer effect on button */}
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                  />
                </motion.button>
                
                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center text-red-500 font-montserrat text-xs tracking-wide">
                    {error}
                  </motion.p>
                )}
              </div>
            </form>
            
            {/* Corner Details */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-brand-orange/20 rounded-tl-2xl" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-brand-orange/20 rounded-br-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
