import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Avatar from './Avatar.vue';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(Avatar, {
      props: { src: 'https://example.com/avatar.jpg', alt: 'User' },
    });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(img).toHaveAttribute('alt', 'User');
  });

  it('renders fallback when no src provided', () => {
    render(Avatar, {
      props: { fallback: 'JD' },
    });
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders first letter of alt as fallback when no fallback provided', () => {
    render(Avatar, {
      props: { alt: 'John Doe' },
    });
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders ? when no fallback or alt provided', () => {
    render(Avatar);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('shows fallback on image error', async () => {
    render(Avatar, {
      props: { src: 'invalid-url', fallback: 'JD' },
    });

    const img = screen.getByRole('img');
    await fireEvent.error(img);

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it.each([
    { size: 'sm', expectedClasses: ['h-8', 'w-8'] },
    { size: 'md', expectedClasses: ['h-10', 'w-10'] },
    { size: 'lg', expectedClasses: ['h-12', 'w-12'] },
    { size: 'xl', expectedClasses: ['h-16', 'w-16'] },
  ] as const)('applies $size size classes', ({ size, expectedClasses }) => {
    const { container } = render(Avatar, {
      props: { size, fallback: 'AB' },
    });
    expect(container.firstChild).toHaveClass(...expectedClasses);
  });

  it('defaults to md size', () => {
    const { container } = render(Avatar, {
      props: { fallback: 'MD' },
    });
    expect(container.firstChild).toHaveClass('h-10', 'w-10');
  });
});
