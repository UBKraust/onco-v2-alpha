"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Search, Filter, Eye, Plus, Clock, MapPin } from "lucide-react"
import type { MedicalAppointment } from "@/types/medical-record"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface AppointmentsHistoryProps {
  appointments: MedicalAppointment[]
  showViewAll?: boolean
}

export function AppointmentsHistory({ appointments, showViewAll = false }: AppointmentsHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType ? appointment.type === selectedType : true

    return matchesSearch && matchesType
  })

  const getAppointmentTypeLabel = (type: string) => {
    switch (type) {
      case "consultation":
        return "Consultație"
      case "treatment":
        return "Tratament"
      case "investigation":
        return "Investigație"
      case "nutrition":
        return "Nutriție"
      default:
        return "Altele"
    }
  }

  const getAppointmentStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Programat"
      case "completed":
        return "Finalizat"
      case "cancelled":
        return "Anulat"
      case "rescheduled":
        return "Reprogramat"
      default:
        return status
    }
  }

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "rescheduled":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAppointmentTypeColor = (type: string) => {
    switch (type) {
      case "consultation":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "treatment":
        return "bg-green-100 text-green-800 border-green-200"
      case "investigation":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "nutrition":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Istoric Programări Medicale
            </CardTitle>
            <CardDescription>Vizualizați istoricul programărilor medicale</CardDescription>
          </div>
          {showViewAll && (
            <Button variant="outline" size="sm">
              Vezi toate
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută programări..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrează
          </Button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nu există programări</h3>
              <p className="text-muted-foreground mb-4">
                Nu au fost găsite programări care să corespundă criteriilor de căutare.
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Calendar className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{appointment.title}</h3>
                      <Badge variant="outline" className={getAppointmentTypeColor(appointment.type)}>
                        {getAppointmentTypeLabel(appointment.type)}
                      </Badge>
                      <Badge variant="outline" className={getAppointmentStatusColor(appointment.status)}>
                        {getAppointmentStatusLabel(appointment.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {appointment.doctor} • {appointment.specialty}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {appointment.date}, {appointment.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Vezi Detalii
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{appointment.title}</DialogTitle>
                        <DialogDescription>
                          {appointment.date}, {appointment.time}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className={getAppointmentTypeColor(appointment.type)}>
                            {getAppointmentTypeLabel(appointment.type)}
                          </Badge>
                          <Badge variant="outline" className={getAppointmentStatusColor(appointment.status)}>
                            {getAppointmentStatusLabel(appointment.status)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">Medic:</p>
                            <p>{appointment.doctor}</p>
                          </div>
                          <div>
                            <p className="font-medium">Specialitate:</p>
                            <p>{appointment.specialty}</p>
                          </div>
                          <div>
                            <p className="font-medium">Locație:</p>
                            <p>{appointment.location}</p>
                          </div>
                          <div>
                            <p className="font-medium">Data și ora:</p>
                            <p>
                              {appointment.date}, {appointment.time}
                            </p>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div>
                            <p className="font-medium">Note:</p>
                            <p>{appointment.notes}</p>
                          </div>
                        )}

                        {appointment.documents && appointment.documents.length > 0 && (
                          <div>
                            <p className="font-medium">Documente asociate:</p>
                            <ul className="list-disc list-inside">
                              {appointment.documents.map((doc, index) => (
                                <li key={index}>{doc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Appointment Button */}
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Adaugă Programare
        </Button>
      </CardContent>
    </Card>
  )
}
