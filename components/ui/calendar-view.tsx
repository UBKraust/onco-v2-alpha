"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock } from "lucide-react"
import { useCalendar, type CalendarDay } from "@/hooks/useCalendar"
import type { Appointment } from "@/types/patient"

interface CalendarViewProps {
  appointments: Appointment[]
  onAppointmentClick?: (appointment: Appointment) => void
  onDateSelect?: (date: Date) => void
}

export function CalendarView({ appointments, onAppointmentClick, onDateSelect }: CalendarViewProps) {
  const { currentDate, selectedDate, calendarDays, navigateMonth, goToToday, selectDate } = useCalendar(appointments)

  const monthNames = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ]

  const dayNames = ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"]

  const handleDateClick = (day: CalendarDay) => {
    selectDate(day.date)
    onDateSelect?.(day.date)
  }

  const getAppointmentTypeColor = (type: Appointment["type"]) => {
    switch (type) {
      case "consultatie":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "tratament":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "test":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "control":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "urgenta":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={goToToday}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Astăzi
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              min-h-[80px] p-1 border border-gray-200 cursor-pointer transition-colors
              ${day.isCurrentMonth ? "bg-white" : "bg-gray-50"}
              ${day.isToday ? "bg-blue-50 border-blue-200" : ""}
              ${day.isSelected ? "bg-blue-100 border-blue-300" : ""}
              hover:bg-gray-50
            `}
            onClick={() => handleDateClick(day)}
          >
            <div className="flex flex-col h-full">
              <div
                className={`
                  text-sm font-medium mb-1
                  ${day.isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                  ${day.isToday ? "text-blue-600 font-bold" : ""}
                `}
              >
                {day.date.getDate()}
              </div>

              {/* Appointments */}
              <div className="flex-1 space-y-1">
                {day.appointments.slice(0, 2).map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`
                      text-xs p-1 rounded cursor-pointer truncate
                      ${getAppointmentTypeColor(appointment.type)}
                      hover:opacity-80
                    `}
                    onClick={(e) => {
                      e.stopPropagation()
                      onAppointmentClick?.(appointment)
                    }}
                  >
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="truncate">{appointment.title}</div>
                  </div>
                ))}
                {day.appointments.length > 2 && (
                  <div className="text-xs text-muted-foreground">+{day.appointments.length - 2} mai multe</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">
              Programări pentru{" "}
              {selectedDate.toLocaleDateString("ro-RO", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h4>
            {calendarDays
              .find((day) => day.date.getTime() === selectedDate.getTime())
              ?.appointments.map((appointment) => {
                let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary"
                if (appointment.status === "Confirmat") badgeVariant = "default"
                else if (appointment.status === "Anulat") badgeVariant = "destructive"
                else if (appointment.status === "Finalizat") badgeVariant = "outline"

                return (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg mb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => onAppointmentClick?.(appointment)}
                  >
                    <div>
                      <div className="font-medium">{appointment.title}</div>
                      <div className="text-sm text-muted-foreground">{appointment.doctor}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.time} • {appointment.location}
                      </div>
                    </div>
                    <Badge variant={badgeVariant}>{appointment.status}</Badge>
                  </div>
                )
              }) || <p className="text-muted-foreground">Nu există programări pentru această zi.</p>}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
