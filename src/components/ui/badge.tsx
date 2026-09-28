import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium tracking-[0.025em] uppercase rounded-full transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[#8052ff]/15 text-[#8052ff] border border-[#8052ff]/30",
        saffron:
          "bg-[#ffb829]/15 text-[#ffb829] border border-[#ffb829]/30",
        verdant:
          "bg-[#15846e]/20 text-[#2dd4bf] border border-[#15846e]/40",
        muted:
          "bg-white/[0.04] text-[#9a9a9a] border border-white/10",
        outline:
          "border border-white/15 text-white/90",
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
