import { Cookie, Plane } from "lucide-react"
import { Link } from "react-router-dom"

const COOKIE_TYPES = [
  {
    title: "Essential Cookies",
    description:
      "These cookies are necessary for the operation of the website and cannot be disabled in our systems.",
    items: [
      "Website functionality",
      "Security features",
      "Form submissions",
      "Session management",
    ],
  },
  {
    title: "Performance and Analytics Cookies",
    description:
      "These cookies help us understand how visitors use our website by collecting anonymous information such as:",
    items: [
      "Pages visited",
      "Time spent on pages",
      "Traffic sources",
      "Website performance metrics",
    ],
    footer:
      "This information helps us improve our website and services.",
  },
  {
    title: "Functionality Cookies",
    description:
      "These cookies allow the website to remember choices you make, such as:",
    items: [
      "Language preferences",
      "Location preferences",
      "Form information",
      "User settings",
    ],
  },
  {
    title: "Advertising and Marketing Cookies",
    description: "These cookies may be used to:",
    items: [
      "Measure advertising performance",
      "Understand user interests",
      "Display more relevant advertisements",
      "Improve marketing campaigns",
    ],
    footer:
      "Advertising partners may use these cookies in accordance with their own privacy policies.",
  },
] as const

const USAGE_ITEMS = [
  "Ensure the website functions properly",
  "Improve website performance and user experience",
  "Remember user preferences",
  "Analyse website traffic and visitor behaviour",
  "Measure the effectiveness of advertising campaigns",
  "Help protect against fraud and security threats",
] as const

const MANAGING_ITEMS = [
  "Delete existing cookies",
  "Block future cookies",
  "Receive notifications when cookies are placed",
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

export function CookiePolicyPage() {
  return (
    <main className="bg-background pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Cookie className="size-3.5" />
            Legal
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cookies Policy
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            How Flight Air uses cookies and similar technologies when you visit our
            website.
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <div className="space-y-8">
            <PolicySection title="Overview">
              <p>
                This Cookies Policy explains how Flight Air uses cookies and similar
                technologies when you visit our website.
              </p>
              <p>
                By continuing to use our website, you agree to the use of cookies as
                described in this policy, unless you choose to disable them through
                your browser settings.
              </p>
            </PolicySection>

            <PolicySection title="What Are Cookies?">
              <p>
                Cookies are small text files that are stored on your device when you
                visit a website. They help websites function properly, improve user
                experience, remember preferences, and provide information about how
                visitors interact with the website.
              </p>
              <p>
                Cookies do not typically contain information that directly identifies
                an individual user, but they may be linked to information you
                voluntarily provide.
              </p>
            </PolicySection>

            <PolicySection title="How We Use Cookies">
              <p>We use cookies to:</p>
              <BulletList items={USAGE_ITEMS} />
            </PolicySection>

            <PolicySection title="Types of Cookies We Use">
              <div className="space-y-6">
                {COOKIE_TYPES.map((type) => (
                  <div key={type.title}>
                    <h3 className="font-semibold text-foreground">{type.title}</h3>
                    <p className="mt-2">{type.description}</p>
                    <BulletList items={type.items} />
                    {"footer" in type && type.footer && (
                      <p className="mt-2">{type.footer}</p>
                    )}
                  </div>
                ))}
              </div>
            </PolicySection>

            <PolicySection title="Google Services">
              <p>
                Our website may use services such as Google Analytics, Google Ads,
                Google Ads Conversion Tracking, and Google Remarketing Services.
              </p>
              <p>
                These services may use cookies and similar technologies to collect
                information about website interactions, advertising performance, and
                visitor behaviour.
              </p>
              <p>
                The information collected helps us understand how our website is used
                and improve our marketing activities.
              </p>
            </PolicySection>

            <PolicySection title="Managing Cookies">
              <p>
                Most web browsers allow you to control, disable, or delete cookies
                through browser settings.
              </p>
              <p>You may choose to:</p>
              <BulletList items={MANAGING_ITEMS} />
              <p>
                Please note that disabling certain cookies may affect website
                functionality and your overall browsing experience.
              </p>
            </PolicySection>

            <PolicySection title="Third-Party Cookies">
              <p>
                Some cookies may be placed by third-party service providers that
                support our website, analytics, advertising, customer support, or
                marketing activities.
              </p>
              <p>
                These third parties may collect information according to their own
                privacy policies and practices.
              </p>
            </PolicySection>

            <PolicySection title="Updates to This Policy">
              <p>
                We may update this Cookie Policy from time to time to reflect changes
                in legal requirements, technology, or our business operations.
              </p>
              <p>
                Any updates will be published on this page with a revised effective
                date.
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
