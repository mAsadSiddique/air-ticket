import { useState, type FormEvent } from "react"
import {
  Clock,
  Headset,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plane,
  Send,
  ShieldCheck,
} from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const CONTACT_INFO = [
  {
    label: "Address",
    value: "100 Market Street, Suite 400\nSan Francisco, CA 94105",
    icon: MapPin,
    href: undefined,
  },
  {
    label: "Phone",
    value: "+1 (800) 555-FLAR (3527)",
    icon: Phone,
    href: "tel:+18005553527",
  },
  {
    label: "Email",
    value: "support@flightair.com",
    icon: Mail,
    href: "mailto:support@flightair.com",
  },
  {
    label: "Response time",
    value: "We aim to reply within one business day.",
    icon: Clock,
    href: undefined,
  },
] as const

const HELP_TOPICS = [
  {
    title: "Booking assistance",
    description:
      "Need help finding the right fare, adding baggage, or selecting seats? Our team can walk you through every option.",
  },
  {
    title: "Changes & cancellations",
    description:
      "Plans changed? We’ll explain your fare rules and help you rebook or cancel with minimal hassle.",
  },
  {
    title: "Groups & corporate",
    description:
      "Traveling with ten or more passengers or booking for your company? Get tailored quotes and dedicated support.",
  },
] as const

const FAQ_ITEMS = [
  {
    question: "What should I include in my message?",
    answer:
      "Share your booking reference (if you have one), travel dates, passenger names, and a clear description of your request so we can help faster.",
  },
  {
    question: "Can I get help over the phone?",
    answer:
      "Yes. Call our support line during business hours for urgent booking questions, or use this form for non-urgent enquiries — we’ll email you back promptly.",
  },
  {
    question: "Do you offer 24/7 support?",
    answer:
      "Live phone support is available Mon–Fri, 8am–8pm PT and Sat–Sun, 9am–5pm PT. Email enquiries are monitored around the clock with next-business-day responses.",
  },
] as const

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  confirmed: boolean
}

type FormErrors = Partial<Record<keyof FormState, string>>

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  confirmed: false,
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_RE = /^[\p{L}\s'-]+$/u
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {}

  const firstName = form.firstName.trim()
  if (!firstName) {
    errors.firstName = "First name is required."
  } else if (firstName.length < 2) {
    errors.firstName = "Enter at least 2 characters."
  } else if (!NAME_RE.test(firstName)) {
    errors.firstName = "Use letters only (spaces, hyphens, and apostrophes allowed)."
  }

  const lastName = form.lastName.trim()
  if (!lastName) {
    errors.lastName = "Last name is required."
  } else if (lastName.length < 2) {
    errors.lastName = "Enter at least 2 characters."
  } else if (!NAME_RE.test(lastName)) {
    errors.lastName = "Use letters only (spaces, hyphens, and apostrophes allowed)."
  }

  const email = form.email.trim()
  if (!email) {
    errors.email = "Email address is required."
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address."
  }

  const phone = form.phone.trim()
  if (phone && !PHONE_RE.test(phone)) {
    errors.phone = "Enter a valid phone number."
  }

  const subject = form.subject.trim()
  if (!subject) {
    errors.subject = "Subject is required."
  } else if (subject.length < 3) {
    errors.subject = "Enter at least 3 characters."
  }

  const message = form.message.trim()
  if (!message) {
    errors.message = "Please enter your message."
  } else if (message.length < 10) {
    errors.message = "Message should be at least 10 characters."
  }

  if (!form.confirmed) {
    errors.confirmed = "Please confirm the information is accurate."
  }

  return errors
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="text-xs font-medium text-destructive">
      {message}
    </p>
  )
}

function ContactInfoItem({
  label,
  value,
  icon: Icon,
  href,
}: (typeof CONTACT_INFO)[number]) {
  const content = (
    <div className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-primary/80">
          {label}
        </p>
        <p className="mt-1 whitespace-pre-line text-sm font-medium leading-relaxed text-foreground">
          {value}
        </p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        className="block rounded-2xl transition-colors hover:bg-muted/50"
      >
        {content}
      </a>
    )
  }

  return content
}

