"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Activity,
  Calendar,
  FileText,
  MessageSquare,
  AlertTriangle,
  GraduationCap,
  Clock,
  ArrowLeft,
  Phone,
  Video,
  Mail,
  User,
  Heart,
  TrendingUp,
  TrendingDown,
  Minus,
  History,
} from "lucide-react"
import { useNavigatorData } from "@/hooks/useNavigatorData"
import { PatientStatusBadge } from "./patient-status-badge"
import { PatientStatusSelector } from "./patient-status-selector"
import { PatientStatusHistory } from "./patient-status-history"
import { usePatientStatus } from "@/hooks/usePatientStatus"
import { PatientNotesManager } from "./patient-notes-manager"

interface PatientDetailViewProps {
  patientId: string
  onBack: () => void
}

export function PatientDetailView({ patientId, onBack }: PatientDetailViewProps) {
  const { getPatientDetail } = useNavigatorData()
  const [activeTab, setActiveTab] = useState("overview")
  const { currentStatus, statusHistory, updateStatus } = usePatientStatus(patientId, "in-treatment")
  const [showStatusSelector, setShowStatusSelector] = useState(false)
  const [showNotesManager, setShowNotesManager] = useState(false)

  const patient = getPatientDetail(patientId)

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Pacient negăsit</h3>
          <p className="text-muted-foreground">Nu am putut găsi informațiile pentru acest pacient.</p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi
          </Button>
        </div>
      </div>
    )
  }

  const getAdherenceColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case "critical":
        return "Critic"
      case "high":
        return "Risc Înalt"
      case "medium":
        return "Risc Mediu"
      default:
        return "Risc Scăzut"
    }
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header cu informații pacient */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <Avatar className="h-16 w-16">
            <AvatarImage
              src={`/placeholder.svg?height=64&width=64&text=${patient.firstName[0]}${patient.lastName[0]}`}
            />
            <AvatarFallback>
              {patient.firstName[0]}
              {patient.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">
                {patient.firstName} {patient.lastName}
              </h2>
              <PatientStatusBadge status={currentStatus} />
              <Badge variant={getRiskBadgeVariant(patient.riskLevel)}>{getRiskLabel(patient.riskLevel)}</Badge>
            </div>

            <p className="text-muted-foreground mb-2">
              {patient.diagnosis} • Stadiul {patient.stage} • {patient.age} ani
            </p>

            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Aderență:</span>
                <span className={`ml-1 font-medium ${getAdherenceColor(patient.adherenceScore)}`}>
                  {patient.adherenceScore}%
                </span>
              </div>

              <Separator orientation="vertical" className="h-4" />

              <div>
                <span className="text-muted-foreground">Tratament:</span>
                <span className="ml-1">{patient.treatmentPhase}</span>
              </div>

              {patient.nextAppointment && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <div>
                    <span className="text-muted-foreground">Următoarea programare:</span>
                    <span className="ml-1">{new Date(patient.nextAppointment).toLocaleDateString("ro-RO")}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Acțiuni rapide */}
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Contactează</span>
          </Button>
          <Button size="sm" variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </Button>
          <Button size="sm" variant="outline">
            <Video className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Video</span>
          </Button>
          <Button size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Programare</span>
          </Button>
        </div>
      </div>

      {/* Tabs pentru diferite secțiuni */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Cronologie</span>
          </TabsTrigger>
          <TabsTrigger value="symptoms" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Simptome</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Documente</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Note</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Educație</span>
          </TabsTrigger>
          <TabsTrigger value="status" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Status</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Overview */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Informații Generale */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informații Generale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Medic Principal:</span>
                  <p className="font-medium">{patient.primaryPhysician}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Navigator:</span>
                  <p className="font-medium">{patient.navigator}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Contact Urgență:</span>
                  <p className="font-medium">{patient.emergencyContact.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.emergencyContact.relationship}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Ultimul Contact:</span>
                  <p className="font-medium">{new Date(patient.lastContact).toLocaleString("ro-RO")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Card Parametri Vitali */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Parametri Vitali
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {patient.parameters?.slice(0, 3).map((param) => (
                  <div key={param.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{param.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Normal: {param.normalRange?.min}-{param.normalRange?.max} {param.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          param.normalRange &&
                          (param.value < param.normalRange.min || param.value > param.normalRange.max)
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {param.value} {param.unit}
                      </span>
                      {getTrendIcon(param.trend)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Card Statistici Rapide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Statistici
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Aderență Tratament</span>
                  <span className={`font-bold ${getAdherenceColor(patient.adherenceScore)}`}>
                    {patient.adherenceScore}%
                  </span>
                </div>
                <Progress value={patient.adherenceScore} className="h-2" />

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Simptome Recente</span>
                  <span className="font-bold">{patient.recentSymptoms}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Mesaje Necitite</span>
                  <span className="font-bold">{patient.unreadMessages}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Alerte Active</span>
                  <span className="font-bold text-red-600">{patient.activeAlerts}</span>
                </div>
              </CardContent>
            </Card>
            {/* Card Status Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Status Pacient
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Status curent</p>
                    <PatientStatusBadge status={currentStatus} />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowStatusSelector(true)}>
                    Modifică Status
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Ultima actualizare:{" "}
                  {statusHistory[0]?.date ? new Date(statusHistory[0].date).toLocaleDateString("ro-RO") : "N/A"}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Cronologie */}
        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Cronologie Tratament</CardTitle>
            </CardHeader>
            <CardContent>
              {patient.timeline && patient.timeline.length > 0 ? (
                <div className="space-y-4">
                  {patient.timeline.map((item, index) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.status === "completed"
                              ? "bg-green-500"
                              : item.status === "scheduled"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                          }`}
                        ></div>
                        {index < patient.timeline.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{item.title}</p>
                          <Badge
                            variant={
                              item.status === "completed"
                                ? "default"
                                : item.status === "scheduled"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {item.status === "completed"
                              ? "Completat"
                              : item.status === "scheduled"
                                ? "Programat"
                                : "Anulat"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {new Date(item.date).toLocaleDateString("ro-RO")}
                        </p>
                        <p className="text-sm">{item.description}</p>
                        {item.provider && (
                          <p className="text-xs text-muted-foreground mt-1">Provider: {item.provider}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nu există evenimente în cronologie</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Simptome */}
        <TabsContent value="symptoms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Simptome Raportate</CardTitle>
            </CardHeader>
            <CardContent>
              {patient.symptoms && patient.symptoms.length > 0 ? (
                <div className="space-y-4">
                  {patient.symptoms.map((symptom) => (
                    <div key={symptom.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{symptom.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Severitate:</span>
                          <Badge
                            variant={
                              symptom.severity >= 7 ? "destructive" : symptom.severity >= 4 ? "default" : "secondary"
                            }
                          >
                            {symptom.severity}/10
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Frecvență:</span>
                          <span className="ml-2">{symptom.frequency}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Raportare:</span>
                          <span className="ml-2">{new Date(symptom.timestamp).toLocaleString("ro-RO")}</span>
                        </div>
                      </div>
                      {symptom.notes && <p className="text-sm mt-2 text-muted-foreground">{symptom.notes}</p>}
                      {symptom.triggers && symptom.triggers.length > 0 && (
                        <div className="mt-2">
                          <span className="text-sm text-muted-foreground">Factori declanșatori:</span>
                          <div className="flex gap-1 mt-1">
                            {symptom.triggers.map((trigger, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {trigger}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nu există simptome raportate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder pentru celelalte tab-uri */}
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Documente Medicale</span>
                <Button size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patient.documents && patient.documents.length > 0 ? (
                <div className="space-y-4">
                  {patient.documents.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium">{doc.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {doc.type === "lab-result"
                                ? "Rezultat Laborator"
                                : doc.type === "imaging"
                                  ? "Imagistică"
                                  : doc.type === "report"
                                    ? "Raport Medical"
                                    : doc.type === "prescription"
                                      ? "Rețetă"
                                      : "Altele"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              doc.status === "validated"
                                ? "default"
                                : doc.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {doc.status === "validated"
                              ? "Validat"
                              : doc.status === "pending"
                                ? "În așteptare"
                                : "Respins"}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Vizualizează
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Data upload:</span>
                          <p>{new Date(doc.uploadDate).toLocaleDateString("ro-RO")}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Dimensiune:</span>
                          <p>{doc.size}</p>
                        </div>
                        {doc.validatedBy && (
                          <div>
                            <span className="text-muted-foreground">Validat de:</span>
                            <p>{doc.validatedBy}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <p
                            className={
                              doc.status === "validated"
                                ? "text-green-600"
                                : doc.status === "pending"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }
                          >
                            {doc.status === "validated"
                              ? "Validat"
                              : doc.status === "pending"
                                ? "În așteptare"
                                : "Respins"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Nu există documente încărcate</p>
                  <Button onClick={() => setShowNotesManager(true)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Upload primul document
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Note Clinice</span>
                <Button size="sm" onClick={() => setShowNotesManager(true)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Adaugă Notă
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patient.notes && patient.notes.length > 0 ? (
                <div className="space-y-4">
                  {patient.notes.map((note) => (
                    <div key={note.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {note.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{note.author}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(note.timestamp).toLocaleString("ro-RO")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              note.category === "clinical"
                                ? "default"
                                : note.category === "personal"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {note.category === "clinical"
                              ? "Clinică"
                              : note.category === "personal"
                                ? "Personală"
                                : "Administrativă"}
                          </Badge>
                          {note.isPrivate && (
                            <Badge variant="outline" className="text-xs">
                              Privată
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="prose prose-sm max-w-none">
                        <p className="text-sm leading-relaxed">{note.content}</p>
                      </div>

                      <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                        <Button size="sm" variant="ghost">
                          Editează
                        </Button>
                        <Button size="sm" variant="ghost">
                          Răspunde
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Nu există note clinice</p>
                  <Button onClick={() => setShowNotesManager(true)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Adaugă prima notă
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Status Educație Pacient</span>
                <Button size="sm">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Atribuie Material
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patient.education && patient.education.length > 0 ? (
                <div className="space-y-6">
                  {/* Statistici generale */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {patient.education.filter((e) => e.status === "completed").length}
                      </div>
                      <p className="text-sm text-green-700">Completate</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {patient.education.filter((e) => e.status === "in-progress").length}
                      </div>
                      <p className="text-sm text-yellow-700">În progres</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">
                        {patient.education.filter((e) => e.status === "not-started").length}
                      </div>
                      <p className="text-sm text-gray-700">Neinițiate</p>
                    </div>
                  </div>

                  {/* Lista materialelor educaționale */}
                  <div className="space-y-4">
                    {patient.education.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                item.type === "video"
                                  ? "bg-red-100"
                                  : item.type === "article"
                                    ? "bg-blue-100"
                                    : item.type === "quiz"
                                      ? "bg-purple-100"
                                      : "bg-green-100"
                              }`}
                            >
                              {item.type === "video" ? (
                                <Video className="h-5 w-5 text-red-600" />
                              ) : item.type === "article" ? (
                                <FileText className="h-5 w-5 text-blue-600" />
                              ) : item.type === "quiz" ? (
                                <MessageSquare className="h-5 w-5 text-purple-600" />
                              ) : (
                                <GraduationCap className="h-5 w-5 text-green-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.type === "video"
                                  ? "Video educațional"
                                  : item.type === "article"
                                    ? "Articol informativ"
                                    : item.type === "quiz"
                                      ? "Test de evaluare"
                                      : "Webinar"}
                                {item.duration && ` • ${item.duration} min`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                item.status === "completed"
                                  ? "default"
                                  : item.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {item.status === "completed"
                                ? "Completat"
                                : item.status === "in-progress"
                                  ? "În progres"
                                  : "Neinițiat"}
                            </Badge>

                            {item.status === "completed" && item.score && (
                              <Badge variant="outline">Scor: {item.score}%</Badge>
                            )}
                          </div>
                        </div>

                        {/* Progress bar pentru materiale în progres */}
                        {item.status === "in-progress" && (
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progres</span>
                              <span>65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Status:</span>
                            <p
                              className={
                                item.status === "completed"
                                  ? "text-green-600"
                                  : item.status === "in-progress"
                                    ? "text-yellow-600"
                                    : "text-gray-600"
                              }
                            >
                              {item.status === "completed"
                                ? "Completat"
                                : item.status === "in-progress"
                                  ? "În progres"
                                  : "Neinițiat"}
                            </p>
                          </div>

                          {item.completedAt && (
                            <div>
                              <span className="text-muted-foreground">Completat la:</span>
                              <p>{new Date(item.completedAt).toLocaleDateString("ro-RO")}</p>
                            </div>
                          )}

                          {item.score && (
                            <div>
                              <span className="text-muted-foreground">Scor obținut:</span>
                              <p
                                className={
                                  item.score >= 80
                                    ? "text-green-600"
                                    : item.score >= 60
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }
                              >
                                {item.score}%
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                          {item.status === "not-started" && <Button size="sm">Începe</Button>}
                          {item.status === "in-progress" && <Button size="sm">Continuă</Button>}
                          {item.status === "completed" && (
                            <Button size="sm" variant="outline">
                              Revizuiește
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            Detalii
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Nu există materiale educaționale atribuite</p>
                  <Button>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Atribuie primul material
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="status" className="mt-6">
          <PatientStatusHistory history={statusHistory} />
        </TabsContent>
      </Tabs>

      {/* Quick Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-2 flex justify-center gap-2 md:hidden">
        <Button variant="outline" size="sm" className="flex-1">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Mail className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Calendar className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <AlertTriangle className="h-4 w-4" />
        </Button>
      </div>
      <PatientStatusSelector
        currentStatus={currentStatus}
        patientName={`${patient.firstName} ${patient.lastName}`}
        open={showStatusSelector}
        onOpenChange={setShowStatusSelector}
        onStatusChange={updateStatus}
      />
      {showNotesManager && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Note Private Navigator</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowNotesManager(false)}>
                ✕
              </Button>
            </div>
            <div className="p-4">
              <PatientNotesManager
                patientId={patientId}
                patientName={`${patient.firstName} ${patient.lastName}`}
                currentNavigatorId="nav-1"
                currentNavigatorName="Dr. Maria Ionescu"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
