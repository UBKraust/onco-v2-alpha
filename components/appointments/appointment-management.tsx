"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, Clock, User, MapPin, MoreVertical, Edit, X, CheckCircle, Phone, Mail } from "lucide-react"
import { useAppointmentScheduling, type ScheduledAppointment } from "@/hooks/useAppointmentScheduling"
import { cn } from "@/lib/utils"

interface AppointmentManagementProps {
  patientId?: string
  doctorId?: string
  showAllAppointments?: boolean
}

export function AppointmentManagement({
  patientId,
  doctorId,
  showAllAppointments = false,
}: AppointmentManagementProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<ScheduledAppointment | null>(null)
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("")
  const [cancelReason, setCancelReason] = useState("")

  const {
    appointments,
    isLoading,
    availableSlots,
    getAvailableSlots,
    rescheduleAppointment,
    cancelAppointment,
    confirmAppointment,
    getPatientAppointments,
    getDoctorAppointments,
  } = useAppointmentScheduling()

  // Get filtered appointments based on props
  const getFilteredAppointments = () => {
    if (patientId) {
      return getPatientAppointments(patientId)
    }
    if (doctorId) {
      return getDoctorAppointments(doctorId)
    }
    if (showAllAppointments) {
      return appointments
    }
    return []
  }

  const filteredAppointments = getFilteredAppointments()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "rescheduled":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800"
      case "normal":
        return "bg-green-100 text-green-800"
      case "high":
        return "bg-amber-100 text-amber-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleReschedule = async () => {
    if (!selectedAppointment || !newDate || !newTime) return

    try {
      await rescheduleAppointment(selectedAppointment.id, newDate, newTime)
      setRescheduleDialogOpen(false)
      setSelectedAppointment(null)
      setNewDate("")
      setNewTime("")
    } catch (error) {
      // Error handled in hook
    }
  }

  const handleCancel = async () => {
    if (!selectedAppointment) return

    try {
      await cancelAppointment(selectedAppointment.id, cancelReason)
      setCancelDialogOpen(false)
      setSelectedAppointment(null)
      setCancelReason("")
    } catch (error) {
      // Error handled in hook
    }
  }

  const handleConfirm = async (appointment: ScheduledAppointment) => {
    try {
      await confirmAppointment(appointment.id)
    } catch (error) {
      // Error handled in hook
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isUpcoming = (appointment: ScheduledAppointment) => {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`)
    return appointmentDate > new Date()
  }

  // Load available slots when date changes in reschedule dialog
  const handleDateChange = (date: string) => {
    setNewDate(date)
    if (selectedAppointment && date) {
      getAvailableSlots(selectedAppointment.doctorId, date)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Programări</h3>
          <p className="text-sm text-muted-foreground">{filteredAppointments.length} programări găsite</p>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nu există programări</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              className={cn("transition-shadow hover:shadow-md", !isUpcoming(appointment) && "opacity-75")}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{appointment.type}</h4>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status === "scheduled" && "Programat"}
                        {appointment.status === "confirmed" && "Confirmat"}
                        {appointment.status === "cancelled" && "Anulat"}
                        {appointment.status === "completed" && "Finalizat"}
                        {appointment.status === "rescheduled" && "Reprogramat"}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(appointment.priority)}>
                        {appointment.priority === "low" && "Scăzută"}
                        {appointment.priority === "normal" && "Normală"}
                        {appointment.priority === "high" && "Ridicată"}
                        {appointment.priority === "urgent" && "Urgentă"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{appointment.doctorName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {appointment.time} ({appointment.duration} min)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>

                    {appointment.reason && (
                      <div className="text-sm">
                        <strong>Motiv:</strong> {appointment.reason}
                      </div>
                    )}

                    {appointment.notes && (
                      <div className="text-sm text-muted-foreground">
                        <strong>Note:</strong> {appointment.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {appointment.status === "scheduled" && isUpcoming(appointment) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleConfirm(appointment)}
                        disabled={isLoading}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Confirmă
                      </Button>
                    )}

                    {isUpcoming(appointment) && appointment.status !== "cancelled" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acțiuni</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setRescheduleDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Reprogramează
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setCancelDialogOpen(true)
                            }}
                            className="text-red-600"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Anulează
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Contactează pacientul
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Trimite email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reprogramează Consultația</DialogTitle>
            <DialogDescription>Selectează o nouă dată și oră pentru consultație.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-date">Noua dată</Label>
              <Input
                id="new-date"
                type="date"
                value={newDate}
                onChange={(e) => handleDateChange(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {newDate && availableSlots.length > 0 && (
              <div>
                <Label>Ora disponibilă</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {availableSlots
                    .filter((slot) => slot.available)
                    .map((slot) => (
                      <Button
                        key={slot.id}
                        variant={newTime === slot.time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewTime(slot.time)}
                      >
                        {slot.time}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleDialogOpen(false)}>
              Anulează
            </Button>
            <Button onClick={handleReschedule} disabled={!newDate || !newTime || isLoading}>
              {isLoading ? "Se reprogramează..." : "Reprogramează"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Anulează Programarea</DialogTitle>
            <DialogDescription>
              Ești sigur că vrei să anulezi această programare? Această acțiune nu poate fi anulată.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cancel-reason">Motivul anulării (opțional)</Label>
              <Textarea
                id="cancel-reason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Specifică motivul anulării..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Înapoi
            </Button>
            <Button variant="destructive" onClick={handleCancel} disabled={isLoading}>
              {isLoading ? "Se anulează..." : "Anulează Programarea"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
