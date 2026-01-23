<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@josui/core-web';
import Spinner from '../Spinner/Spinner.vue';

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

const variantStyles = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-500',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-500',
  outline:
    'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-500',
  ghost:
    'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-500',
  destructive:
    'bg-error-500 text-white hover:bg-error-700 active:bg-error-700 focus-visible:ring-error-500',
};

const sizeStyles = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    variantStyles[props.variant],
    sizeStyles[props.size]
  )
);

const isDisabled = computed(() => props.disabled || props.isLoading);
const spinnerSize = computed(() => (props.size === 'sm' ? 'sm' : 'md'));
</script>

<template>
  <button :class="classes" :disabled="isDisabled" :type="type">
    <Spinner v-if="isLoading" :size="spinnerSize" class="mr-2" />
    <slot v-else name="leftIcon">
      <span v-if="$slots.leftIcon" class="shrink-0">
        <slot name="leftIcon" />
      </span>
    </slot>
    <slot />
    <span v-if="$slots.rightIcon && !isLoading" class="shrink-0">
      <slot name="rightIcon" />
    </span>
  </button>
</template>
