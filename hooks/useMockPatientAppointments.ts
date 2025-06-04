import type { Appointment } from "@/types/patient"

const mockAppointments: Appointment[] = [
  {
    id: "1",
    title: "Control Oncologic Periodic",
    doctor: "Dr. Elena Vasilescu",
    specialty: "Oncologie Medicală",
    date: (() => {
      const d = new Date()
      d.setDate(d.getDate() + 2)
      return d.toISOString().split("T")[0]
    })(), // Two days from now
    time: "10:00",
    location: "Clinica OncoHope, Sala 3",
    status: "Confirmat",
    type: "control",
    priority: "normal",
    notes: "Pregătire standard, aduceți analizele recente.",
  },
  {
    id: "2",
    title: "Ședința Chimioterapie #4",
    doctor: "Dr. Andrei Popa",
    specialty: "Oncologie Medicală",
    date: (() => {
      const d = new Date()
      d.setDate(d.getDate() + 7)
      return d.toISOString().split("T")[0]
    })(), // One week from now
    time: "14:30",
    location: "Spitalul Universitar, Secția Oncologie",
    status: "Confirmat",
    type: "tratament",
    priority: "high",
  },
  {
    id: "3",
    title: "Consultație Nutriționist",
    doctor: "Dr. Maria Lupu",
    specialty: "Nutriție și Dietetică",
    date: (() => {
      const d = new Date()
      d.setDate(d.getDate() + 10)
      return d.toISOString().split("T")[0]
    })(), // Ten days from now
    time: "11:00",
    location: "Centrul de Sănătate Vitalia",
    status: "În așteptare",
    type: "consultatie",
    priority: "normal",
  },
  {
    id: "4",
    title: "Analize Sânge Trimestriale",
    doctor: "Laborator Synevo",
    specialty: "Analize Medicale",
    date: (() => {
      const d = new Date()
      d.setDate(d.getDate() - 5)
      return d.toISOString().split("T")[0]
    })(), // Five days ago
    time: "08:30",
    location: "Laborator Central Synevo",
    status: "Finalizat",
    type: "test",
  },
  {
    id: "5",
    title: "Control Cardiologic",
    doctor: "Dr. Ion Georgescu",
    specialty: "Cardiologie",
    date: (() => {
      const d = new Date()
      return d.toISOString().split("T")[0]
    })(), // Today
    time: "16:00",
    location: "Clinica Inimed",
    status: "Confirmat",
    type: "control",
    priority: "high",
    notes: "Monitorizare efecte secundare tratament.",
  },
]

export function useMockPatientAppointments(): { appointments: Appointment[]; isLoading: boolean; error: null | Error } {
  // Simulate API call
  return {
    appointments: mockAppointments,
    isLoading: false,
    error: null,
  }
}
