"use client"

import { useState, useEffect } from "react"
import type {
  MedicalRecord,
  PatientInfo,
  Diagnosis,
  MedicalDocument,
  Symptom,
  MedicalNote,
} from "@/types/medical-record"

// Mock data for a patient
const mockPatientInfo: PatientInfo = {
  id: "1",
  firstName: "Maria",
  lastName: "Popescu",
  dateOfBirth: "18.03.1979",
  gender: "F",
  cnp: "2790318123456",
  address: "Str. Exemplu Nr. 123, București",
  phone: "+40 721 123 456",
  email: "maria.popescu@email.com",
  emergencyContact: {
    name: "Ion Popescu",
    phone: "+40 721 654 321",
    relationship: "Soț",
  },
}

const mockDiagnoses: Diagnosis[] = [
  {
    id: "1",
    name: "Carcinom mamar invaziv",
    date: "18.01.2024",
    stage: "Stadiul IA",
    doctor: "Dr. Elena Oncolog",
    hospital: "Spitalul Clinic Județean",
    description: "Diagnostic confirmat prin biopsie și imagistică",
    icd10Code: "C50.9",
    isActive: true,
  },
]

const mockDocuments: MedicalDocument[] = [
  {
    id: "1",
    name: "Rezultate CT Abdomen",
    type: "pdf",
    category: "imaging",
    date: "2024-01-20",
    uploadedBy: "Dr. Alex Radiolog",
    size: "2.4 MB",
    url: "/documents/ct-abdomen.pdf",
    isNew: true,
    tags: ["CT", "abdomen"],
  },
  {
    id: "2",
    name: "Analize Sânge Complete",
    type: "pdf",
    category: "test-results",
    date: "2024-01-18",
    uploadedBy: "Laborator Central",
    size: "1.2 MB",
    url: "/documents/analize-sange.pdf",
    isNew: false,
    tags: ["analize", "sange"],
  },
]

// Combine all mock data into a complete medical record
const mockMedicalRecord: MedicalRecord = {
  patientInfo: mockPatientInfo,
  diagnoses: mockDiagnoses,
  appointments: [],
  consultations: [],
  medications: [],
  documents: mockDocuments,
  tests: [],
  treatmentPlans: [],
  symptoms: [],
  adherenceScores: [],
  notes: [],
}

export function useMedicalRecord(patientId?: string) {
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call to fetch medical record
    const fetchMedicalRecord = async () => {
      try {
        setLoading(true)
        setError(null)

        // In a real app, this would be an API call
        // For now, we'll just use the mock data
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

        setMedicalRecord(mockMedicalRecord)
      } catch (err) {
        setError("Failed to fetch medical record")
        console.error("Error fetching medical record:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMedicalRecord()
  }, [patientId])

  // Function to add a new document
  const addDocument = (document: Omit<MedicalDocument, "id" | "isNew">) => {
    if (!medicalRecord) return

    const newDocument: MedicalDocument = {
      ...document,
      id: Date.now().toString(),
      isNew: true,
    }

    setMedicalRecord({
      ...medicalRecord,
      documents: [newDocument, ...medicalRecord.documents],
    })
  }

  // Function to add a new symptom
  const addSymptom = (symptom: Omit<Symptom, "id" | "isReported">) => {
    if (!medicalRecord) return

    const newSymptom: Symptom = {
      ...symptom,
      id: Date.now().toString(),
      isReported: true,
    }

    setMedicalRecord({
      ...medicalRecord,
      symptoms: [newSymptom, ...medicalRecord.symptoms],
    })
  }

  // Function to add a new note
  const addNote = (note: Omit<MedicalNote, "id" | "date">) => {
    if (!medicalRecord) return

    const newNote: MedicalNote = {
      ...note,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    }

    setMedicalRecord({
      ...medicalRecord,
      notes: [newNote, ...medicalRecord.notes],
    })
  }

  // Function to update patient info
  const updatePatientInfo = (updatedInfo: Partial<PatientInfo>) => {
    if (!medicalRecord) return

    setMedicalRecord({
      ...medicalRecord,
      patientInfo: {
        ...medicalRecord.patientInfo,
        ...updatedInfo,
      },
    })
  }

  return {
    medicalRecord,
    loading,
    error,
    addDocument,
    addSymptom,
    addNote,
    updatePatientInfo,
  }
}
