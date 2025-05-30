"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Settings, CheckCircle, Clock, AlertTriangle, Calendar, TrendingUp } from "lucide-react"
import { useMockAIProtocol } from "@/hooks/useMockAIProtocol"

interface AIProtocolCardProps {
  patientId: string
}

export function AIProtocolCard({ patientId }: AIProtocolCardProps) {
  const aiData = useMockAIProtocol(patientId)

  if (!aiData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Protocol AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Se încarcă datele protocolului AI...</p>
        </CardContent>
      </Card>
    )
  }

  if (!aiData.protocols || aiData.protocols.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Protocol AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Nu există protocoale generate de AI pentru acest pacient.</p>
        </CardContent>
      </Card>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "activ":
        return <Badge className="bg-green-100 text-green-800">Activ</Badge>
      case "în_curs":
        return <Badge className="bg-blue-100 text-blue-800">În curs</Badge>
      case "planificat":
        return <Badge className="bg-orange-100 text-orange-800">Planificat</Badge>
      default:
        return <Badge variant="outline">Necunoscut</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "activ":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "în_curs":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "planificat":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return "text-red-500"
    if (risk >= 50) return "text-orange-500"
    return "text-green-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Protocol AI
          <Button size="sm" variant="outline" className="ml-auto">
            <Settings className="h-4 w-4 mr-1" />
            Configurare
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall Risk Score */}
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-purple-900 dark:text-purple-100">Scor Risc General</h4>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className={`font-bold text-lg ${getRiskColor(aiData.overallRisk)}`}>{aiData.overallRisk}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  aiData.overallRisk >= 70 ? "bg-red-500" : aiData.overallRisk >= 50 ? "bg-orange-500" : "bg-green-500"
                }`}
                style={{ width: `${aiData.overallRisk}%` }}
              ></div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Insights AI</h4>
            <div className="space-y-2">
              {aiData.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Protocols */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Protocoale Active</h4>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Următoarea evaluare: {aiData.nextReview}</span>
              </div>
            </div>
            <div className="space-y-3">
              {aiData.protocols.map((protocol, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(protocol.status)}
                      <h5 className="font-medium">{protocol.title}</h5>
                    </div>
                    {getStatusBadge(protocol.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{protocol.summary}</p>
                  <div className="space-y-1">
                    <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300">Recomandări:</h6>
                    {protocol.recommendations.map((rec, recIndex) => (
                      <div key={recIndex} className="flex items-start gap-2 text-xs">
                        <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{rec}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Ultima actualizare: {protocol.lastUpdated}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
