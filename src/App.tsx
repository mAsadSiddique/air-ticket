import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ScrollToTop } from "@/components/ScrollToTop"
import { HomePage } from "@/pages/HomePage"
import { ContactPage } from "@/pages/ContactPage"
import { CookiePolicyPage } from "@/pages/CookiePolicyPage"
import { TermsConditionsPage } from "@/pages/TermsConditionsPage"
import { DisclaimerPage } from "@/pages/DisclaimerPage"
import { AboutPage } from "@/pages/AboutPage"
import { FlightSearchProvider } from "@/context/FlightSearchContext"

function App() {
  return (
    <FlightSearchProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/terms" element={<TermsConditionsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </FlightSearchProvider>
  )
}

export default App
