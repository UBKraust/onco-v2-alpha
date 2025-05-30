"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity } from "lucide-react"
import type { Symptom } from "@/types/medical-record"

interface SymptomTrackerProps {
  symptoms: Symptom[]
  onAddSymptom: (symptom: Omit<Symptom, "id" | "isReported">) => void
}

export function SymptomTracker({ symptoms, onAddSymptom }: SymptomTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Jurnal Simptome
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {symptoms.length === 0 ? (
          <div className="text-center py-4">
            <p>Nu există simptome înregistrate.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <h3 className="font-medium">{symptom.name}</h3>
                  <span className="text-sm">Severitate: {symptom.severity}/10</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {symptom.date}, {symptom.time}
                </p>
                {symptom.notes && <p className="text-sm mt-2">{symptom.notes}</p>}
              </div>
            ))}
          </div>
        )}

        <Button className="w-full">Adaugă Simptom</Button>
      </CardContent>
    </Card>
  )
}
