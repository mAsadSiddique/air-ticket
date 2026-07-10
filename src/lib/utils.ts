import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Scroll to a section id, offset for the fixed navbar. */
export function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" })
    return
  }

  const el = document.getElementById(id)
  if (!el) return

  const header = document.querySelector("header")
  const offset = (header?.getBoundingClientRect().height ?? 80) + 20
  const top =
    el.getBoundingClientRect().top + window.scrollY - offset
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight

  window.scrollTo({
    top: Math.min(Math.max(0, top), maxScroll),
    behavior: "smooth",
  })
}
