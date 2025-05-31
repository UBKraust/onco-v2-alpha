"use client"

import { useState } from "react"

export interface PatientAlert {
  id: string
  patientId: string
  type: "critical" | "warning" | "info"
  message: string
  date: string
  isResolved: boolean
}

const mockAlerts: PatientAlert[] = [
  {
    id: "alert-1",
    patientId: "1",
    type: "critical",
    message: "Aderență scăzută la tratament",
    date: "2024-01-12",
    isResolved: false,
  },
  {
    id: "alert-2",
    patientId: "1",
    type: "warning",
    message: "Programare ratată",
    date: "2024-01-10",
    isResolved: false,
  },
  {
    id: "alert-3",
    patientId: "2",
    type: "warning",
    message: "Efecte adverse raportate",
    date: "2024-01-11",
    isResolved: false,
  },
]

export function useAlertsForPatient(patientId: string) {
  const [alerts] = useState<PatientAlert[]>(mockAlerts)

  const getAlertsForPatient = (id: string): PatientAlert[] => {
    return alerts.filter((alert) => alert.patientId === id && !alert.isResolved)
  }

  return {
    getAlertsForPatient,
  }
}
