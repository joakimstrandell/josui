<script setup lang="ts">
import { cn } from '@josui/core-web';

defineProps<{
  class?: string;
}>();
</script>

<template>
  <p :class="cn('text-sm text-gray-500', $props.class)">
    <slot />
  </p>
</template>