export function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validateForm(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const firstErrorKey = Object.keys(nextErrors)[0]
      const el = document.getElementById(firstErrorKey)
      el?.focus()
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmitting(false)
    setSubmitted(true)
    setForm(INITIAL_FORM)
    setErrors({})
  }

  return (
    <main className="bg-background pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <MessageSquare className="size-3.5" />
            Contact Us
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            We&apos;re here to help
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Questions about a booking, a fare, or your next trip? Send us a message
            or reach out directly — our team is ready to assist.
          </p>
        </div>

        {/* Main grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Form card */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:col-span-2">
            <div className="border-b border-border pb-6">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Send us a message
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Fill in the form below and we&apos;ll respond to your enquiry promptly.
              </p>
            </div>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  Message sent successfully
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you for reaching out. A member of our team will get back to
                  you within one business day.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSubmitted(false)
                    setErrors({})
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                      autoComplete="given-name"
                    />
                    <FieldError id="firstName-error" message={errors.firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                      autoComplete="family-name"
                    />
                    <FieldError id="lastName-error" message={errors.lastName} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.smith@email.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      autoComplete="email"
                    />
                    <FieldError id="email-error" message={errors.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      autoComplete="tel"
                    />
                    <FieldError id="phone-error" message={errors.phone} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Subject <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Booking enquiry, flight change, feedback…"
                    value={form.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  <FieldError id="subject-error" message={errors.subject} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Your Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help — include your booking reference if you have one."
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  <FieldError id="message-error" message={errors.message} />
                </div>

                <div className="flex flex-col gap-5 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1.5">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        id="confirmed"
                        type="checkbox"
                        checked={form.confirmed}
                        onChange={(e) => updateField("confirmed", e.target.checked)}
                        aria-invalid={!!errors.confirmed}
                        aria-describedby={
                          errors.confirmed ? "confirmed-error" : undefined
                        }
                        className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary aria-invalid:outline-2 aria-invalid:outline-offset-1 aria-invalid:outline-destructive"
                      />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        I confirm the information provided is accurate.{" "}
                        <span className="text-destructive">*</span>
                      </span>
                    </label>
                    <FieldError id="confirmed-error" message={errors.confirmed} />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full shrink-0 rounded-xl px-8 shadow-md shadow-primary/20 sm:w-auto"
                  >
                    {submitting ? "Sending…" : "Send Message"}
                    {!submitting && <Send className="size-4" />}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Get in touch
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prefer to reach us directly? Use any of the details below.
              </p>
              <div className="mt-6 space-y-6">
                {CONTACT_INFO.map((item) => (
                  <ContactInfoItem key={item.label} {...item} />
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Need help booking?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Call our team for flight and holiday enquiries — we&apos;re here to
                help you find the right option.
              </p>
              <a
                href="tel:+18005553527"
                className="mt-5 inline-flex items-center gap-3 text-lg font-bold text-primary transition-colors hover:text-primary/80"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="size-5" />
                </span>
                +1 (800) 555-FLAR
              </a>
              <p className="mt-4 text-xs text-muted-foreground">
                Mon–Fri 8am–8pm PT · Sat–Sun 9am–5pm PT
              </p>
            </div>
          </div>
        </div>

        {/* Help topics */}
        <div className="mt-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              How can we help?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Whether you&apos;re planning a new trip or managing an existing booking,
              our specialists are trained to resolve your request quickly.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {HELP_TOPICS.map((topic) => (
              <div
                key={topic.title}
                className="rounded-2xl border border-border bg-muted/30 p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Headset className="size-5" />
                </div>
                <h3 className="mt-4 font-bold text-foreground">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-14 rounded-3xl border border-border bg-secondary/30 p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-border">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="group py-4 first:pt-0 last:pb-0">
                <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span
                      className={cn(
                        "text-primary transition-transform group-open:rotate-45"
                      )}
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Back to home CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            <Plane className="size-4 -rotate-45" />
            Back to flight search
          </Link>
        </div>
      </div>
    </main>
  )
}
