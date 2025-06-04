"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigatorOverview } from "./navigator-overview"
import { AlertsManagement } from "./alerts-management"
import { PatientManagement } from "./patient-management"
import { PatientDetailView } from "./patient-detail-view"
import { CalendarAppointmentsView } from "./calendar-appointments-view"
import { PatientNotesManager } from "./patient-notes-manager"
import { EnhancedSymptomsTracker } from "./enhanced-symptoms-tracker"
import { Users, AlertTriangle, Calendar, FileText, Activity, Settings, MessageSquare, Phone } from "lucide-react"

export function NavigatorDashboard() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId)
    setActiveTab("patient-details")
  }

  const handleBackToOverview = () => {
    setSelectedPatientId(null)
    setActiveTab("overview")
  }

  if (selectedPatientId && activeTab === "patient-details") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackToOverview}>
            ← Înapoi la Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Detalii Pacient</h1>
        </div>
        <PatientDetailView patientId={selectedPatientId} onBack={handleBackToOverview} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Dashboard Navigator</h1>
          <p className="text-muted-foreground">Gestionează pacienții și coordonează îngrijirea medicală</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Phone className="mr-2 h-4 w-4" />
            Urgențe
          </Button>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
            <MessageSquare className="mr-2 h-4 w-4" />
            Mesaje
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Prezentare
          </TabsTrigger>
          <TabsTrigger value="patients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Pacienți
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alerte
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Note
          </TabsTrigger>
          <TabsTrigger value="symptoms" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Simptome
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Setări
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <NavigatorOverview onSelectPatient={handleSelectPatient} />
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <PatientManagement onSelectPatient={handleSelectPatient} />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <AlertsManagement onSelectPatient={handleSelectPatient} />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <CalendarAppointmentsView onSelectPatient={handleSelectPatient} />
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <PatientNotesManager />
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-4">
          <EnhancedSymptomsTracker />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Setări Navigator</CardTitle>
              <CardDescription>Configurează preferințele și setările pentru dashboard-ul navigator</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Notificări</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Alerte critice</span>
                        <Button variant="outline" size="sm">
                          Activat
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email zilnic</span>
                        <Button variant="outline" size="sm">
                          Activat
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS urgențe</span>
                        <Button variant="outline" size="sm">
                          Activat
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Preferințe</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Mod întunecat</span>
                        <Button variant="outline" size="sm">
                          Dezactivat
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Actualizare automată</span>
                        <Button variant="outline" size="sm">
                          5 secunde
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Limba</span>
                        <Button variant="outline" size="sm">
                          Română
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button>Salvează Setările</Button>
                  <Button variant="outline">Resetează</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
