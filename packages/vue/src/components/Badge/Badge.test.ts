import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Badge from './Badge.vue';

describe('Badge', () => {
  it('renders with default props', () => {
    render(Badge, {
      slots: { default: 'Badge text' },
    });
    expect(screen.getByText('Badge text')).toBeInTheDocument();
  });

  it.each(['default', 'primary', 'success', 'warning', 'error'] as const)(
    'renders %s variant',
    (variant) => {
      const { container } = render(Badge, {
        props: { variant },
        slots: { default: 'Badge' },
      });
      expect(container.querySelector(`.josui-badge--${variant}`)).toBeInTheDocument();
    }
  );

  it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
    const { container } = render(Badge, {
      props: { size },
      slots: { default: 'Badge' },
    });
    expect(container.querySelector(`.josui-badge--${size}`)).toBeInTheDocument();
  });

  it('renders as span element', () => {
    render(Badge, {
      slots: { default: 'Badge' },
    });
    expect(screen.getByText('Badge').tagName).toBe('SPAN');
  });
});
