<script setup lang="ts">
import { computed, type Component } from 'vue';
import { cn } from '../utils/cn';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'caption';

export interface TypographyProps {
  /** Typography variant */
  variant?: TypographyVariant;
  /** Override the rendered element */
  as?: string;
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Text color */
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
}

const props = withDefaults(defineProps<TypographyProps>(), {
  variant: 'body',
  color: 'default',
});

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-5xl font-bold leading-tight tracking-tight',
  h2: 'text-4xl font-bold leading-tight tracking-tight',
  h3: 'text-3xl font-semibold leading-snug',
  h4: 'text-2xl font-semibold leading-snug',
  h5: 'text-xl font-semibold leading-normal',
  h6: 'text-lg font-semibold leading-normal',
  body: 'text-base leading-relaxed',
  'body-sm': 'text-sm leading-relaxed',
  caption: 'text-xs leading-normal',
};

const variantElements: Record<TypographyVariant, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
};

const weightStyles: Record<string, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorStyles: Record<string, string> = {
  default: 'text-gray-900',
  muted: 'text-gray-500',
  primary: 'text-primary-600',
  success: 'text-success-700',
  warning: 'text-warning-700',
  error: 'text-error-700',
};

const element = computed(() => props.as || variantElements[props.variant]);

const classes = computed(() =>
  cn(
    variantStyles[props.variant],
    props.weight && weightStyles[props.weight],
    colorStyles[props.color]
  )
);
</script>

<template>
  <component :is="element" :class="classes">
    <slot />
  </component>
</template>
