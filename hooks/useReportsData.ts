"use client"

import { useState, useEffect } from "react"
import type { Report, ReportExecution, ReportTemplate, ReportMetrics } from "@/types/reports"

export function useReportsData() {
  const [reports, setReports] = useState<Report[]>([])
  const [executions, setExecutions] = useState<ReportExecution[]>([])
  const [templates, setTemplates] = useState<ReportTemplate[]>([])
  const [metrics, setMetrics] = useState<ReportMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMockData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock templates
      setTemplates([
        {
          id: "template-1",
          name: "Raport Pacienți Activi",
          description: "Lista pacienților activi cu detalii complete",
          type: "patient",
          category: "operational",
          isBuiltIn: true,
          createdAt: new Date("2023-01-01"),
          parameters: [
            {
              id: "dateRange",
              name: "dateRange",
              label: "Perioada",
              type: "dateRange",
              required: true,
            },
            {
              id: "status",
              name: "status",
              label: "Status Pacient",
              type: "multiSelect",
              required: false,
              options: [
                { value: "active", label: "Activ" },
                { value: "inactive", label: "Inactiv" },
                { value: "completed", label: "Finalizat" },
              ],
            },
          ],
        },
        {
          id: "template-2",
          name: "Performanță Navigatori",
          description: "Analiza performanței navigatorilor pe perioada selectată",
          type: "navigator",
          category: "performance",
          isBuiltIn: true,
          createdAt: new Date("2023-01-01"),
          parameters: [
            {
              id: "period",
              name: "period",
              label: "Perioada",
              type: "select",
              required: true,
              options: [
                { value: "last7days", label: "Ultimele 7 zile" },
                { value: "last30days", label: "Ultimele 30 zile" },
                { value: "last3months", label: "Ultimele 3 luni" },
                { value: "custom", label: "Personalizat" },
              ],
            },
          ],
        },
      ])

      // Mock reports
      setReports([
        {
          id: "report-1",
          name: "Raport Lunar Pacienți",
          description: "Raport lunar cu statistici pacienți",
          type: "patient",
          category: "operational",
          createdBy: "admin-1",
          createdAt: new Date("2024-01-01"),
          lastGenerated: new Date("2024-01-15T10:00:00"),
          status: "active",
          parameters: [],
          schedule: {
            enabled: true,
            frequency: "monthly",
            dayOfMonth: 1,
            time: "09:00",
            timezone: "Europe/Bucharest",
            nextRun: new Date("2024-02-01T09:00:00"),
          },
          recipients: ["admin@oncolink.ro", "manager@oncolink.ro"],
          format: "pdf",
          size: 2048576,
        },
        {
          id: "report-2",
          name: "Analiza Performanță Săptămânală",
          description: "Analiza performanței echipei pe săptămână",
          type: "navigator",
          category: "performance",
          createdBy: "admin-1",
          createdAt: new Date("2024-01-05"),
          lastGenerated: new Date("2024-01-14T08:00:00"),
          status: "active",
          parameters: [],
          schedule: {
            enabled: true,
            frequency: "weekly",
            dayOfWeek: 1,
            time: "08:00",
            timezone: "Europe/Bucharest",
            nextRun: new Date("2024-01-22T08:00:00"),
          },
          recipients: ["team@oncolink.ro"],
          format: "excel",
          size: 1024000,
        },
      ])

      // Mock executions
      setExecutions([
        {
          id: "exec-1",
          reportId: "report-1",
          status: "completed",
          startedAt: new Date("2024-01-15T10:00:00"),
          completedAt: new Date("2024-01-15T10:02:30"),
          duration: 150,
          parameters: { dateRange: "2024-01-01_2024-01-31" },
          fileSize: 2048576,
          downloadUrl: "/downloads/report-1-20240115.pdf",
          executedBy: "system",
        },
        {
          id: "exec-2",
          reportId: "report-2",
          status: "running",
          startedAt: new Date("2024-01-15T11:00:00"),
          parameters: { period: "last7days" },
          executedBy: "admin-1",
        },
      ])

      // Mock metrics
      setMetrics({
        totalReports: 12,
        activeReports: 8,
        scheduledReports: 5,
        executionsToday: 3,
        executionsThisWeek: 15,
        executionsThisMonth: 45,
        averageExecutionTime: 120,
        totalDataSize: 15728640,
        popularReports: [
          { reportId: "report-1", name: "Raport Lunar Pacienți", executions: 12 },
          { reportId: "report-2", name: "Analiza Performanță", executions: 8 },
        ],
      })

      setLoading(false)
    }

    loadMockData()
  }, [])

  const createReport = async (reportData: Omit<Report, "id" | "createdAt">) => {
    const newReport: Report = {
      ...reportData,
      id: `report-${Date.now()}`,
      createdAt: new Date(),
    }
    setReports((prev) => [...prev, newReport])
    return newReport
  }

  const updateReport = async (id: string, updates: Partial<Report>) => {
    setReports((prev) => prev.map((report) => (report.id === id ? { ...report, ...updates } : report)))
  }

  const deleteReport = async (id: string) => {
    setReports((prev) => prev.filter((report) => report.id !== id))
  }

  const executeReport = async (reportId: string, parameters: Record<string, any>) => {
    const execution: ReportExecution = {
      id: `exec-${Date.now()}`,
      reportId,
      status: "pending",
      startedAt: new Date(),
      parameters,
      executedBy: "admin-1",
    }

    setExecutions((prev) => [...prev, execution])

    // Simulare execuție
    setTimeout(() => {
      setExecutions((prev) =>
        prev.map((exec) =>
          exec.id === execution.id
            ? {
                ...exec,
                status: "running",
              }
            : exec,
        ),
      )
    }, 1000)

    setTimeout(() => {
      setExecutions((prev) =>
        prev.map((exec) =>
          exec.id === execution.id
            ? {
                ...exec,
                status: "completed",
                completedAt: new Date(),
                duration: Math.floor(Math.random() * 300) + 30,
                fileSize: Math.floor(Math.random() * 5000000) + 500000,
                downloadUrl: `/downloads/${reportId}-${Date.now()}.pdf`,
              }
            : exec,
        ),
      )
    }, 5000)

    return execution
  }

  const downloadReport = async (executionId: string) => {
    const execution = executions.find((exec) => exec.id === executionId)
    if (execution?.downloadUrl) {
      // Simulare download
      console.log(`Downloading: ${execution.downloadUrl}`)
      return execution.downloadUrl
    }
    throw new Error("Raportul nu este disponibil pentru download")
  }

  return {
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
  }
}
