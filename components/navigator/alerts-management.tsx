"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
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
  Settings,
} from "lucide-react"
import { useNavigatorData } from "@/hooks/useNavigatorData"
import { useAlertFilters } from "@/hooks/useAlertFilters"
import { AlertFilters } from "./alert-filters"
import { AlertActionDialog } from "./alert-action-dialog"
import type { PatientAlert } from "@/types/navigator"

interface AlertsManagementProps {
  onSelectPatient: (patientId: string) => void
}

export function AlertsManagement({ onSelectPatient }: AlertsManagementProps) {
  const {
    alerts,
    unreadAlerts,
    unresolvedAlerts,
    markAlertAsRead,
    resolveAlert,
    escalateAlert,
    markAllAlertsAsRead,
    initiatePhoneCall,
    sendMessage,
  } = useNavigatorData()

  const {
    filters,
    sortBy,
    sortOrder,
    updateFilter,
    toggleFilterValue,
    clearFilters,
    setSortBy,
    setSortOrder,
    hasActiveFilters,
  } = useAlertFilters()

  const [selectedAlert, setSelectedAlert] = useState<PatientAlert | null>(null)
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const { toast } = useToast()

  // Filter and sort alerts
  const filteredAndSortedAlerts = useMemo(() => {
    const filtered = alerts.filter((alert) => {
      // Apply filters
      if (filters.type.length > 0 && !filters.type.includes(alert.type)) return false
      if (filters.category.length > 0 && !filters.category.includes(alert.category)) return false
      if (!filters.showResolved && alert.isResolved) return false
      if (!filters.showRead && alert.isRead) return false
      if (
        filters.searchTerm &&
        !alert.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !alert.patientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !alert.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
        return false

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const alertDate = new Date(alert.timestamp)
        if (filters.dateRange.from && alertDate < filters.dateRange.from) return false
        if (filters.dateRange.to && alertDate > filters.dateRange.to) return false
      }

      return true
    })

    // Sort alerts
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "timestamp":
          comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          break
        case "priority":
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
          comparison =
            priorityOrder[a.type as keyof typeof priorityOrder] - priorityOrder[b.type as keyof typeof priorityOrder]
          break
        case "patient":
          comparison = a.patientName.localeCompare(b.patientName)
          break
      }

      return sortOrder === "desc" ? -comparison : comparison
    })

    return filtered
  }, [alerts, filters, sortBy, sortOrder])

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

  const handleAlertAction = (alert: PatientAlert, action: string) => {
    setSelectedAlert(alert)
    setIsActionDialogOpen(true)
    if (!alert.isRead) {
      markAlertAsRead(alert.id)
    }
  }

  const handleResolveAlert = (alertId: string, note: string) => {
    resolveAlert(alertId, note)
    toast({
      title: "Alertă rezolvată",
      description: "Alerta a fost marcată ca rezolvată cu succes.",
    })
  }

  const handleEscalateAlert = (alertId: string) => {
    escalateAlert(alertId)
    toast({
      title: "Alertă escaladată",
      description: "Alerta a fost escaladată către echipa medicală.",
      variant: "destructive",
    })
  }

  const handlePhoneCall = (patientId: string) => {
    initiatePhoneCall(patientId)
    toast({
      title: "Apel inițiat",
      description: "Sistemul de telefonie a fost activat.",
    })
  }

  const handleSendMessage = (patientId: string, message: string) => {
    sendMessage(patientId, message)
    toast({
      title: "Mesaj trimis",
      description: "Mesajul a fost trimis către pacient.",
    })
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
            <Settings className="mr-2 h-4 w-4" />
            Configurări Alerte
          </Button>
          <Button onClick={markAllAlertsAsRead} disabled={unreadAlerts.length === 0}>
            <Bell className="mr-2 h-4 w-4" />
            Marchează toate ca citite
          </Button>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Escaladare Echipă
          </Button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 dark:text-red-200">
                  {criticalAlerts.length} Alertă{criticalAlerts.length > 1 ? "e" : ""} Critică
                  {criticalAlerts.length > 1 ? "e" : ""}!
                </h3>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  Necesită intervenție imediată. Contactează echipa medicală dacă este necesar.
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="shrink-0"
                onClick={() => {
                  // Deschide prima alertă critică pentru acțiune imediată
                  if (criticalAlerts.length > 0) {
                    handleAlertAction(criticalAlerts[0], "resolve")
                  }
                }}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
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

      {/* Filters */}
      {/* Alerts Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">
            Alerte Active ({filteredAndSortedAlerts.filter((a) => !a.isResolved).length})
          </TabsTrigger>
          <TabsTrigger value="critical">Critice ({criticalAlerts.length})</TabsTrigger>
          <TabsTrigger value="unread">Necitite ({unreadAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Rezolvate ({alerts.filter((a) => a.isResolved).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Alerte Active</h2>
            <p className="text-sm text-muted-foreground">Toate alertele nerezolvate care necesită intervenție.</p>
          </div>

          {/* Sticky Filters */}
          {/* <div className="sticky top-[80px] z-20 bg-background py-4">
            <AlertFilters
              filters={filters}
              onFilterChange={updateFilter}
              onToggleFilter={toggleFilterValue}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={setSortBy}
              onSortOrderChange={setSortOrder}
            />
          </div> */}

          {filteredAndSortedAlerts.filter((a) => !a.isResolved).length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {hasActiveFilters ? "Nu s-au găsit alerte" : "Toate alertele sunt rezolvate!"}
              </h3>
              <p className="text-gray-700">
                {hasActiveFilters
                  ? "Încearcă să modifici filtrele pentru a vedea mai multe rezultate."
                  : "Nu există alerte active care necesită atenție în acest moment."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredAndSortedAlerts
                .filter((a) => !a.isResolved)
                .map((alert) => (
                  <div
                    key={alert.id}
                    className="rounded-lg bg-white dark:bg-gray-900 p-4 shadow-sm border space-y-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onSelectPatient(alert.patientId)}
                  >
                    {/* Titlu alertă + icon + badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(alert.category)}
                        <h3
                          className={`font-semibold text-sm ${
                            alert.type === "critical"
                              ? "text-red-600"
                              : alert.type === "high"
                                ? "text-orange-600"
                                : alert.type === "medium"
                                  ? "text-blue-600"
                                  : "text-gray-600"
                          }`}
                        >
                          {alert.title}
                        </h3>
                        {!alert.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            alert.type === "critical"
                              ? "destructive"
                              : alert.type === "high"
                                ? "default"
                                : alert.type === "medium"
                                  ? "secondary"
                                  : "outline"
                          }
                          className={
                            alert.type === "critical"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : alert.type === "high"
                                ? "bg-orange-100 text-orange-800 border-orange-200"
                                : alert.type === "medium"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {getAlertTypeLabel(alert.type).toUpperCase()}
                        </Badge>
                        {alert.escalationLevel > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            <ArrowUp className="w-3 h-3 mr-1" />
                            Nivel {alert.escalationLevel}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Descriere */}
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{alert.description}</p>

                    {/* Pacient + timestamp + acțiuni rapide */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={`/placeholder-patient.jpg`} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                            {alert.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{alert.patientName}</span>
                        <span>•</span>
                        <span>
                          {new Date(alert.timestamp).toLocaleString("ro-RO", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePhoneCall(alert.patientId)
                          }}
                        >
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAlertAction(alert, "message")
                          }}
                        >
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-purple-50 hover:text-purple-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAlertAction(alert, "view")
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAlertAction(alert, "resolve")
                          }}
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
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
                    <div key={alert.id} className="p-4 border-2 border-red-300 bg-red-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-red-900">{alert.title}</h4>
                          <p className="text-sm text-red-800">{alert.patientName}</p>
                          <p className="text-xs text-red-800">{alert.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="destructive" size="sm" onClick={() => handleAlertAction(alert, "resolve")}>
                            Acționează Acum
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-800 border-red-300 hover:bg-red-100"
                            onClick={() => handleEscalateAlert(alert.id)}
                          >
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
                <div className="space-y-4">
                  {unreadAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-blue-900">{alert.title}</h4>
                          <p className="text-sm text-blue-800">{alert.patientName}</p>
                          <p className="text-xs text-blue-700">{alert.description}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => markAlertAsRead(alert.id)}>
                          Marchează ca citită
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
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
              {alerts.filter((a) => a.isResolved).length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">Nu există alerte rezolvate</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts
                    .filter((a) => a.isResolved)
                    .map((alert) => (
                      <div key={alert.id} className="p-4 border border-green-200 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-green-900">{alert.title}</h4>
                            <p className="text-sm text-green-800">{alert.patientName}</p>
                            <p className="text-xs text-green-700">{alert.description}</p>
                            {(alert as any).resolutionNote && (
                              <p className="text-xs text-green-600 mt-1">
                                <strong>Rezolvare:</strong> {(alert as any).resolutionNote}
                              </p>
                            )}
                          </div>
                          <Badge variant="outline" className="text-green-700 border-green-300">
                            Rezolvată
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Dialog */}
      <AlertActionDialog
        alert={selectedAlert}
        isOpen={isActionDialogOpen}
        onClose={() => {
          setIsActionDialogOpen(false)
          setSelectedAlert(null)
        }}
        onResolve={handleResolveAlert}
        onEscalate={handleEscalateAlert}
        onCall={handlePhoneCall}
        onMessage={handleSendMessage}
      />
      {/* Sticky Filters */}
      <div className="sticky top-[80px] z-20 bg-background py-4">
        <AlertFilters
          filters={filters}
          onFilterChange={updateFilter}
          onToggleFilter={toggleFilterValue}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={setSortBy}
          onSortOrderChange={setSortOrder}
        />
      </div>
    </div>
  )
}
