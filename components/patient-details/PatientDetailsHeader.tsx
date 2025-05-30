"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit, MoreHorizontal } from "lucide-react"
import { useMockPatient } from "@/hooks/useMockPatient"

interface PatientDetailsHeaderProps {
  patientId: string
}

export function PatientDetailsHeader({ patientId }: PatientDetailsHeaderProps) {
  const patient = useMockPatient(patientId)

  // Add error handling
  if (!patient) {
    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Înapoi
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{patient.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {patient.condition} • {patient.status}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Editează
        </Button>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
