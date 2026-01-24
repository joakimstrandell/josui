<script setup lang="ts">
export interface DialogFooterProps {
  /** Additional CSS classes */
  class?: string;
}

defineProps<DialogFooterProps>();
</script>

<template>
  <div class="josui-dialog-footer">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-dialog-footer {
  display: flex;
  flex-direction: column-reverse;
  gap: spacing('2');
  padding-top: spacing('4');

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
