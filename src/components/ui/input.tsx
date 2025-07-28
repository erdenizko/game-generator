import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-md border border-slate-400/20 bg-slate-50 px-4 py-3 text-base placeholder:text-gray-400 transition-all duration-200",
        "hover:border-slate-600/50 focus:border-slate-600/50 focus:outline-none focus:ring-2",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-800/30",
        "aria-invalid:border-red-500/50 aria-invalid:focus:border-red-500/50 aria-invalid:focus:ring-red-500/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
