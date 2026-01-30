import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('has alert role', () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Alert title="Alert Title">Message</Alert>);
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Alert variant="info">Info</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-info-background');

    rerender(<Alert variant="success">Success</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-success-background');

    rerender(<Alert variant="warning">Warning</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-warning-background');

    rerender(<Alert variant="error">Error</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-error-background');
  });

  it('renders default icon for each variant', () => {
    const { rerender } = render(<Alert variant="info">Info</Alert>);
    expect(screen.getByRole('alert').querySelector('svg')).toBeInTheDocument();

    rerender(<Alert variant="success">Success</Alert>);
    expect(screen.getByRole('alert').querySelector('svg')).toBeInTheDocument();

    rerender(<Alert variant="warning">Warning</Alert>);
    expect(screen.getByRole('alert').querySelector('svg')).toBeInTheDocument();

    rerender(<Alert variant="error">Error</Alert>);
    expect(screen.getByRole('alert').querySelector('svg')).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    render(<Alert icon={<span data-testid="custom-icon">!</span>}>Message</Alert>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('hides icon when icon is null', () => {
    render(<Alert icon={null}>Message</Alert>);
    expect(screen.getByRole('alert').querySelector('svg')).not.toBeInTheDocument();
  });

  it('shows dismiss button when dismissible', () => {
    render(<Alert dismissible>Message</Alert>);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('does not show dismiss button by default', () => {
    render(<Alert>Message</Alert>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button clicked', async () => {
    const handleDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={handleDismiss}>
        Message
      </Alert>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Alert className="custom-class">Message</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Alert ref={ref}>Message</Alert>);
    expect(ref).toHaveBeenCalled();
  });
});
