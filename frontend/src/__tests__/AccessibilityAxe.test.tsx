import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import type { AxeResults } from 'axe-core';
import { expect, describe, it, beforeAll } from 'vitest';

import HomePage from '../routes/HomePage';
import AboutPage from '../routes/AboutPage';
import WhatWeDoPage from '../routes/WhatWeDoPage';
import EventsPage from '../routes/EventsPage';
import JoinPage from '../routes/JoinPage';
import PartnersPage from '../routes/PartnersPage';
import ContactPage from '../routes/ContactPage';
import CreditsPage from '../routes/CreditsPage';
import NotFoundPage from '../routes/NotFoundPage';
import { JoinForm } from '../components/forms/JoinForm';
import { PartnerForm } from '../components/forms/PartnerForm';
import { ContactForm } from '../components/forms/ContactForm';

describe('WCAG 2.1 AA Automated Axe Accessibility Verification', () => {
  beforeAll(() => {
    // Mock window.matchMedia for jsdom
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });

    // Mock IntersectionObserver for jsdom
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = '';
      readonly scrollMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];
      disconnect() {}
      observe() {}
      takeRecords() {
        return [];
      }
      unobserve() {}
    }
    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  const expectNoViolations = (results: AxeResults) => {
    expect(results.violations).toEqual([]);
  };

  it('verifies HomePage has zero axe violations', async () => {
    const { container } = renderWithRouter(<HomePage />);
    const results = await axe(container);
    expectNoViolations(results);
  });

  it('verifies AboutPage has zero axe violations', async () => {
    const { container } = renderWithRouter(<AboutPage />);
    const results = await axe(container);
    expectNoViolations(results);
  });

  it('verifies WhatWeDoPage has zero axe violations', async () => {
    const { container } = renderWithRouter(<WhatWeDoPage />);
    const results = await axe(container);
    expectNoViolations(results);
  });

  it('verifies EventsPage has zero axe violations', async () => {
    const { container } = renderWithRouter(<EventsPage />);
    const results = await axe(container);
    expectNoViolations(results);
  });

  it('verifies JoinPage has zero axe violations', async () => {
    const { container } = renderWithRouter(<JoinPage />);
    const results = await axe(container);
    expectNoViolations(results);
  });

  it('verifies PartnersPage has zero axe violations', async () => {
    const { container } = renderWithRouter(<PartnersPage />);
    const results = await axe(container);
    expectNoViolations(results);
  });

  it('verifies ContactPage has zero axe violations', async () => {
    const { container } = renderWithRouter(<ContactPage />);
    const results = await axe(container);
    expectNoViolations(results);
  });

  it('verifies CreditsPage has zero axe violations', async () => {
    const { container } = renderWithRouter(<CreditsPage />);
    const results = await axe(container);
    expectNoViolations(results);
  });

  it('verifies NotFoundPage has zero axe violations', async () => {
    const { container } = renderWithRouter(<NotFoundPage />);
    const results = await axe(container);
    expectNoViolations(results);
  });

  it('verifies standalone JoinForm has zero axe violations', async () => {
    const { container } = renderWithRouter(<JoinForm />);
    const results = await axe(container);
    expectNoViolations(results);
  });

  it('verifies standalone PartnerForm has zero axe violations', async () => {
    const { container } = renderWithRouter(<PartnerForm />);
    const results = await axe(container);
    expectNoViolations(results);
  });

  it('verifies standalone ContactForm has zero axe violations', async () => {
    const { container } = renderWithRouter(<ContactForm />);
    const results = await axe(container);
    expectNoViolations(results);
  });
});
