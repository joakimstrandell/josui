<script setup lang="ts">
export interface BadgeProps {
  /** Visual variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'md',
});
</script>

<template>
  <span :class="['josui-badge', `josui-badge--${variant}`, `josui-badge--${size}`]">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
@use '../../styles/tokens' as *;

.josui-badge {
  display: inline-flex;
  align-items: center;
  border-radius: radius('full');
  font-weight: font-weight('medium');

  // Variants
  &--default {
    background-color: color('gray-100');
    color: color('gray-800');
  }

  &--primary {
    background-color: color('primary-100');
    color: color('primary-800');
  }

  &--success {
    background-color: color('success-50');
    color: color('success-700');
  }

  &--warning {
    background-color: color('warning-50');
    color: color('warning-700');
  }

  &--error {
    background-color: color('error-50');
    color: color('error-700');
  }

  // Sizes
  &--sm {
    padding: spacing('0-5') spacing('2');
    font-size: font-size('xs');
  }

  &--md {
    padding: spacing('0-5') spacing('2-5');
    font-size: font-size('sm');
  }

  &--lg {
    padding: spacing('1') spacing('3');
    font-size: font-size('sm');
  }
}
</style>
