import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@josui/core-web';
import {
  Container,
  type ContainerPadding,
  type ContainerPaddingSize,
  type ContainerWidth,
} from '../Container';

export type PageProps = HTMLAttributes<HTMLElement>;

export const Page = forwardRef<HTMLElement, PageProps>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn('relative z-10 flex min-h-screen flex-col', className)}
    {...props}
  />
));

Page.displayName = 'Page';

export interface PageSectionProps extends HTMLAttributes<HTMLElement> {
  /** Vertical padding sides */
  padding?: ContainerPadding;
  /** Vertical padding amount */
  paddingSize?: ContainerPaddingSize;
  /** Max-width constraint */
  width?: ContainerWidth;
}

export const PageSection = forwardRef<HTMLElement, PageSectionProps>(
  ({ className, padding = 'top-bottom', paddingSize = 'lg', width, ...props }, ref) => (
    <Container padding={padding} paddingSize={paddingSize} width={width} asChild>
      <section
        ref={ref}
        className={cn('flex flex-col justify-center space-y-10 lg:space-y-12', className)}
        {...props}
      />
    </Container>
  )
);

PageSection.displayName = 'PageSection';
