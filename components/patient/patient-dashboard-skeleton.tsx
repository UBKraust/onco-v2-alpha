"use client"

import { PatientHeaderSkeleton } from "./skeletons/patient-header-skeleton"
import { OverviewStatsSkeleton } from "./skeletons/overview-stats-skeleton"
import { TreatmentCardSkeleton } from "./skeletons/treatment-card-skeleton"
import { AppointmentsCardSkeleton } from "./skeletons/appointments-card-skeleton"
import { SymptomsCardSkeleton } from "./skeletons/symptoms-card-skeleton"
import { TeamCardSkeleton } from "./skeletons/team-card-skeleton"
import { DocumentsCardSkeleton } from "./skeletons/documents-card-skeleton"
import { ObjectivesCardSkeleton } from "./skeletons/objectives-card-skeleton"
import { MessagesCardSkeleton } from "./skeletons/messages-card-skeleton"
import { AnalysisCardSkeleton } from "./skeletons/analysis-card-skeleton"

export function PatientDashboardSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Header with Patient Info and Quick Actions */}
      <PatientHeaderSkeleton />

      {/* Overview Stats */}
      <div className="mb-6">
        <OverviewStatsSkeleton />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <TreatmentCardSkeleton />
          <TeamCardSkeleton />
          <ObjectivesCardSkeleton />
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <AppointmentsCardSkeleton />
          <DocumentsCardSkeleton />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <SymptomsCardSkeleton />
          <MessagesCardSkeleton />
          <AnalysisCardSkeleton />
        </div>
      </div>
    </div>
  )
}
