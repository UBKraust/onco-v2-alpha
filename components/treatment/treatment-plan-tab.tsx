"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Activity,
  Calendar,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle,
  Pause,
  Play,
  Edit,
  Filter,
  Eye,
  FileText,
  Pill,
  TrendingUp,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { TreatmentCycle } from "@/types/treatment"

interface TreatmentPlanTabProps {
  patientId: string
  onAddAppointmentToCycle?: (cycleId: string) => void
  onCreateNewCycle?: () => void
  onFilterCalendarByCycle?: (cycleId: string) => void
}

// Mock data pentru cicluri de tratament
const mockTreatmentCycles: TreatmentCycle[] = [
  {
    id: "cycle-1",
    cycleNumber: 1,
    totalCycles: 6,
    treatmentType: "Chimioterapie",
    protocol: "R-CHOP",
    startDate: "2024-11-01",
    endDate: "2024-11-21",
    status: "completed",
    progress: 100,
    appointments: [
      {
        id: "appt-001",
        title: "Administrare Chimioterapie - Ziua 1",
        date: "2024-11-01",
        time: "09:00",
        type: "treatment",
        status: "completed",
        location: "Sala Tratament 1",
        doctor: "Dr. Maria Popescu",
      },
      {
        id: "appt-002",
        title: "Control Post-Chimio",
        date: "2024-11-03",
        time: "10:30",
        type: "consultation",
        status: "completed",
        location: "Cabinet 2",
        doctor: "Dr. Maria Popescu",
      },
      {
        id: "appt-003",
        title: "Analize Control",
        date: "2024-11-15",
        time: "08:00",
        type: "test",
        status: "completed",
        location: "Laborator",
        doctor: "Lab. Centrală",
      },
    ],
    sideEffects: [
      {
        id: "se-1",
        date: "2024-11-02",
        symptom: "Greață ușoară",
        severity: "mild",
        duration: "2 ore",
        notes: "Ameliorată cu antiemetice",
        reportedBy: "patient",
      },
      {
        id: "se-2",
        date: "2024-11-04",
        symptom: "Oboseală",
        severity: "moderate",
        duration: "3 zile",
        notes: "Îmbunătățire progresivă",
        reportedBy: "navigator",
      },
    ],
    notes: "Ciclu tolerat bine. Pacientul a răspuns pozitiv la tratament.",
    medications: ["Rituximab", "Cyclophosphamide", "Doxorubicin", "Vincristine", "Prednisolone"],
  },
  {
    id: "cycle-2",
    cycleNumber: 2,
    totalCycles: 6,
    treatmentType: "Chimioterapie",
    protocol: "R-CHOP",
    startDate: "2024-11-22",
    endDate: "2024-12-12",
    status: "in-progress",
    progress: 65,
    appointments: [
      {
        id: "appt-004",
        title: "Administrare Chimioterapie - Ziua 1",
        date: "2024-11-22",
        time: "09:00",
        type: "treatment",
        status: "completed",
        location: "Sala Tratament 1",
        doctor: "Dr. Maria Popescu",
      },
      {
        id: "appt-005",
        title: "Control Post-Chimio",
        date: "2024-11-24",
        time: "10:30",
        type: "consultation",
        status: "completed",
        location: "Cabinet 2",
        doctor: "Dr. Maria Popescu",
      },
      {
        id: "appt-006",
        title: "Analize Control",
        date: "2024-12-06",
        time: "08:00",
        type: "test",
        status: "scheduled",
        location: "Laborator",
        doctor: "Lab. Centrală",
      },
    ],
    sideEffects: [
      {
        id: "se-3",
        date: "2024-11-23",
        symptom: "Greață moderată",
        severity: "moderate",
        duration: "4 ore",
        notes: "Necesită ajustare antiemetice",
        reportedBy: "patient",
      },
    ],
    notes: "Progres bun. Efecte adverse ușor mai pronunțate decât ciclul anterior.",
    medications: ["Rituximab", "Cyclophosphamide", "Doxorubicin", "Vincristine", "Prednisolone"],
  },
  {
    id: "cycle-3",
    cycleNumber: 3,
    totalCycles: 6,
    treatmentType: "Chimioterapie",
    protocol: "R-CHOP",
    startDate: "2024-12-13",
    endDate: "2025-01-02",
    status: "scheduled",
    progress: 0,
    appointments: [
      {
        id: "appt-007",
        title: "Analize Pre-Chimio",
        date: "2024-12-11",
        time: "08:00",
        type: "test",
        status: "scheduled",
        location: "Laborator",
        doctor: "Lab. Centrală",
      },
      {
        id: "appt-008",
        title: "Administrare Chimioterapie - Ziua 1",
        date: "2024-12-13",
        time: "09:00",
        type: "treatment",
        status: "scheduled",
        location: "Sala Tratament 1",
        doctor: "Dr. Maria Popescu",
      },
    ],
    sideEffects: [],
    notes: "Ciclu programat. Pacientul pregătit pentru continuarea tratamentului.",
    medications: ["Rituximab", "Cyclophosphamide", "Doxorubicin", "Vincristine", "Prednisolone"],
  },
]

