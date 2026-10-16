import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { JoinForm } from '../components/forms/JoinForm';
import { Accordion } from '../components/ui/Accordion';
import { JOIN_FAQS } from '../content/faq';
import { MEMBER_TESTIMONIALS, HIGHLIGHT_QUOTE } from '../content/testimonials';
import { STATS } from '../content/stats';
import {
  Calendar,
  Users,
  GraduationCap,
  Code2,
  Briefcase,
  Globe,
  Quote,
} from 'lucide-react';

const BENEFIT_CARDS = [
  {
    icon: Calendar,
    title: 'Tech Events',
    description:
      'Monthly pan-African meetups, expert masterclasses, and local hub gatherings in Lagos, Nairobi, Kigali, Accra, and Cairo.',
    accent: 'bg-[#F5A623]/15 text-[#835500]',
  },
  {
    icon: Users,
    title: 'Dedicated Mentorship',
    description:
      '1-on-1 guidance, architecture sessions, and portfolio reviews from senior engineering leaders across the continent.',
    accent: 'bg-[#006C4C]/15 text-[#006C4C]',
  },
  {
    icon: GraduationCap,
    title: 'Funded Scholarships',
    description:
      'Full and partial funding for cloud certifications, technical bootcamps, and global university degree completion tracks.',
    accent: 'bg-[#006492]/15 text-[#006492]',
  },
  {
    icon: Code2,
    title: 'High-Stakes Hackathons',
    description:
      '48-hour sprint challenges solving localized African problems with venture backing, cloud credits, and cash prizes.',
    accent: 'bg-[#E8572A]/15 text-[#E8572A]',
  },
  {
    icon: Briefcase,
    title: 'Career Opportunities',
    description:
      'Direct member pipelines and introductions to top-tier remote and hybrid engineering teams across Africa and globally.',
    accent: 'bg-[#F5A623]/15 text-[#835500]',
  },
  {
    icon: Globe,
    title: 'Global Connections',
    description:
      'Cross-border peer collaboration across 54 African countries and tech diaspora networks in London, Berlin, and Toronto.',
    accent: 'bg-[#006C4C]/15 text-[#006C4C]',
  },
];

