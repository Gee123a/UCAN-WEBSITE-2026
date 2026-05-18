import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Star, Sparkles, Trophy, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

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
import Banner1 from '../assets/assets UCAN/nomination assets/Hallway/Banner/Banner 1/AI Ver/Banner.png';
import Banner2 from '../assets/assets UCAN/nomination assets/Hallway/Banner/Banner 2/AI Ver/Banner2.png';
import Banner3 from '../assets/assets UCAN/nomination assets/Hallway/Banner/Banner 3/AI Ver/Banner3.png';
import BannerNew from '../assets/assets UCAN/Chamber/New/BannerNew.png';
import Plate from '../assets/assets UCAN/nomination assets/Hallway/Banner/Banner 1/AI Ver/Plate.png';
import MasDes1 from '../assets/MasDes/MASDES UCAN 2026.png';
import MasDes2 from '../assets/MasDes/MASDES UCAN 2026-2.png';
import FiligreeBorder from '../assets/assets UCAN/invitation filigri/filigri_invitation card.png';
import Ballroom1 from '../assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom1.png';
import Ballroom2 from '../assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom2.png';
import Ballroom3 from '../assets/assets UCAN/Ballroom/Ballroom Full View/Ballroom3.png';

gsap.registerPlugin(ScrollTrigger);

