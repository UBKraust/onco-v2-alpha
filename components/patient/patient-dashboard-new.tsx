"use client"

import { useState, useEffect } from "react"
import { PatientTreatmentCard } from "./patient-treatment-card"
import { PatientAppointmentsCard } from "./patient-appointments-card"
import { PatientSymptomsCard } from "./patient-symptoms-card"
import { PatientTeamCard } from "./patient-team-card"
import { PatientDocumentsCard } from "./patient-documents-card"
import { PatientObjectivesCard } from "./patient-objectives-card"
import { PatientMessagesCard } from "./patient-messages-card"
import { PatientAnalysisCard } from "./patient-analysis-card"
import { PatientOverviewStats } from "./patient-overview-stats"
import { PatientQuickActions } from "./patient-quick-actions"
import { PatientDashboardSkeleton } from "./patient-dashboard-skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function PatientDashboardNew() {
  const [loading, setLoading] = useState(true)
  const [patient, setPatient] = useState({
    id: "P12345",
    name: "Maria Popescu",
    age: 42,
    diagnosis: "Limfom Non-Hodgkin",
    status: "În tratament",
    avatar: "/placeholder.svg?height=64&width=64",
    lastVisit: "14 Ianuarie 2025",
    nextAppointment: "22 Ianuarie 2025",
    treatment: {
      name: "R-CHOP Protocol",
      cycle: "3/6",
      progress: 50,
      status: "Activ",
    },
  })

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <PatientDashboardSkeleton />
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Header with Patient Info and Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
            <AvatarFallback className="bg-violet-100 text-violet-800 text-xl font-semibold">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{patient.name}</h1>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span>{patient.age} ani</span>
              <span className="h-1 w-1 rounded-full bg-gray-400"></span>
              <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
                {patient.diagnosis}
              </Badge>
            </div>
          </div>
        </div>
        <PatientQuickActions />
      </div>

      {/* Overview Stats */}
      <div className="mb-6">
        <PatientOverviewStats />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <PatientTreatmentCard treatment={patient.treatment} />
          <PatientTeamCard />
          <PatientObjectivesCard />
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <PatientAppointmentsCard />
          <PatientDocumentsCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <PatientSymptomsCard />
          <PatientMessagesCard unreadCount={2} />
          <PatientAnalysisCard />
        </div>
      </div>
    </div>
  )
}
