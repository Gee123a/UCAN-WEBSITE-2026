import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Award, Star, Sparkles, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import Particles from './components/magicui/particles';
import ShinyButton from './components/magicui/shiny-button';
import { NomineesSection } from './components/NomineesSection';

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
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1695185844325-f4c0ee01b3d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZWxlZ2FudCUyMGF3YXJkJTIwY2VyZW1vbnklMjBzdGFnZXxlbnwxfHx8fDE3NzgxNTA4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Award ceremony stage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/80 via-stone-900/70 to-amber-950/90"></div>
          <Particles
            className="absolute inset-0 z-0"
            quantity={100}
            staticity={30}
            color="#fceaa9"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6 flex justify-center gap-4">
            <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
            <Star className="w-10 h-10 text-amber-400" />
            <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl text-amber-100 mb-6 tracking-wide">
            Universitas Ciputra
          </h1>
          <h2 className="text-4xl md:text-6xl text-amber-300 mb-8 tracking-wider">
            Awarding Night 2026
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
          
          <p className="text-2xl md:text-3xl text-amber-200 italic mb-4">
            Shaping Dreams, Honoring Excellence
          </p>
          
          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center items-center text-amber-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-lg">29 May 2026</span>
            </div>
            <span className="hidden md:block text-amber-400">•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-lg">16:30 - 22:00</span>
            </div>
            <span className="hidden md:block text-amber-400">•</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">Dian Auditorium</span>
            </div>
          </div>
          
          <div className="mt-12">
            <ShinyButton
              onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-amber-600/20 text-white border border-amber-500/30"
            >
              RSVP Now
            </ShinyButton>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-50 to-transparent z-5"></div>
      </section>

      {/* About Section */}
      <motion.section 
        className="py-16 px-4 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1768508950778-9ba70d4445e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZm9ybWFsJTIwZXZlbnQlMjBnYWxhJTIwZGlubmVyfGVufDF8fHx8MTc3ODE1MTEyMXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Elegant event"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-amber-300" />
                    <span className="text-white text-xl">A Night of Excellence</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4">
                  <Star className="w-4 h-4 text-amber-700" />
                  <span className="text-amber-900 text-sm">Annual Celebration</span>
                </div>
                <h3 className="text-4xl md:text-5xl text-amber-900 mb-6">About the Event</h3>
              </div>
              
              <p className="text-xl text-stone-700 leading-relaxed">
                The Universitas Ciputra Awarding Night is an annual formal event to recognize and celebrate 
                the achievements of students who have excelled in <span className="text-amber-700">academics, leadership, 
                entrepreneurship, and creativity</span>.
              </p>
              
              <div className="h-1 w-24 bg-gradient-to-r from-amber-600 to-transparent rounded-full"></div>
              
              <p className="text-lg text-stone-600 leading-relaxed">
                The purpose goes beyond recognition—it aims to inspire and motivate students by showcasing 
                excellence and dedication. By highlighting success stories, we encourage others to strive 
                for their own achievements and contribute meaningfully to their community.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Event Details + Performance Combined */}
      <motion.section 
        className="py-16 px-4 bg-gradient-to-b from-white to-amber-50/50 -mt-8"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl md:text-5xl text-amber-900 mb-4">Event Information</h3>
            <p className="text-xl text-stone-600">Everything you need to know</p>
          </motion.div>
          
          {/* Asymmetric Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info Card - Spans 2 columns */}
            <div className="lg:col-span-2">
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-3xl transform rotate-1"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl h-full">
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl mb-3 shadow-lg">
                        <Calendar className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-sm text-amber-900 mb-1">Date</h4>
                      <p className="text-xl text-stone-800">29 May</p>
                      <p className="text-xs text-stone-600">Thursday, 2026</p>
                    </div>

                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl mb-3 shadow-lg">
                        <Clock className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-sm text-amber-900 mb-1">Time</h4>
                      <p className="text-xl text-stone-800">16:30</p>
                      <p className="text-xs text-stone-600">Until 22:00</p>
                    </div>

                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl mb-3 shadow-lg">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-sm text-amber-900 mb-1">Venue</h4>
                      <p className="text-lg text-stone-800">Dian Auditorium</p>
                      <p className="text-xs text-stone-600">Floor 7, UC Main</p>
                    </div>
                  </div>

                  <div className="border-t-2 border-amber-100 pt-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-amber-800" />
                      </div>
                      <div>
                        <h4 className="text-amber-900">Dress Code: Formal Earth Tone</h4>
                        <p className="text-sm text-stone-500">Browns, beiges, creams, terracotta, olive</p>
                      </div>
                    </div>
                    
                    <a 
                      href="https://maps.app.goo.gl/NDzTsk9A4draMqkk9?g_st=ic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-5 h-5" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 rounded-3xl p-6 shadow-xl border-2 border-amber-200 h-full flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-amber-300 rounded-full mb-4 self-start">
                  <Star className="w-4 h-4 text-amber-700" />
                  <span className="text-amber-900 text-xs">Featured</span>
                </div>
                
                <div className="relative mb-4 rounded-xl overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1771833727474-376bf191a7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjBsaXZlJTIwcGVyZm9ybWFuY2UlMjBlbGVnYW50fGVufDF8fHx8MTc3ODE1MTEyMXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Orchestra performance"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent"></div>
                </div>
                
                <div className="flex-grow">
                  <h4 className="text-xl text-amber-900 mb-2">Special Musical Performance</h4>
                  <p className="text-sm text-stone-600 mb-4">An enchanting evening of music throughout the event</p>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-full">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span className="text-amber-900 text-xs">Live Entertainment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Door Prize Card - Full width below */}
            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-900/30 rounded-full blur-2xl"></div>
                
                <div className="relative grid md:grid-cols-2 gap-8 items-center">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Gift className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl text-white mb-2">Door Prize & Souvenirs</h4>
                      <p className="text-amber-100">Exclusive rewards for all attendees</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-white">
                    <p className="text-sm leading-relaxed">
                      All attendees receive exclusive UCAN 2026 souvenirs to commemorate this special evening.
                    </p>
                    <p className="text-sm leading-relaxed">
                      Stay until the end for a chance to win exciting door prizes announced during the event.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <NomineesSection />

      {/* RSVP Section */}
      <motion.section 
        id="rsvp" 
        className="py-16 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl text-center text-amber-900 mb-3 font-serif">RSVP</h3>
          <p className="text-center text-stone-600 mb-8">Please login with your student account to confirm your attendance</p>
          
          {!isSubmitted ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-amber-200">
              {!isLoggedIn ? (
                <div className="text-center py-8">
                  <p className="text-stone-700 mb-6 text-lg">You must be logged in with your student account to RSVP</p>
                  <ShinyButton
                    onClick={() => setIsLoggedIn(true)}
                    className="bg-amber-600 text-white"
                  >
                    Login with Student Account
                  </ShinyButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-stone-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:outline-none bg-white/80"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 mb-2">NIM (Student ID)</label>
                    <input
                      type="text"
                      name="nim"
                      value={formData.nim}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:outline-none bg-white/80"
                      placeholder="Enter your NIM"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 mb-2">Major / Program Studi</label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:outline-none bg-white/80"
                      placeholder="Enter your major"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 mb-2">Organization</label>
                    <select
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:outline-none bg-white/80"
                    >
                      <option value="">Select your organization</option>
                      {organizations.map((org, index) => (
                        <option key={index} value={org}>{org}</option>
                      ))}
                    </select>
                  </div>

                  <ShinyButton
                    type="submit"
                    className="w-full bg-amber-600 text-white py-4"
                  >
                    Submit RSVP
                  </ShinyButton>
                </form>
              )}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-12 shadow-xl border-2 border-amber-400 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-3xl text-amber-900 mb-4">Thank You!</h4>
              <p className="text-xl text-stone-700 mb-2">Your RSVP has been confirmed, {formData.name}!</p>
              <p className="text-stone-600">We look forward to celebrating with you on May 29, 2026.</p>
              <p className="text-stone-600 mt-4">See you at the Dian Auditorium!</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-b from-amber-900 to-stone-900 text-amber-100 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <h4 className="text-2xl text-amber-300 mb-2">Universitas Ciputra Awarding Night 2026</h4>
            <p className="text-amber-200 italic">Shaping Dreams, Honoring Excellence</p>
          </div>
          
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
            <a 
              href="https://maps.app.goo.gl/NDzTsk9A4draMqkk9?g_st=ic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-200 hover:text-amber-100 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Location
            </a>
            <span className="hidden md:block text-amber-400">•</span>
            <span className="text-amber-200">May 29, 2026</span>
            <span className="hidden md:block text-amber-400">•</span>
            <span className="text-amber-200">16:30 - 22:00</span>
          </div>
          
          <p className="text-amber-300 text-sm">
            © 2026 Universitas Ciputra. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
