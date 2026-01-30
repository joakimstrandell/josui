<script setup lang="ts">
import { computed } from 'vue';

export interface ButtonProps {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Show loading spinner */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  isLoading: false,
  disabled: false,
  type: 'button',
});

const isDisabled = computed(() => props.disabled || props.isLoading);
</script>

<template>
  <button
    :class="['josui-button', `josui-button--${variant}`, `josui-button--${size}`]"
    :disabled="isDisabled"
    :type="type"
  >
    <span v-if="isLoading" class="josui-button__spinner" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" class="josui-button__spinner-icon">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-dasharray="31.4 31.4"
        />
      </svg>
    </span>
    <span v-if="$slots.icon && !isLoading" class="josui-button__icon">
      <slot name="icon" />
    </span>
    <span class="josui-button__content">
      <slot />
    </span>
    <span v-if="$slots.iconRight && !isLoading" class="josui-button__icon">
      <slot name="iconRight" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: radius('default');
  font-weight: font-weight('medium');
  font-family: inherit;
  border: 1px solid transparent;
  cursor: pointer;
  @include transition-colors;
  @include focus-visible-ring;

  &:disabled {
    @include disabled-state;
  }

  // Variants
  &--primary {
    background-color: color('primary-500');
    color: white;

    &:hover:not(:disabled) {
      background-color: color('primary-600');
    }

    &:active:not(:disabled) {
      background-color: color('primary-700');
    }

    &:focus-visible {
      @include focus-ring('primary-500');
    }
  }

  &--secondary {
    background-color: color('gray-100');
    color: color('gray-900');

    &:hover:not(:disabled) {
      background-color: color('gray-200');
    }

    &:active:not(:disabled) {
      background-color: color('gray-300');
    }

    &:focus-visible {
      @include focus-ring('gray-500');
    }
  }

  &--outline {
    background-color: transparent;
    border-color: color('gray-300');
    color: color('gray-900');

    &:hover:not(:disabled) {
      background-color: color('gray-50');
    }

    &:active:not(:disabled) {
      background-color: color('gray-100');
    }

    &:focus-visible {
      @include focus-ring('gray-500');
    }
  }

  &--ghost {
    background-color: transparent;
    color: color('gray-900');

    &:hover:not(:disabled) {
      background-color: color('gray-100');
    }

    &:active:not(:disabled) {
      background-color: color('gray-200');
    }

    &:focus-visible {
      @include focus-ring('gray-500');
    }
  }

  &--destructive {
    background-color: color('error-500');
    color: white;

    &:hover:not(:disabled) {
      background-color: color('error-600');
    }

    &:active:not(:disabled) {
      background-color: color('error-700');
    }

    &:focus-visible {
      @include focus-ring('error-500');
    }
  }

  // Sizes
  &--sm {
    height: spacing('8');
    padding-left: spacing('3');
    padding-right: spacing('3');
    font-size: font-size('sm');
    gap: spacing('1.5');
  }

  &--md {
    height: spacing('10');
    padding-left: spacing('4');
    padding-right: spacing('4');
    font-size: font-size('sm');
    gap: spacing('2');
  }

  &--lg {
    height: spacing('12');
    padding-left: spacing('6');
    padding-right: spacing('6');
    font-size: font-size('default');
    gap: spacing('2');
  }

  &__spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__spinner-icon {
    width: 1em;
    height: 1em;
    animation: josui-spin 1s linear infinite;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__content {
    display: inline-flex;
    align-items: center;
  }
}

@keyframes josui-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
