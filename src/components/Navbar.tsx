import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, Phone, Plane, X } from "lucide-react"
import { motion } from "framer-motion"

import { cn, scrollToSection } from "@/lib/utils"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

const SUPPORT_PHONE = "+1 (800) 555-FLAR"
const SUPPORT_PHONE_HREF = "tel:+18005553527"

const phoneButtonClass =
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-primary px-2.5 py-2 text-[11px] font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:brightness-110 min-[400px]:gap-2 min-[400px]:px-3 min-[400px]:text-xs sm:px-4 sm:py-2.5 sm:text-sm"

type SectionLink = {
  label: string
  type: "section"
  sectionId: string
}

type RouteLink = {
  label: string
  type: "route"
  path: string
  id: string
}

type NavLink = SectionLink | RouteLink

const NAV_LINKS: NavLink[] = [
  { label: "Home", type: "section", sectionId: "top" },
  { label: "Destinations", type: "section", sectionId: "destinations" },
  { label: "Features", type: "section", sectionId: "features" },
  { label: "Reviews", type: "section", sectionId: "testimonials" },
  { label: "About Us", type: "route", path: "/about", id: "about" },
  { label: "Contact", type: "route", path: "/contact", id: "contact" },
]

function getLinkId(link: NavLink) {
  return link.type === "route" ? link.id : link.sectionId
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState("top")
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const routeLink = NAV_LINKS.find(
      (link) => link.type === "route" && link.path === location.pathname
    )
    if (routeLink?.type === "route") {
      setActive(routeLink.id)
    }
  }, [location.pathname])

  const handleSectionClick = (sectionId: string) => {
    setMobileOpen(false)
    setActive(sectionId)

    if (location.pathname === "/") {
      scrollToSection(sectionId)
      return
    }

    navigate(`/#${sectionId}`)
  }

  const isLinkActive = (link: NavLink) => {
    const id = getLinkId(link)
    if (link.type === "route") {
      return location.pathname === link.path
    }
    return location.pathname === "/" && active === id
  }

  const renderNavItem = (link: NavLink) => {
    const isActive = isLinkActive(link)

    if (link.type === "route") {
      return (
        <Link
          to={link.path}
          onClick={() => {
            setMobileOpen(false)
            setActive(link.id)
          }}
          className={cn(
            "relative rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-300 lg:px-4",
            isActive
              ? "text-primary"
              : "text-foreground/70 hover:text-foreground"
          )}
        >
          {isActive && (
            <motion.span
              layoutId="nav-active-pill"
              aria-hidden
              className="nav-pill-active absolute inset-0 -z-10 rounded-full"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 32,
              }}
            />
          )}
          {link.label}
        </Link>
      )
    }

    return (
      <a
        href={`#${link.sectionId}`}
        onClick={(e) => {
          e.preventDefault()
          handleSectionClick(link.sectionId)
        }}
        className={cn(
          "relative rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-300 lg:px-4",
          isActive
            ? "text-primary"
            : "text-foreground/70 hover:text-foreground"
        )}
      >
        {isActive && (
          <motion.span
            layoutId="nav-active-pill"
            aria-hidden
            className="nav-pill-active absolute inset-0 -z-10 rounded-full"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 32,
            }}
          />
        )}
        {link.label}
      </a>
    )
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-3 sm:py-4"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            setMobileOpen(false)
            if (location.pathname === "/") {
              scrollToSection("top")
            }
            setActive("top")
          }}
          className="flex shrink-0 items-center gap-2 text-lg font-bold text-primary"
        >
          <span className="flex size-9 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-blue-600 text-primary-foreground shadow-md shadow-primary/25">
            <Plane className="size-5 -rotate-45" />
          </span>
          <span className="hidden sm:inline">Flight Air</span>
        </Link>

        {/* Center pill nav */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <ul className="nav-pill flex items-center rounded-full p-1.5">
            {NAV_LINKS.map((link, i) => (
              <li key={getLinkId(link)} className="flex items-center">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="mx-1.5 h-5 w-px bg-foreground/12 dark:bg-white/10"
                  />
                )}
                {renderNavItem(link)}
              </li>
            ))}
          </ul>
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <AnimatedThemeToggler className="nav-pill flex size-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:text-primary" />
          <a
            href={SUPPORT_PHONE_HREF}
            className={phoneButtonClass}
            aria-label={`Call ${SUPPORT_PHONE}`}
          >
            <Phone className="size-3.5 shrink-0 sm:size-4" />
            <span className="whitespace-nowrap">{SUPPORT_PHONE}</span>
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            className="nav-pill flex size-9 items-center justify-center rounded-full text-foreground/70 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mx-4 mt-2 rounded-2xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur-lg md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const id = getLinkId(link)
              const isActive = isLinkActive(link)

              return (
                <li key={id}>
                  {link.type === "route" ? (
                    <Link
                      to={link.path}
                      onClick={() => {
                        setMobileOpen(false)
                        setActive(link.id)
                      }}
                      className={cn(
                        "block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-secondary"
                      )}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={`#${link.sectionId}`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleSectionClick(link.sectionId)
                      }}
                      className={cn(
                        "block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-secondary"
                      )}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
