import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Checkbox from './Checkbox.vue';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(Checkbox);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('renders checked when modelValue is true', () => {
    render(Checkbox, {
      props: { modelValue: true },
    });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('emits update:modelValue when clicked', async () => {
    const { emitted } = render(Checkbox, {
      props: { modelValue: false },
    });
    const checkbox = screen.getByRole('checkbox');
    await fireEvent.click(checkbox);
    expect(emitted()['update:modelValue']).toBeTruthy();
    expect(emitted()['update:modelValue'][0]).toEqual([true]);
  });

  it('disables checkbox when disabled prop is true', () => {
    render(Checkbox, {
      props: { disabled: true },
    });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-disabled', '');
  });

  it('has aria-checked="mixed" when indeterminate', () => {
    render(Checkbox, {
      props: { modelValue: 'indeterminate' },
    });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
    const { container } = render(Checkbox, {
      props: { size },
    });
    expect(container.querySelector(`.josui-checkbox--${size}`)).toBeInTheDocument();
  });

  it('applies custom id when provided', () => {
    render(Checkbox, {
      props: { id: 'my-checkbox' },
    });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'my-checkbox');
  });

  it('applies name attribute for forms', () => {
    const { container } = render(Checkbox, {
      props: { name: 'terms' },
    });
    // reka-ui creates a hidden native input for form submission
    const hiddenInput = container.querySelector('input[type="checkbox"]');
    expect(hiddenInput).toHaveAttribute('name', 'terms');
  });

  it('applies required attribute', () => {
    render(Checkbox, {
      props: { required: true },
    });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-required', 'true');
  });
});
