import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { h, defineComponent } from 'vue';
import Icon from './Icon.vue';

// Mock icons for Storybook (since lucide-vue-next is optional)
const CheckIcon = defineComponent({
  props: {
    size: { type: Number, default: 24 },
    strokeWidth: { type: Number, default: 2 },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: props.size,
          height: props.size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': props.strokeWidth,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        [h('polyline', { points: '20 6 9 17 4 12' })]
      );
  },
});

const AlertCircleIcon = defineComponent({
  props: {
    size: { type: Number, default: 24 },
    strokeWidth: { type: Number, default: 2 },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: props.size,
          height: props.size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': props.strokeWidth,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        [
          h('circle', { cx: '12', cy: '12', r: '10' }),
          h('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
          h('line', { x1: '12', y1: '16', x2: '12.01', y2: '16' }),
        ]
      );
  },
});

const StarIcon = defineComponent({
  props: {
    size: { type: Number, default: 24 },
    strokeWidth: { type: Number, default: 2 },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: props.size,
          height: props.size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': props.strokeWidth,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        [
          h('polygon', {
            points:
              '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
          }),
        ]
      );
  },
});

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['current', 'primary', 'gray', 'success', 'warning', 'error'],
    },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: CheckIcon,
    size: 'md',
    color: 'current',
  },
  render: (args) => ({
    components: { Icon },
    setup() {
      return { args, CheckIcon };
    },
    template: '<Icon :icon="CheckIcon" v-bind="args" />',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Icon },
    setup() {
      return { CheckIcon };
    },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <Icon :icon="CheckIcon" size="xs" />
        <Icon :icon="CheckIcon" size="sm" />
        <Icon :icon="CheckIcon" size="md" />
        <Icon :icon="CheckIcon" size="lg" />
        <Icon :icon="CheckIcon" size="xl" />
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { Icon },
    setup() {
      return { StarIcon };
    },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <Icon :icon="StarIcon" color="current" />
        <Icon :icon="StarIcon" color="primary" />
        <Icon :icon="StarIcon" color="gray" />
        <Icon :icon="StarIcon" color="success" />
        <Icon :icon="StarIcon" color="warning" />
        <Icon :icon="StarIcon" color="error" />
      </div>
    `,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { Icon },
    setup() {
      return { AlertCircleIcon };
    },
    template: `
      <Icon :icon="AlertCircleIcon" label="Warning" color="warning" size="lg" />
    `,
  }),
};

export const InlineWithText: Story = {
  render: () => ({
    components: { Icon },
    setup() {
      return { CheckIcon, StarIcon };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
          <Icon :icon="CheckIcon" color="success" size="sm" />
          Task completed successfully
        </span>
        <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
          <Icon :icon="StarIcon" color="warning" size="sm" />
          Featured item
        </span>
      </div>
    `,
  }),
};
