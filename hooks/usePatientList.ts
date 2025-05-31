"use client"

import { useState } from "react"

export interface PatientListItem {
  id: string
  firstName: string
  lastName: string
  age: number
  diagnosis: string
  stage: string
  riskLevel: "critical" | "high" | "medium" | "low"
  adherenceScore: number
  lastContact: string
  nextAppointment?: string
  primaryPhysician: string
  treatmentPhase: string
  unreadMessages: number
  activeAlerts: number
  recentSymptoms: string
  avatar?: string
}

export interface PatientMetrics {
  total: number
  averageAdherence: string
  activeAlerts: number
  unreadMessages: number
  criticalPatients: number
  highPriorityPatients: number
  recentContactPatients: number
}

const mockPatients: PatientListItem[] = [
  {
    id: "1",
    firstName: "Maria",
    lastName: "Popescu",
    age: 58,
    diagnosis: "Cancer de sân",
    stage: "II",
    riskLevel: "critical",
    adherenceScore: 65,
    lastContact: "2024-01-10",
    nextAppointment: "2024-01-15",
    primaryPhysician: "Dr. Ionescu",
    treatmentPhase: "Chimioterapie",
    unreadMessages: 3,
    activeAlerts: 2,
    recentSymptoms: "Oboseală, greață",
  },
  {
    id: "2",
    firstName: "Ion",
    lastName: "Marinescu",
    age: 62,
    diagnosis: "Cancer pulmonar",
    stage: "IIIA",
    riskLevel: "high",
    adherenceScore: 78,
    lastContact: "2024-01-11",
    nextAppointment: "2024-01-18",
    primaryPhysician: "Dr. Vasilescu",
    treatmentPhase: "Radioterapie",
    unreadMessages: 1,
    activeAlerts: 1,
    recentSymptoms: "Tuse uscată",
  },
  {
    id: "3",
    firstName: "Elena",
    lastName: "Georgescu",
    age: 45,
    diagnosis: "Cancer ovarian",
    stage: "I",
    riskLevel: "medium",
    adherenceScore: 92,
    lastContact: "2024-01-12",
    nextAppointment: "2024-01-20",
    primaryPhysician: "Dr. Popescu",
    treatmentPhase: "Post-operatoriu",
    unreadMessages: 0,
    activeAlerts: 0,
    recentSymptoms: "Fără simptome",
  },
  {
    id: "4",
    firstName: "Gheorghe",
    lastName: "Stanescu",
    age: 71,
    diagnosis: "Cancer de prostată",
    stage: "II",
    riskLevel: "low",
    adherenceScore: 88,
    lastContact: "2024-01-09",
    nextAppointment: "2024-01-25",
    primaryPhysician: "Dr. Munteanu",
    treatmentPhase: "Hormonoterapie",
    unreadMessages: 2,
    activeAlerts: 0,
    recentSymptoms: "Discomfort minim",
  },
]

export function usePatientList() {
  const [patients] = useState<PatientListItem[]>(mockPatients)

  const getById = (id: string): PatientListItem | undefined => {
    return patients.find((patient) => patient.id === id)
  }

  const getSummaryMetrics = (): PatientMetrics => {
    const total = patients.length
    const averageAdherence = Math.round(patients.reduce((sum, p) => sum + p.adherenceScore, 0) / total)
    const activeAlerts = patients.reduce((sum, p) => sum + p.activeAlerts, 0)
    const unreadMessages = patients.reduce((sum, p) => sum + p.unreadMessages, 0)
    const criticalPatients = patients.filter((p) => p.riskLevel === "critical").length
    const highPriorityPatients = patients.filter((p) => p.riskLevel === "high").length

    // Pacienți contactați în ultimele 24 ore
    const today = new Date()
    const recentContactPatients = patients.filter((p) => {
      const lastContact = new Date(p.lastContact)
      const diffTime = Math.abs(today.getTime() - lastContact.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 1
    }).length

    return {
      total,
      averageAdherence: `${averageAdherence}%`,
      activeAlerts,
      unreadMessages,
      criticalPatients,
      highPriorityPatients,
      recentContactPatients,
    }
  }

  const getPatientsByFilter = (filter: string): PatientListItem[] => {
    switch (filter) {
      case "critical":
        return patients.filter((p) => p.riskLevel === "critical")
      case "high-priority":
        return patients.filter((p) => p.riskLevel === "high")
      case "recent-contact":
        const today = new Date()
        return patients.filter((p) => {
          const lastContact = new Date(p.lastContact)
          const diffTime = Math.abs(today.getTime() - lastContact.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          return diffDays <= 1
        })
      default:
        return patients
    }
  }

  return {
    patients,
    getById,
    getSummaryMetrics,
    getPatientsByFilter,
  }
}
