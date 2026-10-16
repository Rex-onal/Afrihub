import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { fadeInUp } from '../../lib/motion';

export const JoinCtaSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="community" className="py-12 md:py-20 bg-[#FCF9F8] relative">
      <Container>
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeInUp}
          initial={shouldReduceMotion ? undefined : 'initial'}
          whileInView={shouldReduceMotion ? undefined : 'animate'}
          viewport={{ once: true, margin: '-60px' }}
          className="relative bg-[#1C1B1B] text-white rounded-[28px] p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl"
        >
          {/* Radial ambient glow accents */}
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-[#F5A623]/20 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute left-10 -bottom-10 w-72 h-72 rounded-full bg-[#006C4C]/20 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.18em] text-[#F5A623] font-bold font-sans inline-block mb-3">
              YOUR PLACE IN THE ECOSYSTEM
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] text-white font-bold tracking-tight mb-4 leading-tight">
              Ready to grow with Africa&apos;s tech community?
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#F3F0EF]/80 mb-8 leading-relaxed">
              Whether you are writing your first line of code or scaling an enterprise platform,
              there is a place for you in AfriHub. Connect, build, and lead.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                as="link"
                to="/join"
                variant="primary"
                size="lg"
                className="bg-[#F5A623] text-[#1C1B1B] hover:bg-[#E09618] font-bold shadow-lg"
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
              >
                Join AfriHub Today
              </Button>

              <Button
                as="link"
                to="/partners"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Partner With AfriHub
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
