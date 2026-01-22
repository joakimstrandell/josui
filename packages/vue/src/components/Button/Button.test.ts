import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Button from './Button.vue';

describe('Button', () => {
  it('renders slot content', () => {
    render(Button, { slots: { default: 'Click me' } });
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it.each([
    { variant: 'primary', expectedClass: 'bg-primary-500' },
    { variant: 'secondary', expectedClass: 'bg-gray-100' },
    { variant: 'outline', expectedClass: 'border-gray-300' },
    { variant: 'ghost', expectedClass: 'bg-transparent' },
    { variant: 'destructive', expectedClass: 'bg-error-500' },
  ] as const)('applies $variant variant class', ({ variant, expectedClass }) => {
    render(Button, {
      props: { variant },
      slots: { default: 'Button' },
    });
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  it.each([
    { size: 'sm', expectedClass: 'h-8' },
    { size: 'md', expectedClass: 'h-10' },
    { size: 'lg', expectedClass: 'h-12' },
  ] as const)('applies $size size class', ({ size, expectedClass }) => {
    render(Button, {
      props: { size },
      slots: { default: 'Button' },
    });
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  it('is disabled when disabled prop is true', () => {
    render(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading', () => {
    render(Button, {
      props: { isLoading: true },
      slots: { default: 'Loading' },
    });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows spinner when loading', () => {
    render(Button, {
      props: { isLoading: true },
      slots: { default: 'Loading' },
    });
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it.each([{ type: 'submit' }, { type: 'reset' }, { type: 'button' }] as const)(
    'has correct button type: $type',
    ({ type }) => {
      render(Button, {
        props: { type },
        slots: { default: 'Button' },
      });
      expect(screen.getByRole('button')).toHaveAttribute('type', type);
    }
  );

  it('defaults to button type', () => {
    render(Button, { slots: { default: 'Button' } });
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
