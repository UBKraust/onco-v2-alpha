"use client"

import { useState, useMemo } from "react"
import type { Appointment } from "@/types/patient"

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  appointments: Appointment[]
}

export function useCalendar(appointments: Appointment[] = []) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const daysInMonth = lastDayOfMonth.getDate()

    const days: CalendarDay[] = []

    // Previous month days
    const prevMonth = new Date(currentYear, currentMonth - 1, 0)
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1, prevMonth.getDate() - i)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: date.getTime() === today.getTime(),
        isSelected: selectedDate ? date.getTime() === selectedDate.getTime() : false,
        appointments: getAppointmentsForDate(date, appointments),
      })
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.getTime() === today.getTime(),
        isSelected: selectedDate ? date.getTime() === selectedDate.getTime() : false,
        appointments: getAppointmentsForDate(date, appointments),
      })
    }

    // Next month days
    const remainingDays = 42 - days.length // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(currentYear, currentMonth + 1, day)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: date.getTime() === today.getTime(),
        isSelected: selectedDate ? date.getTime() === selectedDate.getTime() : false,
        appointments: getAppointmentsForDate(date, appointments),
      })
    }

    return days
  }, [currentDate, selectedDate, appointments, today])

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
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  const selectDate = (date: Date) => {
    setSelectedDate(date)
  }

  const getSelectedDateAppointments = () => {
    if (!selectedDate) return []
    return getAppointmentsForDate(selectedDate, appointments)
  }

  return {
    currentDate,
    selectedDate,
    view,
    calendarDays,
    navigateMonth,
    goToToday,
    selectDate,
    setView,
    getSelectedDateAppointments,
  }
}

function getAppointmentsForDate(date: Date, appointments: Appointment[]): Appointment[] {
  const dateStr = date.toISOString().split("T")[0]
  return appointments.filter((apt) => apt.date === dateStr)
}
