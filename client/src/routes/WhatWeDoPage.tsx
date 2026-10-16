import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { JoinCtaSection } from '../components/sections/JoinCtaSection';
import { DETAILED_PROGRAMMES } from '../content/programmes';
import { MEMBER_TESTIMONIALS } from '../content/testimonials';
import {
  Code2,
  GraduationCap,
  Calendar,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const ICON_MAP = {
  hackathons: Code2,
  scholarships: GraduationCap,
  events: Calendar,
  'career-network': Briefcase,
};

export const WhatWeDoPage: React.FC = () => {
  return (
    <PageWrapper>
      {/* Per-page SEO & Meta tags */}
      <title>What We Do | AfriHub Tech Community</title>
      <meta
        name="description"
        content="Discover AfriHub's four pillars: Hackathons & Challenges, Scholarships, Technical Events, and our Career & Internship Network across 54 African nations."
      />
      <meta property="og:title" content="What We Do | AfriHub Tech Community" />
      <meta
        property="og:description"
        content="Explore AfriHub's four foundational programmes empowering pan-African builders."
      />

      {/* Hero Section */}
      <section className="pt-8 pb-16 md:py-20 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#835500]">
                BUILT FOR BUILDERS
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#1C1B1B] tracking-tight leading-[1.12] mb-5">
              Comprehensive Pathways for{' '}
              <span className="italic font-normal text-[#835500]">African Tech Talent</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#524534] leading-relaxed mb-8">
              From student developers writing their first lines of code to seasoned cloud architects
              scaling enterprise platforms, our programmes provide the infrastructure, funding, and mentorship
              required to compete globally.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/join">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Join the Community
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" size="lg">
                  View Upcoming Events
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 Detailed Programme Sections */}
      <section className="py-12 md:py-16 space-y-16">
        <Container>
          <div className="space-y-16">
            {DETAILED_PROGRAMMES.map((prog, idx) => {
              const Icon = ICON_MAP[prog.id as keyof typeof ICON_MAP] || Code2;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={prog.id}
                  id={prog.id}
                  className="p-8 sm:p-12 rounded-3xl bg-white border border-[#D7C3AE]/50 shadow-[0_4px_20px_rgba(28,27,27,0.04)]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left: Info */}
                    <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${prog.badgeBg}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs uppercase tracking-[0.18em] font-bold text-[#835500]">
                          {prog.eyebrow}
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1B1B] mb-3">
                        {prog.title}
                      </h2>
                      <p className="font-serif italic text-sm sm:text-base text-[#835500] mb-4">
                        {prog.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-[#524534] leading-relaxed mb-6">
                        {prog.description}
                      </p>

                      <ul className="space-y-2.5 text-xs sm:text-sm text-[#524534] mb-8">
                        {prog.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#006C4C] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-4">
                        <Link to="/join">
                          <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                            Access Through Membership
                          </Button>
                        </Link>
                        {prog.id === 'events' && (
                          <Link
                            to="/events"
                            className="text-xs font-bold text-[#835500] hover:underline"
                          >
                            Browse Schedule
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Right: Stats & Highlights Card */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : ''}`}>
                      <Card className="p-6 bg-[#FCF9F8] border-[#D7C3AE]/40 space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#857462] block">
                          PROGRAMME METRICS
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {prog.stats.map((st) => (
                            <div key={st.label} className="p-3 rounded-xl bg-white border border-[#D7C3AE]/30 text-center">
                              <span className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B1B] block">
                                {st.value}
                              </span>
                              <span className="text-[10px] text-[#524534] block mt-0.5">
                                {st.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        {prog.id === 'career-network' && (
                          <div className="p-3.5 rounded-xl bg-[#006492]/10 border border-[#006492]/20 flex items-start gap-2.5 text-xs text-[#006492]">
                            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>
                              <strong>Member Benefit Only:</strong> Career pathways and introductions are reserved exclusively for verified members. AfriHub does not operate a public job board or job listings.
                            </span>
                          </div>
                        )}
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Member Testimonials Section */}
      <section className="py-16 md:py-20 bg-[#F0EDEC]/50 border-y border-[#D7C3AE]/30">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
              TRANSFORMATION IN ACTION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
              Real Results From AfriHub Programmes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MEMBER_TESTIMONIALS.map((t) => (
              <Card key={t.id} hoverLift className="p-6 border-[#D7C3AE]/40 flex flex-col justify-between bg-white">
                <p className="text-xs sm:text-sm text-[#524534] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#D7C3AE]/20">
                  <div
                    className={`w-9 h-9 rounded-full font-serif font-bold text-xs flex items-center justify-center shrink-0 ${t.avatarBg || 'bg-[#F0EDEC] text-[#1C1B1B]'}`}
                  >
                    {t.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-[#1C1B1B]">{t.author}</span>
                    <span className="text-[11px] text-[#857462]">{t.role} · {t.location}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Join CTA */}
      <JoinCtaSection />
    </PageWrapper>
  );
};

export default WhatWeDoPage;
