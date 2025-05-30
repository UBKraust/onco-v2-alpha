"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, CheckCircle, Clock } from "lucide-react"
import { useMockPatient } from "@/hooks/useMockPatient"

interface TreatmentPlanCardProps {
  patientId: string
}

export function TreatmentPlanCard({ patientId }: TreatmentPlanCardProps) {
  const patient = useMockPatient(patientId)

  if (!patient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Plan de Tratament
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Se încarcă datele...</p>
        </CardContent>
      </Card>
    )
  }

  // Safe parsing of cycle data
  const cycleParts = patient.cycle.split("/")
  const currentCycle = Number.parseInt(cycleParts[0]) || 0
  const totalCycles = Number.parseInt(cycleParts[1]) || 1
  const progressPercentage = (currentCycle / totalCycles) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Plan de Tratament Activ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Chimioterapie</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">Protocol: R-CHOP</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Ciclu curent: {patient.cycle}</p>
              <div className="mt-2">
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {Math.round(progressPercentage)}% progres
                </p>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Tratament Suportiv</h4>
              <p className="text-sm text-green-700 dark:text-green-300">Antiemetice, Factori de creștere</p>
              <p className="text-sm text-green-700 dark:text-green-300">Monitorizare continuă</p>
              <div className="mt-2">
                <Badge variant="outline" className="text-green-700 border-green-300">
                  Activ
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Medicație Actuală</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                <div className="font-medium">Rituximab</div>
                <div className="text-gray-600">375 mg/m² IV</div>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                <div className="font-medium">Cyclophosphamide</div>
                <div className="text-gray-600">750 mg/m² IV</div>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                <div className="font-medium">Doxorubicin</div>
                <div className="text-gray-600">50 mg/m² IV</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Cronologia Tratamentului</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Diagnostic confirmat - 15 septembrie 2024</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Următoarea consultație - 19 noiembrie 2024, 08:00</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
