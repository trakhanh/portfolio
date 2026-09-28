import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-[13px] tracking-[0.025em] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8052ff] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#8052ff] text-white hover:bg-[#9269ff] rounded-full shadow-[0_4px_20px_rgba(128,82,255,0.25)] hover:shadow-[0_4px_25px_rgba(128,82,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 uppercase",
        secondary:
          "bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] hover:border-white/20 rounded-full",
        ghost:
          "text-[#9a9a9a] hover:text-white bg-transparent hover:bg-transparent",
        outline:
          "border border-white/15 text-white hover:border-[#8052ff] hover:text-[#8052ff] rounded-full bg-transparent",
        saffron:
          "bg-[#ffb829] text-black font-semibold hover:bg-[#ffc54d] rounded-full uppercase",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-sm",
        icon: "h-10 w-10 p-0 rounded-full",
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
