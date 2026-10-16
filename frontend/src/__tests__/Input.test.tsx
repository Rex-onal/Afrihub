import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '../components/ui/Input';

describe('Input Form Control', () => {
  it('associates label correctly with input element', () => {
    render(<Input label="Full Name" name="fullName" />);

    const input = screen.getByLabelText(/full name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'fullName');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('displays error message and sets aria-invalid and aria-describedby', () => {
    render(
      <Input
        label="Email Address"
        name="email"
        error="Please provide a valid email"
        helperText="We will never share your email"
      />
    );

    const input = screen.getByLabelText(/email address/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(/please provide a valid email/i);

    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(describedBy).toContain(errorMessage.id);
  });
});
