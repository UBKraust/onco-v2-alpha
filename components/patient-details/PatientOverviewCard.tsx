"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Phone, Mail, MapPin, Edit } from "lucide-react"
import { useMockPatient } from "@/hooks/useMockPatient"

interface PatientOverviewCardProps {
  patientId: string
  onEdit?: () => void
}

export function PatientOverviewCard({ patientId, onEdit }: PatientOverviewCardProps) {
  const patient = useMockPatient(patientId)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Informații Pacient
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit} className="ml-auto">
              <Edit className="h-4 w-4 mr-1" />
              Editează
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {getInitials(patient.name)}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{patient.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {patient.age} ani • {patient.gender}
                </p>
                <Badge variant="outline">CNP: {patient.cnp}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{patient.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{patient.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{patient.address}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Informații Medicale</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Greutate:</span>
                  <span className="text-sm font-medium">{patient.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Înălțime:</span>
                  <span className="text-sm font-medium">{patient.height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Grupa sanguină:</span>
                  <span className="text-sm font-medium">{patient.bloodType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Alergii:</span>
                  <span className="text-sm font-medium">{patient.allergies}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Contact Urgență</h4>
              <div className="space-y-1">
                <p className="text-sm font-medium">{patient.emergencyContact.name}</p>
                <p className="text-sm text-gray-600">{patient.emergencyContact.phone}</p>
                <p className="text-sm text-gray-600">{patient.emergencyContact.relationship}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
