"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Microscope, TrendingUp, Eye } from "lucide-react"
import { useMockBiomarkers } from "@/hooks/useMockBiomarkers"

interface BiomarkersCardProps {
  patientId: string
}

export function BiomarkersCard({ patientId }: BiomarkersCardProps) {
  const biomarkersData = useMockBiomarkers(patientId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-50 dark:bg-red-900/20 border-red-200"
      case "warning":
        return "bg-orange-50 dark:bg-orange-900/20 border-orange-200"
      default:
        return "bg-green-50 dark:bg-green-900/20 border-green-200"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return (
          <Badge variant="destructive" className="text-xs">
            Critic
          </Badge>
        )
      case "warning":
        return <Badge className="bg-orange-100 text-orange-800 text-xs">Atenție</Badge>
      default:
        return <Badge className="bg-green-100 text-green-800 text-xs">Normal</Badge>
    }
  }

  const getTrendSymbol = (trend: string, status: string) => {
    const color = status === "critical" ? "text-red-600" : status === "warning" ? "text-orange-600" : "text-green-600"
    switch (trend) {
      case "up":
        return <span className={color}>↑</span>
      case "down":
        return <span className={color}>↓</span>
      default:
        return <span className={color}>✓</span>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Microscope className="h-5 w-5" />
          Indicatori Biologici
          <Button size="sm" variant="outline" className="ml-auto">
            <TrendingUp className="h-4 w-4 mr-1" />
            Trend
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {biomarkersData.biomarkers.map((biomarker, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getStatusColor(biomarker.status)}`}>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{biomarker.name}</h4>
                <div
                  className="text-2xl font-bold mt-1"
                  style={{
                    color:
                      biomarker.status === "critical"
                        ? "#dc2626"
                        : biomarker.status === "warning"
                          ? "#ea580c"
                          : "#16a34a",
                  }}
                >
                  {biomarker.value} {biomarker.unit}
                </div>
                <p
                  className="text-xs"
                  style={{
                    color:
                      biomarker.status === "critical"
                        ? "#dc2626"
                        : biomarker.status === "warning"
                          ? "#ea580c"
                          : "#16a34a",
                  }}
                >
                  {getTrendSymbol(biomarker.trend, biomarker.status)}{" "}
                  {biomarker.status === "normal" ? "Normal" : "Sub normal"} ({biomarker.normalRange})
                </p>
                <div className="mt-2">{getStatusBadge(biomarker.status)}</div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-medium mb-2">Evoluție Recentă</h4>
            <div className="space-y-2">
              {biomarkersData.recentTests.map((test, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm"
                >
                  <span>
                    {test.date} - {test.type}
                  </span>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
