import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Button from './Button.vue';

describe('Button', () => {
  it('renders with default props', () => {
    render(Button, {
      slots: { default: 'Click me' },
    });
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it.each(['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const)(
    'renders %s variant',
    (variant) => {
      render(Button, {
        props: { variant },
        slots: { default: 'Button' },
      });
      expect(screen.getByRole('button')).toHaveClass(`josui-button--${variant}`);
    }
  );

  it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
    render(Button, {
      props: { size },
      slots: { default: 'Button' },
    });
    expect(screen.getByRole('button')).toHaveClass(`josui-button--${size}`);
  });

  it('disables button when disabled prop is true', () => {
    render(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables button when isLoading is true', () => {
    render(Button, {
      props: { isLoading: true },
      slots: { default: 'Loading' },
    });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows spinner when isLoading is true', () => {
    render(Button, {
      props: { isLoading: true },
      slots: { default: 'Loading' },
    });
    expect(screen.getByRole('button').querySelector('.josui-button__spinner')).toBeInTheDocument();
  });

  it('renders icon slot', () => {
    render(Button, {
      slots: {
        default: 'With Icon',
        icon: '<span data-testid="icon">Icon</span>',
      },
    });
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders iconRight slot', () => {
    render(Button, {
      slots: {
        default: 'With Icon',
        iconRight: '<span data-testid="icon-right">Icon</span>',
      },
    });
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  it('sets correct button type', () => {
    render(Button, {
      props: { type: 'submit' },
      slots: { default: 'Submit' },
    });
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
