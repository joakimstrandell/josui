import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Dialog from './Dialog.vue';
import DialogOverlay from './DialogOverlay.vue';
import DialogContent from './DialogContent.vue';
import DialogHeader from './DialogHeader.vue';
import DialogTitle from './DialogTitle.vue';
import DialogDescription from './DialogDescription.vue';
import DialogFooter from './DialogFooter.vue';
import DialogClose from './DialogClose.vue';
import { Button } from '../Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => ({
    components: {
      Dialog,
      DialogOverlay,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
      DialogClose,
      Button,
    },
    setup() {
      const open = ref(false);
      return { open };
    },
    template: `
      <div>
        <Button @click="open = true">Open Dialog</Button>
        <Dialog v-model:open="open">
          <DialogOverlay />
          <DialogContent>
            <DialogClose />
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a description of the dialog. It provides additional context for the user.
              </DialogDescription>
            </DialogHeader>
            <div style="padding-top: 1rem;">
              <p>Dialog content goes here. You can put any content inside.</p>
            </div>
            <DialogFooter>
              <Button variant="outline" @click="open = false">Cancel</Button>
              <Button @click="open = false">Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: {
      Dialog,
      DialogOverlay,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogClose,
      Button,
    },
    setup() {
      const openSm = ref(false);
      const openMd = ref(false);
      const openLg = ref(false);
      const openXl = ref(false);
      return { openSm, openMd, openLg, openXl };
    },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <Button @click="openSm = true">Small</Button>
        <Button @click="openMd = true">Medium</Button>
        <Button @click="openLg = true">Large</Button>
        <Button @click="openXl = true">Extra Large</Button>

        <Dialog v-model:open="openSm">
          <DialogOverlay />
          <DialogContent size="sm">
            <DialogClose />
            <DialogHeader>
              <DialogTitle>Small Dialog</DialogTitle>
              <DialogDescription>This is a small dialog.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog v-model:open="openMd">
          <DialogOverlay />
          <DialogContent size="md">
            <DialogClose />
            <DialogHeader>
              <DialogTitle>Medium Dialog</DialogTitle>
              <DialogDescription>This is a medium dialog (default).</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog v-model:open="openLg">
          <DialogOverlay />
          <DialogContent size="lg">
            <DialogClose />
            <DialogHeader>
              <DialogTitle>Large Dialog</DialogTitle>
              <DialogDescription>This is a large dialog.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog v-model:open="openXl">
          <DialogOverlay />
          <DialogContent size="xl">
            <DialogClose />
            <DialogHeader>
              <DialogTitle>Extra Large Dialog</DialogTitle>
              <DialogDescription>This is an extra large dialog.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};

export const ConfirmationDialog: Story = {
  render: () => ({
    components: {
      Dialog,
      DialogOverlay,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
      Button,
    },
    setup() {
      const open = ref(false);
      return { open };
    },
    template: `
      <div>
        <Button variant="destructive" @click="open = true">Delete Item</Button>
        <Dialog v-model:open="open">
          <DialogOverlay />
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the item.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" @click="open = false">Cancel</Button>
              <Button variant="destructive" @click="open = false">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
};
