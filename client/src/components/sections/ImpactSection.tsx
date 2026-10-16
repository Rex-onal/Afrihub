import React from 'react';
import { Users, Trophy, Award, Globe } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../layout/Container';
import { Card } from '../ui/Card';
import { StatCounter } from '../ui/StatCounter';
import { DottedMapPattern } from '../ui/DottedMapPattern';
import { STATS } from '../../content/stats';
import { fadeInUp } from '../../lib/motion';

import africaMapUrl from '../../assets/africa-map.svg';

interface CityHubPin {
  name: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  pulseDelay: string;
  labelPosition?: string;
}

const CITY_HUBS: CityHubPin[] = [
  { name: 'Cairo', top: '16%', right: '26%', pulseDelay: '0s' },
  { name: 'Lagos', top: '42%', left: '26%', pulseDelay: '0.4s', labelPosition: 'absolute -top-5 -left-1' },
  { name: 'Accra', top: '50%', left: '16%', pulseDelay: '0.8s', labelPosition: 'absolute top-4 -left-1' },
  { name: 'Nairobi', top: '53%', right: '20%', pulseDelay: '1.2s' },
  { name: 'Kigali', top: '60%', right: '28%', pulseDelay: '1.6s' },
  { name: 'Johannesburg', bottom: '16%', right: '34%', pulseDelay: '2.0s', labelPosition: 'absolute top-4 -left-4' },
];

export const ImpactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="impact"
      className="py-20 md:py-24 bg-[#F0EDEC]/80 map-pattern relative border-y border-[#D7C3AE]/40 overflow-hidden"
    >
      <DottedMapPattern dotColor="#857462" dotSize={1.2} gap={24} className="opacity-15" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Stat Metrics */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            initial={shouldReduceMotion ? undefined : 'initial'}
            whileInView={shouldReduceMotion ? undefined : 'animate'}
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-6"
          >
            <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-3 inline-block">
              MEASURABLE TRANSFORMATION
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#1C1B1B] tracking-tight leading-[1.2] mb-4">
              Our Impact Across Africa
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#524534] mb-10 leading-relaxed max-w-lg">
              Through sustained communal support, localized learning tracks, and direct sponsorship,
              we turn technical ambition into tangible economic independence.
            </p>

            {/* 2x2 Grid of Stat Cards */}
            <div className="grid grid-cols-2 gap-5">
              {/* Stat 1: Community Members */}
              <Card
                variant="surface"
                className="p-6 rounded-[20px] bg-white border border-[#D7C3AE]/30 shadow-sm flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#835500] mb-3">
                  <Users className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
                    <StatCounter value="10,000+" duration={1.6} />
                  </div>
                  <div className="font-sans text-xs sm:text-sm text-[#524534] font-medium mt-1">
                    Community Members
                  </div>
                </div>
              </Card>

              {/* Stat 2: Events Hosted */}
              <Card
                variant="surface"
                className="p-6 rounded-[20px] bg-white border border-[#D7C3AE]/30 shadow-sm flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#835500] mb-3">
                  <Trophy className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
                    <StatCounter value="40+" duration={1.6} />
                  </div>
                  <div className="font-sans text-xs sm:text-sm text-[#524534] font-medium mt-1">
                    Events Hosted
                  </div>
                </div>
              </Card>

              {/* Stat 3: Scholarships Awarded */}
              <Card
                variant="surface"
                className="p-6 rounded-[20px] bg-white border border-[#D7C3AE]/30 shadow-sm flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#835500] mb-3">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
                    <StatCounter value="$2.5M+" duration={1.6} />
                  </div>
                  <div className="font-sans text-xs sm:text-sm text-[#524534] font-medium mt-1">
                    Scholarships Awarded
                  </div>
                </div>
              </Card>

              {/* Stat 4: Countries Reached */}
              <Card
                variant="surface"
                className="p-6 rounded-[20px] bg-white border border-[#D7C3AE]/30 shadow-sm flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#835500] mb-3">
                  <Globe className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
                    <StatCounter value={`${STATS.nations.value}`} duration={1.4} />
                  </div>
                  <div className="font-sans text-xs sm:text-sm text-[#524534] font-medium mt-1">
                    African Nations
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Right: Africa Map Illustration with 6 Pulsing City Pins */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            initial={shouldReduceMotion ? undefined : 'initial'}
            whileInView={shouldReduceMotion ? undefined : 'animate'}
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[460px] h-[520px] bg-white/80 backdrop-blur rounded-[28px] p-6 shadow-[0_12px_40px_rgba(28,27,27,0.06)] border border-[#D7C3AE]/50 flex items-center justify-center overflow-hidden">
              {/* Silhouette Continent Background */}
              <div className="relative w-72 h-88 flex items-center justify-center">
                {/* Africa map SVG with warm gradient mask */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={africaMapUrl}
                    alt="Africa Continental Map"
                    className="w-full h-full object-contain filter contrast-125 opacity-25"
                  />
                  {/* Subtle warm gradient wash over the continent */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-4 rounded-3xl bg-gradient-to-br from-[#F5A623]/30 via-[#E8572A]/20 to-[#006C4C]/30 blur-xl pointer-events-none"
                  />
                </div>

                {/* 6 City Hub Pins with sequential pulsing rings */}
                {CITY_HUBS.map((pin) => (
                  <div
                    key={pin.name}
                    className="absolute z-20 flex items-center gap-1.5 group cursor-pointer"
                    style={{
                      top: pin.top,
                      left: pin.left,
                      right: pin.right,
                      bottom: pin.bottom,
                    }}
                  >
                    {/* Pulsing concentric ring */}
                    <span className="relative flex h-3.5 w-3.5">
                      {!shouldReduceMotion && (
                        <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#835500] opacity-75"
                          style={{ animationDelay: pin.pulseDelay, animationDuration: '2.5s' }}
                        />
                      )}
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#835500] border-2 border-white shadow-sm" />
                    </span>

                    {/* City Name Badge */}
                    <span
                      className={`bg-[#1C1B1B]/95 text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded shadow-sm opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all whitespace-nowrap ${
                        pin.labelPosition || ''
                      }`}
                    >
                      {pin.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Floating metrics pill in corner */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#D7C3AE]/60 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006C4C] animate-pulse" />
                  <span className="text-xs font-semibold text-[#1C1B1B] font-sans">
                    54 Pan-African Regional Nodes
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#835500] font-mono tracking-wider">
                  100% LATENCY-FREE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
