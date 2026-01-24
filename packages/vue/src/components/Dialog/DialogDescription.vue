<script setup lang="ts">
import { DialogDescription as RekaDialogDescription } from 'reka-ui';

export interface DialogDescriptionProps {
  /** HTML element to render as */
  as?: string;
}

withDefaults(defineProps<DialogDescriptionProps>(), {
  as: 'p',
});
</script>

<template>
  <RekaDialogDescription :as="as" class="josui-dialog-description">
    <slot />
  </RekaDialogDescription>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-dialog-description {
  font-size: font-size('sm');
  color: color('muted-foreground');
  margin: 0;
}
</style>
