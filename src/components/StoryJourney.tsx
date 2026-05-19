import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

// Assets
import WallTransp1 from '../assets/assets UCAN/Ballroom/wall /WallTransp1.png';
import WallTransp2 from '../assets/assets UCAN/Ballroom/wall /WallTransp2.png';
import Wall1 from '../assets/assets UCAN/Ballroom/wall /Wall1.png';
import Wall2 from '../assets/assets UCAN/Ballroom/wall /Wall2.png';
import Pillar1 from '../assets/assets UCAN/Ballroom/Pillar/Pillar.png';
import Pillar2 from '../assets/assets UCAN/Ballroom/Pillar/Pillar (1).png';
import PillarArch1 from '../assets/assets UCAN/nomination assets/Hallway/Pillars/AI Ver/PillarArch.png';
import PillarArch2 from '../assets/assets UCAN/nomination assets/Hallway/Pillars/AI Ver/PillarArch2.png';
import PillarArch3 from '../assets/assets UCAN/nomination assets/Hallway/Pillars/AI Ver/PillarArch3.png';
import BannerNew from '../assets/assets UCAN/Chamber/New/BannerNew.png';
import MasDes1 from '../assets/MasDes/MASDES UCAN 2026.png';
import FiligreeBorder from '../assets/assets UCAN/invitation filigri/filigri_invitation card.png';
import Ballroom1 from '../assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom1.png';
import Ballroom2 from '../assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom2.png';
import Ballroom3 from '../assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom3.png';

// Organization Logos
import MDLogo from '../assets/ucanLogos/MD.png';
import SCLogo from '../assets/ucanLogos/SC.png';
import SRBLogo from '../assets/ucanLogos/SRB.png';
import UCLogo from '../assets/ucanLogos/UC.png';
import UCANLogo from '../assets/ucanLogos/UCAN.png';

gsap.registerPlugin(ScrollTrigger);

