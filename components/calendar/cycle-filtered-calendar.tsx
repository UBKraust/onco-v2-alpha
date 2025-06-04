"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarView } from "@/components/ui/calendar-view"
import { Filter, X, Calendar, Activity } from "lucide-react"
import type { Appointment } from "@/types/patient"
import type { TreatmentCycle } from "@/types/treatment"

interface CycleFilteredCalendarProps {
  appointments: Appointment[]
  cycles: TreatmentCycle[]
  selectedCycleId?: string
  onCycleFilterChange?: (cycleId: string | null) => void
  onAppointmentClick?: (appointment: Appointment) => void
}

export function CycleFilteredCalendar({
  appointments,
  cycles,
  selectedCycleId,
  onCycleFilterChange,
  onAppointmentClick,
}: CycleFilteredCalendarProps) {
  const [activeCycleFilter, setActiveCycleFilter] = useState<string | null>(selectedCycleId || null)

  // Filtrează programările pe baza ciclului selectat
  const filteredAppointments = useMemo(() => {
    if (!activeCycleFilter) return appointments

    const selectedCycle = cycles.find((cycle) => cycle.id === activeCycleFilter)
    if (!selectedCycle) return appointments

    // Filtrează programările care aparțin ciclului selectat
    const cycleAppointmentIds = selectedCycle.appointments.map((apt) => apt.id)
    return appointments.filter((apt) => cycleAppointmentIds.includes(apt.id))
  }, [appointments, cycles, activeCycleFilter])

  const handleCycleFilterChange = (cycleId: string | null) => {
    setActiveCycleFilter(cycleId)
    onCycleFilterChange?.(cycleId)
  }

  const clearFilter = () => {
    handleCycleFilterChange(null)
  }

  const selectedCycle = cycles.find((cycle) => cycle.id === activeCycleFilter)

  return (
    <div className="space-y-6">
      {/* Header cu filtre */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtrare Calendar după Ciclu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1">
              <Select
                value={activeCycleFilter || "all"}
                onValueChange={(value) => handleCycleFilterChange(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-full md:w-80">
                  <SelectValue placeholder="Selectează un ciclu pentru filtrare..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate programările</SelectItem>
                  {cycles.map((cycle) => (
                    <SelectItem key={cycle.id} value={cycle.id}>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span>
                          {cycle.treatmentType} - Ciclul {cycle.cycleNumber} din {cycle.totalCycles}
                        </span>
                        <Badge variant="outline" className="ml-2">
                          {cycle.protocol}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {activeCycleFilter && (
              <Button variant="outline" size="sm" onClick={clearFilter}>
                <X className="mr-2 h-4 w-4" />
                Șterge Filtrul
              </Button>
            )}
          </div>

          {/* Informații despre ciclul selectat */}
          {selectedCycle && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">
                    {selectedCycle.treatmentType} - Ciclul {selectedCycle.cycleNumber} din {selectedCycle.totalCycles}
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-blue-700 dark:text-blue-300">
                    <span>Protocol: {selectedCycle.protocol}</span>
                    <span>•</span>
                    <span>
                      Perioada: {new Date(selectedCycle.startDate).toLocaleDateString("ro-RO")} -{" "}
                      {new Date(selectedCycle.endDate).toLocaleDateString("ro-RO")}
                    </span>
                    <span>•</span>
                    <span>Status: {selectedCycle.status}</span>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-blue-700 border-blue-300">
                      {filteredAppointments.length} programări în acest ciclu
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={clearFilter}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calendar cu programările filtrate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {activeCycleFilter
              ? `Calendar - ${selectedCycle?.treatmentType} Ciclul ${selectedCycle?.cycleNumber}`
              : "Calendar - Toate Programările"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarView appointments={filteredAppointments} onAppointmentClick={onAppointmentClick} />
        </CardContent>
      </Card>

      {/* Statistici pentru ciclul filtrat */}
      {selectedCycle && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Programări Totale</p>
                  <p className="text-2xl font-bold">{selectedCycle.appointments.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completate</p>
                  <p className="text-2xl font-bold text-green-600">
                    {selectedCycle.appointments.filter((apt) => apt.status === "completed").length}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Progres Ciclu</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedCycle.progress}%</p>
                </div>
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
