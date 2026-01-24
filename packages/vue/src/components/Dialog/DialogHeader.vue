<script setup lang="ts">
export interface DialogHeaderProps {
  /** Additional CSS classes */
  class?: string;
}

defineProps<DialogHeaderProps>();
</script>

<template>
  <div class="josui-dialog-header">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-dialog-header {
  display: flex;
  flex-direction: column;
  gap: spacing('1-5');
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
}
</style>
