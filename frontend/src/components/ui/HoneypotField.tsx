import React from 'react';

export interface HoneypotFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}

export const HoneypotField = React.forwardRef<HTMLInputElement, HoneypotFieldProps>(
  ({ name = 'website', ...rest }, ref) => {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <label htmlFor={`hp-${name}`}>Leave this field empty</label>
        <input
          ref={ref}
          id={`hp-${name}`}
          type="text"
          name={name}
          tabIndex={-1}
          autoComplete="off"
          {...rest}
        />
      </div>
    );
  }
);

HoneypotField.displayName = 'HoneypotField';
