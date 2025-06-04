"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, HardDrive, Cpu, Wifi, Thermometer } from "lucide-react"
import type { SystemMetrics } from "@/types/system"

interface SystemMetricsDashboardProps {
  metrics: SystemMetrics | null
}

export function SystemMetricsDashboard({ metrics }: SystemMetricsDashboardProps) {
  if (!metrics) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-2"></div>
              <div className="h-2 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const getStatusColor = (percentage: number) => {
    if (percentage < 50) return "text-green-600"
    if (percentage < 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (percentage: number) => {
    if (percentage < 50)
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Normal
        </Badge>
      )
    if (percentage < 80)
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Atenție
        </Badge>
      )
    return <Badge variant="destructive">Critic</Badge>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* CPU */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CPU</CardTitle>
          <Cpu className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <div className={`text-2xl font-bold ${getStatusColor(metrics.cpu.usage)}`}>
              {metrics.cpu.usage.toFixed(1)}%
            </div>
            {getStatusBadge(metrics.cpu.usage)}
          </div>
          <Progress value={metrics.cpu.usage} className="mb-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{metrics.cpu.cores} cores</span>
            {metrics.cpu.temperature && (
              <span className="flex items-center gap-1">
                <Thermometer className="h-3 w-3" />
                {metrics.cpu.temperature}°C
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Memory */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Memorie RAM</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <div className={`text-2xl font-bold ${getStatusColor(metrics.memory.percentage)}`}>
              {metrics.memory.percentage.toFixed(1)}%
            </div>
            {getStatusBadge(metrics.memory.percentage)}
          </div>
          <Progress value={metrics.memory.percentage} className="mb-2" />
          <div className="text-xs text-muted-foreground">
            {metrics.memory.used.toFixed(1)} GB / {metrics.memory.total} GB
          </div>
        </CardContent>
      </Card>

      {/* Disk */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stocare</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <div className={`text-2xl font-bold ${getStatusColor(metrics.disk.percentage)}`}>
              {metrics.disk.percentage.toFixed(1)}%
            </div>
            {getStatusBadge(metrics.disk.percentage)}
          </div>
          <Progress value={metrics.disk.percentage} className="mb-2" />
          <div className="text-xs text-muted-foreground">
            {metrics.disk.used} GB / {metrics.disk.total} GB
          </div>
        </CardContent>
      </Card>

      {/* Network */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rețea</CardTitle>
          <Wifi className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Intrare:</span>
              <span className="font-medium">{metrics.network.inbound.toFixed(1)} MB/s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ieșire:</span>
              <span className="font-medium">{metrics.network.outbound.toFixed(1)} MB/s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Latență:</span>
              <span className="font-medium">{metrics.network.latency} ms</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Baza de Date</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Conexiuni:</span>
              <span className="font-medium">
                {metrics.database.connections}/{metrics.database.maxConnections}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Timp query:</span>
              <span className="font-medium">{metrics.database.queryTime.toFixed(1)} ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Dimensiune:</span>
              <span className="font-medium">{metrics.database.size.toFixed(1)} GB</span>
            </div>
          </div>
          <Progress value={(metrics.database.connections / metrics.database.maxConnections) * 100} className="mt-2" />
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status Sistem</CardTitle>
          <Activity className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Operațional
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Uptime:</span>
              <span className="text-sm font-medium">15d 7h 23m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Versiune:</span>
              <span className="text-sm font-medium">v1.2.3</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
