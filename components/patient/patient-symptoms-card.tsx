"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, TrendingDown, TrendingUp, Plus } from "lucide-react"

export function PatientSymptomsCard() {
  const symptoms = [
    {
      name: "Oboseală",
      severity: "Moderată",
      trend: "down",
      lastReported: "Azi, 08:30",
      color: "yellow",
    },
    {
      name: "Greață",
      severity: "Ușoară",
      trend: "down",
      lastReported: "Ieri, 20:15",
      color: "green",
    },
    {
      name: "Durere de cap",
      severity: "Ușoară",
      trend: "up",
      lastReported: "Azi, 12:00",
      color: "orange",
    },
  ]

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-orange-600" />
          Simptome Recente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {symptoms.map((symptom, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{symptom.name}</span>
                {symptom.trend === "down" ? (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{symptom.lastReported}</p>
            </div>
            <Badge
              variant="outline"
              className={
                symptom.color === "green"
                  ? "border-green-200 text-green-700 bg-green-50"
                  : symptom.color === "yellow"
                    ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                    : "border-orange-200 text-orange-700 bg-orange-50"
              }
            >
              {symptom.severity}
            </Badge>
          </div>
        ))}

        <Button variant="outline" className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Raportează Simptom
        </Button>
      </CardContent>
    </Card>
  )
}
