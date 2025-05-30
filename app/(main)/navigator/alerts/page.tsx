"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Clock, CheckCircle, Eye, MoreHorizontal } from "lucide-react"
import { useNavigatorData } from "@/hooks/useNavigatorData"

export default function NavigatorAlertsPage() {
  const { alerts, markAlertAsRead, resolveAlert, escalateAlert } = useNavigatorData()

  const criticalAlerts = alerts.filter((alert) => alert.type === "critical")
  const warningAlerts = alerts.filter((alert) => alert.type === "warning")
  const infoAlerts = alerts.filter((alert) => alert.type === "info")

  const handleMarkAsRead = (alertId: string) => {
    markAlertAsRead(alertId)
  }

  const handleResolve = (alertId: string) => {
    resolveAlert(alertId)
  }

  const handleEscalate = (alertId: string) => {
    escalateAlert(alertId)
  }

  const AlertCard = ({ alert }: { alert: any }) => (
    <Card
      className={`border-l-4 ${
        alert.type === "critical"
          ? "border-l-red-500"
          : alert.type === "warning"
            ? "border-l-yellow-500"
            : "border-l-blue-500"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle
              className={`h-5 w-5 ${
                alert.type === "critical"
                  ? "text-red-500"
                  : alert.type === "warning"
                    ? "text-yellow-500"
                    : "text-blue-500"
              }`}
            />
            <CardTitle className="text-lg">{alert.title}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={alert.type === "critical" ? "destructive" : alert.type === "warning" ? "default" : "secondary"}
            >
              {alert.type === "critical" ? "Critic" : alert.type === "warning" ? "Atenție" : "Info"}
            </Badge>
            {!alert.isRead && <Badge variant="outline">Nou</Badge>}
          </div>
        </div>
        <CardDescription>
          Pacient: {alert.patientName} • {alert.timestamp}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{alert.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Escalare nivel: {alert.escalationLevel}</span>
          </div>
          <div className="flex space-x-2">
            {!alert.isRead && (
              <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(alert.id)}>
                <Eye className="h-4 w-4 mr-1" />
                Marcare citit
              </Button>
            )}
            {!alert.isResolved && (
              <>
                <Button variant="outline" size="sm" onClick={() => handleEscalate(alert.id)}>
                  Escalează
                </Button>
                <Button variant="default" size="sm" onClick={() => handleResolve(alert.id)}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Rezolvă
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alerte și Notificări</h1>
          <p className="text-muted-foreground">Monitorizează alertele critice și notificările importante</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerte Critice</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Necesită atenție imediată</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avertismente</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{warningAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Monitorizare necesară</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Informative</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{infoAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Pentru cunoștință</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rezolvate Azi</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground">Alerte procesate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Toate ({alerts.length})</TabsTrigger>
          <TabsTrigger value="critical">Critice ({criticalAlerts.length})</TabsTrigger>
          <TabsTrigger value="warning">Avertismente ({warningAlerts.length})</TabsTrigger>
          <TabsTrigger value="info">Informative ({infoAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Rezolvate</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          {criticalAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>

        <TabsContent value="warning" className="space-y-4">
          {warningAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          {infoAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p>Toate alertele au fost rezolvate pentru astăzi!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
