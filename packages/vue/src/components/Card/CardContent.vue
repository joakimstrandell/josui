<script setup lang="ts">
export interface CardContentProps {
  /** Additional CSS classes */
  class?: string;
}

defineProps<CardContentProps>();
</script>

<template>
  <div class="josui-card-content">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-card-content {
  padding-top: spacing('4');
}
</style>
