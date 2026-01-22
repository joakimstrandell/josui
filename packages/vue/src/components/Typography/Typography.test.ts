import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Typography from './Typography.vue';

describe('Typography', () => {
  it('renders slot content', () => {
    render(Typography, { slots: { default: 'Hello World' } });
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it.each([
    { variant: 'h1', level: 1 },
    { variant: 'h2', level: 2 },
    { variant: 'h3', level: 3 },
    { variant: 'h4', level: 4 },
    { variant: 'h5', level: 5 },
    { variant: 'h6', level: 6 },
  ] as const)('renders correct element for $variant variant', ({ variant, level }) => {
    render(Typography, {
      props: { variant },
      slots: { default: 'Heading' },
    });
    expect(screen.getByRole('heading', { level })).toBeInTheDocument();
  });

  it.each([{ variant: 'body' }, { variant: 'body-sm' }] as const)(
    'renders p element for $variant variant',
    ({ variant }) => {
      const { container } = render(Typography, {
        props: { variant },
        slots: { default: 'Body text' },
      });
      expect(container.querySelector('p')).toBeInTheDocument();
    }
  );

  it('renders span element for caption variant', () => {
    const { container } = render(Typography, {
      props: { variant: 'caption' },
      slots: { default: 'Caption text' },
    });
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('allows overriding element with as prop', () => {
    const { container } = render(Typography, {
      props: { variant: 'body', as: 'div' },
      slots: { default: 'Div content' },
    });
    expect(container.querySelector('div')).toHaveTextContent('Div content');
  });

  it.each([
    { variant: 'h1', expectedClasses: ['text-5xl', 'font-bold'] },
    { variant: 'body', expectedClasses: ['text-base'] },
    { variant: 'caption', expectedClasses: ['text-xs'] },
  ] as const)('applies variant classes for $variant', ({ variant, expectedClasses }) => {
    render(Typography, {
      props: { variant },
      slots: { default: 'Text' },
    });
    expect(screen.getByText('Text')).toHaveClass(...expectedClasses);
  });

  it.each([
    { weight: 'normal', expectedClass: 'font-normal' },
    { weight: 'medium', expectedClass: 'font-medium' },
    { weight: 'semibold', expectedClass: 'font-semibold' },
    { weight: 'bold', expectedClass: 'font-bold' },
  ] as const)('applies $weight weight class', ({ weight, expectedClass }) => {
    render(Typography, {
      props: { weight },
      slots: { default: 'Text' },
    });
    expect(screen.getByText('Text')).toHaveClass(expectedClass);
  });

  it.each([
    { color: 'default', expectedClass: 'text-gray-900' },
    { color: 'muted', expectedClass: 'text-gray-500' },
    { color: 'primary', expectedClass: 'text-primary-600' },
    { color: 'success', expectedClass: 'text-success-700' },
    { color: 'warning', expectedClass: 'text-warning-700' },
    { color: 'error', expectedClass: 'text-error-700' },
  ] as const)('applies $color color class', ({ color, expectedClass }) => {
    render(Typography, {
      props: { color },
      slots: { default: 'Text' },
    });
    expect(screen.getByText('Text')).toHaveClass(expectedClass);
  });

  it('defaults to body variant', () => {
    const { container } = render(Typography, { slots: { default: 'Text' } });
    expect(container.querySelector('p')).toBeInTheDocument();
    expect(screen.getByText('Text')).toHaveClass('text-base');
  });

  it('defaults to default color', () => {
    render(Typography, { slots: { default: 'Text' } });
    expect(screen.getByText('Text')).toHaveClass('text-gray-900');
  });
});
