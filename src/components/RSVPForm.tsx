import React, { useState, useRef, useEffect } from 'react';
import { Star, Heart, Sparkles, ArrowRight, ShieldCheck, Mail, User, GraduationCap, Building2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';
import DoorAsset from '../assets/assets UCAN/Ballroom/Mirror/Door.webp';
import FiligreeBorder from '../assets/assets UCAN/invitation filigri/filigri_invitation card.webp';

interface CustomSelectProps {
  name: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (name: string, value: string) => void;
  error?: string;
  label: string;
  icon: React.ReactNode;
}

function CustomSelect({
  name,
  value,
  placeholder,
  options,
  onChange,
  error,
  label,
  icon
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isKeyboardRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    } else {
      const selectedIdx = options.indexOf(value);
      isKeyboardRef.current = true;
      setFocusedIndex(selectedIdx >= 0 ? selectedIdx : 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isKeyboardRef.current && focusedIndex >= 0 && optionsRefs.current[focusedIndex]) {
      optionsRefs.current[focusedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [focusedIndex]);

  const handleSelect = (optionValue: string) => {
    onChange(name, optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else if (focusedIndex >= 0 && focusedIndex < options.length) {
        handleSelect(options[focusedIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      isKeyboardRef.current = true;
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setFocusedIndex(prev => (prev + 1) % options.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      isKeyboardRef.current = true;
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setFocusedIndex(prev => (prev - 1 + options.length) % options.length);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="relative group"
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <label className="block font-montserrat text-[10px] tracking-[0.3em] uppercase mb-3 text-brand-orange font-bold flex items-center gap-2">
        {icon} {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full px-6 py-4 bg-white/40 border-b-2 transition-all font-cormorant text-xl focus:outline-none cursor-pointer flex items-center justify-between text-left ${error ? 'border-red-400 font-bold' : 'border-brand-orange/10 focus:border-brand-orange'
          }`}
      >
        <span className={`whitespace-nowrap overflow-hidden text-ellipsis mr-2 ${value ? 'text-brand-green' : 'text-gray-400/80'}`}>
          {value || placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="opacity-40 group-hover:opacity-100 transition-opacity"
        >
          <Star className="w-4 h-4 text-brand-orange fill-current" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 mt-2 z-50 bg-[#FBF6EB] border-2 border-brand-orange/30 shadow-2xl rounded-2xl overflow-hidden max-h-60 overflow-y-auto"
            role="listbox"
          >
            {options.map((option, index) => {
              const isSelected = value === option;
              const isFocused = focusedIndex === index;
              return (
                <div
                  key={option}
                  ref={el => optionsRefs.current[index] = el}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => {
                    isKeyboardRef.current = false;
                    setFocusedIndex(index);
                  }}
                  role="option"
                  aria-selected={isSelected}
                  className={`px-6 py-4 cursor-pointer font-cormorant text-xl transition-all duration-200 flex items-center justify-between outline-none ${isSelected
                    ? 'bg-brand-orange/10 text-brand-orange font-bold font-cormorant shadow-[0_0_12px_rgba(217,106,29,0.1)]'
                    : isFocused
                      ? 'bg-brand-orange/5 text-brand-orange font-bold shadow-[inset_0_0_8px_rgba(217,106,29,0.08)]'
                      : 'text-brand-green hover:bg-brand-orange/5 hover:text-brand-orange'
                    }`}
                >
                  <span className={isFocused ? 'drop-shadow-[0_0_8px_rgba(217,106,29,0.2)]' : ''}>
                    {option}
                  </span>
                  {(isSelected || isFocused) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-brand-orange"
                    >
                      {isSelected ? (
                        <Sparkles className="w-4 h-4 fill-current animate-pulse" />
                      ) : (
                        <Star className="w-3 h-3 fill-current opacity-50" />
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="text-[10px] text-red-500 mt-2 font-montserrat">{error}</p>}
    </div>
  );
}


const organizations = [
  'SC',
  'SRB',
  'MD',
  'SU',
  'UKM',
  'Mapres',
  'Advisor',
  'Head of Faculty',
  'Head of Study Program',
  'Rectorate'
];

const majors = [
  'IBM RC', 'IBM IC', 'ACC', 'VCD', 'ARS', 'FDB', 'HTEB', 'CB', 'FTP', 'IMT', 'ISB', 'MED', 'DEM', 'PSY', 'COM'
];

const ukms = [
  'BDC',
  'CANVAS',
  'CHOIR',
  'RESONANCE',
  'TARI TRADISIONAL',
  'TEATER GEMINTANG',
  'ARTUPIC',
  'BALAWARTA',
  'MAHATRA',
  'TABLE TOP',
  'TASK FORCE SAKURA',
  'UCDS',
  'UCIC',
  'PMK',
  'KMK',
  'UCBC',
  'KMHD',
  'MCUC',
  'BASKET',
  'ESPORT',
  'TAEKWONDO'
];

const studentUnions = [
  'SU ACC',
  'SU ARS',
  'SU CB',
  'SU COM',
  'SU DEM',
  'SU FDB',
  'SU FTP',
  'SU HTEB',
  'SU IBM IC',
  'SU IBM RC',
  'SU IMT',
  'SU ISB',
  'SU MED',
  'SU PSY',
  'SU VCD'
];

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
    organization: '',
    subOrganization: ''
  });
  const [userEmail, setUserEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      const isMock = new URLSearchParams(window.location.search).get('mock_login') === 'true';
      if (isMock) {
        return 'mock.student@ciputra.ac.id';
      }
    }
    return '';
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;
      setIsLoading(true);
      setError('');
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!userInfoResponse.ok) {
          throw new Error('Failed to fetch user info');
        }
        const userInfo = await userInfoResponse.json();

        // Validate email domain (must be @ciputra.ac.id)
        if (!userInfo.email?.endsWith('ciputra.ac.id')) {
          setError('Only Ciputra magical accounts may pass');
          return;
        }

        setUserEmail(userInfo.email);
        if (userInfo.name) {
          setFormData(prev => ({ ...prev, name: userInfo.name }));
        }
        onLogin();
      } catch (err) {
        console.error('Google profile fetch error:', err);
        setError('Portal failed to open. Try again.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: (err) => {
      console.error('Google login error:', err);
      setError('Portal failed to open. Try again.');
    }
  });



  const validateField = (name: string, value: string, currentOrg?: string) => {
    let errorMsg = '';
    const org = currentOrg !== undefined ? currentOrg : formData.organization;
    if (name === 'name' && value.trim().length < 3) {
      errorMsg = 'Your name must be at least 3 characters';
    } else if (name === 'nim' && !/^\d{8,12}$/.test(value)) {
      errorMsg = 'NIM must be 8-12 digits';
    } else if (name === 'major' && !value) {
      errorMsg = 'Please select your major';
    } else if (name === 'organization' && !value) {
      errorMsg = 'Please select your organization';
    } else if (name === 'subOrganization' && (org === 'SU' || org === 'UKM') && !value) {
      errorMsg = `Please select your specific ${org}`;
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
    const isSubOrgValid = validateField('subOrganization', formData.subOrganization);

    if (!isNameValid || !isNimValid || !isMajorValid || !isOrgValid || !isSubOrgValid) {
      setError('Please fill all fields correctly');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const finalOrg = (formData.organization === 'SU' || formData.organization === 'UKM') && formData.subOrganization
        ? `${formData.organization} - ${formData.subOrganization}`
        : formData.organization;

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          nim: formData.nim,
          major: formData.major,
          organization: finalOrg,
          email: userEmail
        })
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

  const handleCustomSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'organization' && value !== 'SU' && value !== 'UKM') {
        updated.subOrganization = '';
      }
      return updated;
    });

    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'organization') {
      setValidationErrors(prev => ({ ...prev, subOrganization: '' }));
      validateField('organization', value, value);
    } else if (name === 'subOrganization') {
      validateField('subOrganization', value);
    } else {
      validateField(name, value);
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
            <p className="font-cormorant text-xl text-brand-green-accent/80 italic mb-10 text-left max-w-xs mx-auto px-2">
              <span className="text-5xl md:text-6xl font-cinzel text-brand-orange mr-0.5 font-bold drop-shadow-sm leading-none align-baseline">W</span>
              e await your arrival at the grand celebration of excellence.
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

            {/* Manual Google Calendar Addition */}
            <div className="mt-8">
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                  'UCAN Awarding Night 2026'
                )}&dates=20260529T163000/20260529T220000&details=${encodeURIComponent(
                  "Congratulations! You have successfully RSVP'd for the UCAN 2026 Awarding Night.\n\nA magical evening awaits you at the ballroom. Let the magic begin!"
                )}&location=${encodeURIComponent(
                  'Dian Auditorium, Floor 7, UC Main Building, Universitas Ciputra, Surabaya'
                )}&ctz=Asia/Jakarta`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange/10 hover:bg-brand-orange/20 border border-brand-orange/30 text-brand-orange font-cinzel text-sm tracking-wider rounded-full transition-all duration-300 hover:scale-105 font-bold shadow-[0_4px_12px_rgba(217,106,29,0.1)]"
              >
                <Sparkles className="w-4 h-4 text-brand-orange fill-current animate-pulse" />
                Add to Google Calendar
              </a>
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
              Enter the <br /><span className="text-brand-orange italic drop-shadow-sm font-black">Ballroom</span>
            </h2>

            <p className="font-cormorant italic text-lg md:text-xl text-brand-green-accent mb-8 max-w-md leading-relaxed text-left px-2">
              <span className="text-5xl md:text-6xl font-cormorant text-brand-orange mr-1.5 font-bold drop-shadow-sm leading-none align-baseline">A</span>
              magical invitation awaits those of Ciputra blood. Present your royal crest to reveal the guestbook.
            </p>

            <p className="font-montserrat text-xs text-gray-500 mb-3 tracking-wide">
              please login with a ciputra account
            </p>

            {/* Google useGoogleLogin Trigger */}
            <div className="w-full max-w-sm">
              <button
                type="button"
                onClick={() => login()}
                disabled={isLoading}
                className="w-full relative group py-4 px-8 font-cinzel text-xs tracking-[0.2em] text-white bg-gradient-to-r from-[#C93A1D] via-brand-orange to-[#C93A1D] rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-brand-orange/30 disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 font-bold uppercase">
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.435 0-6.223-2.77-6.223-6.185 0-3.414 2.788-6.185 6.223-6.185 1.506 0 2.88.536 3.96 1.43l3.076-3.075C19.167 2.08 15.932 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.898 0 10.82-4.148 10.82-10.24 0-.668-.063-1.309-.176-1.955H12.24z" />
                  </svg>
                  {isLoading ? 'Presenting Crest...' : 'Present Royal Crest'}
                </span>
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                />
              </button>
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
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.webp")' }} />

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
                    className={`w-full px-6 py-4 bg-white/40 border-b-2 transition-all font-cormorant text-xl focus:outline-none ${validationErrors.name ? 'border-red-400' : 'border-brand-orange/10 focus:border-brand-orange'}`}
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
                    className={`w-full px-6 py-4 bg-white/40 border-b-2 transition-all font-cormorant text-xl focus:outline-none ${validationErrors.nim ? 'border-red-400' : 'border-brand-orange/10 focus:border-brand-orange'}`}
                    placeholder="The royal identifier..."
                  />
                  {validationErrors.nim && <p className="text-[10px] text-red-500 mt-2 font-montserrat">{validationErrors.nim}</p>}
                </div>
              </div>

              <div className="space-y-8">
                <CustomSelect
                  name="major"
                  value={formData.major}
                  placeholder="Select Your Major"
                  options={majors}
                  onChange={handleCustomSelectChange}
                  error={validationErrors.major}
                  label="Major / Study"
                  icon={<GraduationCap className="w-3.5 h-3.5" />}
                />

                <CustomSelect
                  name="organization"
                  value={formData.organization}
                  placeholder="Select Your Organization"
                  options={organizations}
                  onChange={handleCustomSelectChange}
                  error={validationErrors.organization}
                  label="Organization"
                  icon={<Building2 className="w-3.5 h-3.5" />}
                />

                <AnimatePresence>
                  {(formData.organization === 'SU' || formData.organization === 'UKM') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-visible"
                    >
                      <CustomSelect
                        name="subOrganization"
                        value={formData.subOrganization}
                        placeholder={formData.organization === 'SU' ? "Select Your Student Union" : "Select Your UKM"}
                        options={formData.organization === 'SU' ? studentUnions : ukms}
                        onChange={handleCustomSelectChange}
                        error={validationErrors.subOrganization}
                        label={formData.organization === 'SU' ? "Specific Student Union" : "Specific UKM"}
                        icon={<Sparkles className="w-3.5 h-3.5" />}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
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
                  className={`w-full py-6 font-cinzel text-xl tracking-widest transition-all duration-500 relative overflow-hidden rounded-2xl shadow-xl ${isLoading ? 'bg-brand-green/40 text-white/50 cursor-not-allowed' : 'bg-brand-green text-white hover:bg-brand-green-accent'
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
