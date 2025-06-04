export interface SystemMetrics {
  cpu: {
    usage: number
    cores: number
    temperature?: number
  }
  memory: {
    used: number
    total: number
    percentage: number
  }
  disk: {
    used: number
    total: number
    percentage: number
  }
  network: {
    inbound: number
    outbound: number
    latency: number
  }
  database: {
    connections: number
    maxConnections: number
    queryTime: number
    size: number
  }
}

export interface SystemLog {
  id: string
  timestamp: Date
  level: "info" | "warning" | "error" | "debug"
  category: "auth" | "api" | "database" | "system" | "security"
  message: string
  details?: Record<string, any>
  userId?: string
  ipAddress?: string
}

export interface BackupStatus {
  id: string
  type: "full" | "incremental" | "differential"
  status: "running" | "completed" | "failed" | "scheduled"
  startTime: Date
  endTime?: Date
  size?: number
  location: string
  error?: string
}

export interface SystemConfiguration {
  id: string
  category: "general" | "security" | "notifications" | "backup" | "performance"
  key: string
  value: string | number | boolean
  description: string
  type: "string" | "number" | "boolean" | "select"
  options?: string[]
  updatedAt: Date
  updatedBy: string
}

export interface SecurityEvent {
  id: string
  type: "login_attempt" | "failed_login" | "permission_denied" | "data_access" | "suspicious_activity"
  severity: "low" | "medium" | "high" | "critical"
  userId?: string
  ipAddress: string
  userAgent: string
  description: string
  timestamp: Date
  resolved: boolean
}
