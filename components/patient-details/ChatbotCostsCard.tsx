"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, MessageSquare, Star } from "lucide-react"
import { useMockChatbotCosts } from "@/hooks/useMockChatbotCosts"

interface ChatbotCostsCardProps {
  patientId: string
}

export function ChatbotCostsCard({ patientId }: ChatbotCostsCardProps) {
  const data = useMockChatbotCosts(patientId)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          ChatBot & Costuri
          <Button size="sm" variant="outline" className="ml-auto">
            <MessageSquare className="h-4 w-4 mr-1" />
            Chat
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">ChatBot Activitate</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Interacțiuni luna aceasta:</span>
                  <span className="font-medium">{data.chatbot.interactionsThisMonth}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ultima utilizare:</span>
                  <span className="font-medium">{data.chatbot.lastUsed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Satisfacție:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="font-medium">{data.chatbot.satisfaction}/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Costuri Tratament</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total acoperit:</span>
                  <span className="font-medium text-green-600">{data.costs.totalCovered}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Contribuție personală:</span>
                  <span className="font-medium">{data.costs.personalContribution.toLocaleString()} RON</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Economii estimate:</span>
                  <span className="font-medium text-green-600">{data.costs.estimatedSavings.toLocaleString()} RON</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Întrebări Frecvente (ChatBot)</h4>
            <div className="space-y-2">
              {data.chatbot.frequentQuestions.map((question, index) => (
                <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                  <span className="font-medium">Q:</span> "{question}"
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
