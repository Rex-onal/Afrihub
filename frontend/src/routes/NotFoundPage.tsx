import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/layout/SEO';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { Compass, Home, Calendar, Users } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <PageWrapper>
      <SEO
        title="Page Not Found (404)"
        description="The page you are looking for does not exist on AfriHub. Explore our upcoming events, join the community, or return home."
        noindex={true}
      />

      <Section className="py-24 text-center">
        <Container size="narrow">
          <div className="flex flex-col items-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-[#F5A623]/20 text-[#835500] flex items-center justify-center mb-6">
              <Compass className="w-8 h-8" aria-hidden="true" />
            </div>

            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#835500] mb-2 font-sans">
              ERROR 404
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1B1B] mb-4">
              Destination Out of Reach
            </h1>
            <p className="text-sm sm:text-base text-[#524534] leading-relaxed mb-8">
              We could not find the page you requested. It might have moved, or the link may be outdated.
              You can navigate back home or explore our core community pathways below.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <Link to="/">
                <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
                  Return Home
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="secondary" size="md" leftIcon={<Calendar className="w-4 h-4" />}>
                  Browse Events
                </Button>
              </Link>
              <Link to="/join">
                <Button variant="outline" size="md" leftIcon={<Users className="w-4 h-4" />}>
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
};

export default NotFoundPage;
