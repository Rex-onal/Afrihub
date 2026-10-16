import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Zap } from 'lucide-react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { DottedMapPattern } from '../ui/DottedMapPattern';
import { StatCounter } from '../ui/StatCounter';
import { STATS } from '../../content/stats';

import hero1 from '../../assets/hero/hero-1.webp';
import hero2 from '../../assets/hero/hero-2.webp';
import hero3 from '../../assets/hero/hero-3.webp';
import hero4 from '../../assets/hero/hero-4.webp';

const HERO_IMAGES = [
  {
    src: hero1,
    alt: 'Young African tech builders collaborating around laptops in an innovation hub',
  },
  {
    src: hero2,
    alt: 'African tech developers collaborating and reviewing code on a laptop screen',
  },
  {
    src: hero3,
    alt: 'African developers participating in a tech roadmap workshop with laptops',
  },
  {
    src: hero4,
    alt: 'African software engineers learning and presenting code at a tech code camp',
  },
];

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax offsets for 3 depth layers
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointerFine, setIsPointerFine] = useState(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(pointer: fine)').matches;
    }
    return false;
  });

  // Photo carousel index & visibility pausing
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Check pointer device support (disable parallax on touch screens)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Mouse move handler for desktop 3-layer parallax
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (shouldReduceMotion || !isPointerFine) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    },
    [shouldReduceMotion, isPointerFine]
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  // Tab visibility & Intersection Observer for pausing looping animations
  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsPaused(true);
        } else if (!document.hidden) {
          setIsPaused(false);
        }
      },
      { threshold: 0.1 }
    );

    const el = heroRef.current;
    if (el) observer.observe(el);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (el) observer.unobserve(el);
    };
  }, []);

  // Photo cycling interval (5 seconds, pauses when hidden or offscreen, disabled under reduced motion)
  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;

    const interval = setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isPaused]);

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 lg:py-24 border-b border-[#D7C3AE]/40 overflow-hidden bg-[#FCF9F8]"
    >
      {/* Parallax Layer 1: Dotted Map Pattern & Ambient Gradients */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform:
            !shouldReduceMotion && isPointerFine
              ? `translate3d(${mousePos.x * -14}px, ${mousePos.y * -14}px, 0)`
              : 'none',
        }}
      >
        <DottedMapPattern dotColor="#857462" dotSize={1.2} gap={24} className="opacity-15" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#F5A623]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#006C4C]/10 blur-3xl pointer-events-none" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Staggered CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Eyebrow with pulsing indicator */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-2.5 mb-5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500]">
                PAN-AFRICAN TECH NEXUS
              </span>
            </motion.div>

            {/* Headline: Visible from frame 1 (opacity: 1), animates with transform only for LCP safety */}
            <motion.h1
              initial={shouldReduceMotion ? false : { y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#1C1B1B] tracking-tight leading-[1.12] mb-6"
            >
              Where Africa&apos;s tech talent{' '}
              <span className="relative inline-block text-[#835500]">
                rises together
                <span className="absolute left-0 bottom-1 w-full h-3 bg-[#F5A623]/25 -z-10 rounded" />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="text-base sm:text-lg text-[#524534] max-w-xl mb-9 leading-relaxed font-sans"
            >
              Events, hackathons, scholarships, and opportunities that connect African talent to the
              world.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
            >
              <Button
                as="link"
                to="/join"
                variant="primary"
                size="lg"
                leftIcon={<Zap className="w-4 h-4 fill-current text-[#F5A623]" />}
                className="shadow-md bg-[#1C1B1B] text-white hover:bg-[#2C2A2A] border border-transparent"
              >
                Join the Community
              </Button>

              <Button
                as="link"
                to="/partners"
                variant="outline"
                size="lg"
                className="border-[#1C1B1B] text-[#1C1B1B] hover:bg-[#1C1B1B] hover:text-white"
              >
                Partner With Us
              </Button>
            </motion.div>

            {/* Social Proof Pill with National Flags & StatCounter */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-full border border-[#D7C3AE]/70 shadow-sm"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F5A623]/20 flex items-center justify-center text-xs font-bold text-[#1C1B1B]">
                  NG
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#86F8C6]/50 flex items-center justify-center text-xs font-bold text-[#006C4C]">
                  KE
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#5EBFFF]/40 flex items-center justify-center text-xs font-bold text-[#006492]">
                  GH
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#FFDAD6] flex items-center justify-center text-xs font-bold text-[#BA1A1A]">
                  RW
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#524534] font-sans flex items-center gap-1.5 flex-wrap">
                <span>Empowering</span>
                <span className="font-bold text-[#1C1B1B]">
                  <StatCounter value="10,000+" duration={1.2} />
                </span>
                <span>developers across {STATS.nations.value} African nations</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Mask & Hackathon Atmosphere */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Parallax Layer 3: Floating Accent Dots drifting around the frame */}
            <div
              className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
              style={{
                transform:
                  !shouldReduceMotion && isPointerFine
                    ? `translate3d(${mousePos.x * 32}px, ${mousePos.y * 32}px, 0)`
                    : 'none',
              }}
            >
              <div
                className={`absolute -top-4 -left-4 w-4 h-4 rounded-full bg-[#F5A623] ${
                  !shouldReduceMotion && !isPaused ? 'animate-bounce' : ''
                }`}
                style={{ animationDuration: '4s' }}
              />
              <div className="absolute top-1/4 -right-3 w-5 h-5 rounded-full bg-[#006C4C]" />
              <div className="absolute -bottom-6 left-8 w-6 h-6 rounded-full bg-[#006492]" />
              <div className="absolute bottom-1/3 -left-6 w-3 h-3 rounded-full bg-[#E8572A]" />
              <div className="absolute top-2 right-12 w-3.5 h-3.5 rounded-full bg-[#F5A623]" />
            </div>

            {/* Parallax Layer 2: Main Photo Card with Ken Burns Zoom & Crossfade */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                transform:
                  !shouldReduceMotion && isPointerFine
                    ? `translate3d(${mousePos.x * 16}px, ${mousePos.y * 16}px, 0)`
                    : 'none',
              }}
              className="relative w-full max-w-[480px] bg-white p-3 rounded-[32px] shadow-[0_12px_40px_rgba(28,27,27,0.08)] border border-[#D7C3AE]/40 transition-transform duration-500 hover:rotate-0"
            >
              <div className="relative w-full h-[400px] sm:h-[460px] rounded-[24px] overflow-hidden bg-[#1C1B1B]">
                {/* Cycling Hero Images */}
                {HERO_IMAGES.map((img, idx) => {
                  const isActive = idx === currentPhotoIdx;
                  return (
                    <motion.img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      initial={false}
                      animate={
                        shouldReduceMotion
                          ? { opacity: idx === 0 ? 1 : 0 }
                          : {
                              opacity: isActive ? 1 : 0,
                              scale: isActive ? 1.05 : 1,
                            }
                      }
                      transition={{
                        opacity: { duration: 1.2, ease: 'easeInOut' },
                        scale: { duration: 5.5, ease: 'easeOut' },
                      }}
                      className="absolute inset-0 w-full h-full object-cover object-center filter saturate-[1.08]"
                    />
                  );
                })}

                {/* Atmospheric gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B]/80 via-transparent to-transparent pointer-events-none" />

                {/* Layer 3: Floating Micro Badge over the image */}
                <div
                  className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between border border-[#D7C3AE]/60 shadow-lg"
                  style={{
                    transform:
                      !shouldReduceMotion && isPointerFine
                        ? `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`
                        : 'none',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#006C4C] animate-ping" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#1C1B1B] font-sans">
                        Live: Co-Create Naija Sprint
                      </h4>
                      <p className="text-[11px] text-[#524534] font-sans">
                        Lagos · Nairobi · Remote Hubs
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#86F8C6]/40 text-[#006C4C] font-bold font-sans">
                    2.4k Active
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};
