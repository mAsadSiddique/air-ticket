import { Plane, ScrollText } from "lucide-react"
import { Link } from "react-router-dom"

const WEBSITE_USE_ITEMS = [
  "Use the website lawfully and responsibly.",
  "Provide accurate and complete information when submitting enquiries.",
  "Not misuse, interfere with, or attempt to gain unauthorised access to the website.",
  "Not use the website for fraudulent or unlawful purposes.",
] as const

const NO_GUARANTEE_ITEMS = [
  "Availability of any flight, hotel, holiday, or travel product.",
  "Specific fares or prices until confirmed at the time of booking.",
  "Availability of advertised promotions after publication.",
] as const

const BOOKING_CONFIRMED_ITEMS = [
  "Availability has been verified.",
  "Required information has been provided.",
  "Payment has been successfully processed (where applicable).",
  "Confirmation has been issued.",
] as const

const CUSTOMER_RESPONSIBILITY_ITEMS = [
  "Providing accurate personal and travel information.",
  "Reviewing booking confirmations and travel documents.",
  "Ensuring passports, visas, and travel documents are valid.",
  "Meeting entry requirements for destinations visited.",
  "Complying with airline, hotel, and supplier policies.",
] as const

const SUPPLIER_TERMS_ITEMS = [
  "Cancellation policies",
  "Refund policies",
  "Baggage policies",
  "Schedule changes",
  "Travel restrictions",
] as const

const LIABILITY_ITEMS = [
  "Travel delays or cancellations",
  "Supplier errors or omissions",
  "Airline schedule changes",
  "Hotel overbookings",
  "Loss of enjoyment",
  "Indirect or consequential losses",
  "Events beyond our reasonable control",
] as const

function PolicySection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-b border-border pb-8 last:border-b-0 last:pb-0">
      <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </section>
  )
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function TermsConditionsPage() {
  return (
    <main className="bg-background pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <ScrollText className="size-3.5" />
            Legal
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            The terms that govern your use of the Flight Air website and services.
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <div className="space-y-8">
            <PolicySection title="Welcome">
              <p>
                Welcome to Flight Air. These Terms &amp; Conditions govern your use of
                our website and services. By accessing or using this website, you
                agree to be bound by these Terms &amp; Conditions.
              </p>
              <p>
                If you do not agree with any part of these terms, please do not use
                our website or services.
              </p>
            </PolicySection>

            <PolicySection title="About Our Services">
              <p>
                Flight Air provides travel information, travel enquiry services, and
                booking assistance for flights, holidays, hotels, and other
                travel-related products and services.
              </p>
              <p>
                All bookings, prices, availability, and travel arrangements are
                subject to confirmation by the relevant travel supplier, airline,
                hotel, tour operator, or service provider.
              </p>
            </PolicySection>

            <PolicySection title="Website Use">
              <p>By using this website, you agree that you will:</p>
              <BulletList items={WEBSITE_USE_ITEMS} />
              <p>
                We reserve the right to restrict or terminate access to users who
                violate these terms.
              </p>
            </PolicySection>

            <PolicySection title="Travel Information and Availability">
              <p>
                Travel prices, availability, schedules, and offers displayed on the
                website are provided for general information purposes and may change
                without notice.
              </p>
              <p>We cannot guarantee:</p>
              <BulletList items={NO_GUARANTEE_ITEMS} />
              <p>
                All travel arrangements are subject to supplier availability and
                confirmation.
              </p>
            </PolicySection>

            <PolicySection title="Booking Requests">
              <p>
                Submitting an enquiry or booking request does not constitute a
                confirmed booking.
              </p>
              <p>A booking is only considered confirmed when:</p>
              <BulletList items={BOOKING_CONFIRMED_ITEMS} />
              <p>
                Customers are responsible for reviewing all booking details before
                accepting confirmation.
              </p>
            </PolicySection>

            <PolicySection title="Customer Responsibilities">
              <p>Customers are responsible for:</p>
              <BulletList items={CUSTOMER_RESPONSIBILITY_ITEMS} />
              <p>
                Flight Air is not responsible for travel disruptions resulting from
                incomplete documentation or failure to meet travel requirements.
              </p>
            </PolicySection>

            <PolicySection title="Supplier Terms">
              <p>
                Travel products and services may be provided by third-party airlines,
                hotels, tour operators, and travel suppliers.
              </p>
              <p>
                Bookings are subject to the terms, conditions, and policies of the
                relevant supplier, including:
              </p>
              <BulletList items={SUPPLIER_TERMS_ITEMS} />
              <p>Customers should review supplier terms before booking.</p>
            </PolicySection>

            <PolicySection title="Payments">
              <p>
                Where payments are accepted, customers agree to provide valid and
                accurate payment information.
              </p>
              <p>
                Prices may change before booking confirmation due to supplier updates,
                taxes, fees, exchange rates, or availability changes.
              </p>
              <p>
                Any applicable charges will be clearly communicated before
                confirmation.
              </p>
            </PolicySection>

            <PolicySection title="Cancellations and Refunds">
              <p>
                Cancellation and refund eligibility are subject to the terms of the
                relevant airline, hotel, travel supplier, or package provider.
              </p>
              <p>
                Refund processing times may vary depending on supplier policies and
                payment providers.
              </p>
              <p>
                Customers should review the applicable Refund &amp; Cancellation Policy
                before making a booking request.
              </p>
            </PolicySection>

            <PolicySection title="Limitation of Liability">
              <p>
                To the fullest extent permitted by law, Flight Air shall not be liable
                for:
              </p>
              <BulletList items={LIABILITY_ITEMS} />
              <p>
                Our role is limited to providing travel information and booking
                assistance services where applicable.
              </p>
            </PolicySection>

            <PolicySection title="Intellectual Property">
              <p>
                All content on this website, including text, graphics, logos, images,
                and design elements, is owned by or licensed to Flight Air and is
                protected by applicable intellectual property laws.
              </p>
              <p>
                Content may not be copied, reproduced, distributed, or used without
                prior written permission.
              </p>
            </PolicySection>

            <PolicySection title="Privacy">
              <p>
                Your use of this website is also governed by our Privacy Policy, which
                explains how personal information is collected, used, and protected.
              </p>
            </PolicySection>

            <PolicySection title="Website Availability">
              <p>
                We strive to maintain uninterrupted access to our website; however,
                we do not guarantee that the website will always be available or free
                from errors.
              </p>
              <p>
                We may update, suspend, or discontinue parts of the website without
                prior notice.
              </p>
            </PolicySection>

            <PolicySection title="Changes to These Terms">
              <p>
                We reserve the right to update these Terms &amp; Conditions at any
                time.
              </p>
              <p>
                Updated versions will be published on this page, and continued use of
                the website constitutes acceptance of any revisions.
              </p>
            </PolicySection>

            <PolicySection title="Governing Law">
              <p>
                These Terms &amp; Conditions shall be governed by and interpreted in
                accordance with the laws of England and Wales.
              </p>
              <p>
                Any disputes arising from the use of this website shall be subject to
                the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </PolicySection>
          </div>
        </article>

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
