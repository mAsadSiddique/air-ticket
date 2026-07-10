import { useRef, useState, useCallback, useEffect } from "react"
import { ArrowLeft, ArrowRight, MapPin, Plane, Star } from "lucide-react"
import { motion, useMotionValue, animate } from "motion/react"

import { cn } from "@/lib/utils"
import { destinations } from "@/data/destinations"
import type { Destination } from "@/data/destinations"

const DESKTOP_CARD_W = 320
const GAP_DESKTOP = 20
const GAP_MOBILE = 16
const MOBILE_BREAKPOINT = 640

// ─── Card ────────────────────────────────────────────────────────────────────
function DestinationCard({
  destination,
  onClick,
  compact,
}: {
  destination: Destination
  onClick?: () => void
  compact?: boolean
}) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group relative w-full shrink-0 cursor-pointer overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/8 transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/20",
        compact ? "h-[22rem]" : "h-[26rem]"
      )}
    >
      <div className={cn("absolute inset-0 bg-linear-to-br", destination.gradient)} />

      <img
        src={destination.image}
        alt={`${destination.city}, ${destination.country}`}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/15 to-transparent" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <span className="rounded-lg bg-white/15 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white ring-1 ring-white/25 backdrop-blur-md">
          {destination.code}
        </span>
        {destination.tag && (
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-primary shadow-sm">
            {destination.tag}
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-1.5 text-white/80">
          <MapPin className="size-3.5" />
          <span className="text-xs font-medium">{destination.country}</span>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md">
            <Star className="size-3 fill-amber-400 text-amber-400" />
            {destination.rating}
          </span>
        </div>

        <h3 className="text-xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-2xl">
          {destination.city}
        </h3>

        <div className="mt-3 flex items-end justify-between sm:mt-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/60">
              from
            </p>
            <p className="text-lg font-extrabold text-white sm:text-xl">
              ${destination.priceFrom}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-md transition-all duration-300 group-hover:gap-2.5 group-hover:bg-primary group-hover:text-primary-foreground sm:px-4 sm:py-2">
            Book now
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </article>
  )
}

type CarouselLayout = {
  cardW: number
  gap: number
  step: number
  isMobile: boolean
}

function measureCarouselLayout(width: number): CarouselLayout {
  const isMobile = width < MOBILE_BREAKPOINT
  const gap = isMobile ? GAP_MOBILE : GAP_DESKTOP
  const cardW = isMobile ? width : DESKTOP_CARD_W

  return { cardW, gap, step: cardW + gap, isMobile }
}

export function Destinations() {
  const total = destinations.length
  const maxIdx = total - 1

  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [layout, setLayout] = useState<CarouselLayout>(() =>
    measureCarouselLayout(
      typeof window !== "undefined" ? window.innerWidth - 32 : DESKTOP_CARD_W
    )
  )

  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef(0)
  const x = useMotionValue(0)

  useEffect(() => {
    currentRef.current = current
  }, [current])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const update = () => {
      setLayout(measureCarouselLayout(viewport.clientWidth))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  // Re-sync position only when layout changes (resize), not on every slide
  useEffect(() => {
    x.set(-currentRef.current * layout.step)
  }, [layout.step, x])

  const goTo = useCallback(
    (idx: number, instant = false) => {
      const clamped = Math.max(0, Math.min(idx, maxIdx))
      setCurrent(clamped)
      const target = -clamped * layout.step

      if (instant) {
        x.set(target)
        return
      }

      animate(x, target, {
        type: "tween",
        duration: 0.45,
        ease: [0.32, 0.72, 0, 1],
      })
    },
    [layout.step, maxIdx, x]
  )

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [next, prev])

  const navButtonClass = (disabled: boolean, side: "left" | "right") =>
    cn(
      "absolute top-1/2 z-20 flex size-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all duration-200",
      side === "left" ? "left-2 sm:left-2 lg:left-3" : "right-2 sm:right-2 lg:right-3",
      disabled
        ? "pointer-events-none border-border/50 bg-background/50 text-muted-foreground/30 opacity-0"
        : "border-border/70 bg-background/95 text-foreground shadow-xl active:scale-95 sm:bg-background/90 sm:hover:scale-105 sm:hover:border-primary/50 sm:hover:bg-background sm:hover:text-primary"
    )

  return (
    <section
      id="destinations"
      className="scroll-mt-24 bg-background py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Plane className="size-3.5 -rotate-45" />
            Popular Destinations
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Where will you fly next?
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Hand-picked routes with the best fares this month — book early and save
            more.
          </p>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div
            ref={viewportRef}
            className="relative min-w-0 overflow-hidden"
          >
            <button
              type="button"
              onClick={prev}
              disabled={current === 0}
              aria-label="Previous destination"
              className={navButtonClass(current === 0, "left")}
            >
              <ArrowLeft className="size-4" />
            </button>

            <button
              type="button"
              onClick={next}
              disabled={current === maxIdx}
              aria-label="Next destination"
              className={navButtonClass(current === maxIdx, "right")}
            >
              <ArrowRight className="size-4" />
            </button>

            <motion.div
              ref={trackRef}
              className="flex touch-pan-y"
              style={{ x, gap: layout.gap }}
              drag="x"
              dragConstraints={{ left: -maxIdx * layout.step, right: 0 }}
              dragElastic={layout.isMobile ? 0.05 : 0.08}
              dragMomentum={false}
              onDragStart={() => setDragging(true)}
              onDragEnd={(_, info) => {
                setDragging(false)
                const offset = info.offset.x
                const velocity = info.velocity.x
                const threshold = layout.isMobile ? 40 : 50
                const velocityThreshold = layout.isMobile ? 250 : 300

                if (offset < -threshold || velocity < -velocityThreshold) {
                  goTo(current + 1)
                } else if (offset > threshold || velocity > velocityThreshold) {
                  goTo(current - 1)
                } else {
                  goTo(current)
                }
              }}
            >
              {destinations.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  style={{ width: layout.cardW }}
                  animate={{
                    scale: !layout.isMobile && i !== current ? 0.97 : 1,
                    opacity:
                      !layout.isMobile && Math.abs(i - current) > 2 ? 0.55 : 1,
                  }}
                  transition={{
                    type: "tween",
                    duration: 0.45,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="shrink-0"
                >
                  <DestinationCard
                    destination={dest}
                    compact={layout.isMobile}
                    onClick={() => !dragging && goTo(i)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
          {destinations.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className={cn(
                "rounded-full transition-all duration-300",
                i === current
                  ? "h-2 w-6 bg-primary sm:h-2.5 sm:w-7"
                  : "size-1.5 bg-border hover:bg-primary/40 sm:size-2"
              )}
            />
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground sm:hidden">
          Swipe or tap arrows to explore
        </p>
      </div>
    </section>
  )
}
