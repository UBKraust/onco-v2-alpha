"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  ArrowUp,
  Phone,
  MessageSquare,
  Eye,
  Bell,
  Activity,
  Calendar,
  Pill,
  Users,
} from "lucide-react"
import { useNavigatorData } from "@/hooks/useNavigatorData"

interface AlertsManagementProps {
  onSelectPatient: (patientId: string) => void
}

export function AlertsManagement({ onSelectPatient }: AlertsManagementProps) {
  const { alerts, unreadAlerts, unresolvedAlerts, markAlertAsRead, resolveAlert, escalateAlert } = useNavigatorData()

  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [resolutionNote, setResolutionNote] = useState("")

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case "critical":
        return "Critic"
      case "high":
        return "Prioritate Înaltă"
      case "medium":
        return "Prioritate Medie"
      case "low":
        return "Prioritate Scăzută"
      default:
        return type
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medical":
        return <Activity className="h-4 w-4" />
      case "appointment":
        return <Calendar className="h-4 w-4" />
      case "medication":
        return <Pill className="h-4 w-4" />
      case "communication":
        return <MessageSquare className="h-4 w-4" />
      case "system":
        return <Bell className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "medical":
        return "Medical"
      case "appointment":
        return "Programare"
      case "medication":
        return "Medicație"
      case "communication":
        return "Comunicare"
      case "system":
        return "Sistem"
      default:
        return category
    }
  }

  const handleResolveAlert = (alertId: string) => {
    resolveAlert(alertId)
    setSelectedAlert(null)
    setResolutionNote("")
  }

  const handleEscalateAlert = (alertId: string) => {
    escalateAlert(alertId)
  }

  const criticalAlerts = alerts.filter((a) => a.type === "critical" && !a.isResolved)
  const highPriorityAlerts = alerts.filter((a) => a.type === "high" && !a.isResolved)
  const todayAlerts = alerts.filter((a) => {
    const alertDate = new Date(a.timestamp).toDateString()
    const today = new Date().toDateString()
    return alertDate === today && !a.isResolved
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestionare Alerte</h1>
          <p className="text-muted-foreground">Monitorizează și rezolvă alertele pacienților</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Configurări Alerte
          </Button>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Escaladare Echipă
          </Button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-800">
                  {criticalAlerts.length} Alertă{criticalAlerts.length > 1 ? "e" : ""} Critică
                  {criticalAlerts.length > 1 ? "e" : ""}!
                </h3>
                <p className="text-red-700">
                  Necesită intervenție imediată. Contactează echipa medicală dacă este necesar.
                </p>
              </div>
              <Button variant="destructive" size="sm" className="ml-auto">
                Acționează Acum
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerte Active</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{unresolvedAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {criticalAlerts.length} critice, {highPriorityAlerts.length} prioritate înaltă
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Necitite</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{unreadAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Necesită atenție</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Astăzi</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Alerte generate azi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rezolvate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{alerts.filter((a) => a.isResolved).length}</div>
            <p className="text-xs text-muted-foreground">În ultimele 24h</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Alerte Active ({unresolvedAlerts.length})</TabsTrigger>
          <TabsTrigger value="critical">Critice ({criticalAlerts.length})</TabsTrigger>
          <TabsTrigger value="unread">Necitite ({unreadAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Rezolvate ({alerts.filter((a) => a.isResolved).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alerte Active</CardTitle>
              <CardDescription>Toate alertele nerezolvate care necesită atenție</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {unresolvedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${!alert.isRead ? "border-blue-200 bg-blue-50" : ""}`}
                  onClick={() => onSelectPatient(alert.patientId)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={`/placeholder-patient.jpg`} />
                        <AvatarFallback>
                          {alert.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{alert.title}</h4>
                          <Badge variant={getAlertTypeColor(alert.type)}>{getAlertTypeLabel(alert.type)}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {getCategoryIcon(alert.category)}
                            <span className="ml-1">{getCategoryLabel(alert.category)}</span>
                          </Badge>
                          {!alert.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>

                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>{alert.patientName}</strong> • {new Date(alert.timestamp).toLocaleString("ro-RO")}
                        </p>

                        <p className="text-sm mb-3">{alert.description}</p>

                        {alert.escalationLevel > 0 && (
                          <Badge variant="destructive" className="text-xs mb-2">
                            Escaladat nivel {alert.escalationLevel}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedAlert(alert)
                              if (!alert.isRead) markAlertAsRead(alert.id)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalii Alertă</DialogTitle>
                            <DialogDescription>
                              Informații complete despre alertă și acțiuni disponibile
                            </DialogDescription>
                          </DialogHeader>
                          {selectedAlert && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Pacient</p>
                                  <p className="text-sm">{selectedAlert.patientName}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Tip Alertă</p>
                                  <Badge variant={getAlertTypeColor(selectedAlert.type)}>
                                    {getAlertTypeLabel(selectedAlert.type)}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Categorie</p>
                                  <p className="text-sm">{getCategoryLabel(selectedAlert.category)}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Timestamp</p>
                                  <p className="text-sm">{new Date(selectedAlert.timestamp).toLocaleString("ro-RO")}</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium mb-2">Descriere</p>
                                <p className="text-sm bg-gray-50 p-3 rounded">{selectedAlert.description}</p>
                              </div>

                              {selectedAlert.relatedData && (
                                <div>
                                  <p className="text-sm font-medium mb-2">Date Suplimentare</p>
                                  <div className="bg-gray-50 p-3 rounded text-sm">
                                    <pre>{JSON.stringify(selectedAlert.relatedData, null, 2)}</pre>
                                  </div>
                                </div>
                              )}

                              <div>
                                <p className="text-sm font-medium mb-2">Note Rezolvare</p>
                                <Textarea
                                  placeholder="Adaugă note despre cum a fost rezolvată alerta..."
                                  value={resolutionNote}
                                  onChange={(e) => setResolutionNote(e.target.value)}
                                  rows={3}
                                />
                              </div>

                              <div className="flex gap-2">
                                <Button onClick={() => handleResolveAlert(selectedAlert.id)} className="flex-1">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Marchează ca Rezolvată
                                </Button>
                                <Button variant="outline" onClick={() => handleEscalateAlert(selectedAlert.id)}>
                                  <ArrowUp className="mr-2 h-4 w-4" />
                                  Escaladează
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>

                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handleResolveAlert(alert.id)}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Alerte Critice
              </CardTitle>
              <CardDescription>Alerte care necesită intervenție imediată</CardDescription>
            </CardHeader>
            <CardContent>
              {criticalAlerts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">Nu există alerte critice în acest moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {criticalAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border-2 border-red-200 bg-red-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-red-800">{alert.title}</h4>
                          <p className="text-sm text-red-700">{alert.patientName}</p>
                          <p className="text-xs text-red-600">{alert.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="destructive" size="sm">
                            Acționează Acum
                          </Button>
                          <Button variant="outline" size="sm">
                            Escaladează
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Alerte Necitite</CardTitle>
              <CardDescription>Alerte care necesită să fie citite și evaluate</CardDescription>
            </CardHeader>
            <CardContent>
              {unreadAlerts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">Toate alertele au fost citite</p>
                </div>
              ) : (
                <p className="text-muted-foreground">Lista alertelor necitite...</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Alerte Rezolvate</CardTitle>
              <CardDescription>Istoricul alertelor rezolvate recent</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Istoricul alertelor rezolvate...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
