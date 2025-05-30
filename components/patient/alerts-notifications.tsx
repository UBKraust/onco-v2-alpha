"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Activity, Bell } from "lucide-react"

interface AlertItem {
  id: string
  type: "critical" | "warning" | "info"
  title: string
  description: string
  action?: string
  actionLabel?: string
}

interface AlertsNotificationsProps {
  alerts: AlertItem[]
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case "critical":
      return <AlertTriangle className="h-4 w-4 text-destructive" />
    case "warning":
      return <Bell className="h-4 w-4 text-yellow-500" />
    case "info":
      return <Activity className="h-4 w-4 text-blue-500" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

export function AlertsNotifications({ alerts }: AlertsNotificationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alerte și Notificări
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Nu există alerte active</p>
          ) : (
            alerts.map((alert) => (
              <Alert
                key={alert.id}
                className={`
                ${alert.type === "critical" ? "border-destructive bg-destructive/10" : ""}
                ${alert.type === "warning" ? "border-yellow-500 bg-yellow-50" : ""}
                ${alert.type === "info" ? "border-blue-500 bg-blue-50" : ""}
              `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <AlertDescription className="mt-1">{alert.description}</AlertDescription>
                    </div>
                  </div>
                  {alert.actionLabel && (
                    <Button variant="outline" size="sm">
                      {alert.actionLabel}
                    </Button>
                  )}
                </div>
              </Alert>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
