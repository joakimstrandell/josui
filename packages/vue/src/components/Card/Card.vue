<script setup lang="ts">
export interface CardProps {
  /** Visual variant */
  variant?: 'default' | 'bordered' | 'elevated';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  padding: 'md',
});
</script>

<template>
  <div :class="['josui-card', `josui-card--${variant}`, `josui-card--padding-${padding}`]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/tokens' as *;

.josui-card {
  border-radius: radius('lg');
  background-color: color('background');

  // Variants
  &--default {
    border: 1px solid color('border');
  }

  &--bordered {
    border: 2px solid color('border');
  }

  &--elevated {
    border: 1px solid color('border');
    box-shadow: shadow('md');
  }

  // Padding
  &--padding-none {
    padding: 0;
  }

  &--padding-sm {
    padding: spacing('3');
  }

  &--padding-md {
    padding: spacing('6');
  }

  &--padding-lg {
    padding: spacing('8');
  }
}
</style>
