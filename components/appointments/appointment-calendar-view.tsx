"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, CalendarIcon, User, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppointmentScheduling, type ScheduledAppointment } from "@/hooks/useAppointmentScheduling"
import { cn } from "@/lib/utils"

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  appointments: ScheduledAppointment[]
}

interface AppointmentCalendarViewProps {
  onAppointmentClick?: (appointment: ScheduledAppointment) => void
  onDateSelect?: (date: Date) => void
  showFilters?: boolean
}

export function AppointmentCalendarView({
  onAppointmentClick,
  onDateSelect,
  showFilters = true,
}: AppointmentCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<"month" | "week">("month")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [doctorFilter, setDoctorFilter] = useState<string>("all")

  const { appointments, getDoctors } = useAppointmentScheduling()
  const doctors = getDoctors()

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

  // Filter appointments based on selected filters
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      if (statusFilter !== "all" && apt.status !== statusFilter) return false
      if (doctorFilter !== "all" && apt.doctorId !== doctorFilter) return false
      return true
    })
  }, [appointments, statusFilter, doctorFilter])

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days: CalendarDay[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const dayAppointments = filteredAppointments.filter((apt) => apt.date === date.toISOString().split("T")[0])

      days.push({
        date: new Date(date),
        isCurrentMonth: date.getMonth() === month,
        isToday: date.getTime() === today.getTime(),
        isSelected: selectedDate ? date.getTime() === selectedDate.getTime() : false,
        appointments: dayAppointments,
      })
    }

    return days
  }, [currentDate, filteredAppointments, selectedDate])

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
    onDateSelect?.(today)
  }

  const handleDateClick = (day: CalendarDay) => {
    setSelectedDate(day.date)
    onDateSelect?.(day.date)
  }

  const getAppointmentTypeColor = (appointment: ScheduledAppointment) => {
    switch (appointment.type) {
      case "consultation":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "chemotherapy":
        return "bg-red-100 text-red-800 border-red-200"
      case "radiotherapy":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "followup":
        return "bg-green-100 text-green-800 border-green-200"
      case "oncology":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "cancelled":
        return "bg-red-500"
      case "completed":
        return "bg-gray-500"
      case "rescheduled":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-2xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Astăzi
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {showFilters && (
            <>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate statusurile</SelectItem>
                  <SelectItem value="scheduled">Programat</SelectItem>
                  <SelectItem value="confirmed">Confirmat</SelectItem>
                  <SelectItem value="cancelled">Anulat</SelectItem>
                  <SelectItem value="completed">Finalizat</SelectItem>
                </SelectContent>
              </Select>

              <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Medic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toți medicii</SelectItem>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}

          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-1">
            {/* Day Headers */}
            {dayNames.map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-b">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "min-h-[120px] p-2 border border-gray-100 cursor-pointer transition-all hover:bg-gray-50",
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50/50",
                  day.isToday && "bg-blue-50 border-blue-200 ring-1 ring-blue-200",
                  day.isSelected && "bg-blue-100 border-blue-300 ring-2 ring-blue-300",
                )}
                onClick={() => handleDateClick(day)}
              >
                <div className="flex flex-col h-full">
                  <div
                    className={cn(
                      "text-sm font-medium mb-2 flex items-center justify-between",
                      day.isCurrentMonth ? "text-gray-900" : "text-gray-400",
                      day.isToday && "text-blue-600 font-bold",
                    )}
                  >
                    <span>{day.date.getDate()}</span>
                    {day.appointments.length > 0 && (
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        {day.appointments.length}
                      </Badge>
                    )}
                  </div>

                  {/* Appointments */}
                  <div className="flex-1 space-y-1 overflow-hidden">
                    {day.appointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className={cn(
                          "text-xs p-1 rounded border cursor-pointer truncate transition-opacity hover:opacity-80",
                          getAppointmentTypeColor(appointment),
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          onAppointmentClick?.(appointment)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 min-w-0">
                            <div
                              className={cn("w-2 h-2 rounded-full flex-shrink-0", getStatusColor(appointment.status))}
                            />
                            <span className="truncate">{appointment.time}</span>
                          </div>
                        </div>
                        <div className="truncate font-medium">{appointment.type}</div>
                        <div className="truncate text-muted-foreground">{appointment.doctorName}</div>
                      </div>
                    ))}
                    {day.appointments.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center py-1">
                        +{day.appointments.length - 3} mai multe
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>
                Programări pentru{" "}
                {selectedDate.toLocaleDateString("ro-RO", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {calendarDays
              .find((day) => day.date.getTime() === selectedDate.getTime())
              ?.appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg mb-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onAppointmentClick?.(appointment)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center min-w-[60px]">
                      <div className="font-bold text-lg">{appointment.time}</div>
                      <div className="text-xs text-muted-foreground">{appointment.duration} min</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-lg">{appointment.type}</div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{appointment.doctorName}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{appointment.location}</div>
                      {appointment.reason && <div className="text-sm mt-1">{appointment.reason}</div>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getAppointmentTypeColor(appointment)}>
                      {appointment.priority === "urgent" && "Urgent"}
                      {appointment.priority === "high" && "Prioritate ridicată"}
                      {appointment.priority === "normal" && "Normal"}
                      {appointment.priority === "low" && "Prioritate scăzută"}
                    </Badge>
                    <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                      {appointment.status === "confirmed" && "Confirmat"}
                      {appointment.status === "scheduled" && "Programat"}
                      {appointment.status === "cancelled" && "Anulat"}
                      {appointment.status === "completed" && "Finalizat"}
                      {appointment.status === "rescheduled" && "Reprogramat"}
                    </Badge>
                  </div>
                </div>
              )) || (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Nu există programări pentru această zi.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
