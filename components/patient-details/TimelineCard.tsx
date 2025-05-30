"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChartIcon as ChartBarIcon, Download, CheckCircle, Activity, Calendar } from "lucide-react"
import { useMockTimeline } from "@/hooks/useMockTimeline"

interface TimelineCardProps {
  patientId: string
}

export function TimelineCard({ patientId }: TimelineCardProps) {
  const timelineData = useMockTimeline(patientId)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-white" />
      case "current":
        return <Activity className="h-4 w-4 text-white" />
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "current":
        return "bg-blue-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartBarIcon className="h-5 w-5" />
          Traseul Pacientului
          <Button size="sm" variant="outline" className="ml-auto">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-4">
              {timelineData.events.map((event) => (
                <div key={event.id} className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 ${getStatusColor(event.status)} rounded-full flex items-center justify-center relative z-10`}
                  >
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{timelineData.stats.treatmentProgress}%</div>
              <div className="text-sm text-gray-600">Progres tratament</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{timelineData.stats.daysInTreatment}</div>
              <div className="text-sm text-gray-600">Zile în tratament</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{timelineData.stats.cyclesRemaining}</div>
              <div className="text-sm text-gray-600">Cicluri rămase</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
