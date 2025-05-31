"use client"

import { useState, useCallback } from "react"
import { toast } from "@/components/ui/use-toast"

export interface TimeSlot {
  id: string
  time: string
  available: boolean
  doctorId: string
  duration: number // minutes
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  avatar?: string
  workingHours: {
    start: string
    end: string
    days: number[] // 0-6, Sunday-Saturday
  }
  unavailableDates: string[]
}

export interface AppointmentRequest {
  patientId: string
  doctorId: string
  date: string
  timeSlot: string
  type: string
  priority: "low" | "normal" | "high" | "urgent"
  reason: string
  duration: number
  location?: string
}

export interface ScheduledAppointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  duration: number
  type: string
  status: "scheduled" | "confirmed" | "cancelled" | "completed" | "rescheduled"
  priority: "low" | "normal" | "high" | "urgent"
  reason: string
  location: string
  notes?: string
  createdAt: string
  updatedAt: string
}

const mockDoctors: Doctor[] = [
  {
    id: "dr-marinescu",
    name: "Dr. Andreea Marinescu",
    specialty: "Oncologie Medicală",
    workingHours: {
      start: "08:00",
      end: "16:00",
      days: [1, 2, 3, 4, 5], // Monday to Friday
    },
    unavailableDates: ["2024-02-20", "2024-02-21"],
  },
  {
    id: "dr-georgescu",
    name: "Dr. Mihai Georgescu",
    specialty: "Chirurgie Oncologică",
    workingHours: {
      start: "09:00",
      end: "17:00",
      days: [1, 2, 3, 4, 5],
    },
    unavailableDates: ["2024-02-19"],
  },
  {
    id: "dr-popescu",
    name: "Dr. Elena Popescu",
    specialty: "Hematologie",
    workingHours: {
      start: "08:30",
      end: "15:30",
      days: [1, 2, 3, 4, 5],
    },
    unavailableDates: [],
  },
  {
    id: "dr-ionescu",
    name: "Dr. Radu Ionescu",
    specialty: "Radioterapie",
    workingHours: {
      start: "07:00",
      end: "15:00",
      days: [1, 2, 3, 4, 5, 6], // Monday to Saturday
    },
    unavailableDates: ["2024-02-22"],
  },
]

