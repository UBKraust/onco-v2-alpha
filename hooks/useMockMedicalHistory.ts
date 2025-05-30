"use client"

import { useMemo } from "react"

export interface MedicalCondition {
  id: string
  name: string
  diagnosisDate: string
  status: "active" | "resolved" | "chronic"
  severity: "mild" | "moderate" | "severe"
}

export interface FamilyHistory {
  id: string
  relation: string
  condition: string
  ageAtDiagnosis?: number
}

export interface OncologyHistory {
  id: string
  cancerType: string
  stage: string
  diagnosisDate: string
  treatment: string
  outcome: string
}

export interface CurrentTreatment {
  id: string
  name: string
  type: "chemotherapy" | "radiation" | "surgery" | "medication"
  startDate: string
  status: "active" | "completed" | "paused"
  dosage?: string
  frequency?: string
}

export interface LabResult {
  id: string
  testName: string
  value: string
  unit: string
  normalRange: string
  date: string
  status: "normal" | "abnormal" | "critical"
}

export interface ImagingStudy {
  id: string
  type: string
  date: string
  findings: string
  radiologist: string
  status: "normal" | "abnormal"
}

export interface MedicalHistoryData {
  personalHistory: MedicalCondition[]
  familyHistory: FamilyHistory[]
  oncologyHistory: OncologyHistory[]
  currentTreatments: CurrentTreatment[]
  recentLabResults: LabResult[]
  imagingStudies: ImagingStudy[]
  allergies: string[]
  medications: string[]
  surgicalHistory: Array<{
    id: string
    procedure: string
    date: string
    surgeon: string
    outcome: string
  }>
}

export function useMockMedicalHistory(patientId: string): MedicalHistoryData {
  return useMemo(
    () => ({
      personalHistory: [
        {
          id: "1",
          name: "Hipertensiune arterială",
          diagnosisDate: "2020-03-15",
          status: "chronic",
          severity: "moderate",
        },
        {
          id: "2",
          name: "Diabet zaharat tip 2",
          diagnosisDate: "2019-08-22",
          status: "chronic",
          severity: "mild",
        },
      ],
      familyHistory: [
        {
          id: "1",
          relation: "Mamă",
          condition: "Cancer de sân",
          ageAtDiagnosis: 58,
        },
        {
          id: "2",
          relation: "Tată",
          condition: "Infarct miocardic",
          ageAtDiagnosis: 65,
        },
      ],
      oncologyHistory: [
        {
          id: "1",
          cancerType: "Limfom difuz cu celule B mari",
          stage: "Stadiul II",
          diagnosisDate: "2024-09-15",
          treatment: "R-CHOP",
          outcome: "În tratament",
        },
      ],
      currentTreatments: [
        {
          id: "1",
          name: "R-CHOP",
          type: "chemotherapy",
          startDate: "2024-09-20",
          status: "active",
          dosage: "Conform protocol",
          frequency: "La 21 de zile",
        },
        {
          id: "2",
          name: "Ondansetron",
          type: "medication",
          startDate: "2024-09-20",
          status: "active",
          dosage: "8mg",
          frequency: "De 3 ori pe zi",
        },
      ],
      recentLabResults: [
        {
          id: "1",
          testName: "Hemoglobină",
          value: "7.2",
          unit: "g/dL",
          normalRange: "12-15",
          date: "2024-11-10",
          status: "critical",
        },
        {
          id: "2",
          testName: "Leucocite",
          value: "2.1",
          unit: "x10³/μL",
          normalRange: "4-10",
          date: "2024-11-10",
          status: "abnormal",
        },
      ],
      imagingStudies: [
        {
          id: "1",
          type: "CT torace-abdomen-pelvis",
          date: "2024-10-15",
          findings: "Reducerea dimensiunilor adenopatiilor mediastinale",
          radiologist: "Dr. Popescu Radiologie",
          status: "abnormal",
        },
      ],
      allergies: ["Penicilină", "Iod"],
      medications: ["Ondansetron 8mg", "Omeprazol 20mg", "Metformin 500mg"],
      surgicalHistory: [
        {
          id: "1",
          procedure: "Biopsie ganglion limfatic",
          date: "2024-09-10",
          surgeon: "Dr. Chirurg Oncolog",
          outcome: "Fără complicații",
        },
      ],
    }),
    [patientId],
  )
}
