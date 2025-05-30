"use client"

import { useMemo } from "react"

export interface Consultation {
  id: string
  date: string
  time: string
  doctorName: string
  specialty: string
  description: string
  status: "completed" | "scheduled" | "cancelled"
  notes?: string
}

export interface ConsultationStats {
  total: number
  lastConsultation: string
  nextConsultation: string
  averageRating: number
}

export interface ConsultationsByType {
  oncology: number
  hematology: number
  psychology: number
  nutrition: number
}

export interface ConsultationsData {
  recent: Consultation[]
  stats: ConsultationStats
  byType: ConsultationsByType
  upcomingCount: number
}

export function useMockConsultations(patientId: string): ConsultationsData {
  return useMemo(
    () => ({
      recent: [
        {
          id: "1",
          date: "10.11.2024",
          time: "10:00",
          doctorName: "Dr. Maria Popescu",
          specialty: "Oncologie",
          description: "Evaluare post-chimioterapie ciclu 3",
          status: "completed",
          notes: "Toleranță bună, continuăm protocolul",
        },
        {
          id: "2",
          date: "05.11.2024",
          time: "14:30",
          doctorName: "Dr. Ana Ionescu",
          specialty: "Hematologie",
          description: "Analiză rezultate hemoleucogramă",
          status: "completed",
          notes: "Anemie ușoară, monitorizare",
        },
        {
          id: "3",
          date: "15.11.2024",
          time: "11:00",
          doctorName: "Psih. Elena Radu",
          specialty: "Psihologie",
          description: "Sesiune de consiliere psihologică",
          status: "scheduled",
        },
      ],
      stats: {
        total: 18,
        lastConsultation: "10.11.2024",
        nextConsultation: "15.11.2024",
        averageRating: 4.8,
      },
      byType: {
        oncology: 8,
        hematology: 6,
        psychology: 3,
        nutrition: 1,
      },
      upcomingCount: 2,
    }),
    [patientId],
  )
}
