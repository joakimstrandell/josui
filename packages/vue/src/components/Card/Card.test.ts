import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Card from './Card.vue';
import CardHeader from './CardHeader.vue';
import CardTitle from './CardTitle.vue';
import CardDescription from './CardDescription.vue';
import CardContent from './CardContent.vue';
import CardFooter from './CardFooter.vue';

describe('Card', () => {
  it('renders with default props', () => {
    render(Card, {
      slots: { default: 'Card content' },
    });
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it.each(['default', 'bordered', 'elevated'] as const)('renders %s variant', (variant) => {
    const { container } = render(Card, {
      props: { variant },
      slots: { default: 'Content' },
    });
    expect(container.querySelector(`.josui-card--${variant}`)).toBeInTheDocument();
  });

  it.each(['none', 'sm', 'md', 'lg'] as const)('renders %s padding', (padding) => {
    const { container } = render(Card, {
      props: { padding },
      slots: { default: 'Content' },
    });
    expect(container.querySelector(`.josui-card--padding-${padding}`)).toBeInTheDocument();
  });
});

describe('CardHeader', () => {
  it('renders children', () => {
    render(CardHeader, {
      slots: { default: 'Header content' },
    });
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });
});

describe('CardTitle', () => {
  it('renders as h3 by default', () => {
    render(CardTitle, {
      slots: { default: 'Title' },
    });
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Title');
  });

  it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)('renders as %s when specified', (as) => {
    const level = parseInt(as.replace('h', ''));
    render(CardTitle, {
      props: { as },
      slots: { default: 'Title' },
    });
    expect(screen.getByRole('heading', { level })).toHaveTextContent('Title');
  });
});

describe('CardDescription', () => {
  it('renders children', () => {
    render(CardDescription, {
      slots: { default: 'Description text' },
    });
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    render(CardContent, {
      slots: { default: 'Main content' },
    });
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('renders children', () => {
    render(CardFooter, {
      slots: { default: 'Footer content' },
    });
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });
});
