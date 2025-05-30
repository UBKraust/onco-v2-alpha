"use client"

import { useMemo } from "react"

export interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "appointment" | "treatment" | "test" | "reminder"
  status: "scheduled" | "completed" | "cancelled"
  location?: string
  provider?: string
  notes?: string
}

export interface CalendarData {
  currentMonth: {
    month: string
    year: number
    events: CalendarEvent[]
  }
  nextMonth: {
    month: string
    year: number
    events: CalendarEvent[]
  }
  upcomingEvents: CalendarEvent[]
  pastEvents: CalendarEvent[]
  reminders: Array<{
    id: string
    title: string
    time: string
    type: "medication" | "appointment" | "test"
  }>
  stats: {
    totalAppointments: number
    completedAppointments: number
    upcomingAppointments: number
    missedAppointments: number
  }
}

export function useMockCalendar(patientId: string): CalendarData | null {
  return useMemo(() => {
    if (!patientId || !["1", "2"].includes(patientId)) {
      return null
    }

    return {
      currentMonth: {
        month: "Noiembrie",
        year: 2024,
        events: [
          {
            id: "1",
            title: "Consultație oncologie",
            date: "2024-11-15",
            time: "10:00",
            type: "appointment",
            status: "scheduled",
            location: "Cabinet Dr. Popescu",
            provider: "Dr. Maria Popescu",
          },
          {
            id: "2",
            title: "Analize sanguine",
            date: "2024-11-18",
            time: "08:00",
            type: "test",
            status: "scheduled",
            location: "Laborator Synevo",
          },
        ],
      },
      nextMonth: {
        month: "Decembrie",
        year: 2024,
        events: [
          {
            id: "3",
            title: "Ciclu 4 R-CHOP",
            date: "2024-12-02",
            time: "09:00",
            type: "treatment",
            status: "scheduled",
            location: "Spital Oncologic",
          },
        ],
      },
      upcomingEvents: [
        {
          id: "1",
          title: "Consultație oncologie",
          date: "2024-11-15",
          time: "10:00",
          type: "appointment",
          status: "scheduled",
          location: "Cabinet Dr. Popescu",
          provider: "Dr. Maria Popescu",
        },
        {
          id: "2",
          title: "Analize sanguine",
          date: "2024-11-18",
          time: "08:00",
          type: "test",
          status: "scheduled",
          location: "Laborator Synevo",
        },
      ],
      pastEvents: [
        {
          id: "4",
          title: "Ciclu 3 R-CHOP",
          date: "2024-11-01",
          time: "09:00",
          type: "treatment",
          status: "completed",
          location: "Spital Oncologic",
        },
      ],
      reminders: [
        {
          id: "r1",
          title: "Luare Ondansetron",
          time: "08:00",
          type: "medication",
        },
        {
          id: "r2",
          title: "Consultație mâine",
          time: "20:00",
          type: "appointment",
        },
      ],
      stats: {
        totalAppointments: 25,
        completedAppointments: 20,
        upcomingAppointments: 3,
        missedAppointments: 2,
      },
    }
  }, [patientId])
}
