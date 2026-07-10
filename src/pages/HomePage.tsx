import { useEffect } from "react"

import { Hero } from "@/components/Hero"
import { FlightResults } from "@/components/FlightResults"
import { Destinations } from "@/components/Destinations"
import { Features } from "@/components/Features"
import { HowItWorks } from "@/components/HowItWorks"
import { GlobeSection } from "@/components/GlobeSection"
import { Testimonials } from "@/components/Testimonials"
import { CtaBanner } from "@/components/CtaBanner"
import { scrollToSection } from "@/lib/utils"

export function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (!hash) return

    const timer = window.setTimeout(() => scrollToSection(hash), 100)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <main>
      <Hero />
      <FlightResults />
      <Destinations />
      <Features />
      <HowItWorks />
      <GlobeSection />
      <Testimonials />
      <CtaBanner />
    </main>
  )
}
