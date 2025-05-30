"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { useMockObjectives } from "@/hooks/useMockObjectives"

interface ObjectivesCardProps {
  patientId: string
}

export function ObjectivesCard({ patientId }: ObjectivesCardProps) {
  const objectivesData = useMockObjectives(patientId)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Target className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completat</Badge>
      case "in-progress":
        return <Badge className="bg-orange-100 text-orange-800">În progres</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Întârziat</Badge>
      default:
        return <Badge variant="outline">Planificat</Badge>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-orange-500"
      default:
        return "border-l-green-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Obiective Personale
          <Button size="sm" variant="outline" className="ml-auto">
            <Plus className="h-4 w-4 mr-1" />
            Adaugă Obiectiv
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progres General */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Progres General</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Obiective completate:</span>
                  <span className="font-medium">
                    {objectivesData.completed}/{objectivesData.total}
                  </span>
                </div>
                <Progress value={objectivesData.completionRate} className="h-2" />
                <p className="text-xs text-blue-600">{objectivesData.completionRate}% progres</p>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Această Săptămână</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Completate:</span>
                  <span className="font-medium text-green-600">{objectivesData.thisWeek.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span>În progres:</span>
                  <span className="font-medium text-orange-600">{objectivesData.thisWeek.inProgress}</span>
                </div>
                <div className="flex justify-between">
                  <span>Planificate:</span>
                  <span className="font-medium text-gray-600">{objectivesData.thisWeek.planned}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lista Obiective */}
          <div>
            <h4 className="font-medium mb-2">Obiective Active</h4>
            <div className="space-y-3">
              {objectivesData.objectives.map((objective) => (
                <div
                  key={objective.id}
                  className={`p-3 border-l-4 ${getPriorityColor(objective.priority)} bg-gray-50 dark:bg-gray-800 rounded-r-lg`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(objective.status)}
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{objective.title}</h5>
                        <p className="text-xs text-gray-600">{objective.description}</p>
                      </div>
                    </div>
                    {getStatusBadge(objective.status)}
                  </div>

                  {objective.progress !== undefined && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progres</span>
                        <span>{objective.progress}%</span>
                      </div>
                      <Progress value={objective.progress} className="h-1" />
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Termen: {objective.dueDate}</span>
                    <span className="capitalize">Prioritate: {objective.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivație */}
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">💪 Motivație Zilnică</h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">"{objectivesData.dailyMotivation}"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
