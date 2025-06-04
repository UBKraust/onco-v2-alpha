"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react"
import type { ReportExecution, Report } from "@/types/reports"

interface ReportExecutionsProps {
  executions: ReportExecution[]
  reports: Report[]
  loading: boolean
  onDownload: (executionId: string) => void
}

export function ReportExecutions({ executions, reports, loading, onDownload }: ReportExecutionsProps) {
  const getReportName = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId)
    return report?.name || "Raport necunoscut"
  }

  const getStatusBadge = (status: ReportExecution["status"]) => {
    const config = {
      pending: {
        variant: "secondary" as const,
        icon: Clock,
        label: "În așteptare",
      },
      running: {
        variant: "default" as const,
        icon: Loader2,
        label: "În execuție",
      },
      completed: {
        variant: "default" as const,
        icon: CheckCircle,
        label: "Completat",
        className: "bg-green-100 text-green-800",
      },
      failed: {
        variant: "destructive" as const,
        icon: XCircle,
        label: "Eșuat",
      },
    }

    const { variant, icon: Icon, label, className } = config[status]

    return (
      <Badge variant={variant} className={className}>
        <Icon className="h-3 w-3 mr-1" />
        {label}
      </Badge>
    )
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "-"
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "-"
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Execuții Rapoarte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const sortedExecutions = [...executions].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Execuții Rapoarte</CardTitle>
        <CardDescription>Istoric și status execuții rapoarte</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Raport</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Început</TableHead>
              <TableHead>Durată</TableHead>
              <TableHead>Dimensiune</TableHead>
              <TableHead>Executat de</TableHead>
              <TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedExecutions.map((execution) => (
              <TableRow key={execution.id}>
                <TableCell>
                  <div className="font-medium">{getReportName(execution.reportId)}</div>
                  {execution.error && <div className="text-sm text-destructive mt-1">{execution.error}</div>}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(execution.status)}
                    {execution.status === "running" && <Progress value={65} className="w-20" />}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {execution.startedAt.toLocaleDateString("ro-RO")}
                    <br />
                    <span className="text-muted-foreground">
                      {execution.startedAt.toLocaleTimeString("ro-RO", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{formatDuration(execution.duration)}</TableCell>
                <TableCell>{formatFileSize(execution.fileSize)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{execution.executedBy === "system" ? "Sistem" : "Manual"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {execution.status === "completed" && execution.downloadUrl && (
                    <Button size="sm" variant="outline" onClick={() => onDownload(execution.id)}>
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {sortedExecutions.length === 0 && (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Nu există execuții</h3>
            <p className="text-muted-foreground">Execuțiile rapoartelor vor apărea aici.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
