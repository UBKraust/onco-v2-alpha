"use client"

import { useState, useCallback } from "react"
import type { Navigator, PatientAlert, NavigatorTask, PatientSummary, PerformanceMetrics } from "@/types/navigator"

// Enhanced mock data with more realistic alerts
const mockPatientSummaries: PatientSummary[] = [
  {
    id: "1",
    firstName: "Maria",
    lastName: "Popescu",
    age: 45,
    diagnosis: "Limfom Non-Hodgkin",
    stage: "III",
    riskLevel: "high",
    lastContact: "2024-11-11 14:30",
    nextAppointment: "2024-11-12 10:00",
    adherenceScore: 85,
    recentSymptoms: 3,
    unreadMessages: 2,
    activeAlerts: 1,
    treatmentPhase: "Chimioterapie Activă",
    navigator: "Ana Ionescu",
    primaryPhysician: "Dr. Emily Carter",
    emergencyContact: {
      name: "Ion Popescu",
      phone: "+40 123 456 790",
      relationship: "Soț",
    },
  },
  {
    id: "2",
    firstName: "Ion",
    lastName: "Georgescu",
    age: 58,
    diagnosis: "Cancer de Prostată",
    stage: "II",
    riskLevel: "medium",
    lastContact: "2024-11-10 16:45",
    nextAppointment: "2024-11-13 14:00",
    adherenceScore: 92,
    recentSymptoms: 1,
    unreadMessages: 0,
    activeAlerts: 0,
    treatmentPhase: "Radioterapie",
    navigator: "Ana Ionescu",
    primaryPhysician: "Dr. Sarah Johnson",
    emergencyContact: {
      name: "Elena Georgescu",
      phone: "+40 123 456 791",
      relationship: "Soție",
    },
  },
  {
    id: "3",
    firstName: "Ana",
    lastName: "Dumitrescu",
    age: 62,
    diagnosis: "Cancer de Sân",
    stage: "II",
    riskLevel: "medium",
    lastContact: "2024-11-09 11:20",
    nextAppointment: "2024-11-14 09:30",
    adherenceScore: 78,
    recentSymptoms: 2,
    unreadMessages: 1,
    activeAlerts: 2,
    treatmentPhase: "Post-Chirurgie",
    navigator: "Ana Ionescu",
    primaryPhysician: "Dr. Michael Brown",
    emergencyContact: {
      name: "Mihai Dumitrescu",
      phone: "+40 123 456 792",
      relationship: "Fiu",
    },
  },
]

const mockPatientAlerts: PatientAlert[] = [
  {
    id: "alert-001",
    patientId: "1",
    patientName: "Maria Popescu",
    type: "critical",
    category: "medical",
    title: "Valori anormale analize sânge",
    description: "Scăderea numărului de leucocite sub valorile normale. Necesită evaluare medicală urgentă.",
    timestamp: "2024-11-11 09:30",
    isRead: false,
    isResolved: false,
    assignedTo: "nav-001",
    escalationLevel: 1,
    relatedData: {
      labResults: {
        leucocite: "2.1 x10³/μL",
        normalRange: "4.0-11.0 x10³/μL",
        trend: "decreasing",
      },
    },
  },
  {
    id: "alert-002",
    patientId: "2",
    patientName: "Ion Georgescu",
    type: "high",
    category: "medication",
    title: "Aderență medicație scăzută",
    description: "Pacientul a ratat 3 doze consecutive în ultimele 5 zile. Risc de progresie a bolii.",
    timestamp: "2024-11-10 14:20",
    isRead: false,
    isResolved: false,
    assignedTo: "nav-001",
    escalationLevel: 0,
    relatedData: {
      medication: "Bicalutamide 50mg",
      missedDoses: 3,
      adherenceRate: "72%",
    },
  },
  {
    id: "alert-003",
    patientId: "3",
    patientName: "Ana Dumitrescu",
    type: "medium",
    category: "appointment",
    title: "Programare confirmată",
    description: "Pacientul a confirmat programarea pentru mâine la 09:30. Pregătire necesară pentru consultație.",
    timestamp: "2024-11-10 16:45",
    isRead: true,
    isResolved: false,
    assignedTo: "nav-001",
    escalationLevel: 0,
  },
  {
    id: "alert-004",
    patientId: "1",
    patientName: "Maria Popescu",
    type: "high",
    category: "communication",
    title: "Mesaj urgent de la pacient",
    description: "Pacientul raportează febră persistentă și stare generală proastă. Solicită consultație urgentă.",
    timestamp: "2024-11-11 07:15",
    isRead: false,
    isResolved: false,
    assignedTo: "nav-001",
    escalationLevel: 0,
  },
  {
    id: "alert-005",
    patientId: "3",
    patientName: "Ana Dumitrescu",
    type: "low",
    category: "system",
    title: "Actualizare profil pacient",
    description: "Informațiile de contact au fost actualizate. Verificare necesară.",
    timestamp: "2024-11-09 13:22",
    isRead: true,
    isResolved: true,
    assignedTo: "nav-001",
    escalationLevel: 0,
  },
]

