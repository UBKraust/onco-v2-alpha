"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Users,
  Calendar,
  MessageSquare,
  Phone,
  CheckCircle,
  TrendingUp,
  Activity,
  Settings,
  Plus,
  Eye,
} from "lucide-react"
import { useNavigatorData } from "@/hooks/useNavigatorData"
import { AlertsManagement } from "@/components/navigator/alerts-management"

export default function NavigatorDashboardComplete() {
  const {
    navigator,
    patients,
    alerts,
    tasks,
    stats,
    criticalPatients,
    unreadAlerts,
    unresolvedAlerts,
    overdueTasks,
    todayAppointments,
  } = useNavigatorData()

  const [selectedView, setSelectedView] = useState<"overview" | "alerts" | "patients" | "tasks">("overview")
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId)
    setSelectedView("patients")
  }

  if (selectedView === "alerts") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => setSelectedView("overview")}>
                ← Înapoi la Dashboard
              </Button>
              <h1 className="text-2xl font-bold">Gestionare Alerte</h1>
              <div></div>
            </div>
          </div>
        </div>
        <AlertsManagement onSelectPatient={handleSelectPatient} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bună ziua, {navigator.firstName} {navigator.lastName}
              </h1>
              <p className="text-gray-600">Navigator Pacienți Oncologici • {stats.totalPatients} pacienți activi</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Setări
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Pacient Nou
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacienți Activi</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">{stats.highRiskPatients} cu risc ridicat</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedView("alerts")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerte Active</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.criticalAlerts}</div>
              <p className="text-xs text-muted-foreground">{unreadAlerts.length} necitite</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Programări Astăzi</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground">{stats.pendingTasks} task-uri în așteptare</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aderență Medie</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.averageAdherence}%</div>
              <p className="text-xs text-muted-foreground">+5% față de luna trecută</p>
            </CardContent>
          </Card>
        </div>

        {/* Critical Alerts Banner */}
        {stats.criticalAlerts > 0 && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800">
                    {stats.criticalAlerts} Alertă{stats.criticalAlerts > 1 ? "e" : ""} Critică
                    {stats.criticalAlerts > 1 ? "e" : ""}!
                  </h3>
                  <p className="text-red-700">Necesită intervenție imediată. Verifică alertele pentru detalii.</p>
                </div>
                <Button variant="destructive" onClick={() => setSelectedView("alerts")}>
                  Vezi Alertele
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Prezentare Generală</TabsTrigger>
            <TabsTrigger value="patients">Pacienți ({patients.length})</TabsTrigger>
            <TabsTrigger value="alerts">Alerte ({unresolvedAlerts.length})</TabsTrigger>
            <TabsTrigger value="tasks">Task-uri ({tasks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Activitate Recentă
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          alert.type === "critical"
                            ? "bg-red-500"
                            : alert.type === "high"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                        <p className="text-xs text-gray-600">{alert.patientName}</p>
                        <p className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleString("ro-RO")}</p>
                      </div>
                      <Badge variant={alert.type === "critical" ? "destructive" : "secondary"} className="text-xs">
                        {alert.type === "critical" ? "Critic" : alert.type === "high" ? "Înalt" : "Normal"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Pacienți cu Risc Ridicat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {criticalPatients.slice(0, 5).map((patient) => (
                    <div key={patient.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={`/placeholder-patient.jpg`} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {patient.firstName[0]}
                          {patient.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </p>
                        <p className="text-xs text-gray-600">{patient.diagnosis}</p>
                        <p className="text-xs text-gray-500">Aderență: {patient.adherenceScore}%</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista Pacienți</CardTitle>
                <CardDescription>Toți pacienții din portofoliul tău</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={`/placeholder-patient.jpg`} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {patient.firstName[0]}
                          {patient.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {patient.diagnosis} • Stadiul {patient.stage}
                        </p>
                        <p className="text-xs text-gray-500">
                          Ultima consultație: {new Date(patient.lastContact).toLocaleDateString("ro-RO")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={patient.riskLevel === "high" ? "destructive" : "secondary"}>
                          {patient.riskLevel === "high" ? "Risc Ridicat" : "Risc Normal"}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm font-medium">Aderență: {patient.adherenceScore}%</p>
                          <p className="text-xs text-gray-500">{patient.activeAlerts} alerte active</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Alerte Active</span>
                  <Button onClick={() => setSelectedView("alerts")}>Vezi Toate Alertele</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {unresolvedAlerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 ${
                          alert.type === "critical"
                            ? "bg-red-500"
                            : alert.type === "high"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <p className="text-sm text-gray-600">{alert.patientName}</p>
                        <p className="text-xs text-gray-500">{alert.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task-uri Pendinte</CardTitle>
                <CardDescription>Task-urile tale de astăzi și cele în întârziere</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          task.priority === "high"
                            ? "bg-red-500"
                            : task.priority === "medium"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.patientName}</p>
                        <p className="text-xs text-gray-500">
                          Scadență: {new Date(task.dueDate).toLocaleString("ro-RO")}
                        </p>
                      </div>
                      <Badge variant={task.status === "pending" ? "destructive" : "secondary"}>
                        {task.status === "pending" ? "În așteptare" : "În progres"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
