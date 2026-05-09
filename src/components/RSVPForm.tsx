import React, { useState } from 'react';
import { Star, Heart, Sparkles } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { motion } from 'motion/react';

interface RSVPFormProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}

export function RSVPForm({ isLoggedIn, onLogin }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    major: '',
    organization: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('Please login with your student account to RSVP');
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

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-16 text-center relative parchment-bg overflow-hidden" 
        style={{
          borderRadius: '255px 25px 225px 25px/25px 225px 25px 255px',
          boxShadow: '12px 12px 0px rgba(217, 106, 29, 0.15)',
          border: '2px solid rgba(217, 106, 29, 0.3)'
        }}
      >
        <div className="absolute inset-0 sketch-line opacity-5 pointer-events-none" />
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
      </motion.div>
    );
  }

  return (
    <div className="p-12 relative parchment-bg overflow-hidden" style={{
      borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px',
      boxShadow: '12px 12px 0px rgba(217, 106, 29, 0.15)',
      border: '2px solid rgba(217, 106, 29, 0.3)'
    }}>
      <div className="absolute inset-0 sketch-line opacity-5 pointer-events-none" />
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
        <div className="text-center py-16 flex flex-col items-center">
          <p className="font-montserrat mb-8 tracking-wide text-lg" style={{ color: '#4C7A1A' }}>Student account authentication required</p>
          <div className="hand-drawn-border p-4 bg-white/50 backdrop-blur-md hover:scale-105 transition-transform duration-500" style={{ borderColor: '#D96A1D' }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  try {
                    const decoded = jwtDecode(credentialResponse.credential);
                    if (decoded && (decoded as any).name) {
                      setFormData(prev => ({...prev, name: (decoded as any).name}));
                    }
                  } catch (e) {
                    console.error("Error decoding JWT", e);
                  }
                  onLogin();
                }
              }}
              onError={() => {
                setError('Google Login Failed');
              }}
              useOneTap
            />
          </div>
          {error && <p className="text-red-600 mt-6 font-montserrat text-sm">{error}</p>}
          <p className="mt-6 font-cormorant italic text-sm" style={{ color: '#6D8F2B' }}>Please use your @ciputra.ac.id account</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>Full Name</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white/50 focus:outline-none font-cormorant text-2xl transition-all"
                placeholder="Enter your full name"
                style={{
                  borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                  border: '2px solid #EEDDBA',
                  color: '#0B3A0A'
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D96A1D')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#EEDDBA')}
              />
              <Star className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-20" style={{ color: '#D96A1D' }} />
            </div>
          </div>

          <div>
            <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>NIM (Student ID)</label>
            <div className="relative">
              <input
                type="text"
                name="nim"
                value={formData.nim}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white/50 focus:outline-none font-cormorant text-2xl transition-all"
                placeholder="Enter your NIM"
                style={{
                  borderRadius: '15px 255px 15px 225px/225px 15px 255px 15px',
                  border: '2px solid #EEDDBA',
                  color: '#0B3A0A'
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D96A1D')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#EEDDBA')}
              />
              <Heart className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-20" style={{ color: '#C93A1D' }} />
            </div>
          </div>

          <div>
            <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>Major / Program Studi</label>
            <div className="relative">
              <input
                type="text"
                name="major"
                value={formData.major}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white/50 focus:outline-none font-cormorant text-2xl transition-all"
                placeholder="Enter your major"
                style={{
                  borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                  border: '2px solid #EEDDBA',
                  color: '#0B3A0A'
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D96A1D')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#EEDDBA')}
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-20" style={{ color: '#4C7A1A' }} />
            </div>
          </div>

          <div>
            <label className="block font-montserrat text-xs tracking-widest uppercase mb-4" style={{ color: '#D96A1D' }}>Organization</label>
            <div className="relative">
              <select
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white/50 focus:outline-none font-cormorant text-2xl transition-all appearance-none"
                style={{
                  borderRadius: '15px 255px 15px 225px/225px 15px 255px 15px',
                  border: '2px solid #EEDDBA',
                  color: '#0B3A0A'
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D96A1D')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#EEDDBA')}
              >
                <option value="" style={{ background: '#F4E7CB', color: '#6D8F2B' }}>Select your organization</option>
                {organizations.map((org, index) => (
                  <option key={index} value={org} style={{ background: '#F4E7CB', color: '#0B3A0A' }}>{org}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                <Star className="w-5 h-5" style={{ color: '#F08A2B' }} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-12 px-8 py-6 font-montserrat text-sm tracking-widest uppercase transition-all duration-500 hover:-translate-y-2 hover:rotate-1 vintage-button-primary flex justify-center items-center"
          >
            <span className="relative z-10">SUBMIT RSVP</span>
            <Sparkles className="w-5 h-5 relative z-10" />
          </button>
        </form>
      )}
    </div>
  );
}

