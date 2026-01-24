import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Checkbox from './Checkbox.vue';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    modelValue: {
      control: 'select',
      options: [false, true, 'indeterminate'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref<boolean | 'indeterminate'>(false);
      return { args, checked };
    },
    template: `
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <Checkbox v-model="checked" v-bind="args" />
        <span>Accept terms and conditions</span>
      </label>
    `,
  }),
};

export const Checked: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref<boolean | 'indeterminate'>(true);
      return { args, checked };
    },
    template: `
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <Checkbox v-model="checked" v-bind="args" />
        <span>Checked checkbox</span>
      </label>
    `,
  }),
};

export const Indeterminate: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref<boolean | 'indeterminate'>('indeterminate');
      return { args, checked };
    },
    template: `
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <Checkbox v-model="checked" v-bind="args" />
        <span>Indeterminate state (click to cycle)</span>
      </label>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref<boolean | 'indeterminate'>(false);
      const checkedDisabled = ref<boolean | 'indeterminate'>(true);
      return { args, checked, checkedDisabled };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: not-allowed;">
          <Checkbox v-model="checked" v-bind="args" />
          <span style="opacity: 0.5;">Disabled unchecked</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: not-allowed;">
          <Checkbox v-model="checkedDisabled" v-bind="args" />
          <span style="opacity: 0.5;">Disabled checked</span>
        </label>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const small = ref<boolean | 'indeterminate'>(true);
      const medium = ref<boolean | 'indeterminate'>(true);
      const large = ref<boolean | 'indeterminate'>(true);
      return { small, medium, large };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <Checkbox v-model="small" size="sm" />
          <span>Small</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <Checkbox v-model="medium" size="md" />
          <span>Medium (default)</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <Checkbox v-model="large" size="lg" />
          <span>Large</span>
        </label>
      </div>
    `,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const newsletter = ref<boolean | 'indeterminate'>(false);
      const notifications = ref<boolean | 'indeterminate'>(true);
      const marketing = ref<boolean | 'indeterminate'>(false);
      return { newsletter, notifications, marketing };
    },
    template: `
      <fieldset style="border: none; padding: 0; margin: 0;">
        <legend style="font-weight: 600; margin-bottom: 0.75rem;">Email preferences</legend>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <Checkbox v-model="newsletter" id="newsletter" name="newsletter" />
            <span>Subscribe to newsletter</span>
          </label>
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <Checkbox v-model="notifications" id="notifications" name="notifications" />
            <span>Enable notifications</span>
          </label>
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <Checkbox v-model="marketing" id="marketing" name="marketing" />
            <span>Receive marketing emails</span>
          </label>
        </div>
      </fieldset>
    `,
  }),
};