const nomineeCategories = [
  {
    id: "mapres",
    title: "Mahasiswa Berprestasi",
    subtitle: "Kumpulan Mahasiswa-Mahasiswi yang telah mengharumkan nama Universitas Ciputra",
    logo: UCANLogo,
    color: "#D96A1D",
    nominees: [
      {
        name: "The Outstanding Achievement Award",
        role: "Excellence in Leadership",
        image: "https://images.unsplash.com/photo-1523240715632-d984bb4b9749?auto=format&fit=crop&q=80&w=800",
        description: "This prestigious award recognizes an individual or team who has demonstrated exceptional performance, innovation, or impact in their field."
      },
      {
        name: "The Pioneer in Research Award",
        role: "Vibrant Ecosystem",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
        description: "This award honors innovative researchers whose groundbreaking work has significantly advanced knowledge and opened new frontiers in their field."
      },
      {
        name: "Sustainability & Social Impact Award",
        role: "Community Catalyst",
        image: "https://images.unsplash.com/photo-1517048676732-d676936d9b28?auto=format&fit=crop&q=80&w=800",
        description: "This award recognizes individuals who have demonstrated exceptional leadership in driving sustainable practices and making a meaningful difference in their communities."
      },
      {
        name: "Student Achievement Award",
        role: "Academic Excellence",
        image: "",
        description: ""
      }
    ]
  },
  {
    id: "md",
    title: "Mentoring Department",
    subtitle: "Heart of the City",
    logo: MDLogo,
    color: "#6D8F2B",
    nominees: [
      {
        name: "Outstanding Mentor in Collaboration and Networking ",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "The recipient of this award is a mentor who not only possesses the ability to lead a team but also values each individual within it, recognizes others' strengths and contributions, and fosters collective growth."
      },
      {
        name: "Outstanding Mentor in Initiative, Adaptability, and Resilience",
        role: "Education for All",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
        description: "The recipient of this award is a mentor who demonstrates exceptional ability in taking bold and proactive steps in guiding a team or individual. They do not simply wait for opportunities to arise, but actively create and seize them for growth and development."
      },
      {
        name: "Outstanding Mentor in Analytical and Critical Thinking",
        role: "Education for All",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
        description: "The recipient of this award is a mentor who excels in critical and analytical thinking, with exceptional ability to systematically analyze and solve problems."
      },
      {
        name: "Outstanding  Mentor in Learning Skills and Lifelong Learning",
        role: "Education for All",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
        description: "The recipient of this award is a mentor dedicated to understanding the strengths and potential of each individual they guide."
      }
    ]
  },
  {
    id: "cosbud",
    title: "Counseling Buddy",
    subtitle: "Heart of the City",
    logo: UCANLogo,
    color: "#6D8F2B",
    nominees: [
      {
        name: "Counseling Buddy Appreciation",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This recognition is given in appreciation of a supportive and compassionate counseling buddy who has consistently offered encouragement, shared insights, and fostered a safe, understanding space for growth and connection."
      }
    ]
  },
  {
    id: "srb",
    title: "Student Representative Board",
    subtitle: "Heart of the City",
    logo: SRBLogo,
    color: "#6D8F2B",
    nominees: [
      {
        name: "Outstanding Student Representative Member in Intellectual and Creative",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award recognizes an individual who has shown exceptional dedication to self-improvement, consistently embracing challenges, overcoming obstacles, and making significant strides in personal development."
      },
      {
        name: "Outstanding Student Representative Member in Leadership",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: ""
      },
      {
        name: "Outstanding Student Representative in Interpersonal Skill",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award honors a leader who consistently takes initiative, anticipates challenges, and drives progress by proactively identifying opportunities, making informed decisions, and inspiring others to take action."
      },
      {
        name: "Outstanding Student Representative Member in Strategic Thinking",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award recognizes an individual who demonstrates exceptional skill in analyzing complex situations, developing insightful strategies, and making data-driven decisions that lead to impactful outcomes."
      }
    ]
  },
  {
    id: "sc",
    title: "Student Council",
    subtitle: "Heart of the City",
    logo: SCLogo,
    color: "#6D8F2B",
    nominees: [
      {
        name: "Outstanding Student Council Member in Intellectual and Creative",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award recognizes an individual who has shown exceptional dedication to self-improvement, consistently embracing challenges, overcoming obstacles, and making significant strides in personal development."
      },
      {
        name: "Outstanding Student Council Member in Leadership",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award honors a leader who consistently takes initiative, anticipates challenges, and drives progress by proactively identifying opportunities, making informed decisions, and inspiring others to take action."
      },
      {
        name: "Outstanding Student Council Member in Interpersonal Skill",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: ""
      },
      {
        name: "Outstanding Student Council Member in Strategic Thinking",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award recognizes an individual who demonstrates exceptional skill in analyzing complex situations, developing insightful strategies, and making data-driven decisions that lead to impactful outcomes."
      }
    ]
  },
  {
    id: "ukm",
    title: "Unit Kegiatan Mahasiswa/i",
    subtitle: "Heart of the City",
    logo: UCANLogo,
    color: "#6D8F2B",
    nominees: [
      {
        name: "Top Performing Student Activity Award",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award recognizes the top-performing UKM that has demonstrated exceptional leadership, teamwork, and achievement in its activities, making a significant impact on student development and campus life."
      },
      {
        name: "Best Practice in Monitoring & Control Award",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award recognizes an individual or team that has demonstrated excellence in implementing best practices for monitoring and control, ensuring effective oversight, optimizing performance, and consistently achieving desired outcomes through diligent tracking and management."
      },
      {
        name: "Impact & Achievement Distinction Award",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This distinction honors an individual or team whose actions have had a profound and lasting impact, consistently achieving remarkable results and setting a high standard of excellence through their contributions."
      },
      {
        name: "Best Learning and Development Program",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award recognizes an individual or group that has successfully implemented innovative and effective active learning strategies, enhancing student engagement, critical thinking, and hands-on learning experiences."
      }
    ]
  }, 
  {
    id: "su",
    title: "Student Union",
    subtitle: "Heart of the City",
    logo: UCLogo,
    color: "#6D8F2B",
    nominees: [
      {
        name: "Top Performing Student Union Award",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award recognizes the top-performing Student Union (SU) that has demonstrated outstanding leadership, effective management, and significant contributions to enhancing the student experience and campus life."
      },
      {
        name: "Best Practice in Monitoring & Control Award",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award honors an individual or team that has exemplified outstanding practices in monitoring and control, ensuring effective oversight, optimizing processes, and driving successful outcomes through consistent and systematic management"
      },
      {
        name: "Impact & Achievement Distinction",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This distinction recognizes an individual or team whose actions have made a significant and lasting impact, achieving exceptional results that contribute to progress, innovation, and excellence in their field."
      },
      {
        name: "Best Learning and Development Program",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award recognizes an individual or team that has successfully implemented innovative and impactful active learning strategies, fostering student engagement, critical thinking, and effective hands-on learning experiences."
      }
    ]
  },
  {
    id: "allormawa",
    title: "All Organization",
    subtitle: "Heart of the City",
    logo: UCANLogo,
    color: "#6D8F2B",
    nominees: [
      {
        name: "Outstanding Organizational Program Award",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: "This award recognizes the organization program that has demonstrated outstanding planning, impact, and execution which has significantly contributed to the mission and goals of the organization."
      }
    ]
  },
  {
    id: "pesertaucan",
    title: "UCAN Participant",
    subtitle: "Heart of the City",
    logo: UCANLogo,
    color: "#6D8F2B",
    nominees: [
      {
        name: "Best Dress",
        role: "Rural Empowerment",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        description: ""
      }
    ]
  },
  
];


