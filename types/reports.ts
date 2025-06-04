export interface Report {
  id: string
  name: string
  description: string
  type: "patient" | "navigator" | "system" | "financial" | "clinical"
  category: "operational" | "clinical" | "financial" | "compliance" | "performance"
  createdBy: string
  createdAt: Date
  lastGenerated?: Date
  status: "draft" | "active" | "archived"
  parameters: ReportParameter[]
  schedule?: ReportSchedule
  recipients: string[]
  format: "pdf" | "excel" | "csv" | "json"
  size?: number
  downloadUrl?: string
}

export interface ReportParameter {
  id: string
  name: string
  label: string
  type: "date" | "dateRange" | "select" | "multiSelect" | "number" | "text" | "boolean"
  required: boolean
  defaultValue?: any
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export interface ReportSchedule {
  enabled: boolean
  frequency: "daily" | "weekly" | "monthly" | "quarterly"
  dayOfWeek?: number
  dayOfMonth?: number
  time: string
  timezone: string
  nextRun?: Date
}

export interface ReportExecution {
  id: string
  reportId: string
  status: "pending" | "running" | "completed" | "failed"
  startedAt: Date
  completedAt?: Date
  duration?: number
  parameters: Record<string, any>
  fileSize?: number
  downloadUrl?: string
  error?: string
  executedBy: string
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  type: Report["type"]
  category: Report["category"]
  parameters: ReportParameter[]
  isBuiltIn: boolean
  createdBy?: string
  createdAt: Date
}

export interface ReportMetrics {
  totalReports: number
  activeReports: number
  scheduledReports: number
  executionsToday: number
  executionsThisWeek: number
  executionsThisMonth: number
  averageExecutionTime: number
  totalDataSize: number
  popularReports: Array<{
    reportId: string
    name: string
    executions: number
  }>
}
