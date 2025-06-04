"use client"

import { useState, useCallback } from "react"
import type { AppointmentRequest } from "@/types/appointment"

export function useAppointmentWizard() {
  const [isCreating, setIsCreating] = useState(false)

  const createAppointment = useCallback(async (appointmentData: AppointmentRequest) => {
    setIsCreating(true)

    try {
      // Simulăm un apel API pentru crearea programării
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Aici ar fi logica pentru:
      // 1. Salvarea programării în baza de date
      // 2. Trimiterea notificărilor automate
      // 3. Crearea task-urilor pentru documente
      // 4. Actualizarea calendarului

      console.log("Appointment created:", appointmentData)

      // Simulăm trimiterea notificărilor
      await sendNotifications(appointmentData)

      return {
        success: true,
        appointmentId: `apt_${Date.now()}`,
        message: "Programarea a fost creată cu succes",
      }
    } catch (error) {
      console.error("Failed to create appointment:", error)
      return {
        success: false,
        error: "Eroare la crearea programării",
      }
    } finally {
      setIsCreating(false)
    }
  }, [])

  const sendNotifications = async (appointmentData: AppointmentRequest) => {
    const { notificationPreferences } = appointmentData

    // Simulăm trimiterea notificărilor
    if (notificationPreferences.patient && notificationPreferences.email) {
      console.log("Sending email notification to patient")
    }

    if (notificationPreferences.patient && notificationPreferences.sms) {
      console.log("Sending SMS notification to patient")
    }

    if (notificationPreferences.caregiver && notificationPreferences.email) {
      console.log("Sending email notification to caregiver")
    }

    if (notificationPreferences.caregiver && notificationPreferences.sms) {
      console.log("Sending SMS notification to caregiver")
    }

    // Programăm reminder-ele
    notificationPreferences.reminderDays.forEach((days) => {
      console.log(`Scheduling reminder ${days} days before appointment`)
    })
  }

  const getAvailableSlots = useCallback((doctorId: string, date: string) => {
    // Aici ar fi logica pentru a obține slot-urile disponibile
    // din baza de date, ținând cont de programările existente

    // Pentru demo, returnăm slot-uri mock
    const mockSlots = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ]

    return mockSlots
  }, [])

  const validateAppointment = useCallback((appointmentData: Partial<AppointmentRequest>) => {
    const errors: string[] = []

    if (!appointmentData.patientId) {
      errors.push("Pacientul este obligatoriu")
    }

    if (!appointmentData.appointmentTypeId) {
      errors.push("Tipul programării este obligatoriu")
    }

    if (!appointmentData.medicalTeamMemberId) {
      errors.push("Medicul este obligatoriu")
    }

    if (!appointmentData.date) {
      errors.push("Data este obligatorie")
    }

    if (!appointmentData.time) {
      errors.push("Ora este obligatorie")
    }

    // Validăm că data nu este în trecut
    if (appointmentData.date) {
      const selectedDate = new Date(appointmentData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        errors.push("Data nu poate fi în trecut")
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }, [])

  return {
    isCreating,
    createAppointment,
    getAvailableSlots,
    validateAppointment,
  }
}
