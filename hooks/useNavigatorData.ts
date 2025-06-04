"use client"

import { useState } from "react"
import type { Navigator, PatientAlert, NavigatorTask, PatientSummary, PerformanceMetrics } from "@/types/navigator"

// Self-contained mock data to avoid import issues
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
]

const mockPatientAlerts: PatientAlert[] = [
  {
    id: "alert-001",
    patientId: "1",
    patientName: "Maria Popescu",
    type: "critical",
    category: "medical",
    title: "Valori anormale analize sânge",
    description: "Scăderea numărului de leucocite sub valorile normale.",
    timestamp: "2024-11-11 09:30",
    isRead: false,
    isResolved: false,
    assignedTo: "nav-001",
    escalationLevel: 1,
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
    category: "scheduling",
    dueDate: "2024-11-12 10:00",
    estimatedDuration: 15,
    status: "in-progress",
    assignedBy: "Dr. Sarah Johnson",
  },
  {
    id: "task-003",
    title: "Actualizare plan tratament",
    description: "Revizuiește și actualizează planul de tratament",
    patientId: "3",
    patientName: "Ana Dumitrescu",
    priority: "high",
    category: "treatment",
    dueDate: "2024-11-10 14:00",
    estimatedDuration: 45,
    status: "overdue",
    assignedBy: "Dr. Emily Carter",
  },
]

// Adaugă și mai multe alerte mock
const additionalMockAlerts: PatientAlert[] = [
  {
    id: "alert-002",
    patientId: "2",
    patientName: "Ion Georgescu",
    type: "warning",
    category: "medication",
    title: "Aderență medicație scăzută",
    description: "Pacientul a ratat 2 doze consecutive în ultimele 3 zile.",
    timestamp: "2024-11-10 14:20",
    isRead: false,
    isResolved: false,
    assignedTo: "nav-001",
    escalationLevel: 1,
  },
  {
    id: "alert-003",
    patientId: "3",
    patientName: "Ana Dumitrescu",
    type: "info",
    category: "appointment",
    title: "Programare confirmată",
    description: "Pacientul a confirmat programarea pentru mâine la 10:00.",
    timestamp: "2024-11-10 16:45",
    isRead: true,
    isResolved: false,
    assignedTo: "nav-001",
    escalationLevel: 0,
  },
]

// Mock Navigator Data
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
  const [alerts, setAlerts] = useState<PatientAlert[]>([...mockPatientAlerts, ...additionalMockAlerts])
  const [tasks, setTasks] = useState<NavigatorTask[]>(mockNavigatorTasks)
  const [performanceMetrics] = useState<PerformanceMetrics>(mockPerformanceMetrics)

  // Funcții pentru gestionarea alertelor
  const markAlertAsRead = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, isRead: true } : alert)))
  }

  const resolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, isResolved: true } : alert)))
  }

  const escalateAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === alertId ? { ...alert, escalationLevel: alert.escalationLevel + 1 } : alert)),
    )
  }

  // Funcții pentru gestionarea task-urilor
  const updateTaskStatus = (taskId: string, status: NavigatorTask["status"]) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status } : task)))
  }

  // Funcție pentru obținerea detaliilor pacientului
  const getPatientDetail = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    if (!patient) return null

    return {
      ...patient,
      timeline: [],
      labResults: [],
      treatmentData: null,
      documents: [],
      symptoms: [],
      tasks: [],
      messages: [],
    }
  }

  // Computed values
  const criticalPatients = patients.filter((p) => p.riskLevel === "critical")
  const highPriorityPatients = patients.filter((p) => p.riskLevel === "high" || p.riskLevel === "critical")
  const unreadAlerts = alerts.filter((a) => !a.isRead)
  const unresolvedAlerts = alerts.filter((a) => !a.isResolved)
  const overdueTasks = tasks.filter((t) => t.status === "overdue")
  const todayAppointments = patients.filter((p) => p.nextAppointment && p.nextAppointment.startsWith("2024-11-11"))

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
    navigator,
    patients,
    alerts,
    tasks,
    performanceMetrics,
    stats,
    // Funcții
    markAlertAsRead,
    resolveAlert,
    updateTaskStatus,
    escalateAlert,
    getPatientDetail,
    // Computed values
    criticalPatients,
    highPriorityPatients,
    unreadAlerts,
    unresolvedAlerts,
    overdueTasks,
    todayAppointments,
  }
}
