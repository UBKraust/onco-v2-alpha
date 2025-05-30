"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, MessageSquare, Users, Heart } from "lucide-react"
import { useMockPsychological } from "@/hooks/useMockPsychological"

interface PsychologicalCardProps {
  patientId: string
}

export function PsychologicalCard({ patientId }: PsychologicalCardProps) {
  const psychData = useMockPsychological(patientId)

  const getAssessmentBadge = (level: string) => {
    switch (level) {
      case "minimal":
        return <Badge className="bg-green-100 text-green-800">Minimă</Badge>
      case "moderate":
        return <Badge className="bg-yellow-100 text-yellow-800">Moderată</Badge>
      case "severe":
        return <Badge className="bg-red-100 text-red-800">Severă</Badge>
      case "stable":
        return <Badge className="bg-green-100 text-green-800">Stabilă</Badge>
      case "improving":
        return <Badge className="bg-blue-100 text-blue-800">În îmbunătățire</Badge>
      default:
        return <Badge className="bg-red-100 text-red-800">Îngrijorătoare</Badge>
    }
  }

  const getSupportIcon = (support: string) => {
    if (support.includes("Grup")) return <Users className="h-3 w-3 text-blue-500" />
    if (support.includes("Consiliere")) return <MessageSquare className="h-3 w-3 text-blue-500" />
    return <Heart className="h-3 w-3 text-blue-500" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Status Psihologic
          <Button size="sm" variant="outline" className="ml-auto">
            <MessageSquare className="h-4 w-4 mr-1" />
            Consultație
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Evaluare Curentă</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Stare generală:</span>
                  {getAssessmentBadge(psychData.currentAssessment.generalState)}
                </div>
                <div className="flex justify-between text-sm">
                  <span>Anxietate:</span>
                  {getAssessmentBadge(psychData.currentAssessment.anxiety)}
                </div>
                <div className="flex justify-between text-sm">
                  <span>Depresie:</span>
                  {getAssessmentBadge(psychData.currentAssessment.depression)}
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Suport Disponibil</h4>
              <div className="space-y-1 text-sm">
                {psychData.supportAvailable.map((support, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {getSupportIcon(support)}
                    <span>{support}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Sesiuni Recente</h4>
            <div className="space-y-2">
              {psychData.recentSessions.map((session) => (
                <div key={session.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{session.type}</span>
                    <span className="text-xs text-gray-500">{session.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{session.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
