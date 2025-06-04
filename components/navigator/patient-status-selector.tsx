"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { type PatientStatus, PATIENT_STATUS_OPTIONS, getStatusInfo } from "@/types/patient-status"
import { PatientStatusBadge } from "./patient-status-badge"
import { useToast } from "@/hooks/use-toast"
import { Clock, Activity, Eye, CheckCircle, Pause, Check } from "lucide-react"

interface PatientStatusSelectorProps {
  currentStatus: PatientStatus
  patientName: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange: (newStatus: PatientStatus, note?: string) => void
}

const iconMap = {
  Clock,
  Activity,
  Eye,
  CheckCircle,
  Pause,
  Check,
}

export function PatientStatusSelector({
  currentStatus,
  patientName,
  open,
  onOpenChange,
  onStatusChange,
}: PatientStatusSelectorProps) {
  const [selectedStatus, setSelectedStatus] = useState<PatientStatus>(currentStatus)
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    if (selectedStatus === currentStatus && !note.trim()) {
      toast({
        title: "Nicio modificare",
        description: "Nu ai făcut nicio modificare la status.",
        variant: "default",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulăm un API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onStatusChange(selectedStatus, note.trim() || undefined)

      toast({
        title: "Status actualizat",
        description: `Statusul pacientului ${patientName} a fost actualizat cu succes.`,
      })

      onOpenChange(false)
      setNote("")
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut actualiza statusul. Încearcă din nou.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedStatusInfo = getStatusInfo(selectedStatus)
  const IconComponent = iconMap[selectedStatusInfo.icon as keyof typeof iconMap]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Actualizează Status Pacient</DialogTitle>
          <DialogDescription>
            Modifică statusul pentru <strong>{patientName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status curent */}
          <div className="space-y-2">
            <Label>Status curent</Label>
            <div className="flex items-center gap-2">
              <PatientStatusBadge status={currentStatus} />
            </div>
          </div>

          {/* Selector status nou */}
          <div className="space-y-2">
            <Label htmlFor="status">Status nou</Label>
            <Select value={selectedStatus} onValueChange={(value: PatientStatus) => setSelectedStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selectează statusul" />
              </SelectTrigger>
              <SelectContent>
                {PATIENT_STATUS_OPTIONS.map((option) => {
                  const OptionIcon = iconMap[option.icon as keyof typeof iconMap]
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        {OptionIcon && <OptionIcon className="h-4 w-4" />}
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Preview status nou */}
          {selectedStatus !== currentStatus && (
            <div className="space-y-2">
              <Label>Preview status nou</Label>
              <div className="flex items-center gap-2">
                <PatientStatusBadge status={selectedStatus} />
              </div>
            </div>
          )}

          {/* Notă opțională */}
          <div className="space-y-2">
            <Label htmlFor="note">Notă (opțional)</Label>
            <Textarea
              id="note"
              placeholder="Adaugă o notă despre schimbarea statusului..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Anulează
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Se salvează..." : "Salvează"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
