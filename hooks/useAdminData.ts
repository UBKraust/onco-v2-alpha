"use client"

import { useState, useEffect } from "react"
import type { AdminUser, MedicalTeamMember, Clinic, PatientAssignment, SystemAlert } from "@/types/admin"
import type { Patient } from "@/types/patient"

export function useAdminData() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [medicalTeam, setMedicalTeam] = useState<MedicalTeamMember[]>([])
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [assignments, setAssignments] = useState<PatientAssignment[]>([])
  const [alerts, setAlerts] = useState<SystemAlert[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data pentru demonstrație
  useEffect(() => {
    const loadMockData = async () => {
      setLoading(true)

      // Simulare încărcare date
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock users
      setUsers([
        {
          id: "1",
          name: "Dr. Maria Popescu",
          email: "maria.popescu@oncolink.ro",
          role: "navigator",
          status: "active",
          lastLogin: new Date("2024-01-15T10:30:00"),
          createdAt: new Date("2023-06-01"),
          permissions: ["view_patients", "edit_patients", "create_appointments"],
          clinicId: "clinic-1",
        },
        {
          id: "2",
          name: "Dr. Ion Marinescu",
          email: "ion.marinescu@oncolink.ro",
          role: "navigator",
          status: "active",
          lastLogin: new Date("2024-01-15T09:15:00"),
          createdAt: new Date("2023-07-15"),
          permissions: ["view_patients", "edit_patients", "create_appointments"],
          clinicId: "clinic-1",
        },
      ])

      // Mock medical team
      setMedicalTeam([
        {
          id: "doc-1",
          name: "Prof. Dr. Alexandru Ionescu",
          email: "alexandru.ionescu@spital.ro",
          phone: "+40721234567",
          specialization: ["Oncologie Medicală", "Hematologie"],
          department: "Oncologie",
          clinicId: "clinic-1",
          status: "active",
          schedule: {
            monday: { start: "08:00", end: "16:00", available: true },
            tuesday: { start: "08:00", end: "16:00", available: true },
            wednesday: { start: "08:00", end: "16:00", available: true },
            thursday: { start: "08:00", end: "16:00", available: true },
            friday: { start: "08:00", end: "14:00", available: true },
          },
          patientCapacity: 50,
          currentPatients: 42,
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2024-01-10"),
        },
      ])

      // Mock clinics
      setClinics([
        {
          id: "clinic-1",
          name: "Institutul Oncologic București",
          address: "Șos. Fundeni 258, București",
          phone: "+40213180719",
          email: "contact@iob.ro",
          departments: [
            {
              id: "dept-1",
              name: "Oncologie Medicală",
              description: "Tratament medicamentos al cancerului",
              clinicId: "clinic-1",
              headOfDepartment: "doc-1",
              specializations: ["Chimioterapie", "Imunoterapie", "Terapie țintită"],
              status: "active",
            },
          ],
          status: "active",
          createdAt: new Date("2023-01-01"),
        },
      ])

      // Mock alerts
      setAlerts([
        {
          id: "alert-1",
          type: "warning",
          title: "Capacitate Navigator Depășită",
          message: "Dr. Maria Popescu are 45 de pacienți asignați (limita: 40)",
          severity: "medium",
          category: "patient",
          createdAt: new Date("2024-01-15T08:00:00"),
          status: "open",
        },
        {
          id: "alert-2",
          type: "error",
          title: "Eroare Backup Automat",
          message: "Backup-ul programat pentru 14.01.2024 a eșuat",
          severity: "high",
          category: "system",
          createdAt: new Date("2024-01-14T23:30:00"),
          status: "open",
        },
      ])

      setLoading(false)
    }

    loadMockData()
  }, [])

  const assignPatientToNavigator = async (patientId: string, navigatorId: string, reason: string) => {
    const newAssignment: PatientAssignment = {
      id: `assignment-${Date.now()}`,
      patientId,
      navigatorId,
      assignedBy: "admin-1",
      assignedAt: new Date(),
      reason,
      status: "active",
    }

    setAssignments((prev) => [...prev, newAssignment])
    return newAssignment
  }

  const bulkAssignPatients = async (patientIds: string[], navigatorId: string, reason: string) => {
    const newAssignments = patientIds.map((patientId) => ({
      id: `assignment-${Date.now()}-${patientId}`,
      patientId,
      navigatorId,
      assignedBy: "admin-1",
      assignedAt: new Date(),
      reason,
      status: "active" as const,
    }))

    setAssignments((prev) => [...prev, ...newAssignments])
    return newAssignments
  }

  const addMedicalTeamMember = async (member: Omit<MedicalTeamMember, "id" | "createdAt" | "updatedAt">) => {
    const newMember: MedicalTeamMember = {
      ...member,
      id: `doc-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setMedicalTeam((prev) => [...prev, newMember])
    return newMember
  }

  const updateMedicalTeamMember = async (id: string, updates: Partial<MedicalTeamMember>) => {
    setMedicalTeam((prev) =>
      prev.map((member) => (member.id === id ? { ...member, ...updates, updatedAt: new Date() } : member)),
    )
  }

  const deleteMedicalTeamMember = async (id: string) => {
    setMedicalTeam((prev) => prev.filter((member) => member.id !== id))
  }

  const resolveAlert = async (alertId: string, resolvedBy: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: "resolved", resolvedAt: new Date(), resolvedBy } : alert,
      ),
    )
  }

  const dismissAlert = async (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "dismissed" } : alert)))
  }

  return {
    users,
    medicalTeam,
    clinics,
    patients,
    assignments,
    alerts,
    loading,
    assignPatientToNavigator,
    bulkAssignPatients,
    addMedicalTeamMember,
    updateMedicalTeamMember,
    deleteMedicalTeamMember,
    resolveAlert,
    dismissAlert,
  }
}
