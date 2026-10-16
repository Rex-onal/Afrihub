import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { DottedMapPattern } from '../ui/DottedMapPattern';
import { fadeInUp } from '../../lib/motion';

import hero1 from '../../assets/hero/hero-1.webp';
import hero2 from '../../assets/hero/hero-2.webp';
import hero3 from '../../assets/hero/hero-3.webp';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="py-20 md:py-24 bg-[#F0EDEC]/60 relative border-y border-[#D7C3AE]/40 overflow-hidden"
    >
      <DottedMapPattern dotColor="#857462" dotSize={1.2} gap={24} className="opacity-15" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Overlapping Photo Cluster */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            initial={shouldReduceMotion ? undefined : 'initial'}
            whileInView={shouldReduceMotion ? undefined : 'animate'}
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Decorative Floating Accent Dots */}
            <div className="absolute -top-3 left-10 w-4 h-4 rounded-full bg-[#F5A623]" />
            <div className="absolute top-1/2 -left-4 w-5 h-5 rounded-full bg-[#006C4C]" />
            <div className="absolute -bottom-4 right-1/4 w-4 h-4 rounded-full bg-[#006492]" />
            <div className="absolute bottom-1/3 -right-2 w-3.5 h-3.5 rounded-full bg-[#E8572A]" />

            <div className="relative w-full max-w-[440px] h-[380px] sm:h-[420px]">
              {/* Primary Circle Photo */}
              <div className="absolute top-0 left-2 sm:left-4 w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-white shadow-[0_12px_35px_rgba(28,27,27,0.12)]">
                <img
                  src={hero1}
                  alt="Young African tech builders collaborating in an innovation hub"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Secondary Circle Photo */}
              <div className="absolute bottom-2 left-20 sm:left-24 w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-white shadow-[0_12px_35px_rgba(28,27,27,0.12)]">
                <img
                  src={hero3}
                  alt="African developers participating in a technical workshop"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tertiary Smaller Circle Photo */}
              <div className="absolute top-10 right-0 sm:right-2 w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-[0_12px_35px_rgba(28,27,27,0.12)]">
                <img
                  src={hero2}
                  alt="African developers reviewing code together"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative & Mission */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            initial={shouldReduceMotion ? undefined : 'initial'}
            whileInView={shouldReduceMotion ? undefined : 'animate'}
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-3">
              ABOUT AFRIHUB
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#1C1B1B] tracking-tight leading-[1.2] mb-4">
              Growing Talent, Connecting Opportunity
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#1C1B1B] font-semibold mb-4 leading-relaxed">
              We are bridging the gap between raw potential and global tech leadership.
            </p>

            <p className="font-sans text-sm sm:text-base text-[#524534] mb-8 leading-relaxed">
              AfriHub was born out of a profound conviction: geographical boundaries should never
              limit technical ambition. By equipping emerging developers, AI researchers, and
              hardware builders across Cairo to Cape Town with world-class mentorship, compute
              infrastructure, and peer solidarity, we cultivate self-sustaining hubs of technological
              autonomy.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-5">
              <Button
                as="link"
                to="/about"
                variant="primary"
                size="md"
                className="bg-[#1C1B1B] text-white hover:bg-[#2C2A2A] shadow-md border border-transparent"
              >
                Learn More
              </Button>

              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-sm font-bold text-[#1C1B1B] hover:text-[#835500] transition-colors group"
              >
                <div className="w-11 h-11 rounded-full bg-[#006C4C] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 fill-current ml-0.5" aria-hidden="true" />
                </div>
                <span>Our Story</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
