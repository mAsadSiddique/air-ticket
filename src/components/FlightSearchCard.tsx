import { useState } from "react"
import {
  ArrowLeftRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  Minus,
  Plane,
  Plus,
  Search,
  Users,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { cities } from "@/data/flights"
import {
  normalizePassengers,
  totalPassengers,
  useFlightSearch,
  type PassengerCounts,
} from "@/context/FlightSearchContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Variant = "boxed" | "bar"

const labelClass =
  "block text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"

const fieldWrapClass = "flex w-full min-w-0 flex-col gap-1.5"

const boxedClass =
  "glass-field flex h-12 w-full items-center gap-2.5 rounded-xl px-3"

const boxedSelectTriggerClass =
  "h-12 w-full border-0 bg-transparent py-0 pl-[3.25rem] pr-1 shadow-none focus:ring-0 focus:ring-offset-0 [&>span]:min-w-0 [&>span]:flex-1 [&>span]:text-left"

function FieldIcon({
  children,
  iconClassName,
}: {
  children: React.ReactNode
  iconClassName?: string
}) {
  return (
    <span
      aria-hidden
      className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary"
    >
      <span className={cn("[&_svg]:size-4 [&_svg]:stroke-[2]", iconClassName)}>
        {children}
      </span>
    </span>
  )
}

const segmentClass =
  "group relative flex min-w-0 flex-col justify-center rounded-lg px-3.5 py-2.5 text-left transition-colors hover:bg-primary/[0.06] dark:hover:bg-white/[0.05]"

const barIconBadgeClass =
  "flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary lg:size-7 [&_svg]:block [&_svg]:size-4"

function FieldError({ message, bar }: { message?: string; bar?: boolean }) {
  if (!message) return null
  return (
    <p
      className={cn(
        "text-xs font-medium text-destructive",
        bar ? "absolute left-3.5 top-full mt-0.5" : "mt-1"
      )}
    >
      {message}
    </p>
  )
}

function CitySelect({
  label,
  value,
  onChange,
  excludeCode,
  error,
  icon,
  iconClassName,
  variant = "boxed",
  className,
}: {
  label: string
  value: string
  onChange: (code: string) => void
  excludeCode?: string
  error?: string
  icon: React.ReactNode
  iconClassName?: string
  variant?: Variant
  className?: string
}) {
  const availableCities = cities.filter((c) => c.code !== excludeCode)

  const items = (
    <SelectContent>
      {availableCities.map((c) => (
        <SelectItem key={c.code} value={c.code}>
          <span className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
              {c.code}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-semibold text-foreground">{c.city}</span>
              <span className="text-xs text-muted-foreground">{c.country}</span>
            </span>
          </span>
        </SelectItem>
      ))}
    </SelectContent>
  )

  const valueDisplay = (
    <SelectValue
      placeholder="Select city"
      className="min-w-0 flex-1 truncate text-left text-sm font-semibold leading-none data-[placeholder]:text-muted-foreground"
    >
      {value ? (
        <span className="flex min-w-0 items-center gap-1.5 truncate">
          <span className="truncate text-foreground">
            {cities.find((c) => c.code === value)?.city}
          </span>
          <span className="shrink-0 text-xs font-medium text-muted-foreground">
            ({value})
          </span>
        </span>
      ) : null}
    </SelectValue>
  )

  if (variant === "bar") {
    return (
      <div
        className={cn(
          segmentClass,
          error && "ring-1 ring-destructive/40",
          className
        )}
      >
        <label className={labelClass}>{label}</label>
        <div className="mt-1 flex items-center gap-2">
          <span className={barIconBadgeClass}>{icon}</span>
          <Select value={value || undefined} onValueChange={onChange}>
            <SelectTrigger
              aria-label={label}
              className="h-auto flex-1 border-0 bg-transparent px-0 py-0 text-sm font-semibold shadow-none focus:ring-0 focus:ring-offset-0"
            >
              {valueDisplay}
            </SelectTrigger>
            {items}
          </Select>
        </div>
        <FieldError message={error} bar />
      </div>
    )
  }

  return (
    <div className={cn(fieldWrapClass, className)}>
      {label ? <label className={labelClass}>{label}</label> : null}
      <div
        className={cn(
          boxedClass,
          "relative",
          error && "border-destructive/50 ring-1 ring-destructive/30"
        )}
      >
        <div className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2">
          <FieldIcon iconClassName={iconClassName}>{icon}</FieldIcon>
        </div>
        <div className="min-w-0 flex-1">
          <Select value={value || undefined} onValueChange={onChange}>
            <SelectTrigger
              aria-label={label || "City"}
              className={boxedSelectTriggerClass}
            >
              {valueDisplay}
            </SelectTrigger>
            {items}
          </Select>
        </div>
      </div>
      <FieldError message={error} />
    </div>
  )
}

function parseISODate(value: string): Date | undefined {
  if (!value) return undefined
  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return undefined
  return new Date(y, m - 1, d)
}

function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function DateField({
  label,
  value,
  onChange,
  min,
  error,
  variant = "boxed",
  className,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  min: string
  error?: string
  variant?: Variant
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const selected = parseISODate(value)
  const minDate = parseISODate(min)

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(toISODate(date))
      setOpen(false)
    }
  }

  const displayText = selected
    ? format(selected, "EEE, dd MMM yyyy")
    : "Select date"

  const trigger =
    variant === "bar" ? (
      <button
        type="button"
        className={cn(
          segmentClass,
          "w-full",
          error && "ring-1 ring-destructive/40"
        )}
      >
        <span className={labelClass}>{label}</span>
        <span className="mt-1 flex items-center gap-2">
          <span className={barIconBadgeClass}>
            <CalendarDays className="size-4" />
          </span>
          <span
            className={cn(
              "truncate text-sm font-semibold",
              selected ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {displayText}
          </span>
        </span>
      </button>
    ) : (
      <button
        type="button"
        className={cn(
          boxedClass,
          "w-full text-left",
          error && "border-destructive/50 ring-1 ring-destructive/30"
        )}
      >
        <FieldIcon>
          <CalendarDays />
        </FieldIcon>
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-sm font-semibold leading-none",
            selected ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {displayText}
        </span>
      </button>
    )

  const content = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="start" className="w-auto">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={selected ?? minDate}
          disabled={minDate ? { before: minDate } : undefined}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )

  if (variant === "bar") {
    return (
      <div className={cn("relative min-w-0", className)}>
        {content}
        <FieldError message={error} bar />
      </div>
    )
  }

  return (
    <div className={cn(fieldWrapClass, className)}>
      <label className={labelClass}>{label}</label>
      {content}
      <FieldError message={error} />
    </div>
  )
}

function PassengerSelector({
  value,
  onChange,
  variant = "boxed",
  className,
}: {
  value: PassengerCounts
  onChange: (next: PassengerCounts) => void
  variant?: Variant
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const counts = normalizePassengers(value)
  const total = totalPassengers(counts)

  const update = (key: keyof PassengerCounts, delta: number) => {
    const current = counts[key]
    const nextValue = current + delta
    if (!Number.isFinite(nextValue)) return

    const next = normalizePassengers({ ...counts, [key]: nextValue })

    if (key === "adults" && next.adults < 1) return
    if (key !== "adults" && next[key] < 0) return
    if (next.infants > next.adults) return
    if (totalPassengers(next) > 9) return

    onChange(next)
  }

  const rows: {
    key: keyof PassengerCounts
    label: string
    min: number
    maxDisabled: boolean
  }[] = [
    {
      key: "adults",
      label: "Adults [+12]",
      min: 1,
      maxDisabled: total >= 9,
    },
    {
      key: "children",
      label: "Children [2-12]",
      min: 0,
      maxDisabled: total >= 9,
    },
    {
      key: "infants",
      label: "Infants [0-2]",
      min: 0,
      maxDisabled: total >= 9 || counts.infants >= counts.adults,
    },
  ]

  const trigger =
    variant === "bar" ? (
      <button type="button" className={cn(segmentClass, "w-full")}>
        <span className={labelClass}>Passengers</span>
        <span className="mt-1 flex items-center gap-2">
          <span className={barIconBadgeClass}>
            <Users className="size-4" />
          </span>
          <span className="truncate text-sm font-semibold text-foreground">
            {total} {total === 1 ? "Traveler" : "Travelers"}
          </span>
          <ChevronDown className="ml-auto size-3.5 text-muted-foreground/70" />
        </span>
      </button>
    ) : (
      <button
        type="button"
        className={cn(boxedClass, "w-full text-left")}
      >
        <FieldIcon>
          <Users />
        </FieldIcon>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold leading-none text-foreground">
          {total} {total === 1 ? "Traveler" : "Travelers"}
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground/70" />
      </button>
    )

  const content = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="end" className="w-[240px] p-4">
        <div className="flex flex-col gap-4">
          {rows.map(({ key, label, min, maxDisabled }) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-foreground">
                {label}
              </span>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  aria-label={`Decrease ${key}`}
                  disabled={counts[key] <= min}
                  onClick={() => update(key, -1)}
                  className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/15 disabled:opacity-30"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="flex h-9 w-11 items-center justify-center rounded-lg border border-primary/25 bg-background text-sm font-bold text-foreground tabular-nums">
                  {counts[key]}
                </span>
                <button
                  type="button"
                  aria-label={`Increase ${key}`}
                  disabled={maxDisabled}
                  onClick={() => update(key, 1)}
                  className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/15 disabled:opacity-30"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )

  if (variant === "bar") {
    return <div className={cn("relative min-w-0", className)}>{content}</div>
  }

  return (
    <div className={cn(fieldWrapClass, className)}>
      <label className={labelClass}>Passengers</label>
      {content}
    </div>
  )
}

function SearchButton({
  onClick,
  isLoading,
  fullWidth,
  label,
}: {
  onClick: () => void
  isLoading: boolean
  fullWidth?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-br from-primary to-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:opacity-70",
        fullWidth ? "h-12 w-full text-base" : "h-12"
      )}
    >
      <Search className={cn("size-4", isLoading && "animate-pulse")} />
      {isLoading ? "Searching…" : label}
    </button>
  )
}

export function FlightSearchCard() {
  const { form, errors, isLoading, setField, swapCities, submitSearch } =
    useFlightSearch()
  const [swapping, setSwapping] = useState(false)
  const today = new Date().toISOString().split("T")[0]

  const handleSwap = () => {
    setSwapping(true)
    swapCities()
    window.setTimeout(() => setSwapping(false), 400)
  }

  const tripTypes = [
    { id: "roundtrip", label: "Round-trip" },
    { id: "oneway", label: "One-way" },
  ] as const

  return (
    <div className="glass-card relative w-full rounded-2xl p-4 sm:p-4">
      <div className="relative z-10 w-full">
        {/* Trip type */}
        <div className="mb-4 flex w-full items-center">
          <div className="glass-pill flex rounded-full p-1.5">
            {tripTypes.map(({ id, label }) => {
              const isActive = form.tripType === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setField("tripType", id)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200 sm:text-sm",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="trip-type-pill"
                      aria-hidden
                      className="tab-pill-active absolute inset-0 -z-10 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Desktop: connected search bar ── */}
        <div className="hidden lg:block">
          <div className="flex items-stretch gap-1 rounded-2xl border border-slate-200/80 bg-white/40 p-1.5 dark:border-white/10 dark:bg-white/3">
            <CitySelect
              label="From"
              value={form.fromCode}
              onChange={(v) => setField("fromCode", v)}
              excludeCode={form.toCode}
              error={errors.fromCode}
              icon={<Plane className="size-4" />}
              variant="bar"
              className="flex-1"
            />

            <div className="relative flex items-center">
              <span className="absolute left-1/2 top-1/2 h-9 w-px -translate-x-1/2 -translate-y-1/2 bg-slate-200/80 dark:bg-white/10" />
              <button
                type="button"
                aria-label="Swap origin and destination"
                onClick={handleSwap}
                className="relative z-10 flex size-9 items-center justify-center rounded-full border border-slate-200/80 bg-white text-primary shadow-sm transition-colors hover:border-primary/40 dark:border-white/10 dark:bg-slate-800"
              >
                <motion.span
                  animate={{ rotate: swapping ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex"
                >
                  <ArrowLeftRight className="size-4" />
                </motion.span>
              </button>
            </div>

            <CitySelect
              label="To"
              value={form.toCode}
              onChange={(v) => setField("toCode", v)}
              excludeCode={form.fromCode}
              error={errors.toCode}
              icon={<MapPin className="size-4" />}
              variant="bar"
              className="flex-1"
            />

            <span className="my-1.5 w-px shrink-0 bg-slate-200/80 dark:bg-white/10" />

            <DateField
              label="Departure"
              value={form.departDate}
              onChange={(v) => setField("departDate", v)}
              min={today}
              error={errors.departDate}
              variant="bar"
              className="min-w-34 flex-1"
            />

            <AnimatePresence initial={false} mode="popLayout">
              {form.tripType === "roundtrip" ? (
                <motion.div
                  key="return-date-desktop"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex min-w-0 items-stretch overflow-hidden"
                >
                  <span className="my-1.5 w-px shrink-0 bg-slate-200/80 dark:bg-white/10" />
                  <DateField
                    label="Return"
                    value={form.returnDate}
                    onChange={(v) => setField("returnDate", v)}
                    min={form.departDate || today}
                    error={errors.returnDate}
                    variant="bar"
                    className="min-w-34"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <span className="my-1.5 w-px shrink-0 bg-slate-200/80 dark:bg-white/10" />

            <PassengerSelector
              value={form.passengers}
              onChange={(next) => setField("passengers", next)}
              variant="bar"
              className="min-w-36"
            />

            <div className="flex items-center pl-1">
              <SearchButton
                onClick={submitSearch}
                isLoading={isLoading}
                label="Search"
              />
            </div>
          </div>
        </div>

        {/* ── Mobile / tablet: stacked ── */}
        <div className="flex w-full flex-col gap-3 lg:hidden">
          <div className="flex flex-col gap-3">
            <CitySelect
              label="From"
              value={form.fromCode}
              onChange={(v) => setField("fromCode", v)}
              excludeCode={form.toCode}
              error={errors.fromCode}
              icon={<Plane />}
              className="w-full"
            />
            <CitySelect
              label="To"
              value={form.toCode}
              onChange={(v) => setField("toCode", v)}
              excludeCode={form.fromCode}
              error={errors.toCode}
              icon={<MapPin />}
              iconClassName="[&_svg]:translate-y-[2px]"
              className="w-full"
            />
          </div>

          <DateField
            label="Departure"
            value={form.departDate}
            onChange={(v) => setField("departDate", v)}
            min={today}
            error={errors.departDate}
            className="w-full"
          />
          <AnimatePresence initial={false} mode="popLayout">
            {form.tripType === "roundtrip" && (
              <motion.div
                key="return-date-mobile"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full overflow-hidden"
              >
                <DateField
                  label="Return"
                  value={form.returnDate}
                  onChange={(v) => setField("returnDate", v)}
                  min={form.departDate || today}
                  error={errors.returnDate}
                  className="w-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <PassengerSelector
            value={form.passengers}
            onChange={(next) => setField("passengers", next)}
            className="w-full"
          />
          <SearchButton
            onClick={submitSearch}
            isLoading={isLoading}
            fullWidth
            label="Search Flights"
          />
        </div>
      </div>
    </div>
  )
}
