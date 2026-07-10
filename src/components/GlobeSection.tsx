import { useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  Globe2,
  MapPin,
  Plane,
  Users,
} from "lucide-react"
import type { COBEOptions } from "cobe"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Globe } from "@/components/ui/globe"
import { NumberTicker } from "@/components/ui/number-ticker"
import { BlurFade } from "@/components/ui/blur-fade"
import { DotPattern } from "@/components/ui/dot-pattern"

const HUBS = [
  { city: "Paris", code: "CDG", top: "18%", left: "48%" },
  { city: "Dubai", code: "DXB", top: "42%", left: "62%" },
  { city: "Tokyo", code: "HND", top: "34%", left: "78%" },
  { city: "New York", code: "JFK", top: "36%", left: "22%" },
  { city: "Sydney", code: "SYD", top: "72%", left: "82%" },
]

const STATS = [
  {
    label: "Destinations",
    value: 190,
    suffix: "+",
    icon: Globe2,
  },
  {
    label: "Airline partners",
    value: 120,
    suffix: "+",
    icon: Plane,
  },
  {
    label: "Countries served",
    value: 85,
    suffix: "+",
    icon: MapPin,
  },
  {
    label: "Happy travelers",
    value: 850,
    suffix: "K+",
    icon: Users,
  },
] as const

function useIsDark() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"))
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  return isDark
}

export function GlobeSection() {
  const isDark = useIsDark()

  const globeConfig = useMemo<COBEOptions>(
    () => ({
      width: 800,
      height: 800,
      onRender: () => {},
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.28,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 0.55 : 0.45,
      mapSamples: 16000,
      mapBrightness: isDark ? 1.4 : 1.15,
      baseColor: isDark ? [0.12, 0.18, 0.32] : [0.92, 0.95, 1],
      markerColor: [251 / 255, 146 / 255, 60 / 255],
      glowColor: isDark ? [0.2, 0.35, 0.65] : [0.75, 0.85, 1],
      markers: [
        { location: [48.8566, 2.3522], size: 0.08 },
        { location: [35.6762, 139.6503], size: 0.08 },
        { location: [40.7128, -74.006], size: 0.09 },
        { location: [25.2048, 55.2708], size: 0.08 },
        { location: [-33.8688, 151.2093], size: 0.07 },
        { location: [51.5074, -0.1278], size: 0.07 },
        { location: [1.3521, 103.8198], size: 0.06 },
        { location: [-23.5505, -46.6333], size: 0.06 },
        { location: [41.9028, 12.4964], size: 0.06 },
        { location: [-8.4095, 115.1889], size: 0.05 },
      ],
    }),
    [isDark]
  )

  return (
    <section className="relative overflow-hidden bg-background py-14 sm:py-20">
      {/* Ambient background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-br from-primary/8 via-background to-background dark:from-primary/15"
      />
      <DotPattern
        className="mask-[radial-gradient(ellipse_70%_60%_at_50%_50%,#000_40%,transparent_100%)] opacity-25 dark:opacity-15"
        width={22}
        height={22}
        cr={1}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 size-96 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-accent/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Copy + stats */}
          <BlurFade inView direction="up" className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Globe2 className="size-3.5" />
              Global reach
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              We fly you to{" "}
              <span className="text-primary">
                <NumberTicker value={190} className="text-primary" />
                +
              </span>{" "}
              destinations worldwide
            </h2>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              From bustling capitals to hidden island escapes — our airline
              partners connect you to every corner of the globe with real-time
              fares and instant e-tickets.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map(({ label, value, suffix, icon: Icon }, i) => (
                <BlurFade
                  key={label}
                  inView
                  delay={0.1 + i * 0.08}
                  className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-4" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {label}
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-extrabold tabular-nums text-foreground">
                    <NumberTicker value={value} className="text-foreground" />
                    {suffix}
                  </p>
                </BlurFade>
              ))}
            </div>

            <a
              href="#destinations"
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById("destinations")
                  ?.scrollIntoView({ behavior: "smooth" })
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-primary/30"
            >
              Explore destinations
              <ArrowRight className="size-4" />
            </a>
          </BlurFade>

          {/* Globe stage */}
          <BlurFade
            inView
            direction="up"
            delay={0.15}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="relative mx-auto aspect-square w-full max-w-md sm:max-w-lg">
              {/* Glow halo */}
              <div
                aria-hidden
                className="absolute inset-[12%] rounded-full bg-linear-to-br from-primary/20 via-primary/5 to-accent/15 blur-3xl dark:from-primary/30 dark:to-accent/10"
              />
              <div
                aria-hidden
                className="absolute inset-[8%] rounded-full ring-1 ring-primary/10 dark:ring-white/10"
              />

              <Globe className="relative z-10" config={globeConfig} />

              {/* Floating hub chips */}
              {HUBS.map((hub, i) => (
                <motion.div
                  key={hub.code}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className={cn(
                    "pointer-events-none absolute z-20 hidden sm:block"
                  )}
                  style={{ top: hub.top, left: hub.left }}
                >
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3 + i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-background/80"
                  >
                    <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                      {hub.code}
                    </span>
                    {hub.city}
                  </motion.span>
                </motion.div>
              ))}

              {/* Drag hint */}
              <p className="absolute inset-x-0 bottom-0 z-20 text-center text-xs font-medium text-muted-foreground">
                Drag to explore the globe
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
