"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, Calendar } from "lucide-react"
import { useMockConsultations } from "@/hooks/useMockConsultations"

interface ConsultationsCardProps {
  patientId: string
}

export function ConsultationsCard({ patientId }: ConsultationsCardProps) {
  const consultationsData = useMockConsultations(patientId)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completată</Badge>
      default:
        return <Badge variant="outline">Programată</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Istoric Consultații
          <Button size="sm" variant="outline" className="ml-auto">
            <Calendar className="h-4 w-4 mr-1" />
            Programează
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Statistici</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total consultații:</span>
                  <span className="font-medium">{consultationsData.stats.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ultima consultație:</span>
                  <span className="font-medium">{consultationsData.stats.lastConsultation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Următoarea:</span>
                  <span className="font-medium">{consultationsData.stats.nextConsultation}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Tipuri Consultații</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Oncologie:</span>
                  <span className="font-medium">{consultationsData.byType.oncology}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hematologie:</span>
                  <span className="font-medium">{consultationsData.byType.hematology}</span>
                </div>
                <div className="flex justify-between">
                  <span>Psihologie:</span>
                  <span className="font-medium">{consultationsData.byType.psychology}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Consultații Recente</h4>
            <div className="space-y-2">
              {consultationsData.recent.map((consultation) => (
                <div key={consultation.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{consultation.doctorName}</h5>
                    {getStatusBadge(consultation.status)}
                  </div>
                  <p className="text-sm text-gray-600">{consultation.description}</p>
                  <p className="text-xs text-gray-500">
                    {consultation.date}, {consultation.time} - {consultation.specialty}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
