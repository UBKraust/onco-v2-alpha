"use client"
import { AlertsManagement } from "@/components/navigator/alerts-management"
import { useRouter } from "next/navigation"

export default function AlertsPage() {
  const router = useRouter()

  const handleSelectPatient = (patientId: string) => {
    router.push(`/navigator/patients/${patientId}`)
  }

  return (
    <div className="container mx-auto py-6">
      <AlertsManagement onSelectPatient={handleSelectPatient} />
    </div>
  )
}
