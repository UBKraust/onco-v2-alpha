export interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  diagnosis: string
  stage: string
  diagnosisDate: string
  attendingPhysician: string
  navigator: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  treatmentPlan: {
    protocol: string
    cycle: number
    totalCycles: number
    startDate: string
    nextSession: string
    progress: number
  }
}

export interface Appointment {
  id: string
  title: string
  doctor: string
  date: string
  time: string
  location: string
  type: "consultation" | "treatment" | "test" | "follow-up"
  status: "confirmed" | "pending" | "cancelled" | "completed"
  notes?: string
}

export interface Symptom {
  id: string
  name: string
  severity: number // 1-10
  date: string
  time: string
  notes?: string
  category: "pain" | "nausea" | "fatigue" | "other"
}

export interface Document {
  id: string
  name: string
  type: "pdf" | "image" | "report"
  category: "test-results" | "imaging" | "prescription" | "report"
  date: string
  size: string
  isNew: boolean
}

export interface Message {
  id: string
  from: string
  to: string
  subject: string
  content: string
  date: string
  isRead: boolean
  priority: "low" | "normal" | "high" | "urgent"
}

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
  category: "medication" | "exercise" | "appointment" | "other"
  priority: "low" | "normal" | "high"
}
