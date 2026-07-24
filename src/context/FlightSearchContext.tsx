import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { generateMockResults, type FlightResult } from "@/data/flights"

export type TripType = "roundtrip" | "oneway"

export interface PassengerCounts {
  adults: number
  children: number
  infants: number
}

export const DEFAULT_PASSENGERS: PassengerCounts = {
  adults: 1,
  children: 0,
  infants: 0,
}

export function normalizePassengers(value: unknown): PassengerCounts {
  if (typeof value === "number" && Number.isFinite(value)) {
    return {
      adults: Math.min(9, Math.max(1, Math.floor(value))),
      children: 0,
      infants: 0,
    }
  }

  if (!value || typeof value !== "object") {
    return { ...DEFAULT_PASSENGERS }
  }

  const raw = value as Partial<PassengerCounts>
  const adults = Number(raw.adults)
  const children = Number(raw.children)
  const infants = Number(raw.infants)

  return {
    adults: Number.isFinite(adults) ? Math.min(9, Math.max(1, Math.floor(adults))) : 1,
    children: Number.isFinite(children)
      ? Math.min(9, Math.max(0, Math.floor(children)))
      : 0,
    infants: Number.isFinite(infants)
      ? Math.min(9, Math.max(0, Math.floor(infants)))
      : 0,
  }
}

export interface SearchFormState {
  tripType: TripType
  fromCode: string
  toCode: string
  departDate: string
  returnDate: string
  passengers: PassengerCounts
}

export function totalPassengers(p: PassengerCounts): number {
  const counts = normalizePassengers(p)
  return counts.adults + counts.children + counts.infants
}

export type SearchFormErrors = Partial<Record<keyof SearchFormState, string>>

interface FlightSearchContextValue {
  form: SearchFormState
  errors: SearchFormErrors
  isLoading: boolean
  hasSearched: boolean
  results: FlightResult[]
  setField: <K extends keyof SearchFormState>(
    key: K,
    value: SearchFormState[K]
  ) => void
  swapCities: () => void
  submitSearch: () => void
}

const initialForm: SearchFormState = {
  tripType: "roundtrip",
  fromCode: "",
  toCode: "",
  departDate: "",
  returnDate: "",
  passengers: { ...DEFAULT_PASSENGERS },
}

const FlightSearchContext = createContext<FlightSearchContextValue | null>(
  null
)

export function FlightSearchProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<SearchFormState>(initialForm)
  const [errors, setErrors] = useState<SearchFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [results, setResults] = useState<FlightResult[]>([])

  const setField = useCallback(
    <K extends keyof SearchFormState>(key: K, value: SearchFormState[K]) => {
      setForm((prev) => ({
        ...prev,
        [key]:
          key === "passengers"
            ? normalizePassengers(value)
            : value,
      }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    },
    []
  )

  const swapCities = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      fromCode: prev.toCode,
      toCode: prev.fromCode,
    }))
  }, [])

  const submitSearch = useCallback(() => {
    const nextErrors: SearchFormErrors = {}
    if (!form.fromCode) nextErrors.fromCode = "Origin is required"
    if (!form.toCode) nextErrors.toCode = "Destination is required"
    if (form.fromCode && form.toCode && form.fromCode === form.toCode) {
      nextErrors.toCode = "Choose a different destination"
    }
    if (!form.departDate) nextErrors.departDate = "Departure date is required"
    if (form.tripType === "roundtrip" && !form.returnDate) {
      nextErrors.returnDate = "Return date is required"
    }
    if (
      form.tripType === "roundtrip" &&
      form.departDate &&
      form.returnDate &&
      form.returnDate < form.departDate
    ) {
      nextErrors.returnDate = "Return must be after departure"
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    requestAnimationFrame(() => {
      document
        .querySelector("#results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    })

    window.setTimeout(() => {
      setResults(generateMockResults(form.fromCode, form.toCode))
      setIsLoading(false)
    }, 800)
  }, [form])

  const value = useMemo(
    () => ({
      form,
      errors,
      isLoading,
      hasSearched,
      results,
      setField,
      swapCities,
      submitSearch,
    }),
    [form, errors, isLoading, hasSearched, results, setField, swapCities, submitSearch]
  )

  return (
    <FlightSearchContext.Provider value={value}>
      {children}
    </FlightSearchContext.Provider>
  )
}

export function useFlightSearch() {
  const ctx = useContext(FlightSearchContext)
  if (!ctx) {
    throw new Error("useFlightSearch must be used within FlightSearchProvider")
  }
  return ctx
}