const mockNavigatorTasks: NavigatorTask[] = [
  {
    id: "task-001",
    title: "Follow-up post chimioterapie",
    description: "Contactează pacientul pentru evaluarea efectelor secundare",
    patientId: "1",
    patientName: "Maria Popescu",
    priority: "high",
    category: "follow-up",
    dueDate: "2024-11-11 16:00",
    estimatedDuration: 30,
    status: "pending",
    assignedBy: "Dr. Emily Carter",
  },
  {
    id: "task-002",
    title: "Programare control",
    description: "Programează consultația de control pentru săptămâna viitoare",
    patientId: "2",
    patientName: "Ion Georgescu",
    priority: "medium",
    category: "coordination",
    dueDate: "2024-11-12 10:00",
    estimatedDuration: 15,
    status: "in-progress",
    assignedBy: "Dr. Sarah Johnson",
  },
]

const mockNavigator: Navigator = {
  id: "nav-001",
  firstName: "Ana",
  lastName: "Ionescu",
  email: "ana.ionescu@oncalink.ro",
  phone: "+40 123 456 789",
  specialization: "Oncologie",
  department: "Navigare Pacienți Oncologici",
  experience: 5,
  certification: ["Certified Patient Navigator", "Oncology Care Specialist"],
  activePatients: 24,
  maxCapacity: 30,
  workSchedule: {
    monday: { start: "08:00", end: "16:00" },
    tuesday: { start: "08:00", end: "16:00" },
    wednesday: { start: "08:00", end: "16:00" },
    thursday: { start: "08:00", end: "16:00" },
    friday: { start: "08:00", end: "16:00" },
  },
}

const mockPerformanceMetrics: PerformanceMetrics = {
  period: "Noiembrie 2024",
  patientsManaged: 24,
  averageResponseTime: 2.3,
  patientSatisfactionScore: 4.7,
  adherenceImprovementRate: 15,
  criticalAlertsResolved: 8,
  appointmentsCoordinated: 156,
  educationalSessionsConducted: 12,
  escalationsToPhysicians: 5,
  completedTasks: 89,
  overdueTasksRate: 8,
}

