import { Info, Plane } from "lucide-react"
import { Link } from "react-router-dom"

const NO_GUARANTEE_ITEMS = [
  "Availability of specific flights, hotels, or holiday packages.",
  "The lowest available fares or prices.",
  "Continuous availability of advertised promotions.",
  "Error-free operation of the website.",
  "Uninterrupted access to website services.",
] as const

const THIRD_PARTY_NOT_RESPONSIBLE_ITEMS = [
  "Actions or omissions of third-party suppliers.",
  "Changes made by airlines, hotels, or travel providers.",
  "Supplier cancellations or schedule changes.",
  "Service interruptions caused by third parties.",
] as const

const LIABILITY_ITEMS = [
  "Use of this website.",
  "Reliance on website content.",
  "Travel disruptions.",
  "Supplier actions or omissions.",
  "Website interruptions or technical issues.",
  "Losses resulting from inaccurate or outdated information.",
] as const

const TRAVEL_DOCUMENT_ITEMS = [
  "Passports",
  "Visas",
  "Travel permits",
  "Health documentation",
  "Any other required travel documents",
] as const

const FORCE_MAJEURE_ITEMS = [
  "Natural disasters",
  "Severe weather conditions",
  "Government actions",
  "Travel restrictions",
  "Public health emergencies",
  "Industrial disputes or strikes",
  "Technical failures",
  "Other unforeseen events",
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

export function DisclaimerPage() {
  return (
    <main className="bg-background pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Info className="size-3.5" />
            Legal
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Disclaimer
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Important information about using the Flight Air website and travel
            services.
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <div className="space-y-8">
            <PolicySection title="General Information">
              <p>
                The information provided on this website is for general
                informational purposes only. While Flight Air strives to keep all
                information accurate, current, and complete, we make no
                representations or warranties of any kind regarding the accuracy,
                reliability, suitability, or availability of any information,
                products, services, or travel offers displayed on this website.
              </p>
              <p>
                Any reliance you place on information provided on this website is
                strictly at your own risk.
              </p>
            </PolicySection>

            <PolicySection title="Travel Information">
              <p>
                Flight schedules, fares, hotel rates, holiday package prices,
                availability, and travel-related information are subject to change
                without notice.
              </p>
              <p>
                Travel offers displayed on the website may become unavailable,
                expire, or change due to supplier updates, demand, currency
                fluctuations, taxes, fees, or other factors beyond our control.
              </p>
              <p>
                All prices and travel arrangements are subject to confirmation at
                the time of booking.
              </p>
            </PolicySection>

            <PolicySection title="Booking Assistance">
              <p>
                Flight Air provides travel information and booking assistance
                services. Travel products and services may be supplied by airlines,
                hotels, tour operators, travel providers, or other third-party
                suppliers.
              </p>
              <p>
                The final terms, conditions, availability, pricing, and travel
                arrangements are determined by the relevant supplier.
              </p>
            </PolicySection>

            <PolicySection title="No Guarantees">
              <p>We do not guarantee:</p>
              <BulletList items={NO_GUARANTEE_ITEMS} />
            </PolicySection>

            <PolicySection title="Third-Party Services">
              <p>
                This website may contain information relating to third-party
                suppliers and service providers.
              </p>
              <p>Flight Air is not responsible for:</p>
              <BulletList items={THIRD_PARTY_NOT_RESPONSIBLE_ITEMS} />
              <p>
                Users should review the applicable terms and conditions of the
                relevant travel supplier before making a booking.
              </p>
            </PolicySection>

            <PolicySection title="External Links">
              <p>
                Our website may contain links to third-party websites for
                informational purposes.
              </p>
              <p>
                We do not control, endorse, or assume responsibility for the
                content, policies, or practices of any third-party websites.
              </p>
              <p>Visiting external websites is at your own discretion and risk.</p>
            </PolicySection>

            <PolicySection title="Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, Flight Air shall
                not be liable for any direct, indirect, incidental, consequential,
                or special damages arising from:
              </p>
              <BulletList items={LIABILITY_ITEMS} />
            </PolicySection>

            <PolicySection title="Travel Documentation">
              <p>Customers are solely responsible for ensuring they possess valid:</p>
              <BulletList items={TRAVEL_DOCUMENT_ITEMS} />
              <p>
                Failure to meet entry requirements may result in denied boarding or
                entry, for which Flight Air accepts no responsibility.
              </p>
            </PolicySection>

            <PolicySection title="Force Majeure">
              <p>
                Flight Air shall not be held responsible for delays, cancellations,
                losses, or disruptions caused by circumstances beyond reasonable
                control, including but not limited to:
              </p>
              <BulletList items={FORCE_MAJEURE_ITEMS} />
            </PolicySection>

            <PolicySection title="Website Availability">
              <p>
                We reserve the right to modify, suspend, or discontinue any part of
                the website without prior notice.
              </p>
              <p>
                We do not guarantee that the website will always be available,
                secure, or free from errors.
              </p>
            </PolicySection>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
              <p className="text-sm font-semibold text-foreground sm:text-base">
                Important Notice
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                All travel products, prices, availability, and promotional offers
                displayed on this website are subject to change and confirmation.
                Customers should carefully review all booking details, supplier
                terms, and travel requirements before making travel arrangements.
              </p>
            </div>
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
