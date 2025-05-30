"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Settings, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { useMockCompliance } from "@/hooks/useMockCompliance"

interface ComplianceAICardProps {
  patientId: string
}

export function ComplianceAICard({ patientId }: ComplianceAICardProps) {
  const complianceData = useMockCompliance(patientId)

  const getComplianceColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-orange-600"
    return "text-red-600"
  }

  const getComplianceBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">Excelent</Badge>
    if (score >= 60) return <Badge className="bg-orange-100 text-orange-800">Moderat</Badge>
    return <Badge className="bg-red-100 text-red-800">Scăzut</Badge>
  }

  const getRecommendationIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <TrendingUp className="h-4 w-4 text-orange-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Compliance & AI
          <Button size="sm" variant="outline" className="ml-auto">
            <Settings className="h-4 w-4 mr-1" />
            Configurare
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Score General */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Score Compliance</h4>
              <div className="flex items-center gap-3">
                <div className={`text-3xl font-bold ${getComplianceColor(complianceData.overallScore)}`}>
                  {complianceData.overallScore}%
                </div>
                {getComplianceBadge(complianceData.overallScore)}
              </div>
              <Progress value={complianceData.overallScore} className="mt-2" />
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Predicții AI</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Risc abandon:</span>
                  <span className="font-medium text-red-600">{complianceData.aiPredictions.abandonmentRisk}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Succes tratament:</span>
                  <span className="font-medium text-green-600">{complianceData.aiPredictions.treatmentSuccess}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detalii Compliance */}
          <div>
            <h4 className="font-medium mb-2">Detalii Compliance</h4>
            <div className="space-y-2">
              {complianceData.details.map((detail, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <span className="text-sm">{detail.category}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={detail.score} className="w-16 h-2" />
                    <span className={`text-sm font-medium ${getComplianceColor(detail.score)}`}>{detail.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recomandări AI */}
          <div>
            <h4 className="font-medium mb-2">Recomandări AI</h4>
            <div className="space-y-2">
              {complianceData.recommendations.map((rec) => (
                <div key={rec.id} className="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  {getRecommendationIcon(rec.priority)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{rec.title}</p>
                    <p className="text-xs text-gray-600">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
