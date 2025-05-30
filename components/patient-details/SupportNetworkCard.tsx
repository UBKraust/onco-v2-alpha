"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Phone, MessageSquare, Calendar } from "lucide-react"
import { useMockPatient } from "@/hooks/useMockPatient"

interface SupportNetworkCardProps {
  patientId: string
}

export function SupportNetworkCard({ patientId }: SupportNetworkCardProps) {
  const patient = useMockPatient(patientId)

  if (!patient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Rețeaua de Suport
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Se încarcă datele...</p>
        </CardContent>
      </Card>
    )
  }

  // Mock data - în viitor va fi înlocuit cu hook real
  const supportData = {
    medicalTeam: [
      {
        id: "1",
        name: "Dr. Maria Popescu",
        role: "Oncolog Principal",
        type: "primary",
        avatar: "MP",
        phone: "+40 721 123 456",
        email: "maria.popescu@hospital.ro",
      },
      {
        id: "2",
        name: "Ana Ionescu",
        role: "Navigator Pacient",
        type: "navigator",
        avatar: "AI",
        phone: "+40 721 654 321",
        email: "ana.ionescu@hospital.ro",
      },
    ],
    familySupport: [
      {
        id: "1",
        name: patient.emergencyContact?.name || "Ion Popescu",
        relationship: patient.emergencyContact?.relationship || "Soț",
        avatar: "IP",
        phone: patient.emergencyContact?.phone || "+40 721 111 222",
        isPrimary: true,
      },
      {
        id: "2",
        name: "Ana Popescu",
        relationship: "Fiică",
        avatar: "AP",
        phone: "+40 721 333 444",
        isPrimary: false,
      },
    ],
  }

  const getRoleColor = (type: string) => {
    switch (type) {
      case "primary":
        return "bg-green-100 text-green-800"
      case "navigator":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvatarColor = (type: string) => {
    switch (type) {
      case "primary":
        return "bg-blue-500"
      case "navigator":
        return "bg-purple-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Rețeaua de Suport
          <Button size="sm" variant="outline" className="ml-auto">
            <Plus className="h-4 w-4 mr-1" />
            Adaugă
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Echipa Medicală */}
          <div>
            <h4 className="font-medium mb-3">Echipa Medicală</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportData.medicalTeam.map((member) => (
                <div key={member.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 ${getAvatarColor(member.type)} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium">{member.name}</h5>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <Badge className={getRoleColor(member.type)}>
                      {member.type === "primary" ? "Medic curant" : "Navigator"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Familie și Prieteni */}
          <div>
            <h4 className="font-medium mb-3">Familie și Prieteni</h4>
            <div className="space-y-2">
              {supportData.familySupport.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {person.avatar}
                    </div>
                    <div>
                      <span className="text-sm font-medium">{person.name}</span>
                      <span className="text-xs text-gray-600 ml-2">{person.relationship}</span>
                      {person.isPrimary && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Contact principal
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
