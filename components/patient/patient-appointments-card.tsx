"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Video } from "lucide-react"

export function PatientAppointmentsCard() {
  const appointments = [
    {
      id: 1,
      date: "15 Ianuarie 2025",
      time: "10:30",
      doctor: "Dr. Emily Carter",
      type: "Consultație Oncologie",
      location: "Cabinet 205",
      isOnline: false,
      status: "confirmed",
    },
    {
      id: 2,
      date: "22 Ianuarie 2025",
      time: "14:00",
      doctor: "Dr. Maria Ionescu",
      type: "Analize Laborator",
      location: "Laborator",
      isOnline: false,
      status: "pending",
    },
    {
      id: 3,
      date: "29 Ianuarie 2025",
      time: "11:00",
      doctor: "Dr. Alex Popescu",
      type: "Consultație Psiholog",
      location: "Online",
      isOnline: true,
      status: "confirmed",
    },
  ]

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-600" />
          Programări Viitoare
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{appointment.type}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.doctor}</p>
              </div>
              <Badge
                variant={appointment.status === "confirmed" ? "default" : "secondary"}
                className={
                  appointment.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }
              >
                {appointment.status === "confirmed" ? "Confirmat" : "În așteptare"}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {appointment.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {appointment.time}
              </div>
              <div className="flex items-center gap-1">
                {appointment.isOnline ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                {appointment.location}
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full">
          Vezi Toate Programările
        </Button>
      </CardContent>
    </Card>
  )
}
