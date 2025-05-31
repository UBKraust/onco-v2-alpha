"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Phone, FileText, AlertTriangle } from "lucide-react"
import type { PatientListItem } from "@/hooks/usePatientList"
import { useAlertsForPatient } from "@/hooks/useAlertsForPatient"
import { AlertCard } from "./alert-card"

interface PatientCardProps {
  patient: PatientListItem
  onSelectPatient: (patientId: string) => void
  onPhoneCall: (patientId: string) => void
  onSendMessage: (patientId: string) => void
}

export function PatientCard({ patient, onSelectPatient, onPhoneCall, onSendMessage }: PatientCardProps) {
  const { getAlertsForPatient } = useAlertsForPatient(patient.id)
  const patientAlerts = getAlertsForPatient(patient.id)

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getRiskLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case "critical":
        return "CRITIC"
      case "high":
        return "RISC ÎNALT"
      case "medium":
        return "RISC MEDIU"
      case "low":
        return "RISC SCĂZUT"
      default:
        return riskLevel.toUpperCase()
    }
  }

  const getAdherenceColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400"
    if (score >= 80) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <Card className="bg-white dark:bg-gray-900 shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={patient.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {patient.firstName[0]}
                {patient.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {patient.firstName} {patient.lastName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {patient.age} ani • {patient.diagnosis}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getRiskColor(patient.riskLevel)}>{getRiskLabel(patient.riskLevel)}</Badge>
            {patientAlerts.length > 0 && (
              <Badge variant="destructive" className="text-xs">
                {patientAlerts.length} alertă
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Informații medicale */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Stadiu</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{patient.stage}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Faza tratament</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{patient.treatmentPhase}</p>
          </div>
        </div>

        {/* Aderență */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Aderență tratament</span>
            <span className={`text-sm font-semibold ${getAdherenceColor(patient.adherenceScore)}`}>
              {patient.adherenceScore}%
            </span>
          </div>
          <Progress value={patient.adherenceScore} className="h-2" />
        </div>

        {/* Alerte active */}
        {patientAlerts.length > 0 && (
          <div className="space-y-2">
            {patientAlerts.slice(0, 2).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        )}

        {/* Informații contact */}
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div>
            <p>Ultimul contact</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {new Date(patient.lastContact).toLocaleDateString("ro-RO")}
            </p>
          </div>
          {patient.nextAppointment && (
            <div>
              <p>Următoarea programare</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {new Date(patient.nextAppointment).toLocaleDateString("ro-RO")}
              </p>
            </div>
          )}
        </div>

        {/* Medic primar */}
        <div className="text-xs">
          <p className="text-gray-600 dark:text-gray-400">Medic primar</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">{patient.primaryPhysician}</p>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            {patient.unreadMessages > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{patient.unreadMessages} mesaje</span>
              </div>
            )}
            {patient.activeAlerts > 0 && (
              <div className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 text-red-500" />
                <span>{patient.activeAlerts} alerte</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onSelectPatient(patient.id)
              }}
              className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900"
            >
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onSendMessage(patient.id)
              }}
              className="h-8 w-8 p-0 hover:bg-green-50 dark:hover:bg-green-900"
            >
              <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onPhoneCall(patient.id)
              }}
              className="h-8 w-8 p-0 hover:bg-orange-50 dark:hover:bg-orange-900"
            >
              <Phone className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
