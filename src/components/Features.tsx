import { useState, useEffect } from "react"
import { motion } from "motion/react"
import {
  BadgeCheck,
  Headset,
  RefreshCcw,
  Ticket,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { BentoGrid } from "@/components/ui/bento-grid"
import { MagicCard } from "@/components/ui/magic-card"
import { BlurFade } from "@/components/ui/blur-fade"

// Subcomponent 1: Best Price Guarantee Widget
function PriceGuaranteeWidget() {
  return (
    <div className="relative mt-4 w-full select-none overflow-hidden rounded-xl border border-border bg-muted/20 p-4">
      {/* Savings ribbon */}
      <div className="absolute right-0 top-0">
        <div className="rounded-bl-xl rounded-tr-xl bg-emerald-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow">
          Save 16%
        </div>
      </div>

      {/* Price comparison row */}
      <div className="flex items-center gap-3">
        {/* Others */}
        <div className="flex flex-col">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/60">Others charge</span>
          <span className="mt-0.5 text-2xl font-extrabold text-muted-foreground/40 line-through">
            $299
          </span>
        </div>

        {/* Arrow separator */}
        <div className="flex shrink-0 items-center text-muted-foreground/25">
          <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
            <path d="M1 5H19M19 5L15 1.5M19 5L15 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Our price */}
        <div className="flex flex-col">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-primary">You pay</span>
          <motion.span
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-0.5 text-3xl font-black text-foreground"
          >
            $249
          </motion.span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-border/50" />

      {/* Trust row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
          <BadgeCheck className="size-3.5 shrink-0" />
          Best price guaranteed
        </div>
        <div className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[9px] font-semibold text-primary">
          <span className="size-1.5 animate-pulse rounded-full bg-primary/60" />
          Verified live
        </div>
      </div>
    </div>
  )
}

// Subcomponent 2: 24/7 Support Live Chat Widget
function SupportWidget() {
  const [messages, setMessages] = useState<number[]>([1])

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessages([1, 2])
    }, 1500)

    // loop it
    const interval = setInterval(() => {
      setMessages([])
      setTimeout(() => setMessages([1]), 500)
      setTimeout(() => setMessages([1, 2]), 2000)
    }, 8000)

    return () => {
      clearTimeout(timer1)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="mt-4 flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-3 text-xs h-32 justify-end overflow-hidden select-none">
      {messages.includes(1) && (
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-2 max-w-[85%]"
        >
          <div className="relative flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Headset className="size-3.5" />
            <span className="absolute bottom-0 right-0 size-1.5 rounded-full bg-emerald-500 ring-1 ring-background animate-pulse" />
          </div>
          <div className="rounded-xl rounded-tl-none bg-card border border-border px-2.5 py-1.5 text-foreground/90 font-medium">
            Flight changed with $0 fee! ✈️
          </div>
        </motion.div>
      )}

      {messages.includes(2) && (
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-2 max-w-[85%] self-end flex-row-reverse"
        >
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent font-bold text-[9px]">
            US
          </div>
          <div className="rounded-xl rounded-tr-none bg-primary text-primary-foreground px-2.5 py-1.5 font-medium shadow-xs">
            Wow, thank you! 🙌
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Subcomponent 3: Instant E-Tickets Boarding Pass Widget
function ECardWidget() {
  return (
    <div className="relative mt-4 flex h-32 w-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-muted/20 p-3 select-none">

      <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-bold text-primary">Boarding Pass</span>
          <span className="text-xs font-semibold text-muted-foreground mt-0.5">Seat 14A</span>
        </div>
        <Ticket className="size-4 text-muted-foreground/60" />
      </div>

      <div className="flex items-center justify-between my-1">
        <div className="flex flex-col">
          <span className="text-lg font-black text-foreground">JFK</span>
          <span className="text-[9px] text-muted-foreground">New York</span>
        </div>
        <div className="flex flex-col items-center flex-1 px-3">
          <span className="text-[9px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">Non-stop</span>
          <div className="h-[1px] w-full border-t border-dashed border-border mt-1" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-lg font-black text-foreground">LHR</span>
          <span className="text-[9px] text-muted-foreground">London</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/40 pt-1.5 text-[9px] text-muted-foreground">
        <span>Gate: A12</span>
        <span>Class: Economy</span>
        <span className="text-emerald-500 font-bold flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Sent via SMS
        </span>
      </div>
    </div>
  )
}

// Subcomponent 4: Flexible Cancellation timeline
function CancellationWidget() {
  const [activeStep, setActiveStep] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 3 ? 1 : prev + 1))
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    { label: "Request sent",   sub: "One tap cancel",    icon: "✦" },
    { label: "Zero fee applied", sub: "No charges",        icon: "⊘" },
    { label: "Refund complete", sub: "100% back",         icon: "✓" },
  ]

  return (
    <div className="mt-4 w-full select-none rounded-xl border border-border bg-muted/20 p-3">
      <div className="flex items-center justify-between gap-1">
        {steps.map((step, i) => {
          const idx = i + 1
          const done    = activeStep > idx
          const current = activeStep === idx
          const pending = activeStep < idx

          return (
            <div key={step.label} className="flex flex-1 items-center">
              {/* Step card */}
              <div
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-lg border px-2 py-2 transition-all duration-500",
                  done    && "border-emerald-500/30 bg-emerald-500/5",
                  current && "border-primary/25 bg-primary/5 shadow-sm",
                  pending && "border-border bg-background/40"
                )}
              >
                {/* Icon circle */}
                <div
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full border text-xs font-bold transition-all duration-500",
                    done    && "border-emerald-500 bg-emerald-500 text-white",
                    current && "border-primary bg-primary/10 text-primary",
                    pending && "border-border bg-muted/40 text-muted-foreground/40"
                  )}
                >
                  {done ? "✓" : step.icon}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "text-center text-[9px] font-semibold leading-tight transition-colors duration-300",
                    done    && "text-emerald-600 dark:text-emerald-400",
                    current && "text-foreground",
                    pending && "text-muted-foreground/50"
                  )}
                >
                  {step.label}
                </span>

                {/* Sub label */}
                <span
                  className={cn(
                    "text-[8px] transition-colors duration-300",
                    done    && "text-emerald-500/80",
                    current && "text-primary/70",
                    pending && "text-muted-foreground/35"
                  )}
                >
                  {step.sub}
                </span>
              </div>

              {/* Connector arrow — not after last item */}
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-1 shrink-0 text-[10px] transition-colors duration-500",
                    activeStep > idx ? "text-emerald-500" : "text-border"
                  )}
                >
                  →
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom status bar */}
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[9px] text-muted-foreground/60">
          Step {activeStep} of 3
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[9px] font-semibold transition-all duration-500",
            activeStep === 3
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-primary/8 text-primary"
          )}
        >
          {activeStep === 3 ? "Refund complete ✓" : "Processing…"}
        </span>
      </div>
    </div>
  )
}

