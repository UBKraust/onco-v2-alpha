"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "lucide-react"
import type { AdherenceScore } from "@/types/medical-record"

interface AdherenceScoreCardProps {
  adherenceScores: AdherenceScore[]
  detailed?: boolean
  className?: string
}

export function AdherenceScoreCard({ adherenceScores, detailed = false, className }: AdherenceScoreCardProps) {
  // Get the latest score
  const latestScore = adherenceScores[0]

  // Get the score color based on the value
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Scor Aderență Tratament
        </CardTitle>
      </CardHeader>
      <CardContent>
        {adherenceScores.length === 0 ? (
          <div className="text-center py-4">
            <p>Nu există date disponibile pentru scorul de aderență.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreColor(latestScore.score)}`}>{latestScore.score}%</div>
                <p className="text-sm text-muted-foreground mt-1">Ultima actualizare: {latestScore.date}</p>
              </div>
            </div>

            {detailed && (
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Detalii:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Medicamente omise:</span>
                      <span>{latestScore.missedMedications}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Programări omise:</span>
                      <span>{latestScore.missedAppointments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Simptome raportate:</span>
                      <span>{latestScore.reportedSymptoms}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Istoric:</h3>
                  <div className="space-y-2">
                    {adherenceScores.slice(1).map((score, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{score.date}:</span>
                        <span className={getScoreColor(score.score)}>{score.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
