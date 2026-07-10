import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Globe2,
  Headset,
  HeartHandshake,
  MapPin,
  Palmtree,
  Plane,
  Sparkles,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const WHAT_WE_DO = [
  { label: "International and domestic flights", icon: Plane },
  { label: "Holiday packages", icon: Palmtree },
  { label: "City breaks", icon: Building2 },
  { label: "Family holidays", icon: Users },
  { label: "Beach holidays", icon: MapPin },
  { label: "Last-minute travel deals", icon: Sparkles },
  { label: "Multi-city itineraries", icon: Globe2 },
  { label: "Group travel enquiries", icon: Users },
] as const

const COMMITMENTS = [
  "Providing clear and accurate travel information",
  "Offering professional customer support",
  "Helping customers compare available travel options",
  "Delivering a straightforward booking experience",
  "Maintaining transparency throughout the booking process",
] as const

const WHY_CHOOSE = [
  {
    title: "Dedicated travel assistance",
    description:
      "Personal support from specialists who understand your trip goals and budget.",
    icon: HeartHandshake,
  },
  {
    title: "Wide range of travel options",
    description:
      "Flights, holidays, and packages across domestic and international destinations.",
    icon: Globe2,
  },
  {
    title: "Friendly customer support",
    description:
      "Reach our team for enquiries, booking help, and itinerary questions.",
    icon: Headset,
  },
  {
    title: "Flight & holiday enquiries",
    description:
      "We help you explore fares and holiday arrangements that fit your plans.",
    icon: Plane,
  },
  {
    title: "Convenient booking support",
    description:
      "A straightforward process from first enquiry through to confirmation.",
    icon: BadgeCheck,
  },
] as const

function SectionCard({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8",
        className
      )}
    >
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export function AboutPage() {
  return (
    <main className="bg-background pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Plane className="size-3.5 -rotate-45" />
            About Us
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Making travel planning simpler
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            At Flight Air, we help travelers find competitive flight and holiday
            options for destinations around the world.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Our goal is simple: to make travel planning easier by connecting
            customers with flight and holiday deals that suit their budget and
            travel preferences. Whether you&apos;re planning a family holiday, a city
            break, a business trip, or a last-minute getaway, our team is here
            to assist you.
          </p>
        </div>

        {/* What we do */}
        <SectionCard title="What We Do" className="mt-12">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Flight Air provides travel information and booking assistance for:
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_WE_DO.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-4"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="text-sm font-medium leading-snug text-foreground">
                  {label}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Our travel specialists work to help customers explore available travel
            options and find suitable fares and holiday arrangements.
          </p>
        </SectionCard>

        {/* Commitment + Support */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionCard title="Our Commitment">
            <p className="text-sm text-muted-foreground sm:text-base">
              We are committed to:
            </p>
            <ul className="mt-4 space-y-3">
              {COMMITMENTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm leading-relaxed text-foreground sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Customer Support">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Headset className="size-6" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Our support team is available to assist with travel enquiries, booking
              requests, itinerary questions, and general travel information.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We understand that every journey is unique, and we strive to provide
              helpful guidance throughout the booking process.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-xl">
              <Link to="/contact">
                Get in touch
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </SectionCard>
        </div>

        {/* Why choose */}
        <div className="mt-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Why Choose Flight Air?
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-muted/30 p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important notice */}
        <div className="mt-12 rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-foreground sm:text-xl">
            Important Information
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Flight Air acts as a travel booking assistance and travel enquiry
              platform. Availability, pricing, airline schedules, hotel rates, and
              travel conditions are subject to change without notice and are
              confirmed at the time of booking.
            </p>
            <p>
              Customers are encouraged to review all travel documentation, visa
              requirements, baggage policies, and booking terms before travel.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Contact Us
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            If you have questions about flights, holidays, or travel arrangements,
            our team is here to help.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl px-8 shadow-md shadow-primary/20">
              <Link to="/contact">
                Contact our team
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8">
              <Link to="/">
                <Plane className="size-4 -rotate-45" />
                Back to flight search
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
