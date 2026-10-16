import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UPCOMING_EVENTS, PAST_EVENTS } from '../content/events';
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Sparkles,
  History,
  Building2,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { cn } from '../lib/utils';

type FilterCategory = 'All' | 'Hackathon' | 'Workshop' | 'Summit';

export const EventsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const shouldReduceMotion = useReducedMotion();

  const featuredEvent = UPCOMING_EVENTS.find((e) => e.isFeatured) || UPCOMING_EVENTS[0];

  const filteredEvents =
    activeCategory === 'All'
      ? UPCOMING_EVENTS
      : UPCOMING_EVENTS.filter((e) => e.category === activeCategory);

  return (
    <PageWrapper>
      {/* Per-page SEO & Meta tags */}
      <title>Technical Events & Summits | AfriHub Tech Community</title>
      <meta
        name="description"
        content="Discover upcoming pan-African hackathons, developer bootcamps, and tech leadership summits. Free showcase access for community members across 54 nations."
      />
      <meta property="og:title" content="Technical Events & Summits | AfriHub Tech Community" />
      <meta
        property="og:description"
        content="Upcoming and past showcase events uniting builders across Africa."
      />

      {/* Hero Section */}
      <section className="pt-8 pb-12 md:py-16 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#835500]">
                PAN-AFRICAN GATHERINGS
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#1C1B1B] tracking-tight leading-[1.12] mb-5">
              Technical Events &{' '}
              <span className="italic font-normal text-[#835500]">Continental Summits</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#524534] leading-relaxed mb-6">
              Join fellow builders in-person and virtually across major tech corridors.
              All events are designed to accelerate technical mastery, foster cross-border collaboration,
              and connect developers with opportunity.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Event Showcase */}
      {featuredEvent && (
        <section className="pb-14">
          <Container>
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1C1B1B] to-[#2C2B2B] text-white shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs font-bold uppercase tracking-wider mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FEATURED EVENT SHOWCASE</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    {featuredEvent.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#F3F0EF]/80 leading-relaxed mb-6 max-w-xl">
                    {featuredEvent.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#F3F0EF]/80 mb-8 pt-4 border-t border-white/15">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#F5A623]" />
                      <span>{featuredEvent.dateBadge}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F5A623]" />
                      <span>{featuredEvent.location} ({featuredEvent.locationType})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#F5A623]" />
                      <span>{featuredEvent.capacityOrStatus}</span>
                    </div>
                  </div>

                  <Link to={featuredEvent.ctaHref}>
                    <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      {featuredEvent.ctaText}
                    </Button>
                  </Link>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] border border-white/20 shadow-lg">
                    <img
                      src={featuredEvent.image}
                      alt={featuredEvent.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Category Filter Tabs & Upcoming Events Grid */}
      <section className="py-12 bg-[#F0EDEC]/40 border-y border-[#D7C3AE]/30">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-1 block">
                UPCOMING SCHEDULE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
                Upcoming Gatherings
              </h2>
            </div>

            {/* Filter Tabs */}
            <div
              className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#D7C3AE]/50 self-start sm:self-auto overflow-x-auto max-w-full"
              role="tablist"
              aria-label="Filter events by category"
            >
              {(['All', 'Hackathon', 'Workshop', 'Summit'] as FilterCategory[]).map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#835500]',
                      isActive
                        ? 'bg-[#1C1B1B] text-white shadow-xs'
                        : 'text-[#524534] hover:text-[#1C1B1B] hover:bg-[#F0EDEC]'
                    )}
                  >
                    {cat === 'All' ? 'All Events' : `${cat}s`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Events Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card hoverLift className="flex flex-col justify-between overflow-hidden border-[#D7C3AE]/40 bg-white h-full">
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <span
                            className={cn(
                              'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs',
                              event.categoryColor
                            )}
                          >
                            {event.category}
                          </span>
                        </div>
                      </div>

                      {/* Metadata Strip */}
                      <div className="grid grid-cols-3 text-center border-y border-[#D7C3AE]/30 bg-[#FCF9F8] py-2.5 px-3 text-[11px]">
                        <div>
                          <span className="font-bold text-[#1C1B1B] block">{event.dateBadge}</span>
                          <span className="text-[#857462] block text-[10px]">{event.dateDetail}</span>
                        </div>
                        <div className="border-x border-[#D7C3AE]/30">
                          <span className="font-bold text-[#1C1B1B] block">{event.location}</span>
                          <span className="text-[#857462] block text-[10px]">{event.locationType}</span>
                        </div>
                        <div>
                          <span className="font-bold text-[#1C1B1B] block">{event.capacityOrStatus}</span>
                          <span className="text-[#857462] block text-[10px]">{event.capacityLabel}</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="p-5">
                        <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-2 leading-snug">
                          {event.title}
                        </h3>
                        <p className="text-xs text-[#524534] leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="p-5 pt-2 border-t border-[#D7C3AE]/20 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#524534]">{event.ctaText}</span>
                      <Link
                        to={event.ctaHref}
                        aria-label={`Learn more about ${event.title}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5A623] text-[#1C1B1B] text-xs font-bold hover:bg-[#E09618] active:scale-95 transition-all shadow-xs"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* Past Events Archive */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-2xl mb-10">
            <div className="flex items-center gap-2 mb-2">
              <History className="w-4 h-4 text-[#835500]" />
              <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500]">
                IMPACT ARCHIVE
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
              Past Events & Hackathons
            </h2>
            <p className="text-xs sm:text-sm text-[#524534] mt-2">
              A record of prototype sprints, developer bootcamps, and policy symposiums convened across the continent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAST_EVENTS.map((pe) => (
              <Card key={pe.id} className="p-5 border-[#D7C3AE]/40 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#835500]">
                    {pe.category}
                  </span>
                  <span className="text-xs text-[#857462]">{pe.date}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#1C1B1B] mb-2">
                  {pe.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#524534] pt-2 border-t border-[#D7C3AE]/20">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#857462]" />
                    {pe.location}
                  </span>
                  <span>•</span>
                  <span>{pe.participants}</span>
                </div>
                <p className="text-xs text-[#006C4C] font-medium mt-2 bg-[#86F8C6]/15 p-2 rounded-lg">
                  Outcome: {pe.outcome}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Host an Event With Us CTA */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FCF9F8] border-2 border-dashed border-[#D7C3AE] text-center max-w-3xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/20 text-[#835500] flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B] mb-2">
              Host or Sponsor an Event With AfriHub
            </h2>
            <p className="text-xs sm:text-sm text-[#524534] max-w-xl mx-auto mb-6 leading-relaxed">
              Are you an enterprise technology company, cloud provider, or university department looking to convene
              builders across Africa? Partner with our event operations team to co-design your next challenge.
            </p>
            <Link to="/partners">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Partner on an Event
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
};

export default EventsPage;
