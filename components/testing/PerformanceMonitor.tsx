"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, Clock, Database } from "lucide-react"

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage: number
  apiResponseTime: number
  componentsCount: number
  reRenders: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    apiResponseTime: 0,
    componentsCount: 19,
    reRenders: 0,
  })

  useEffect(() => {
    // Simulate performance monitoring
    const startTime = performance.now()

    // Monitor page load time
    window.addEventListener("load", () => {
      const loadTime = performance.now() - startTime
      setMetrics((prev) => ({ ...prev, loadTime }))
    })

    // Monitor memory usage (if available)
    if ("memory" in performance) {
      const memory = (performance as any).memory
      setMetrics((prev) => ({
        ...prev,
        memoryUsage: memory.usedJSHeapSize / 1024 / 1024, // Convert to MB
      }))
    }

    // Simulate API response time monitoring
    const apiStart = performance.now()
    setTimeout(
      () => {
        const apiTime = performance.now() - apiStart
        setMetrics((prev) => ({ ...prev, apiResponseTime: apiTime }))
      },
      100 + Math.random() * 200,
    )

    // Monitor render time
    const renderStart = performance.now()
    requestAnimationFrame(() => {
      const renderTime = performance.now() - renderStart
      setMetrics((prev) => ({ ...prev, renderTime }))
    })

    // Simulate re-render counting
    let renderCount = 0
    const interval = setInterval(() => {
      renderCount++
      setMetrics((prev) => ({ ...prev, reRenders: renderCount }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getPerformanceStatus = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return { status: "good", color: "bg-green-500" }
    if (value <= thresholds[1]) return { status: "warning", color: "bg-yellow-500" }
    return { status: "poor", color: "bg-red-500" }
  }

  const loadTimeStatus = getPerformanceStatus(metrics.loadTime, [1000, 3000])
  const renderTimeStatus = getPerformanceStatus(metrics.renderTime, [16, 50])
  const memoryStatus = getPerformanceStatus(metrics.memoryUsage, [50, 100])
  const apiStatus = getPerformanceStatus(metrics.apiResponseTime, [200, 500])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Performance Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Load Time */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Page Load Time</span>
            </div>
            <Badge variant={loadTimeStatus.status === "good" ? "default" : "destructive"}>
              {metrics.loadTime.toFixed(0)}ms
            </Badge>
          </div>
          <Progress value={Math.min((metrics.loadTime / 3000) * 100, 100)} className="h-2" />
        </div>

        {/* Render Time */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Render Time</span>
            </div>
            <Badge variant={renderTimeStatus.status === "good" ? "default" : "destructive"}>
              {metrics.renderTime.toFixed(1)}ms
            </Badge>
          </div>
          <Progress value={Math.min((metrics.renderTime / 50) * 100, 100)} className="h-2" />
        </div>

        {/* Memory Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="text-sm font-medium">Memory Usage</span>
            </div>
            <Badge variant={memoryStatus.status === "good" ? "default" : "destructive"}>
              {metrics.memoryUsage.toFixed(1)}MB
            </Badge>
          </div>
          <Progress value={Math.min((metrics.memoryUsage / 100) * 100, 100)} className="h-2" />
        </div>

        {/* API Response Time */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">API Response</span>
            </div>
            <Badge variant={apiStatus.status === "good" ? "default" : "destructive"}>
              {metrics.apiResponseTime.toFixed(0)}ms
            </Badge>
          </div>
          <Progress value={Math.min((metrics.apiResponseTime / 500) * 100, 100)} className="h-2" />
        </div>

        {/* Component Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{metrics.componentsCount}</div>
            <div className="text-sm text-gray-600">Components</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{metrics.reRenders}</div>
            <div className="text-sm text-gray-600">Re-renders</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
