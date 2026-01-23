<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@josui/core-web';

export interface SpinnerProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color */
  color?: 'primary' | 'current' | 'white';
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'md',
  color: 'current',
});

const sizeStyles = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
};

const colorStyles = {
  primary: 'border-primary-500 border-t-transparent',
  current: 'border-current border-t-transparent',
  white: 'border-white border-t-transparent',
};

const classes = computed(() =>
  cn('inline-block animate-spin rounded-full', sizeStyles[props.size], colorStyles[props.color])
);
</script>

<template>
  <div :class="classes" role="status" aria-label="Loading">
    <span class="sr-only">Loading...</span>
  </div>
</template>
