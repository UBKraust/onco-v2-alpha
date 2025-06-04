export interface AdminUser {
  id: string
  name: string
  email: string
  role: "admin" | "navigator" | "patient" | "caregiver"
  status: "active" | "inactive" | "suspended"
  lastLogin: Date
  createdAt: Date
  permissions: string[]
  clinicId?: string
  departmentId?: string
}

export interface MedicalTeamMember {
  id: string
  name: string
  email: string
  phone: string
  specialization: string[]
  department: string
  clinicId: string
  status: "active" | "inactive" | "vacation"
  schedule: {
    [key: string]: {
      start: string
      end: string
      available: boolean
    }
  }
  patientCapacity: number
  currentPatients: number
  createdAt: Date
  updatedAt: Date
}

export interface Clinic {
  id: string
  name: string
  address: string
  phone: string
  email: string
  departments: Department[]
  status: "active" | "inactive"
  createdAt: Date
}

export interface Department {
  id: string
  name: string
  description: string
  clinicId: string
  headOfDepartment?: string
  specializations: string[]
  status: "active" | "inactive"
}

export interface PatientAssignment {
  id: string
  patientId: string
  navigatorId: string
  assignedBy: string
  assignedAt: Date
  reason: string
  status: "active" | "transferred" | "completed"
  previousNavigatorId?: string
  transferReason?: string
}

export interface SystemAlert {
  id: string
  type: "error" | "warning" | "info" | "success"
  title: string
  message: string
  severity: "low" | "medium" | "high" | "critical"
  category: "system" | "security" | "patient" | "appointment" | "user"
  createdAt: Date
  resolvedAt?: Date
  resolvedBy?: string
  status: "open" | "in_progress" | "resolved" | "dismissed"
  metadata?: Record<string, any>
}
