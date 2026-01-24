<script setup lang="ts">
export interface CardHeaderProps {
  /** Additional CSS classes */
  class?: string;
}

defineProps<CardHeaderProps>();
</script>

<template>
  <div class="josui-card-header">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-card-header {
  display: flex;
  flex-direction: column;
  gap: spacing('1.5');
}
</style>
