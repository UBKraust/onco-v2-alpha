export interface Navigator {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  specialization: string
  department: string
  experience: number
  certification: string[]
  activePatients: number
  maxCapacity: number
  workSchedule: {
    monday: { start: string; end: string }
    tuesday: { start: string; end: string }
    wednesday: { start: string; end: string }
    thursday: { start: string; end: string }
    friday: { start: string; end: string }
    saturday?: { start: string; end: string }
    sunday?: { start: string; end: string }
  }
}

export interface PatientAlert {
  id: string
  patientId: string
  patientName: string
  type: "critical" | "high" | "medium" | "low"
  category: "medical" | "appointment" | "medication" | "communication" | "system"
  title: string
  description: string
  timestamp: string
  isRead: boolean
  isResolved: boolean
  assignedTo: string
  escalationLevel: number
  relatedData?: any
}

export interface NavigatorTask {
  id: string
  title: string
  description: string
  patientId: string
  patientName: string
  priority: "urgent" | "high" | "normal" | "low"
  category: "follow-up" | "assessment" | "coordination" | "documentation" | "education"
  dueDate: string
  estimatedDuration: number // minutes
  status: "pending" | "in-progress" | "completed" | "overdue"
  assignedBy: string
  notes?: string
}

export interface PatientSummary {
  id: string
  firstName: string
  lastName: string
  age: number
  diagnosis: string
  stage: string
  riskLevel: "low" | "medium" | "high" | "critical"
  lastContact: string
  nextAppointment?: string
  adherenceScore: number
  recentSymptoms: number
  unreadMessages: number
  activeAlerts: number
  treatmentPhase: string
  navigator: string
  primaryPhysician: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

export interface CommunicationThread {
  id: string
  participants: string[]
  subject: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  priority: "normal" | "high" | "urgent"
  category: "patient-care" | "team-coordination" | "administrative" | "emergency"
  patientId?: string
  isActive: boolean
}

export interface PerformanceMetrics {
  period: string
  patientsManaged: number
  averageResponseTime: number // hours
  patientSatisfactionScore: number
  adherenceImprovementRate: number
  criticalAlertsResolved: number
  appointmentsCoordinated: number
  educationalSessionsConducted: number
  escalationsToPhysicians: number
  completedTasks: number
  overdueTasksRate: number
}

// Interfețe noi pentru detaliile pacientului
export interface TimelineItem {
  id: string
  date: string
  title: string
  description: string
  type: "treatment" | "appointment" | "test" | "medication" | "milestone"
  status: "completed" | "scheduled" | "cancelled"
  provider?: string
}

export interface ObjectiveItem {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "pending"
  dueDate: string
  priority: "high" | "medium" | "low"
  category: "treatment" | "lifestyle" | "monitoring"
}

export interface ParameterItem {
  id: string
  name: string
  value: number
  unit: string
  timestamp: string
  normalRange?: { min: number; max: number }
  trend?: "increasing" | "decreasing" | "stable"
}

export interface SymptomItem {
  id: string
  name: string
  severity: number // 1-10
  frequency: "daily" | "weekly" | "occasional" | "rare"
  timestamp: string
  notes?: string
  triggers?: string[]
}

export interface DocumentItem {
  id: string
  title: string
  type: "lab-result" | "imaging" | "report" | "prescription" | "other"
  uploadDate: string
  fileUrl: string
  status: "pending" | "validated" | "rejected"
  validatedBy?: string
  size: string
}

export interface NoteItem {
  id: string
  content: string
  timestamp: string
  author: string
  category: "clinical" | "personal" | "administrative"
  isPrivate: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  specialization: string
  contact: string
  isActive: boolean
}

export interface RiskAssessment {
  overall: "low" | "medium" | "high" | "critical"
  factors: {
    category: string
    level: "low" | "medium" | "high"
    description: string
    recommendations?: string
  }[]
  lastUpdated: string
}

export interface EducationStatus {
  id: string
  title: string
  type: "video" | "article" | "quiz" | "webinar"
  status: "completed" | "in-progress" | "not-started"
  score?: number
  completedAt?: string
  duration?: number
}

// Interfață pentru selecția pacienților
export interface PatientSelectionProps {
  onSelectPatient?: (patientId: string) => void
}
