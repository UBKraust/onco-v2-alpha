"use client"

import { PatientQuickActions } from "./patient-quick-actions"
import { PatientOverviewStats } from "./patient-overview-stats"
import { PatientTreatmentCard } from "./patient-treatment-card"
import { PatientAppointmentsCard } from "./patient-appointments-card"
import { PatientSymptomsCard } from "./patient-symptoms-card"
import { PatientTeamCard } from "./patient-team-card"
import { PatientDocumentsCard } from "./patient-documents-card"
import { PatientObjectivesCard } from "./patient-objectives-card"
import { PatientMessagesCard } from "./patient-messages-card"
import { PatientAnalysisCard } from "./patient-analysis-card"

export function PatientDashboardNew() {
  return (
    <div className="space-y-6">
      {/* Header cu informații pacient și acțiuni rapide */}
      <PatientQuickActions />

      {/* Overview Stats */}
      <PatientOverviewStats />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <PatientTreatmentCard />
          <PatientAppointmentsCard />
        </div>

        <div className="space-y-6">
          <PatientSymptomsCard />
          <PatientTeamCard />
        </div>

        <PatientDocumentsCard />
        <PatientObjectivesCard />

        <div className="xl:col-span-2 space-y-6">
          <PatientMessagesCard />
          <PatientAnalysisCard />
        </div>
      </div>
    </div>
  )
}