export function StoryJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !horizontalRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Horizontal Storytelling
      mm.add("(min-width: 1024px)", () => {
        const horizontalContainer = horizontalRef.current!;
        const totalWidth = horizontalContainer.scrollWidth;
        const windowWidth = window.innerWidth;
        const finalSlide = horizontalContainer.querySelector('.final-slide') as HTMLElement;

        const getXFinal = () => {
          if (!finalSlide) return -(totalWidth - windowWidth);
          return (window.innerWidth - finalSlide.offsetWidth) / 2 - finalSlide.offsetLeft;
        };

        const masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 0.2,
            invalidateOnRefresh: true,
            end: () => `+=${Math.abs(getXFinal()) + 800}`,
          }
        });

        // Main Horizontal Tween
        const mainTween = gsap.to(horizontalContainer, {
          x: () => getXFinal(),
          ease: "none",
          duration: 1,
        });
        masterTimeline.add(mainTween, 0);

        // Progress Bar
        masterTimeline.to(progressBarRef.current, {
          scaleX: 1, ease: "none", duration: 1
        }, 0);

        // Pillar Parallax
        masterTimeline.to('.ballroom-pillar-distant', {
          x: () => getXFinal() * 0.5, ease: "none", duration: 1
        }, 0);

        masterTimeline.to('.ballroom-pillar-near', {
          x: () => getXFinal() * 1.5, ease: "none", duration: 1
        }, 0);

        // Wall Parallax
        gsap.to('.ballroom-wall-2', {
          x: () => getXFinal() * 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: true,
            invalidateOnRefresh: true,
          }
        });

        // Background Cross-fades
        nomineeCategories.forEach((_, i) => {
          gsap.to(`.ballroom-room-${i % 3}`, {
            opacity: 0.3,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: `.category-section-${i}`,
              containerAnimation: mainTween,
              start: "left 60%",
              end: "left 20%",
              scrub: true,
            }
          });
        });

        // Card Entrance
        gsap.utils.toArray<HTMLElement>('.nominee-card').forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, scale: 0.9, rotateY: 15, y: 30 },
            {
              opacity: 1, scale: 1, rotateY: 0, y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: mainTween,
                start: "left 95%",
                end: "left 70%",
                scrub: true,
              }
            }
          );
        });

        // Header Entrance
        gsap.utils.toArray<HTMLElement>('.category-header').forEach((header) => {
          gsap.from(header.querySelectorAll('h3, .header-icon'), {
            y: 30, opacity: 0, stagger: 0.1, ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: header,
              containerAnimation: mainTween,
              start: "left 80%",
              end: "left 40%",
              scrub: true,
            }
          });
        });
      });

      mm.add("(min-width: 1024px)", () => {
        const handleMouseMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          gsap.to(sectionRef.current, {
            '--light-x': `${x}%`,
            '--light-y': `${y}%`,
            duration: 0.5
          });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-parchment min-h-screen">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 z-0">
          {[Ballroom1, Ballroom2, Ballroom3].map((room, i) => (
            <div
              key={i}
              className={`absolute inset-0 ballroom-wall ballroom-room-${i} opacity-0 transition-opacity duration-1000 scale-105`}
              style={{ backgroundImage: `url(${room})`, backgroundPosition: 'center', filter: 'brightness(0.6) sepia(0.2)' }}
            />
          ))}
        </div>
        <div className="absolute inset-0 ballroom-wall opacity-10 scale-110" style={{ backgroundImage: `url(${Wall1})`, backgroundAttachment: 'fixed' }} />
        <div className="absolute inset-y-0 ballroom-wall-2 w-[400vw] opacity-15 hidden lg:block" style={{ backgroundImage: `url(${Wall2})`, backgroundRepeat: 'repeat-x' }} />
        <div className="absolute inset-y-0 ballroom-wall-2 w-[400vw] opacity-10 mix-blend-multiply hidden lg:block" style={{ backgroundImage: `url(${WallTransp2})`, backgroundRepeat: 'repeat-x', transform: 'translateX(-20%)' }} />
        <div className="absolute inset-0 z-10 ballroom-lighting" />
        <div className="absolute inset-0 z-20 ballroom-overlay" style={{ backgroundImage: `url(${WallTransp1})` }} />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden hidden lg:block">
        {[40, 240, 440, 640, 840, 1040].map((left, i) => (
          <motion.img key={`distant-${i}`} src={i % 2 === 0 ? Pillar1 : Pillar2} className="absolute top-0 h-[80%] object-contain opacity-20 blur-[4px] ballroom-pillar-distant" style={{ left: `${left}vw` }} />
        ))}
        {[10, 160, 310, 460, 610, 760, 910, 1060].map((left, i) => (
          <motion.img key={`near-${i}`} src={i % 2 === 0 ? Pillar1 : Pillar2} className="absolute top-0 h-full object-contain opacity-60 ballroom-pillar-near z-[40]" style={{ left: `${left}vw` }} />
        ))}
      </div>

      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-brand-orange/10 hidden lg:block">
        <div ref={progressBarRef} className="h-full bg-brand-orange origin-left scale-x-0 shadow-[0_0_10px_rgba(217,106,29,0.5)]" />
      </div>

      <div ref={horizontalRef} className="relative z-30 flex flex-col lg:flex-row h-auto lg:h-screen w-full lg:w-max items-center px-4 lg:px-[5vw] gap-16 lg:gap-[8vw] py-24 lg:py-0 overflow-x-hidden lg:overflow-visible">
        {/* Intro */}
        <div className="flex-shrink-0 w-full lg:w-[60vw] flex flex-col justify-center relative items-center text-center py-10 lg:py-0 mb-12 lg:mb-0">
          <div className="relative z-10 lg:p-12 flex flex-col items-center">
            <div className="relative mb-8 group">
              <img src={BannerNew} className="w-48 h-64 sm:w-64 sm:h-80 lg:w-80 lg:h-96 object-contain drop-shadow-2xl animate-float-slow group-hover:scale-105 transition-transform duration-700" alt="Royal Banner" />
              <div className="absolute inset-0 flex items-center justify-center -translate-y-8"><Sparkles className="w-12 h-12 lg:w-16 lg:h-16 text-brand-orange animate-twinkle" /></div>
            </div>
            <div className="relative px-2 text-center">
              <span className="px-6 py-2 inline-block font-montserrat text-[10px] tracking-[0.6em] uppercase text-brand-orange bg-brand-orange/5 backdrop-blur-md border border-brand-orange/20 mb-8 rounded-full font-bold">The Gallery of Excellence</span>
              <h2 className="text-[12vw] sm:text-[10vw] lg:text-[10vw] leading-[0.8] text-brand-green font-cinzel font-black drop-shadow-sm mb-8">THE <br /> <span className="text-brand-orange italic">LEGENDS</span></h2>
              <div className="h-1 w-24 lg:w-32 bg-brand-orange/20 mx-auto mb-8 rounded-full" />
              <p className="font-eb-garamond text-xl sm:text-2xl lg:text-4xl italic text-brand-green-accent max-w-xl leading-relaxed font-medium">"Walk through the royal halls to discover those who carved their names in the university's legacy."</p>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col items-center gap-4 text-brand-orange group cursor-pointer">
             <span className="font-script text-2xl tracking-wide opacity-80">{window.innerWidth < 1024 ? 'Scroll down to begin' : 'Scroll to explore'}</span>
             <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-4">
               <div className="h-24 lg:h-px w-px lg:w-24 bg-current opacity-20" /><ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
             </motion.div>
          </div>
        </div>

        {nomineeCategories.map((category, i) => {
          const ArchImg = [PillarArch1, PillarArch2, PillarArch3][i % 3];
          return (
            <div key={category.id} className={`category-section-${i} flex-shrink-0 flex flex-col lg:flex-row items-center gap-16 lg:gap-[5vw] lg:pr-[5vw] lg:border-l border-dashed border-brand-orange/20 lg:pl-[5vw] w-full lg:w-auto mb-40 lg:mb-0`}>
              <div className="category-header w-full lg:w-[65vw] flex flex-col justify-center items-center text-center relative group min-h-[45vh] lg:min-h-[80vh] px-4">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img src={ArchImg} alt="" className="h-[100%] lg:h-[110%] w-auto object-contain transition-transform duration-1000 group-hover:scale-105 opacity-90 drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]" />
                </div>
                
                <div className="relative z-10 px-4 lg:px-8 py-12 flex flex-col items-center max-w-2xl">
                  <div className="mb-8 lg:mb-12 relative flex items-center justify-center">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center relative z-10">
                       <img src={category.logo} className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" alt="" />
                    </div>
                  </div>
                  <h3 className="text-3xl sm:text-5xl lg:text-[8vw] text-brand-green font-cinzel font-bold leading-normal lg:leading-[0.8] tracking-tighter break-words text-center overflow-wrap-anywhere px-4">
                    {category.title.split(' ').map((word, idx) => (
                      <span key={idx} className="block last:text-brand-orange last:italic">{word}</span>
                    ))}
                  </h3>
                  <div className="flex items-center gap-6 lg:gap-8 w-full px-6 lg:px-12">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
                    <img src={MasDes1} className="h-8 lg:h-10 object-contain opacity-60 drop-shadow-md" alt="" />
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-brand-orange/40 to-transparent" />
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none">
                   {[...Array(6)].map((_, i) => (
                     <div key={i} className="absolute w-2 h-2 rounded-full bg-brand-orange opacity-40 animate-twinkle"
                       style={{ top: `${30 + Math.random() * 40}%`, left: `${30 + Math.random() * 40}%`, animationDelay: `${i * 0.5}s` }}
                     />
                   ))}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-[5vw] px-4 lg:px-0 w-full">
                {category.nominees.map((nominee, idx) => (
                  <div key={idx} className="nominee-card flex-shrink-0 w-[240px] sm:w-[280px] lg:w-[360px] group relative mx-auto" style={{ perspective: '2000px' }}>
                    <motion.div 
                      className="relative w-full aspect-[3/4] transition-all duration-600 ease-out cursor-pointer"
                      style={{ transformStyle: 'preserve-3d' }}
                      whileHover={{ rotateY: window.innerWidth >= 1024 ? 180 : 0 }}
                      onClick={(e) => {
                        if (window.innerWidth < 1024) {
                          const target = e.currentTarget;
                          const currentRotate = target.style.transform.includes('180deg');
                          target.style.transform = currentRotate ? 'rotateY(0deg)' : 'rotateY(180deg)';
                        }
                      }}
                    >
                      {/* FRONT */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.4)] bg-[#0B1A0A] border-2 border-[#D96A1D]/30 flex flex-col items-center justify-center p-6 lg:p-8"
                           style={{ backfaceVisibility: 'hidden' }}>
                        <div className="absolute inset-[10px] border border-[#D96A1D]/15 rounded-xl pointer-events-none" />
                        <div className="filigree-corner top-0 left-0 opacity-40 scale-110" style={{ backgroundImage: `url(${FiligreeBorder})`, transform: 'scale(1.1)' }} />
                        <div className="filigree-corner top-0 right-0 opacity-40 scale-110" style={{ backgroundImage: `url(${FiligreeBorder})`, transform: 'scaleX(-1.1) scaleY(1.1)' }} />
                        <div className="filigree-corner bottom-0 left-0 opacity-40 scale-110" style={{ backgroundImage: `url(${FiligreeBorder})`, transform: 'scaleX(1.1) scaleY(-1.1)' }} />
                        <div className="filigree-corner bottom-0 right-0 opacity-40 scale-110" style={{ backgroundImage: `url(${FiligreeBorder})`, transform: 'scale(-1.1)' }} />
                        <div className="relative mb-8 lg:mb-12 flex items-center justify-center">
                           <div className="w-24 h-24 lg:w-28 lg:h-28 flex items-center justify-center relative z-10">
                              <img src={category.logo} className="w-full h-full object-contain" alt="" />
                           </div>
                        </div>
                        <div className="relative z-10 text-center px-2 lg:px-4">
                          <h4 className="text-lg sm:text-xl lg:text-3xl font-cinzel text-white leading-[1] tracking-tight mb-6 lg:mb-8 font-bold">{nominee.name}</h4>
                          <div className="inline-flex items-center gap-2 text-brand-orange/70 font-script text-xl tracking-wide"><span>Tap to reveal</span><ArrowRight className="w-3 h-3" /></div>
                        </div>
                      </div>
                      {/* BACK */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.4)] bg-[#0B1A0A] border-2 border-brand-orange/40 p-6 lg:p-10 flex flex-col items-center justify-center"
                           style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                        <div className="absolute inset-[10px] border border-brand-orange/10 rounded-xl pointer-events-none" />
                        <div className="filigree-corner top-0 left-0 opacity-30" style={{ backgroundImage: `url(${FiligreeBorder})`, transform: 'scale(1)' }} />
                        <div className="filigree-corner top-0 right-0 opacity-30" style={{ backgroundImage: `url(${FiligreeBorder})`, transform: 'scaleX(-1) scaleY(1)' }} />
                        <div className="filigree-corner bottom-0 left-0 opacity-30" style={{ backgroundImage: `url(${FiligreeBorder})`, transform: 'scaleX(1) scaleY(-1)' }} />
                        <div className="filigree-corner bottom-0 right-0 opacity-30" style={{ backgroundImage: `url(${FiligreeBorder})`, transform: 'scale(-1)' }} />
                        <h5 className="font-cinzel text-brand-orange text-lg mb-4 lg:mb-6 tracking-widest uppercase opacity-70 font-bold">{nominee.name}</h5>
                        <div className="relative">
                          <div className="absolute -inset-6 bg-brand-orange/5 blur-2xl rounded-full" />
                          <p className="relative z-10 font-eb-garamond text-base lg:text-2xl italic text-white/90 leading-relaxed text-center font-medium px-2 lg:px-4">"{nominee.description}"</p>
                        </div>
                        <img src={MasDes1} className="mt-6 lg:mt-10 h-6 object-contain opacity-20" alt="" />
                      </div>
                    </motion.div>
                    <div className="absolute -inset-4 bg-brand-orange/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="final-slide flex-shrink-0 w-full lg:w-[75vw] flex flex-col justify-center items-center text-center px-4 lg:px-[5vw] relative py-32 lg:py-0">
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-md p-8 lg:p-10 rounded-[2.5rem] border border-white/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <h3 className="text-4xl lg:text-6xl text-brand-green font-cinzel font-bold mb-6 tracking-tight leading-tight">
                The Journey <br />
                <span className="text-brand-orange italic drop-shadow-md">Continues</span>
              </h3>
              
              <p className="font-eb-garamond text-xl lg:text-2xl italic text-brand-green-accent max-w-lg mx-auto mb-10 leading-relaxed font-medium">
                "Your presence is the final brushstroke in this masterpiece of achievement."
              </p>

              <button 
                onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })} 
                className="vintage-button scale-110 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="relative z-10 font-bold">RESERVE YOUR SEAT</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-3 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
