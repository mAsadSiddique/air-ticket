import { useState, useEffect } from "react"
import { Search, CreditCard, TicketCheck, CheckCircle2 } from "lucide-react"


import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"

// Subcomponent 1: Search Step Mockup (types New York to London)
function SearchMockup() {
  const [query, setQuery] = useState("")
  
  useEffect(() => {
    const text = "New York (JFK) to London (LHR)"
    let i = 0
    const interval = setInterval(() => {
      setQuery(text.slice(0, i))
      i++
      if (i > text.length + 5) {
        i = 0
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-4 rounded-lg border border-border bg-background p-2.5 text-xs shadow-xs select-none">
      <div className="flex items-center gap-2 rounded-md bg-muted/40 px-2 py-1.5 border border-border/50">
        <Search className="size-3 text-muted-foreground" />
        <span className="text-[10px] text-foreground font-medium min-h-[1rem] flex items-center">
          {query}
          <span className="w-[1.5px] h-3 bg-primary ml-0.5 animate-pulse shrink-0" />
        </span>
      </div>
      <div className="flex justify-between items-center mt-2.5 text-[9px] text-muted-foreground">
        <span>Departure: Oct 12</span>
        <span className="text-primary font-semibold">Scanning 180+ flights...</span>
      </div>
    </div>
  )
}

// Subcomponent 2: Select Step Mockup (toggles active selection)
function SelectMockup() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev === 0 ? 1 : 0))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-4 flex flex-col gap-2 text-xs select-none">
      <div className={cn(
        "flex items-center justify-between rounded-lg border p-2 transition-all duration-300 bg-background",
        selectedIndex === 0 ? "border-primary bg-primary/5 shadow-xs" : "border-border"
      )}>
        <div className="flex items-center gap-2">
          <div className={cn("size-2 rounded-full", selectedIndex === 0 ? "bg-primary" : "bg-muted-foreground/30")} />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-foreground">Flight Air Premium</span>
            <span className="text-[8px] text-muted-foreground">08:30 AM • Non-stop</span>
          </div>
        </div>
        <span className="text-[10px] font-extrabold text-foreground">$249</span>
      </div>

      <div className={cn(
        "flex items-center justify-between rounded-lg border p-2 transition-all duration-300 bg-background",
        selectedIndex === 1 ? "border-primary bg-primary/5 shadow-xs" : "border-border"
      )}>
        <div className="flex items-center gap-2">
          <div className={cn("size-2 rounded-full", selectedIndex === 1 ? "bg-primary" : "bg-muted-foreground/30")} />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-foreground">Standard Saver</span>
            <span className="text-[8px] text-muted-foreground">11:15 AM • 1 stop</span>
          </div>
        </div>
        <span className="text-[10px] font-extrabold text-foreground">$199</span>
      </div>
    </div>
  )
}

// Subcomponent 3: Book Step Mockup (green check details)
function BookMockup() {
  return (
    <div className="mt-4 rounded-lg border border-border bg-background p-2.5 text-xs shadow-xs select-none flex flex-col items-center justify-center text-center">
      <div className="size-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
        <CheckCircle2 className="size-4.5" />
      </div>
      <span className="text-[10px] font-bold text-foreground mt-2">Booking Confirmed!</span>
      <span className="text-[8px] text-muted-foreground mt-0.5">E-ticket sent to user@example.com</span>
      <div className="mt-2 text-[8px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
        Boarding Pass Ready
      </div>
    </div>
  )
}

export function HowItWorks() {
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

  const steps = [
    {
      step: "01",
      title: "Search",
      description: "Tell us where and when — we scan hundreds of airlines instantly.",
      Icon: Search,
      widget: <SearchMockup />,
    },
    {
      step: "02",
      title: "Select",
      description: "Compare fares, times, and stops to pick the flight that fits you best.",
      Icon: CreditCard,
      widget: <SelectMockup />,
    },
    {
      step: "03",
      title: "Book",
      description: "Confirm your details and get your e-ticket delivered instantly.",
      Icon: TicketCheck,
      widget: <BookMockup />,
    },
  ]

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Search className="size-3.5" />
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Booking made effortless
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Search, compare, and confirm your flight in three simple steps — no hassle, no hidden fees.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((item, index) => (
            <BlurFade
              key={item.step}
              inView
              direction="up"
              delay={index * 0.15}
              className="relative"
            >
              {/* Connector to next step */}
              {index < steps.length - 1 && (
                <>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-full z-20 hidden h-0 w-6 -translate-y-1/2 border-t-2 border-dotted border-primary/35 sm:block"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute top-full left-1/2 z-20 h-6 w-0 -translate-x-1/2 border-l-2 border-dotted border-primary/35 sm:hidden"
                  />
                </>
              )}

              <MagicCard
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border p-6 shadow-xs min-h-[22rem]"
                gradientColor={gradientColor}
                gradientFrom={gradientFrom}
                gradientTo={gradientTo}
              >
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    {/* Top Row: Icon and Step Badge */}
                    <div className="flex items-center justify-between">
                      <div className="relative flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <item.Icon className="size-5" />
                      </div>
                      <span className="text-2xl font-black text-muted-foreground/20 leading-none">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Intersecting Widget mockup */}
                  <div className="w-full mt-4">
                    {item.widget}
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

