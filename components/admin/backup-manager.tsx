"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Database, Download, Play, AlertCircle, CheckCircle, Clock } from "lucide-react"
import type { BackupStatus } from "@/types/system"

interface BackupManagerProps {
  backups: BackupStatus[]
  onTriggerBackup: (type: "full" | "incremental") => void
}

export function BackupManager({ backups, onTriggerBackup }: BackupManagerProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "secondary"
      case "running":
        return "default"
      case "failed":
        return "destructive"
      case "scheduled":
        return "outline"
      default:
        return "outline"
    }
  }

  const formatDuration = (start: Date, end?: Date) => {
    if (!end) return "În progres..."
    const duration = end.getTime() - start.getTime()
    const minutes = Math.floor(duration / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  const formatSize = (sizeGB?: number) => {
    if (!sizeGB) return "-"
    return `${sizeGB.toFixed(1)} GB`
  }

  const runningBackup = backups.find((backup) => backup.status === "running")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Management Backup-uri
            </CardTitle>
            <CardDescription>Gestionare backup-uri automate și manuale</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTriggerBackup("incremental")}
              disabled={!!runningBackup}
            >
              <Play className="h-4 w-4 mr-2" />
              Backup Incremental
            </Button>
            <Button variant="default" size="sm" onClick={() => onTriggerBackup("full")} disabled={!!runningBackup}>
              <Play className="h-4 w-4 mr-2" />
              Backup Complet
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Running Backup Progress */}
        {runningBackup && (
          <div className="mb-4 p-4 border rounded-lg bg-blue-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600 animate-spin" />
                <span className="font-medium">Backup {runningBackup.type} în progres...</span>
              </div>
              <Badge variant="default">În progres</Badge>
            </div>
            <Progress value={65} className="mb-2" />
            <div className="text-sm text-muted-foreground">
              Început la: {runningBackup.startTime.toLocaleString("ro-RO")}
            </div>
          </div>
        )}

        {/* Backup History */}
        <div className="space-y-2">
          <h4 className="font-medium">Istoric Backup-uri</h4>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {backups.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Database className="h-8 w-8 mx-auto mb-2" />
                  <p>Nu există backup-uri înregistrate</p>
                </div>
              ) : (
                backups.map((backup) => (
                  <div key={backup.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(backup.status)}
                        <span className="font-medium capitalize">{backup.type}</span>
                        <Badge variant={getStatusColor(backup.status)}>{backup.status}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {backup.status === "completed" && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <span className="text-sm text-muted-foreground">{formatSize(backup.size)}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Început:</span> {backup.startTime.toLocaleString("ro-RO")}
                      </div>
                      <div>
                        <span className="font-medium">Durată:</span> {formatDuration(backup.startTime, backup.endTime)}
                      </div>
                    </div>
                    {backup.error && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                        <strong>Eroare:</strong> {backup.error}
                      </div>
                    )}
                    <div className="mt-2 text-xs text-muted-foreground font-mono">{backup.location}</div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Backup Schedule Info */}
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <h5 className="font-medium mb-2">Program Automat</h5>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>• Backup complet: Zilnic la 02:00</div>
            <div>• Backup incremental: La fiecare 6 ore</div>
            <div>• Retenție: 30 zile pentru backup-uri complete, 7 zile pentru incrementale</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