export function Features() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const gradientColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(30, 58, 138, 0.04)"
  const gradientFrom = isDark ? "rgba(221, 163, 68, 0.25)" : "rgba(30, 58, 138, 0.15)"
  const gradientTo = isDark ? "rgba(59, 130, 246, 0.25)" : "rgba(227, 160, 33, 0.15)"

  const cells = [
    {
      name: "Best Price Guarantee",
      description:
        "Find a lower fare elsewhere within 24 hours and we'll refund the difference — no questions asked.",
      Icon: BadgeCheck,
      className: "sm:col-span-2",
      widget: <PriceGuaranteeWidget />,
    },
    {
      name: "24/7 Support",
      description: "Real humans ready to help before, during, and after your trip.",
      Icon: Headset,
      className: "sm:col-span-1",
      widget: <SupportWidget />,
    },
    {
      name: "Instant E-Tickets",
      description: "Your boarding pass lands in your inbox the moment you book.",
      Icon: Ticket,
      className: "sm:col-span-1",
      widget: <ECardWidget />,
    },
    {
      name: "Flexible Cancellation",
      description: "Plans change. Cancel or rebook most fares with zero stress.",
      Icon: RefreshCcw,
      className: "sm:col-span-2",
      widget: <CancellationWidget />,
    },
  ]

  return (
    <section id="features" className="scroll-mt-24 bg-secondary/40 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <BadgeCheck className="size-3.5" />
            Why Book With Us
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Travel smarter, worry less
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Transparent pricing, flexible fares, and support when you need it — every step of the way.
          </p>
        </div>

        {/* Bento Grid of core feature cards */}
        <BentoGrid className="mt-10 grid-cols-1 auto-rows-[21rem] gap-4 sm:grid-cols-3">
          {cells.map((cell, index) => (
            <BlurFade
              key={cell.name}
              inView
              direction="up"
              delay={index * 0.1}
              className={cn(cell.className)}
            >
              <MagicCard
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border p-6 shadow-xs"
                gradientColor={gradientColor}
                gradientFrom={gradientFrom}
                gradientTo={gradientTo}
              >
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    <div className="relative flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <cell.Icon className="size-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-foreground">{cell.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {cell.description}
                    </p>
                  </div>
                  <div className="w-full">
                    {cell.widget}
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}


