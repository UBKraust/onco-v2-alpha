"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, UserCheck, AlertTriangle, Activity, TrendingUp, Clock, Shield, Database } from "lucide-react"
import { useAdminData } from "@/hooks/useAdminData"

export function AdminDashboardOverview() {
  const { users, medicalTeam, alerts, loading } = useAdminData()

  if (loading) {
    return <div>Se încarcă...</div>
  }

  const activeUsers = users.filter((u) => u.status === "active").length
  const activeNavigators = users.filter((u) => u.role === "navigator" && u.status === "active").length
  const criticalAlerts = alerts.filter((a) => a.severity === "critical" && a.status === "open").length
  const openAlerts = alerts.filter((a) => a.status === "open").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Administrator</h1>
        <p className="text-muted-foreground">Monitorizează și administrează platforma OncoLink</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilizatori Activi</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">+12% față de luna trecută</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Navigatori Activi</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeNavigators}</div>
            <p className="text-xs text-muted-foreground">
              Din {users.filter((u) => u.role === "navigator").length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Echipa Medicală</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicalTeam.length}</div>
            <p className="text-xs text-muted-foreground">Medici înregistrați</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerte Active</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{openAlerts}</div>
            <p className="text-xs text-muted-foreground">{criticalAlerts} critice</p>
          </CardContent>
        </Card>
      </div>

      {/* System Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status Sistem</CardTitle>
            <CardDescription>Monitorizarea performanței în timp real</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Performanță Server</span>
                <Badge className="bg-green-600">Optimă</Badge>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Utilizare Memorie</span>
                <Badge variant="outline">68%</Badge>
              </div>
              <Progress value={68} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Utilizare CPU</span>
                <Badge variant="outline">45%</Badge>
              </div>
              <Progress value={45} className="h-2" />
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ultimul Backup</span>
                <Badge variant="secondary">Azi, 02:00</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Uptime</span>
                <Badge className="bg-green-600">99.9%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acțiuni Rapide</CardTitle>
            <CardDescription>Funcții administrative frecvente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Gestionează Utilizatori
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <UserCheck className="mr-2 h-4 w-4" />
              Asignează Pacienți
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Activity className="mr-2 h-4 w-4" />
              Echipa Medicală
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Shield className="mr-2 h-4 w-4" />
              Securitate & Audit
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Database className="mr-2 h-4 w-4" />
              Backup Manual
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <TrendingUp className="mr-2 h-4 w-4" />
              Rapoarte & Statistici
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Alerte Recente</CardTitle>
            <CardDescription>Ultimele notificări de sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle
                      className={`h-4 w-4 ${
                        alert.severity === "critical"
                          ? "text-red-600"
                          : alert.severity === "high"
                            ? "text-orange-600"
                            : alert.severity === "medium"
                              ? "text-yellow-600"
                              : "text-blue-600"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
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
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{alert.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
