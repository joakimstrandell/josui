import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@josui/core-web";

export type AccordionProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;
export const Accordion = AccordionPrimitive.Root;

export interface AccordionItemProps extends ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
> {
  /** Visual variant */
  variant?: "default" | "separated";
}

const itemVariantStyles: Record<NonNullable<AccordionItemProps["variant"]>, string> = {
  default: "border-b border-muted-foreground/20 last:border-b-0",
  separated: "border-b-8 border-muted-foreground/10 last:border-b-0",
};

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn(itemVariantStyles[variant], className)}
      {...props}
    />
  ),
);
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps extends ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> {
  /** Size variant */
  size?: "default" | "lg";
}

const triggerSizeStyles: Record<NonNullable<AccordionTriggerProps["size"]>, string> = {
  default: "py-4",
  lg: "py-6",
};

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, size = "default", ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-md text-left text-sm font-medium transition-all outline-none hover:underline",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "disabled:pointer-events-none disabled:opacity-50",
          "[&[data-state=open]>svg]:rotate-180",
          triggerSizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps extends ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
> {
  /** Visual variant */
  variant?: "default" | "filled";
}

const contentVariantStyles: Record<NonNullable<AccordionContentProps["variant"]>, string> = {
  default: "pt-0 pb-4",
  filled: "mb-6 rounded-t bg-muted-background p-4",
};

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, variant = "default", ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all"
      {...props}
    >
      <div className={cn(contentVariantStyles[variant], className)}>{children}</div>
    </AccordionPrimitive.Content>
  ),
);
AccordionContent.displayName = "AccordionContent";
