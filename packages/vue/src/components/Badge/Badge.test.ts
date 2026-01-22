import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Badge from './Badge.vue';

describe('Badge', () => {
  it('renders slot content', () => {
    render(Badge, { slots: { default: 'New' } });
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it.each([
    { variant: 'default', expectedClass: 'bg-gray-100' },
    { variant: 'primary', expectedClass: 'bg-primary-100' },
    { variant: 'success', expectedClass: 'bg-success-50' },
    { variant: 'warning', expectedClass: 'bg-warning-50' },
    { variant: 'error', expectedClass: 'bg-error-50' },
  ] as const)('applies $variant variant class', ({ variant, expectedClass }) => {
    render(Badge, {
      props: { variant },
      slots: { default: 'Badge' },
    });
    expect(screen.getByText('Badge')).toHaveClass(expectedClass);
  });

  it.each([
    { size: 'sm', expectedClass: 'text-xs' },
    { size: 'md', expectedClass: 'text-sm' },
    { size: 'lg', expectedClass: 'text-sm' },
  ] as const)('applies $size size class', ({ size, expectedClass }) => {
    render(Badge, {
      props: { size },
      slots: { default: 'Badge' },
    });
    expect(screen.getByText('Badge')).toHaveClass(expectedClass);
  });

  it('defaults to default variant', () => {
    render(Badge, { slots: { default: 'Badge' } });
    expect(screen.getByText('Badge')).toHaveClass('bg-gray-100');
  });

  it('defaults to md size', () => {
    render(Badge, { slots: { default: 'Badge' } });
    expect(screen.getByText('Badge')).toHaveClass('px-2.5');
  });
});
