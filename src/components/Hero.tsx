import { Globe2, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { AuroraText } from "@/components/ui/aurora-text"
import { DotPattern } from "@/components/ui/dot-pattern"
import { RetroGrid } from "@/components/ui/retro-grid"
import { TextAnimate } from "@/components/ui/text-animate"
import { FlightSearchCard } from "@/components/FlightSearchCard"

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Best price guarantee" },
  { icon: Zap, label: "Instant e-tickets" },
  { icon: Globe2, label: "190+ destinations" },
]

function TrustItems({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-3",
        className
      )}
    >
      {TRUST_ITEMS.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-2 text-sm font-medium text-foreground/80"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-14 pt-24 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-br from-primary/8 via-background to-background dark:from-primary/15 dark:via-background dark:to-background"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 size-112 rounded-full bg-primary/12 blur-[100px] dark:bg-primary/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 size-80 rounded-full bg-accent/10 blur-[90px] dark:bg-accent/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <DotPattern
        className="mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)] opacity-35 dark:opacity-20"
        width={20}
        height={20}
        cr={1}
      />

      <RetroGrid
        className="opacity-[0.18] dark:opacity-10"
        lightLineColor="hsl(var(--primary) / 0.3)"
        darkLineColor="hsl(var(--primary) / 0.4)"
        angle={62}
        cellSize={48}
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Headline block */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/60 px-4 py-2 text-xs font-medium text-primary shadow-sm backdrop-blur-md sm:text-sm"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="size-3.5" />
            </span>
            Trusted by 850K+ travelers worldwide
          </motion.div>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Discover your next{" "}
            <AuroraText
              colors={["#1e40af", "#2563eb", "#d97706", "#1e3a8a"]}
              speed={0.8}
            >
              adventure
            </AuroraText>
            <span className="mt-1 block text-foreground/90">
              at unbeatable fares
            </span>
          </h1>

          <TextAnimate
            as="p"
            by="word"
            animation="fadeIn"
            duration={0.5}
            delay={0.2}
            once
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Search hundreds of airlines, compare real-time fares, and book your
            perfect flight in minutes — no hidden fees, no hassle.
          </TextAnimate>

          <TrustItems className="mt-8 hidden md:flex" />
        </div>

        {/* Search card */}
        <motion.div
          id="search"
          className="relative mx-auto mt-8 w-full max-w-6xl scroll-mt-28 sm:mt-10 lg:mt-12 lg:scroll-mt-32"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <FlightSearchCard />
        </motion.div>

        <TrustItems className="mt-6 md:hidden" />
      </div>
    </section>
  )
}
