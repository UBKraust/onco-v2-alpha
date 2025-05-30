"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Plus, Phone, Video, Activity } from "lucide-react"
import { usePatientData } from "@/hooks/usePatientData"

export function AppointmentsManager() {
  const { appointments } = usePatientData()
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  const upcomingAppointments = appointments.filter((apt) => new Date(apt.date) >= new Date())
  const pastAppointments = appointments.filter((apt) => new Date(apt.date) < new Date())

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "cancelled":
        return "destructive"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmat"
      case "pending":
        return "În așteptare"
      case "cancelled":
        return "Anulat"
      case "completed":
        return "Completat"
      default:
        return status
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "consultation":
        return <Calendar className="h-4 w-4" />
      case "treatment":
        return <Plus className="h-4 w-4" />
      case "test":
        return <Activity className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Programări</h1>
          <p className="text-muted-foreground">Gestionează programările tale medicale</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Programare Nouă
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programări Viitoare</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingAppointments.length > 0
                ? `Următoarea: ${new Date(upcomingAppointments[0].date).toLocaleDateString("ro-RO")}`
                : "Nicio programare"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Luna Aceasta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 față de luna trecută</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter((apt) => apt.status === "confirmed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {appointments.filter((apt) => apt.status === "pending").length} în așteptare
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Programări Viitoare</CardTitle>
          <CardDescription>Următoarele tale programări medicale</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(appointment.type)}
                      <h3 className="font-semibold">{appointment.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{appointment.doctor}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(appointment.date).toLocaleDateString("ro-RO")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {appointment.time}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {appointment.location}
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Badge variant={getStatusColor(appointment.status)}>{getStatusLabel(appointment.status)}</Badge>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Detalii
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{appointment.title}</DialogTitle>
                            <DialogDescription>Detalii complete despre programare</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Doctor</p>
                                <p className="text-sm">{appointment.doctor}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Status</p>
                                <Badge variant={getStatusColor(appointment.status)} className="mt-1">
                                  {getStatusLabel(appointment.status)}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Data și ora</p>
                                <p className="text-sm">
                                  {new Date(appointment.date).toLocaleDateString("ro-RO")} la {appointment.time}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Locația</p>
                                <p className="text-sm">{appointment.location}</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button className="flex-1">
                                <Phone className="mr-2 h-4 w-4" />
                                Contactează
                              </Button>
                              {appointment.location.includes("virtuală") && (
                                <Button variant="outline" className="flex-1">
                                  <Video className="mr-2 h-4 w-4" />
                                  Întâlnire Video
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        Reprogramează
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
