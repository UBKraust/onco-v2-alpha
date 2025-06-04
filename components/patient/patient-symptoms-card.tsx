"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Plus, TrendingDown, TrendingUp, AlertTriangle, ThermometerSun, Zap, Heart } from "lucide-react"

export function PatientSymptomsCard() {
  const [showAddForm, setShowAddForm] = useState(false)

  const recentSymptoms = [
    {
      id: 1,
      name: "Oboseală",
      severity: 6,
      date: "Azi, 14:30",
      trend: "stable",
      category: "Energie",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      id: 2,
      name: "Greață ușoară",
      severity: 3,
      date: "Ieri, 09:15",
      trend: "improving",
      category: "Digestiv",
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      id: 3,
      name: "Durere de cap",
      severity: 4,
      date: "Ieri, 16:45",
      trend: "worsening",
      category: "Neurologic",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      id: 4,
      name: "Febră ușoară",
      severity: 5,
      date: "2 zile în urmă",
      trend: "improving",
      category: "General",
      icon: ThermometerSun,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ]

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return "text-green-600"
    if (severity <= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getSeverityBg = (severity: number) => {
    if (severity <= 3) return "bg-green-500"
    if (severity <= 6) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case "worsening":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />
    }
  }

  const weeklyOverview = {
    totalSymptoms: 12,
    averageSeverity: 4.2,
    mostCommon: "Oboseală",
    trend: "improving",
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-600" />
            Simptome Raportate
          </CardTitle>
          <Button size="sm" className="flex items-center gap-1" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4" />
            Adaugă Simptom
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weekly Overview */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Rezumat Săptămâna Aceasta</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-2xl font-bold text-blue-600">{weeklyOverview.totalSymptoms}</div>
              <div className="text-blue-700 dark:text-blue-300">Simptome raportate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{weeklyOverview.averageSeverity}/10</div>
              <div className="text-blue-700 dark:text-blue-300">Severitate medie</div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              Cel mai frecvent: <strong>{weeklyOverview.mostCommon}</strong>
            </span>
            <div className="flex items-center gap-1">
              {getTrendIcon(weeklyOverview.trend)}
              <span className="text-xs text-green-600">Îmbunătățire</span>
            </div>
          </div>
        </div>

        {/* Recent Symptoms */}
        <div>
          <h4 className="font-medium mb-3">Simptome Recente</h4>
          <div className="space-y-3">
            {recentSymptoms.map((symptom) => {
              const IconComponent = symptom.icon
              return (
                <div
                  key={symptom.id}
                  className={`p-3 rounded-lg border ${symptom.bgColor} border-gray-200 dark:border-gray-700`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className={`h-4 w-4 ${symptom.color}`} />
                      <span className="font-medium">{symptom.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {symptom.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(symptom.trend)}
                      <span className="text-xs text-gray-500 dark:text-gray-400">{symptom.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Severitate</span>
                        <span className={`font-medium ${getSeverityColor(symptom.severity)}`}>
                          {symptom.severity}/10
                        </span>
                      </div>
                      <Progress
                        value={symptom.severity * 10}
                        className="h-2"
                        // @ts-ignore
                        style={{
                          "--progress-background": getSeverityBg(symptom.severity),
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Add Form (Collapsed by default) */}
        {showAddForm && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-medium mb-3">Adaugă Simptom Rapid</h5>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {["Oboseală", "Greață", "Durere", "Febră", "Amețeală", "Insomnie"].map((symptom) => (
                  <Button key={symptom} variant="outline" size="sm" className="text-xs">
                    {symptom}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Formular Complet
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                  Anulează
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Istoric Complet
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Export Raport
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
