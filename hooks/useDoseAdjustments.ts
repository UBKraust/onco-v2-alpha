"use client"

import { useState } from "react"

interface DoseAdjustment {
  id: string
  date: string
  medication: string
  previousDose: number
  newDose: number
  adjustmentType: "reduction" | "increase" | "hold" | "discontinue"
  reason: string
  adverseEvents: string[]
  labValues: Record<string, number>
  approvedBy: string
  nextReview: string
  notes: string
}

const MOCK_ADJUSTMENTS: DoseAdjustment[] = [
  {
    id: "1",
    date: "2024-01-20",
    medication: "carboplatin",
    previousDose: 400,
    newDose: 300,
    adjustmentType: "reduction",
    reason: "Neutropenia Grade 3-4",
    adverseEvents: ["Neutropenia"],
    labValues: { neutrophils: 0.8, platelets: 150 },
    approvedBy: "Dr. Oncolog",
    nextReview: "2024-01-27",
    notes: "Reducere 25% din cauza neutropeniei severe",
  },
]

export function useDoseAdjustments() {
  const [adjustments, setAdjustments] = useState<DoseAdjustment[]>(MOCK_ADJUSTMENTS)

  const addAdjustment = (adjustment: DoseAdjustment) => {
    setAdjustments((prev) => [adjustment, ...prev])
  }

  const getAdjustmentsByMedication = (medication: string) => {
    return adjustments.filter((adj) => adj.medication === medication)
  }

  const getCurrentDose = (medication: string) => {
    const latest = adjustments
      .filter((adj) => adj.medication === medication)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

    return latest?.newDose || 0
  }

  const calculateRecommendedDose = (currentDose: number, adverseEvent: string, grade: number) => {
    let reductionFactor = 1

    if (adverseEvent.includes("Neutropenia")) {
      reductionFactor = grade >= 4 ? 0.5 : grade >= 3 ? 0.75 : 1
    } else if (adverseEvent.includes("Thrombocytopenia")) {
      reductionFactor = grade >= 4 ? 0.5 : grade >= 3 ? 0.75 : 1
    } else if (adverseEvent.includes("Neuropathy")) {
      reductionFactor = grade >= 3 ? 0.5 : grade >= 2 ? 0.75 : 1
    }

    return Math.round(currentDose * reductionFactor)
  }

  const getAdjustmentHistory = (medication: string) => {
    return adjustments
      .filter((adj) => adj.medication === medication)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getAdjustmentStats = () => {
    const total = adjustments.length
    const byType = adjustments.reduce(
      (acc, adj) => {
        acc[adj.adjustmentType] = (acc[adj.adjustmentType] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return { total, byType }
  }

  return {
    adjustments,
    addAdjustment,
    getAdjustmentsByMedication,
    getCurrentDose,
    calculateRecommendedDose,
    getAdjustmentHistory,
    getAdjustmentStats,
  }
}
