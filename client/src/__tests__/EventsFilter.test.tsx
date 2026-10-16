import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EventsPage } from '../routes/EventsPage';
import { UPCOMING_EVENTS } from '../content/events';

describe('EventsPage Category Filtering', () => {
  it('renders all upcoming events by default', () => {
    render(
      <MemoryRouter>
        <EventsPage />
      </MemoryRouter>
    );

    // Filter tab for 'All Events' should be active
    const allTab = screen.getByRole('tab', { name: 'All Events' });
    expect(allTab).toBeInTheDocument();
    expect(allTab).toHaveAttribute('aria-selected', 'true');

    // Check that event card titles are present
    expect(screen.getAllByText('Women in Tech Leadership Summit Nairobi').length).toBeGreaterThanOrEqual(1);
  });

  it('filters events when clicking Hackathons tab', () => {
    render(
      <MemoryRouter>
        <EventsPage />
      </MemoryRouter>
    );

    const hackathonTab = screen.getByRole('tab', { name: 'Hackathons' });
    fireEvent.click(hackathonTab);
    expect(hackathonTab).toHaveAttribute('aria-selected', 'true');

    const hackathons = UPCOMING_EVENTS.filter((e) => e.category === 'Hackathon');
    for (const h of hackathons) {
      expect(screen.getAllByText(h.title).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('filters events when clicking Workshops tab', () => {
    render(
      <MemoryRouter>
        <EventsPage />
      </MemoryRouter>
    );

    const workshopTab = screen.getByRole('tab', { name: 'Workshops' });
    fireEvent.click(workshopTab);
    expect(workshopTab).toHaveAttribute('aria-selected', 'true');

    const workshops = UPCOMING_EVENTS.filter((e) => e.category === 'Workshop');
    for (const w of workshops) {
      expect(screen.getAllByText(w.title).length).toBeGreaterThanOrEqual(1);
    }
  });
});
