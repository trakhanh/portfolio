import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono text-sm uppercase tracking-wider font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyber-accent disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-cyber-accent text-black hover:bg-[#33ff9f] hover:shadow-[0_0_15px_rgba(0,255,136,0.6)] cyber-chamfer-sm active:translate-y-px",
        outline:
          "border border-cyber-accent/50 bg-cyber-card/80 text-cyber-accent hover:border-cyber-accent hover:bg-cyber-accent/10 hover:shadow-[0_0_12px_rgba(0,255,136,0.3)] cyber-chamfer-sm",
        secondary:
          "border border-cyber-border bg-cyber-muted text-cyber-fg hover:border-cyber-accent-cyan/60 hover:text-white cyber-chamfer-sm",
        ghost:
          "text-cyber-muted-fg hover:text-cyber-accent hover:bg-cyber-accent/5",
        pink:
          "border border-cyber-pink/60 bg-cyber-pink/10 text-cyber-pink hover:bg-cyber-pink/20 hover:shadow-[0_0_12px_rgba(255,0,255,0.4)] cyber-chamfer-sm",
        cyan:
          "border border-cyber-cyan/60 bg-cyber-cyan/10 text-cyber-cyan hover:bg-cyber-cyan/20 hover:shadow-[0_0_12px_rgba(0,212,255,0.4)] cyber-chamfer-sm",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-13 px-7 text-base tracking-widest",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
