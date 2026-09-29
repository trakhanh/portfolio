import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[background,color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none select-none focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /* Primary CTA — solid signal cyan, dark ink, 6px radius */
        default:
          "bg-signal text-abyss uppercase tracking-[0.08em] text-[13px] shadow-[0_0_0_1px_rgba(62,230,212,0.4),0_8px_24px_-8px_rgba(62,230,212,0.55)] hover:bg-signal-hover hover:-translate-y-px active:translate-y-0",
        /* Frosted glass secondary */
        glass:
          "border border-mist/15 bg-mist/[0.06] text-mist uppercase tracking-[0.08em] text-[13px] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-mist/[0.11] hover:border-mist/30",
        secondary: "bg-kelp text-white hover:bg-[#11283a]",
        outline: "border border-mist/20 bg-transparent text-mist hover:bg-mist/[0.06] hover:border-mist/35",
        ghost: "text-silver hover:text-white hover:bg-mist/[0.06]",
        link: "text-mist underline-offset-4 hover:underline",
        destructive: "bg-destructive text-abyss hover:bg-destructive/90",
      },
      size: {
        default: "h-11 px-5",
        xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-3.5 text-xs",
        lg: "h-13 px-7",
        icon: "size-10",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        /* Arrow trigger: 32x32 translucent tile */
        "icon-sm": "size-8 bg-[rgba(20,56,76,0.5)] text-white hover:bg-[rgba(20,56,76,0.85)]",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
