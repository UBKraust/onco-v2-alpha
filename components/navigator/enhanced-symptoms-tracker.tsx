"use client"

import { Button } from "@/components/ui/button"

interface EnhancedSymptomsTrackerProps {
  patientId: string
}

export function EnhancedSymptomsTracker({ patientId }: EnhancedSymptomsTrackerProps) {
  if (!patientId) {
    return (
      <div className="p-4 border border-red-200 rounded-md bg-red-50">
        <p className="text-red-600">Eroare: ID pacient lipsă</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Tracker Simptome</h3>
        <Button size="sm">Adaugă Simptom</Button>
      </div>

      <div className="border rounded-md p-4">
        <p>Simptomele pacientului cu ID: {patientId} vor fi afișate aici.</p>
        {/* Symptom tracking content would go here */}
      </div>
    </div>
  )
}
