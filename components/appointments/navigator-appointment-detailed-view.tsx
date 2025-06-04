"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  User,
  FileText,
  Plus,
  MessageSquare,
  History,
  Edit,
  X,
  CalendarPlus,
  Send,
  CheckCircle,
  AlertCircle,
  Users,
  Settings,
  Bell,
  Shield,
  Activity,
  BarChart3,
  Phone,
  Mail,
  Video,
} from "lucide-react"
import type { Appointment } from "@/types/patient"
import { cn } from "@/lib/utils"

interface NavigatorAppointmentDetailedViewProps {
  appointment: Appointment | null
  isOpen: boolean
  onClose: () => void
  onEdit?: (appointmentId: string) => void
  onCancel?: (appointmentId: string) => void
  onReschedule?: (appointmentId: string) => void
  onBulkAction?: (action: string, appointmentIds: string[]) => void
}

interface Requirement {
  id: string
  text: string
  completed: boolean
  assignedTo?: string
  dueDate?: string
  priority: "low" | "medium" | "high"
}

interface TeamMember {
  id: string
  name: string
  role: string
  available: boolean
}

interface PatientAlert {
  id: string
  type: "medical" | "administrative" | "behavioral"
  message: string
  severity: "low" | "medium" | "high"
  date: string
}

export function NavigatorAppointmentDetailedView({
  appointment,
  isOpen,
  onClose,
  onEdit,
  onCancel,
  onReschedule,
  onBulkAction,
}: NavigatorAppointmentDetailedViewProps) {
  const [activeTab, setActiveTab] = useState("editare-avansata")
  const [collaborativeNote, setCollaborativeNote] = useState("")
  const [newRequirement, setNewRequirement] = useState("")
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "1",
      text: "Jurnal alimentar pe ultimele 3 zile",
      completed: false,
      assignedTo: "patient",
      dueDate: "2024-01-15",
      priority: "high",
    },
    {
      id: "2",
      text: "Lista medicamentelor curente",
      completed: true,
      assignedTo: "patient",
      dueDate: "2024-01-10",
      priority: "medium",
    },
    {
      id: "3",
      text: "Rezultate analize recente",
      completed: false,
      assignedTo: "lab",
      dueDate: "2024-01-12",
      priority: "high",
    },
  ])
  const [chatMessage, setChatMessage] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([])
  const [appointmentType, setAppointmentType] = useState("consultation")
  const [reminderSettings, setReminderSettings] = useState({
    patient: true,
    caregiver: true,
    team: true,
    sms: true,
    email: true,
    days: ["1", "3", "7"],
  })

  const teamMembers: TeamMember[] = [
    { id: "1", name: "Dr. Maria Lupu", role: "Nutriționist", available: true },
    { id: "2", name: "Asist. Ana Popescu", role: "Asistent medical", available: true },
    { id: "3", name: "Dr. Ion Georgescu", role: "Oncolog", available: false },
    { id: "4", name: "Psih. Elena Dumitrescu", role: "Psiholog", available: true },
  ]

  const patientAlerts: PatientAlert[] = [
    {
      id: "1",
      type: "medical",
      message: "Pacientul a raportat efecte adverse la ultimul tratament",
      severity: "high",
      date: "2024-01-08",
    },
    {
      id: "2",
      type: "administrative",
      message: "Documentele de asigurare expiră în 30 de zile",
      severity: "medium",
      date: "2024-01-05",
    },
    {
      id: "3",
      type: "behavioral",
      message: "Aderența la tratament a scăzut cu 15% în ultima lună",
      severity: "medium",
      date: "2024-01-03",
    },
  ]

  if (!appointment) return null

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const formatTime = (timeStr: string) => {
    return timeStr
  }

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      const newReq: Requirement = {
        id: Date.now().toString(),
        text: newRequirement,
        completed: false,
        priority: "medium",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      }
      setRequirements([...requirements, newReq])
      setNewRequirement("")
    }
  }

  const toggleRequirement = (id: string) => {
    setRequirements(requirements.map((req) => (req.id === id ? { ...req, completed: !req.completed } : req)))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles([...uploadedFiles, ...files])
  }

  const handleTeamMemberToggle = (memberId: string) => {
    setSelectedTeamMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId],
    )
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">Editare Avansată Programare</DialogTitle>
                <p className="text-purple-100 mt-1">Dr. Maria Lupu • Nutriție • Navigator View</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="border-b px-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="editare-avansata" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Editare Avansată
                </TabsTrigger>
                <TabsTrigger value="echipa" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Echipa
                </TabsTrigger>
                <TabsTrigger value="alerte" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Alerte Pacient
                </TabsTrigger>
                <TabsTrigger value="comunicare" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Comunicare
                </TabsTrigger>
                <TabsTrigger value="analitica" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analitică
                </TabsTrigger>
                <TabsTrigger value="setari" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Setări
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[calc(95vh-200px)]">
              <div className="p-6 space-y-6">
                <TabsContent value="editare-avansata" className="mt-0 space-y-6">
                  {/* Patient Context & Alerts */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Context Pacient & Alerte Active
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Pacient:</span>
                            <span>Maria Ionescu (ID: #12345)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Diagnostic:</span>
                            <span>Cancer mamar - stadiul II</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Ultima vizită:</span>
                            <span>15 decembrie 2024</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Alerte Active:</Label>
                          {patientAlerts.slice(0, 2).map((alert) => (
                            <div
                              key={alert.id}
                              className={cn("p-2 rounded border text-xs", getAlertColor(alert.severity))}
                            >
                              {alert.message}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Advanced Appointment Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Detalii Programare Avansate
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="appointment-type">Tipul Programării</Label>
                          <Select value={appointmentType} onValueChange={setAppointmentType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="consultation">Consultație</SelectItem>
                              <SelectItem value="follow-up">Control</SelectItem>
                              <SelectItem value="treatment">Tratament</SelectItem>
                              <SelectItem value="emergency">Urgență</SelectItem>
                              <SelectItem value="multidisciplinary">Multidisciplinar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="duration">Durată (minute)</Label>
                          <Input type="number" defaultValue="45" min="15" max="180" step="15" />
                        </div>
                        <div>
                          <Label htmlFor="room">Sala/Cabinet</Label>
                          <Select defaultValue="cabinet-1">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cabinet-1">Cabinet 1 - Nutriție</SelectItem>
                              <SelectItem value="cabinet-2">Cabinet 2 - Oncologie</SelectItem>
                              <SelectItem value="sala-tratament">Sala Tratament</SelectItem>
                              <SelectItem value="online">Online - Video</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="preparation-time">Timp Pregătire (minute)</Label>
                          <Input type="number" defaultValue="15" min="0" max="60" />
                        </div>
                        <div>
                          <Label htmlFor="buffer-time">Timp Buffer (minute)</Label>
                          <Input type="number" defaultValue="10" min="0" max="30" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Requirements Management */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Gestionare Cerințe Avansată
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {requirements.map((req) => (
                          <div key={req.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={req.id}
                                checked={req.completed}
                                onCheckedChange={() => toggleRequirement(req.id)}
                              />
                              <div className="flex-1">
                                <Label
                                  htmlFor={req.id}
                                  className={cn("block", req.completed && "line-through text-muted-foreground")}
                                >
                                  {req.text}
                                </Label>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                  <span>Asignat: {req.assignedTo}</span>
                                  <span>•</span>
                                  <span>Termen: {req.dueDate}</span>
                                  <span>•</span>
                                  <span className={getPriorityColor(req.priority)}>Prioritate: {req.priority}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {req.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <Input
                          value={newRequirement}
                          onChange={(e) => setNewRequirement(e.target.value)}
                          placeholder="Adaugă cerință nouă..."
                          className="md:col-span-2"
                        />
                        <Select defaultValue="patient">
                          <SelectTrigger>
                            <SelectValue placeholder="Asignează la" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="patient">Pacient</SelectItem>
                            <SelectItem value="navigator">Navigator</SelectItem>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="lab">Laborator</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button onClick={handleAddRequirement} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Protocol & Guidelines */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Protocol & Ghiduri Clinice
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Protocol Aplicabil</Label>
                          <Select defaultValue="nutrition-oncology">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nutrition-oncology">Nutriție Oncologică - v2.1</SelectItem>
                              <SelectItem value="follow-up-standard">Control Standard - v1.8</SelectItem>
                              <SelectItem value="emergency-protocol">Protocol Urgență - v3.0</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Ghid Clinic</Label>
                          <Select defaultValue="esmo-guidelines">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="esmo-guidelines">ESMO Guidelines 2024</SelectItem>
                              <SelectItem value="nccn-guidelines">NCCN Guidelines v2.2024</SelectItem>
                              <SelectItem value="local-protocol">Protocol Local Spital</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="protocol-notes">Note Protocol</Label>
                        <Textarea
                          id="protocol-notes"
                          placeholder="Note specifice pentru aplicarea protocolului..."
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="echipa" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Echipa Multidisciplinară
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teamMembers.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={member.id}
                                checked={selectedTeamMembers.includes(member.id)}
                                onCheckedChange={() => handleTeamMemberToggle(member.id)}
                                disabled={!member.available}
                              />
                              <div>
                                <Label htmlFor={member.id} className="font-medium">
                                  {member.name}
                                </Label>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                              </div>
                            </div>
                            <Badge variant={member.available ? "default" : "secondary"}>
                              {member.available ? "Disponibil" : "Indisponibil"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Roluri și Responsabilități</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Responsabil Principal</Label>
                            <Select defaultValue="dr-lupu">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dr-lupu">Dr. Maria Lupu</SelectItem>
                                <SelectItem value="dr-georgescu">Dr. Ion Georgescu</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Navigator Asignat</Label>
                            <Select defaultValue="current-navigator">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="current-navigator">Navigator Curent</SelectItem>
                                <SelectItem value="backup-navigator">Navigator Backup</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Suport Tehnic</Label>
                            <Select defaultValue="asist-ana">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="asist-ana">Asist. Ana Popescu</SelectItem>
                                <SelectItem value="asist-maria">Asist. Maria Vasilescu</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="alerte" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Alerte și Avertismente Pacient
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {patientAlerts.map((alert) => (
                        <div key={alert.id} className={cn("p-4 rounded-lg border", getAlertColor(alert.severity))}>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {alert.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{alert.date}</span>
                              </div>
                              <p className="text-sm">{alert.message}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Adaugă Alertă Nouă</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Tipul Alertei</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selectează tipul" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="medical">Medical</SelectItem>
                              <SelectItem value="administrative">Administrativ</SelectItem>
                              <SelectItem value="behavioral">Comportamental</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Severitate</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selectează severitatea" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Scăzută</SelectItem>
                              <SelectItem value="medium">Medie</SelectItem>
                              <SelectItem value="high">Ridicată</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="alert-message">Mesajul Alertei</Label>
                        <Textarea id="alert-message" placeholder="Descrieți alerta..." rows={3} />
                      </div>
                      <Button>Adaugă Alertă</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="comunicare" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Canale de Comunicare
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                          <Phone className="h-6 w-6" />
                          <span>Apel Telefonic</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                          <Video className="h-6 w-6" />
                          <span>Video Call</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                          <Mail className="h-6 w-6" />
                          <span>Email</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Chat Echipă Multidisciplinară</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Chat colaborativ pentru echipa medicală - funcționalitate în dezvoltare
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Scrie un mesaj pentru echipă..."
                          className="flex-1"
                        />
                        <Button size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analitica" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Analitică și Metrici
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">85%</div>
                          <div className="text-sm text-muted-foreground">Rata de Prezență</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-green-600">12</div>
                          <div className="text-sm text-muted-foreground">Programări Finalizate</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">3</div>
                          <div className="text-sm text-muted-foreground">Reprogramări</div>
                        </div>
                      </div>
                      <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-muted-foreground">Grafice detaliate (în dezvoltare)</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="setari" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Setări Notificări
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Notificare Pacient</Label>
                          <Checkbox
                            checked={reminderSettings.patient}
                            onCheckedChange={(checked) =>
                              setReminderSettings((prev) => ({ ...prev, patient: checked as boolean }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Notificare Îngrijitor</Label>
                          <Checkbox
                            checked={reminderSettings.caregiver}
                            onCheckedChange={(checked) =>
                              setReminderSettings((prev) => ({ ...prev, caregiver: checked as boolean }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Notificare Echipă</Label>
                          <Checkbox
                            checked={reminderSettings.team}
                            onCheckedChange={(checked) =>
                              setReminderSettings((prev) => ({ ...prev, team: checked as boolean }))
                            }
                          />
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Zile Reminder</Label>
                        <div className="flex gap-2">
                          {["1", "3", "7", "14"].map((day) => (
                            <div key={day} className="flex items-center space-x-2">
                              <Checkbox
                                id={`day-${day}`}
                                checked={reminderSettings.days.includes(day)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setReminderSettings((prev) => ({
                                      ...prev,
                                      days: [...prev.days, day],
                                    }))
                                  } else {
                                    setReminderSettings((prev) => ({
                                      ...prev,
                                      days: prev.days.filter((d) => d !== day),
                                    }))
                                  }
                                }}
                              />
                              <Label htmlFor={`day-${day}`} className="text-sm">
                                {day} {day === "1" ? "zi" : "zile"}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Acțiuni Administrative</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline">
                          <CalendarPlus className="mr-2 h-4 w-4" />
                          Duplică Programarea
                        </Button>
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Generează Raport
                        </Button>
                        <Button variant="outline">
                          <Send className="mr-2 h-4 w-4" />
                          Trimite Rezumat
                        </Button>
                        <Button variant="outline">
                          <History className="mr-2 h-4 w-4" />
                          Vezi Istoric
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </ScrollArea>

            <div className="border-t p-6">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Anulează
                  </Button>
                  <Button variant="destructive" onClick={() => onCancel?.(appointment.id)}>
                    Anulează Programarea
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onReschedule?.(appointment.id)}>
                    Reprogramează
                  </Button>
                  <Button onClick={() => onEdit?.(appointment.id)}>Salvează Modificările</Button>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
