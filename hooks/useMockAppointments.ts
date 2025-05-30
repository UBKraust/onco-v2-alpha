"use client"

export interface Appointment {
  id: string
  date: string
  time: string
  type: string
  doctor: string
  location: string
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  notes?: string
}

export interface AppointmentsData {
  upcoming: Appointment[]
  recent: Appointment[]
  nextAppointment: Appointment | null
  totalAppointments: number
  completedAppointments: number
  cancelledAppointments: number
  statistics: {
    thisMonth: number
    lastMonth: number
    trend: "up" | "down" | "stable"
  }
}

export const useMockAppointments = (patientId: string): AppointmentsData | null => {
  const appointmentsData: Record<string, AppointmentsData> = {
    "1": {
      upcoming: [
        {
          id: "1",
          date: "2024-02-15",
          time: "10:00",
          type: "Chimioterapie",
          doctor: "Dr. Andreea Marinescu",
          location: "Sala 3, Etaj 2",
          status: "scheduled",
          notes: "Ciclu 5/6 - Carboplatin + Paclitaxel",
        },
        {
          id: "2",
          date: "2024-02-20",
          time: "14:30",
          type: "Consultație Oncologie",
          doctor: "Dr. Mihai Georgescu",
          location: "Cabinet 15",
          status: "scheduled",
        },
        {
          id: "3",
          date: "2024-02-25",
          time: "09:00",
          type: "Analize Sânge",
          doctor: "Laborator",
          location: "Laborator Central",
          status: "scheduled",
        },
      ],
      recent: [
        {
          id: "4",
          date: "2024-02-08",
          time: "10:00",
          type: "Chimioterapie",
          doctor: "Dr. Andreea Marinescu",
          location: "Sala 3, Etaj 2",
          status: "completed",
          notes: "Ciclu 4/6 - Toleranță bună",
        },
        {
          id: "5",
          date: "2024-02-01",
          time: "11:30",
          type: "Consultație Oncologie",
          doctor: "Dr. Mihai Georgescu",
          location: "Cabinet 15",
          status: "completed",
        },
      ],
      nextAppointment: {
        id: "1",
        date: "2024-02-15",
        time: "10:00",
        type: "Chimioterapie",
        doctor: "Dr. Andreea Marinescu",
        location: "Sala 3, Etaj 2",
        status: "scheduled",
        notes: "Ciclu 5/6 - Carboplatin + Paclitaxel",
      },
      totalAppointments: 24,
      completedAppointments: 20,
      cancelledAppointments: 1,
      statistics: {
        thisMonth: 4,
        lastMonth: 5,
        trend: "stable",
      },
    },
    "2": {
      upcoming: [
        {
          id: "6",
          date: "2024-02-16",
          time: "11:00",
          type: "Chimioterapie",
          doctor: "Dr. Elena Popescu",
          location: "Sala 1, Etaj 1",
          status: "scheduled",
          notes: "Ciclu 3/8 - R-CHOP",
        },
        {
          id: "7",
          date: "2024-02-22",
          time: "15:00",
          type: "Consultație Hematologie",
          doctor: "Dr. Radu Ionescu",
          location: "Cabinet 8",
          status: "scheduled",
        },
      ],
      recent: [
        {
          id: "8",
          date: "2024-02-09",
          time: "11:00",
          type: "Chimioterapie",
          doctor: "Dr. Elena Popescu",
          location: "Sala 1, Etaj 1",
          status: "completed",
          notes: "Ciclu 2/8 - Efecte secundare minore",
        },
      ],
      nextAppointment: {
        id: "6",
        date: "2024-02-16",
        time: "11:00",
        type: "Chimioterapie",
        doctor: "Dr. Elena Popescu",
        location: "Sala 1, Etaj 1",
        status: "scheduled",
        notes: "Ciclu 3/8 - R-CHOP",
      },
      totalAppointments: 18,
      completedAppointments: 15,
      cancelledAppointments: 0,
      statistics: {
        thisMonth: 3,
        lastMonth: 4,
        trend: "down",
      },
    },
  }

  return appointmentsData[patientId] ?? null
}