export function TreatmentPlanTab({
  patientId,
  onAddAppointmentToCycle,
  onCreateNewCycle,
  onFilterCalendarByCycle,
}: TreatmentPlanTabProps) {
  const [selectedCycle, setSelectedCycle] = useState<TreatmentCycle | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCycleDetails, setShowCycleDetails] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "postponed":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Play className="h-4 w-4" />
      case "scheduled":
        return <Clock className="h-4 w-4" />
      case "postponed":
        return <Pause className="h-4 w-4" />
      case "cancelled":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completat"
      case "in-progress":
        return "În derulare"
      case "scheduled":
        return "Programat"
      case "postponed":
        return "Amânat"
      case "cancelled":
        return "Anulat"
      default:
        return "Necunoscut"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "text-green-600"
      case "moderate":
        return "text-yellow-600"
      case "severe":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredCycles = mockTreatmentCycles.filter((cycle) => {
    const matchesStatus = filterStatus === "all" || cycle.status === filterStatus
    const matchesSearch =
      searchTerm === "" ||
      cycle.treatmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cycle.protocol.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleCycleClick = (cycle: TreatmentCycle) => {
    setSelectedCycle(cycle)
    setShowCycleDetails(true)
  }

  const handleFilterCalendar = (cycleId: string) => {
    onFilterCalendarByCycle?.(cycleId)
  }

  return (
    <div className="space-y-6">
      {/* Header cu statistici și acțiuni */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Plan de Tratament</h2>
          <p className="text-muted-foreground">Monitorizare cicluri și progres tratament</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCreateNewCycle}>
            <Plus className="mr-2 h-4 w-4" />
            Ciclu Nou
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Raport Progres
          </Button>
        </div>
      </div>

      {/* Statistici rapide */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cicluri</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completate</p>
                <p className="text-2xl font-bold text-green-600">1</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">În derulare</p>
                <p className="text-2xl font-bold text-blue-600">1</p>
              </div>
              <Play className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Programate</p>
                <p className="text-2xl font-bold text-yellow-600">4</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtre și căutare */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Căutare</Label>
              <Input
                id="search"
                placeholder="Căutare după tip tratament sau protocol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="status-filter">Filtrare după status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate statusurile</SelectItem>
                  <SelectItem value="completed">Completat</SelectItem>
                  <SelectItem value="in-progress">În derulare</SelectItem>
                  <SelectItem value="scheduled">Programat</SelectItem>
                  <SelectItem value="postponed">Amânat</SelectItem>
                  <SelectItem value="cancelled">Anulat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista cicluri */}
      <div className="space-y-4">
        {filteredCycles.map((cycle) => (
          <Card key={cycle.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Informații principale ciclu */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">
                      {cycle.treatmentType} - Ciclul {cycle.cycleNumber} din {cycle.totalCycles}
                    </h3>
                    <Badge variant="outline" className={cn("border", getStatusColor(cycle.status))}>
                      {getStatusIcon(cycle.status)}
                      <span className="ml-1">{getStatusText(cycle.status)}</span>
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Pill className="h-4 w-4" />
                      Protocol: {cycle.protocol}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(cycle.startDate).toLocaleDateString("ro-RO")} -{" "}
                      {new Date(cycle.endDate).toLocaleDateString("ro-RO")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {cycle.appointments.length} programări
                    </span>
                  </div>

                  {/* Bara de progres */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progres ciclu</span>
                      <span className="font-medium">{cycle.progress}%</span>
                    </div>
                    <Progress value={cycle.progress} className="h-2" />
                  </div>

                  {/* Efecte adverse (dacă există) */}
                  {cycle.sideEffects.length > 0 && (
                    <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-orange-800">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">
                          {cycle.sideEffects.length} efect{cycle.sideEffects.length > 1 ? "e" : ""} advers
                          {cycle.sideEffects.length > 1 ? "e" : ""} raportate
                        </span>
                      </div>
                      <div className="mt-2 space-y-1">
                        {cycle.sideEffects.slice(0, 2).map((effect) => (
                          <div key={effect.id} className="text-xs text-orange-700">
                            • {effect.symptom} (
                            {effect.severity === "mild" ? "ușor" : effect.severity === "moderate" ? "moderat" : "sever"}
                            )
                          </div>
                        ))}
                        {cycle.sideEffects.length > 2 && (
                          <div className="text-xs text-orange-600">+{cycle.sideEffects.length - 2} mai multe</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Acțiuni */}
                <div className="flex flex-col gap-2 lg:w-48">
                  <Button variant="outline" size="sm" onClick={() => handleCycleClick(cycle)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Vezi Detalii
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddAppointmentToCycle?.(cycle.id)}
                    disabled={cycle.status === "completed" || cycle.status === "cancelled"}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adaugă Programare
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleFilterCalendar(cycle.id)}>
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrează Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog detalii ciclu */}
      <Dialog open={showCycleDetails} onOpenChange={setShowCycleDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              {selectedCycle?.treatmentType} - Ciclul {selectedCycle?.cycleNumber} din {selectedCycle?.totalCycles}
            </DialogTitle>
            <DialogDescription>
              Protocol {selectedCycle?.protocol} • {selectedCycle && getStatusText(selectedCycle.status)}
            </DialogDescription>
          </DialogHeader>

          {selectedCycle && (
            <Tabs defaultValue="overview" className="h-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Prezentare Generală</TabsTrigger>
                <TabsTrigger value="appointments">Programări</TabsTrigger>
                <TabsTrigger value="side-effects">Efecte Adverse</TabsTrigger>
                <TabsTrigger value="medications">Medicație</TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[60vh] mt-4">
                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Progres Ciclu
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Data început</Label>
                            <p className="text-sm font-medium">
                              {new Date(selectedCycle.startDate).toLocaleDateString("ro-RO")}
                            </p>
                          </div>
                          <div>
                            <Label>Data sfârșit</Label>
                            <p className="text-sm font-medium">
                              {new Date(selectedCycle.endDate).toLocaleDateString("ro-RO")}
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label>Progres</Label>
                            <span className="text-sm font-medium">{selectedCycle.progress}%</span>
                          </div>
                          <Progress value={selectedCycle.progress} className="h-3" />
                        </div>
                        <div>
                          <Label>Note</Label>
                          <Textarea value={selectedCycle.notes} readOnly rows={3} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="appointments" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Programări Asociate</h3>
                    <Button size="sm" onClick={() => onAddAppointmentToCycle?.(selectedCycle.id)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Adaugă Programare
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {selectedCycle.appointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{appointment.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span>{new Date(appointment.date).toLocaleDateString("ro-RO")}</span>
                                <span>{appointment.time}</span>
                                <span>{appointment.location}</span>
                                <span>{appointment.doctor}</span>
                              </div>
                            </div>
                            <Badge variant={appointment.status === "completed" ? "default" : "secondary"}>
                              {appointment.status === "completed"
                                ? "Completat"
                                : appointment.status === "scheduled"
                                  ? "Programat"
                                  : "În așteptare"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="side-effects" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Efecte Adverse</h3>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Adaugă Efect Advers
                    </Button>
                  </div>
                  {selectedCycle.sideEffects.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCycle.sideEffects.map((effect) => (
                        <Card key={effect.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium">{effect.symptom}</h4>
                                  <Badge variant="outline" className={getSeverityColor(effect.severity)}>
                                    {effect.severity === "mild"
                                      ? "Ușor"
                                      : effect.severity === "moderate"
                                        ? "Moderat"
                                        : "Sever"}
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground space-y-1">
                                  <p>Data: {new Date(effect.date).toLocaleDateString("ro-RO")}</p>
                                  <p>Durată: {effect.duration}</p>
                                  <p>Raportat de: {effect.reportedBy === "patient" ? "Pacient" : "Navigator"}</p>
                                  {effect.notes && <p>Note: {effect.notes}</p>}
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Niciun efect advers raportat</h3>
                        <p className="text-muted-foreground">Ciclul a fost tolerat bine până acum.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="medications" className="space-y-4">
                  <h3 className="text-lg font-semibold">Medicație Ciclul Curent</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedCycle.medications.map((medication, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Pill className="h-5 w-5 text-blue-500" />
                            <span className="font-medium">{medication}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
