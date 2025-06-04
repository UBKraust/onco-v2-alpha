"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SystemMetricsDashboard } from "@/components/admin/system-metrics-dashboard"
import { SystemLogsViewer } from "@/components/admin/system-logs-viewer"
import { BackupManager } from "@/components/admin/backup-manager"
import { SystemConfig } from "@/components/admin/system-configuration"
import { SecurityEventsMonitor } from "@/components/admin/security-events-monitor"
import { useSystemData } from "@/hooks/useSystemData"
import { Loader2 } from "lucide-react"

export default function AdminSystemPage() {
  const {
    metrics,
    logs,
    backups,
    configurations,
    securityEvents,
    loading,
    updateConfiguration,
    triggerBackup,
    resolveSecurityEvent,
    clearLogs,
  } = useSystemData()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Administrare Sistem</h1>
        <p className="text-muted-foreground">Monitorizare, configurare și mentenanță sistem</p>
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="metrics">Metrici</TabsTrigger>
          <TabsTrigger value="logs">Jurnale</TabsTrigger>
          <TabsTrigger value="backups">Backup-uri</TabsTrigger>
          <TabsTrigger value="config">Configurații</TabsTrigger>
          <TabsTrigger value="security">Securitate</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <SystemMetricsDashboard metrics={metrics} />
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <SystemLogsViewer logs={logs} onClearLogs={clearLogs} />
        </TabsContent>

        <TabsContent value="backups" className="space-y-6">
          <BackupManager backups={backups} onTriggerBackup={triggerBackup} />
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <SystemConfig configurations={configurations} onUpdateConfiguration={updateConfiguration} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecurityEventsMonitor events={securityEvents} onResolveEvent={resolveSecurityEvent} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
