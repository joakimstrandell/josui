<script setup lang="ts">
import { cn } from '../utils/cn';

defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('', $props.class)">
    <slot />
  </div>
</template>
