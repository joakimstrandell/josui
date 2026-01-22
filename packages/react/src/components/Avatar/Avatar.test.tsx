import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders fallback when no src', () => {
    render(<Avatar fallback="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders first letter of alt as fallback', () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders ? when no fallback or alt', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('shows fallback on image error', () => {
    const { container } = render(<Avatar src="invalid.jpg" fallback="JD" />);
    const img = container.querySelector('img');
    fireEvent.error(img!);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container, rerender } = render(<Avatar size="sm" fallback="A" />);
    expect(container.firstChild).toHaveClass('h-8', 'w-8');

    rerender(<Avatar size="md" fallback="A" />);
    expect(container.firstChild).toHaveClass('h-10', 'w-10');

    rerender(<Avatar size="lg" fallback="A" />);
    expect(container.firstChild).toHaveClass('h-12', 'w-12');

    rerender(<Avatar size="xl" fallback="A" />);
    expect(container.firstChild).toHaveClass('h-16', 'w-16');
  });

  it('applies custom className', () => {
    const { container } = render(<Avatar className="custom-class" fallback="A" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Avatar ref={ref} fallback="A" />);
    expect(ref).toHaveBeenCalled();
  });
});
