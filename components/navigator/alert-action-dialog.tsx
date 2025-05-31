"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowUp, Phone, MessageSquare, AlertTriangle } from "lucide-react"
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
  const [resolutionNote, setResolutionNote] = useState("")
  const [messageText, setMessageText] = useState("")
  const [actionType, setActionType] = useState<"resolve" | "escalate" | "call" | "message">("resolve")

  if (!alert) return null

  const handleAction = () => {
    switch (actionType) {
      case "resolve":
        if (resolutionNote.trim()) {
          onResolve(alert.id, resolutionNote)
          setResolutionNote("")
          onClose()
        }
        break
      case "escalate":
        onEscalate(alert.id)
        onClose()
        break
      case "call":
        onCall(alert.patientId)
        onClose()
        break
      case "message":
        if (messageText.trim()) {
          onMessage(alert.patientId, messageText)
          setMessageText("")
          onClose()
        }
        break
    }
  }

  const getAlertTypeColor = (type: string) => {
    switch (type) {
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

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case "critical":
        return "Critic"
      case "high":
        return "Prioritate Înaltă"
      case "medium":
        return "Prioritate Medie"
      case "low":
        return "Prioritate Scăzută"
      default:
        return type
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Acțiuni pentru Alertă
          </DialogTitle>
          <DialogDescription>
            Selectează acțiunea pe care dorești să o efectuezi pentru această alertă
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg">{alert.title}</h3>
              <Badge variant={getAlertTypeColor(alert.type)}>{getAlertTypeLabel(alert.type)}</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Pacient:</strong> {alert.patientName}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Data:</strong> {new Date(alert.timestamp).toLocaleString("ro-RO")}
            </p>
            <p className="text-sm text-gray-700">{alert.description}</p>

            {alert.relatedData && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-900 mb-1">Date suplimentare:</p>
                <div className="bg-white p-2 rounded text-xs">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(alert.relatedData, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Action Selection */}
          <div>
            <Label htmlFor="action-type" className="text-sm font-medium">
              Selectează acțiunea
            </Label>
            <Select value={actionType} onValueChange={(value: any) => setActionType(value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resolve">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Rezolvă alerta
                  </div>
                </SelectItem>
                <SelectItem value="escalate">
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-4 w-4" />
                    Escaladează la echipa medicală
                  </div>
                </SelectItem>
                <SelectItem value="call">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Sună pacientul
                  </div>
                </SelectItem>
                <SelectItem value="message">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Trimite mesaj pacientului
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action-specific inputs */}
          {actionType === "resolve" && (
            <div>
              <Label htmlFor="resolution-note" className="text-sm font-medium">
                Note de rezolvare *
              </Label>
              <Textarea
                id="resolution-note"
                placeholder="Descrie cum a fost rezolvată alerta și ce măsuri au fost luate..."
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>
          )}

          {actionType === "message" && (
            <div>
              <Label htmlFor="message-text" className="text-sm font-medium">
                Mesaj pentru pacient *
              </Label>
              <Textarea
                id="message-text"
                placeholder="Scrie mesajul pe care dorești să îl trimiți pacientului..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>
          )}

          {actionType === "escalate" && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Atenție:</strong> Escaladarea acestei alerte va notifica echipa medicală și va crește nivelul de
                prioritate. Asigură-te că este necesar acest pas.
              </p>
            </div>
          )}

          {actionType === "call" && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Informație:</strong> Vei fi redirecționat către sistemul de telefonie pentru a iniția apelul
                către pacient.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Anulează
          </Button>
          <Button
            onClick={handleAction}
            disabled={
              (actionType === "resolve" && !resolutionNote.trim()) || (actionType === "message" && !messageText.trim())
            }
          >
            {actionType === "resolve" && "Rezolvă Alerta"}
            {actionType === "escalate" && "Escaladează"}
            {actionType === "call" && "Inițiază Apel"}
            {actionType === "message" && "Trimite Mesaj"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
