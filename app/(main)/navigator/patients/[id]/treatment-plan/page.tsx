"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { TreatmentPlanTab } from "@/components/treatment/treatment-plan-tab"
import { CycleAppointmentWizard } from "@/components/appointments/cycle-appointment-wizard"
import { CycleFilteredCalendar } from "@/components/calendar/cycle-filtered-calendar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Activity } from "lucide-react"
import { useMockPatient } from "@/hooks/useMockPatient"
import { useMockPatientAppointments } from "@/hooks/useMockPatientAppointments"

export default function TreatmentPlanPage() {
  const params = useParams()
  const patientId = params.id as string
  const patient = useMockPatient(patientId)
  const { appointments } = useMockPatientAppointments(patientId)

  const [showAppointmentWizard, setShowAppointmentWizard] = useState(false)
  const [selectedCycleForAppointment, setSelectedCycleForAppointment] = useState<string | null>(null)
  const [calendarCycleFilter, setCalendarCycleFilter] = useState<string | null>(null)

  // Mock cycles data - în realitate ar veni din API
  const mockCycles = [
    {
      id: "cycle-1",
      cycleNumber: 1,
      totalCycles: 6,
      treatmentType: "Chimioterapie",
      protocol: "R-CHOP",
      startDate: "2024-11-01",
      endDate: "2024-11-21",
      status: "completed" as const,
      progress: 100,
      appointments: appointments.slice(0, 3),
      sideEffects: [],
      notes: "Ciclu tolerat bine",
      medications: ["Rituximab", "Cyclophosphamide"],
    },
    {
      id: "cycle-2",
      cycleNumber: 2,
      totalCycles: 6,
      treatmentType: "Chimioterapie",
      protocol: "R-CHOP",
      startDate: "2024-11-22",
      endDate: "2024-12-12",
      status: "in-progress" as const,
      progress: 65,
      appointments: appointments.slice(3, 6),
      sideEffects: [],
      notes: "În derulare",
      medications: ["Rituximab", "Cyclophosphamide"],
    },
  ]

  const handleAddAppointmentToCycle = (cycleId: string) => {
    setSelectedCycleForAppointment(cycleId)
    setShowAppointmentWizard(true)
  }

  const handleCreateNewCycle = () => {
    setSelectedCycleForAppointment(null)
    setShowAppointmentWizard(true)
  }

  const handleFilterCalendarByCycle = (cycleId: string) => {
    setCalendarCycleFilter(cycleId)
  }

  const handleAppointmentCreated = (appointmentData: any) => {
    console.log("Appointment created:", appointmentData)
    // Aici ar fi logica pentru a salva programarea
    setShowAppointmentWizard(false)
  }

  const handleCycleCreated = (cycleData: any) => {
    console.log("Cycle created:", cycleData)
    // Aici ar fi logica pentru a salva ciclul
    setShowAppointmentWizard(false)
  }

  if (!patient) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p className="text-muted-foreground">Se încarcă datele pacientului...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Înapoi la Fișa Pacientului
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Plan de Tratament</h1>
          <p className="text-muted-foreground">
            {patient.name} • {patient.condition}
          </p>
        </div>
      </div>

      {/* Tabs pentru diferite vizualizări */}
      <Tabs defaultValue="cycles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cycles" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Cicluri de Tratament
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar Filtrat
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Timeline Progres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cycles">
          <TreatmentPlanTab
            patientId={patientId}
            onAddAppointmentToCycle={handleAddAppointmentToCycle}
            onCreateNewCycle={handleCreateNewCycle}
            onFilterCalendarByCycle={handleFilterCalendarByCycle}
          />
        </TabsContent>

        <TabsContent value="calendar">
          <CycleFilteredCalendar
            appointments={appointments}
            cycles={mockCycles}
            selectedCycleId={calendarCycleFilter}
            onCycleFilterChange={setCalendarCycleFilter}
            onAppointmentClick={(appointment) => {
              console.log("Appointment clicked:", appointment)
            }}
          />
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Timeline Progres Tratament
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Timeline în dezvoltare</h3>
                <p className="text-muted-foreground">
                  Vizualizarea timeline pentru progresul tratamentului va fi disponibilă în curând.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Wizard pentru programări în cicluri */}
      <CycleAppointmentWizard
        isOpen={showAppointmentWizard}
        onClose={() => setShowAppointmentWizard(false)}
        patientId={patientId}
        existingCycles={mockCycles}
        onAppointmentCreated={handleAppointmentCreated}
        onCycleCreated={handleCycleCreated}
      />
    </div>
  )
}
