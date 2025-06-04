"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentCard } from "@/components/ui/appointment-card"
import { CalendarView } from "@/components/ui/calendar-view"
import { AppointmentScheduler } from "@/components/appointments/appointment-scheduler"
import { AppointmentDetailsModal } from "@/components/appointments/appointment-details-modal"
import { NavigatorAppointmentDetailedView } from "@/components/appointments/navigator-appointment-detailed-view"
import { useMockPatientAppointments } from "@/hooks/useMockPatientAppointments"
import type { Appointment } from "@/types/patient"
import { AlertTriangle, Eye, Plus, Filter, Search, Calendar, Users, Clock } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NavigatorAppointmentsPage() {
  const { appointments: allAppointments, isLoading, error } = useMockPatientAppointments()
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [doctorFilter, setDoctorFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("calendar")

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
      description: "Programarea a fost reprogramată cu succes.",
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
      title: "Programare Editată",
      description: "Modificările au fost salvate cu succes.",
    })
  }

  const handleAddNotes = (appointmentId: string, notes: string) => {
    toast({
      title: "Notițe Salvate",
      description: "Notițele au fost adăugate la programare.",
    })
  }

  const handleBulkAction = (action: string, appointmentIds: string[]) => {
    toast({
      title: `Acțiune ${action}`,
      description: `${appointmentIds.length} programări au fost procesate.`,
    })
  }

  // Filter appointments based on search and filters
  const filteredAppointments = allAppointments.filter((apt) => {
    const matchesSearch =
      apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter
    const matchesDoctor = doctorFilter === "all" || apt.doctor === doctorFilter

    return matchesSearch && matchesStatus && matchesDoctor
  })

  const getAppointmentsForSelectedDate = () => {
    if (!selectedDate) return []
    const dateStr = selectedDate.toISOString().split("T")[0]
    return filteredAppointments.filter((apt) => apt.date === dateStr)
  }

  const upcomingAppointments = filteredAppointments
    .filter((apt) => new Date(apt.date) >= new Date() && (apt.status === "Confirmat" || apt.status === "În așteptare"))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const selectedDateAppointments = getAppointmentsForSelectedDate()

  // Get unique doctors for filter
  const uniqueDoctors = Array.from(new Set(allAppointments.map((apt) => apt.doctor)))

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
          <h1 className="text-2xl sm:text-3xl font-bold">Gestionare Programări</h1>
          <p className="text-muted-foreground">Gestionează programările pentru toți pacienții din portofoliu.</p>
        </div>
        <div className="flex gap-2">
          <AppointmentScheduler />
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Programare Bulk
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programări</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Toate programările</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Astăzi</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allAppointments.filter((apt) => apt.date === new Date().toISOString().split("T")[0]).length}
            </div>
            <p className="text-xs text-muted-foreground">Programări astăzi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">În Așteptare</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allAppointments.filter((apt) => apt.status === "În așteptare").length}
            </div>
            <p className="text-xs text-muted-foreground">Necesită confirmare</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacienți Unici</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(allAppointments.map((apt) => apt.title.split(" - ")[0])).size}
            </div>
            <p className="text-xs text-muted-foreground">Pacienți activi</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtre și Căutare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Caută după pacient, doctor sau tip programare..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate statusurile</SelectItem>
                <SelectItem value="Confirmat">Confirmat</SelectItem>
                <SelectItem value="În așteptare">În așteptare</SelectItem>
                <SelectItem value="Anulat">Anulat</SelectItem>
                <SelectItem value="Finalizat">Finalizat</SelectItem>
              </SelectContent>
            </Select>
            <Select value={doctorFilter} onValueChange={setDoctorFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toți doctorii</SelectItem>
                {uniqueDoctors.map((doctor) => (
                  <SelectItem key={doctor} value={doctor}>
                    {doctor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Vizualizare Calendar</TabsTrigger>
          <TabsTrigger value="list">Vizualizare Listă</TabsTrigger>
          <TabsTrigger value="analytics">Analiză</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
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
                    appointments={filteredAppointments}
                    onDateSelect={handleDateSelect}
                    onAppointmentClick={handleAppointmentClick}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Selected Date Appointments */}
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
                          Editare Avansată
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
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista Programărilor</CardTitle>
              <CardDescription>Toate programările în format listă cu opțiuni de editare bulk.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-medium">{apt.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {apt.doctor} • {new Date(apt.date).toLocaleDateString("ro-RO")} • {apt.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={apt.status === "Confirmat" ? "default" : "secondary"}>{apt.status}</Badge>
                      <Button variant="outline" size="sm" onClick={() => handleDetailedView(apt)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Editare
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analiză Programări</CardTitle>
              <CardDescription>Statistici și tendințe pentru programările pacienților.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-muted-foreground">Grafice de analiză (în dezvoltare)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onReschedule={handleReschedule}
        onCancel={handleCancel}
        onAddNotes={handleAddNotes}
      />

      {/* Navigator Advanced Appointment Detailed View */}
      <NavigatorAppointmentDetailedView
        appointment={selectedAppointment}
        isOpen={isDetailedViewOpen}
        onClose={handleCloseDetailedView}
        onEdit={handleEdit}
        onReschedule={handleReschedule}
        onCancel={handleCancel}
        onBulkAction={handleBulkAction}
      />
    </div>
  )
}
