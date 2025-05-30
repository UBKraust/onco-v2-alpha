"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Activity, Pill, Calendar } from "lucide-react"

interface TreatmentProgressBarProps {
  chemoCycles: {
    completed: number
    total: number
  }
  medicationAdherence: number
  nextTreatment?: {
    date: string
    type: string
  }
}

export function TreatmentProgressBar({ chemoCycles, medicationAdherence, nextTreatment }: TreatmentProgressBarProps) {
  const chemoProgress = (chemoCycles.completed / chemoCycles.total) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Progres Tratament
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cicluri Chimioterapie */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Cicluri Chimioterapie</span>
            <Badge variant="outline">
              {chemoCycles.completed}/{chemoCycles.total}
            </Badge>
          </div>
          <Progress value={chemoProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {chemoCycles.completed} din {chemoCycles.total} cicluri finalizate
          </p>
        </div>

        {/* Aderență Medicație */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Aderență Medicație
            </span>
            <Badge variant={medicationAdherence >= 80 ? "default" : "destructive"}>{medicationAdherence}%</Badge>
          </div>
          <Progress value={medicationAdherence} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {medicationAdherence >= 80 ? "Aderență bună" : "Necesită îmbunătățire"}
          </p>
        </div>

        {/* Următorul Tratament */}
        {nextTreatment && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Următorul Tratament</span>
            </div>
            <p className="text-sm">{nextTreatment.type}</p>
            <p className="text-xs text-muted-foreground">{nextTreatment.date}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
