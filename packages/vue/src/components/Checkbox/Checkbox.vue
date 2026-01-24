<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui';

export interface CheckboxProps {
  /** The checked state (v-model) */
  modelValue?: boolean | 'indeterminate';
  /** Disabled state */
  disabled?: boolean;
  /** Size of the checkbox */
  size?: 'sm' | 'md' | 'lg';
  /** ID for the input element */
  id?: string;
  /** Name for form submission */
  name?: string;
  /** Value for form submission */
  value?: string;
  /** Required field */
  required?: boolean;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
  size: 'md',
  id: undefined,
  name: undefined,
  value: 'on',
  required: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean | 'indeterminate'];
}>();

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const isIndeterminate = computed(() => props.modelValue === 'indeterminate');
</script>

<template>
  <CheckboxRoot
    v-model="checked"
    :disabled="disabled"
    :id="id"
    :name="name"
    :value="value"
    :required="required"
    :class="['josui-checkbox', `josui-checkbox--${size}`]"
  >
    <CheckboxIndicator class="josui-checkbox__indicator" :force-mount="true">
      <svg
        v-if="isIndeterminate"
        class="josui-checkbox__icon josui-checkbox__icon--indeterminate"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <line x1="2" y1="6" x2="10" y2="6" />
      </svg>
      <svg
        v-else
        class="josui-checkbox__icon josui-checkbox__icon--check"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="2,6 5,9 10,3" />
      </svg>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style lang="scss" scoped>
@use '../../styles/tokens' as *;

.josui-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid color('gray-300');
  border-radius: radius('sm');
  background-color: color('background');
  @include transition-all;
  cursor: pointer;

  &:hover:not([data-disabled]) {
    border-color: color('gray-400');
  }

  &:focus-visible {
    @include focus-ring('primary-500');
  }

  &[data-state='checked'],
  &[data-state='indeterminate'] {
    background-color: color('primary-500');
    border-color: color('primary-500');
    color: white;

    &:hover:not([data-disabled]) {
      background-color: color('primary-600');
      border-color: color('primary-600');
    }
  }

  &[data-disabled] {
    @include disabled-state;
    cursor: not-allowed;
  }

  // Sizes
  &--sm {
    width: spacing('4');
    height: spacing('4');
  }

  &--md {
    width: spacing('5');
    height: spacing('5');
  }

  &--lg {
    width: spacing('6');
    height: spacing('6');
  }

  &__indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__icon {
    width: 75%;
    height: 75%;
    opacity: 0;
    transform: scale(0.8);
    transition:
      opacity duration('fast') easing('ease'),
      transform duration('fast') easing('ease');

    &--check {
      .josui-checkbox[data-state='checked'] & {
        opacity: 1;
        transform: scale(1);
      }
    }

    &--indeterminate {
      .josui-checkbox[data-state='indeterminate'] & {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}
</style>
