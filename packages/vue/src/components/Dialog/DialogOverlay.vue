<script setup lang="ts">
import { DialogPortal, DialogOverlay as RekaDialogOverlay } from 'reka-ui';

export interface DialogOverlayProps {
  /** Force mount for animation control */
  forceMount?: boolean;
}

withDefaults(defineProps<DialogOverlayProps>(), {
  forceMount: false,
});
</script>

<template>
  <DialogPortal>
    <RekaDialogOverlay class="josui-dialog-overlay" :force-mount="forceMount" />
  </DialogPortal>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-dialog-overlay {
  position: fixed;
  inset: 0;
  background-color: oklch(0 0 0 / 0.5);
  z-index: z-index('overlay');

  &[data-state='open'] {
    animation: josui-overlay-show duration('normal') easing('ease');
  }

  &[data-state='closed'] {
    animation: josui-overlay-hide duration('normal') easing('ease');
  }
}

@keyframes josui-overlay-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes josui-overlay-hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
