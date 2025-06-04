"use client"

import { useState, useEffect } from "react"

export interface AIProtocol {
  title: string
  summary: string
  status: "activ" | "în_curs" | "planificat"
  recommendations: string[]
  lastUpdated: string
}

export interface AIProtocolData {
  overallRisk: number
  insights: string[]
  nextReview: string
  protocols: AIProtocol[]
}

export function useMockAIProtocol(patientId: string): AIProtocolData {
  const [data, setData] = useState<AIProtocolData>({
    overallRisk: 68, // % risc general estimat
    insights: [
      "Creștere moderată a riscului infecțios în ultimele 2 săptămâni.",
      "Simptome raportate frecvent: oboseală, greață.",
      "Sugestie: monitorizare nutrițională și control hematologic.",
      "Răspuns pozitiv la tratamentul actual - continuare protocol.",
    ],
    nextReview: "15 iunie 2025",
    protocols: [
      {
        title: "Protocol Nutrițional AI",
        summary: "Plan de alimentație adaptat pentru creșterea imunității.",
        status: "activ",
        recommendations: [
          "Creșterea aportului de proteine la 1.5g/kg corp.",
          "Hidratare regulată - minimum 2L apă/zi.",
          "Mese mici frecvente - 5-6 pe zi.",
          "Suplimente cu zinc și vitamina C.",
        ],
        lastUpdated: "30 mai 2025",
      },
      {
        title: "Protocol Suport Psihologic AI",
        summary: "Plan recomandat pentru gestionarea anxietății asociate tratamentului.",
        status: "în_curs",
        recommendations: [
          "Ședințe săptămânale cu psiholog oncologic.",
          "Jurnal de gânduri și emoții zilnic.",
          "Tehnici de respirație și relaxare.",
          "Grup de suport pentru pacienți oncologici.",
        ],
        lastUpdated: "28 mai 2025",
      },
      {
        title: "Protocol Monitorizare Imunitate AI",
        summary: "Monitorizare hematologică automată pe baza analizelor recente.",
        status: "planificat",
        recommendations: [
          "Verificare leucocite la fiecare 5 zile.",
          "Suplimentare cu vitamine C și D.",
          "Monitorizare temperatura corporală de 2 ori/zi.",
          "Evitarea contactului cu persoane bolnave.",
        ],
        lastUpdated: "27 mai 2025",
      },
      {
        title: "Protocol Activitate Fizică AI",
        summary: "Program de exerciții adaptat pentru menținerea forței și energiei.",
        status: "activ",
        recommendations: [
          "Plimbări zilnice de 20-30 minute.",
          "Exerciții de stretching dimineața.",
          "Yoga sau pilates 2 ori/săptămână.",
          "Evitarea efortului fizic intens.",
        ],
        lastUpdated: "25 mai 2025",
      },
    ],
  })

  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto")
  const [displayDensity, setDisplayDensity] = useState<"compact" | "standard">("standard")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Simulate data fetching
        const newData = {
          overallRisk: 70,
          insights: [
            "Creștere moderată a riscului infecțios în ultimele 2 săptămâni.",
            "Simptome raportate frecvent: oboseală, greață.",
            "Sugestie: monitorizare nutrițională și control hematologic.",
            "Răspuns pozitiv la tratamentul actual - continuare protocol.",
          ],
          nextReview: "16 iunie 2025",
          protocols: [
            {
              title: "Protocol Nutrițional AI",
              summary: "Plan de alimentație adaptat pentru creșterea imunității.",
              status: "activ",
              recommendations: [
                "Creșterea aportului de proteine la 1.6g/kg corp.",
                "Hidratare regulată - minimum 2L apă/zi.",
                "Mese mici frecvente - 5-6 pe zi.",
                "Suplimente cu zinc și vitamina C.",
              ],
              lastUpdated: "31 mai 2025",
            },
            {
              title: "Protocol Suport Psihologic AI",
              summary: "Plan recomandat pentru gestionarea anxietății asociate tratamentului.",
              status: "în_curs",
              recommendations: [
                "Ședințe săptămânale cu psiholog oncologic.",
                "Jurnal de gânduri și emoții zilnic.",
                "Tehnici de respirație și relaxare.",
                "Grup de suport pentru pacienți oncologici.",
              ],
              lastUpdated: "29 mai 2025",
            },
            {
              title: "Protocol Monitorizare Imunitate AI",
              summary: "Monitorizare hematologică automată pe baza analizelor recente.",
              status: "planificat",
              recommendations: [
                "Verificare leucocite la fiecare 5 zile.",
                "Suplimentare cu vitamine C și D.",
                "Monitorizare temperatura corporală de 2 ori/zi.",
                "Evitarea contactului cu persoane bolnave.",
              ],
              lastUpdated: "28 mai 2025",
            },
            {
              title: "Protocol Activitate Fizică AI",
              summary: "Program de exerciții adaptat pentru menținerea forței și energiei.",
              status: "activ",
              recommendations: [
                "Plimbări zilnice de 20-30 minute.",
                "Exerciții de stretching dimineața.",
                "Yoga sau pilates 2 ori/săptămână.",
                "Evitarea efortului fizic intens.",
              ],
              lastUpdated: "26 mai 2025",
            },
          ],
        }
        setData(newData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }

    fetchData()
  }, [patientId])

  const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
    setTheme(newTheme)
  }

  const handleDisplayDensityChange = (newDensity: "compact" | "standard") => {
    setDisplayDensity(newDensity)
  }

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  return {
    ...data,
    theme,
    displayDensity,
    notificationsEnabled,
    handleThemeChange,
    handleDisplayDensityChange,
    handleNotificationsToggle,
  }
}
