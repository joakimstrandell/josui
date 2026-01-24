<script setup lang="ts">
export interface CardFooterProps {
  /** Additional CSS classes */
  class?: string;
}

defineProps<CardFooterProps>();
</script>

<template>
  <div class="josui-card-footer">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-card-footer {
  display: flex;
  align-items: center;
  gap: spacing('2');
  padding-top: spacing('4');
}
</style>
