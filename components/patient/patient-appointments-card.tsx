"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, User, Plus } from "lucide-react"

export function PatientAppointmentsCard() {
  const upcomingAppointments = [
    {
      id: 1,
      date: "15 Ianuarie 2025",
      time: "10:30",
      duration: "45 min",
      doctor: "Dr. Emily Carter",
      specialty: "Oncologie",
      type: "Consultație de rutină",
      location: "Cabinet 205, Etaj 2",
      status: "Confirmat",
      isUrgent: false,
    },
    {
      id: 2,
      date: "22 Ianuarie 2025",
      time: "14:00",
      duration: "30 min",
      doctor: "Dr. Ana Popescu",
      specialty: "Analize Laborator",
      type: "Recoltare sânge",
      location: "Laborator, Parter",
      status: "Programat",
      isUrgent: false,
    },
    {
      id: 3,
      date: "28 Ianuarie 2025",
      time: "09:00",
      duration: "120 min",
      doctor: "Dr. Mihai Ionescu",
      specialty: "Chimioterapie",
      type: "Administrare ciclu 4",
      location: "Sala Infuzii, Etaj 1",
      status: "Confirmat",
      isUrgent: true,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmat":
        return "bg-green-100 text-green-800 border-green-200"
      case "Programat":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "În așteptare":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Programări Viitoare
          </CardTitle>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Programează
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
              appointment.isUrgent
                ? "border-red-200 bg-red-50 dark:bg-red-900/10"
                : "border-gray-200 bg-white dark:bg-gray-800"
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.type}</h4>
                  {appointment.isUrgent && (
                    <Badge variant="destructive" className="text-xs">
                      Important
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.specialty}</p>
              </div>
              <Badge variant="outline" className={getStatusColor(appointment.status)}>
                {appointment.status}
              </Badge>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Clock className="h-4 w-4 text-green-500" />
                <span>
                  {appointment.time} ({appointment.duration})
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <User className="h-4 w-4 text-purple-500" />
                <span>{appointment.doctor}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span>{appointment.location}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                Detalii
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Reprogramează
              </Button>
              {appointment.isUrgent && (
                <Button size="sm" className="flex-1">
                  Confirmă Prezența
                </Button>
              )}
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="w-full">
              Vezi Toate Programările
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Istoric Consultații
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
