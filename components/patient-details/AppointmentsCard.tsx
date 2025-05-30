"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Plus } from "lucide-react"
import { useMockPatient } from "@/hooks/useMockPatient"

interface AppointmentsCardProps {
  patientId: string
  onAddAppointment?: () => void
}

export function AppointmentsCard({ patientId, onAddAppointment }: AppointmentsCardProps) {
  const patient = useMockPatient(patientId)

  if (!patient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Programări
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
          <Calendar className="h-5 w-5" />
          Programări pentru {patient.name}
          {onAddAppointment && (
            <Button size="sm" onClick={onAddAppointment} className="ml-auto">
              <Plus className="h-4 w-4 mr-1" />
              Adaugă Programare
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-blue-600">Confirmată</Badge>
                <span className="text-sm text-blue-600">12 noiembrie 2024, 09:00</span>
              </div>
              <h4 className="font-medium">Chemoterapie - Ciclu 4</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dr. Elena Oncolog</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Spitalul Oncologic București</p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-green-600 border-green-300">
                  Programată
                </Badge>
                <span className="text-sm text-green-600">15 noiembrie 2024, 14:30</span>
              </div>
              <h4 className="font-medium">Consultație Oncologie</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dr. Elena Oncolog</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Evaluare progres tratament</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Programări Viitoare</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Analize pre-chimioterapie</span>
                </div>
                <span className="text-sm text-gray-600">În așteptare</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Consultație psiholog</span>
                </div>
                <span className="text-sm text-gray-600">Programare necesară</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
