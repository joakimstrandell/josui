import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Spinner from './Spinner.vue';

describe('Spinner', () => {
  it('renders with status role', () => {
    render(Spinner);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(Spinner);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('has screen reader text', () => {
    render(Spinner);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toHaveClass('sr-only');
  });

  it.each([
    { size: 'sm', expectedClasses: ['h-4', 'w-4'] },
    { size: 'md', expectedClasses: ['h-6', 'w-6'] },
    { size: 'lg', expectedClasses: ['h-8', 'w-8'] },
  ] as const)('applies $size size classes', ({ size, expectedClasses }) => {
    render(Spinner, { props: { size } });
    expect(screen.getByRole('status')).toHaveClass(...expectedClasses);
  });

  it.each([
    { color: 'primary', expectedClass: 'border-primary-500' },
    { color: 'current', expectedClass: 'border-current' },
    { color: 'white', expectedClass: 'border-white' },
  ] as const)('applies $color color class', ({ color, expectedClass }) => {
    render(Spinner, { props: { color } });
    expect(screen.getByRole('status')).toHaveClass(expectedClass);
  });

  it('defaults to md size', () => {
    render(Spinner);
    expect(screen.getByRole('status')).toHaveClass('h-6', 'w-6');
  });

  it('defaults to current color', () => {
    render(Spinner);
    expect(screen.getByRole('status')).toHaveClass('border-current');
  });

  it('has spin animation', () => {
    render(Spinner);
    expect(screen.getByRole('status')).toHaveClass('animate-spin');
  });
});
