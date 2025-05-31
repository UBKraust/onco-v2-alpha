"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Clock,
  MessageSquare,
  Phone,
  Activity,
  Target,
  Award,
} from "lucide-react"
import { useNavigatorData } from "@/hooks/useNavigatorData"

interface NavigatorOverviewProps {
  onSelectPatient: (patientId: string) => void
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

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
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
            <p className="text-sm text-muted-foreground">
              {navigator.activePatients}/{navigator.maxCapacity} pacienți activi • Ultima conectare: Azi, 08:00
            </p>
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
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-800">Alertă Critică!</h3>
                <p className="text-red-700">
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
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
            <p className="text-xs text-muted-foreground mt-1">
              {criticalPatients.length} critici, {highPriorityPatients.length} prioritate înaltă
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerte Active</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{unresolvedAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {unreadAlerts.length} necitite • {unresolvedAlerts.filter((a) => a.type === "critical").length} critice
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programări Astăzi</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              Următoarea: {todayAppointments[0]?.nextAppointment?.split(" ")[1] || "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sarcini Restante</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {overdueTasks.filter((t) => t.priority === "urgent").length} urgente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Performanță Curentă
          </CardTitle>
          <CardDescription>Indicatori cheie de performanță pentru {performanceMetrics.period}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{performanceMetrics.patientSatisfactionScore}/5</div>
              <p className="text-sm text-muted-foreground">Satisfacție Pacienți</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{performanceMetrics.averageResponseTime}h</div>
              <p className="text-sm text-muted-foreground">Timp Răspuns Mediu</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{performanceMetrics.adherenceImprovementRate}%</div>
              <p className="text-sm text-muted-foreground">Îmbunătățire Aderență</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{performanceMetrics.completedTasks}</div>
              <p className="text-sm text-muted-foreground">Sarcini Completate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Priority Patients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Pacienți Prioritate Înaltă
            </CardTitle>
            <CardDescription>Pacienți care necesită atenție imediată</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {highPriorityPatients.slice(0, 4).map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={`/placeholder-patient-${patient.id}.jpg`} />
                    <AvatarFallback>
                      {patient.firstName[0]}
                      {patient.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{patient.diagnosis}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={patient.riskLevel === "critical" ? "destructive" : "default"} className="text-xs">
                        {patient.riskLevel === "critical" ? "Critic" : "Risc Înalt"}
                      </Badge>
                      {patient.activeAlerts > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {patient.activeAlerts} alertă
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Button variant="outline" size="sm">
                    <Phone className="h-3 w-3 mr-1" />
                    Contactează
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onSelectPatient(patient.id)}>
                    Vezi Profil
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Vezi Toți Pacienții Prioritari
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Activitate Recentă
            </CardTitle>
            <CardDescription>Ultimele acțiuni și evenimente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Alertă critică generată</p>
                  <p className="text-xs text-muted-foreground">Maria Popescu • Valori anormale analize • acum 2 ore</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Programare confirmată</p>
                  <p className="text-xs text-muted-foreground">Ion Georgescu • Consultație nutriționist • acum 3 ore</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Mesaj de la medic</p>
                  <p className="text-xs text-muted-foreground">
                    Dr. Emily Carter • Plan tratament actualizat • acum 4 ore
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sarcină completată</p>
                  <p className="text-xs text-muted-foreground">
                    Follow-up post chimioterapie • Gheorghe Ionescu • acum 5 ore
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Vezi Toată Activitatea
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Acțiuni Rapide
          </CardTitle>
          <CardDescription>Funcții frecvent utilizate pentru navigatori</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex-col">
              <AlertTriangle className="h-6 w-6 mb-2" />
              Triaj Pacienți
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Coordonare Programări
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MessageSquare className="h-6 w-6 mb-2" />
              Comunicare Echipă
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Award className="h-6 w-6 mb-2" />
              Rapoarte Performanță
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
