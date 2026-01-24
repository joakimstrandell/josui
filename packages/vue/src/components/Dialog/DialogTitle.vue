<script setup lang="ts">
import { DialogTitle as RekaDialogTitle } from 'reka-ui';

export interface DialogTitleProps {
  /** HTML element to render as */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

withDefaults(defineProps<DialogTitleProps>(), {
  as: 'h2',
});
</script>

<template>
  <RekaDialogTitle :as="as" class="josui-dialog-title">
    <slot />
  </RekaDialogTitle>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-dialog-title {
  font-size: font-size('lg');
  font-weight: font-weight('semibold');
  line-height: var(--font-line-height-tight);
  color: color('foreground');
  margin: 0;
}
</style>
