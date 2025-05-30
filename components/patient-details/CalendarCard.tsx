"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Plus } from "lucide-react"
import { useMockCalendar } from "@/hooks/useMockCalendar"

interface CalendarCardProps {
  patientId: string
}

export function CalendarCard({ patientId }: CalendarCardProps) {
  const calendarData = useMockCalendar(patientId)

  if (!calendarData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar Integrat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Se încarcă datele calendarului...</p>
        </CardContent>
      </Card>
    )
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-500"
      case "treatment":
        return "bg-green-500"
      case "test":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  // Generate calendar days for current month
  const currentMonthDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 3 // Offset to start from Monday
    return day > 0 && day <= 30 ? day : null
  })

  // Get event days from the calendar data
  const eventDays = calendarData.currentMonth.events.map((event) => {
    const date = new Date(event.date)
    return date.getDate()
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Calendar Integrat
          <Button size="sm" variant="outline" className="ml-auto">
            <Plus className="h-4 w-4 mr-1" />
            Adaugă Eveniment
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            <div className="font-medium p-2">L</div>
            <div className="font-medium p-2">M</div>
            <div className="font-medium p-2">M</div>
            <div className="font-medium p-2">J</div>
            <div className="font-medium p-2">V</div>
            <div className="font-medium p-2">S</div>
            <div className="font-medium p-2">D</div>

            {currentMonthDays.map((day, index) => (
              <div
                key={index}
                className={`p-2 ${
                  day === null
                    ? "text-gray-400"
                    : eventDays.includes(day)
                      ? day === 15
                        ? "bg-blue-100 text-blue-800 rounded font-medium"
                        : "bg-green-100 text-green-800 rounded font-medium"
                      : ""
                }`}
              >
                {day || ""}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Evenimente Următoare</h4>
            <div className="space-y-2">
              {calendarData.upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className={`w-3 h-3 ${getEventColor(event.type)} rounded-full`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-gray-600">
                      {event.date}, {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