const nomineeCategories = [
  {
    id: "mapres",
    title: "Mahasiswa Berprestasi",
    subtitle: "Kumpulan Mahasiswa-Mahasiswi yang telah mengharumkan nama Universitas Ciputra",
    icon: Users,
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
    icon: Sparkles,
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
    icon: Sparkles,
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
    icon: Sparkles,
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
    icon: Sparkles,
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
    icon: Sparkles,
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
    icon: Sparkles,
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
    icon: Sparkles,
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
    icon: Sparkles,
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
      const horizontalContainer = horizontalRef.current!;
      const totalWidth = horizontalContainer.scrollWidth;
      const windowWidth = window.innerWidth;
      const finalSlide = horizontalContainer.querySelector('.final-slide') as HTMLElement;

      // Centers the final slide in the viewport at the end of the scroll
      const getXFinal = () => {
        if (!finalSlide) return -(totalWidth - windowWidth);
        return (window.innerWidth - finalSlide.offsetWidth) / 2 - finalSlide.offsetLeft;
      };

      // Master Scroll Storytelling Timeline — single pin, all in sync
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.2,
          invalidateOnRefresh: true,
          // Extra 800px of scroll acts as a "rest/pause" stage so the final slide sits centred
          end: () => `+=${Math.abs(getXFinal()) + 800}`,
        }
      });

      // 1. Horizontal Scroll
      const mainTween = gsap.to(horizontalContainer, {
        x: () => getXFinal(),
        ease: "none",
        duration: 1,
      });
      masterTimeline.add(mainTween, 0);

      // 2. Progress Bar
      const progressTween = gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        duration: 1,
      });
      masterTimeline.add(progressTween, 0);

      // 3. Pillar Parallax — Distant (slower, behind content)
      const distantTween = gsap.to('.ballroom-pillar-distant', {
        x: () => getXFinal() * 0.5,
        ease: "none",
        duration: 1,
      });
      masterTimeline.add(distantTween, 0);

      // 4. Pillar Parallax — Near (faster, in front of content)
      const nearTween = gsap.to('.ballroom-pillar-near', {
        x: () => getXFinal() * 1.5,
        ease: "none",
        duration: 1,
      });
      masterTimeline.add(nearTween, 0);

      // 5. Far Wall Parallax (subtle drift, separate trigger is fine while pinned)
      gsap.to('.ballroom-wall-2', {
        x: () => getXFinal() * 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      // Category Room Background Cross-fades
      const rooms = [Ballroom1, Ballroom2, Ballroom3];
      nomineeCategories.forEach((_, i) => {
        gsap.to(`.ballroom-room-${i % rooms.length}`, {
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

      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        gsap.to(sectionRef.current, {
          '--light-x': `${x}%`,
          '--light-y': `${y}%`,
          duration: 0.5
        });
      });

      // Individual Card Animations (Flourish)
      const cards = gsap.utils.toArray<HTMLElement>('.nominee-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            scale: 0.9,
            rotateY: 15,
            y: 30
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            y: 0,
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

        // Hover tilt + Sheen effect
        const inner = card.querySelector('.storybook-card');
        const sheen = card.querySelector('.mirror-sheen');
        if (inner) {
          card.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            gsap.to(inner, {
              rotateX: rotateX,
              rotateY: rotateY,
              scale: 1.02,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true
            });

            if (sheen) {
              gsap.to(sheen, {
                x: (x / rect.width) * 100 - 50,
                y: (y / rect.height) * 100 - 50,
                duration: 0.5,
                ease: "power2.out"
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(inner, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true
            });
            if (sheen) {
              gsap.to(sheen, { x: 0, y: 0, duration: 0.5 });
            }
          });
        }
      });

      // Category Header Flourish
      const headers = gsap.utils.toArray<HTMLElement>('.category-header');
      headers.forEach((header) => {
        gsap.from(header.querySelectorAll('h3, p, .header-icon'), {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: header,
            containerAnimation: mainTween,
            start: "left 80%",
            end: "left 40%",
            scrub: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-parchment min-h-screen">
      {/* Ballroom Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Category-Specific Full Room Views */}
        <div className="absolute inset-0 z-0">
          {[Ballroom1, Ballroom2, Ballroom3].map((room, i) => (
            <div
              key={i}
              className={`absolute inset-0 ballroom-wall ballroom-room-${i} opacity-0 transition-opacity duration-1000 scale-105`}
              style={{
                backgroundImage: `url(${room})`,
                backgroundPosition: 'center',
                filter: 'brightness(0.6) sepia(0.2)'
              }}
            />
          ))}
        </div>

        {/* Layer 2: Fixed Base Wall */}
        <div
          className="absolute inset-0 ballroom-wall opacity-10 scale-110"
          style={{ backgroundImage: `url(${Wall1})`, backgroundAttachment: 'fixed' }}
        />
        {/* Layer 2: Scrolling Wall Texture */}
        <div
          className="absolute inset-y-0 ballroom-wall-2 w-[400vw] opacity-15"
          style={{ backgroundImage: `url(${Wall2})`, backgroundRepeat: 'repeat-x' }}
        />
        {/* Layer 3: Extra Texture Layer */}
        <div
          className="absolute inset-y-0 ballroom-wall-2 w-[400vw] opacity-10 mix-blend-multiply"
          style={{ backgroundImage: `url(${WallTransp2})`, backgroundRepeat: 'repeat-x', transform: 'translateX(-20%)' }}
        />
        {/* Atmospheric Lighting */}
        <div className="absolute inset-0 z-10 ballroom-lighting" />
        <div
          className="absolute inset-0 z-20 ballroom-overlay"
          style={{ backgroundImage: `url(${WallTransp1})` }}
        />
      </div>

      {/* Floating Parallax Elements (Pillars) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {/* Distant Pillars */}
        {[40, 240, 440, 640, 840, 1040].map((left, i) => (
          <motion.img
            key={`distant-${i}`}
            src={i % 2 === 0 ? Pillar1 : Pillar2}
            className="absolute top-0 h-[80%] object-contain opacity-20 blur-[4px] ballroom-pillar-distant"
            style={{ left: `${left}vw` }}
          />
        ))}

        {/* Near Pillars (Fast Parallax) */}
        {[10, 160, 310, 460, 610, 760, 910, 1060].map((left, i) => (
          <motion.img
            key={`near-${i}`}
            src={i % 2 === 0 ? Pillar1 : Pillar2}
            className="absolute top-0 h-full object-contain opacity-60 ballroom-pillar-near z-[40]"
            style={{ left: `${left}vw` }}
          />
        ))}
      </div>

      {/* Fixed Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-brand-orange/10">
        <div
          ref={progressBarRef}
          className="h-full bg-brand-orange origin-left scale-x-0 shadow-[0_0_10px_rgba(217,106,29,0.5)]"
        />
      </div>

      <div ref={horizontalRef} className="relative z-30 flex h-screen w-max items-center px-[5vw] gap-[8vw]">
        {/* Compact Intro Slide */}
        <div className="flex-shrink-0 w-[80vw] sm:w-[60vw] flex flex-col justify-center relative items-center text-center">
          <div className="relative z-10 p-12 flex flex-col items-center">
            <div className="relative mb-8 group">
              <img
                src={BannerNew}
                className="w-64 h-80 sm:w-80 sm:h-96 object-contain drop-shadow-2xl animate-float-slow group-hover:scale-105 transition-transform duration-700"
                alt="Royal Banner"
              />
              <div className="absolute inset-0 flex items-center justify-center -translate-y-8">
                <Sparkles className="w-16 h-16 text-brand-orange animate-twinkle" />
              </div>
            </div>

            <div className="relative">
              <span className="px-6 py-2 inline-block font-montserrat text-[10px] tracking-[0.6em] uppercase text-brand-orange bg-brand-orange/5 backdrop-blur-md border border-brand-orange/20 mb-8 rounded-full font-bold">
                The Gallery of Excellence
              </span>
              <h2 className="text-[12vw] sm:text-[10vw] leading-[0.8] text-brand-green font-black mb-8 font-cinzel tracking-tighter drop-shadow-sm">
                THE <br /> <span className="text-brand-orange italic">LEGENDS</span>
              </h2>
              <div className="h-1 w-32 bg-brand-orange/20 mx-auto mb-8 rounded-full" />
              <p className="font-cormorant text-2xl sm:text-4xl italic text-brand-green-accent max-w-xl leading-relaxed font-medium">
                "Walk through the royal halls to discover those who carved their names in the university's legacy."
              </p>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 text-brand-orange group cursor-pointer">
            <span className="font-montserrat text-[10px] tracking-[0.4em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">Scroll to Explore</span>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-4"
            >
              <div className="w-24 h-px bg-current" />
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </div>
        </div>

        {/* Category Sections */}
        {nomineeCategories.map((category, i) => {
          const banners = [Banner1, Banner2, Banner3];
          const arches = [PillarArch1, PillarArch2, PillarArch3];
          const BannerImg = banners[i % banners.length];
          const ArchImg = arches[i % arches.length];
          
          return (
            <div
              key={category.id}
              className={`category-section-${i} flex-shrink-0 flex items-center gap-[5vw] pr-[5vw] border-l border-dashed border-brand-orange/20 pl-[5vw]`}
            >
              {/* Category Header Slide — Grand Architectural Portal */}
              <div className="category-header w-[95vw] sm:w-[65vw] flex flex-col justify-center items-center text-center relative group min-h-[80vh]">
                {/* 1. Grand Archway Frame */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img
                    src={ArchImg}
                    alt=""
                    className="h-[110%] w-auto object-contain transition-transform duration-1000 group-hover:scale-110 opacity-90 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* 2. Integrated Banner (Inside Arch) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden mask-arch">
                   <img
                    src={BannerImg}
                    alt=""
                    className="h-[70%] w-auto object-contain opacity-40 translate-y-10 group-hover:scale-125 transition-transform duration-1000"
                  />
                </div>
                
                {/* 3. The Content Tablet */}
                <div className="relative z-10 px-12 py-12 flex flex-col items-center max-w-2xl bg-white/5 backdrop-blur-[2px] rounded-[3rem] border border-white/10 shadow-inner">
                  {/* Glowing Seal */}
                  <div className="mb-10 relative">
                    <div className="absolute inset-0 bg-brand-orange blur-[40px] opacity-30 animate-pulse" />
                    <div className="w-20 h-20 rounded-full border-2 border-brand-orange/30 flex items-center justify-center bg-brand-orange/5 relative z-10">
                      <category.icon className="w-10 h-10 text-brand-orange drop-shadow-[0_0_15px_rgba(217,106,29,0.8)]" />
                    </div>
                  </div>

                  {/* Dramatic Typography */}
                  <h3 className="text-6xl sm:text-[7vw] text-brand-green font-bold mb-10 font-cinzel leading-[0.8] tracking-tighter">
                    {category.title.split(' ').map((word, idx) => (
                      <span key={idx} className="block last:text-brand-orange last:italic last:font-black">
                        {word}
                      </span>
                    ))}
                  </h3>

                  {/* Ornate Divider Flourish */}
                  <div className="flex items-center gap-8 mb-10 w-full px-12">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
                    <img src={MasDes1} className="h-10 object-contain opacity-60 drop-shadow-md" alt="" />
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-brand-orange/40 to-transparent" />
                  </div>

                  {/* Elevated Subtitle */}
                  <div className="relative">
                    <p className="font-montserrat text-xs sm:text-sm tracking-[0.6em] uppercase text-brand-orange font-black leading-relaxed">
                      {category.subtitle}
                    </p>
                    <img src={MasDes2} className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-4 object-contain opacity-30" alt="" />
                  </div>
                </div>

                {/* Floating Particles for the Arch */}
                <div className="absolute inset-0 pointer-events-none">
                   {[...Array(6)].map((_, i) => (
                     <div 
                       key={i}
                       className="absolute w-2 h-2 rounded-full bg-brand-orange opacity-40 animate-twinkle"
                       style={{ 
                         top: `${30 + Math.random() * 40}%`, 
                         left: `${30 + Math.random() * 40}%`,
                         animationDelay: `${i * 0.5}s`
                       }}
                     />
                   ))}
                </div>
              </div>

              {/* Nominee Cards */}
            {category.nominees.map((nominee, idx) => (
              <div key={idx} className="nominee-card flex-shrink-0 w-[340px] sm:w-[450px] group relative" style={{ perspective: '2000px' }}>
                <div className="storybook-card p-0 overflow-hidden border-none shadow-2xl transition-all duration-1000 bg-transparent rounded-2xl golden-bloom">
                  <div className="aspect-[3/4.5] relative overflow-hidden bg-parchment-dark">
                    <ImageWithFallback src={nominee.image} alt={nominee.name} className="card-image w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />

                    {/* Mirror Sheen Overlay */}
                    <div className="mirror-sheen" />

                    {/* Filigree Corners */}
                    <div className="filigree-corner filigree-top-left" style={{ backgroundImage: `url(${FiligreeBorder})` }} />
                    <div className="filigree-corner filigree-top-right" style={{ backgroundImage: `url(${FiligreeBorder})` }} />
                    <div className="filigree-corner filigree-bottom-left" style={{ backgroundImage: `url(${FiligreeBorder})` }} />
                    <div className="filigree-corner filigree-bottom-right" style={{ backgroundImage: `url(${FiligreeBorder})` }} />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B3A0A] via-[#0B3A0A]/40 to-transparent opacity-90 z-10" />

                    <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-white z-20">
                      <motion.div>
                        <p className="text-brand-orange font-montserrat text-[10px] tracking-[0.4em] uppercase mb-3 font-bold opacity-100">{nominee.role}</p>
                        <h4 className="text-3xl sm:text-4xl font-cinzel mb-4 leading-tight drop-shadow-lg">{nominee.name}</h4>
                        <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-brand-orange to-transparent transition-all duration-1000 mb-4" />
                        <p className="text-sm text-white/90 leading-relaxed font-cormorant italic opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                          "{nominee.description}"
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          );
        })}

        {/* Final Slide */}
        <div className="final-slide flex-shrink-0 w-[90vw] flex flex-col justify-center items-center text-center px-[10vw] relative">
          <div className="relative mb-12">
            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-brand-gold/10 border-2 border-dashed border-brand-orange/40 flex items-center justify-center backdrop-blur-sm shadow-[0_0_50px_rgba(217,106,29,0.2)]">
              <Trophy className="w-16 h-16 sm:w-24 sm:h-24 text-brand-orange drop-shadow-[0_0_15px_rgba(217,106,29,0.5)]" />
            </div>
            <div className="absolute -inset-10 bg-brand-orange/20 blur-[80px] rounded-full -z-10 animate-pulse" />
            <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-brand-orange animate-twinkle" />
          </div>

          <div className="bg-white/10 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl">
            <h3 className="text-4xl sm:text-7xl text-brand-green font-cinzel mb-6 tracking-tight">The Journey <br /><span className="text-brand-orange italic drop-shadow-md">Continues</span></h3>
            <p className="font-cormorant text-2xl sm:text-3xl italic text-brand-green-accent max-w-lg mx-auto mb-12 leading-relaxed font-medium">
              "Your presence is the final brushstroke in this masterpiece of achievement."
            </p>

            <button
              onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
              className="vintage-button scale-110 sm:scale-125 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-10 transition-opacity" />
              <span className="relative z-10 font-bold">RESERVE YOUR SEAT</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-3 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
