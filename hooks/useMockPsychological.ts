"use client"

import { useMemo } from "react"

export interface PsychologicalAssessment {
  date: string
  generalState: "stable" | "improving" | "concerning"
  anxiety: number | string
  depression: number | string
  notes: string
}

export interface SupportResource {
  id: string
  name: string
  type: "individual" | "group" | "family" | "online"
  availability: string
  contact?: string
}

export interface PsychologicalSession {
  id: string
  date: string
  type: string
  provider: string
  notes: string
  description: string
  followUp?: string
}

export interface PsychologicalData {
  currentAssessment: PsychologicalAssessment
  supportResources: SupportResource[]
  supportAvailable: string[]
  recentSessions: PsychologicalSession[]
  recommendations: string[]
}

export function useMockPsychological(patientId: string): PsychologicalData {
  return useMemo(
    () => ({
      currentAssessment: {
        date: "05.11.2024",
        generalState: "stable",
        anxiety: "moderate",
        depression: "minimal",
        notes:
          "Pacientul prezintă anxietate moderată legată de tratament, dar starea generală este stabilă. Strategiile de coping funcționează adecvat.",
      },
      supportResources: [
        {
          id: "sr1",
          name: "Consiliere psihologică individuală",
          type: "individual",
          availability: "Marți și Joi, 10:00-16:00",
          contact: "Dr. Maria Ionescu, 0722.123.456",
        },
        {
          id: "sr2",
          name: "Grup de suport pacienți oncologici",
          type: "group",
          availability: "Miercuri, 18:00-19:30",
          contact: "Sala 204, Etaj 2",
        },
        {
          id: "sr3",
          name: "Suport pentru familie",
          type: "family",
          availability: "La cerere",
          contact: "psihologie@spital.ro",
        },
        {
          id: "sr4",
          name: "Resurse online mindfulness",
          type: "online",
          availability: "24/7",
          contact: "www.mindfulness-oncologie.ro",
        },
      ],
      supportAvailable: [
        "Consiliere psihologică individuală",
        "Grup de suport pacienți oncologici",
        "Suport pentru familie",
        "Resurse online mindfulness",
      ],
      recentSessions: [
        {
          id: "ps1",
          date: "05.11.2024",
          type: "Evaluare psihologică",
          provider: "Dr. Maria Ionescu",
          description: "Evaluare stare psihologică curentă",
          notes:
            "Pacientul prezintă anxietate moderată legată de efectele secundare ale tratamentului. S-au discutat tehnici de relaxare și gestionare a stresului.",
          followUp: "12.11.2024",
        },
        {
          id: "ps2",
          date: "28.10.2024",
          type: "Grup de suport",
          provider: "Psih. Andrei Popescu",
          description: "Participare grup de suport",
          notes: "Participare activă la discuții. A împărtășit experiența personală și a oferit suport altor pacienți.",
        },
        {
          id: "ps3",
          date: "15.10.2024",
          type: "Consiliere familie",
          provider: "Dr. Maria Ionescu",
          description: "Sesiune cu familia",
          notes:
            "Sesiune cu soția pacientului. S-au discutat modalități de suport emoțional și practic în perioada tratamentului.",
        },
      ],
      recommendations: [
        "Continuarea consilierii individuale săptămânale",
        "Participare la grupul de suport",
        "Practică zilnică de mindfulness (10-15 minute)",
        "Jurnal emoțional pentru monitorizarea stărilor de anxietate",
      ],
    }),
    [patientId],
  )
}
