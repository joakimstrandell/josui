<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../utils/cn';

export interface InputProps {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Hint text */
  hint?: string;
  /** Visual state */
  state?: 'default' | 'error' | 'success';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Input value (for v-model) */
  modelValue?: string | number;
  /** ID for the input */
  id?: string;
  /** Disabled state */
  disabled?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  state: 'default',
  size: 'md',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const sizeStyles = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base',
};

const stateStyles = {
  default: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
  error: 'border-error-500 focus:border-error-500 focus:ring-error-500',
  success: 'border-success-500 focus:border-success-500 focus:ring-success-500',
};

const inputId = computed(() => props.id || props.label?.toLowerCase().replace(/\s+/g, '-'));
const effectiveState = computed(() => (props.error ? 'error' : props.state));

const inputClasses = computed(() =>
  cn(
    'w-full rounded-md border bg-white transition-colors',
    'placeholder:text-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
    sizeStyles[props.size],
    stateStyles[effectiveState.value]
  )
);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="mb-1.5 block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <div class="relative flex">
      <span
        v-if="$slots.leftAddon"
        class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
      >
        <slot name="leftAddon" />
      </span>
      <input
        :id="inputId"
        :class="inputClasses"
        :value="modelValue"
        :disabled="disabled"
        @input="onInput"
      />
      <span
        v-if="$slots.rightAddon"
        class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
      >
        <slot name="rightAddon" />
      </span>
    </div>
    <p
      v-if="error || hint"
      :class="cn('mt-1.5 text-sm', error ? 'text-error-500' : 'text-gray-500')"
    >
      {{ error || hint }}
    </p>
  </div>
</template>
