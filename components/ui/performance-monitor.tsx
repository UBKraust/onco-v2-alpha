"use client"

import { memo, useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PerformanceMetrics {
  renderTime: number
  memoryUsage: number
  componentCount: number
}

export const PerformanceMonitor = memo(() => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    componentCount: 0,
  })

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const renderTime = entries.reduce((acc, entry) => acc + entry.duration, 0)

      setMetrics((prev) => ({
        ...prev,
        renderTime: Math.round(renderTime * 100) / 100,
      }))
    })

    observer.observe({ entryTypes: ["measure"] })

    // Memory usage (if available)
    if ("memory" in performance) {
      const memory = (performance as any).memory
      setMetrics((prev) => ({
        ...prev,
        memoryUsage: Math.round((memory.usedJSHeapSize / 1024 / 1024) * 100) / 100,
      }))
    }

    return () => observer.disconnect()
  }, [])

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <Card className="fixed bottom-4 right-4 w-64 z-50 bg-background/95 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-xs">
          <span>Render Time:</span>
          <Badge variant={metrics.renderTime > 16 ? "destructive" : "secondary"}>{metrics.renderTime}ms</Badge>
        </div>
        <div className="flex justify-between text-xs">
          <span>Memory:</span>
          <Badge variant={metrics.memoryUsage > 50 ? "destructive" : "secondary"}>{metrics.memoryUsage}MB</Badge>
        </div>
      </CardContent>
    </Card>
  )
})

PerformanceMonitor.displayName = "PerformanceMonitor"
