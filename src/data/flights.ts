export interface City {
  code: string
  city: string
  country: string
}

export const cities: City[] = [
  { code: "JFK", city: "New York", country: "USA" },
  { code: "LHR", city: "London", country: "United Kingdom" },
  { code: "CDG", city: "Paris", country: "France" },
  { code: "HND", city: "Tokyo", country: "Japan" },
  { code: "DXB", city: "Dubai", country: "UAE" },
  { code: "DPS", city: "Bali", country: "Indonesia" },
  { code: "FCO", city: "Rome", country: "Italy" },
  { code: "SYD", city: "Sydney", country: "Australia" },
  { code: "SIN", city: "Singapore", country: "Singapore" },
  { code: "LAX", city: "Los Angeles", country: "USA" },
  { code: "BCN", city: "Barcelona", country: "Spain" },
  { code: "AMS", city: "Amsterdam", country: "Netherlands" },
]

export interface FlightResult {
  id: string
  airline: string
  airlineCode: string
  departTime: string
  arriveTime: string
  duration: string
  stops: number
  stopLabel: string
  price: number
  from: string
  to: string
}

const AIRLINES = [
  { name: "Flight Air", code: "FA" },
  { name: "Aurora Wings", code: "AU" },
  { name: "Meridian Airlines", code: "MA" },
  { name: "Northstar Jet", code: "NJ" },
  { name: "Pacific Blue", code: "PB" },
]

function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

function formatTime(hour: number, minute: number) {
  const period = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`
}

export function generateMockResults(
  fromCode: string,
  toCode: string
): FlightResult[] {
  const seed =
    (fromCode.charCodeAt(0) || 1) * 31 +
    (toCode.charCodeAt(0) || 1) * 17 +
    fromCode.length +
    toCode.length
  const rand = seededRandom(seed || 42)

  const count = 5
  const results: FlightResult[] = []

  for (let i = 0; i < count; i++) {
    const airline = AIRLINES[Math.floor(rand() * AIRLINES.length)]!
    const departHour = Math.floor(rand() * 20) + 4
    const departMinute = Math.floor(rand() * 4) * 15
    const durationHours = 2 + Math.floor(rand() * 12)
    const durationMinutes = Math.floor(rand() * 4) * 15
    const stops = rand() > 0.6 ? (rand() > 0.85 ? 2 : 1) : 0

    const totalDepartMinutes = departHour * 60 + departMinute
    const totalArriveMinutes =
      totalDepartMinutes + durationHours * 60 + durationMinutes
    const arriveHour = Math.floor(totalArriveMinutes / 60) % 24
    const arriveMinute = totalArriveMinutes % 60

    const basePrice = 149 + Math.floor(rand() * 900)
    const stopDiscount = stops * 35
    const price = Math.max(99, basePrice - stopDiscount)

    results.push({
      id: `${fromCode}-${toCode}-${i}`,
      airline: airline.name,
      airlineCode: airline.code,
      departTime: formatTime(departHour, departMinute),
      arriveTime: formatTime(arriveHour, arriveMinute),
      duration: `${durationHours}h ${durationMinutes}m`,
      stops,
      stopLabel:
        stops === 0 ? "Nonstop" : stops === 1 ? "1 stop" : `${stops} stops`,
      price,
      from: fromCode,
      to: toCode,
    })
  }

  return results.sort((a, b) => a.price - b.price)
}
