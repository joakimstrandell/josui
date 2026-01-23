<script setup lang="ts">
import { cn } from '@josui/core-web';

defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('mb-4 flex flex-col space-y-1.5', $props.class)">
    <slot />
  </div>
</template>
