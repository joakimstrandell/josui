<script setup lang="ts">
import { cn } from '@josui/core-web';

defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('', $props.class)">
    <slot />
  </div>
</template>
