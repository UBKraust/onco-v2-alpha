"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Activity, BarChart3, AlertTriangle, CheckCircle } from "lucide-react"

export function PatientAnalysisCard() {
  const labResults = [
    {
      name: "Hemoglobină",
      value: 12.5,
      unit: "g/dL",
      normalRange: "12.0-15.5",
      status: "normal",
      trend: "stable",
      lastValue: 12.3,
      date: "14 Ian 2025",
    },
    {
      name: "Leucocite",
      value: 4.2,
      unit: "×10³/μL",
      normalRange: "4.0-11.0",
      status: "normal",
      trend: "improving",
      lastValue: 3.8,
      date: "14 Ian 2025",
    },
    {
      name: "Trombocite",
      value: 180,
      unit: "×10³/μL",
      normalRange: "150-450",
      status: "normal",
      trend: "stable",
      lastValue: 175,
      date: "14 Ian 2025",
    },
    {
      name: "Neutrofile",
      value: 2.1,
      unit: "×10³/μL",
      normalRange: "2.0-7.5",
      status: "low-normal",
      trend: "improving",
      lastValue: 1.8,
      date: "14 Ian 2025",
    },
  ]

  const vitalSigns = [
    { name: "Greutate", value: "68.5 kg", change: "-0.5 kg", trend: "stable" },
    { name: "Tensiune", value: "125/80", change: "Normal", trend: "stable" },
    { name: "Puls", value: "72 bpm", change: "Normal", trend: "stable" },
    { name: "Temperatură", value: "36.8°C", change: "Normal", trend: "stable" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600"
      case "low-normal":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      case "low":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "low-normal":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "high":
      case "low":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "worsening":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />
    }
  }

  const overallHealth = {
    score: 8.2,
    status: "Bună",
    improvements: 3,
    concerns: 1,
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-cyan-600" />
          Analize și Tendințe
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Health Score */}
        <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-cyan-900 dark:text-cyan-100">Scor Sănătate General</h4>
            <Badge className="bg-green-100 text-green-800">{overallHealth.status}</Badge>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="text-3xl font-bold text-cyan-600">{overallHealth.score}/10</div>
            <div className="flex-1">
              <Progress value={overallHealth.score * 10} className="h-3" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-cyan-700 dark:text-cyan-300">{overallHealth.improvements} îmbunătățiri</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-cyan-700 dark:text-cyan-300">{overallHealth.concerns} atenționare</span>
            </div>
          </div>
        </div>

        {/* Lab Results */}
        <div>
          <h4 className="font-medium mb-3">Rezultate Analize Recente</h4>
          <div className="space-y-3">
            {labResults.map((result, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="font-medium text-sm">{result.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(result.trend)}
                    <span className="text-xs text-gray-500 dark:text-gray-400">{result.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-lg font-bold ${getStatusColor(result.status)}`}>{result.value}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{result.unit}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Normal: {result.normalRange}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Anterior: {result.lastValue} {result.unit}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vital Signs */}
        <div>
          <h4 className="font-medium mb-3">Semne Vitale</h4>
          <div className="grid grid-cols-2 gap-3">
            {vitalSigns.map((vital, index) => (
              <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">{vital.name}</span>
                  {getTrendIcon(vital.trend)}
                </div>
                <div className="text-lg font-bold text-blue-600">{vital.value}</div>
                <div className="text-xs text-blue-700 dark:text-blue-300">{vital.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Istoric Complet
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Export Grafice
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
