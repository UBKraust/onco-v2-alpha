"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, AlertTriangle, CheckCircle, Eye } from "lucide-react"
import type { SecurityEvent } from "@/types/system"

interface SecurityEventsMonitorProps {
  events: SecurityEvent[]
  onResolveEvent: (eventId: string) => void
}

export function SecurityEventsMonitor({ events, onResolveEvent }: SecurityEventsMonitorProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "low":
        return <Eye className="h-4 w-4 text-blue-600" />
      default:
        return <Eye className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "login_attempt":
        return "Încercare Autentificare"
      case "failed_login":
        return "Autentificare Eșuată"
      case "permission_denied":
        return "Acces Refuzat"
      case "data_access":
        return "Acces Date"
      case "suspicious_activity":
        return "Activitate Suspectă"
      default:
        return type
    }
  }

  const unresolvedEvents = events.filter((event) => !event.resolved)
  const resolvedEvents = events.filter((event) => event.resolved)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Evenimente Securitate
        </CardTitle>
        <CardDescription>Monitorizare și gestionare evenimente de securitate</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{unresolvedEvents.length}</div>
            <div className="text-sm text-muted-foreground">Nerezolvate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{resolvedEvents.length}</div>
            <div className="text-sm text-muted-foreground">Rezolvate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {events.filter((e) => e.severity === "critical" && !e.resolved).length}
            </div>
            <div className="text-sm text-muted-foreground">Critice</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {events.filter((e) => e.severity === "high" && !e.resolved).length}
            </div>
            <div className="text-sm text-muted-foreground">Prioritate Mare</div>
          </div>
        </div>

        {/* Unresolved Events */}
        {unresolvedEvents.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Evenimente Nerezolvate ({unresolvedEvents.length})
            </h4>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {unresolvedEvents.map((event) => (
                  <div key={event.id} className="border border-red-200 rounded-lg p-3 bg-red-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(event.severity)}
                        <Badge variant={getSeverityColor(event.severity)}>{event.severity.toUpperCase()}</Badge>
                        <Badge variant="outline">{getTypeLabel(event.type)}</Badge>
                      </div>
                      <Button size="sm" onClick={() => onResolveEvent(event.id)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Rezolvă
                      </Button>
                    </div>
                    <p className="text-sm mb-2">{event.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">IP:</span> {event.ipAddress}
                      </div>
                      <div>
                        <span className="font-medium">Timp:</span> {event.timestamp.toLocaleString("ro-RO")}
                      </div>
                      {event.userId && (
                        <div>
                          <span className="font-medium">User ID:</span> {event.userId}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">User Agent:</span>{" "}
                        <span className="truncate">{event.userAgent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Recent Resolved Events */}
        {resolvedEvents.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Evenimente Rezolvate Recente
            </h4>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {resolvedEvents.slice(0, 5).map((event) => (
                  <div key={event.id} className="border rounded-lg p-2 bg-green-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">{getTypeLabel(event.type)}</span>
                        <Badge variant="outline" className="text-xs">
                          {event.severity}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{event.timestamp.toLocaleString("ro-RO")}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {events.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="h-8 w-8 mx-auto mb-2" />
            <p>Nu există evenimente de securitate înregistrate</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
