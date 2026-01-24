<script setup lang="ts">
import { DialogPortal, DialogContent as RekaDialogContent } from 'reka-ui';

export interface DialogContentProps {
  /** Width of the dialog */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Force mount for animation control */
  forceMount?: boolean;
}

withDefaults(defineProps<DialogContentProps>(), {
  size: 'md',
  forceMount: false,
});

const emit = defineEmits<{
  escapeKeyDown: [event: KeyboardEvent];
  pointerDownOutside: [event: Event];
  focusOutside: [event: Event];
  interactOutside: [event: Event];
}>();
</script>

<template>
  <DialogPortal>
    <RekaDialogContent
      :class="['josui-dialog-content', `josui-dialog-content--${size}`]"
      :force-mount="forceMount"
      @escape-key-down="emit('escapeKeyDown', $event)"
      @pointer-down-outside="emit('pointerDownOutside', $event)"
      @focus-outside="emit('focusOutside', $event)"
      @interact-outside="emit('interactOutside', $event)"
    >
      <slot />
    </RekaDialogContent>
  </DialogPortal>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-dialog-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: z-index('modal');
  background-color: color('background');
  border-radius: radius('lg');
  box-shadow: shadow('xl');
  max-height: calc(100vh - #{spacing('8')});
  overflow-y: auto;
  padding: spacing('6');

  &:focus {
    outline: none;
  }

  // Animation
  &[data-state='open'] {
    animation: josui-content-show duration('normal') easing('ease');
  }

  &[data-state='closed'] {
    animation: josui-content-hide duration('normal') easing('ease');
  }

  // Sizes
  &--sm {
    width: 100%;
    max-width: 24rem;
  }

  &--md {
    width: 100%;
    max-width: 28rem;
  }

  &--lg {
    width: 100%;
    max-width: 32rem;
  }

  &--xl {
    width: 100%;
    max-width: 36rem;
  }

  &--full {
    width: calc(100% - #{spacing('8')});
    max-width: none;
  }
}

@keyframes josui-content-show {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes josui-content-hide {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
}
</style>
