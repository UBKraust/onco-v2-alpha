"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, Activity, Calendar } from "lucide-react"

interface PatientOverviewCardProps {
  totalDocuments: number
  activeAlerts: number
  treatmentAdherence: number
  nextAppointment: {
    date: string
    doctor: string
  }
}

export function PatientOverviewCard({
  totalDocuments,
  activeAlerts,
  treatmentAdherence,
  nextAppointment,
}: PatientOverviewCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Documente */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Documente</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDocuments}</div>
          <p className="text-xs text-muted-foreground">Documente încărcate</p>
        </CardContent>
      </Card>

      {/* Alerte Active */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alerte Active</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{activeAlerts}</div>
          <p className="text-xs text-muted-foreground">Necesită atenție</p>
        </CardContent>
      </Card>

      {/* Aderență Tratament */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aderență Tratament</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{treatmentAdherence}%</div>
          <div className="w-full bg-secondary rounded-full h-2 mt-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${treatmentAdherence}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Următoarea Programare */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Următoarea Programare</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm font-bold">{nextAppointment.date}</div>
          <p className="text-xs text-muted-foreground">Dr. {nextAppointment.doctor}</p>
        </CardContent>
      </Card>
    </div>
  )
}
