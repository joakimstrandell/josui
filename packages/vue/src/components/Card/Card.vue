<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../utils/cn';

export interface CardProps {
  /** Visual variant */
  variant?: 'default' | 'bordered' | 'elevated';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Shadow depth */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  padding: 'md',
  shadow: 'sm',
});

const variantStyles = {
  default: 'bg-white',
  bordered: 'bg-white border border-gray-200',
  elevated: 'bg-white',
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const shadowStyles = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

const classes = computed(() =>
  cn(
    'rounded-lg',
    variantStyles[props.variant],
    paddingStyles[props.padding],
    props.variant === 'elevated' || props.variant === 'default' ? shadowStyles[props.shadow] : ''
  )
);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
