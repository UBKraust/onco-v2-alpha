"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CalendarPlus, Clock, User, Phone, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

const mockAppointments = [
  {
    id: "1",
    patient: "Maria Popescu",
    type: "Consultație oncologică",
    date: "2024-01-15",
    time: "09:00",
    duration: 60,
    status: "confirmed",
    location: "Cabinet 201",
    doctor: "Dr. Ionescu",
    notes: "Control post-chimioterapie",
    priority: "high",
  },
  {
    id: "2",
    patient: "Ion Georgescu",
    type: "Follow-up",
    date: "2024-01-15",
    time: "10:30",
    duration: 30,
    status: "pending",
    location: "Cabinet 105",
    doctor: "Dr. Popescu",
    notes: "Evaluare răspuns la tratament",
    priority: "medium",
  },
  {
    id: "3",
    patient: "Ana Dumitrescu",
    type: "Evaluare psihologică",
    date: "2024-01-15",
    time: "11:15",
    duration: 45,
    status: "confirmed",
    location: "Cabinet 301",
    doctor: "Psih. Marinescu",
    notes: "Suport emoțional",
    priority: "low",
  },
  {
    id: "4",
    patient: "Gheorghe Ionescu",
    type: "Consultație",
    date: "2024-01-15",
    time: "14:00",
    duration: 60,
    status: "completed",
    location: "Cabinet 201",
    doctor: "Dr. Ionescu",
    notes: "Rezultate analize",
    priority: "medium",
  },
  {
    id: "5",
    patient: "Elena Vasilescu",
    type: "Follow-up",
    date: "2024-01-15",
    time: "15:30",
    duration: 30,
    status: "cancelled",
    location: "Cabinet 105",
    doctor: "Dr. Popescu",
    notes: "Pacient indisponibil",
    priority: "low",
  },
]

export default function NavigatorAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState("2024-01-15")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const todayAppointments = mockAppointments.filter((apt) => apt.date === selectedDate)
  const confirmedCount = todayAppointments.filter((apt) => apt.status === "confirmed").length
  const pendingCount = todayAppointments.filter((apt) => apt.status === "pending").length
  const completedCount = todayAppointments.filter((apt) => apt.status === "completed").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestionare Programări</h1>
          <p className="text-muted-foreground">Coordonează programările pentru toți pacienții</p>
        </div>
        <Button asChild>
          <Link href="/navigator/appointments/new">
            <CalendarPlus className="h-4 w-4 mr-2" />
            Programare Nouă
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Programări Astăzi</p>
                <p className="text-2xl font-bold">{todayAppointments.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmate</p>
                <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">În Așteptare</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Finalizate</p>
                <p className="text-2xl font-bold text-blue-600">{completedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Tabs */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Astăzi</TabsTrigger>
          <TabsTrigger value="week">Săptămâna aceasta</TabsTrigger>
          <TabsTrigger value="month">Luna aceasta</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Programări pentru Astăzi</CardTitle>
              <CardDescription>
                {todayAppointments.length} programări planificate pentru{" "}
                {new Date(selectedDate).toLocaleDateString("ro-RO")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`border-l-4 ${getPriorityColor(appointment.priority)} bg-card rounded-lg p-4 hover:bg-muted/50 transition-colors`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Appointment Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(appointment.status)}
                            <span className="font-semibold text-lg">{appointment.time}</span>
                          </div>
                          <Badge variant={getStatusColor(appointment.status)}>
                            {appointment.status === "confirmed"
                              ? "Confirmat"
                              : appointment.status === "pending"
                                ? "În așteptare"
                                : appointment.status === "completed"
                                  ? "Finalizat"
                                  : "Anulat"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{appointment.duration} min</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{appointment.patient}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.location}</span>
                          </div>
                          <div className="col-span-1 md:col-span-2">
                            <span className="font-medium">Tip:</span> {appointment.type}
                          </div>
                          <div className="col-span-1 md:col-span-2">
                            <span className="font-medium">Doctor:</span> {appointment.doctor}
                          </div>
                          {appointment.notes && (
                            <div className="col-span-1 md:col-span-2">
                              <span className="font-medium">Note:</span> {appointment.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/navigator/appointments/${appointment.id}`}>Detalii</Link>
                        </Button>
                        {appointment.status === "pending" && <Button size="sm">Confirmă</Button>}
                        {appointment.status === "confirmed" && (
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Sună
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Editează
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">Vedere Săptămânală</p>
                <p className="text-muted-foreground">Funcționalitate în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">Vedere Lunară</p>
                <p className="text-muted-foreground">Funcționalitate în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">Calendar Interactiv</p>
                <p className="text-muted-foreground">Funcționalitate în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
