"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Clock, MapPin, Plus, Eye } from "lucide-react"
import { usePatientData } from "@/hooks/usePatientData"

export function AppointmentsHistoryGrid() {
  const { appointments } = usePatientData()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedFilter === "all") return matchesSearch
    return matchesSearch && appointment.type === selectedFilter
  })

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

  const getStatusLabel = (status: string) => {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consultation":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "treatment":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "test":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "follow-up":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "consultation":
        return "Consultație"
      case "treatment":
        return "Tratament"
      case "test":
        return "Investigație"
      case "follow-up":
        return "Control"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Istoric Programări Medicale</h2>
          <p className="text-muted-foreground">Vizualizați programările trecute, viitoare și statusul acestora</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adaugă Programare Nouă
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Caută programare după tip, doctor, locație..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === "all" ? "default" : "outline"}
            onClick={() => setSelectedFilter("all")}
            size="sm"
          >
            Toate
          </Button>
          <Button
            variant={selectedFilter === "consultation" ? "default" : "outline"}
            onClick={() => setSelectedFilter("consultation")}
            size="sm"
          >
            Consultații
          </Button>
          <Button
            variant={selectedFilter === "treatment" ? "default" : "outline"}
            onClick={() => setSelectedFilter("treatment")}
            size="sm"
          >
            Tratamente
          </Button>
          <Button
            variant={selectedFilter === "test" ? "default" : "outline"}
            onClick={() => setSelectedFilter("test")}
            size="sm"
          >
            Investigații
          </Button>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Badge className={`${getTypeColor(appointment.type)} text-xs font-medium`}>
                    {getTypeLabel(appointment.type)}
                  </Badge>
                  <CardTitle className="text-lg font-semibold line-clamp-2">{appointment.title}</CardTitle>
                </div>
                <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                  {getStatusLabel(appointment.status)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Date and Time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(appointment.date).toLocaleDateString("ro-RO", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{appointment.time}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">{appointment.location}</span>
              </div>

              {/* Doctor */}
              <div className="text-sm">
                <span className="font-medium text-gray-900">Doctor: </span>
                <span className="text-gray-600">{appointment.doctor}</span>
              </div>

              {/* Notes if available */}
              {appointment.notes && (
                <div className="text-sm">
                  <span className="font-medium text-gray-900">Note: </span>
                  <span className="text-gray-600 line-clamp-2">{appointment.notes}</span>
                </div>
              )}

              {/* Action Button */}
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Vezi Detalii
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nu au fost găsite programări</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? "Încercați să modificați criteriile de căutare" : "Nu aveți programări înregistrate"}
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adaugă Prima Programare
          </Button>
        </div>
      )}

      {/* Results Count */}
      {filteredAppointments.length > 0 && (
        <div className="text-center text-sm text-gray-600">
          Afișate {filteredAppointments.length} din {appointments.length} programări
        </div>
      )}
    </div>
  )
}
