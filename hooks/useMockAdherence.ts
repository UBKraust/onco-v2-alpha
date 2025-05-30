"use client"

export interface AdherenceData {
  overallAdherence: number
  improvement: number
  missedDoses: {
    lastWeek: number
    lastMonth: number
  }
  currentMedications: Array<{
    id: string
    name: string
    dosage: string
    frequency: string
    adherenceRate: number
  }>
  alerts: Array<{
    id: string
    message: string
    timestamp: string
    severity: "low" | "medium" | "high"
  }>
  trend: {
    direction: "up" | "down" | "stable"
    description: string
    percentage: number
  }
  categories: {
    chemotherapy: number
    consultations: number
    medication: number
  }
  symptomReporting: {
    fatigue: string
    nausea: string
  }
}

export const useMockAdherence = (patientId: string): AdherenceData | null => {
  const adherenceData: Record<string, AdherenceData> = {
    "1": {
      overallAdherence: 92,
      improvement: 8,
      missedDoses: {
        lastWeek: 1,
        lastMonth: 3,
      },
      currentMedications: [
        {
          id: "1",
          name: "Carboplatin",
          dosage: "300mg",
          frequency: "O dată pe săptămână",
          adherenceRate: 100,
        },
        {
          id: "2",
          name: "Paclitaxel",
          dosage: "175mg/m²",
          frequency: "O dată pe săptămână",
          adherenceRate: 95,
        },
        {
          id: "3",
          name: "Ondansetron",
          dosage: "8mg",
          frequency: "De 3 ori pe zi",
          adherenceRate: 82,
        },
      ],
      alerts: [
        {
          id: "1",
          message: "Doză ratată: Ondansetron - ieri seara",
          timestamp: "Acum 2 ore",
          severity: "medium",
        },
      ],
      trend: {
        direction: "up",
        description: "Îmbunătățire cu 8% față de luna trecută",
        percentage: 8,
      },
      categories: {
        chemotherapy: 100,
        consultations: 95,
        medication: 82,
      },
      symptomReporting: {
        fatigue: "Moderat",
        nausea: "Ușor",
      },
    },
    "2": {
      overallAdherence: 88,
      improvement: 5,
      missedDoses: {
        lastWeek: 2,
        lastMonth: 5,
      },
      currentMedications: [
        {
          id: "1",
          name: "Rituximab",
          dosage: "375mg/m²",
          frequency: "O dată pe săptămână",
          adherenceRate: 95,
        },
        {
          id: "2",
          name: "Cyclophosphamide",
          dosage: "750mg/m²",
          frequency: "O dată pe săptămână",
          adherenceRate: 90,
        },
        {
          id: "3",
          name: "Doxorubicin",
          dosage: "50mg/m²",
          frequency: "O dată pe săptămână",
          adherenceRate: 85,
        },
      ],
      alerts: [
        {
          id: "1",
          message: "Doză ratată: Doxorubicin - acum 3 zile",
          timestamp: "Acum 1 zi",
          severity: "high",
        },
      ],
      trend: {
        direction: "up",
        description: "Îmbunătățire cu 5% față de luna trecută",
        percentage: 5,
      },
      categories: {
        chemotherapy: 95,
        consultations: 90,
        medication: 85,
      },
      symptomReporting: {
        fatigue: "Sever",
        nausea: "Moderat",
      },
    },
  }

  return adherenceData[patientId] ?? null
}
