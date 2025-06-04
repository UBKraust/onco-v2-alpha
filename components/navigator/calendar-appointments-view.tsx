"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, User } from "lucide-react"
import { AppointmentWizard } from "@/components/appointments/appointment-wizard"

interface CalendarAppointment {
  id: string
  patientName: string
  patientId: string
  type: string
  time: string
  duration: number
  doctor: string
  location: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  priority: "low" | "normal" | "high" | "urgent"
}

const mockAppointments: CalendarAppointment[] = [
  {
    id: "1",
    patientName: "Maria Popescu",
    patientId: "P001",
    type: "Consultație Oncologie",
    time: "09:00",
    duration: 45,
    doctor: "Dr. Elena Ionescu",
    location: "Cabinet 201",
    status: "confirmed",
    priority: "normal",
  },
  {
    id: "2",
    patientName: "Ion Georgescu",
    patientId: "P002",
    type: "Chimioterapie",
    time: "10:30",
    duration: 180,
    doctor: "Dr. Mihai Popescu",
    location: "Sala Tratament A",
    status: "confirmed",
    priority: "high",
  },
  {
    id: "3",
    patientName: "Ana Dumitrescu",
    patientId: "P003",
    type: "Control Post-Tratament",
    time: "14:00",
    duration: 30,
    doctor: "Dr. Elena Ionescu",
    location: "Cabinet 201",
    status: "pending",
    priority: "normal",
  },
]

export function CalendarAppointmentsView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week")

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ro-RO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-4 border-l-red-500"
      case "high":
        return "border-l-4 border-l-orange-500"
      case "normal":
        return "border-l-4 border-l-blue-500"
      case "low":
        return "border-l-4 border-l-gray-500"
      default:
        return "border-l-4 border-l-gray-500"
    }
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-2xl font-bold">Calendar Programări</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Astăzi
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex border rounded-lg">
            {["day", "week", "month"].map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode(mode as any)}
                className="rounded-none first:rounded-l-lg last:rounded-r-lg"
              >
                {mode === "day" ? "Zi" : mode === "week" ? "Săptămână" : "Lună"}
              </Button>
            ))}
          </div>
          <AppointmentWizard />
        </div>
      </div>

      {/* Current Date Display */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {formatDate(selectedDate)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAppointments.map((appointment) => (
              <Card
                key={appointment.id}
                className={`hover:shadow-md transition-shadow ${getPriorityColor(appointment.priority)}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.time}</span>
                      <span className="text-sm text-muted-foreground">({appointment.duration} min)</span>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status === "confirmed"
                        ? "Confirmat"
                        : appointment.status === "pending"
                          ? "În așteptare"
                          : appointment.status === "cancelled"
                            ? "Anulat"
                            : "Finalizat"}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.patientName}</span>
                      <span className="text-sm text-muted-foreground">({appointment.patientId})</span>
                    </div>

                    <div className="text-sm text-muted-foreground">{appointment.type}</div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{appointment.doctor}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Detalii
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Editează
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {mockAppointments.length === 0 && (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Nu există programări pentru această zi</p>
              <AppointmentWizard />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-sm text-muted-foreground">Confirmate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-sm text-muted-foreground">În așteptare</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">255</div>
            <p className="text-sm text-muted-foreground">Total minute</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <p className="text-sm text-muted-foreground">Pacienți unici</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
