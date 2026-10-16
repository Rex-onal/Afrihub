import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/layout/SEO';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PartnerForm } from '../components/forms/PartnerForm';
import { Accordion } from '../components/ui/Accordion';
import { PARTNER_FAQS } from '../content/faq';
import { PARTNERS } from '../content/partners';
import { STATS } from '../content/stats';
import {
  Calendar,
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import hero2 from '../assets/hero/hero-2.webp';

const STRATEGIC_VALUES = [
  {
    icon: Calendar,
    title: 'Sponsor Events & Hackathons',
    description:
      'Brand alignment across 40+ pan-African hackathons and tech summits. Co-design challenge problem statements and mentor 1,000+ builders directly.',
    points: ['Custom challenge problem tracks', 'Keynote slots and VIP presence', 'Branded prize pools and hardware grants'],
    accent: 'bg-[#F5A623]/15 text-[#835500]',
  },
  {
    icon: GraduationCap,
    title: 'Fund Infrastructure & Scholarships',
    description:
      'Directly sponsor full cloud certification exam vouchers, university degree completion grants, and hardware access for high-potential fellows.',
    points: ['100% verified voucher allocation', 'Audited scholar progression metrics', 'Named scholarship cohort identity'],
    accent: 'bg-[#006C4C]/15 text-[#006C4C]',
  },
  {
    icon: Users,
    title: 'Recruit African Tech Leaders',
    description:
      'Direct member pipelines connecting top-tier African engineering talent to high-growth global technology teams, startups, and labs.',
    points: ['Vetted engineering candidates', 'Pre-screened portfolio challenge projects', 'Tailored hiring sprints'],
    accent: 'bg-[#006492]/15 text-[#006492]',
  },
];

const PATHWAYS = [
  {
    id: 'supporter',
    tier: 'ENTRY TIER',
    title: 'Ecosystem Supporter',
    subtitle: 'Ideal for tech firms and growth-stage companies looking to engage grassroots developers.',
    badge: null,
    target: 'Targeted',
    targetSub: '/ per sprint or event',
    features: [
      'Community hackathon co-sponsorship branding',
      'Brand exposure on stage, website & digital live streams',
      'Direct mentor participation & opening keynote slot',
      'AfriHub community newsletter spotlight (45k+ subscribers)',
    ],
    ctaText: 'Select Model',
    featured: false,
  },
  {
    id: 'growth',
    tier: 'COMPREHENSIVE CO-DESIGN',
    title: 'Strategic Growth Partner',
    subtitle: 'Full programmatic collaboration designed for sustained developer adoption and high-yield recruitment.',
    badge: 'Most Selected',
    target: 'Tailored Cohort',
    targetSub: '/ 6-12 month roadmap',
    features: [
      'Co-branded technical challenge or fellowship track',
      'Targeted talent recruitment pipeline with zero external recruiter commissions',
      'Dedicated Demo Day stage & private talent speed-pitching sessions',
      'Custom technical tooling and enterprise cloud API onboarding',
      'Comprehensive cohort metrics & verified project code repositories',
    ],
    ctaText: 'Co-Design Fellowship',
    featured: true,
  },
  {
    id: 'capital',
    tier: 'INSTITUTIONAL SCALE',
    title: 'Capital & Enterprise Investor',
    subtitle: 'Foundations, sovereign development agencies, and venture funds driving multi-nation capacity.',
    badge: null,
    target: 'Institutional',
    targetSub: '/ multi-year endowment',
    features: [
      'Multi-cohort scholarship endowments and living stipend funds',
      'AfriHub Strategic Advisory Council voting seat',
      'Customized physical regional hub activations (Lagos, Kigali, Nairobi, Accra)',
      'First-look proprietary pipeline for spinout tech ventures & angel syndicates',
    ],
    ctaText: 'Request Advisory Call',
    featured: false,
  },
];

export const PartnersPage: React.FC = () => {
  const scrollToEnquiry = () => {
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageWrapper>
      <SEO
        title="Partners & Investors"
        description="Invest in Africa's tech future. Sponsor hackathons, fund scholarships, and recruit vetted engineering leaders across 54 nations."
        path="/partners"
      />

      {/* Hero Section */}
      <section className="pt-8 pb-16 md:py-20 relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#835500]">
                  INVEST IN PAN-AFRICAN TECH LEADERSHIP
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#1C1B1B] tracking-tight leading-[1.12] mb-5">
                Invest in{' '}
                <span className="italic font-normal text-[#835500]">Africa's Tech Future</span>
              </h1>

              <p className="font-sans text-base sm:text-lg text-[#524534] leading-relaxed mb-8 max-w-xl">
                Direct high-potential African developers, fund catalyst scholarships, sponsor pan-African
                hackathons, and recruit vetted engineering leaders across 54 nations.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  onClick={scrollToEnquiry}
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Initiate Partnership Enquiry
                </Button>
                <a
                  href="#pathways"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#835500] hover:text-[#1C1B1B] transition-colors p-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Explore Pathways</span>
                </a>
              </div>
            </div>

            {/* Right Media Card */}
            <div className="lg:col-span-5">
              <Card className="p-3 bg-white border-[#D7C3AE]/60 shadow-[0_12px_40px_rgba(28,27,27,0.08)]">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={hero2}
                    alt="African software developers collaborating around a laptop at a technical hackathon"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#86F8C6]/90 text-[#006C4C] text-[10px] font-bold uppercase tracking-wider mb-1">
                      Pan-African Hackathon Series
                    </span>
                    <p className="text-white font-serif font-bold text-base sm:text-lg">
                      Building Infrastructure for 54 Nations
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Metrics Ribbon Section */}
      <section className="py-12 bg-[#F0EDEC]/60 border-y border-[#D7C3AE]/30">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="p-6 text-center border-[#D7C3AE]/40">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1B] block mb-1">
                {STATS.members.value.toLocaleString()}{STATS.members.suffix}
              </span>
              <span className="text-xs text-[#524534] font-medium block">{STATS.members.label}</span>
              <span className="text-[10px] text-[#857462] block mt-1">Across 54 countries</span>
            </Card>

            <Card className="p-6 text-center border-[#D7C3AE]/40">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#006C4C] block mb-1">
                {STATS.scholarships.prefix}{STATS.scholarships.value}{STATS.scholarships.suffix}
              </span>
              <span className="text-xs text-[#524534] font-medium block">{STATS.scholarships.label}</span>
              <span className="text-[10px] text-[#857462] block mt-1">Directly funded</span>
            </Card>

            <Card className="p-6 text-center border-[#D7C3AE]/40">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#006492] block mb-1">
                {STATS.placementRate.value}{STATS.placementRate.suffix}
              </span>
              <span className="text-xs text-[#524534] font-medium block">{STATS.placementRate.label}</span>
              <span className="text-[10px] text-[#857462] block mt-1">Within 6 months</span>
            </Card>

            <Card className="p-6 text-center border-[#D7C3AE]/40">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#835500] block mb-1">
                {STATS.eventsHosted.value}{STATS.eventsHosted.suffix}
              </span>
              <span className="text-xs text-[#524534] font-medium block">{STATS.eventsHosted.label}</span>
              <span className="text-[10px] text-[#857462] block mt-1">Pan-African hackathons</span>
            </Card>
          </div>
        </Container>
      </section>

      {/* Strategic Value Built for Continental Scale */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
              WHY PARTNER WITH AFRIHUB
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1B] tracking-tight mb-4">
              Strategic Value Built for Continental Scale
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#524534] leading-relaxed">
              AfriHub is not a traditional charity or a generic tech network. We build institutional digital bridges
              that empower localized developers, unlock funding, and provide the infrastructure to guarantee lasting
              technical sovereignty across the continent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STRATEGIC_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <Card key={val.title} hoverLift className="p-6 border-[#D7C3AE]/40 flex flex-col justify-between">
                  <div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${val.accent}`}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#1C1B1B] mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#524534] leading-relaxed mb-6">
                      {val.description}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-[#D7C3AE]/20 text-xs text-[#524534]">
                    {val.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#006C4C] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Partnership Pathways Section */}
      <section id="pathways" className="py-16 md:py-24 bg-[#F0EDEC]/40 border-y border-[#D7C3AE]/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
              ENGAGEMENT MODELS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1B] tracking-tight mb-3">
              Partnership Pathways
            </h2>
            <p className="text-sm text-[#524534]">
              Whether you are testing localized developer adoption or seeding multi-year institutional capacity, we offer flexible, outcome-anchored tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {PATHWAYS.map((p) => (
              <Card
                key={p.id}
                className={`p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  p.featured
                    ? 'border-2 border-[#835500] bg-white shadow-xl relative -translate-y-2'
                    : 'border-[#D7C3AE]/50 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#857462]">
                      {p.tier}
                    </span>
                    {p.badge && (
                      <span className="px-3 py-1 rounded-full bg-[#F5A623] text-[#1C1B1B] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#1C1B1B] mt-1 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#524534] leading-relaxed mb-5">{p.subtitle}</p>

                  <div className="my-5 py-3.5 border-y border-[#D7C3AE]/30 flex items-baseline gap-1.5">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B1B]">
                      {p.target}
                    </span>
                    <span className="text-xs text-[#524534] font-sans">{p.targetSub}</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-[#524534]">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#006C4C] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={scrollToEnquiry}
                  variant={p.featured ? 'primary' : 'outline'}
                  size="md"
                  className="w-full justify-center text-xs sm:text-sm py-2.5 font-semibold"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  {p.ctaText}
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Supported Institutions Grid (Fictional partner marks) */}
      <section className="py-14 bg-white border-b border-[#D7C3AE]/30">
        <Container>
          <p className="text-center text-xs uppercase tracking-[0.18em] font-bold text-[#857462] mb-8">
            CO-DESIGNED AND SUPPORTED BY LEADING GLOBAL &amp; AFRICAN INSTITUTIONS
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F0EDEC]/50 transition-colors"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-7 w-7 object-contain shrink-0"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[#1C1B1B] tracking-tight leading-tight">
                    {partner.name}
                  </span>
                  <span className="text-[10px] text-[#857462] font-medium leading-none mt-0.5">
                    {partner.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Start Your Partnership (Form Section) */}
      <section id="enquiry" className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
                  GET IN TOUCH
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1C1B1B] tracking-tight mb-4">
                  Start Your Partnership
                </h2>
                <p className="text-xs sm:text-sm text-[#524534] leading-relaxed">
                  Tell us about your organization's goals. Whether you want to fund scholarships,
                  sponsor upcoming hackathons, or hire verified engineering talent, our team will
                  structure a custom engagement plan.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F0EDEC]/60 border border-[#D7C3AE]/30 text-xs text-[#524534]">
                  <CheckCircle2 className="w-4 h-4 text-[#006C4C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1B1B] block">Rapid Response SLA</strong>
                    <span>Direct connection with our partnership director within 24 business hours.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F0EDEC]/60 border border-[#D7C3AE]/30 text-xs text-[#524534]">
                  <CheckCircle2 className="w-4 h-4 text-[#006C4C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1B1B] block">Audited Impact Reports</strong>
                    <span>Full transparency on student completion, exam vouchers, and diversity metrics.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F0EDEC]/60 border border-[#D7C3AE]/30 text-xs text-[#524534]">
                  <CheckCircle2 className="w-4 h-4 text-[#006C4C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1B1B] block">Tailored Engagement Terms</strong>
                    <span>Customizable legal agreements tailored for multinationals and foundations.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 border-[#D7C3AE]/60 shadow-[0_12px_40px_rgba(28,27,27,0.08)] bg-white">
                <PartnerForm />
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-[#F0EDEC]/40 border-t border-[#D7C3AE]/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
                PARTNERSHIP FAQS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion items={PARTNER_FAQS} />
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
};

export default PartnersPage;
