"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useReportsData } from "@/hooks/useReportsData"
import { ReportsDashboard } from "@/components/admin/reports-dashboard"
import { ReportsList } from "@/components/admin/reports-list"
import { ReportExecutions } from "@/components/admin/report-executions"
import { useToast } from "@/hooks/use-toast"
import type { Report } from "@/types/reports"

export default function AdminReportsPage() {
  const {
    reports,
    executions,
    templates,
    metrics,
    loading,
    createReport,
    updateReport,
    deleteReport,
    executeReport,
    downloadReport,
  } = useReportsData()

  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleExecuteReport = async (reportId: string) => {
    try {
      await executeReport(reportId, {})
      toast({
        title: "Raport în execuție",
        description: "Raportul a fost pus în coadă pentru execuție.",
      })
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut executa raportul.",
        variant: "destructive",
      })
    }
  }

  const handleEditReport = (report: Report) => {
    // TODO: Implementează dialog de editare
    toast({
      title: "Editare raport",
      description: `Editarea raportului "${report.name}" va fi implementată.`,
    })
  }

  const handleDeleteReport = async (reportId: string) => {
    try {
      await deleteReport(reportId)
      toast({
        title: "Raport șters",
        description: "Raportul a fost șters cu succes.",
      })
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge raportul.",
        variant: "destructive",
      })
    }
  }

  const handleCreateReport = () => {
    // TODO: Implementează dialog de creare
    toast({
      title: "Raport nou",
      description: "Crearea unui raport nou va fi implementată.",
    })
  }

  const handleDownloadReport = async (executionId: string) => {
    try {
      const url = await downloadReport(executionId)
      toast({
        title: "Download început",
        description: "Raportul se descarcă...",
      })
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut descărca raportul.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Rapoarte Administrative</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Rapoarte</TabsTrigger>
          <TabsTrigger value="executions">Execuții</TabsTrigger>
          <TabsTrigger value="templates">Template-uri</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <ReportsDashboard metrics={metrics} loading={loading} />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <ReportsList
            reports={reports}
            loading={loading}
            onExecute={handleExecuteReport}
            onEdit={handleEditReport}
            onDelete={handleDeleteReport}
            onCreate={handleCreateReport}
          />
        </TabsContent>

        <TabsContent value="executions" className="space-y-4">
          <ReportExecutions
            executions={executions}
            reports={reports}
            loading={loading}
            onDownload={handleDownloadReport}
          />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium">Template-uri Rapoarte</h3>
            <p className="text-muted-foreground">Funcționalitatea pentru template-uri va fi implementată în curând.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
