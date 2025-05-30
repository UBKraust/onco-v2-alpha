"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
  Bell,
  Heart,
  Activity,
  Thermometer,
  Pill,
} from "lucide-react"
import Link from "next/link"

const mockAlerts = [
  {
    id: "1",
    patient: "Maria Popescu",
    type: "critical",
    category: "medical",
    title: "Valori anormale în analize",
    description: "Niveluri crescute ale markerilor tumorali",
    timestamp: "acum 30 min",
    status: "active",
    priority: "high",
    actions: ["contact_patient", "schedule_appointment", "notify_doctor"],
  },
  {
    id: "2",
    patient: "Ion Georgescu",
    type: "warning",
    category: "adherence",
    title: "Aderență scăzută la medicație",
    description: "Nu a luat medicația în ultimele 2 zile",
    timestamp: "acum 2 ore",
    status: "active",
    priority: "medium",
    actions: ["contact_patient", "medication_reminder"],
  },
  {
    id: "3",
    patient: "Ana Dumitrescu",
    type: "info",
    category: "appointment",
    title: "Programare ratată",
    description: "Nu s-a prezentat la consultația de astăzi",
    timestamp: "acum 4 ore",
    status: "active",
    priority: "medium",
    actions: ["contact_patient", "reschedule"],
  },
  {
    id: "4",
    patient: "Gheorghe Ionescu",
    type: "warning",
    category: "symptoms",
    title: "Simptome noi raportate",
    description: "Dureri abdominale severe și greață",
    timestamp: "acum 6 ore",
    status: "resolved",
    priority: "high",
    actions: ["reviewed"],
  },
  {
    id: "5",
    patient: "Elena Vasilescu",
    type: "info",
    category: "vitals",
    title: "Valori vitale în afara limitelor",
    description: "Tensiune arterială ușor crescută",
    timestamp: "ieri",
    status: "active",
    priority: "low",
    actions: ["monitor", "lifestyle_advice"],
  },
]

export default function NavigatorAlertsPage() {
  const [selectedTab, setSelectedTab] = useState("active")

  const getAlertIcon = (type: string, category: string) => {
    if (type === "critical") return <AlertTriangle className="h-5 w-5 text-red-500" />
    if (category === "medical") return <Heart className="h-5 w-5 text-red-500" />
    if (category === "adherence") return <Pill className="h-5 w-5 text-orange-500" />
    if (category === "symptoms") return <Activity className="h-5 w-5 text-yellow-500" />
    if (category === "vitals") return <Thermometer className="h-5 w-5 text-blue-500" />
    return <Bell className="h-5 w-5 text-gray-500" />
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-l-red-500 bg-red-50 dark:bg-red-950/20"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
      case "info":
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20"
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Înaltă</Badge>
      case "medium":
        return <Badge variant="default">Medie</Badge>
      case "low":
        return <Badge variant="secondary">Scăzută</Badge>
      default:
        return <Badge variant="outline">Necunoscută</Badge>
    }
  }

  const filteredAlerts = mockAlerts.filter((alert) => {
    if (selectedTab === "active") return alert.status === "active"
    if (selectedTab === "resolved") return alert.status === "resolved"
    if (selectedTab === "critical") return alert.type === "critical"
    return true
  })

  const activeAlertsCount = mockAlerts.filter((alert) => alert.status === "active").length
  const criticalAlertsCount = mockAlerts.filter((alert) => alert.type === "critical").length
  const resolvedAlertsCount = mockAlerts.filter((alert) => alert.status === "resolved").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Centru de Alerte</h1>
          <p className="text-muted-foreground">Monitorizează și gestionează alertele pacienților</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Configurări Alerte
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alerte Active</p>
                <p className="text-2xl font-bold">{activeAlertsCount}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critice</p>
                <p className="text-2xl font-bold text-red-600">{criticalAlertsCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rezolvate Astăzi</p>
                <p className="text-2xl font-bold text-green-600">{resolvedAlertsCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Timp Mediu Răspuns</p>
                <p className="text-2xl font-bold">15min</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active ({activeAlertsCount})</TabsTrigger>
          <TabsTrigger value="critical">Critice ({criticalAlertsCount})</TabsTrigger>
          <TabsTrigger value="resolved">Rezolvate ({resolvedAlertsCount})</TabsTrigger>
          <TabsTrigger value="all">Toate ({mockAlerts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedTab === "active"
                  ? "Alerte Active"
                  : selectedTab === "critical"
                    ? "Alerte Critice"
                    : selectedTab === "resolved"
                      ? "Alerte Rezolvate"
                      : "Toate Alertele"}
              </CardTitle>
              <CardDescription>{filteredAlerts.length} alerte în această categorie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`border-l-4 ${getAlertColor(alert.type)} rounded-lg p-4 hover:bg-muted/50 transition-colors`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Alert Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getAlertIcon(alert.type, alert.category)}
                          <h3 className="font-semibold text-lg">{alert.title}</h3>
                          {getPriorityBadge(alert.priority)}
                          {alert.status === "resolved" && (
                            <Badge variant="outline" className="text-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Rezolvat
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{alert.patient}</span>
                            <span className="text-muted-foreground">•</span>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{alert.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {alert.status === "active" && (
                          <>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/navigator/patients/${alert.patient.split(" ")[0].toLowerCase()}`}>
                                <User className="h-4 w-4 mr-1" />
                                Pacient
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-1" />
                              Sună
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Mesaj
                            </Button>
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Rezolvă
                            </Button>
                          </>
                        )}
                        {alert.status === "resolved" && (
                          <Button variant="outline" size="sm" disabled>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Rezolvat
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
