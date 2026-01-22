import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Card from './Card.vue';
import CardHeader from './CardHeader.vue';
import CardTitle from './CardTitle.vue';
import CardDescription from './CardDescription.vue';
import CardContent from './CardContent.vue';
import CardFooter from './CardFooter.vue';

describe('Card', () => {
  it('renders slot content', () => {
    render(Card, { slots: { default: 'Card content' } });
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it.each([
    { variant: 'default', expectedClass: 'bg-white' },
    { variant: 'bordered', expectedClasses: ['border', 'border-gray-200'] },
    { variant: 'elevated', expectedClass: 'bg-white' },
  ] as const)('applies $variant variant class', ({ variant, expectedClass, expectedClasses }) => {
    const { container } = render(Card, {
      props: { variant },
      slots: { default: 'Content' },
    });
    if (expectedClasses) {
      expect(container.firstChild).toHaveClass(...expectedClasses);
    } else {
      expect(container.firstChild).toHaveClass(expectedClass);
    }
  });

  it.each([
    { padding: 'none', expectedClass: 'p-0' },
    { padding: 'sm', expectedClass: 'p-4' },
    { padding: 'md', expectedClass: 'p-6' },
    { padding: 'lg', expectedClass: 'p-8' },
  ] as const)('applies $padding padding class', ({ padding, expectedClass }) => {
    const { container } = render(Card, {
      props: { padding },
      slots: { default: 'Content' },
    });
    expect(container.firstChild).toHaveClass(expectedClass);
  });

  it.each([
    { shadow: 'none', expectedClass: 'shadow-none' },
    { shadow: 'sm', expectedClass: 'shadow-sm' },
    { shadow: 'md', expectedClass: 'shadow-md' },
    { shadow: 'lg', expectedClass: 'shadow-lg' },
  ] as const)('applies $shadow shadow class for default variant', ({ shadow, expectedClass }) => {
    const { container } = render(Card, {
      props: { variant: 'default', shadow },
      slots: { default: 'Content' },
    });
    expect(container.firstChild).toHaveClass(expectedClass);
  });

  it('does not apply shadow for bordered variant', () => {
    const { container } = render(Card, {
      props: { variant: 'bordered', shadow: 'lg' },
      slots: { default: 'Content' },
    });
    expect(container.firstChild).not.toHaveClass('shadow-lg');
  });
});

describe('CardHeader', () => {
  it('renders slot content', () => {
    render(CardHeader, { slots: { default: 'Header content' } });
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });
});

describe('CardTitle', () => {
  it('renders slot content', () => {
    render(CardTitle, { slots: { default: 'Card Title' } });
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('renders as h3 by default', () => {
    render(CardTitle, { slots: { default: 'Card Title' } });
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Card Title');
  });

  it('renders as specified heading level', () => {
    render(CardTitle, {
      props: { as: 'h2' },
      slots: { default: 'Card Title' },
    });
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Card Title');
  });
});

describe('CardDescription', () => {
  it('renders slot content', () => {
    render(CardDescription, { slots: { default: 'Card description' } });
    expect(screen.getByText('Card description')).toBeInTheDocument();
  });

  it('has muted text styling', () => {
    render(CardDescription, { slots: { default: 'Description' } });
    expect(screen.getByText('Description')).toHaveClass('text-gray-500');
  });
});

describe('CardContent', () => {
  it('renders slot content', () => {
    render(CardContent, { slots: { default: 'Content area' } });
    expect(screen.getByText('Content area')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('renders slot content', () => {
    render(CardFooter, { slots: { default: 'Footer content' } });
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('has flex layout', () => {
    const { container } = render(CardFooter, { slots: { default: 'Footer' } });
    expect(container.firstChild).toHaveClass('flex', 'items-center');
  });
});
