"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  AlertTriangle,
  Calendar,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Phone,
  Activity,
  Target,
  ArrowRight,
  CheckCircle,
  Download,
  Heart,
  Shield,
  Clock,
  FileText,
  UserPlus,
  Bell,
  Eye,
  UserCheck,
  Zap,
  BarChart3,
} from "lucide-react"
import { useNavigatorData } from "@/hooks/useNavigatorData"

interface NavigatorOverviewProps {
  onSelectPatient: (patientId: string) => void
}

// Enhanced sparkline component with trend indicator
const Sparkline = ({
  data,
  color = "blue",
  showTrend = true,
}: {
  data: number[]
  color?: string
  showTrend?: boolean
}) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const trend = data[data.length - 1] - data[0]
  const isPositive = trend > 0

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-end h-8 gap-0.5">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 100
          return (
            <div
              key={index}
              className={`w-1 bg-${color}-500 rounded-sm opacity-70`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          )
        })}
      </div>
      {showTrend && (
        <div className={`flex items-center text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span className="ml-1">{Math.abs(trend)}</span>
        </div>
      )}
    </div>
  )
}

export function NavigatorOverview({ onSelectPatient }: NavigatorOverviewProps) {
  const {
    navigator,
    patients,
    criticalPatients,
    highPriorityPatients,
    unreadAlerts,
    unresolvedAlerts,
    overdueTasks,
    todayAppointments,
    performanceMetrics,
  } = useNavigatorData()

  // Verifică dacă datele sunt disponibile
  if (!navigator || !patients || !performanceMetrics) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const capacityPercentage = (navigator.activePatients / navigator.maxCapacity) * 100

  // Enhanced sparkline data with 30-day trends
  const sparklineData = {
    patients: [18, 19, 20, 22, 21, 24, 23, 24, 25, 26, 24, 25, 27, 26, 24],
    adherence: [78, 80, 82, 85, 83, 87, 85, 88, 85, 87, 89, 86, 88, 85, 87],
    alerts: [12, 10, 8, 6, 9, 4, 7, 5, 4, 6, 3, 5, 4, 3, 4],
    appointments: [8, 6, 9, 7, 8, 10, 9, 8, 7, 9, 8, 6, 7, 8, 9],
  }

  // Enhanced recent activities with more context
  const recentActivities = [
    {
      id: 1,
      type: "critical_alert",
      icon: AlertTriangle,
      iconColor: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      title: "Alertă critică generată",
      description: "Maria Popescu • Valori anormale leucocite (2.8 x10³/μL)",
      time: "acum 2 ore",
      actionable: true,
      patientId: "patient-001",
      priority: "urgent",
    },
    {
      id: 2,
      type: "appointment",
      icon: Calendar,
      iconColor: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      title: "Programare confirmată",
      description: "Ion Georgescu • Consultație nutriționist • 15 Ian, 14:30",
      time: "acum 3 ore",
      actionable: true,
      patientId: "patient-002",
      priority: "normal",
    },
    {
      id: 3,
      type: "message",
      icon: MessageSquare,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      title: "Mesaj de la medic",
      description: "Dr. Emily Carter • Plan tratament actualizat pentru Maria P.",
      time: "acum 4 ore",
      actionable: true,
      patientId: "patient-001",
      priority: "normal",
    },
    {
      id: 4,
      type: "document",
      icon: FileText,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      title: "Document încărcat",
      description: "Elena Ionescu • Rezultate analize sânge",
      time: "acum 5 ore",
      actionable: true,
      patientId: "patient-003",
      priority: "normal",
    },
    {
      id: 5,
      type: "task_completed",
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      title: "Sarcină completată",
      description: "Follow-up post chimioterapie • Gheorghe Ionescu",
      time: "acum 6 ore",
      actionable: false,
      patientId: "patient-004",
      priority: "completed",
    },
  ]

  // Enhanced critical alerts with detailed status
  const criticalAlertsWithStatus = [
    {
      id: 1,
      title: "Valori anormale leucocite",
      patient: "Maria Popescu",
      patientId: "patient-001",
      status: "new" as const,
      time: "acum 2 ore",
      severity: "critical",
      description: "Leucocite: 2.8 x10³/μL (normal: 4.0-11.0)",
    },
    {
      id: 2,
      title: "Aderență scăzută medicație",
      patient: "Ion Georgescu",
      patientId: "patient-002",
      status: "in_progress" as const,
      time: "acum 4 ore",
      severity: "high",
      description: "Tamoxifen - 3 doze ratate în ultima săptămână",
    },
    {
      id: 3,
      title: "Efecte secundare severe",
      patient: "Ana Marinescu",
      patientId: "patient-003",
      status: "resolved" as const,
      time: "acum 6 ore",
      severity: "medium",
      description: "Nausee și vărsături post chimioterapie",
    },
  ]

  // Top patients at risk with detailed info
  const topPatientsAtRisk = [
    {
      id: "patient-001",
      name: "Maria Popescu",
      initials: "MP",
      riskLevel: "critical" as const,
      condition: "Leucemie acută",
      adherence: 65,
      lastContact: "acum 2 ore",
      alerts: 2,
    },
    {
      id: "patient-002",
      name: "Ion Georgescu",
      initials: "IG",
      riskLevel: "high" as const,
      condition: "Cancer pulmonar",
      adherence: 78,
      lastContact: "acum 1 zi",
      alerts: 1,
    },
    {
      id: "patient-005",
      name: "Elena Marinescu",
      initials: "EM",
      riskLevel: "high" as const,
      condition: "Cancer de sân",
      adherence: 82,
      lastContact: "acum 3 ore",
      alerts: 1,
    },
  ]

  // To-do list generated from data
  const todoItems = [
    {
      id: 1,
      task: "Revizuiește dosarul Maria Popescu",
      priority: "urgent",
      dueTime: "în 30 min",
      type: "review",
    },
    {
      id: 2,
      task: "Contactează Ion Georgescu pentru aderență",
      priority: "high",
      dueTime: "astăzi",
      type: "contact",
    },
    {
      id: 3,
      task: "Programează consultație nutriționist",
      priority: "normal",
      dueTime: "mâine",
      type: "schedule",
    },
  ]

  // Administrative notifications
  const adminNotifications = [
    {
      id: 1,
      title: "Update sistem programat",
      message: "Mâine 02:00-04:00 - Mentenanță programată",
      type: "system",
      time: "acum 1 oră",
    },
    {
      id: 2,
      title: "Mesaj de la supervizor",
      message: "Reamintire: Raport lunar până vineri",
      type: "supervisor",
      time: "acum 3 ore",
    },
  ]

  const getStatusBadge = (status: "new" | "in_progress" | "resolved") => {
    switch (status) {
      case "new":
        return (
          <Badge variant="destructive" className="text-xs">
            Nou
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="default" className="text-xs">
            În progres
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="secondary" className="text-xs">
            Rezolvat
          </Badge>
        )
    }
  }

  const getRiskBadge = (level: "critical" | "high" | "medium") => {
    switch (level) {
      case "critical":
        return (
          <Badge variant="destructive" className="text-xs">
            Critic
          </Badge>
        )
      case "high":
        return (
          <Badge variant="default" className="text-xs">
            Risc Înalt
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="text-xs">
            Risc Mediu
          </Badge>
        )
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500"
      case "high":
        return "border-l-orange-500"
      case "normal":
        return "border-l-blue-500"
      default:
        return "border-l-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header with Last Activity */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/placeholder-navigator.jpg" />
            <AvatarFallback className="bg-blue-500 text-white text-lg">
              {navigator.firstName[0]}
              {navigator.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Bine ai revenit, {navigator.firstName} {navigator.lastName}!
            </h1>
            <p className="text-muted-foreground">
              Navigator Medical • {navigator.specialization} • {navigator.experience} ani experiență
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Ultima conectare: Azi, 08:00
              </span>
              <span className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                {navigator.activePatients}/{navigator.maxCapacity} pacienți activi
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Phone className="mr-2 h-4 w-4" />
            Urgențe
          </Button>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
            <MessageSquare className="mr-2 h-4 w-4" />
            Mesaje Echipă
          </Button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {unresolvedAlerts.filter((a) => a.type === "critical").length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 rounded-xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">Alertă Critică!</h3>
                <p className="text-red-700 dark:text-red-300">
                  {unresolvedAlerts.filter((a) => a.type === "critical").length} pacient(i) necesită atenție imediată.
                </p>
              </div>
              <Button variant="destructive" size="sm" className="ml-auto">
                Vezi Alertele
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced KPI Cards with Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacienți Activi</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{navigator.activePatients}</div>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={capacityPercentage} className="flex-1" />
              <span className="text-xs text-muted-foreground">{Math.round(capacityPercentage)}%</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground">
                {criticalPatients.length} critici, {highPriorityPatients.length} prioritate înaltă
              </p>
              <Sparkline data={sparklineData.patients} color="blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aderență Medie</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85%</div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground">+9% față de luna trecută</p>
              <Sparkline data={sparklineData.adherence} color="green" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerte Active</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{unresolvedAlerts.length}</div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground">
                {unreadAlerts.length} necitite • {unresolvedAlerts.filter((a) => a.type === "critical").length} critice
              </p>
              <Sparkline data={sparklineData.alerts} color="red" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programări Astăzi</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground">
                Următoarea: {todayAppointments[0]?.nextAppointment?.split(" ")[1] || "N/A"}
              </p>
              <Sparkline data={sparklineData.appointments} color="purple" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Recent Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Activitate Recentă
              </CardTitle>
              <CardDescription>Ultimele acțiuni și evenimente din ultimele 24h</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-center gap-3 p-3 border-l-4 ${getPriorityColor(activity.priority)} bg-gray-50 dark:bg-gray-800/50 rounded-r-lg`}
                  >
                    <Avatar className={`w-10 h-10 ${activity.bgColor}`}>
                      <AvatarFallback className={activity.bgColor}>
                        <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className="flex gap-2">
                      {activity.actionable && (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => onSelectPatient(activity.patientId)}>
                            <Eye className="h-3 w-3 mr-1" />
                            Vezi
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="h-3 w-3 mr-1" />
                            Continuă
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Activity className="h-4 w-4 mr-2" />
                  Vezi Tot Istoricul
                </Button>
                <Button variant="outline" className="flex-1">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Raport Activitate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Critical Alerts */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Alerte Critice
                <Badge variant="destructive" className="ml-2">
                  {criticalAlertsWithStatus.filter((a) => a.status !== "resolved").length}
                </Badge>
              </CardTitle>
              <CardDescription>Alerte care necesită atenție imediată</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {criticalAlertsWithStatus.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      {getStatusBadge(alert.status)}
                    </div>
                    <p className="text-sm font-medium text-blue-600 mb-1">{alert.patient}</p>
                    <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    {alert.status === "new" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Citește
                        </Button>
                        <Button variant="outline" size="sm">
                          <UserCheck className="h-3 w-3 mr-1" />
                          Atribuie
                        </Button>
                      </>
                    )}
                    {alert.status !== "resolved" && (
                      <Button variant="default" size="sm">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Rezolvă
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => onSelectPatient(alert.patientId)}>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Enhanced Quick Actions */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Acțiuni Rapide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Adaugă Programare
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                Contactează Pacient
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Mesaj Echipă
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Raport Activitate
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UserPlus className="mr-2 h-4 w-4" />
                Adaugă Pacient
              </Button>
            </CardContent>
          </Card>

          {/* Top Patients at Risk */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-500" />
                Top Pacienți Risc
              </CardTitle>
              <CardDescription>Necesită atenție prioritară</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPatientsAtRisk.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {patient.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.condition}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">Aderență: {patient.adherence}%</span>
                          {patient.alerts > 0 && (
                            <Badge variant="destructive" className="text-xs px-1">
                              {patient.alerts} alertă
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {getRiskBadge(patient.riskLevel)}
                      <Button variant="ghost" size="sm" onClick={() => onSelectPatient(patient.id)}>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* To-Do List */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Sarcini de Făcut
              </CardTitle>
              <CardDescription>Generate automat din date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todoItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 border-l-4 ${getPriorityColor(item.priority)} bg-gray-50 dark:bg-gray-800/50 rounded-r-lg`}
                  >
                    <p className="text-sm font-medium">{item.task}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{item.dueTime}</span>
                      <Button variant="ghost" size="sm">
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Administrative Notifications */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-500" />
                Notificări Administrative
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {adminNotifications.map((notification) => (
                  <div key={notification.id} className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
