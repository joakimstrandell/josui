<script setup lang="ts">
import { computed, type Component } from 'vue';

export interface IconProps {
  /** Lucide icon component */
  icon: Component;
  /** Size of the icon */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant */
  color?: 'current' | 'primary' | 'gray' | 'success' | 'warning' | 'error';
  /** Accessible label (empty = decorative) */
  label?: string;
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
  color: 'current',
  label: '',
});

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const iconSize = computed(() => sizeMap[props.size]);
const isDecorative = computed(() => !props.label);
</script>

<template>
  <span
    :class="['josui-icon', `josui-icon--${color}`]"
    :role="isDecorative ? 'presentation' : 'img'"
    :aria-label="label || undefined"
    :aria-hidden="isDecorative ? 'true' : undefined"
  >
    <component :is="icon" :size="iconSize" :stroke-width="2" />
  </span>
</template>

<style lang="scss" scoped>
@use '../../styles/tokens' as *;

.josui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  // Colors
  &--current {
    color: currentColor;
  }

  &--primary {
    color: color('primary-500');
  }

  &--gray {
    color: color('gray-500');
  }

  &--success {
    color: color('success-500');
  }

  &--warning {
    color: color('warning-500');
  }

  &--error {
    color: color('error-500');
  }
}
</style>
