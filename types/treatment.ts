export interface TreatmentCycle {
  id: string
  cycleNumber: number
  totalCycles: number
  treatmentType: string
  protocol: string
  startDate: string
  endDate: string
  status: "scheduled" | "in-progress" | "completed" | "postponed" | "cancelled"
  progress: number // 0-100
  appointments: CycleAppointment[]
  sideEffects: SideEffect[]
  notes: string
  medications: string[]
  createdAt?: string
  updatedAt?: string
}

export interface CycleAppointment {
  id: string
  title: string
  date: string
  time: string
  type: "treatment" | "consultation" | "test" | "follow-up"
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  location: string
  doctor: string
  duration?: number
  notes?: string
}

export interface SideEffect {
  id: string
  date: string
  symptom: string
  severity: "mild" | "moderate" | "severe"
  duration: string
  notes?: string
  reportedBy: "patient" | "navigator" | "doctor"
  managementPlan?: string
  resolved?: boolean
  resolvedDate?: string
}

export interface TreatmentPlan {
  id: string
  patientId: string
  diagnosis: string
  startDate: string
  endDate?: string
  status: "active" | "completed" | "paused" | "cancelled"
  cycles: TreatmentCycle[]
  totalCycles: number
  currentCycle?: number
  protocol: string
  treatmentType: string
  primaryDoctor: string
  navigator: string
  notes?: string
  adherenceScore?: number
  createdAt: string
  updatedAt: string
}

export interface CycleFilter {
  status?: string[]
  treatmentType?: string[]
  dateRange?: {
    start: string
    end: string
  }
  hasEffects?: boolean
}
