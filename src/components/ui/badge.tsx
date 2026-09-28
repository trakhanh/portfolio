import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-cyber-accent/40 bg-cyber-accent/10 text-cyber-accent",
        outline:
          "border border-cyber-border bg-cyber-card/60 text-cyber-muted-fg",
        secondary:
          "border border-cyber-border-bright bg-cyber-muted text-cyber-fg",
        pink:
          "border border-cyber-pink/40 bg-cyber-pink/10 text-cyber-pink",
        cyan:
          "border border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
