export interface PatientInfo {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: "M" | "F" | "Altul"
  cnp: string
  address: string
  phone: string
  email: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

export interface Diagnosis {
  id: string
  name: string
  date: string
  stage: string
  doctor: string
  hospital: string
  description: string
  icd10Code?: string
  isActive: boolean
}

export interface MedicalAppointment {
  id: string
  type: "consultation" | "treatment" | "investigation" | "nutrition" | "other"
  title: string
  date: string
  time: string
  doctor: string
  specialty: string
  location: string
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  notes?: string
  documents?: string[]
}

export interface MedicalConsultation {
  id: string
  type: "consultation" | "report" | "discharge" | "prescription"
  title: string
  date: string
  doctor: string
  specialty: string
  location: string
  description: string
  status: "completed" | "pending" | "cancelled"
  documents?: string[]
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  prescribedBy: string
  status: "active" | "completed" | "discontinued"
  instructions: string
}

export interface MedicalDocument {
  id: string
  name: string
  type: "pdf" | "image" | "report" | "prescription" | "discharge" | "other"
  category: "test-results" | "imaging" | "prescription" | "report" | "discharge" | "other"
  date: string
  uploadedBy: string
  size: string
  url: string
  isNew: boolean
  tags?: string[]
}

export interface MedicalTest {
  id: string
  name: string
  date: string
  type: string
  result: string
  normalRange?: string
  unit?: string
  isAbnormal: boolean
  doctor: string
  laboratory: string
  documentId?: string
}

export interface TreatmentPlan {
  id: string
  name: string
  type: "chemotherapy" | "radiotherapy" | "surgery" | "immunotherapy" | "other"
  startDate: string
  endDate?: string
  doctor: string
  hospital: string
  description: string
  status: "active" | "completed" | "cancelled" | "on-hold"
  cycles?: number
  currentCycle?: number
  nextAppointment?: string
  medications?: Medication[]
  notes?: string
}

export interface Symptom {
  id: string
  name: string
  severity: number // 1-10
  date: string
  time: string
  duration?: string
  notes?: string
  category: "pain" | "nausea" | "fatigue" | "other"
  isReported: boolean
}

export interface AdherenceScore {
  date: string
  score: number // 0-100
  missedMedications: number
  missedAppointments: number
  reportedSymptoms: number
}

export interface MedicalNote {
  id: string
  date: string
  author: string
  authorRole: "doctor" | "navigator" | "nurse" | "patient"
  content: string
  category: "observation" | "recommendation" | "reminder" | "other"
  isPrivate: boolean // If true, only medical staff can see it
}

export interface MedicalRecord {
  patientInfo: PatientInfo
  diagnoses: Diagnosis[]
  appointments: MedicalAppointment[]
  consultations: MedicalConsultation[]
  medications: Medication[]
  documents: MedicalDocument[]
  tests: MedicalTest[]
  treatmentPlans: TreatmentPlan[]
  symptoms: Symptom[]
  adherenceScores: AdherenceScore[]
  notes: MedicalNote[]
}
