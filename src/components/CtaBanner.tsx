import { ArrowRight, Globe2, Plane, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { motion } from "motion/react"

import { BlurFade } from "@/components/ui/blur-fade"
import { DotPattern } from "@/components/ui/dot-pattern"
import { Particles } from "@/components/ui/particles"
import { ShineBorder } from "@/components/ui/shine-border"
import { ShimmerButton } from "@/components/ui/shimmer-button"

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "Best price guarantee" },
  { icon: Zap, label: "Instant e-tickets" },
  { icon: Globe2, label: "190+ destinations" },
]

export function CtaBanner() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden bg-background py-14 sm:py-20">
      {/* Ambient background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background"
      />
      <DotPattern
        className="mask-[radial-gradient(ellipse_80%_60%_at_50%_50%,#000_35%,transparent_100%)] opacity-30 dark:opacity-20"
        width={20}
        height={20}
        cr={1}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-144 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <BlurFade inView direction="up">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary to-blue-900 p-px shadow-2xl shadow-primary/25">
            <ShineBorder
              shineColor={["#f59e0b", "#60a5fa", "#ffffff", "#f59e0b"]}
              duration={12}
              borderWidth={1}
            />

            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] px-6 py-10 sm:px-10 sm:py-12">
              <Particles
                className="absolute inset-0 opacity-40"
                quantity={50}
                color="#ffffff"
                ease={70}
                staticity={50}
              />

              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-accent/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-white/10 blur-3xl"
              />

              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                  <Sparkles className="size-3.5 text-accent" />
                  Start your journey
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Ready for your{" "}
                  <span className="text-accent">next trip?</span>
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  Join 850K+ travelers who trust Flight Air for effortless,
                  affordable flight booking — anywhere in the world.
                </p>

                <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  {TRUST_POINTS.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-2 text-sm font-medium text-white/85"
                    >
                      <span className="flex size-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                        <Icon className="size-4 text-accent" />
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <ShimmerButton
                    background="hsl(var(--accent))"
                    shimmerColor="#ffffff"
                    className="h-12 w-full px-8 text-base font-bold text-accent-foreground sm:w-auto"
                    onClick={() => scrollTo("search")}
                  >
                    <span className="flex items-center gap-2">
                      <Plane className="size-4 -rotate-45" />
                      Book your flight
                    </span>
                  </ShimmerButton>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollTo("destinations")}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 sm:w-auto"
                  >
                    Explore destinations
                    <ArrowRight className="size-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
