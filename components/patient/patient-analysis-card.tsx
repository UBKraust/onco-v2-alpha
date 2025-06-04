"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

export function PatientAnalysisCard() {
  const analyses = [
    {
      name: "Hemoglobină",
      value: "12.5",
      unit: "g/dL",
      range: "12.0-15.5",
      status: "normal",
      trend: "up",
      change: "+0.3",
    },
    {
      name: "Leucocite",
      value: "4.2",
      unit: "×10³/μL",
      range: "4.0-11.0",
      status: "normal",
      trend: "down",
      change: "-0.5",
    },
    {
      name: "Trombocite",
      value: "180",
      unit: "×10³/μL",
      range: "150-450",
      status: "normal",
      trend: "up",
      change: "+15",
    },
    {
      name: "Creatinină",
      value: "1.1",
      unit: "mg/dL",
      range: "0.6-1.2",
      status: "normal",
      trend: "stable",
      change: "0",
    },
  ]

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-red-600" />
          Analize & Semne Vitale
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analyses.map((analysis, index) => (
            <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{analysis.name}</h4>
                <div className="flex items-center gap-1">
                  {analysis.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {analysis.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                  <span className="text-xs text-gray-500">{analysis.change !== "0" && analysis.change}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold">{analysis.value}</span>
                  <span className="text-sm text-gray-500 ml-1">{analysis.unit}</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Normal
                </Badge>
              </div>

              <p className="text-xs text-gray-500 mt-1">Interval: {analysis.range}</p>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          Vezi Istoric Complet
        </Button>
      </CardContent>
    </Card>
  )
}
