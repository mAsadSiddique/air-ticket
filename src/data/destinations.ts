export interface Destination {
  id: string
  city: string
  country: string
  code: string
  priceFrom: number
  gradient: string
  image: string
  rating: number
  tag?: string
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`

export const destinations: Destination[] = [
  {
    id: "par",
    city: "Paris",
    country: "France",
    code: "CDG",
    priceFrom: 289,
    gradient: "from-rose-500 via-orange-400 to-amber-300",
    image: img("photo-1502602898657-3e91760cbb34"),
    rating: 4.8,
    tag: "Bestseller",
  },
  {
    id: "tyo",
    city: "Tokyo",
    country: "Japan",
    code: "HND",
    priceFrom: 649,
    gradient: "from-fuchsia-500 via-pink-500 to-rose-400",
    image: img("photo-1540959733332-eab4deabeeaf"),
    rating: 4.9,
  },
  {
    id: "nyc",
    city: "New York",
    country: "USA",
    code: "JFK",
    priceFrom: 199,
    gradient: "from-indigo-600 via-blue-500 to-sky-400",
    image: img("photo-1496442226666-8d4d0e62e6e9"),
    rating: 4.7,
    tag: "Great deal",
  },
  {
    id: "dxb",
    city: "Dubai",
    country: "UAE",
    code: "DXB",
    priceFrom: 459,
    gradient: "from-amber-500 via-orange-400 to-yellow-300",
    image: img("photo-1512453979798-5ea266f8880c"),
    rating: 4.8,
  },
  {
    id: "bali",
    city: "Bali",
    country: "Indonesia",
    code: "DPS",
    priceFrom: 529,
    gradient: "from-emerald-500 via-teal-400 to-cyan-300",
    image: img("photo-1537996194471-e657df975ab4"),
    rating: 4.9,
    tag: "Trending",
  },
  {
    id: "rom",
    city: "Rome",
    country: "Italy",
    code: "FCO",
    priceFrom: 319,
    gradient: "from-orange-500 via-amber-400 to-yellow-300",
    image: img("photo-1552832230-c0197dd311b5"),
    rating: 4.7,
  },
  {
    id: "syd",
    city: "Sydney",
    country: "Australia",
    code: "SYD",
    priceFrom: 749,
    gradient: "from-sky-500 via-cyan-400 to-teal-300",
    image: img("photo-1506973035872-a4ec16b8e8d9"),
    rating: 4.8,
  },
  {
    id: "lon",
    city: "London",
    country: "United Kingdom",
    code: "LHR",
    priceFrom: 259,
    gradient: "from-slate-600 via-indigo-500 to-blue-400",
    image: img("photo-1513635269975-59663e0ac1ad"),
    rating: 4.6,
    tag: "Great deal",
  },
]
