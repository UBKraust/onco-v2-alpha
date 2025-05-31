"use client"

import { AlertTriangle, Info, Clock } from "lucide-react"
import type { PatientAlert } from "@/hooks/useAlertsForPatient"

interface AlertCardProps {
  alert: PatientAlert
}

export function AlertCard({ alert }: AlertCardProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-3 w-3 text-red-500" />
      case "warning":
        return <Clock className="h-3 w-3 text-orange-500" />
      case "info":
        return <Info className="h-3 w-3 text-blue-500" />
      default:
        return <Info className="h-3 w-3 text-gray-500" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
      case "warning":
        return "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-200"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
    }
  }

  return (
    <div className={`p-2 rounded-md border text-xs ${getAlertColor(alert.type)}`}>
      <div className="flex items-center gap-2">
        {getAlertIcon(alert.type)}
        <span className="font-medium">{alert.message}</span>
      </div>
      <p className="text-xs opacity-75 mt-1">{new Date(alert.date).toLocaleDateString("ro-RO")}</p>
    </div>
  )
}
