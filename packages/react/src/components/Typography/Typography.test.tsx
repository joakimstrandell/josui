import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders children', () => {
    render(<Typography>Text content</Typography>);
    expect(screen.getByText('Text content')).toBeInTheDocument();
  });

  it('renders correct element for each variant', () => {
    const { rerender } = render(<Typography variant="h1">Heading 1</Typography>);
    expect(screen.getByText('Heading 1').tagName).toBe('H1');

    rerender(<Typography variant="h2">Heading 2</Typography>);
    expect(screen.getByText('Heading 2').tagName).toBe('H2');

    rerender(<Typography variant="h3">Heading 3</Typography>);
    expect(screen.getByText('Heading 3').tagName).toBe('H3');

    rerender(<Typography variant="h4">Heading 4</Typography>);
    expect(screen.getByText('Heading 4').tagName).toBe('H4');

    rerender(<Typography variant="h5">Heading 5</Typography>);
    expect(screen.getByText('Heading 5').tagName).toBe('H5');

    rerender(<Typography variant="h6">Heading 6</Typography>);
    expect(screen.getByText('Heading 6').tagName).toBe('H6');

    rerender(<Typography variant="body">Body</Typography>);
    expect(screen.getByText('Body').tagName).toBe('P');

    rerender(<Typography variant="body-sm">Body Small</Typography>);
    expect(screen.getByText('Body Small').tagName).toBe('P');

    rerender(<Typography variant="caption">Caption</Typography>);
    expect(screen.getByText('Caption').tagName).toBe('SPAN');
  });

  it('allows overriding element with as prop', () => {
    render(
      <Typography variant="h1" as="span">
        Span Heading
      </Typography>
    );
    expect(screen.getByText('Span Heading').tagName).toBe('SPAN');
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Typography variant="h1">H1</Typography>);
    expect(screen.getByText('H1')).toHaveClass('text-5xl');

    rerender(<Typography variant="body">Body</Typography>);
    expect(screen.getByText('Body')).toHaveClass('text-base');

    rerender(<Typography variant="caption">Caption</Typography>);
    expect(screen.getByText('Caption')).toHaveClass('text-xs');
  });

  it('applies weight styles', () => {
    const { rerender } = render(<Typography weight="normal">Normal</Typography>);
    expect(screen.getByText('Normal')).toHaveClass('font-normal');

    rerender(<Typography weight="medium">Medium</Typography>);
    expect(screen.getByText('Medium')).toHaveClass('font-medium');

    rerender(<Typography weight="semibold">Semibold</Typography>);
    expect(screen.getByText('Semibold')).toHaveClass('font-semibold');

    rerender(<Typography weight="bold">Bold</Typography>);
    expect(screen.getByText('Bold')).toHaveClass('font-bold');
  });

  it('applies color styles', () => {
    const { rerender } = render(<Typography color="default">Default</Typography>);
    expect(screen.getByText('Default')).toHaveClass('text-foreground');

    rerender(<Typography color="muted">Muted</Typography>);
    expect(screen.getByText('Muted')).toHaveClass('text-muted-foreground');

    rerender(<Typography color="primary">Primary</Typography>);
    expect(screen.getByText('Primary')).toHaveClass('text-primary-600');

    rerender(<Typography color="success">Success</Typography>);
    expect(screen.getByText('Success')).toHaveClass('text-success-foreground');

    rerender(<Typography color="warning">Warning</Typography>);
    expect(screen.getByText('Warning')).toHaveClass('text-warning-foreground');

    rerender(<Typography color="error">Error</Typography>);
    expect(screen.getByText('Error')).toHaveClass('text-error-foreground');
  });

  it('applies custom className', () => {
    render(<Typography className="custom-class">Custom</Typography>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Typography ref={ref}>Ref</Typography>);
    expect(ref).toHaveBeenCalled();
  });
});
