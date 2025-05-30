"use client"

import { useMemo } from "react"

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: "treatment" | "consultation" | "test" | "milestone"
  status: "completed" | "current" | "upcoming"
}

export interface TimelineStats {
  treatmentProgress: number
  daysInTreatment: number
  cyclesRemaining: number
  nextMilestone: string
}

export interface TimelineData {
  events: TimelineEvent[]
  stats: TimelineStats
  totalEvents: number
}

export function useMockTimeline(patientId: string): TimelineData {
  return useMemo(
    () => ({
      events: [
        {
          id: "1",
          date: "15.09.2024",
          title: "Diagnostic confirmat",
          description: "Limfom difuz cu celule B mari, stadiul II",
          type: "milestone",
          status: "completed",
        },
        {
          id: "2",
          date: "20.09.2024",
          title: "Început tratament R-CHOP",
          description: "Prima administrare de chimioterapie",
          type: "treatment",
          status: "completed",
        },
        {
          id: "3",
          date: "11.10.2024",
          title: "Ciclu 2 R-CHOP",
          description: "A doua administrare, toleranță bună",
          type: "treatment",
          status: "completed",
        },
        {
          id: "4",
          date: "01.11.2024",
          title: "Ciclu 3 R-CHOP",
          description: "În curs de desfășurare",
          type: "treatment",
          status: "current",
        },
        {
          id: "5",
          date: "22.11.2024",
          title: "Ciclu 4 R-CHOP",
          description: "Programat pentru următoarea administrare",
          type: "treatment",
          status: "upcoming",
        },
      ],
      stats: {
        treatmentProgress: 50,
        daysInTreatment: 57,
        cyclesRemaining: 3,
        nextMilestone: "Evaluare intermediară",
      },
      totalEvents: 12,
    }),
    [patientId],
  )
}
