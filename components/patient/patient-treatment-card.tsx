"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Pill, Calendar, Clock } from "lucide-react"

interface Treatment {
  name: string
  cycle: string
  progress: number
  status: string
}

interface PatientTreatmentCardProps {
  treatment: Treatment
}

export function PatientTreatmentCard({ treatment }: PatientTreatmentCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5 text-blue-600" />
          Tratament Activ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{treatment.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Ciclul {treatment.cycle}</p>
          </div>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            {treatment.status}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progres tratament</span>
            <span className="font-medium">{treatment.progress}%</span>
          </div>
          <Progress value={treatment.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Următoarea doză</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">Mâine, 09:00</p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Durata rămasă</span>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300">12 săptămâni</p>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          Vezi Detalii Tratament
        </Button>
      </CardContent>
    </Card>
  )
}