export function useNavigatorData() {
  const [navigator] = useState<Navigator>(mockNavigator)
  const [patients] = useState<PatientSummary[]>(mockPatientSummaries)
  const [alerts, setAlerts] = useState<PatientAlert[]>(mockPatientAlerts)
  const [tasks, setTasks] = useState<NavigatorTask[]>(mockNavigatorTasks)
  const [performanceMetrics] = useState<PerformanceMetrics>(mockPerformanceMetrics)

  // Alert management functions
  const markAlertAsRead = useCallback((alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, isRead: true } : alert)))
  }, [])

  const resolveAlert = useCallback((alertId: string, resolutionNote?: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              isResolved: true,
              isRead: true,
              resolutionNote,
              resolvedAt: new Date().toISOString(),
              resolvedBy: "nav-001",
            }
          : alert,
      ),
    )
  }, [])

  const escalateAlert = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              escalationLevel: alert.escalationLevel + 1,
              escalatedAt: new Date().toISOString(),
            }
          : alert,
      ),
    )
  }, [])

  const markAllAlertsAsRead = useCallback(() => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, isRead: true })))
  }, [])

  const filterAlerts = useCallback(
    (filters: {
      type?: string[]
      category?: string[]
      isRead?: boolean
      isResolved?: boolean
      patientId?: string
    }) => {
      return alerts.filter((alert) => {
        if (filters.type && !filters.type.includes(alert.type)) return false
        if (filters.category && !filters.category.includes(alert.category)) return false
        if (filters.isRead !== undefined && alert.isRead !== filters.isRead) return false
        if (filters.isResolved !== undefined && alert.isResolved !== filters.isResolved) return false
        if (filters.patientId && alert.patientId !== filters.patientId) return false
        return true
      })
    },
    [alerts],
  )

  // Task management functions
  const updateTaskStatus = useCallback((taskId: string, status: NavigatorTask["status"]) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status } : task)))
  }, [])

  // Patient detail function
  const getPatientDetail = useCallback(
    (patientId: string) => {
      const patient = patients.find((p) => p.id === patientId)
      if (!patient) return null

      const patientAlerts = alerts.filter((a) => a.patientId === patientId)
      const patientTasks = tasks.filter((t) => t.patientId === patientId)

      return {
        ...patient,
        alerts: patientAlerts,
        tasks: patientTasks,
        timeline: [],
        labResults: [],
        treatmentData: null,
        documents: [],
        symptoms: [],
        messages: [],
      }
    },
    [patients, alerts, tasks],
  )

  // Communication functions
  const initiatePhoneCall = useCallback(
    (patientId: string) => {
      const patient = patients.find((p) => p.id === patientId)
      if (patient) {
        // In a real app, this would integrate with a phone system
        console.log(`Initiating call to ${patient.firstName} ${patient.lastName} at ${patient.emergencyContact.phone}`)
        // You could also show a toast notification here
      }
    },
    [patients],
  )

  const sendMessage = useCallback(
    (patientId: string, message: string) => {
      const patient = patients.find((p) => p.id === patientId)
      if (patient) {
        // In a real app, this would send an actual message
        console.log(`Sending message to ${patient.firstName} ${patient.lastName}: ${message}`)
        // You could also update a messages state here
      }
    },
    [patients],
  )

  // Computed values
  const criticalPatients = patients.filter((p) => p.riskLevel === "critical")
  const highPriorityPatients = patients.filter((p) => p.riskLevel === "high" || p.riskLevel === "critical")
  const unreadAlerts = alerts.filter((a) => !a.isRead)
  const unresolvedAlerts = alerts.filter((a) => !a.isResolved)
  const overdueTasks = tasks.filter((t) => t.status === "overdue")
  const todayAppointments = patients.filter((p) => p.nextAppointment && p.nextAppointment.startsWith("2024-11-11"))

  // Statistics for dashboard
  const stats = {
    totalPatients: patients.length,
    criticalAlerts: alerts.filter((a) => a.type === "critical" && !a.isResolved).length,
    pendingTasks: tasks.filter((t) => t.status === "pending").length,
    todayAppointments: todayAppointments.length,
    averageAdherence: Math.round(patients.reduce((sum, p) => sum + p.adherenceScore, 0) / patients.length),
    highRiskPatients: highPriorityPatients.length,
  }

  return {
    navigator,
    patients,
    alerts,
    tasks,
    performanceMetrics,
    stats,
    // Functions
    markAlertAsRead,
    resolveAlert,
    escalateAlert,
    markAllAlertsAsRead,
    filterAlerts,
    updateTaskStatus,
    getPatientDetail,
    initiatePhoneCall,
    sendMessage,
    // Computed values
    criticalPatients,
    highPriorityPatients,
    unreadAlerts,
    unresolvedAlerts,
    overdueTasks,
    todayAppointments,
  }
}
