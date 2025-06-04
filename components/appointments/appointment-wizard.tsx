"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, Bell, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type {
  AppointmentType,
  MedicalTeamMember,
  AppointmentRequirement,
  AppointmentRequest,
} from "@/types/appointment"

// Mock data pentru tipurile de programări
const appointmentTypes: AppointmentType[] = [
  {
    id: "consultation",
    name: "Consultație Oncologie",
    duration: 45,
    category: "consultation",
    requiresDocuments: true,
    requiredDocuments: ["analize-recente", "imagistica"],
    description: "Consultație de specialitate oncologie",
  },
  {
    id: "chemotherapy",
    name: "Ședință Chimioterapie",
    duration: 180,
    category: "treatment",
    requiresDocuments: true,
    requiredDocuments: ["analize-pre-chimio", "consimtamant-tratament"],
    description: "Administrare chimioterapie",
  },
  {
    id: "radiotherapy",
    name: "Ședință Radioterapie",
    duration: 30,
    category: "treatment",
    requiresDocuments: false,
    description: "Ședință de radioterapie",
  },
  {
    id: "follow-up",
    name: "Control Post-Tratament",
    duration: 30,
    category: "follow-up",
    requiresDocuments: true,
    requiredDocuments: ["analize-control"],
    description: "Control de urmărire",
  },
  {
    id: "emergency",
    name: "Consultație Urgentă",
    duration: 60,
    category: "emergency",
    requiresDocuments: false,
    description: "Consultație de urgență",
  },
]

// Mock data pentru echipa medicală
const medicalTeam: MedicalTeamMember[] = [
  {
    id: "dr-popescu",
    name: "Dr. Maria Popescu",
    title: "Medic Primar",
    specialty: "Oncologie Medicală",
    clinic: "Clinica Oncologie",
    availability: {
      monday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      wednesday: ["09:00", "10:00", "11:00"],
      thursday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      friday: ["09:00", "10:00", "11:00"],
    },
    isActive: true,
  },
  {
    id: "dr-ionescu",
    name: "Dr. Alexandru Ionescu",
    title: "Medic Specialist",
    specialty: "Chirurgie Oncologică",
    clinic: "Clinica Chirurgie",
    availability: {
      monday: ["08:00", "09:00", "10:00", "11:00"],
      wednesday: ["08:00", "09:00", "10:00", "11:00"],
      friday: ["08:00", "09:00", "10:00", "11:00"],
    },
    isActive: true,
  },
  {
    id: "dr-vasilescu",
    name: "Dr. Elena Vasilescu",
    title: "Medic Primar",
    specialty: "Radioterapie",
    clinic: "Centrul de Radioterapie",
    availability: {
      monday: ["13:00", "14:00", "15:00", "16:00"],
      tuesday: ["13:00", "14:00", "15:00", "16:00"],
      wednesday: ["13:00", "14:00", "15:00", "16:00"],
      thursday: ["13:00", "14:00", "15:00", "16:00"],
      friday: ["13:00", "14:00", "15:00", "16:00"],
    },
    isActive: true,
  },
]

// Mock data pentru cerințele de documente
const documentRequirements: { [key: string]: AppointmentRequirement } = {
  "analize-recente": {
    id: "analize-recente",
    name: "Analize Recente",
    description: "Analize de sânge nu mai vechi de 7 zile",
    isRequired: true,
    documentType: "pdf",
  },
  imagistica: {
    id: "imagistica",
    name: "Imagistică",
    description: "CT/RMN/Ecografie relevante",
    isRequired: true,
    documentType: "any",
  },
  "analize-pre-chimio": {
    id: "analize-pre-chimio",
    name: "Analize Pre-Chimioterapie",
    description: "Set complet analize pentru chimioterapie",
    isRequired: true,
    documentType: "pdf",
  },
  "consimtamant-tratament": {
    id: "consimtamant-tratament",
    name: "Consimțământ Tratament",
    description: "Consimțământ informat pentru tratament",
    isRequired: true,
    documentType: "pdf",
  },
  "analize-control": {
    id: "analize-control",
    name: "Analize Control",
    description: "Analize pentru controlul post-tratament",
    isRequired: true,
    documentType: "pdf",
  },
}

interface AppointmentWizardProps {
  patientId?: string
  patientName?: string
  onAppointmentCreated?: (appointment: AppointmentRequest) => void
}

