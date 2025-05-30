"use client"

import { useState, useEffect } from "react"
import type { Symptom } from "@/types/medical-record"

export function useSymptomLog(patientId?: string) {
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "3months">("week")

  // Mock symptoms data
  const mockSymptoms: Symptom[] = [
    {
      id: "1",
      name: "Oboseală",
      severity: 6,
      date: "2024-01-24",
      time: "14:00",
      duration: "3 ore",
      category: "fatigue",
      notes: "Oboseală moderată după activitate fizică",
      isReported: true,
    },
    {
      id: "2",
      name: "Durere de cap",
      severity: 4,
      date: "2024-01-24",
      time: "10:30",
      duration: "2 ore",
      category: "pain",
      notes: "Durere ușoară, a trecut după odihnă",
      isReported: true,
    },
    {
      id: "3",
      name: "Greață",
      severity: 3,
      date: "2024-01-23",
      time: "18:00",
      duration: "30 minute",
      category: "nausea",
      notes: "Greață ușoară seara",
      isReported: true,
    },
    {
      id: "4",
      name: "Durere abdominală",
      severity: 5,
      date: "2024-01-22",
      time: "12:00",
      duration: "1 oră",
      category: "pain",
      notes: "Durere moderată după masă",
      isReported: true,
    },
    {
      id: "5",
      name: "Insomnie",
      severity: 7,
      date: "2024-01-21",
      time: "23:00",
      duration: "toată noaptea",
      category: "other",
      notes: "Dificultăți în adormire",
      isReported: true,
    },
  ]

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setSymptoms(mockSymptoms)
        setError(null)
      } catch (err) {
        setError("Failed to fetch symptoms")
      } finally {
        setLoading(false)
      }
    }

    fetchSymptoms()
  }, [patientId])

  const getFilteredSymptoms = () => {
    const now = new Date()
    const cutoffDate = new Date()

    switch (selectedPeriod) {
      case "week":
        cutoffDate.setDate(now.getDate() - 7)
        break
      case "month":
        cutoffDate.setMonth(now.getMonth() - 1)
        break
      case "3months":
        cutoffDate.setMonth(now.getMonth() - 3)
        break
    }

    return symptoms.filter((symptom) => new Date(symptom.date) >= cutoffDate)
  }

  const getSymptomsByCategory = (category: string) => {
    return symptoms.filter((symptom) => symptom.category === category)
  }

  const getSymptomsSeverityAverage = (category?: string) => {
    const filteredSymptoms = category ? getSymptomsByCategory(category) : symptoms
    if (filteredSymptoms.length === 0) return 0

    const total = filteredSymptoms.reduce((sum, symptom) => sum + symptom.severity, 0)
    return Math.round((total / filteredSymptoms.length) * 10) / 10
  }

  const getRecentSymptoms = (days = 7) => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    return symptoms.filter((symptom) => new Date(symptom.date) >= cutoffDate)
  }

  const getSymptomTrends = () => {
    const categories = ["pain", "fatigue", "nausea", "other"]
    return categories.map((category) => {
      const categorySymptoms = getSymptomsByCategory(category)
      const recentSymptoms = categorySymptoms.filter((symptom) => {
        const symptomDate = new Date(symptom.date)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return symptomDate >= weekAgo
      })

      return {
        category,
        count: recentSymptoms.length,
        averageSeverity: getSymptomsSeverityAverage(category),
        trend: recentSymptoms.length > 0 ? "increasing" : "stable",
      }
    })
  }

  const addSymptom = (symptom: Omit<Symptom, "id" | "isReported">) => {
    const newSymptom: Symptom = {
      ...symptom,
      id: Date.now().toString(),
      isReported: true,
    }
    setSymptoms((prev) => [newSymptom, ...prev])
  }

  const updateSymptom = (symptomId: string, updates: Partial<Symptom>) => {
    setSymptoms((prev) => prev.map((symptom) => (symptom.id === symptomId ? { ...symptom, ...updates } : symptom)))
  }

  const deleteSymptom = (symptomId: string) => {
    setSymptoms((prev) => prev.filter((symptom) => symptom.id !== symptomId))
  }

  return {
    symptoms: getFilteredSymptoms(),
    allSymptoms: symptoms,
    loading,
    error,
    selectedPeriod,
    setSelectedPeriod,
    getSymptomsByCategory,
    getSymptomsSeverityAverage,
    getRecentSymptoms,
    getSymptomTrends,
    addSymptom,
    updateSymptom,
    deleteSymptom,
  }
}
