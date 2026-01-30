import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Card variant="default">Default</Card>);
    expect(screen.getByText('Default')).toHaveClass('bg-card-background');

    rerender(<Card variant="bordered">Bordered</Card>);
    expect(screen.getByText('Bordered')).toHaveClass('border');

    rerender(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText('Elevated')).toHaveClass('bg-card-background');
  });

  it('applies padding classes', () => {
    const { rerender } = render(<Card padding="none">None</Card>);
    expect(screen.getByText('None')).toHaveClass('p-0');

    rerender(<Card padding="sm">Small</Card>);
    expect(screen.getByText('Small')).toHaveClass('p-4');

    rerender(<Card padding="md">Medium</Card>);
    expect(screen.getByText('Medium')).toHaveClass('p-6');

    rerender(<Card padding="lg">Large</Card>);
    expect(screen.getByText('Large')).toHaveClass('p-8');
  });

  it('applies shadow classes', () => {
    const { rerender } = render(<Card shadow="none">None</Card>);
    expect(screen.getByText('None')).not.toHaveClass('shadow-sm');

    rerender(<Card shadow="sm">Small</Card>);
    expect(screen.getByText('Small')).toHaveClass('shadow-sm');

    rerender(<Card shadow="md">Medium</Card>);
    expect(screen.getByText('Medium')).toHaveClass('shadow-md');

    rerender(<Card shadow="lg">Large</Card>);
    expect(screen.getByText('Large')).toHaveClass('shadow-lg');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom</Card>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Ref</Card>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('CardHeader', () => {
  it('renders children', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CardHeader className="custom-class">Header</CardHeader>);
    expect(screen.getByText('Header')).toHaveClass('custom-class');
  });
});

describe('CardTitle', () => {
  it('renders children', () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders as h3 by default', () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByText('Title').tagName).toBe('H3');
  });

  it('renders as specified heading level', () => {
    render(<CardTitle as="h1">Title</CardTitle>);
    expect(screen.getByText('Title').tagName).toBe('H1');
  });
});

describe('CardDescription', () => {
  it('renders children', () => {
    render(<CardDescription>Description</CardDescription>);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders as paragraph', () => {
    render(<CardDescription>Description</CardDescription>);
    expect(screen.getByText('Description').tagName).toBe('P');
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    render(<CardContent>Content</CardContent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('renders children', () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