export function AppointmentWizard({ patientId, patientName, onAppointmentCreated }: AppointmentWizardProps) {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [selectedPatient, setSelectedPatient] = useState(patientId || "")
  const [appointmentType, setAppointmentType] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [priority, setPriority] = useState<"low" | "normal" | "high" | "urgent">("normal")
  const [notes, setNotes] = useState("")
  const [notifyPatient, setNotifyPatient] = useState(true)
  const [notifyCaregiver, setNotifyCaregiver] = useState(true)
  const [notifySMS, setNotifySMS] = useState(true)
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [reminderDays, setReminderDays] = useState<number[]>([1, 3])

  const selectedAppointmentType = appointmentTypes.find((type) => type.id === appointmentType)
  const selectedDoctorData = medicalTeam.find((doctor) => doctor.id === selectedDoctor)
  const requiredDocuments = selectedAppointmentType?.requiredDocuments || []

  const steps = [
    { id: 1, title: "Tip Programare", icon: Calendar },
    { id: 2, title: "Echipa Medicală", icon: Clock },
    { id: 3, title: "Data & Ora", icon: Calendar },
    { id: 4, title: "Documente", icon: FileText },
    { id: 5, title: "Notificări", icon: Bell },
  ]

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return appointmentType !== ""
      case 2:
        return selectedDoctor !== ""
      case 3:
        return date !== "" && time !== ""
      case 4:
        return true // Documents are optional for validation
      case 5:
        return true // Notifications have defaults
      default:
        return false
    }
  }

  const getAvailableHours = () => {
    if (!selectedDoctorData || !date) return []

    const selectedDate = new Date(date)
    const dayName = selectedDate.toLocaleDateString("en-US", {
      weekday: "lowercase",
    }) as keyof typeof selectedDoctorData.availability

    // Verificăm dacă availability există și dacă ziua există în availability
    if (!selectedDoctorData.availability || !selectedDoctorData.availability[dayName]) {
      return []
    }

    return selectedDoctorData.availability[dayName] || []
  }

  const handleNext = () => {
    if (currentStep < 5 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!isStepValid(currentStep)) return

    setIsSubmitting(true)

    try {
      const appointmentRequest: AppointmentRequest = {
        patientId: selectedPatient,
        appointmentTypeId: appointmentType,
        medicalTeamMemberId: selectedDoctor,
        date,
        time,
        priority,
        notes,
        requiredDocuments,
        notificationPreferences: {
          patient: notifyPatient,
          caregiver: notifyCaregiver,
          sms: notifySMS,
          email: notifyEmail,
          reminderDays,
        },
      }

      // Simulăm un apel API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Programare creată cu succes!",
        description: `Programarea pentru ${patientName || "pacient"} a fost înregistrată.`,
      })

      onAppointmentCreated?.(appointmentRequest)
      setOpen(false)

      // Reset form
      setCurrentStep(1)
      setAppointmentType("")
      setSelectedDoctor("")
      setDate("")
      setTime("")
      setPriority("normal")
      setNotes("")
    } catch (error) {
      toast({
        title: "Eroare la crearea programării",
        description: "A apărut o eroare. Vă rugăm să încercați din nou.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Selectează tipul programării</Label>
              <p className="text-sm text-muted-foreground mb-4">Alege tipul de consultație sau tratament necesar</p>
            </div>
            <RadioGroup value={appointmentType} onValueChange={setAppointmentType}>
              {appointmentTypes.map((type) => (
                <div key={type.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={type.id} className="font-medium cursor-pointer">
                      {type.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{type.duration} min</Badge>
                      {type.requiresDocuments && (
                        <Badge variant="secondary">
                          <FileText className="w-3 h-3 mr-1" />
                          Documente necesare
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Selectează medicul</Label>
              <p className="text-sm text-muted-foreground mb-4">Alege medicul specialist pentru această programare</p>
            </div>
            <RadioGroup value={selectedDoctor} onValueChange={setSelectedDoctor}>
              {medicalTeam
                .filter((doctor) => doctor.isActive)
                .map((doctor) => (
                  <div key={doctor.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value={doctor.id} id={doctor.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={doctor.id} className="font-medium cursor-pointer">
                        {doctor.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{doctor.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{doctor.specialty}</Badge>
                        <Badge variant="secondary">{doctor.clinic}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
            </RadioGroup>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Selectează data și ora</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Alege o dată și oră disponibilă pentru {selectedDoctorData?.name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <Label htmlFor="time">Ora</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează ora" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableHours().length > 0 ? (
                      getAvailableHours().map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        Nu sunt ore disponibile
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Prioritate</Label>
              <RadioGroup
                value={priority}
                onValueChange={(value: any) => setPriority(value)}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="text-sm">
                    Scăzută
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="text-sm">
                    Normală
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="text-sm">
                    Ridicată
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="text-sm">
                    Urgentă
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="notes">Note suplimentare</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Adaugă note sau instrucțiuni speciale..."
                className="mt-2"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Documente necesare</Label>
              <p className="text-sm text-muted-foreground mb-4">
                {requiredDocuments.length > 0
                  ? "Următoarele documente sunt necesare pentru această programare:"
                  : "Nu sunt necesare documente speciale pentru această programare."}
              </p>
            </div>

            {requiredDocuments.length > 0 && (
              <div className="space-y-3">
                {requiredDocuments.map((docId) => {
                  const requirement = documentRequirements[docId]
                  if (!requirement) return null

                  return (
                    <Card key={docId}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{requirement.name}</CardTitle>
                          {requirement.isRequired && (
                            <Badge variant="destructive" className="text-xs">
                              Obligatoriu
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-xs">{requirement.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  )
                })}

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-2">
                    <FileText className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 dark:text-blue-100">Notificare automată</p>
                      <p className="text-blue-700 dark:text-blue-200">
                        Pacientul va primi automat o notificare cu lista documentelor necesare și instrucțiunile de
                        upload.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Setări notificări</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Configurează cum și când să fie notificați pacientul și aparținătorii
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Cine să fie notificat</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-patient" checked={notifyPatient} onCheckedChange={setNotifyPatient} />
                    <Label htmlFor="notify-patient" className="text-sm">
                      Pacientul
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-caregiver" checked={notifyCaregiver} onCheckedChange={setNotifyCaregiver} />
                    <Label htmlFor="notify-caregiver" className="text-sm">
                      Aparținătorul/Însoțitorul
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Modalități de notificare</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-email" checked={notifyEmail} onCheckedChange={setNotifyEmail} />
                    <Label htmlFor="notify-email" className="text-sm">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-sms" checked={notifySMS} onCheckedChange={setNotifySMS} />
                    <Label htmlFor="notify-sms" className="text-sm">
                      SMS
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Reminder-e automate</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Selectează cu câte zile înainte să fie trimise reminder-ele
                </p>
                <div className="flex space-x-2">
                  {[1, 3, 7].map((days) => (
                    <div key={days} className="flex items-center space-x-2">
                      <Checkbox
                        id={`reminder-${days}`}
                        checked={reminderDays.includes(days)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setReminderDays([...reminderDays, days])
                          } else {
                            setReminderDays(reminderDays.filter((d) => d !== days))
                          }
                        }}
                      />
                      <Label htmlFor={`reminder-${days}`} className="text-sm">
                        {days} {days === 1 ? "zi" : "zile"}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start space-x-2">
                <Bell className="h-4 w-4 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-900 dark:text-green-100">Notificări automate activate</p>
                  <p className="text-green-700 dark:text-green-200">
                    Sistemul va trimite automat notificări de confirmare și reminder-e conform setărilor alese.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Programare Rapidă
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Programare Rapidă</DialogTitle>
          <DialogDescription>
            {patientName ? `Creează o programare pentru ${patientName}` : "Creează o programare nouă"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                  currentStep >= step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground text-muted-foreground",
                )}
              >
                <step.icon className="w-4 h-4" />
              </div>
              <div className="ml-2 hidden sm:block">
                <p
                  className={cn(
                    "text-xs font-medium",
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={cn("w-8 h-0.5 mx-2", currentStep > step.id ? "bg-primary" : "bg-muted")} />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[400px]">{renderStepContent()}</div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Înapoi
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Anulează
            </Button>

            {currentStep < 5 ? (
              <Button onClick={handleNext} disabled={!isStepValid(currentStep)}>
                Următorul
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!isStepValid(currentStep) || isSubmitting}>
                {isSubmitting ? "Se creează..." : "Creează Programarea"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
