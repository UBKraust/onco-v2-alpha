"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { AlertTriangle, CheckCircle, X, Clock, Filter, Shield, Database, Users, Calendar } from "lucide-react"
import { useAdminData } from "@/hooks/useAdminData"
import type { SystemAlert } from "@/types/admin"

export function SystemAlertsManager() {
  const { alerts, resolveAlert, dismissAlert } = useAdminData()
  const [selectedAlert, setSelectedAlert] = useState<SystemAlert | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("open")

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesCategory = categoryFilter === "all" || alert.category === categoryFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter

    return matchesSeverity && matchesCategory && matchesStatus
  })

  const handleResolve = async (alertId: string) => {
    try {
      await resolveAlert(alertId, "admin-1")
      toast.success("Alertă rezolvată cu succes")
    } catch (error) {
      toast.error("Eroare la rezolvarea alertei")
    }
  }

  const handleDismiss = async (alertId: string) => {
    try {
      await dismissAlert(alertId)
      toast.success("Alertă respinsă")
    } catch (error) {
      toast.error("Eroare la respingerea alertei")
    }
  }

  const showDetails = (alert: SystemAlert) => {
    setSelectedAlert(alert)
    setDetailsDialogOpen(true)
  }

  const getAlertIcon = (category: string) => {
    switch (category) {
      case "security":
        return <Shield className="h-4 w-4" />
      case "system":
        return <Database className="h-4 w-4" />
      case "patient":
        return <Users className="h-4 w-4" />
      case "appointment":
        return <Calendar className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const alertStats = {
    total: alerts.length,
    open: alerts.filter((a) => a.status === "open").length,
    critical: alerts.filter((a) => a.severity === "critical" && a.status === "open").length,
    resolved: alerts.filter((a) => a.status === "resolved").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alerte Sistem</h1>
        <p className="text-muted-foreground">Monitorizează și gestionează alertele de sistem</p>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerte</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertStats.total}</div>
            <p className="text-xs text-muted-foreground">Toate alertele din sistem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerte Active</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{alertStats.open}</div>
            <p className="text-xs text-muted-foreground">Necesită atenție</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critice</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alertStats.critical}</div>
            <p className="text-xs text-muted-foreground">Prioritate maximă</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rezolvate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{alertStats.resolved}</div>
            <p className="text-xs text-muted-foreground">Această lună</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtrare Alerte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Severitate</label>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="critical">Critică</SelectItem>
                  <SelectItem value="high">Ridicată</SelectItem>
                  <SelectItem value="medium">Medie</SelectItem>
                  <SelectItem value="low">Scăzută</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Categorie</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="system">Sistem</SelectItem>
                  <SelectItem value="security">Securitate</SelectItem>
                  <SelectItem value="patient">Pacient</SelectItem>
                  <SelectItem value="appointment">Programări</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="open">Deschise</SelectItem>
                  <SelectItem value="in_progress">În progres</SelectItem>
                  <SelectItem value="resolved">Rezolvate</SelectItem>
                  <SelectItem value="dismissed">Respinse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista Alerte ({filteredAlerts.length})</CardTitle>
          <CardDescription>Toate alertele filtrate după criteriile selectate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 border rounded-lg ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getAlertIcon(alert.category)}

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge
                          variant={
                            alert.severity === "critical"
                              ? "destructive"
                              : alert.severity === "high"
                                ? "destructive"
                                : alert.severity === "medium"
                                  ? "default"
                                  : "secondary"
                          }
                        >
                          {alert.severity}
                        </Badge>
                        <Badge variant="outline">{alert.category}</Badge>
                        <Badge
                          variant={
                            alert.status === "open"
                              ? "destructive"
                              : alert.status === "in_progress"
                                ? "default"
                                : alert.status === "resolved"
                                  ? "default"
                                  : "secondary"
                          }
                        >
                          {alert.status}
                        </Badge>
                      </div>

                      <p className="text-sm mb-2">{alert.message}</p>

                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{alert.createdAt.toLocaleString()}</span>
                        </span>
                        {alert.resolvedAt && <span>Rezolvată: {alert.resolvedAt.toLocaleString()}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => showDetails(alert)}>
                      Detalii
                    </Button>

                    {alert.status === "open" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleResolve(alert.id)}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDismiss(alert.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredAlerts.length === 0 && (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nu există alerte care să corespundă filtrelor selectate</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alert Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalii Alertă</DialogTitle>
            <DialogDescription>Informații complete despre alertă</DialogDescription>
          </DialogHeader>

          {selectedAlert && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Titlu</label>
                  <p className="text-sm">{selectedAlert.title}</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Severitate</label>
                  <Badge
                    variant={
                      selectedAlert.severity === "critical"
                        ? "destructive"
                        : selectedAlert.severity === "high"
                          ? "destructive"
                          : "default"
                    }
                  >
                    {selectedAlert.severity}
                  </Badge>
                </div>

                <div>
                  <label className="text-sm font-medium">Categorie</label>
                  <p className="text-sm">{selectedAlert.category}</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge variant="outline">{selectedAlert.status}</Badge>
                </div>

                <div>
                  <label className="text-sm font-medium">Creat la</label>
                  <p className="text-sm">{selectedAlert.createdAt.toLocaleString()}</p>
                </div>

                {selectedAlert.resolvedAt && (
                  <div>
                    <label className="text-sm font-medium">Rezolvat la</label>
                    <p className="text-sm">{selectedAlert.resolvedAt.toLocaleString()}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Mesaj</label>
                <p className="text-sm mt-1 p-3 bg-gray-50 rounded">{selectedAlert.message}</p>
              </div>

              {selectedAlert.metadata && (
                <div>
                  <label className="text-sm font-medium">Metadata</label>
                  <pre className="text-xs mt-1 p-3 bg-gray-50 rounded overflow-auto">
                    {JSON.stringify(selectedAlert.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
              Închide
            </Button>
            {selectedAlert?.status === "open" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleDismiss(selectedAlert.id)
                    setDetailsDialogOpen(false)
                  }}
                >
                  Respinge
                </Button>
                <Button
                  onClick={() => {
                    handleResolve(selectedAlert.id)
                    setDetailsDialogOpen(false)
                  }}
                >
                  Rezolvă
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
