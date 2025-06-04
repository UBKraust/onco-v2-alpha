"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  MessageSquare,
  Navigation,
  Stethoscope,
  Building,
} from "lucide-react"
import type { Appointment } from "@/types/patient"
import { cn } from "@/lib/utils"

interface AppointmentDetailsModalProps {
  appointment: Appointment | null
  isOpen: boolean
  onClose: () => void
  onReschedule?: (appointmentId: string) => void
  onCancel?: (appointmentId: string) => void
  onAddNotes?: (appointmentId: string, notes: string) => void
}

export function AppointmentDetailsModal({
  appointment,
  isOpen,
  onClose,
  onReschedule,
  onCancel,
  onAddNotes,
}: AppointmentDetailsModalProps) {
  const [notes, setNotes] = useState("")
  const [isEditingNotes, setIsEditingNotes] = useState(false)

  if (!appointment) return null

  const statusConfig = {
    Confirmat: {
      icon: CheckCircle,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    "În așteptare": {
      icon: Clock,
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
    },
    Anulat: {
      icon: XCircle,
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      bgColor: "bg-red-50 dark:bg-red-950",
    },
    Finalizat: {
      icon: CheckCircle,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
  }

  const typeConfig = {
    control: { label: "Control Medical", color: "bg-blue-100 text-blue-800" },
    tratament: { label: "Tratament", color: "bg-red-100 text-red-800" },
    consultatie: { label: "Consultație", color: "bg-green-100 text-green-800" },
    test: { label: "Analize/Teste", color: "bg-purple-100 text-purple-800" },
    urgenta: { label: "Urgență", color: "bg-orange-100 text-orange-800" },
    default: { label: "Programare", color: "bg-gray-100 text-gray-800" },
  }

  const priorityConfig = {
    low: { label: "Scăzută", color: "bg-blue-100 text-blue-800" },
    normal: { label: "Normală", color: "bg-green-100 text-green-800" },
    high: { label: "Ridicată", color: "bg-yellow-100 text-yellow-800" },
    urgent: { label: "Urgentă", color: "bg-red-100 text-red-800" },
  }

  const StatusIcon = statusConfig[appointment.status].icon
  const currentStatus = statusConfig[appointment.status]
  const currentType = typeConfig[appointment.type]
  const currentPriority = appointment.priority ? priorityConfig[appointment.priority] : null

  const handleSaveNotes = () => {
    if (onAddNotes) {
      onAddNotes(appointment.id, notes)
    }
    setIsEditingNotes(false)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ro-RO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isUpcoming = new Date(appointment.date) > new Date()
  const canModify = appointment.status === "Confirmat" || appointment.status === "În așteptare"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-bold">{appointment.title}</DialogTitle>
              <DialogDescription className="text-base">
                Detalii complete despre programarea ta medicală
              </DialogDescription>
            </div>
            <Badge className={currentStatus.color}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {appointment.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Banner */}
          <Card className={cn("border-l-4", currentStatus.bgColor)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <StatusIcon className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Status: {appointment.status}</p>
                    <p className="text-sm text-muted-foreground">
                      {isUpcoming ? "Programare viitoare" : "Programare trecută"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge className={currentType.color}>{currentType.label}</Badge>
                  {currentPriority && (
                    <Badge className={currentPriority.color}>Prioritate: {currentPriority.label}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Data și Ora
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formatDate(appointment.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{appointment.time}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <User className="mr-2 h-5 w-5" />
                  Medic
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{appointment.doctor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{appointment.specialty}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MapPin className="mr-2 h-5 w-5" />
                Locația
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-medium">{appointment.location}</span>
                <Button variant="outline" size="sm">
                  <Navigation className="mr-2 h-4 w-4" />
                  Navigare
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          {appointment.description && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Descriere
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{appointment.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Notițe
                </div>
                {!isEditingNotes && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditingNotes(true)
                      setNotes(appointment.notes || "")
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editează
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditingNotes ? (
                <div className="space-y-3">
                  <Label htmlFor="notes">Adaugă sau editează notițe:</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Adaugă notițe despre această programare..."
                    rows={4}
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveNotes} size="sm">
                      Salvează
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditingNotes(false)} size="sm">
                      Anulează
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  {appointment.notes ? (
                    <p className="text-sm leading-relaxed">{appointment.notes}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Nu există notițe pentru această programare.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {canModify && isUpcoming && (
              <>
                <Button onClick={() => onReschedule?.(appointment.id)} className="flex-1" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Reprogramează
                </Button>
                <Button onClick={() => onCancel?.(appointment.id)} className="flex-1" variant="outline">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Anulează
                </Button>
              </>
            )}
            <Button onClick={onClose} className="flex-1" variant="default">
              Închide
            </Button>
          </div>

          {/* Contact Information */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-sm">Informații de Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>Pentru modificări: 0800-123-456</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>programari@oncolink.ro</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
