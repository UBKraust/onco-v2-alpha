"use client"

import { useState, useEffect } from "react"
import type { TreatmentPlan, Medication } from "@/types/medical-record"

export function useTreatmentHistory(patientId?: string) {
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([])
  const [medications, setMedications] = useState<Medication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock treatment plans data
  const mockTreatmentPlans: TreatmentPlan[] = [
    {
      id: "1",
      name: "Protocol Chimioterapie CHOP",
      type: "chemotherapy",
      startDate: "2023-12-05",
      doctor: "Dr. Elena Oncolog",
      hospital: "Clinica Oncologică Centrală",
      description: "Ciclu de 6 ședințe de chimioterapie CHOP la interval de 21 de zile",
      status: "active",
      cycles: 6,
      currentCycle: 2,
      nextAppointment: "2024-02-15",
      notes: "Pacientul tolerează bine tratamentul. Continuă conform planului.",
    },
    {
      id: "2",
      name: "Radioterapie Adjuvantă",
      type: "radiotherapy",
      startDate: "2024-03-01",
      endDate: "2024-04-15",
      doctor: "Dr. Maria Radiolog",
      hospital: "Centrul de Radioterapie",
      description: "25 de ședințe de radioterapie externă",
      status: "completed",
      notes: "Tratament finalizat cu succes. Fără complicații majore.",
    },
  ]

  // Mock medications data
  const mockMedications: Medication[] = [
    {
      id: "1",
      name: "Tamoxifen",
      dosage: "20mg",
      frequency: "1 dată pe zi",
      startDate: "2023-11-15",
      prescribedBy: "Dr. Elena Oncolog",
      status: "active",
      instructions: "Se administrează dimineața, pe stomacul gol",
    },
    {
      id: "2",
      name: "Acid Folic",
      dosage: "5mg",
      frequency: "3 ori pe săptămână",
      startDate: "2023-11-20",
      prescribedBy: "Dr. Elena Oncolog",
      status: "active",
      instructions: "Luni, Miercuri, Vineri",
    },
    {
      id: "3",
      name: "Omeprazol",
      dosage: "20mg",
      frequency: "1 dată pe zi",
      startDate: "2023-11-15",
      endDate: "2024-02-15",
      prescribedBy: "Dr. Radu Internist",
      status: "completed",
      instructions: "Cu 30 minute înainte de masă",
    },
  ]

  useEffect(() => {
    const fetchTreatmentHistory = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setTreatmentPlans(mockTreatmentPlans)
        setMedications(mockMedications)
        setError(null)
      } catch (err) {
        setError("Failed to fetch treatment history")
      } finally {
        setLoading(false)
      }
    }

    fetchTreatmentHistory()
  }, [patientId])

  const getActiveTreatments = () => {
    return treatmentPlans.filter((plan) => plan.status === "active")
  }

  const getActiveMedications = () => {
    return medications.filter((med) => med.status === "active")
  }

  const getCompletedTreatments = () => {
    return treatmentPlans.filter((plan) => plan.status === "completed")
  }

  const getTreatmentProgress = (treatmentId: string) => {
    const treatment = treatmentPlans.find((plan) => plan.id === treatmentId)
    if (!treatment || !treatment.cycles || !treatment.currentCycle) return 0
    return Math.round((treatment.currentCycle / treatment.cycles) * 100)
  }

  const addTreatmentPlan = (plan: Omit<TreatmentPlan, "id">) => {
    const newPlan: TreatmentPlan = {
      ...plan,
      id: Date.now().toString(),
    }
    setTreatmentPlans((prev) => [newPlan, ...prev])
  }

  const updateTreatmentPlan = (planId: string, updates: Partial<TreatmentPlan>) => {
    setTreatmentPlans((prev) => prev.map((plan) => (plan.id === planId ? { ...plan, ...updates } : plan)))
  }

  const addMedication = (medication: Omit<Medication, "id">) => {
    const newMedication: Medication = {
      ...medication,
      id: Date.now().toString(),
    }
    setMedications((prev) => [newMedication, ...prev])
  }

  const updateMedication = (medicationId: string, updates: Partial<Medication>) => {
    setMedications((prev) => prev.map((med) => (med.id === medicationId ? { ...med, ...updates } : med)))
  }

  return {
    treatmentPlans,
    medications,
    loading,
    error,
    getActiveTreatments,
    getActiveMedications,
    getCompletedTreatments,
    getTreatmentProgress,
    addTreatmentPlan,
    updateTreatmentPlan,
    addMedication,
    updateMedication,
  }
}
