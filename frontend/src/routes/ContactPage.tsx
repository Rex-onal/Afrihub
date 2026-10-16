import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/layout/SEO';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { ContactForm } from '../components/forms/ContactForm';
import { Accordion } from '../components/ui/Accordion';
import { CONTACT_FAQS } from '../content/faq';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Code2,
  Building2,
  Newspaper,
} from 'lucide-react';

const REGIONAL_NODES = [
  'Lagos (NG)',
  'Nairobi (KE)',
  'Kigali (RW)',
  'Accra (GH)',
  'Cairo (EG)',
  'Johannesburg (ZA)',
];

export const ContactPage: React.FC = () => {
  return (
    <PageWrapper>
      <SEO
        title="Contact Us"
        description="Get in touch with AfriHub. Reach out to our continental operations desk in Abuja, Nigeria and regional nodes across Africa."
        path="/contact"
      />

      {/* Hero & Channels Section */}
      <section className="pt-8 pb-16 md:py-20 relative overflow-hidden">
        <Container>
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#835500]">
                GET IN TOUCH WITH AFRIHUB
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#1C1B1B] tracking-tight leading-[1.12] mb-5">
              Let's Build the Future of{' '}
              <span className="italic font-normal text-[#835500]">African Tech Together</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#524534] leading-relaxed mb-6">
              Have questions about joining our community, partnering on hackathons, sponsoring scholarships,
              or hiring vetted talent? Reach out directly to our continental team.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#86F8C6]/20 border border-[#86F8C6]/40 text-xs font-semibold text-[#006C4C]">
              <span className="w-2 h-2 rounded-full bg-[#006C4C] animate-pulse" />
              <span>Pan-African Operations: Active hubs across 6 regional technology corridors</span>
            </div>
          </div>

          {/* 2-Column Grid: Channels vs Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Direct Communication Channels */}
            <div className="lg:col-span-5 space-y-4">
              <div className="mb-2">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold font-sans text-[#857462] block mb-1">
                  DIRECT COMMUNICATION CHANNELS
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#1C1B1B]">
                  Connect with our Hubs
                </h2>
              </div>

              {/* Email Card */}
              <Card className="p-5 border-[#D7C3AE]/40 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5A623]/15 text-[#835500] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#857462] font-bold block mb-0.5">
                    GENERAL INQUIRIES & MEMBERSHIP
                  </span>
                  <a
                    href="mailto:hello@afrihub.example"
                    className="font-serif font-bold text-base text-[#1C1B1B] hover:text-[#835500] transition-colors block"
                  >
                    hello@afrihub.example
                  </a>
                  <p className="text-xs text-[#524534] mt-1">
                    General support, community membership, and regional node queries. Typical reply under 24 hours.
                  </p>
                </div>
              </Card>

              {/* Phone Card */}
              <Card className="p-5 border-[#D7C3AE]/40 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#006C4C]/15 text-[#006C4C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#857462] font-bold block mb-0.5">
                    PHONE & COMMUNITY HOTLINE
                  </span>
                  <a
                    href="tel:+2340000000000"
                    className="font-serif font-bold text-base text-[#1C1B1B] hover:text-[#835500] transition-colors block"
                  >
                    +234 000 000 0000
                  </a>
                  <p className="text-xs text-[#524534] mt-1">
                    Available Mon-Fri, 9am-5pm WAT (GMT+1) for builder program support.
                  </p>
                </div>
              </Card>

              {/* Location Card */}
              <Card className="p-5 border-[#D7C3AE]/40 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#006492]/15 text-[#006492] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#857462] font-bold block mb-0.5">
                    CONTINENTAL HEADQUARTERS
                  </span>
                  <span className="font-serif font-bold text-base text-[#1C1B1B] block">
                    Abuja, Nigeria
                  </span>
                  <p className="text-xs text-[#524534] mt-1 mb-3">
                    AfriHub Innovation Hub, Central Business District, Abuja.
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {REGIONAL_NODES.map((node) => (
                      <span
                        key={node}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F0EDEC] text-[#524534]"
                      >
                        {node}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Response SLA Note */}
              <div className="p-4 rounded-xl bg-[#86F8C6]/15 border border-[#86F8C6]/30 flex items-center gap-3 text-xs text-[#006C4C]">
                <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  <strong>Operational Desk Active:</strong> Continental coordinators online. Average response time under 12 hours.
                </span>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 border-[#D7C3AE]/60 shadow-[0_12px_40px_rgba(28,27,27,0.08)] bg-white">
                <div className="mb-6">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-bold font-sans text-[#835500] block mb-1">
                    SEND US A DIRECT INQUIRY
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#1C1B1B] tracking-tight mb-1.5">
                    How can our team support you?
                  </h2>
                  <p className="text-xs text-[#524534]">
                    Fill out the form below and the appropriate regional coordinator will get back to you promptly.
                  </p>
                </div>

                <ContactForm />
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Need Immediate Answers? Section */}
      <section className="py-14 bg-[#F0EDEC]/50 border-y border-[#D7C3AE]/30">
        <Container>
          <div className="mb-10 text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
              IMMEDIATE PATHWAYS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
              Need Immediate Answers?
            </h2>
            <p className="text-xs sm:text-sm text-[#524534] mt-2">
              Explore dedicated tracks for developers, investors, and community members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hoverLift className="p-6 border-[#D7C3AE]/40 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#F5A623]/20 text-[#835500] flex items-center justify-center mb-4">
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-2">
                  For Builders & Engineers
                </h3>
                <p className="text-xs text-[#524534] leading-relaxed mb-6">
                  Looking for hackathon opportunities, mentorship matching, community guides, or scholarship applications?
                  Visit our Join Community portal.
                </p>
              </div>
              <Link
                to="/join"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#835500] hover:underline"
              >
                <span>Go to Community Enrolment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>

            <Card hoverLift className="p-6 border-[#D7C3AE]/40 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#006C4C]/20 text-[#006C4C] flex items-center justify-center mb-4">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-2">
                  For Enterprise & Investors
                </h3>
                <p className="text-xs text-[#524534] leading-relaxed mb-6">
                  Interested in co-designing developer challenges, sponsoring scholarships, or hiring vetted senior engineers across 54 African nations?
                </p>
              </div>
              <Link
                to="/partners"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#835500] hover:underline"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>

            <Card hoverLift className="p-6 border-[#D7C3AE]/40 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#006492]/20 text-[#006492] flex items-center justify-center mb-4">
                  <Newspaper className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1B1B] mb-2">
                  For Media & Press
                </h3>
                <p className="text-xs text-[#524534] leading-relaxed mb-6">
                  Access press releases, institutional data on developer mobility, event assets, and high-resolution media kits for coverage of our initiatives.
                </p>
              </div>
              <a
                href="mailto:hello@afrihub.example?subject=Media%20Request"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#835500] hover:underline"
              >
                <span>Request Media Kit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </Card>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.18em] font-bold font-sans text-[#835500] mb-2 block">
                FREQUENTLY ASKED
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
                Common Questions & Answers
              </h2>
            </div>

            <Accordion items={CONTACT_FAQS} />
          </div>
        </Container>
      </section>

      {/* Continental Reach Banner */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="p-8 sm:p-12 rounded-3xl bg-[#1C1B1B] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5A623] block mb-2">
                PAN-AFRICAN REACH
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Join over 10,000 developers across 54 nations
              </h2>
              <p className="text-xs sm:text-sm text-[#F3F0EF]/80 max-w-xl">
                AfriHub is not just an organization, it is a pan-African movement connecting sovereign talent to frontier computing opportunities.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/join"
                className="px-5 py-2.5 rounded-xl bg-[#F5A623] text-[#1C1B1B] text-xs sm:text-sm font-bold hover:bg-[#E09618] transition-colors"
              >
                Join Community
              </Link>
              <Link
                to="/events"
                className="px-5 py-2.5 rounded-xl border border-white/30 text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Explore Events
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
};

export default ContactPage;
