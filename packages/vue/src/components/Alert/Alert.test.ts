import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import Alert from './Alert.vue';

describe('Alert', () => {
  it('renders slot content', () => {
    render(Alert, { slots: { default: 'Alert message' } });
    expect(screen.getByRole('alert')).toHaveTextContent('Alert message');
  });

  it('renders title when provided', () => {
    render(Alert, {
      props: { title: 'Alert Title' },
      slots: { default: 'Alert message' },
    });
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
  });

  it.each([
    { variant: 'info', expectedClass: 'bg-info-50' },
    { variant: 'success', expectedClass: 'bg-success-50' },
    { variant: 'warning', expectedClass: 'bg-warning-50' },
    { variant: 'error', expectedClass: 'bg-error-50' },
  ] as const)('applies $variant variant class', ({ variant, expectedClass }) => {
    render(Alert, {
      props: { variant },
      slots: { default: 'Alert' },
    });
    expect(screen.getByRole('alert')).toHaveClass(expectedClass);
  });

  it('shows dismiss button when dismissible', () => {
    render(Alert, {
      props: { dismissible: true },
      slots: { default: 'Dismissible' },
    });
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('does not show dismiss button by default', () => {
    render(Alert, { slots: { default: 'Not dismissible' } });
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });

  it('emits dismiss event when dismiss button clicked', async () => {
    const onDismiss = vi.fn();
    render(Alert, {
      props: { dismissible: true, onDismiss },
      slots: { default: 'Dismissible' },
    });

    await fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it.each([
    { variant: 'info' },
    { variant: 'success' },
    { variant: 'warning' },
    { variant: 'error' },
  ] as const)('renders icon for $variant variant', ({ variant }) => {
    render(Alert, {
      props: { variant },
      slots: { default: 'Alert' },
    });
    expect(screen.getByRole('alert').querySelector('svg')).toBeInTheDocument();
  });
});
