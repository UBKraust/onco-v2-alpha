"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Activity, Calendar, Pill, TrendingUp } from "lucide-react"

interface TreatmentData {
  name: string
  cycle: string
  progress: number
  status: string
}

interface PatientTreatmentCardProps {
  treatment: TreatmentData
}

export function PatientTreatmentCard({ treatment }: PatientTreatmentCardProps) {
  const medications = [
    { name: "Rituximab", dose: "375 mg/m²", frequency: "Ziua 1", status: "Administrat" },
    { name: "Cyclophosphamide", dose: "750 mg/m²", frequency: "Ziua 1", status: "Administrat" },
    { name: "Doxorubicin", dose: "50 mg/m²", frequency: "Ziua 1", status: "Programat" },
    { name: "Vincristine", dose: "1.4 mg/m²", frequency: "Ziua 1", status: "Programat" },
  ]

  const supportMeds = [
    { name: "Ondansetron", type: "Antiemetic", status: "Activ" },
    { name: "Filgrastim", type: "Factor creștere", status: "Programat" },
  ]

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-violet-600" />
            Tratament Activ
          </CardTitle>
          <Badge
            variant={treatment.status === "Activ" ? "default" : "secondary"}
            className="bg-green-100 text-green-800 hover:bg-green-200"
          >
            {treatment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Treatment Overview */}
        <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-violet-900 dark:text-violet-100">{treatment.name}</h3>
            <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Ciclu {treatment.cycle}</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-violet-700 dark:text-violet-300">Progres tratament</span>
              <span className="font-medium text-violet-900 dark:text-violet-100">{treatment.progress}%</span>
            </div>
            <Progress value={treatment.progress} className="h-2" />
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm text-violet-700 dark:text-violet-300">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Următorul ciclu: 28 Ian 2025
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Răspuns bun
            </div>
          </div>
        </div>

        {/* Current Medications */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Pill className="h-4 w-4 text-blue-600" />
            Medicația Principală
          </h4>
          <div className="space-y-2">
            {medications.map((med, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{med.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {med.dose} • {med.frequency}
                  </div>
                </div>
                <Badge
                  variant={med.status === "Administrat" ? "default" : "outline"}
                  className={
                    med.status === "Administrat" ? "bg-green-100 text-green-800" : "border-orange-200 text-orange-800"
                  }
                >
                  {med.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Support Medications */}
        <div>
          <h4 className="font-medium mb-3 text-sm text-gray-700 dark:text-gray-300">Medicație de Suport</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {supportMeds.map((med, index) => (
              <div key={index} className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
                <div className="font-medium text-blue-900 dark:text-blue-100">{med.name}</div>
                <div className="text-xs text-blue-700 dark:text-blue-300">{med.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Vezi Detalii Complete
          </Button>
          <Button size="sm" className="flex-1">
            Raportează Efecte Adverse
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
