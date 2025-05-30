"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Actualizează starea inițială
    setMatches(media.matches)

    // Callback pentru schimbări
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Adaugă listener
    media.addEventListener("change", listener)

    // Cleanup
    return () => {
      media.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}
