import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-36 w-full min-w-0 resize-y rounded-xl border border-input bg-background px-3.5 py-3 text-sm text-foreground shadow-xs transition-colors outline-none placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-[3px] focus-visible:ring-primary/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
