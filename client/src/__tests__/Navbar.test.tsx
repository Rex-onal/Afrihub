import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';

describe('Navbar Component', () => {
  it('renders branding and desktop navigation items', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /afrihub homepage/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /what we do/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /events/i })[0]).toBeInTheDocument();
  });

  it('opens mobile drawer on hamburger click and updates aria-expanded', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /open navigation menu/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open drawer
    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: /mobile navigation/i })).toBeInTheDocument();
  });

  it('closes mobile drawer when ESC key is pressed', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(toggleButton);
    expect(screen.getByRole('dialog', { name: /mobile navigation/i })).toBeInTheDocument();

    // Fire Escape keydown
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: /mobile navigation/i })).not.toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile drawer when close button inside drawer is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(toggleButton);

    const closeButton = screen.getByRole('button', { name: /close drawer/i });
    fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog', { name: /mobile navigation/i })).not.toBeInTheDocument();
  });
});
