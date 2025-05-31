"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MapPin, AlertTriangle, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppointmentScheduling, type AppointmentRequest } from "@/hooks/useAppointmentScheduling"
import { cn } from "@/lib/utils"

const appointmentTypes = [
  { id: "consultation", name: "Consultație Generală", duration: 30, color: "bg-blue-100 text-blue-800" },
  { id: "oncology", name: "Consultație Oncologie", duration: 45, color: "bg-purple-100 text-purple-800" },
  { id: "chemotherapy", name: "Chimioterapie", duration: 180, color: "bg-red-100 text-red-800" },
  { id: "radiotherapy", name: "Radioterapie", duration: 60, color: "bg-orange-100 text-orange-800" },
  { id: "followup", name: "Control Periodic", duration: 30, color: "bg-green-100 text-green-800" },
  { id: "emergency", name: "Urgență", duration: 60, color: "bg-red-100 text-red-800" },
]

const priorityLevels = [
  { id: "low", name: "Scăzută", color: "bg-blue-100 text-blue-800" },
  { id: "normal", name: "Normală", color: "bg-green-100 text-green-800" },
  { id: "high", name: "Ridicată", color: "bg-amber-100 text-amber-800" },
  { id: "urgent", name: "Urgentă", color: "bg-red-100 text-red-800" },
]

interface AdvancedAppointmentSchedulerProps {
  patientId?: string
  onAppointmentScheduled?: (appointment: any) => void
  variant?: "default" | "outline" | "secondary"
  className?: string
}

