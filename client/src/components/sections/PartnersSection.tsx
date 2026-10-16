import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { PARTNERS } from '../../content/partners';
import { fadeInUp, staggerContainer, staggerItem } from '../../lib/motion';

export const PartnersSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="partners" className="py-20 md:py-24 bg-[#FCF9F8] text-center relative">
      <Container>
        {/* Header Block */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeInUp}
          initial={shouldReduceMotion ? undefined : 'initial'}
          whileInView={shouldReduceMotion ? undefined : 'animate'}
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-2xl mx-auto mb-10"
        >
          <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 inline-block">
            PARTNER WITH US
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#1C1B1B] tracking-tight leading-[1.2] mb-4">
            Invest in Africa&apos;s Tech Future
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#524534] mb-8 leading-relaxed">
            Join visionary technology enterprises sponsoring community hackathons, funding tech
            scholarships, and directly hiring our vetted graduates.
          </p>

          <Button
            as="link"
            to="/partners"
            variant="primary"
            size="lg"
            className="shadow-md bg-[#F5A623] text-[#1C1B1B] hover:bg-[#E09618]"
          >
            Become a Partner
          </Button>
        </motion.div>

        {/* 6-Logo Fictional Partner Grid */}
        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : 'initial'}
          whileInView={shouldReduceMotion ? undefined : 'animate'}
          viewport={{ once: true, margin: '-60px' }}
          className="pt-12 border-t border-[#D7C3AE]/50 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center"
        >
          {PARTNERS.map((partner) => (
            <motion.div
              key={partner.id}
              variants={shouldReduceMotion ? undefined : staggerItem}
              className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-white/70 transition-all duration-200 group w-full"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2.5 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="font-sans font-bold text-xs sm:text-sm text-[#1C1B1B] tracking-tight">
                {partner.name}
              </span>
              <span className="font-sans text-[11px] text-[#524534]/80 mt-0.5">
                {partner.role}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
