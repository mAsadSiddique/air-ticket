import React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type TestimonialItem = {
  text: string
  image: string
  name: string
  role: string
}

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 10,
}: {
  className?: string
  testimonials: TestimonialItem[]
  duration?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        animate={reduceMotion ? undefined : { translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[0, 1].map((copy) => (
          <React.Fragment key={copy}>
            {testimonials.map((item) => (
              <article
                key={`${copy}-${item.name}`}
                className="w-full max-w-xs rounded-3xl border border-border bg-card p-8 shadow-lg shadow-primary/10"
              >
                <p className="text-sm leading-relaxed text-foreground/90">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    width={40}
                    height={40}
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="size-10 rounded-full object-cover ring-2 ring-primary/10"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-5 tracking-tight text-foreground">
                      {item.name}
                    </span>
                    <span className="text-sm leading-5 tracking-tight text-muted-foreground">
                      {item.role}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
