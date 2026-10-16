import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Code, GraduationCap, Briefcase } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../layout/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { PROGRAMMES } from '../../content/programmes';
import { staggerContainer, staggerItem } from '../../lib/motion';

const ICON_MAP = {
  calendar: Calendar,
  code: Code,
  'graduation-cap': GraduationCap,
  briefcase: Briefcase,
};

export const WhatWeDoSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="what-we-do" className="py-20 md:py-24 bg-[#FCF9F8] relative">
      <Container>
        {/* Header */}
        <SectionHeader
          align="center"
          eyebrow="WHAT WE DO"
          title="Built for Builders"
          subtitle="Comprehensive pathways designed to accelerate your growth from student to world-class engineer."
        />

        {/* 4-Card Grid */}
        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : 'initial'}
          whileInView={shouldReduceMotion ? undefined : 'animate'}
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PROGRAMMES.map((prog) => {
            const IconComponent = ICON_MAP[prog.iconName];

            return (
              <motion.div
                key={prog.id}
                variants={shouldReduceMotion ? undefined : staggerItem}
                className="h-full"
              >
                <Card
                  variant="surface"
                  hoverLift
                  className="h-full p-7 flex flex-col justify-between group rounded-[20px] bg-white border border-[#D7C3AE]/40 shadow-[0_10px_35px_rgba(28,27,27,0.04)]"
                >
                  <div>
                    {/* Icon container */}
                    <div
                      className={`w-14 h-14 rounded-2xl bg-[#F0EDEC] flex items-center justify-center text-[#1C1B1B] mb-6 transition-colors ${prog.hoverBg}`}
                    >
                      <IconComponent className="w-7 h-7" aria-hidden="true" />
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1C1B1B] mb-3">
                      {prog.title}
                    </h3>

                    <p className="font-sans text-sm text-[#524534] leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="mt-8 pt-2">
                    <Link
                      to={prog.linkHref}
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:underline"
                      style={{ color: prog.accentColor }}
                    >
                      <span>{prog.linkText}</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};
