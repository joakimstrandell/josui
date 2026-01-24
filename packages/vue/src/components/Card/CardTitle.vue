<script setup lang="ts">
export interface CardTitleProps {
  /** HTML element to render as */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

withDefaults(defineProps<CardTitleProps>(), {
  as: 'h3',
});
</script>

<template>
  <component :is="as" class="josui-card-title">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@use '@josui/scss/mixins' as *;

.josui-card-title {
  font-size: font-size('lg');
  font-weight: font-weight('semibold');
  line-height: var(--font-line-height-tight);
  color: color('foreground');
  margin: 0;
}
</style>
