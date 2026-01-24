<script setup lang="ts">
export interface CardDescriptionProps {
  /** Additional CSS classes */
  class?: string;
}

defineProps<CardDescriptionProps>();
</script>

<template>
  <p class="josui-card-description">
    <slot />
  </p>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-card-description {
  font-size: font-size('sm');
  color: color('muted-foreground');
  margin: 0;
}
</style>