export function useAppointmentScheduling() {
  const [appointments, setAppointments] = useState<ScheduledAppointment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])

  // Get available doctors
  const getDoctors = useCallback(() => {
    return mockDoctors
  }, [])

  // Check if a date is available for a doctor
  const isDateAvailable = useCallback((doctorId: string, date: string) => {
    const doctor = mockDoctors.find((d) => d.id === doctorId)
    if (!doctor) return false

    const dateObj = new Date(date)
    const dayOfWeek = dateObj.getDay()

    // Check if doctor works on this day
    if (!doctor.workingHours.days.includes(dayOfWeek)) return false

    // Check if date is not in unavailable dates
    if (doctor.unavailableDates.includes(date)) return false

    // Check if date is not in the past
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (dateObj < today) return false

    return true
  }, [])

  // Generate time slots for a doctor on a specific date
  const generateTimeSlots = useCallback(
    (doctorId: string, date: string): TimeSlot[] => {
      const doctor = mockDoctors.find((d) => d.id === doctorId)
      if (!doctor || !isDateAvailable(doctorId, date)) return []

      const slots: TimeSlot[] = []
      const startTime = doctor.workingHours.start
      const endTime = doctor.workingHours.end

      const [startHour, startMinute] = startTime.split(":").map(Number)
      const [endHour, endMinute] = endTime.split(":").map(Number)

      const startMinutes = startHour * 60 + startMinute
      const endMinutes = endHour * 60 + endMinute
      const slotDuration = 30 // 30 minutes per slot

      for (let minutes = startMinutes; minutes < endMinutes; minutes += slotDuration) {
        const hour = Math.floor(minutes / 60)
        const minute = minutes % 60
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

        // Check if slot is already booked
        const isBooked = appointments.some(
          (apt) =>
            apt.doctorId === doctorId && apt.date === date && apt.time === timeString && apt.status !== "cancelled",
        )

        slots.push({
          id: `${doctorId}-${date}-${timeString}`,
          time: timeString,
          available: !isBooked,
          doctorId,
          duration: slotDuration,
        })
      }

      return slots
    },
    [appointments],
  )

  // Get available slots for a doctor on a date
  const getAvailableSlots = useCallback(
    async (doctorId: string, date: string) => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        const slots = generateTimeSlots(doctorId, date)
        setAvailableSlots(slots)
        return slots
      } finally {
        setIsLoading(false)
      }
    },
    [generateTimeSlots],
  )

  // Schedule a new appointment
  const scheduleAppointment = useCallback(
    async (request: AppointmentRequest): Promise<ScheduledAppointment> => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Validate the request
        if (!isDateAvailable(request.doctorId, request.date)) {
          throw new Error("Data selectată nu este disponibilă")
        }

        const slots = generateTimeSlots(request.doctorId, request.date)
        const selectedSlot = slots.find((slot) => slot.time === request.timeSlot)

        if (!selectedSlot || !selectedSlot.available) {
          throw new Error("Intervalul orar selectat nu este disponibil")
        }

        const doctor = mockDoctors.find((d) => d.id === request.doctorId)
        if (!doctor) {
          throw new Error("Medicul selectat nu a fost găsit")
        }

        const newAppointment: ScheduledAppointment = {
          id: `apt-${Date.now()}`,
          patientId: request.patientId,
          patientName: "Pacient Test", // In real app, fetch from patient data
          doctorId: request.doctorId,
          doctorName: doctor.name,
          date: request.date,
          time: request.timeSlot,
          duration: request.duration,
          type: request.type,
          status: "scheduled",
          priority: request.priority,
          reason: request.reason,
          location: request.location || "Cabinet Medical",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        setAppointments((prev) => [...prev, newAppointment])

        toast({
          title: "Programare realizată cu succes!",
          description: `Programarea a fost confirmată pentru ${request.date} la ora ${request.timeSlot}`,
        })

        return newAppointment
      } catch (error) {
        toast({
          title: "Eroare la programare",
          description: error instanceof Error ? error.message : "A apărut o eroare neașteptată",
          variant: "destructive",
        })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [generateTimeSlots, isDateAvailable],
  )

  // Reschedule an appointment
  const rescheduleAppointment = useCallback(
    async (appointmentId: string, newDate: string, newTime: string): Promise<ScheduledAppointment> => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 800))

        const appointment = appointments.find((apt) => apt.id === appointmentId)
        if (!appointment) {
          throw new Error("Programarea nu a fost găsită")
        }

        // Validate new slot
        if (!isDateAvailable(appointment.doctorId, newDate)) {
          throw new Error("Noua dată nu este disponibilă")
        }

        const slots = generateTimeSlots(appointment.doctorId, newDate)
        const newSlot = slots.find((slot) => slot.time === newTime)

        if (!newSlot || !newSlot.available) {
          throw new Error("Noul interval orar nu este disponibil")
        }

        const updatedAppointment = {
          ...appointment,
          date: newDate,
          time: newTime,
          status: "rescheduled" as const,
          updatedAt: new Date().toISOString(),
        }

        setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? updatedAppointment : apt)))

        toast({
          title: "Programare reprogramată",
          description: `Programarea a fost mutată pentru ${newDate} la ora ${newTime}`,
        })

        return updatedAppointment
      } catch (error) {
        toast({
          title: "Eroare la reprogramare",
          description: error instanceof Error ? error.message : "A apărut o eroare neașteptată",
          variant: "destructive",
        })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [appointments, generateTimeSlots, isDateAvailable],
  )

  // Cancel an appointment
  const cancelAppointment = useCallback(async (appointmentId: string, reason?: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId
            ? {
                ...apt,
                status: "cancelled" as const,
                notes: reason ? `Anulat: ${reason}` : "Anulat",
                updatedAt: new Date().toISOString(),
              }
            : apt,
        ),
      )

      toast({
        title: "Programare anulată",
        description: "Programarea a fost anulată cu succes",
      })
    } catch (error) {
      toast({
        title: "Eroare la anulare",
        description: "Nu s-a putut anula programarea",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Confirm an appointment
  const confirmAppointment = useCallback(async (appointmentId: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId
            ? {
                ...apt,
                status: "confirmed" as const,
                updatedAt: new Date().toISOString(),
              }
            : apt,
        ),
      )

      toast({
        title: "Programare confirmată",
        description: "Programarea a fost confirmată cu succes",
      })
    } catch (error) {
      toast({
        title: "Eroare la confirmare",
        description: "Nu s-a putut confirma programarea",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Get appointments for a patient
  const getPatientAppointments = useCallback(
    (patientId: string) => {
      return appointments.filter((apt) => apt.patientId === patientId)
    },
    [appointments],
  )

  // Get appointments for a doctor
  const getDoctorAppointments = useCallback(
    (doctorId: string, date?: string) => {
      return appointments.filter((apt) => apt.doctorId === doctorId && (!date || apt.date === date))
    },
    [appointments],
  )

  return {
    // State
    appointments,
    isLoading,
    selectedDoctor,
    selectedDate,
    availableSlots,

    // Actions
    setSelectedDoctor,
    setSelectedDate,
    getDoctors,
    isDateAvailable,
    getAvailableSlots,
    scheduleAppointment,
    rescheduleAppointment,
    cancelAppointment,
    confirmAppointment,
    getPatientAppointments,
    getDoctorAppointments,
  }
}
