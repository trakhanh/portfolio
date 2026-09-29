import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-md border px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-[color,border-color,background] focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "border-mist/10 bg-mist/[0.05] text-mist shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        secondary: "border-transparent bg-kelp text-mist",
        lavender: "border-orchid/25 bg-orchid/10 text-lavender",
        outline: "border-mist/20 text-silver",
        ghost: "border-transparent text-silver",
        link: "border-transparent text-mist underline-offset-4 [a&]:hover:underline",
        destructive: "border-transparent bg-destructive text-abyss",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
