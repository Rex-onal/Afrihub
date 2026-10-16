import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Lazy-loaded routes for code splitting
const HomePage = lazy(() => import('./routes/HomePage'));
const AboutPage = lazy(() => import('./routes/AboutPage'));
const WhatWeDoPage = lazy(() => import('./routes/WhatWeDoPage'));
const EventsPage = lazy(() => import('./routes/EventsPage'));
const JoinPage = lazy(() => import('./routes/JoinPage'));
const PartnersPage = lazy(() => import('./routes/PartnersPage'));
const ContactPage = lazy(() => import('./routes/ContactPage'));
const CreditsPage = lazy(() => import('./routes/CreditsPage'));
const NotFoundPage = lazy(() => import('./routes/NotFoundPage'));

// Dev-only showcase: completely tree-shaken and excluded from production builds
const DevShowcasePage = import.meta.env.DEV
  ? lazy(() => import('./routes/DevShowcasePage'))
  : null;

const RouteLoading: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center" aria-live="polite" aria-busy="true">
    <div className="w-8 h-8 rounded-full border-2 border-[#D7C3AE] border-t-[#835500] animate-spin" />
    <span className="sr-only">Loading page...</span>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#FCF9F8] text-[#1C1B1B] selection:bg-[#F5A623]/30 selection:text-[#1C1B1B]">
        <Navbar />
        <div className="flex-1">
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/what-we-do" element={<WhatWeDoPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/credits" element={<CreditsPage />} />

              {/* Dev-only showcase route, excluded from production */}
              {import.meta.env.DEV && DevShowcasePage && (
                <Route path="/dev/showcase" element={<DevShowcasePage />} />
              )}

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
