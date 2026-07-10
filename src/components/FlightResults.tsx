import { motion } from "framer-motion"
import { ArrowRight, Plane } from "lucide-react"

import { cn } from "@/lib/utils"
import { cities } from "@/data/flights"
import type { FlightResult } from "@/data/flights"
import { useFlightSearch } from "@/context/FlightSearchContext"

function cityLabel(code: string) {
  const city = cities.find((c) => c.code === code)
  return city ? `${city.city} (${city.code})` : code
}

function SkeletonCard() {
  return (
    <div className="skeleton-pulse flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="size-11 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-3 w-28 rounded bg-muted" />
          <div className="h-3 w-20 rounded bg-muted" />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="h-3 w-16 rounded bg-muted" />
        <div className="h-3 w-16 rounded bg-muted" />
        <div className="h-3 w-16 rounded bg-muted" />
      </div>
      <div className="h-9 w-24 rounded-xl bg-muted" />
    </div>
  )
}

function FlightCard({
  flight,
  index,
  cheapest,
}: {
  flight: FlightResult
  index: number
  cheapest: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between",
        cheapest ? "border-accent/60 ring-1 ring-accent/30" : "border-border"
      )}
    >
      {cheapest && (
        <span className="absolute -top-3 left-5 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground shadow">
          Best Price
        </span>
      )}

      <div className="flex items-center gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Plane className="size-5 -rotate-45" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{flight.airline}</p>
          <p className="text-xs text-muted-foreground">
            Flight {flight.airlineCode}
            {flight.id.slice(-3).toUpperCase()}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <span>{flight.departTime}</span>
          <ArrowRight className="size-3.5 text-muted-foreground" />
          <span>{flight.arriveTime}</span>
        </div>
        <div className="text-muted-foreground">{flight.duration}</div>
        <div
          className={cn(
            "font-medium",
            flight.stops === 0 ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
          )}
        >
          {flight.stopLabel}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
        <p className="text-2xl font-extrabold text-primary">${flight.price}</p>
        <button
          type="button"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          Select
        </button>
      </div>
    </motion.div>
  )
}

export function FlightResults() {
  const { hasSearched, isLoading, results, form } = useFlightSearch()

  return (
    <section
      id="results"
      className={cn(
        "scroll-mt-24 bg-background px-4 transition-all sm:px-6 lg:px-8",
        hasSearched ? "py-12 sm:py-16" : "py-0"
      )}
    >
      {hasSearched && (
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {isLoading ? "Searching flights…" : `${results.length} flights found`}
            </h2>
            {!isLoading && form.fromCode && form.toCode && (
              <p className="text-sm text-muted-foreground">
                {cityLabel(form.fromCode)} <ArrowRight className="mx-1 inline size-3" />{" "}
                {cityLabel(form.toCode)} · Sorted by price
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
              : results.map((flight, i) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    index={i}
                    cheapest={i === 0}
                  />
                ))}
          </div>
        </div>
      )}
    </section>
  )
}
