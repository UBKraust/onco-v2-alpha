"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill } from "lucide-react"
import type { TreatmentPlan, Medication } from "@/types/medical-record"

interface TreatmentPlanViewProps {
  treatmentPlans: TreatmentPlan[]
  medications: Medication[]
  compact?: boolean
}

export function TreatmentPlanView({ treatmentPlans, medications, compact = false }: TreatmentPlanViewProps) {
  const activeTreatmentPlan = treatmentPlans.find((plan) => plan.status === "active")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Plan de Tratament
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeTreatmentPlan ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">{activeTreatmentPlan.name}</h3>
              <p className="text-sm text-muted-foreground">
                {activeTreatmentPlan.startDate} • {activeTreatmentPlan.doctor}
              </p>
              {!compact && <p className="mt-2">{activeTreatmentPlan.description}</p>}
            </div>

            {activeTreatmentPlan.cycles && (
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <span>Progres:</span>
                  <span>
                    {activeTreatmentPlan.currentCycle}/{activeTreatmentPlan.cycles} cicluri
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-pink-600 h-2.5 rounded-full"
                    style={{
                      width: `${(activeTreatmentPlan.currentCycle! / activeTreatmentPlan.cycles!) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            {!compact && activeTreatmentPlan.medications && activeTreatmentPlan.medications.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Medicație asociată:</h4>
                <div className="space-y-2">
                  {activeTreatmentPlan.medications.map((med) => (
                    <div key={med.id} className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">{med.name}</span>
                        <Badge variant="outline">{med.dosage}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{med.frequency}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTreatmentPlan.nextAppointment && (
              <div className="mt-4">
                <p className="text-sm">
                  <span className="font-medium">Următoarea programare:</span> {activeTreatmentPlan.nextAppointment}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p>Nu există un plan de tratament activ în prezent.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
