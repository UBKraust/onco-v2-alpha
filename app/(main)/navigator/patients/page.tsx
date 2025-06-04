"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, UserPlus, Eye, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PatientOnboardingDialog } from "@/components/navigator/patient-onboarding-dialog"

export default function PatientsListPage() {
  const router = useRouter()
  const [showOnboarding, setShowOnboarding] = useState(false)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lista Pacienți</h1>
          <p className="text-muted-foreground">Gestionează și monitorizează pacienții din grija ta</p>
        </div>
        <Button onClick={() => setShowOnboarding(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Adaugă Pacient
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Caută pacienți..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtrează
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pacienți Activi</CardTitle>
          <CardDescription>Lista completă a pacienților din grija ta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Maria Popescu",
                email: "maria.popescu@email.com",
                condition: "Limfom Non-Hodgkin",
                status: "Activ în tratament",
                lastContact: "acum 2 ore",
                priority: "Critic",
                adherence: 85,
              },
              {
                name: "Ion Georgescu",
                email: "ion.georgescu@email.com",
                condition: "Cancer de sân",
                status: "Monitorizare",
                lastContact: "acum 1 zi",
                priority: "Înalt",
                adherence: 92,
              },
              {
                name: "Ana Dumitrescu",
                email: "ana.dumitrescu@email.com",
                condition: "Cancer pulmonar",
                status: "Recuperare",
                lastContact: "acum 3 zile",
                priority: "Mediu",
                adherence: 78,
              },
              {
                name: "Gheorghe Ionescu",
                email: "gheorghe.ionescu@email.com",
                condition: "Cancer de colon",
                status: "Activ în tratament",
                lastContact: "acum 5 ore",
                priority: "Mediu",
                adherence: 95,
              },
            ].map((patient, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => router.push(`/navigator/patients/${index + 1}/details`)}
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder-user-${index + 1}.jpg`} />
                    <AvatarFallback>
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">{patient.email}</p>
                    <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge
                      variant={
                        patient.status === "Activ în tratament"
                          ? "default"
                          : patient.status === "Monitorizare"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {patient.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Ultimul contact: {patient.lastContact}</p>
                  </div>

                  <div className="text-right">
                    <Badge
                      variant={
                        patient.priority === "Critic"
                          ? "destructive"
                          : patient.priority === "Înalt"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {patient.priority}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Aderență: {patient.adherence}%</p>
                  </div>

                  <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/navigator/patients/${index + 1}/details`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <PatientOnboardingDialog
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onPatientAdded={(patient) => {
          // Refresh the patients list or add to local state
          console.log("New patient added:", patient)
        }}
      />
    </div>
  )
}
