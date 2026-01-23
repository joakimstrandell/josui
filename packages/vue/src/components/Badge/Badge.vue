<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@josui/core-web';

export interface BadgeProps {
  /** Visual variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'md',
});

const variantStyles = {
  default: 'bg-gray-100 text-gray-800',
  primary: 'bg-primary-100 text-primary-800',
  success: 'bg-success-50 text-success-700',
  warning: 'bg-warning-50 text-warning-700',
  error: 'bg-error-50 text-error-700',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-sm',
};

const classes = computed(() =>
  cn(
    'inline-flex items-center rounded-full font-medium',
    variantStyles[props.variant],
    sizeStyles[props.size]
  )
);
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
