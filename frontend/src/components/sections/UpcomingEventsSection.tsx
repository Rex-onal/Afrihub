import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../layout/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { UPCOMING_EVENTS } from '../../content/events';
import { staggerContainer, staggerItem } from '../../lib/motion';

export const UpcomingEventsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="events" className="py-20 md:py-24 bg-[#FCF9F8] relative">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="WHAT'S HAPPENING"
          title="Upcoming Events"
          subtitle="Join fellow builders in-person and virtually across major tech hubs."
        />

        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : 'initial'}
          whileInView={shouldReduceMotion ? undefined : 'animate'}
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {UPCOMING_EVENTS.map((event) => (
            <motion.div
              key={event.id}
              variants={shouldReduceMotion ? undefined : staggerItem}
              className="h-full"
            >
              <Card
                variant="surface"
                hoverLift
                className="p-0 overflow-hidden rounded-[20px] bg-white border border-[#D7C3AE]/40 shadow-[0_10px_35px_rgba(28,27,27,0.06)] flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Photo with Category Badge */}
                  <div className="h-52 w-full overflow-hidden relative">
                    <img
                      src={event.image}
                      alt={event.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className={`absolute top-4 right-4 text-xs font-bold font-sans px-3 py-1 rounded-full backdrop-blur-md shadow-sm ${event.categoryColor}`}
                    >
                      {event.category}
                    </span>
                  </div>

                  {/* 3-Column Metadata Strip */}
                  <div className="grid grid-cols-3 border-b border-[#D7C3AE]/40 py-3 text-center bg-[#F0EDEC]/40 font-sans">
                    <div className="px-2">
                      <div className="text-xs uppercase tracking-wide text-[#835500] font-bold">
                        {event.dateBadge}
                      </div>
                      <div className="text-[11px] text-[#524534]">{event.dateDetail}</div>
                    </div>
                    <div className="border-x border-[#D7C3AE]/60 px-2">
                      <div className="text-xs font-bold text-[#1C1B1B] truncate">
                        {event.location}
                      </div>
                      <div className="text-[11px] text-[#524534]">{event.locationType}</div>
                    </div>
                    <div className="px-2">
                      <div className="text-xs font-bold text-[#006C4C] truncate">
                        {event.capacityOrStatus}
                      </div>
                      <div className="text-[11px] text-[#524534]">{event.capacityLabel}</div>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1B1B] mb-2.5 group-hover:text-[#835500] transition-colors leading-snug">
                      {event.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#524534] leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Footer Learn More Action */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#D7C3AE]/20">
                  <span className="text-xs sm:text-sm text-[#524534] font-medium font-sans">
                    {event.ctaText}
                  </span>
                  <Link
                    to={event.ctaHref}
                    aria-label={`Learn more about ${event.title}`}
                    className="w-10 h-10 rounded-xl bg-[#F5A623] text-[#1C1B1B] flex items-center justify-center shadow-sm hover:bg-[#E09618] active:scale-95 transition-all"
                  >
                    <Plus className="w-5 h-5" aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
