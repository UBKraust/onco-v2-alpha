"use client"

import { useMemo } from "react"

export interface Biomarker {
  name: string
  value: number
  unit: string
  normalRange: string
  status: "normal" | "warning" | "critical"
  trend: "up" | "down" | "stable"
  lastUpdated: string
}

export interface RecentTest {
  date: string
  type: string
  status: "completed" | "pending"
}

export interface BiomarkersData {
  biomarkers: Biomarker[]
  recentTests: RecentTest[]
  nextTestDate: string
  criticalCount: number
}

export function useMockBiomarkers(patientId: string): BiomarkersData {
  return useMemo(
    () => ({
      biomarkers: [
        {
          name: "Hemoglobină",
          value: 7.2,
          unit: "g/dL",
          normalRange: "12-15",
          status: "critical",
          trend: "down",
          lastUpdated: "10.11.2024",
        },
        {
          name: "Leucocite",
          value: 2.1,
          unit: "x10³/μL",
          normalRange: "4-10",
          status: "warning",
          trend: "down",
          lastUpdated: "10.11.2024",
        },
        {
          name: "Trombocite",
          value: 180,
          unit: "x10³/μL",
          normalRange: "150-450",
          status: "normal",
          trend: "stable",
          lastUpdated: "10.11.2024",
        },
        {
          name: "Creatinină",
          value: 1.1,
          unit: "mg/dL",
          normalRange: "0.6-1.2",
          status: "normal",
          trend: "stable",
          lastUpdated: "10.11.2024",
        },
      ],
      recentTests: [
        {
          date: "10.11.2024",
          type: "Hemoleucogramă completă",
          status: "completed",
        },
        {
          date: "08.11.2024",
          type: "Biochimie sanguină",
          status: "completed",
        },
        {
          date: "12.11.2024",
          type: "Markeri tumorali",
          status: "pending",
        },
      ],
      nextTestDate: "15.11.2024",
      criticalCount: 1,
    }),
    [patientId],
  )
}
