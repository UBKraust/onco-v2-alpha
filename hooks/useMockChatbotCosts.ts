"use client"

import { useMemo } from "react"

export interface ChatbotInteraction {
  id: string
  date: string
  topic: string
  questions: number
  duration: number // in minutes
}

export interface CostBreakdown {
  category: string
  covered: number // in RON
  personal: number // in RON
}

export interface ChatbotCostsData {
  chatbotStats: {
    totalInteractions: number
    interactionsThisMonth: number
    averageDuration: number // in minutes
    satisfactionScore: number // 0-5 scale
    lastUsed: string
  }
  chatbot: {
    interactionsThisMonth: number
    lastUsed: string
    satisfaction: number
    frequentQuestions: string[]
  }
  costs: {
    totalCovered: number
    personalContribution: number
    estimatedSavings: number
  }
  frequentTopics: {
    topic: string
    percentage: number
  }[]
  recentInteractions: ChatbotInteraction[]
  costsBreakdown: {
    totalCovered: number // in RON
    totalPersonal: number // in RON
    estimatedSavings: number // in RON
    breakdown: CostBreakdown[]
  }
}

export function useMockChatbotCosts(patientId: string): ChatbotCostsData {
  return useMemo(
    () => ({
      chatbotStats: {
        totalInteractions: 87,
        interactionsThisMonth: 23,
        averageDuration: 8.5,
        satisfactionScore: 4.7,
        lastUsed: "Azi, 09:15",
      },
      chatbot: {
        interactionsThisMonth: 23,
        lastUsed: "Azi, 09:15",
        satisfaction: 4.7,
        frequentQuestions: [
          "Care sunt efectele secundare ale tratamentului?",
          "Când este următoarea programare?",
          "Ce alimente pot consuma în timpul tratamentului?",
          "Cum pot gestiona oboseala?",
        ],
      },
      costs: {
        totalCovered: 85,
        personalContribution: 2500,
        estimatedSavings: 45000,
      },
      frequentTopics: [
        { topic: "Efecte secundare", percentage: 35 },
        { topic: "Programări", percentage: 25 },
        { topic: "Medicație", percentage: 20 },
        { topic: "Nutriție", percentage: 15 },
        { topic: "Altele", percentage: 5 },
      ],
      recentInteractions: [
        {
          id: "ci1",
          date: "10.11.2024, 09:15",
          topic: "Efecte secundare tratament",
          questions: 5,
          duration: 12,
        },
        {
          id: "ci2",
          date: "08.11.2024, 18:30",
          topic: "Programare analize",
          questions: 3,
          duration: 5,
        },
        {
          id: "ci3",
          date: "05.11.2024, 21:45",
          topic: "Nutriție în timpul tratamentului",
          questions: 7,
          duration: 15,
        },
      ],
      costsBreakdown: {
        totalCovered: 12500,
        totalPersonal: 2500,
        estimatedSavings: 45000,
        breakdown: [
          { category: "Consultații evitate", covered: 8500, personal: 1500 },
          { category: "Deplasări evitate", covered: 2000, personal: 500 },
          { category: "Timp economisit", covered: 2000, personal: 500 },
        ],
      },
    }),
    [patientId],
  )
}
