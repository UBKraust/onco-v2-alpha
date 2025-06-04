export interface AppointmentType {
  id: string
  name: string
  duration: number // minutes
  category: "consultation" | "treatment" | "test" | "follow-up" | "emergency"
  requiresDocuments: boolean
  requiredDocuments?: string[]
  description?: string
}

export interface MedicalTeamMember {
  id: string
  name: string
  title: string
  specialty: string
  clinic: string
  availability: {
    [key: string]: string[] // day: available hours
  }
  isActive: boolean
}

export interface AppointmentRequirement {
  id: string
  name: string
  description: string
  isRequired: boolean
  documentType: "pdf" | "image" | "any"
  maxSize?: number // MB
}

export interface AppointmentRequest {
  patientId: string
  appointmentTypeId: string
  medicalTeamMemberId: string
  date: string
  time: string
  priority: "low" | "normal" | "high" | "urgent"
  notes?: string
  requiredDocuments: string[]
  notificationPreferences: {
    patient: boolean
    caregiver: boolean
    sms: boolean
    email: boolean
    reminderDays: number[]
  }
}

export interface Appointment extends AppointmentRequest {
  id: string
  status: "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show"
  createdBy: string
  createdAt: string
  updatedAt: string
  documentStatus: {
    [documentId: string]: "pending" | "uploaded" | "verified" | "rejected"
  }
  notifications: {
    sent: string[]
    scheduled: string[]
  }
}
