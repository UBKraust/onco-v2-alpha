"use client"

import { useMemo } from "react"

export interface EducationModule {
  id: string
  title: string
  status: "completed" | "in-progress" | "available"
  progress?: number
}

export interface EducationData {
  progressPercentage: number
  completedModules: number
  totalModules: number
  availableResources: {
    videos: number
    guides: number
    webinars: number
  }
  recentModules: EducationModule[]
  achievements: string[]
}

export function useMockEducation(patientId: string): EducationData {
  return useMemo(
    () => ({
      progressPercentage: 68,
      completedModules: 8,
      totalModules: 12,
      availableResources: {
        videos: 15,
        guides: 8,
        webinars: 3,
      },
      recentModules: [
        {
          id: "1",
          title: "Înțelegerea chimioterapiei R-CHOP",
          status: "completed",
          progress: 100,
        },
        {
          id: "2",
          title: "Gestionarea efectelor adverse",
          status: "in-progress",
          progress: 75,
        },
        {
          id: "3",
          title: "Nutriție în timpul tratamentului",
          status: "in-progress",
          progress: 40,
        },
        {
          id: "4",
          title: "Exerciții fizice recomandate",
          status: "available",
        },
      ],
      achievements: ["Completare modul de bază", "Participare la webinar", "Quiz cu scor perfect"],
    }),
    [patientId],
  )
}
