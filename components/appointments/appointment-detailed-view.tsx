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
import {
  Calendar,
  Clock,
  MapPin,
  User,
  FileText,
  Upload,
  Plus,
  MessageSquare,
  History,
  Repeat,
  Edit,
  X,
  CalendarPlus,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import type { Appointment } from "@/types/patient"
import { cn } from "@/lib/utils"

interface AppointmentDetailedViewProps {
  appointment: Appointment | null
  isOpen: boolean
  onClose: () => void
  onEdit?: (appointmentId: string) => void
  onCancel?: (appointmentId: string) => void
  onReschedule?: (appointmentId: string) => void
}

interface Requirement {
  id: string
  text: string
  completed: boolean
}

interface ChatMessage {
  id: string
  sender: string
  message: string
  timestamp: string
  type: "patient" | "navigator" | "doctor"
}

export function AppointmentDetailedView({
  appointment,
  isOpen,
  onClose,
  onEdit,
  onCancel,
  onReschedule,
}: AppointmentDetailedViewProps) {
  const [activeTab, setActiveTab] = useState("editare")
  const [collaborativeNote, setCollaborativeNote] = useState("")
  const [newRequirement, setNewRequirement] = useState("")
  const [requirements, setRequirements] = useState<Requirement[]>([
    { id: "1", text: "Jurnal alimentar pe ultimele 3 zile", completed: false },
    { id: "2", text: "Lista medicamentelor curente", completed: true },
    { id: "3", text: "Rezultate analize recente", completed: false },
  ])
  const [chatMessage, setChatMessage] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

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

  const mockChatMessages: ChatMessage[] = [
    {
      id: "1",
      sender: "Dr. Maria Lupu",
      message: "Vă rog să discutăm specific posturile programate pentru pacient, navigator și medic. (În dezvoltare)",
      timestamp: "10:30",
      type: "doctor",
    },
  ]

  const mockHistory = [
    { date: "15 mai 2025", type: "Consultație Nutriționist", status: "Finalizată" },
    { date: "20 aprilie 2025", type: "Control Nutrițional", status: "Finalizată" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden p-0">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">Programare Nutriționist</DialogTitle>
                <p className="text-blue-100 mt-1">Dr. Maria Lupu • Nutriție • Vizualizare</p>
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="editare" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Editare
                </TabsTrigger>
                <TabsTrigger value="anulare" className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Anulează Programarea
                </TabsTrigger>
                <TabsTrigger value="reprogramare" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Reprogramează
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[calc(95vh-200px)]">
              <div className="p-6 space-y-6">
                <TabsContent value="editare" className="mt-0 space-y-6">
                  {/* Detalii Cheie */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Detalii Cheie
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Data și Ora:</span>
                            <span>
                              {formatDate(appointment.date)}, {formatTime(appointment.time)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Durată:</span>
                            <span>45 minute</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Locație:</span>
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Medic:</span>
                            <span>{appointment.doctor}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Specialitate:</span>
                            <span>{appointment.specialty}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Instrucțiuni & Note */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Instrucțiuni & Note
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Notițe Programare:</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Vă rugăm să aduceți jurnalul alimentar personalizat.
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="collaborative-note">Adaugă Notă Colaborativă</Label>
                        <Textarea
                          id="collaborative-note"
                          value={collaborativeNote}
                          onChange={(e) => setCollaborativeNote(e.target.value)}
                          placeholder="Adaugă o notă care va fi vizibilă pentru toată echipa medicală..."
                          className="mt-2"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cerințe Programare (Check-list) */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Cerințe Programare (Check-list)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {requirements.map((req) => (
                          <div key={req.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={req.id}
                              checked={req.completed}
                              onCheckedChange={() => toggleRequirement(req.id)}
                            />
                            <Label
                              htmlFor={req.id}
                              className={cn("flex-1", req.completed && "line-through text-muted-foreground")}
                            >
                              {req.text}
                            </Label>
                            {req.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <Input
                          value={newRequirement}
                          onChange={(e) => setNewRequirement(e.target.value)}
                          placeholder="Adaugă cerință nouă..."
                          onKeyPress={(e) => e.key === "Enter" && handleAddRequirement()}
                        />
                        <Button onClick={handleAddRequirement} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Documente Asociate */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Documente Asociate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Nu sunt documente asociate acestei programări
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">Trageți fișierele aici sau</p>
                        <div className="space-y-2">
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                            accept=".pdf,.jpg,.png,.docx"
                          />
                          <Label htmlFor="file-upload">
                            <Button variant="outline" className="cursor-pointer" asChild>
                              <span>Încarcă Document</span>
                            </Button>
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Tipuri acceptate: PDF, JPG, PNG, DOCX (max 10MB)
                          </p>
                        </div>
                      </div>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">{file.name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Chat Colaborativ */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Chat Colaborativ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Vă rog să discutăm specific posturile programate pentru pacient, navigator și medic. (În
                          dezvoltare)
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Scrie un mesaj..."
                          className="flex-1"
                        />
                        <Button size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Istoric & Recurență */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <History className="h-5 w-5" />
                        Istoric & Recurență
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Istoric vizitelor programării anterioare similare sau repetate de programări. (În dezvoltare)
                        </p>
                        {mockHistory.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <span className="text-sm font-medium">{item.type}</span>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                            <Badge variant="outline">{item.status}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Acțiuni Calendar */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarPlus className="h-5 w-5" />
                        Acțiuni Calendar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <Button className="flex-1">
                          <CalendarPlus className="mr-2 h-4 w-4" />
                          Adaugă în Calendar
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Send className="mr-2 h-4 w-4" />
                          Trimite
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="anulare" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        Anulare Programare
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-sm text-red-800">
                          Ești sigur că vrei să anulezi această programare? Această acțiune nu poate fi anulată.
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="cancel-reason">Motivul anulării (opțional)</Label>
                        <Textarea
                          id="cancel-reason"
                          placeholder="Specifică motivul anulării..."
                          className="mt-2"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button variant="destructive" onClick={() => onCancel?.(appointment.id)}>
                          Confirmă Anularea
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab("editare")}>
                          Înapoi
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reprogramare" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Repeat className="h-5 w-5" />
                        Reprogramare
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Selectează o nouă dată și oră pentru această programare. Echipa medicală va fi notificată
                          automat.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="new-date">Nouă Dată</Label>
                          <Input type="date" id="new-date" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="new-time">Nouă Oră</Label>
                          <Input type="time" id="new-time" className="mt-2" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="reschedule-reason">Motivul reprogramării (opțional)</Label>
                        <Textarea
                          id="reschedule-reason"
                          placeholder="Specifică motivul reprogramării..."
                          className="mt-2"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button onClick={() => onReschedule?.(appointment.id)}>Confirmă Reprogramarea</Button>
                        <Button variant="outline" onClick={() => setActiveTab("editare")}>
                          Înapoi
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
