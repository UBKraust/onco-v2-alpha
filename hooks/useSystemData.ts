"use client"

import { useState, useEffect } from "react"
import type { SystemMetrics, SystemLog, BackupStatus, SystemConfiguration, SecurityEvent } from "@/types/system"

export function useSystemData() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [logs, setLogs] = useState<SystemLog[]>([])
  const [backups, setBackups] = useState<BackupStatus[]>([])
  const [configurations, setConfigurations] = useState<SystemConfiguration[]>([])
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [loading, setLoading] = useState(true)

  // Simulare date în timp real
  useEffect(() => {
    const loadMockData = async () => {
      setLoading(true)

      // Mock system metrics
      setMetrics({
        cpu: {
          usage: 45.2,
          cores: 8,
          temperature: 62,
        },
        memory: {
          used: 12.4,
          total: 32,
          percentage: 38.75,
        },
        disk: {
          used: 245,
          total: 500,
          percentage: 49,
        },
        network: {
          inbound: 125.6,
          outbound: 89.3,
          latency: 12,
        },
        database: {
          connections: 45,
          maxConnections: 100,
          queryTime: 2.3,
          size: 15.7,
        },
      })

      // Mock system logs
      setLogs([
        {
          id: "log-1",
          timestamp: new Date("2024-01-15T10:30:00"),
          level: "info",
          category: "auth",
          message: "User login successful",
          details: { userId: "user-123", method: "email" },
          userId: "user-123",
          ipAddress: "192.168.1.100",
        },
        {
          id: "log-2",
          timestamp: new Date("2024-01-15T10:25:00"),
          level: "warning",
          category: "database",
          message: "Slow query detected",
          details: { queryTime: 5.2, query: "SELECT * FROM patients..." },
          ipAddress: "192.168.1.50",
        },
        {
          id: "log-3",
          timestamp: new Date("2024-01-15T10:20:00"),
          level: "error",
          category: "api",
          message: "API rate limit exceeded",
          details: { endpoint: "/api/patients", limit: 100 },
          ipAddress: "192.168.1.75",
        },
      ])

      // Mock backup status
      setBackups([
        {
          id: "backup-1",
          type: "full",
          status: "completed",
          startTime: new Date("2024-01-15T02:00:00"),
          endTime: new Date("2024-01-15T02:45:00"),
          size: 2.4,
          location: "/backups/full/2024-01-15.sql",
        },
        {
          id: "backup-2",
          type: "incremental",
          status: "running",
          startTime: new Date("2024-01-15T10:00:00"),
          location: "/backups/incremental/2024-01-15-10.sql",
        },
        {
          id: "backup-3",
          type: "full",
          status: "failed",
          startTime: new Date("2024-01-14T02:00:00"),
          endTime: new Date("2024-01-14T02:15:00"),
          location: "/backups/full/2024-01-14.sql",
          error: "Insufficient disk space",
        },
      ])

      // Mock configurations
      setConfigurations([
        {
          id: "config-1",
          category: "general",
          key: "app_name",
          value: "OncoLink",
          description: "Numele aplicației afișat în interfață",
          type: "string",
          updatedAt: new Date("2024-01-10"),
          updatedBy: "admin-1",
        },
        {
          id: "config-2",
          category: "security",
          key: "session_timeout",
          value: 30,
          description: "Timpul de expirare a sesiunii (minute)",
          type: "number",
          updatedAt: new Date("2024-01-10"),
          updatedBy: "admin-1",
        },
        {
          id: "config-3",
          category: "security",
          key: "require_2fa",
          value: true,
          description: "Autentificare cu doi factori obligatorie",
          type: "boolean",
          updatedAt: new Date("2024-01-10"),
          updatedBy: "admin-1",
        },
      ])

      // Mock security events
      setSecurityEvents([
        {
          id: "sec-1",
          type: "failed_login",
          severity: "medium",
          userId: "user-456",
          ipAddress: "192.168.1.200",
          userAgent: "Mozilla/5.0...",
          description: "5 încercări consecutive de autentificare eșuate",
          timestamp: new Date("2024-01-15T09:30:00"),
          resolved: false,
        },
        {
          id: "sec-2",
          type: "suspicious_activity",
          severity: "high",
          ipAddress: "10.0.0.50",
          userAgent: "curl/7.68.0",
          description: "Acces neautorizat la endpoint-uri administrative",
          timestamp: new Date("2024-01-15T08:15:00"),
          resolved: true,
        },
      ])

      setLoading(false)
    }

    loadMockData()

    // Simulare actualizare metrici în timp real
    const metricsInterval = setInterval(() => {
      setMetrics((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          cpu: {
            ...prev.cpu,
            usage: Math.max(10, Math.min(90, prev.cpu.usage + (Math.random() - 0.5) * 10)),
          },
          memory: {
            ...prev.memory,
            percentage: Math.max(20, Math.min(80, prev.memory.percentage + (Math.random() - 0.5) * 5)),
          },
        }
      })
    }, 5000)

    return () => clearInterval(metricsInterval)
  }, [])

  const updateConfiguration = async (id: string, value: string | number | boolean) => {
    setConfigurations((prev) =>
      prev.map((config) =>
        config.id === id
          ? {
              ...config,
              value,
              updatedAt: new Date(),
              updatedBy: "admin-1",
            }
          : config,
      ),
    )
  }

  const triggerBackup = async (type: "full" | "incremental") => {
    const newBackup: BackupStatus = {
      id: `backup-${Date.now()}`,
      type,
      status: "running",
      startTime: new Date(),
      location: `/backups/${type}/${new Date().toISOString().split("T")[0]}.sql`,
    }

    setBackups((prev) => [newBackup, ...prev])

    // Simulare finalizare backup după 30 secunde
    setTimeout(() => {
      setBackups((prev) =>
        prev.map((backup) =>
          backup.id === newBackup.id
            ? {
                ...backup,
                status: "completed",
                endTime: new Date(),
                size: Math.random() * 5 + 1,
              }
            : backup,
        ),
      )
    }, 30000)

    return newBackup
  }

  const resolveSecurityEvent = async (eventId: string) => {
    setSecurityEvents((prev) => prev.map((event) => (event.id === eventId ? { ...event, resolved: true } : event)))
  }

  const clearLogs = async (category?: string) => {
    if (category) {
      setLogs((prev) => prev.filter((log) => log.category !== category))
    } else {
      setLogs([])
    }
  }

  return {
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
  }
}
