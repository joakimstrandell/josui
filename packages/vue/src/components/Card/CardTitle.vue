<script setup lang="ts">
import { cn } from '@josui/core-web';

defineProps<{
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  class?: string;
}>();
</script>

<template>
  <component
    :is="as || 'h3'"
    :class="cn('text-lg font-semibold leading-tight text-gray-900', $props.class)"
  >
    <slot />
  </component>
</template>
