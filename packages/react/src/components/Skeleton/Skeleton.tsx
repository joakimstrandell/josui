import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@josui/core-web";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-muted-background animate-pulse rounded-md", className)}
      {...props}
    />
  ),
);

Skeleton.displayName = "Skeleton";
