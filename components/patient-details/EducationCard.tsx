"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Plus, Video, FileText, Globe, CheckCircle, Clock } from "lucide-react"
import { useMockEducation } from "@/hooks/useMockEducation"

interface EducationCardProps {
  patientId: string
}

export function EducationCard({ patientId }: EducationCardProps) {
  const educationData = useMockEducation(patientId)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-orange-500" />
      default:
        return <BookOpen className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completat"
      case "in-progress":
        return "În progres"
      default:
        return "Disponibil"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Educație
          <Button size="sm" variant="outline" className="ml-auto">
            <Plus className="h-4 w-4 mr-1" />
            Adaugă Resursă
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Progres Educațional</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Module completate</span>
                  <span className="font-medium">
                    {educationData.completedModules}/{educationData.totalModules}
                  </span>
                </div>
                <Progress value={educationData.progressPercentage} className="h-2" />
                <p className="text-xs text-purple-600">{educationData.progressPercentage}% progres total</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Resurse Disponibile</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Video className="h-3 w-3 text-blue-500" />
                  <span>{educationData.availableResources.videos} video-uri educaționale</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-3 w-3 text-blue-500" />
                  <span>{educationData.availableResources.guides} ghiduri PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3 text-blue-500" />
                  <span>Resurse online</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Module Recente</h4>
            <div className="space-y-2">
              {educationData.recentModules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(module.status)}
                    <span className="text-sm">{module.title}</span>
                  </div>
                  <span className="text-xs text-gray-600">{getStatusText(module.status)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
