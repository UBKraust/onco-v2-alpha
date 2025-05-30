"use client"

import { useMemo } from "react"

export interface ComplianceDetail {
  category: string
  score: number
  lastUpdate: string
}

export interface AIRecommendation {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  category: string
}

export interface ComplianceData {
  overallScore: number
  aiPredictions: {
    abandonmentRisk: number
    treatmentSuccess: number
  }
  details: ComplianceDetail[]
  recommendations: AIRecommendation[]
}

export function useMockCompliance(patientId: string): ComplianceData {
  return useMemo(
    () => ({
      overallScore: 85,
      aiPredictions: {
        abandonmentRisk: 15,
        treatmentSuccess: 78,
      },
      details: [
        {
          category: "Medicație",
          score: 92,
          lastUpdate: "2024-11-10",
        },
        {
          category: "Programări",
          score: 88,
          lastUpdate: "2024-11-09",
        },
        {
          category: "Analize",
          score: 75,
          lastUpdate: "2024-11-08",
        },
        {
          category: "Raportare simptome",
          score: 90,
          lastUpdate: "2024-11-10",
        },
      ],
      recommendations: [
        {
          id: "1",
          title: "Îmbunătățire aderență analize",
          description: "Programează analize săptămânale pentru monitorizare",
          priority: "high",
          category: "medical",
        },
        {
          id: "2",
          title: "Suport psihologic",
          description: "Recomandăm consiliere pentru gestionarea anxietății",
          priority: "medium",
          category: "psychological",
        },
        {
          id: "3",
          title: "Exerciții fizice",
          description: "Adaugă 30 min de mers pe jos zilnic",
          priority: "low",
          category: "lifestyle",
        },
      ],
    }),
    [patientId],
  )
}
