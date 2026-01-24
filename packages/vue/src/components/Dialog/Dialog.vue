<script setup lang="ts">
import { computed, watch } from 'vue';
import { DialogRoot } from 'reka-ui';

export interface DialogProps {
  /** Whether the dialog is open */
  open?: boolean;
  /** Modal behavior (focus trap, scroll lock) */
  modal?: boolean;
}

const props = withDefaults(defineProps<DialogProps>(), {
  open: false,
  modal: true,
});

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
});

// Lock body scroll when dialog is open (backup in case modal doesn't handle it)
watch(isOpen, (open) => {
  if (typeof document !== 'undefined' && !props.modal) {
    document.body.style.overflow = open ? 'hidden' : '';
  }
});
</script>

<template>
  <DialogRoot v-model:open="isOpen" :modal="modal">
    <slot />
  </DialogRoot>
</template>
