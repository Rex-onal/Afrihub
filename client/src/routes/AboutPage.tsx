import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { JoinCtaSection } from '../components/sections/JoinCtaSection';
import { TEAM_MEMBERS } from '../content/team';
import { STATS } from '../content/stats';
import {
  Compass,
  Eye,
  Heart,
  Cpu,
  Globe2,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import africaMapUrl from '../assets/africa-map.svg';
import hero1 from '../assets/hero/hero-1.webp';
import hero3 from '../assets/hero/hero-3.webp';

const VALUES = [
  {
    icon: Compass,
    title: 'Meritocratic Empowerment',
    description:
      'We believe talent is evenly distributed across Africa, even if opportunity historically has not been. Every programme is structured to let technical ability shine.',
  },
  {
    icon: Cpu,
    title: 'Technological Sovereignty',
    description:
      'AfriHub promotes local computational capacity, open source toolchains, and sovereign data systems that solve acute continental challenges.',
  },
  {
    icon: Heart,
    title: 'Radical Inclusivity',
    description:
      'From self-taught tinkerers in secondary towns to university researchers, we cultivate an accessible space with zero financial barriers for members.',
  },
  {
    icon: Globe2,
    title: 'Cross-Border Solidarity',
    description:
      'National borders should not isolate engineers. We build unified pan-African pipelines so builders collaborate across all 54 nations seamlessly.',
  },
];

const CITY_HUBS = [
  { name: 'Cairo', top: '16%', right: '26%' },
  { name: 'Lagos', top: '42%', left: '26%', labelPosition: 'absolute -top-5 -left-1' },
  { name: 'Accra', top: '50%', left: '16%', labelPosition: 'absolute top-4 -left-1' },
  { name: 'Nairobi', top: '53%', right: '20%' },
  { name: 'Kigali', top: '60%', right: '28%' },
  { name: 'Johannesburg', bottom: '16%', right: '34%', labelPosition: 'absolute top-4 -left-4' },
];

export const AboutPage: React.FC = () => {
  return (
    <PageWrapper>
      {/* Per-page SEO & Meta tags */}
      <title>About Us | AfriHub Tech Community</title>
      <meta
        name="description"
        content="Learn about AfriHub's mission to empower pan-African tech talent through events, hackathons, scholarships, and verified career pathways across 54 nations."
      />
      <meta property="og:title" content="About Us | AfriHub Tech Community" />
      <meta
        property="og:description"
        content="Our story, mission, core values, and the fictional leadership team powering AfriHub."
      />

      {/* Hero Section */}
      <section className="pt-8 pb-16 md:py-20 relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#835500]">
                  OUR ORIGIN & PURPOSE
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#1C1B1B] tracking-tight leading-[1.12] mb-5">
                Empowering Africa's Builders to{' '}
                <span className="italic font-normal text-[#835500]">Lead Global Tech</span>
              </h1>

              <p className="font-sans text-base sm:text-lg text-[#524534] leading-relaxed mb-6">
                AfriHub is a pan-African tech community uniting engineers, designers, and researchers
                across 54 nations. We dismantle barriers through funded scholarships, hands-on hackathons,
                and direct mentorship networks.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#D7C3AE]/30">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B] block">
                    {STATS.members.value.toLocaleString()}{STATS.members.suffix}
                  </span>
                  <span className="text-xs text-[#524534]">{STATS.members.label}</span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#006C4C] block">
                    {STATS.nations.value}
                  </span>
                  <span className="text-xs text-[#524534]">{STATS.nations.label}</span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#006492] block">
                    {STATS.scholarships.prefix}{STATS.scholarships.value}{STATS.scholarships.suffix}
                  </span>
                  <span className="text-xs text-[#524534]">{STATS.scholarships.label}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                  <img
                    src={hero1}
                    alt="African tech builders collaborating with laptops in an innovation hub"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                  <img
                    src={hero3}
                    alt="African tech builders in a workshop"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-[#F0EDEC]/50 border-y border-[#D7C3AE]/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-[#D7C3AE]/50 bg-white">
              <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/20 text-[#835500] flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#835500] block mb-2">
                OUR MISSION
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B] mb-4">
                Bridge the Opportunity Divide
              </h2>
              <p className="text-sm text-[#524534] leading-relaxed">
                To equip emerging African developers, AI researchers, and hardware builders with
                world-class mentorship, compute infrastructure, and peer solidarity, cultivating
                self-sustaining regional hubs of technological autonomy.
              </p>
            </Card>

            <Card className="p-8 border-[#D7C3AE]/50 bg-white">
              <div className="w-12 h-12 rounded-2xl bg-[#006C4C]/20 text-[#006C4C] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#006C4C] block mb-2">
                OUR VISION
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B] mb-4">
                Sovereign Technological Leadership
              </h2>
              <p className="text-sm text-[#524534] leading-relaxed">
                An Africa where young innovators conceive, engineer, and own the critical computing
                infrastructure that powers the continent's financial systems, healthcare networks, and climate resilience.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
              GUIDING PRINCIPLES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1B]">
              The Values That Drive AfriHub
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} hoverLift className="p-6 border-[#D7C3AE]/40 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#F0EDEC] text-[#835500] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-2">
                      {v.title}
                    </h3>
                    <p className="text-xs text-[#524534] leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Continental Footprint Map */}
      <section className="py-16 md:py-24 bg-[#F0EDEC]/40 border-y border-[#D7C3AE]/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
                CONTINENTAL PRESENCE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1B] tracking-tight mb-4">
                Six Hubs, One Connected Continent
              </h2>
              <p className="text-sm text-[#524534] leading-relaxed mb-6">
                From our continental headquarters in Abuja to decentralized chapters in Cairo, Lagos,
                Accra, Nairobi, Kigali, and Johannesburg, our distributed model ensures local builders have
                physical spaces to congregate and collaborate.
              </p>

              <div className="space-y-2.5 text-xs text-[#524534]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006C4C]" />
                  <span>Physical hackathon spaces and high-speed fibre coworking nodes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006C4C]" />
                  <span>Decentralized regional coordinators managing localized sprints</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006C4C]" />
                  <span>Synchronized virtual channels for builders beyond major capitals</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Card className="p-6 bg-white border-[#D7C3AE]/50 relative">
                <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center overflow-hidden">
                  <img
                    src={africaMapUrl}
                    alt="Map of Africa showing AfriHub regional nodes"
                    className="max-h-full max-w-full object-contain filter saturate-[1.08]"
                  />

                  {CITY_HUBS.map((pin) => (
                    <div
                      key={pin.name}
                      style={{
                        top: pin.top,
                        left: pin.left,
                        right: pin.right,
                        bottom: pin.bottom,
                      }}
                      className="absolute z-20 flex items-center gap-1.5"
                    >
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8572A] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E8572A] border border-white" />
                      </span>
                      <span
                        className={
                          pin.labelPosition ||
                          'px-2 py-0.5 rounded bg-[#1C1B1B]/95 text-white text-[10px] font-sans font-semibold tracking-wide whitespace-nowrap'
                        }
                      >
                        {pin.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership & Advisory Team */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
              STEWARDSHIP & LEADERSHIP
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1B]">
              Meet Our Team
            </h2>
            <p className="text-xs sm:text-sm text-[#524534] mt-2">
              A fictional council of engineers, researchers, and ecosystem architects dedicated to the continent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((m) => (
              <Card key={m.id} hoverLift className="p-6 border-[#D7C3AE]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#1C1B1B] text-[#F5A623] font-serif font-bold text-base flex items-center justify-center shrink-0">
                      {m.initials}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1C1B1B] leading-tight">
                        {m.name}
                      </h3>
                      <p className="text-xs text-[#835500] font-medium">{m.role}</p>
                      <p className="text-[11px] text-[#857462] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{m.location}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#524534] leading-relaxed">
                    {m.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Join CTA Section */}
      <JoinCtaSection />
    </PageWrapper>
  );
};

export default AboutPage;
