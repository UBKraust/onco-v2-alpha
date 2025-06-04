"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, CheckCircle, Clock, Plus, Trophy } from "lucide-react"

export function PatientObjectivesCard() {
  const objectives = [
    {
      id: 1,
      title: "Completează toate ciclurile de chimioterapie",
      description: "6 cicluri R-CHOP conform planului de tratament",
      progress: 50,
      status: "În progres",
      dueDate: "30 Martie 2025",
      priority: "Înaltă",
      category: "Tratament",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Monitorizează simptomele zilnic",
      description: "Raportează simptomele în aplicație pentru 30 de zile",
      progress: 85,
      status: "În progres",
      dueDate: "31 Ianuarie 2025",
      priority: "Medie",
      category: "Monitorizare",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Participă la sesiunile de suport psihologic",
      description: "4 sesiuni cu psihologul oncologic",
      progress: 100,
      status: "Finalizat",
      dueDate: "15 Ianuarie 2025",
      priority: "Medie",
      category: "Suport",
      isCompleted: true,
    },
    {
      id: 4,
      title: "Menține greutatea corporală",
      description: "Evită pierderea în greutate > 5% din greutatea inițială",
      progress: 75,
      status: "În progres",
      dueDate: "Permanent",
      priority: "Înaltă",
      category: "Nutriție",
      isCompleted: false,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Înaltă":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medie":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Scăzută":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tratament":
        return "text-purple-600"
      case "Monitorizare":
        return "text-blue-600"
      case "Suport":
        return "text-green-600"
      case "Nutriție":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const completedObjectives = objectives.filter((obj) => obj.isCompleted).length
  const totalObjectives = objectives.length
  const overallProgress = Math.round((completedObjectives / totalObjectives) * 100)

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Obiective Personale
          </CardTitle>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Adaugă
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="h-6 w-6 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-900 dark:text-green-100">Progres General</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {completedObjectives} din {totalObjectives} obiective finalizate
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-700 dark:text-green-300">Progres total</span>
              <span className="font-medium text-green-900 dark:text-green-100">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </div>

        {/* Objectives List */}
        <div className="space-y-3">
          {objectives.map((objective) => (
            <div
              key={objective.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                objective.isCompleted
                  ? "border-green-200 bg-green-50 dark:bg-green-900/10"
                  : "border-gray-200 bg-white dark:bg-gray-800"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2">
                  {objective.isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4
                      className={`font-medium text-sm ${
                        objective.isCompleted
                          ? "text-green-900 dark:text-green-100 line-through"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {objective.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{objective.description}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-end">
                  <Badge variant="outline" className={getPriorityColor(objective.priority)}>
                    {objective.priority}
                  </Badge>
                  <span className={`text-xs font-medium ${getCategoryColor(objective.category)}`}>
                    {objective.category}
                  </span>
                </div>
              </div>

              {/* Progress */}
              {!objective.isCompleted && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progres</span>
                    <span className="font-medium">{objective.progress}%</span>
                  </div>
                  <Progress value={objective.progress} className="h-2" />
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Termen: {objective.dueDate}</span>
                <Badge
                  variant="outline"
                  className={objective.isCompleted ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                >
                  {objective.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="w-full">
              Vezi Toate
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Istoric Realizări
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
