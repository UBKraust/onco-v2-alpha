"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  UserPlus,
  Eye,
  MessageSquare,
  Phone,
  AlertTriangle,
  Calendar,
  Activity,
  TrendingUp,
} from "lucide-react"
import { useNavigatorData } from "@/hooks/useNavigatorData"

interface PatientManagementProps {
  onSelectPatient: (patientId: string) => void
}

export function PatientManagement({ onSelectPatient }: PatientManagementProps) {
  const { patients, alerts, unresolvedAlerts } = useNavigatorData()
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRisk = riskFilter === "all" || patient.riskLevel === riskFilter

    return matchesSearch && matchesRisk
  })

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
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

  const getRiskLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case "critical":
        return "Critic"
      case "high":
        return "Risc Înalt"
      case "medium":
        return "Risc Mediu"
      case "low":
        return "Risc Scăzut"
      default:
        return riskLevel
    }
  }

  const getAdherenceColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getPatientAlerts = (patientId: string) => {
    return alerts.filter((alert) => alert.patientId === patientId && !alert.isResolved)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestionare Pacienți</h1>
          <p className="text-muted-foreground">Monitorizează și gestionează pacienții din grija ta</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Adaugă Pacient
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pacienți</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">
              {patients.filter((p) => p.riskLevel === "critical").length} critici
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aderență Medie</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(patients.reduce((sum, p) => sum + p.adherenceScore, 0) / patients.length)}%
            </div>
            <p className="text-xs text-muted-foreground">+5% față de luna trecută</p>
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
              {unresolvedAlerts.filter((a) => a.type === "critical").length} critice
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mesaje Nerezolvate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.reduce((sum, p) => sum + p.unreadMessages, 0)}</div>
            <p className="text-xs text-muted-foreground">De la pacienți</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Caută pacienți după nume sau diagnostic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrează după risc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toți pacienții</SelectItem>
                <SelectItem value="critical">Risc critic</SelectItem>
                <SelectItem value="high">Risc înalt</SelectItem>
                <SelectItem value="medium">Risc mediu</SelectItem>
                <SelectItem value="low">Risc scăzut</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Mai multe filtre
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Toți Pacienții ({patients.length})</TabsTrigger>
          <TabsTrigger value="critical">
            Critici ({patients.filter((p) => p.riskLevel === "critical").length})
          </TabsTrigger>
          <TabsTrigger value="high-priority">
            Prioritate Înaltă ({patients.filter((p) => p.riskLevel === "high").length})
          </TabsTrigger>
          <TabsTrigger value="recent-contact">
            Contact Recent (
            {
              patients.filter((p) => {
                const lastContact = new Date(p.lastContact)
                const today = new Date()
                const diffTime = Math.abs(today.getTime() - lastContact.getTime())
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                return diffDays <= 1
              }).length
            }
            )
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista Completă Pacienți</CardTitle>
              <CardDescription>Toți pacienții din grija ta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPatients.map((patient) => {
                  const patientAlerts = getPatientAlerts(patient.id)
                  return (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => onSelectPatient(patient.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`/placeholder-patient-${patient.id}.jpg`} />
                          <AvatarFallback>
                            {patient.firstName[0]}
                            {patient.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">
                              {patient.firstName} {patient.lastName}
                            </h3>
                            <Badge variant={getRiskColor(patient.riskLevel)}>{getRiskLabel(patient.riskLevel)}</Badge>
                            {patientAlerts.length > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {patientAlerts.length} alertă
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {patient.diagnosis} • Stadiul {patient.stage} • {patient.age} ani
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>
                              Aderență:{" "}
                              <span className={getAdherenceColor(patient.adherenceScore)}>
                                {patient.adherenceScore}%
                              </span>
                            </span>
                            <span>Ultimul contact: {new Date(patient.lastContact).toLocaleDateString("ro-RO")}</span>
                            {patient.nextAppointment && (
                              <span>
                                Următoarea programare: {new Date(patient.nextAppointment).toLocaleDateString("ro-RO")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right text-sm">
                          <p className="font-medium">{patient.treatmentPhase}</p>
                          <p className="text-muted-foreground">{patient.primaryPhysician}</p>
                        </div>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Profil Pacient - {patient.firstName} {patient.lastName}
                                </DialogTitle>
                                <DialogDescription>
                                  Informații complete despre pacient și starea curentă
                                </DialogDescription>
                              </DialogHeader>
                              {selectedPatient && (
                                <div className="space-y-6">
                                  {/* Patient Overview */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">Informații Generale</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-3">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <p className="text-sm font-medium">Vârstă</p>
                                            <p className="text-sm">{selectedPatient.age} ani</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">Diagnostic</p>
                                            <p className="text-sm">{selectedPatient.diagnosis}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">Stadiu</p>
                                            <p className="text-sm">{selectedPatient.stage}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">Nivel Risc</p>
                                            <Badge variant={getRiskColor(selectedPatient.riskLevel)}>
                                              {getRiskLabel(selectedPatient.riskLevel)}
                                            </Badge>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">Status Curent</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-3">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <p className="text-sm font-medium">Aderență</p>
                                            <p
                                              className={`text-sm font-semibold ${getAdherenceColor(selectedPatient.adherenceScore)}`}
                                            >
                                              {selectedPatient.adherenceScore}%
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">Simptome Recente</p>
                                            <p className="text-sm">{selectedPatient.recentSymptoms}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">Mesaje Necitite</p>
                                            <p className="text-sm">{selectedPatient.unreadMessages}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">Alerte Active</p>
                                            <p className="text-sm text-red-600">{selectedPatient.activeAlerts}</p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  {/* Quick Actions */}
                                  <div className="flex gap-2">
                                    <Button className="flex-1">
                                      <Phone className="mr-2 h-4 w-4" />
                                      Contactează Pacientul
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                      <MessageSquare className="mr-2 h-4 w-4" />
                                      Trimite Mesaj
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                      <Calendar className="mr-2 h-4 w-4" />
                                      Programează
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                      <Activity className="mr-2 h-4 w-4" />
                                      Vezi Simptome
                                    </Button>
                                    <Button onClick={() => onSelectPatient(selectedPatient.id)} className="flex-1">
                                      <Eye className="mr-2 h-4 w-4" />
                                      Vezi Profil Complet
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar content for other tabs */}
        <TabsContent value="critical">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Pacienți cu Risc Critic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Pacienții cu cel mai înalt nivel de risc...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="high-priority">
          <Card>
            <CardHeader>
              <CardTitle>Pacienți Prioritate Înaltă</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Pacienții cu prioritate înaltă...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent-contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Recent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Pacienții contactați recent...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
