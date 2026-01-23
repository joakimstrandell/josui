<script setup lang="ts">
import { cn } from '@josui/core-web';

defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('mt-4 flex items-center', $props.class)">
    <slot />
  </div>
</template>
