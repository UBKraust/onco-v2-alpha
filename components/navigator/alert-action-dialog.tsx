"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertTriangle,
  Phone,
  MessageSquare,
  CheckCircle,
  ArrowUp,
  Clock,
  User,
  Calendar,
  FileText,
  Send,
} from "lucide-react"
import type { PatientAlert } from "@/types/navigator"

interface AlertActionDialogProps {
  alert: PatientAlert | null
  isOpen: boolean
  onClose: () => void
  onResolve: (alertId: string, note: string) => void
  onEscalate: (alertId: string) => void
  onCall: (patientId: string) => void
  onMessage: (patientId: string, message: string) => void
}

export function AlertActionDialog({
  alert,
  isOpen,
  onClose,
  onResolve,
  onEscalate,
  onCall,
  onMessage,
}: AlertActionDialogProps) {
  const [activeTab, setActiveTab] = useState<"details" | "resolve" | "message" | "escalate">("details")
  const [resolutionNote, setResolutionNote] = useState("")
  const [messageText, setMessageText] = useState("")
  const [escalationReason, setEscalationReason] = useState("")
  const [escalationTo, setEscalationTo] = useState("")

  if (!alert) return null

  const handleResolve = () => {
    if (resolutionNote.trim()) {
      onResolve(alert.id, resolutionNote)
      setResolutionNote("")
      onClose()
    }
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onMessage(alert.patientId, messageText)
      setMessageText("")
      onClose()
    }
  }

  const handleEscalate = () => {
    onEscalate(alert.id)
    setEscalationReason("")
    setEscalationTo("")
    onClose()
  }

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medical":
        return <AlertTriangle className="h-4 w-4" />
      case "appointment":
        return <Calendar className="h-4 w-4" />
      case "medication":
        return <FileText className="h-4 w-4" />
      case "communication":
        return <MessageSquare className="h-4 w-4" />
      case "system":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 text-black dark:text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getCategoryIcon(alert.category)}
            Detalii Alertă
          </DialogTitle>
          <DialogDescription>Gestionează alerta pentru pacientul {alert.patientName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert Overview */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{alert.title}</h3>
              <div className="flex items-center gap-2">
                <Badge className={getAlertTypeColor(alert.type)}>{alert.type.toUpperCase()}</Badge>
                {alert.escalationLevel > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    Nivel {alert.escalationLevel}
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{alert.patientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(alert.timestamp).toLocaleString("ro-RO")}</span>
              </div>
            </div>

            <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">{alert.description}</p>

            {alert.relatedData && (
              <div className="mt-3">
                <Label className="text-xs font-medium text-muted-foreground">Date suplimentare:</Label>
                <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(alert.relatedData, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Action Tabs */}
          <div className="flex gap-2 border-b">
            <Button
              variant={activeTab === "details" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("details")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Detalii
            </Button>
            <Button
              variant={activeTab === "resolve" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("resolve")}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Rezolvă
            </Button>
            <Button
              variant={activeTab === "message" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("message")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Mesaj
            </Button>
            <Button
              variant={activeTab === "escalate" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("escalate")}
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Escaladează
            </Button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {activeTab === "details" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">ID Alertă</Label>
                    <p className="text-sm text-muted-foreground">{alert.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Categorie</Label>
                    <p className="text-sm text-muted-foreground capitalize">{alert.category}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Asignat către</Label>
                    <p className="text-sm text-muted-foreground">{alert.assignedTo}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="flex gap-2">
                      <Badge variant={alert.isRead ? "secondary" : "default"}>
                        {alert.isRead ? "Citită" : "Necitită"}
                      </Badge>
                      <Badge variant={alert.isResolved ? "secondary" : "destructive"}>
                        {alert.isResolved ? "Rezolvată" : "Activă"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {alert.resolutionNote && (
                  <div>
                    <Label className="text-sm font-medium">Notă rezolvare</Label>
                    <p className="text-sm text-muted-foreground mt-1 p-2 bg-green-50 rounded">{alert.resolutionNote}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "resolve" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resolution-note">Notă rezolvare *</Label>
                  <Textarea
                    id="resolution-note"
                    placeholder="Descrie cum a fost rezolvată alerta și ce acțiuni au fost întreprinse..."
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    rows={4}
                    className="mt-1 bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
                <Button onClick={handleResolve} disabled={!resolutionNote.trim()} className="w-full">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Marchează ca Rezolvată
                </Button>
              </div>
            )}

            {activeTab === "message" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="message-text">Mesaj pentru pacient *</Label>
                  <Textarea
                    id="message-text"
                    placeholder="Scrie mesajul pentru pacient..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    rows={4}
                    className="mt-1 bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSendMessage} disabled={!messageText.trim()} className="flex-1">
                    <Send className="mr-2 h-4 w-4" />
                    Trimite Mesaj
                  </Button>
                  <Button variant="outline" onClick={() => onCall(alert.patientId)}>
                    <Phone className="mr-2 h-4 w-4" />
                    Sună
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "escalate" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="escalation-to">Escaladează către</Label>
                  <Select value={escalationTo} onValueChange={setEscalationTo}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selectează destinatarul" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="senior-navigator">Navigator Senior</SelectItem>
                      <SelectItem value="medical-team">Echipa Medicală</SelectItem>
                      <SelectItem value="emergency">Urgențe</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="escalation-reason">Motiv escaladare</Label>
                  <Textarea
                    id="escalation-reason"
                    placeholder="Explică de ce această alertă necesită escaladare..."
                    value={escalationReason}
                    onChange={(e) => setEscalationReason(e.target.value)}
                    rows={3}
                    className="mt-1 bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
                <Button onClick={handleEscalate} variant="destructive" className="w-full">
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Escaladează Alerta
                </Button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Închide
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
