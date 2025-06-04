"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentCard } from "@/components/ui/appointment-card"
import { CalendarView } from "@/components/ui/calendar-view"
import { AppointmentScheduler } from "@/components/appointments/appointment-scheduler"
import { AppointmentDetailsModal } from "@/components/appointments/appointment-details-modal"
import { AppointmentDetailedView } from "@/components/appointments/appointment-detailed-view"
import { useMockPatientAppointments } from "@/hooks/useMockPatientAppointments"
import type { Appointment } from "@/types/patient"
import { AlertTriangle, Eye } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function AppointmentsPage() {
  const { appointments: allAppointments, isLoading, error } = useMockPatientAppointments()
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

  const handleDetailedView = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailedViewOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedAppointment(null)
  }

  const handleCloseDetailedView = () => {
    setIsDetailedViewOpen(false)
    setSelectedAppointment(null)
  }

  const handleReschedule = (appointmentId: string) => {
    toast({
      title: "Reprogramare Inițiată",
      description: "Vei fi contactat în curând pentru a stabili o nouă dată.",
    })
    handleCloseModal()
    handleCloseDetailedView()
  }

  const handleCancel = (appointmentId: string) => {
    toast({
      title: "Programare Anulată",
      description: "Programarea a fost anulată cu succes.",
      variant: "destructive",
    })
    handleCloseModal()
    handleCloseDetailedView()
  }

  const handleEdit = (appointmentId: string) => {
    toast({
      title: "Editare Programare",
      description: "Funcționalitatea de editare va fi disponibilă în curând.",
    })
  }

  const handleAddNotes = (appointmentId: string, notes: string) => {
    toast({
      title: "Notițe Salvate",
      description: "Notițele au fost adăugate la programare.",
    })
  }

  const getAppointmentsForSelectedDate = () => {
    if (!selectedDate) return []
    const dateStr = selectedDate.toISOString().split("T")[0]
    return allAppointments.filter((apt) => apt.date === dateStr)
  }

  const upcomingAppointments = allAppointments
    .filter((apt) => new Date(apt.date) >= new Date() && (apt.status === "Confirmat" || apt.status === "În așteptare"))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const selectedDateAppointments = getAppointmentsForSelectedDate()

  // Map status for AppointmentCard
  const mapStatusForAppointmentCard = (
    status: Appointment["status"],
  ): "scheduled" | "completed" | "cancelled" | "pending" => {
    switch (status) {
      case "Confirmat":
        return "scheduled"
      case "În așteptare":
        return "pending"
      case "Anulat":
        return "cancelled"
      case "Finalizat":
        return "completed"
      default:
        return "pending"
    }
  }

  if (isLoading) {
    return <div>Se încarcă programările...</div>
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500">
        <AlertTriangle className="w-16 h-16 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Eroare la încărcarea programărilor</h2>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Programările Mele</h1>
          <p className="text-muted-foreground">Vizualizează și gestionează programările tale medicale.</p>
        </div>
        <AppointmentScheduler />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendar Programări</CardTitle>
              <CardDescription>Selectează o zi pentru a vedea programările.</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView
                appointments={allAppointments}
                onDateSelect={handleDateSelect}
                onAppointmentClick={handleAppointmentClick}
              />
            </CardContent>
          </Card>
        </div>

        {/* Selected Date Appointments / Upcoming Appointments */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate
                  ? `Programări pentru ${selectedDate.toLocaleDateString("ro-RO", { day: "numeric", month: "long" })}`
                  : "Programări Viitoare"}
              </CardTitle>
              <CardDescription>
                {selectedDate ? "Detalii pentru ziua selectată." : "Cele mai apropiate programări."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
              {(selectedDate ? selectedDateAppointments : upcomingAppointments).length > 0 ? (
                (selectedDate ? selectedDateAppointments : upcomingAppointments).map((apt) => (
                  <div key={apt.id} className="space-y-2">
                    <div onClick={() => handleAppointmentClick(apt)} className="cursor-pointer">
                      <AppointmentCard
                        id={apt.id}
                        title={apt.title}
                        doctor={apt.doctor}
                        specialty={apt.specialty}
                        date={new Date(apt.date).toLocaleDateString("ro-RO", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        time={apt.time}
                        location={apt.location}
                        status={mapStatusForAppointmentCard(apt.status)}
                        notes={apt.notes}
                        priority={apt.priority}
                        onReschedule={(id) => handleReschedule(id)}
                        onCancel={(id) => handleCancel(id)}
                      />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDetailedView(apt)} className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      Vizualizare Detaliată
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  {selectedDate ? "Nicio programare pentru această zi." : "Nicio programare viitoare."}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onReschedule={handleReschedule}
        onCancel={handleCancel}
        onAddNotes={handleAddNotes}
      />

      {/* Appointment Detailed View */}
      <AppointmentDetailedView
        appointment={selectedAppointment}
        isOpen={isDetailedViewOpen}
        onClose={handleCloseDetailedView}
        onEdit={handleEdit}
        onReschedule={handleReschedule}
        onCancel={handleCancel}
      />
    </div>
  )
}
