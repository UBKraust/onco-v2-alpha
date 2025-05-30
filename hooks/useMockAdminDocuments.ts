"use client"

import { useMemo } from "react"

export interface AdminDocument {
  id: string
  name: string
  type: "insurance" | "consent" | "legal" | "financial"
  status: "complete" | "pending" | "missing"
  uploadDate?: string
  expiryDate?: string
  required: boolean
}

export interface AdminDocumentsData {
  documents: AdminDocument[]
  completed: number
  total: number
  completionPercentage: number
  pendingActions: string[]
  recentUploads: string[]
}

export function useMockAdminDocuments(patientId: string): AdminDocumentsData {
  return useMemo(
    () => ({
      documents: [
        {
          id: "1",
          name: "Formular de consimțământ informat",
          type: "consent",
          status: "complete",
          uploadDate: "15.09.2024",
          required: true,
        },
        {
          id: "2",
          name: "Adeverință de asigurat CNAS",
          type: "insurance",
          status: "complete",
          uploadDate: "16.09.2024",
          expiryDate: "31.12.2024",
          required: true,
        },
        {
          id: "3",
          name: "Declarație pe propria răspundere",
          type: "legal",
          status: "pending",
          required: true,
        },
        {
          id: "4",
          name: "Formular decontare transport",
          type: "financial",
          status: "missing",
          required: false,
        },
        {
          id: "5",
          name: "Copie act de identitate",
          type: "legal",
          status: "complete",
          uploadDate: "15.09.2024",
          required: true,
        },
      ],
      completed: 3,
      total: 5,
      completionPercentage: 60,
      pendingActions: ["Completare declarație pe propria răspundere", "Încărcare formular decontare transport"],
      recentUploads: ["Adeverință CNAS - 16.09.2024", "Act identitate - 15.09.2024"],
    }),
    [patientId],
  )
}
