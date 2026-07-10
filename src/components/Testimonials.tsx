import { Plane } from "lucide-react"
import { motion } from "motion/react"

import {
  TestimonialsColumn,
  type TestimonialItem,
} from "@/components/ui/testimonials-columns-1"

const testimonials: TestimonialItem[] = [
  {
    text: "Booked a round-trip to Tokyo in under 3 minutes. The price alert saved me almost $200!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Amara Okafor",
    role: "Frequent Flyer",
  },
  {
    text: "Flight Air's support team rebooked my connecting flight at 2am without any hassle. Incredible service.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Liam Chen",
    role: "Business Traveler",
  },
  {
    text: "The cleanest flight search UI I've used. My e-ticket landed in my inbox seconds after booking.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Sofia Marín",
    role: "Travel Blogger",
  },
  {
    text: "Flexible cancellation actually works — I rebooked my trip with zero fees when plans changed.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Noah Fischer",
    role: "Digital Nomad",
  },
  {
    text: "Found a nonstop to Bali that three other sites didn't even show. Best price guarantee sealed the deal.",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    name: "Priya Nair",
    role: "Adventure Seeker",
  },
  {
    text: "Clean design, fast checkout, and real humans on support chat. This is how flight booking should feel.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    name: "Marcus Reyes",
    role: "Startup Founder",
  },
  {
    text: "We book team flights through Flight Air every month. The fare comparison alone saves us thousands.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Elena Vasquez",
    role: "Operations Lead",
  },
  {
    text: "Loved the round-trip toggle and calendar picker — felt premium from search to confirmation.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "James Okonkwo",
    role: "Product Designer",
  },
  {
    text: "Finally a booking site that doesn't hide fees. What you see is what you pay. Highly recommend.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    name: "Hannah Brooks",
    role: "Family Traveler",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden bg-background py-14 sm:py-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Plane className="size-3.5 -rotate-45" />
            Testimonials
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by travelers everywhere
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            See what our customers have to say about booking with Flight Air.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  )
}
