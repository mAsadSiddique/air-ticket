import { Link, useLocation, useNavigate } from "react-router-dom"
import { Mail } from "lucide-react"

import { scrollToSection } from "@/lib/utils"
import { FOOTER_DISCLAIMER_TEXT } from "@/content/disclaimer"
const LINK_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "#top" },
      { label: "Destinations", href: "#destinations" },
      { label: "Features", href: "#features" },
      { label: "Reviews", href: "#testimonials" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "Careers", href: "#" },
      { label: "Press & media", href: "#" },
      { label: "Partner with us", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Accessibility", href: "#" },
    ],
  },
] as const

function FooterLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const isHash = href.startsWith("#") && href.length > 1
  const isRoute = href.startsWith("/")

  if (isRoute) {
    return (
      <Link
        to={href}
        className={className}
        onClick={() => {
          if (location.pathname === href) {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        }}
      >
        {children}
      </Link>
    )
  }

  const sectionId = isHash ? href.slice(1) : ""

  return (
    <a
      href={href}
      onClick={
        isHash
          ? (e) => {
              e.preventDefault()
              if (location.pathname === "/") {
                scrollToSection(sectionId)
              } else {
                navigate(`/${href}`)
              }
            }
          : undefined
      }
      className={className}
    >
      {children}
    </a>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const location = useLocation()

  return (
    <footer
      id="footer"
      className="scroll-mt-32 border-t border-border bg-muted/30 lg:scroll-mt-36"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault()
                  scrollToSection("top")
                } else {
                  window.scrollTo({ top: 0, left: 0 })
                }
              }}
              className="inline-flex items-center"
              aria-label="Flight Air home"
            >
              <img
                src="/logo.svg"
                alt="Flight Air"
                className="h-9 w-auto sm:h-11"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {FOOTER_DISCLAIMER_TEXT}
            </p>
            <a
              href="mailto:support@flightair.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <Mail className="size-4 text-primary" />
              support@flightair.com
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {LINK_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/70">
              Stay updated
            </h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Get fare alerts and travel inspiration delivered to your inbox.
            </p>
            <form
              className="mt-4 flex flex-col gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="h-10 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            © {year} Flight Air. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
