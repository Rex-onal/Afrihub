import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '../components/ui/Accordion';

describe('Accordion component', () => {
  const sampleItems = [
    {
      question: 'Is AfriHub membership free?',
      answer: 'Yes, membership in AfriHub is 100% free for all African builders.',
    },
    {
      question: 'What programmes do you offer?',
      answer: 'We offer hackathons, technical workshops, and global career pipelines.',
    },
  ];

  it('renders accordion questions with first item open by default', () => {
    render(<Accordion items={sampleItems} />);

    const firstTrigger = screen.getByRole('button', { name: /Is AfriHub membership free\?/i });
    expect(firstTrigger).toBeInTheDocument();
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');

    // First answer is visible
    expect(screen.getByText(/100% free for all African builders/i)).toBeInTheDocument();

    // Second trigger is closed
    const secondTrigger = screen.getByRole('button', { name: /What programmes do you offer\?/i });
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles item open and closed upon click', () => {
    render(<Accordion items={sampleItems} />);

    const secondTrigger = screen.getByRole('button', { name: /What programmes do you offer\?/i });
    fireEvent.click(secondTrigger);

    // Second item should now be open
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/We offer hackathons, technical workshops/i)).toBeInTheDocument();

    // With single-open behavior, first item closes
    const firstTrigger = screen.getByRole('button', { name: /Is AfriHub membership free\?/i });
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports allowMultiple mode', () => {
    render(<Accordion items={sampleItems} allowMultiple={true} />);

    const secondTrigger = screen.getByRole('button', { name: /What programmes do you offer\?/i });
    fireEvent.click(secondTrigger);

    // Both items open simultaneously
    const firstTrigger = screen.getByRole('button', { name: /Is AfriHub membership free\?/i });
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
  });
});
