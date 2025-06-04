"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, TrendingUp, Clock, Database, Play } from "lucide-react"
import type { ReportMetrics } from "@/types/reports"

interface ReportsDashboardProps {
  metrics: ReportMetrics | null
  loading: boolean
}

export function ReportsDashboard({ metrics, loading }: ReportsDashboardProps) {
  if (loading || !metrics) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ["B", "KB", "MB", "GB"]
    if (bytes === 0) return "0 B"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Statistici principale */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rapoarte</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalReports}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeReports} active, {metrics.scheduledReports} programate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Execuții Luna Aceasta</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.executionsThisMonth}</div>
            <p className="text-xs text-muted-foreground">+{metrics.executionsThisWeek} această săptămână</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timp Mediu Execuție</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.averageExecutionTime}s</div>
            <p className="text-xs text-muted-foreground">{metrics.executionsToday} execuții astăzi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dimensiune Totală Date</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatFileSize(metrics.totalDataSize)}</div>
            <p className="text-xs text-muted-foreground">Toate rapoartele generate</p>
          </CardContent>
        </Card>
      </div>

      {/* Rapoarte populare */}
      <Card>
        <CardHeader>
          <CardTitle>Rapoarte Populare</CardTitle>
          <CardDescription>Cele mai frecvent generate rapoarte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.popularReports.map((report, index) => (
              <div key={report.reportId} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{report.name}</p>
                    <p className="text-xs text-muted-foreground">{report.executions} execuții</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={(report.executions / metrics.popularReports[0].executions) * 100} className="w-20" />
                  <Button size="sm" variant="outline">
                    <Play className="h-3 w-3 mr-1" />
                    Rulează
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
