import { Toaster as SonnerToaster, type ToasterProps as SonnerToasterProps } from "sonner";

export type ToasterProps = SonnerToasterProps;

export const Toaster = ({ ...props }: ToasterProps) => (
  <SonnerToaster
    className="toaster group"
    toastOptions={{
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        description: "group-[.toast]:text-muted-foreground",
        actionButton: "group-[.toast]:bg-primary-500 group-[.toast]:text-white",
        cancelButton: "group-[.toast]:bg-muted-background group-[.toast]:text-muted-foreground",
      },
    }}
    {...props}
  />
);

Toaster.displayName = "Toaster";
