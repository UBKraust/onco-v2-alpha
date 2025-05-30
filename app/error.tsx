"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Oops!</h1>
        <h2 className="text-xl text-slate-600 mb-6">A apărut o eroare</h2>
        <Button onClick={reset}>Încearcă din nou</Button>
      </div>
    </div>
  )
}
