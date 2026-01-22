import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import Input from './Input.vue';

describe('Input', () => {
  it('renders input element', () => {
    render(Input);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(Input, { props: { label: 'Email' } });
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders hint when provided', () => {
    render(Input, { props: { hint: 'Enter your email' } });
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('renders error when provided', () => {
    render(Input, { props: { error: 'Invalid email' } });
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toHaveClass('text-error-500');
  });

  it.each([
    { size: 'sm', expectedClass: 'h-8' },
    { size: 'md', expectedClass: 'h-10' },
    { size: 'lg', expectedClass: 'h-12' },
  ] as const)('applies $size size class', ({ size, expectedClass }) => {
    render(Input, { props: { size } });
    expect(screen.getByRole('textbox')).toHaveClass(expectedClass);
  });

  it.each([
    { state: 'default', expectedClass: 'border-gray-300' },
    { state: 'error', expectedClass: 'border-error-500' },
    { state: 'success', expectedClass: 'border-success-500' },
  ] as const)('applies $state state class', ({ state, expectedClass }) => {
    render(Input, { props: { state } });
    expect(screen.getByRole('textbox')).toHaveClass(expectedClass);
  });

  it('applies error state when error prop is provided', () => {
    render(Input, { props: { error: 'Error message' } });
    expect(screen.getByRole('textbox')).toHaveClass('border-error-500');
  });

  it('is disabled when disabled prop is true', () => {
    render(Input, { props: { disabled: true } });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('emits update:modelValue on input', async () => {
    const onUpdate = vi.fn();
    render(Input, {
      props: { 'onUpdate:modelValue': onUpdate },
    });

    await fireEvent.update(screen.getByRole('textbox'), 'test value');
    expect(onUpdate).toHaveBeenCalledWith('test value');
  });

  it('displays modelValue', () => {
    render(Input, { props: { modelValue: 'initial value' } });
    expect(screen.getByRole('textbox')).toHaveValue('initial value');
  });

  it('generates id from label', () => {
    render(Input, { props: { label: 'Email Address' } });
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email-address');
  });

  it('uses provided id over generated one', () => {
    render(Input, { props: { label: 'Email', id: 'custom-id' } });
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
  });

  it('defaults to md size', () => {
    render(Input);
    expect(screen.getByRole('textbox')).toHaveClass('h-10');
  });

  it('defaults to default state', () => {
    render(Input);
    expect(screen.getByRole('textbox')).toHaveClass('border-gray-300');
  });
});
