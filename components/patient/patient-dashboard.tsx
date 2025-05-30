// Make sure the PatientDashboard component is properly defined and exported
"use client"

import { DashboardOverview } from "@/components/patient/dashboard-overview"

export function PatientDashboard() {
  return (
    <div className="container mx-auto py-6">
      <DashboardOverview />
    </div>
  )
}
