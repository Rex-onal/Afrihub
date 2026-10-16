import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { HeroSection } from '../components/sections/HeroSection';
import { WhatWeDoSection } from '../components/sections/WhatWeDoSection';
import { AboutSection } from '../components/sections/AboutSection';
import { UpcomingEventsSection } from '../components/sections/UpcomingEventsSection';
import { ImpactSection } from '../components/sections/ImpactSection';
import { PartnersSection } from '../components/sections/PartnersSection';
import { JoinCtaSection } from '../components/sections/JoinCtaSection';

export const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      {/* Per-page SEO & Meta tags */}
      <title>AfriHub | Pan-African Tech Community</title>
      <meta
        name="description"
        content="AfriHub unites tech builders across 54 African nations through high-stakes hackathons, scholarships, technical mentorship, and verified career pathways."
      />
      <meta property="og:title" content="AfriHub | Pan-African Tech Community" />
      <meta
        property="og:description"
        content="Where Africa's tech talent rises together. Hackathons, scholarships, and opportunities connecting African talent to the world."
      />
      <meta property="og:type" content="website" />

      {/* 1. Hero Section (The Showpiece) */}
      <HeroSection />

      {/* 2. What We Do (Built for Builders) */}
      <WhatWeDoSection />

      {/* 3. About Section (Growing Talent, Connecting Opportunity) */}
      <AboutSection />

      {/* 4. Upcoming Events Section */}
      <UpcomingEventsSection />

      {/* 5. Impact Section (Measurable Transformation & 6-city hub pins) */}
      <ImpactSection />

      {/* 6. Partners & Investors Section */}
      <PartnersSection />

      {/* 7. Join CTA Banner Section */}
      <JoinCtaSection />
    </PageWrapper>
  );
};

export default HomePage;
