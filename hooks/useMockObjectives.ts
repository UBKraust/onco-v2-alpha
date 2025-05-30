"use client"

import { useMemo } from "react"

export interface Objective {
  id: string
  title: string
  description: string
  progress: number
  status: "completed" | "in-progress" | "planned" | "overdue"
  priority: "high" | "medium" | "low"
  dueDate: string
}

export interface ObjectivesData {
  completed: number
  total: number
  completionRate: number
  thisWeek: {
    completed: number
    inProgress: number
    planned: number
  }
  objectives: Objective[]
  dailyMotivation: string
}

export function useMockObjectives(patientId: string): ObjectivesData {
  return useMemo(
    () => ({
      completed: 7,
      total: 10,
      completionRate: 70,
      thisWeek: {
        completed: 2,
        inProgress: 3,
        planned: 1,
      },
      objectives: [
        {
          id: "1",
          title: "Completare ciclu 3 chimioterapie",
          description: "Finalizarea cu succes a celui de-al treilea ciclu",
          progress: 75,
          status: "in-progress",
          priority: "high",
          dueDate: "2024-11-15",
        },
        {
          id: "2",
          title: "Îmbunătățire calitate somn",
          description: "Dormit minim 7 ore pe noapte",
          progress: 60,
          status: "in-progress",
          priority: "medium",
          dueDate: "2024-11-20",
        },
        {
          id: "3",
          title: "Exerciții fizice regulate",
          description: "Plimbări zilnice de 30 minute",
          progress: 40,
          status: "in-progress",
          priority: "low",
          dueDate: "2024-11-25",
        },
        {
          id: "4",
          title: "Completare modul educațional",
          description: "Finalizarea modulului despre efecte secundare",
          progress: 100,
          status: "completed",
          priority: "medium",
          dueDate: "2024-11-05",
        },
      ],
      dailyMotivation: "Fiecare zi este o nouă oportunitate de a fi mai puternic decât ieri!",
    }),
    [patientId],
  )
}
