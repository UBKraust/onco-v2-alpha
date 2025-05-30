"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Plus } from "lucide-react"
import { useMockPatient } from "@/hooks/useMockPatient"

interface AlertsRisksCardProps {
  patientId: string
}

export function AlertsRisksCard({ patientId }: AlertsRisksCardProps) {
  const patient = useMockPatient(patientId)

  if (!patient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Alerte & Riscuri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Se încarcă datele...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Alerte & Riscuri Pacient
          <Button size="sm" variant="outline" className="ml-auto">
            <Plus className="h-4 w-4 mr-1" />
            Adaugă Alertă
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100">Anemie Severă</h4>
                  <p className="text-sm text-red-700 dark:text-red-300">Hemoglobină: 7.2 g/dL (Normal: 12-15)</p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    Acțiuni necesare: Transfuzie sanguină, monitorizare clinică
                  </p>
                  <p className="text-xs text-red-500 dark:text-red-500 mt-1">Ultima verificare: 10.11.2024, 14:30</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive">
                  Acțiune Imediată
                </Button>
                <Button size="sm" variant="outline">
                  Programează Control
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900 dark:text-orange-100">Risc Infecții</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Leucocite: 2.1 x10³/μL (Normal: 4-10)</p>
                  <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                    Monitorizare zilnică, precauții de izolare
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-orange-700 border-orange-300">
                Moderat
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
