"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, CheckCircle } from "lucide-react"

export function PatientObjectivesCard() {
  const objectives = [
    {
      title: "Hidratare zilnică",
      description: "Bea 2L apă pe zi",
      progress: 75,
      target: "2L",
      current: "1.5L",
      priority: "high",
    },
    {
      title: "Exerciții ușoare",
      description: "30 min plimbare",
      progress: 60,
      target: "30 min",
      current: "18 min",
      priority: "medium",
    },
    {
      title: "Somn odihnitor",
      description: "8 ore somn/noapte",
      progress: 90,
      target: "8h",
      current: "7.2h",
      priority: "high",
    },
  ]

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-green-600" />
          Obiective Personale
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {objectives.map((objective, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{objective.title}</h4>
                  <Badge
                    variant="outline"
                    className={
                      objective.priority === "high"
                        ? "border-red-200 text-red-700 bg-red-50"
                        : "border-yellow-200 text-yellow-700 bg-yellow-50"
                    }
                  >
                    {objective.priority === "high" ? "Prioritate" : "Normal"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{objective.description}</p>
              </div>
              {objective.progress >= 90 && <CheckCircle className="h-5 w-5 text-green-500 mt-1" />}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Progres: {objective.current} / {objective.target}
                </span>
                <span className="font-medium">{objective.progress}%</span>
              </div>
              <Progress value={objective.progress} className="h-2" />
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Adaugă Obiectiv
        </Button>
      </CardContent>
    </Card>
  )
}
