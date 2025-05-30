"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Pill, Calendar, TrendingUp, AlertCircle } from "lucide-react"
import { useMockAdherence } from "@/hooks/useMockAdherence"

interface AdherenceCardProps {
  patientId: string
}

export function AdherenceCard({ patientId }: AdherenceCardProps) {
  const adherenceData = useMockAdherence(patientId)

  const getAdherenceColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-orange-600"
    return "text-red-600"
  }

  const getAdherenceBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-100 text-green-800">Excelentă</Badge>
    if (score >= 70) return <Badge className="bg-orange-100 text-orange-800">Bună</Badge>
    return <Badge className="bg-red-100 text-red-800">Îngrijorătoare</Badge>
  }

  const getMissedDosesBadge = (count: number) => {
    if (count === 0) return <Badge className="bg-green-100 text-green-800">Perfect</Badge>
    if (count <= 2) return <Badge className="bg-orange-100 text-orange-800">{count} doze</Badge>
    return <Badge className="bg-red-100 text-red-800">{count} doze</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Aderență Tratament
          <Button size="sm" variant="outline" className="ml-auto">
            <Calendar className="h-4 w-4 mr-1" />
            Programare
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Score Aderență */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Aderență Generală</h4>
              <div className="flex items-center gap-3">
                <div className={`text-3xl font-bold ${getAdherenceColor(adherenceData.overallAdherence)}`}>
                  {adherenceData.overallAdherence}%
                </div>
                {getAdherenceBadge(adherenceData.overallAdherence)}
              </div>
              <Progress value={adherenceData.overallAdherence} className="mt-2" />
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Doze Ratate</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ultima săptămână:</span>
                  {getMissedDosesBadge(adherenceData.missedDoses.lastWeek)}
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ultima lună:</span>
                  {getMissedDosesBadge(adherenceData.missedDoses.lastMonth)}
                </div>
              </div>
            </div>
          </div>

          {/* Medicație Curentă */}
          <div>
            <h4 className="font-medium mb-2">Medicație Curentă</h4>
            <div className="space-y-2">
              {adherenceData.currentMedications.map((med) => (
                <div key={med.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Pill className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">{med.name}</p>
                      <p className="text-xs text-gray-600">
                        {med.dosage} - {med.frequency}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={med.adherenceRate} className="w-16 h-2" />
                    <span className={`text-sm font-medium ${getAdherenceColor(med.adherenceRate)}`}>
                      {med.adherenceRate}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerte Aderență */}
          {adherenceData.alerts.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Alerte Aderență</h4>
              <div className="space-y-2">
                {adherenceData.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg"
                  >
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-900 dark:text-red-100">{alert.message}</p>
                      <p className="text-xs text-red-600 dark:text-red-400">{alert.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trend Aderență */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Trend Aderență</h4>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {adherenceData.trend.direction === "up" ? "📈" : "📉"}
              {adherenceData.trend.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