export function AdvancedAppointmentScheduler({
  patientId = "patient-1",
  onAppointmentScheduled,
  variant = "default",
  className,
}: AdvancedAppointmentSchedulerProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<AppointmentRequest>>({
    patientId,
    priority: "normal",
    duration: 30,
  })

  const {
    isLoading,
    selectedDoctor,
    selectedDate,
    availableSlots,
    setSelectedDoctor,
    setSelectedDate,
    getDoctors,
    isDateAvailable,
    getAvailableSlots,
    scheduleAppointment,
  } = useAppointmentScheduling()

  const doctors = getDoctors()

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setStep(1)
      setFormData({
        patientId,
        priority: "normal",
        duration: 30,
      })
      setSelectedDoctor(null)
      setSelectedDate("")
    }
  }, [open, patientId, setSelectedDoctor, setSelectedDate])

  // Load available slots when doctor and date are selected
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      getAvailableSlots(selectedDoctor.id, selectedDate)
    }
  }, [selectedDoctor, selectedDate, getAvailableSlots])

  const handleDoctorSelect = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId)
    if (doctor) {
      setSelectedDoctor(doctor)
      setFormData((prev) => ({ ...prev, doctorId }))
      setStep(2)
    }
  }

  const handleDateSelect = (date: string) => {
    if (selectedDoctor && isDateAvailable(selectedDoctor.id, date)) {
      setSelectedDate(date)
      setFormData((prev) => ({ ...prev, date }))
      setStep(3)
    }
  }

  const handleTimeSlotSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, timeSlot: time }))
    setStep(4)
  }

  const handleTypeSelect = (type: string) => {
    const appointmentType = appointmentTypes.find((t) => t.id === type)
    if (appointmentType) {
      setFormData((prev) => ({
        ...prev,
        type,
        duration: appointmentType.duration,
      }))
    }
  }

  const handleSchedule = async () => {
    if (!isFormComplete()) return

    try {
      const appointment = await scheduleAppointment(formData as AppointmentRequest)
      onAppointmentScheduled?.(appointment)
      setOpen(false)
    } catch (error) {
      // Error is handled in the hook
    }
  }

  const isFormComplete = () => {
    return formData.doctorId && formData.date && formData.timeSlot && formData.type && formData.reason?.trim()
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3) // 3 months ahead
    return maxDate.toISOString().split("T")[0]
  }

  const isDateDisabled = (date: string) => {
    return selectedDoctor ? !isDateAvailable(selectedDoctor.id, date) : false
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          <Calendar className="mr-2 h-4 w-4" />
          Programează Consultație
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Programare Consultație Medicală</DialogTitle>
          <DialogDescription>Urmează pașii pentru a programa o consultație cu medicul specialist.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center space-x-2 mb-4">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={cn("w-8 h-0.5 mx-2", step > stepNumber ? "bg-primary" : "bg-muted")} />
              )}
            </div>
          ))}
        </div>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6">
            {/* Step 1: Select Doctor */}
            {step >= 1 && (
              <Card className={cn(step === 1 ? "ring-2 ring-primary" : "")}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Pas 1: Selectează Medicul
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={cn(
                        "p-3 border rounded-lg cursor-pointer transition-colors",
                        selectedDoctor?.id === doctor.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                      onClick={() => handleDoctorSelect(doctor.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          <p className="text-xs text-muted-foreground">
                            Program: {doctor.workingHours.start} - {doctor.workingHours.end}
                          </p>
                        </div>
                        {selectedDoctor?.id === doctor.id && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Step 2: Select Date */}
            {step >= 2 && selectedDoctor && (
              <Card className={cn(step === 2 ? "ring-2 ring-primary" : "")}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Pas 2: Selectează Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Label htmlFor="appointment-date">Data consultației</Label>
                    <Input
                      id="appointment-date"
                      type="date"
                      min={getMinDate()}
                      max={getMaxDate()}
                      value={selectedDate}
                      onChange={(e) => handleDateSelect(e.target.value)}
                      className={cn(isDateDisabled(selectedDate) && selectedDate ? "border-red-500" : "")}
                    />
                    {isDateDisabled(selectedDate) && selectedDate && (
                      <p className="text-sm text-red-500 flex items-center">
                        <AlertTriangle className="mr-1 h-4 w-4" />
                        Data selectată nu este disponibilă pentru acest medic
                      </p>
                    )}
                    {selectedDoctor.unavailableDates.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium">Date indisponibile:</p>
                        <p>{selectedDoctor.unavailableDates.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Select Time Slot */}
            {step >= 3 && selectedDate && availableSlots.length > 0 && (
              <Card className={cn(step === 3 ? "ring-2 ring-primary" : "")}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Pas 3: Selectează Ora
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={formData.timeSlot === slot.time ? "default" : "outline"}
                        size="sm"
                        disabled={!slot.available || isLoading}
                        onClick={() => handleTimeSlotSelect(slot.time)}
                        className="justify-center"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                  {availableSlots.filter((s) => s.available).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nu sunt intervale disponibile pentru această dată
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 4: Appointment Details */}
            {step >= 4 && formData.timeSlot && (
              <Card className={cn(step === 4 ? "ring-2 ring-primary" : "")}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Pas 4: Detalii Consultație
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label>Tipul consultației</Label>
                      <Select value={formData.type} onValueChange={handleTypeSelect}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectați tipul consultației" />
                        </SelectTrigger>
                        <SelectContent>
                          {appointmentTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              <div className="flex items-center space-x-2">
                                <span>{type.name}</span>
                                <Badge variant="outline" className={type.color}>
                                  {type.duration} min
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Prioritate</Label>
                      <RadioGroup
                        value={formData.priority}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value as any }))}
                        className="flex space-x-4"
                      >
                        {priorityLevels.map((level) => (
                          <div key={level.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={level.id} id={`priority-${level.id}`} />
                            <Label
                              htmlFor={`priority-${level.id}`}
                              className={cn("px-2 py-1 rounded text-xs", level.color)}
                            >
                              {level.name}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="reason">Motivul consultației *</Label>
                      <Textarea
                        id="reason"
                        value={formData.reason || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
                        placeholder="Descrieți pe scurt motivul pentru care doriți să programați consultația..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Locația (opțional)</Label>
                      <Input
                        id="location"
                        value={formData.location || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="Cabinet medical, Sala de tratament, etc."
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Summary */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Rezumat Programare</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Medic:</strong> {selectedDoctor?.name}
                      </p>
                      <p>
                        <strong>Data:</strong> {selectedDate}
                      </p>
                      <p>
                        <strong>Ora:</strong> {formData.timeSlot}
                      </p>
                      <p>
                        <strong>Durata:</strong> {formData.duration} minute
                      </p>
                      {formData.type && (
                        <p>
                          <strong>Tip:</strong> {appointmentTypes.find((t) => t.id === formData.type)?.name}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} disabled={isLoading}>
                Înapoi
              </Button>
            )}
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
              Anulează
            </Button>
          </div>

          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !selectedDoctor) ||
                (step === 2 && (!selectedDate || isDateDisabled(selectedDate))) ||
                (step === 3 && !formData.timeSlot) ||
                isLoading
              }
            >
              Continuă
            </Button>
          ) : (
            <Button onClick={handleSchedule} disabled={!isFormComplete() || isLoading}>
              {isLoading ? "Se programează..." : "Confirmă Programarea"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
