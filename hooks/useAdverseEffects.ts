"use client"

import { useState } from "react"

interface AdverseEffect {
  id: string
  category: string
  name: string
  grade: number
  severity: number
  impact: number
  startDate: string
  endDate?: string
  description: string
  interventions: string[]
  photos?: string[]
  relatedTreatment: string
}

const MOCK_ADVERSE_EFFECTS: AdverseEffect[] = [
  {
    id: "1",
    category: "gastrointestinal",
    name: "Nausea",
    grade: 2,
    severity: 6,
    impact: 7,
    startDate: "2024-01-15",
    description: "Greață moderată după administrarea chimioterapiei",
    interventions: ["Ondansetron 8mg", "Dietă ușoară"],
    relatedTreatment: "Ciclu 2 Carboplatin/Paclitaxel",
  },
  {
    id: "2",
    category: "hematologic",
    name: "Neutropenia",
    grade: 3,
    severity: 8,
    impact: 9,
    startDate: "2024-01-20",
    description: "Neutropenie grad 3, neutrofile 800/μL",
    interventions: ["G-CSF", "Monitorizare zilnică"],
    relatedTreatment: "Ciclu 2 Carboplatin/Paclitaxel",
  },
]

export function useAdverseEffects() {
  const [adverseEffects, setAdverseEffects] = useState<AdverseEffect[]>(MOCK_ADVERSE_EFFECTS)

  const addAdverseEffect = (effect: AdverseEffect) => {
    setAdverseEffects((prev) => [effect, ...prev])
  }

  const updateAdverseEffect = (id: string, updates: Partial<AdverseEffect>) => {
    setAdverseEffects((prev) => prev.map((effect) => (effect.id === id ? { ...effect, ...updates } : effect)))
  }

  const resolveAdverseEffect = (id: string, endDate: string) => {
    updateAdverseEffect(id, { endDate })
  }

  const getActiveEffects = () => {
    return adverseEffects.filter((effect) => !effect.endDate)
  }

  const getEffectsByCategory = (category: string) => {
    return adverseEffects.filter((effect) => effect.category === category)
  }

  const getSeverityStats = () => {
    const total = adverseEffects.length
    const byGrade = adverseEffects.reduce(
      (acc, effect) => {
        acc[effect.grade] = (acc[effect.grade] || 0) + 1
        return acc
      },
      {} as Record<number, number>,
    )

    return { total, byGrade }
  }

  return {
    adverseEffects,
    addAdverseEffect,
    updateAdverseEffect,
    resolveAdverseEffect,
    getActiveEffects,
    getEffectsByCategory,
    getSeverityStats,
  }
}
