"use client"

import { useRouter } from "next/navigation"
import { AlertsManagement } from "@/components/navigator/alerts-management"

export default function NavigatorAlertsPage() {
  const router = useRouter()

  const handleSelectPatient = (patientId: string) => {
    router.push(`/navigator/patients/${patientId}/details`)
  }

  return (
    <div className="container mx-auto py-6">
      <AlertsManagement onSelectPatient={handleSelectPatient} />
    </div>
  )
}
