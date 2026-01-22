<script setup lang="ts">
import { computed, ref } from 'vue';
import { cn } from '../../utils/cn';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text to display when image fails (usually initials) */
  fallback?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<AvatarProps>(), {
  alt: '',
  size: 'md',
});

const hasError = ref(false);

const sizeStyles = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const showFallback = computed(() => !props.src || hasError.value);

const fallbackText = computed(() => props.fallback || props.alt?.charAt(0).toUpperCase() || '?');

const classes = computed(() =>
  cn(
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200',
    sizeStyles[props.size]
  )
);

function onError() {
  hasError.value = true;
}
</script>

<template>
  <div :class="classes">
    <img
      v-if="!showFallback"
      :src="src"
      :alt="alt"
      class="h-full w-full object-cover"
      @error="onError"
    />
    <span v-else class="font-medium text-gray-600">
      {{ fallbackText }}
    </span>
  </div>
</template>
