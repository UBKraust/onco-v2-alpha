"use client"

import { useState, useMemo } from "react"
import type { Navigator, PatientAlert, NavigatorTask, PatientSummary, PerformanceMetrics } from "@/types/navigator"

// Mock data pentru navigator
const mockNavigator: Navigator = {
  id: "nav-001",
  firstName: "Ana",
  lastName: "Popescu",
  email: "ana.popescu@hospital.ro",
  phone: "+40 721 234 567",
  specialization: "Oncologie",
  department: "Oncologie Medicală",
  experience: 8,
  certification: ["Navigator Medical Certificat", "Oncologie Clinică", "Comunicare Terapeutică"],
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

// Mock data pentru alerte
const mockAlerts: PatientAlert[] = [
  {
    id: "alert-001",
    patientId: "patient-001",
    patientName: "Maria Popescu",
    type: "critical",
    category: "medical",
    title: "Valori anormale analize sânge",
    description: "Scăderea numărului de leucocite sub valorile normale. Necesită evaluare medicală urgentă.",
    timestamp: "2024-01-11T09:00:00Z",
    isRead: false,
    isResolved: false,
    assignedTo: "nav-001",
    escalationLevel: 2,
    relatedData: {
      labResults: {
        leucocite: { value: 2.8, normal: "4.0-11.0", unit: "x10³/μL" },
        hemoglobina: { value: 9.2, normal: "12.0-16.0", unit: "g/dL" },
      },
    },
  },
  {
    id: "alert-002",
    patientId: "patient-002",
    patientName: "Ion Georgescu",
    type: "high",
    category: "appointment",
    title: "Programare ratată",
    description: "Pacientul nu s-a prezentat la consultația programată pentru azi.",
    timestamp: "2024-01-11T10:30:00Z",
    isRead: false,
    isResolved: false,
    assignedTo: "nav-001",
    escalationLevel: 1,
    relatedData: {
      appointment: {
        scheduledTime: "2024-01-11T10:00:00Z",
        doctor: "Dr. Emily Carter",
        type: "Consultație oncologie",
      },
    },
  },
  {
    id: "alert-003",
    patientId: "patient-003",
    patientName: "Elena Ionescu",
    type: "medium",
    category: "medication",
    title: "Aderență scăzută la medicație",
    description: "Pacientul a raportat că a uitat să ia medicația de 3 ori în ultima săptămână.",
    timestamp: "2024-01-11T08:15:00Z",
    isRead: true,
    isResolved: false,
    assignedTo: "nav-001",
    escalationLevel: 0,
    relatedData: {
      medication: {
        name: "Tamoxifen",
        missedDoses: 3,
        adherenceRate: 78,
      },
    },
  },
  {
    id: "alert-004",
    patientId: "patient-004",
    patientName: "Gheorghe Ionescu",
    type: "low",
    category: "communication",
    title: "Mesaj nerezolvat",
    description: "Pacientul a trimis întrebări despre efectele secundare acum 2 zile.",
    timestamp: "2024-01-09T14:20:00Z",
    isRead: true,
    isResolved: false,
    assignedTo: "nav-001",
    escalationLevel: 0,
    relatedData: {
      message: {
        subject: "Întrebări despre efecte secundare",
        content: "Am observat că îmi cade părul mai mult decât de obicei...",
      },
    },
  },
]

// Mock data pentru pacienți
const mockPatients: PatientSummary[] = [
  {
    id: "patient-001",
    firstName: "Maria",
    lastName: "Popescu",
    age: 58,
    diagnosis: "Cancer de sân",
    stage: "Stadiul II",
    riskLevel: "critical",
    lastContact: "2024-01-10",
    nextAppointment: "2024-01-15 10:00",
    adherenceScore: 85,
    recentSymptoms: 3,
    unreadMessages: 2,
    activeAlerts: 1,
    treatmentPhase: "Chimioterapie",
    navigator: "Ana Popescu",
    primaryPhysician: "Dr. Emily Carter",
    emergencyContact: {
      name: "Gheorghe Popescu",
      phone: "+40 721 345 678",
      relationship: "Soț",
    },
  },
  {
    id: "patient-002",
    firstName: "Ion",
    lastName: "Georgescu",
    age: 65,
    diagnosis: "Cancer pulmonar",
    stage: "Stadiul III",
    riskLevel: "high",
    lastContact: "2024-01-09",
    nextAppointment: "2024-01-12 14:30",
    adherenceScore: 92,
    recentSymptoms: 1,
    unreadMessages: 0,
    activeAlerts: 1,
    treatmentPhase: "Radioterapie",
    navigator: "Ana Popescu",
    primaryPhysician: "Dr. Michael Johnson",
    emergencyContact: {
      name: "Ana Georgescu",
      phone: "+40 721 456 789",
      relationship: "Soție",
    },
  },
  {
    id: "patient-003",
    firstName: "Elena",
    lastName: "Ionescu",
    age: 42,
    diagnosis: "Cancer ovarian",
    stage: "Stadiul I",
    riskLevel: "medium",
    lastContact: "2024-01-11",
    nextAppointment: "2024-01-18 09:00",
    adherenceScore: 78,
    recentSymptoms: 2,
    unreadMessages: 1,
    activeAlerts: 1,
    treatmentPhase: "Post-chirurgie",
    navigator: "Ana Popescu",
    primaryPhysician: "Dr. Sarah Wilson",
    emergencyContact: {
      name: "Mihai Ionescu",
      phone: "+40 721 567 890",
      relationship: "Soț",
    },
  },
]

// Mock data pentru sarcini
const mockTasks: NavigatorTask[] = [
  {
    id: "task-001",
    title: "Follow-up post chimioterapie",
    description: "Verificare stare generală și efecte secundare după ultima ședință de chimioterapie",
    patientId: "patient-001",
    patientName: "Maria Popescu",
    priority: "urgent",
    category: "follow-up",
    dueDate: "2024-01-11T16:00:00Z",
    estimatedDuration: 30,
    status: "overdue",
    assignedBy: "Dr. Emily Carter",
  },
  {
    id: "task-002",
    title: "Coordonare programare nutriționist",
    description: "Programare consultație nutriționist pentru plan alimentar personalizat",
    patientId: "patient-002",
    patientName: "Ion Georgescu",
    priority: "high",
    category: "coordination",
    dueDate: "2024-01-12T10:00:00Z",
    estimatedDuration: 15,
    status: "pending",
    assignedBy: "Dr. Michael Johnson",
  },
]

// Mock data pentru metrici de performanță
const mockPerformanceMetrics: PerformanceMetrics = {
  period: "Ianuarie 2024",
  patientsManaged: 24,
  averageResponseTime: 2.5,
  patientSatisfactionScore: 4.7,
  adherenceImprovementRate: 15,
  criticalAlertsResolved: 8,
  appointmentsCoordinated: 45,
  educationalSessionsConducted: 12,
  escalationsToPhysicians: 3,
  completedTasks: 28,
  overdueTasksRate: 8,
}

export function useNavigatorData() {
  const [alerts, setAlerts] = useState<PatientAlert[]>(mockAlerts)
  const [patients] = useState<PatientSummary[]>(mockPatients)
  const [tasks] = useState<NavigatorTask[]>(mockTasks)

  // Funcții pentru gestionarea alertelor
  const markAlertAsRead = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, isRead: true } : alert)))
  }

  const resolveAlert = (alertId: string, resolutionNote: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              isResolved: true,
              resolutionNote,
              resolvedAt: new Date().toISOString(),
              resolvedBy: mockNavigator.id,
            }
          : alert,
      ),
    )
  }

  const escalateAlert = (alertId: string, reason?: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              escalationLevel: alert.escalationLevel + 1,
              escalatedAt: new Date().toISOString(),
              escalationReason: reason,
            }
          : alert,
      ),
    )
  }

  const deleteAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const markAllAlertsAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, isRead: true })))
  }

  const bulkResolveAlerts = (alertIds: string[], resolutionNote: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alertIds.includes(alert.id)
          ? {
              ...alert,
              isResolved: true,
              resolutionNote,
              resolvedAt: new Date().toISOString(),
              resolvedBy: mockNavigator.id,
            }
          : alert,
      ),
    )
  }

  // Funcții pentru comunicare
  const initiatePhoneCall = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    if (patient) {
      // Simulare apel telefonic
      console.log(`Initiating phone call to ${patient.firstName} ${patient.lastName}`)
      console.log(`Phone: ${patient.emergencyContact.phone}`)

      // În implementarea reală, aici ar fi integrarea cu sistemul de telefonie
      // De exemplu: window.open(`tel:${patient.emergencyContact.phone}`)

      return {
        success: true,
        message: `Apel inițiat către ${patient.firstName} ${patient.lastName}`,
        phone: patient.emergencyContact.phone,
      }
    }
    return {
      success: false,
      message: "Pacientul nu a fost găsit",
    }
  }

  const sendMessage = (patientId: string, message?: string) => {
    const patient = patients.find((p) => p.id === patientId)
    if (patient) {
      // Simulare trimitere mesaj
      console.log(`Sending message to ${patient.firstName} ${patient.lastName}`)
      console.log(`Message: ${message || "Mesaj standard de follow-up"}`)

      // În implementarea reală, aici ar fi integrarea cu sistemul de mesagerie
      // De exemplu: API call către sistemul de SMS/email

      return {
        success: true,
        message: `Mesaj trimis către ${patient.firstName} ${patient.lastName}`,
        sentAt: new Date().toISOString(),
      }
    }
    return {
      success: false,
      message: "Pacientul nu a fost găsit",
    }
  }

  const getPatientDetail = (patientId: string) => {
    return patients.find((p) => p.id === patientId)
  }

  // Calculări derivate
  const unreadAlerts = useMemo(() => alerts.filter((alert) => !alert.isRead), [alerts])
  const unresolvedAlerts = useMemo(() => alerts.filter((alert) => !alert.isResolved), [alerts])
  const criticalPatients = useMemo(() => patients.filter((p) => p.riskLevel === "critical"), [patients])
  const highPriorityPatients = useMemo(
    () => patients.filter((p) => p.riskLevel === "high" || p.riskLevel === "critical"),
    [patients],
  )
  const overdueTasks = useMemo(() => tasks.filter((task) => task.status === "overdue"), [tasks])
  const todayAppointments = useMemo(() => {
    const today = new Date().toISOString().split("T")[0]
    return patients.filter((p) => p.nextAppointment?.startsWith(today))
  }, [patients])

  // Statistici pentru dashboard
  const stats = {
    totalPatients: patients.length,
    criticalAlerts: alerts.filter((a) => a.type === "critical" && !a.isResolved).length,
    pendingTasks: tasks.filter((t) => t.status === "pending").length,
    todayAppointments: todayAppointments.length,
    averageAdherence: Math.round(patients.reduce((sum, p) => sum + p.adherenceScore, 0) / patients.length),
    highRiskPatients: highPriorityPatients.length,
  }

  return {
    navigator: mockNavigator,
    alerts,
    patients,
    tasks,
    performanceMetrics: mockPerformanceMetrics,
    stats,
    unreadAlerts,
    unresolvedAlerts,
    criticalPatients,
    highPriorityPatients,
    overdueTasks,
    todayAppointments,
    markAlertAsRead,
    resolveAlert,
    escalateAlert,
    deleteAlert,
    markAllAlertsAsRead,
    bulkResolveAlerts,
    initiatePhoneCall,
    sendMessage,
    getPatientDetail,
  }
}
