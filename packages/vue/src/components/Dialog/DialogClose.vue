<script setup lang="ts">
import { DialogClose as RekaDialogClose } from 'reka-ui';

export interface DialogCloseProps {
  /** HTML element to render as */
  as?: string;
}

withDefaults(defineProps<DialogCloseProps>(), {
  as: 'button',
});
</script>

<template>
  <RekaDialogClose :as="as" class="josui-dialog-close" aria-label="Close dialog">
    <slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </slot>
  </RekaDialogClose>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-dialog-close {
  @include reset-button;
  position: absolute;
  top: spacing('4');
  right: spacing('4');
  display: flex;
  align-items: center;
  justify-content: center;
  width: spacing('6');
  height: spacing('6');
  border-radius: radius('sm');
  color: color('muted.foreground');
  @include transition-colors;

  &:hover {
    color: color('foreground');
    background-color: color('gray-100');
  }

  &:focus-visible {
    @include focus-ring('gray-500');
  }

  svg {
    width: spacing('4');
    height: spacing('4');
  }
}
</style>
