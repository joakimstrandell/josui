<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../utils/cn';

export interface AlertProps {
  /** Alert variant */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Alert title */
  title?: string;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'info',
  dismissible: false,
});

const emit = defineEmits<{
  dismiss: [];
}>();

const variantStyles = {
  info: 'bg-info-50 text-info-700 border-info-500',
  success: 'bg-success-50 text-success-700 border-success-500',
  warning: 'bg-warning-50 text-warning-700 border-warning-500',
  error: 'bg-error-50 text-error-700 border-error-500',
};

const iconStyles = {
  info: 'text-info-500',
  success: 'text-success-500',
  warning: 'text-warning-500',
  error: 'text-error-500',
};

const classes = computed(() =>
  cn('flex gap-3 rounded-lg border-l-4 p-4', variantStyles[props.variant])
);

const iconClass = computed(() => cn('h-5 w-5 shrink-0', iconStyles[props.variant]));

function onDismiss() {
  emit('dismiss');
}
</script>

<template>
  <div :class="classes" role="alert">
    <slot name="icon">
      <!-- Info icon -->
      <svg
        v-if="variant === 'info'"
        :class="iconClass"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <!-- Success icon -->
      <svg
        v-else-if="variant === 'success'"
        :class="iconClass"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <!-- Warning icon -->
      <svg
        v-else-if="variant === 'warning'"
        :class="iconClass"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <!-- Error icon -->
      <svg
        v-else-if="variant === 'error'"
        :class="iconClass"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </slot>
    <div class="min-w-0 flex-1">
      <p v-if="title" class="font-medium">{{ title }}</p>
      <div :class="cn('text-sm', title && 'mt-1')">
        <slot />
      </div>
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="shrink-0 rounded p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
      @click="onDismiss"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span class="sr-only">Dismiss</span>
    </button>
  </div>
</template>
