"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Activity, CheckCircle, AlertTriangle, Heart } from "lucide-react"
import { useMockPatient } from "@/hooks/useMockPatient"

interface QuickStatsCardsProps {
  patientId: string
}

export function QuickStatsCards({ patientId }: QuickStatsCardsProps) {
  const patient = useMockPatient(patientId)

  // Add error handling
  if (!patient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ciclu</p>
              <p className="text-2xl font-bold text-blue-600">{patient.cycle}</p>
              <p className="text-xs text-gray-500">Chimioterapie</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Aderență</p>
              <p className="text-2xl font-bold text-green-600">{patient.adherence}</p>
              <p className="text-xs text-gray-500">Tratament</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Alerte Active</p>
              <p className="text-2xl font-bold text-red-600">{patient.alerts}</p>
              <p className="text-xs text-gray-500">Monitorizare</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Wellbeing</p>
              <p className="text-2xl font-bold text-purple-600">{patient.wellbeing}</p>
              <p className="text-xs text-gray-500">Stare generală</p>
            </div>
            <Heart className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
