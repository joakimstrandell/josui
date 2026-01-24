import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { h, defineComponent } from 'vue';
import Icon from './Icon.vue';

// Mock icon component (simulates lucide-vue-next)
const MockIcon = defineComponent({
  props: {
    size: { type: Number, default: 24 },
    strokeWidth: { type: Number, default: 2 },
  },
  setup(props) {
    return () =>
      h('svg', {
        'data-testid': 'mock-icon',
        'data-size': props.size,
        'data-stroke-width': props.strokeWidth,
      });
  },
});

describe('Icon', () => {
  it('renders the icon component', () => {
    render(Icon, {
      props: { icon: MockIcon },
    });
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('applies correct size', () => {
    render(Icon, {
      props: { icon: MockIcon, size: 'lg' },
    });
    const svg = screen.getByTestId('mock-icon');
    expect(svg.dataset.size).toBe('24');
  });

  it.each([
    ['xs', '12'],
    ['sm', '16'],
    ['md', '20'],
    ['lg', '24'],
    ['xl', '32'],
  ] as const)('maps %s size to %s pixels', (size, pixels) => {
    render(Icon, {
      props: { icon: MockIcon, size },
    });
    const svg = screen.getByTestId('mock-icon');
    expect(svg.dataset.size).toBe(pixels);
  });

  it.each(['current', 'primary', 'gray', 'success', 'warning', 'error'] as const)(
    'applies %s color class',
    (color) => {
      const { container } = render(Icon, {
        props: { icon: MockIcon, color },
      });
      expect(container.querySelector(`.josui-icon--${color}`)).toBeInTheDocument();
    }
  );

  it('is decorative when no label provided', () => {
    const { container } = render(Icon, {
      props: { icon: MockIcon },
    });
    const wrapper = container.querySelector('.josui-icon');
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
    expect(wrapper).toHaveAttribute('role', 'presentation');
  });

  it('is accessible when label provided', () => {
    const { container } = render(Icon, {
      props: { icon: MockIcon, label: 'Check mark' },
    });
    const wrapper = container.querySelector('.josui-icon');
    expect(wrapper).toHaveAttribute('role', 'img');
    expect(wrapper).toHaveAttribute('aria-label', 'Check mark');
    expect(wrapper).not.toHaveAttribute('aria-hidden');
  });
});
