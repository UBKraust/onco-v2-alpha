"use client"

import { useState, useCallback } from "react"
import type { PatientStatus } from "@/types/patient-status"

interface StatusHistoryItem {
  id: string
  status: PatientStatus
  previousStatus?: PatientStatus
  date: string
  updatedBy: string
  note?: string
}

interface UsePatientStatusReturn {
  currentStatus: PatientStatus
  statusHistory: StatusHistoryItem[]
  updateStatus: (newStatus: PatientStatus, note?: string) => Promise<void>
  isLoading: boolean
}

export function usePatientStatus(
  patientId: string,
  initialStatus: PatientStatus = "pre-treatment",
): UsePatientStatusReturn {
  const [currentStatus, setCurrentStatus] = useState<PatientStatus>(initialStatus)
  const [statusHistory, setStatusHistory] = useState<StatusHistoryItem[]>([
    {
      id: "1",
      status: initialStatus,
      date: new Date().toISOString(),
      updatedBy: "Ana Ionescu",
      note: "Status inițial la înregistrarea pacientului",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const updateStatus = useCallback(
    async (newStatus: PatientStatus, note?: string) => {
      if (newStatus === currentStatus) return

      setIsLoading(true)

      try {
        // Simulăm un API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const newHistoryItem: StatusHistoryItem = {
          id: Date.now().toString(),
          status: newStatus,
          previousStatus: currentStatus,
          date: new Date().toISOString(),
          updatedBy: "Ana Ionescu", // În implementarea reală, ar veni din context-ul utilizatorului
          note,
        }

        setStatusHistory((prev) => [newHistoryItem, ...prev])
        setCurrentStatus(newStatus)
      } catch (error) {
        throw new Error("Nu s-a putut actualiza statusul")
      } finally {
        setIsLoading(false)
      }
    },
    [currentStatus],
  )

  return {
    currentStatus,
    statusHistory,
    updateStatus,
    isLoading,
  }
}