export const JoinPage: React.FC = () => {
  return (
    <PageWrapper>
      {/* Per-page SEO & Meta tags */}
      <title>Join the Community | AfriHub Tech Community</title>
      <meta
        name="description"
        content="Join Africa's fastest-growing tech community. Free membership for developers, data scientists, and designers across 54 nations."
      />
      <meta property="og:title" content="Join the Community | AfriHub Tech Community" />
      <meta
        property="og:description"
        content="Free builder enrolment for pan-African developers, designers, and innovators."
      />

      {/* Hero & Enrolment Section */}
      <section className="pt-8 pb-16 md:py-20 relative overflow-hidden">
        <Container>
          {/* Hero Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#835500]">
                AFRIHUB COMMUNITY MEMBERSHIP
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#1C1B1B] tracking-tight leading-[1.12] mb-5">
              Join Africa's Fastest-Growing{' '}
              <span className="italic font-normal text-[#835500]">Tech Community</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#524534] leading-relaxed mb-6">
              Connect with over 10,000+ ambitious developers, designers, data scientists, and builders
              across 54 African nations. Gain access to funded scholarships, real-world hackathons,
              dedicated mentorship, and direct career pathways.
            </p>

            {/* Badges ribbon */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-semibold text-[#524534]">
              <div className="flex -space-x-1.5 items-center">
                <span className="w-6 h-6 rounded-full bg-[#006C4C] text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                  NG
                </span>
                <span className="w-6 h-6 rounded-full bg-[#835500] text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                  KE
                </span>
                <span className="w-6 h-6 rounded-full bg-[#E8572A] text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                  GH
                </span>
                <span className="w-6 h-6 rounded-full bg-[#006492] text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                  RW
                </span>
                <span className="w-6 h-6 rounded-full bg-[#1C1B1B] text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                  ZA
                </span>
              </div>
              <span>10,000+ Verified Builders</span>
              <span className="text-[#D7C3AE]">•</span>
              <span>54 African Nations</span>
              <span className="text-[#D7C3AE]">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#86F8C6]/30 text-[#006C4C] font-bold">
                100% Free Forever
              </span>
            </div>
          </div>

          {/* 2-Column Split: Benefits vs Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: 6 Benefit Cards + Quote Banner */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
                    Why Builders Choose AfriHub
                  </h2>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#857462]">
                    Pan-African Ecosystem
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BENEFIT_CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                      <Card
                        key={card.title}
                        hoverLift
                        className="p-5 border-[#D7C3AE]/40 flex flex-col justify-between"
                      >
                        <div>
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3.5 ${card.accent}`}
                          >
                            <Icon className="w-4 h-4" aria-hidden="true" />
                          </div>
                          <h3 className="font-serif text-base font-bold text-[#1C1B1B] mb-2">
                            {card.title}
                          </h3>
                          <p className="text-xs text-[#524534] leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Highlight Quote Banner */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#1C1B1B] text-white flex gap-4 items-start shadow-xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#F5A623]/20 text-[#F5A623] flex items-center justify-center shrink-0">
                  <Quote className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-serif italic text-sm sm:text-base text-[#F3F0EF] leading-relaxed mb-3">
                    "{HIGHLIGHT_QUOTE.quote}"
                  </p>
                  <p className="text-xs font-sans text-[#F3F0EF]/80">
                    <strong className="text-white font-bold">{HIGHLIGHT_QUOTE.author}</strong>
                    {' · '}
                    <span>{HIGHLIGHT_QUOTE.role}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Join Enrolment Form Card */}
            <div className="lg:col-span-5">
              <Card className="p-6 sm:p-8 border-[#D7C3AE]/60 shadow-[0_12px_40px_rgba(28,27,27,0.08)] bg-white sticky top-24">
                <div className="mb-6">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-bold font-sans text-[#835500] block mb-1">
                    FAST ENROLMENT
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#1C1B1B] tracking-tight mb-1.5">
                    Create Your Free Builder Profile
                  </h2>
                  <p className="text-xs text-[#524534]">
                    Takes less than 2 minutes. Free forever for African tech talent.
                  </p>
                </div>

                <JoinForm />
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Metrics Ribbon Section */}
      <section className="py-14 bg-[#F0EDEC]/60 border-y border-[#D7C3AE]/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
              PAN-AFRICAN FOOTPRINT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
              Engineered Across 54 Nations
            </h2>
            <p className="text-xs sm:text-sm text-[#524534] mt-2">
              Our members build core infrastructure for Africa's most prominent fintech unicorns,
              international cloud providers, and high-impact ventures.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="p-6 text-center border-[#D7C3AE]/40">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1B] block mb-1">
                {STATS.members.value.toLocaleString()}{STATS.members.suffix}
              </span>
              <span className="text-xs text-[#524534] font-medium block">
                {STATS.members.label}
              </span>
              <span className="text-[10px] text-[#857462] block mt-1">Across 54 countries</span>
            </Card>

            <Card className="p-6 text-center border-[#D7C3AE]/40">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#006C4C] block mb-1">
                {STATS.scholarships.prefix}{STATS.scholarships.value}{STATS.scholarships.suffix}
              </span>
              <span className="text-xs text-[#524534] font-medium block">
                {STATS.scholarships.label}
              </span>
              <span className="text-[10px] text-[#857462] block mt-1">Grants and certifications</span>
            </Card>

            <Card className="p-6 text-center border-[#D7C3AE]/40">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#006492] block mb-1">
                {STATS.placementRate.value}{STATS.placementRate.suffix}
              </span>
              <span className="text-xs text-[#524534] font-medium block">
                {STATS.placementRate.label}
              </span>
              <span className="text-[10px] text-[#857462] block mt-1">Within 6 months of cohort</span>
            </Card>

            <Card className="p-6 text-center border-[#D7C3AE]/40">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#835500] block mb-1">
                {STATS.eventsHosted.value}{STATS.eventsHosted.suffix}
              </span>
              <span className="text-xs text-[#524534] font-medium block">
                {STATS.eventsHosted.label}
              </span>
              <span className="text-[10px] text-[#857462] block mt-1">Regional and virtual hubs</span>
            </Card>
          </div>
        </Container>
      </section>

      {/* 3 Member Testimonial Cards */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
              MEMBER STORIES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
              Hear From Our Builders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MEMBER_TESTIMONIALS.map((t) => (
              <Card
                key={t.id}
                hoverLift
                className="p-6 border-[#D7C3AE]/40 flex flex-col justify-between"
              >
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

      {/* FAQ Section with Accordion */}
      <section className="py-16 md:py-20 bg-[#F0EDEC]/40 border-t border-[#D7C3AE]/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
                COMMUNITY FAQS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion items={JOIN_FAQS} />
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
};

export default JoinPage;
