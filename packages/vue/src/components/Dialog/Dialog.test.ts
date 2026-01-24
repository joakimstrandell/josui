import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import { ref, nextTick } from 'vue';
import Dialog from './Dialog.vue';
import DialogOverlay from './DialogOverlay.vue';
import DialogContent from './DialogContent.vue';
import DialogHeader from './DialogHeader.vue';
import DialogTitle from './DialogTitle.vue';
import DialogDescription from './DialogDescription.vue';
import DialogFooter from './DialogFooter.vue';
import DialogClose from './DialogClose.vue';

const TestDialog = {
  components: {
    Dialog,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
  },
  template: `
    <Dialog v-model:open="open">
      <DialogOverlay />
      <DialogContent>
        <DialogClose />
        <DialogHeader>
          <DialogTitle>Test Title</DialogTitle>
          <DialogDescription>Test Description</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button>Cancel</button>
          <button>Confirm</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  `,
  setup() {
    const open = ref(false);
    return { open };
  },
};

describe('Dialog', () => {
  it('does not render content when closed', () => {
    render(TestDialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders content when open', async () => {
    const open = ref(true);
    render({
      ...TestDialog,
      setup() {
        return { open };
      },
    });
    await nextTick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders title and description', async () => {
    const open = ref(true);
    render({
      ...TestDialog,
      setup() {
        return { open };
      },
    });
    await nextTick();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', async () => {
    const open = ref(true);
    render({
      ...TestDialog,
      setup() {
        return { open };
      },
    });
    await nextTick();
    const dialog = screen.getByRole('dialog');
    // reka-ui uses data-state for open state and handles aria attributes
    expect(dialog).toHaveAttribute('data-state', 'open');
    // Check that title and description are properly linked
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
  });

  it('closes when close button is clicked', async () => {
    const open = ref(true);
    render({
      ...TestDialog,
      setup() {
        return { open };
      },
    });
    await nextTick();
    const closeButton = screen.getByLabelText('Close dialog');
    await fireEvent.click(closeButton);
    await nextTick();
    expect(open.value).toBe(false);
  });

  it('closes when Escape key is pressed', async () => {
    const open = ref(true);
    render({
      ...TestDialog,
      setup() {
        return { open };
      },
    });
    await nextTick();
    await fireEvent.keyDown(document, { key: 'Escape' });
    await nextTick();
    expect(open.value).toBe(false);
  });
});

describe('DialogContent', () => {
  it.each(['sm', 'md', 'lg', 'xl', 'full'] as const)('renders %s size', async (size) => {
    const open = ref(true);
    render({
      components: { Dialog, DialogContent },
      template: `
          <Dialog v-model:open="open">
            <DialogContent :size="size">Content</DialogContent>
          </Dialog>
        `,
      setup() {
        return { open, size };
      },
    });
    await nextTick();
    expect(screen.getByRole('dialog')).toHaveClass(`josui-dialog-content--${size}`);
  });
});

describe('DialogHeader', () => {
  it('renders children', () => {
    render(DialogHeader, {
      slots: { default: 'Header content' },
    });
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });
});

describe('DialogFooter', () => {
  it('renders children', () => {
    render(DialogFooter, {
      slots: { default: 'Footer content' },
    });
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });
});
