import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCounter } from '../components/ui/StatCounter';

// Test reduced motion behavior by mocking motion/react's useReducedMotion hook
vi.mock('motion/react', async () => {
  const actual = await vi.importActual('motion/react');
  return {
    ...actual,
    useInView: () => true,
    useReducedMotion: () => true, // Simulate user preference for reduced motion
  };
});

describe('StatCounter with Reduced Motion', () => {
  it('renders final static value immediately without count-up animation when reduced motion is preferred', () => {
    render(<StatCounter value="12,500+" label="Active Members" />);

    // Screen reader accessible text is present
    const srText = screen.getByText('12,500+ Active Members');
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('sr-only');

    // Visual display immediately equals the target value because reduced motion is active
    const visualValue = screen.getByText('12,500+');
    expect(visualValue).toBeInTheDocument();
    expect(visualValue).toHaveAttribute('aria-hidden', 'true');

    const label = screen.getByText('Active Members');
    expect(label).toBeInTheDocument();
  });

  it('renders percentage and currency values correctly under reduced motion', () => {
    render(<StatCounter value="$1.5M+" label="Funding Distributed" />);

    expect(screen.getByText('$1.5M+ Funding Distributed')).toBeInTheDocument();
    expect(screen.getByText('$1.5M+')).toBeInTheDocument();
  });
});
