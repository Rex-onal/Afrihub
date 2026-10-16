import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '../components/ui/Button';

describe('Button Component', () => {
  it('renders children and handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('respects the disabled state and blocks click handlers', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders loading state with spinner and aria-busy', () => {
    render(<Button loading>Submit Form</Button>);

    const button = screen.getByRole('button', { name: /submit form/i });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('renders polymorphically as a React Router Link', () => {
    render(
      <MemoryRouter>
        <Button as="link" to="/join">
          Join Community
        </Button>
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /join community/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/join');
  });
});
