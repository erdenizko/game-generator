import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-pink-500 to-orange-500 text-slate-50 border-2 border-transparent [&>*]:text-slate-50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 focus-visible:ring-gray-400 shadow-sm hover:shadow-md",
        destructive:
          "border-2 border-destructive bg-transparent text-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "bg-transparent text-slate-500 border-2 border-slate-500 [&>*]:text-slate-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 focus-visible:ring-gray-400 shadow-sm hover:shadow-md",
        secondary:
          "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-600 border border-gray-700",
        ghost:
          "text-gray-300 hover:text-white hover:bg-gray-800/50 focus-visible:ring-gray-600",
        link: "text-primary underline-offset-4 hover:underline",
        landingPrimary: "bg-white text-black hover:bg-gray-100 focus-visible:ring-gray-400 shadow-sm hover:shadow-md py-4 px-8",
      },
      size: {
        landingPrimary: "h-14 px-8 py-3 has-[>svg]:px-3 text-2xl",
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4 text-lg",
        icon: "size-9",
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
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
