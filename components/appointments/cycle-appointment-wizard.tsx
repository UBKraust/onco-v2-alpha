"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, Plus, Activity, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TreatmentCycle } from "@/types/treatment"

interface CycleAppointmentWizardProps {
  isOpen: boolean
  onClose: () => void
  patientId: string
  existingCycles?: TreatmentCycle[]
  onAppointmentCreated?: (appointmentData: any) => void
  onCycleCreated?: (cycleData: any) => void
}

export function CycleAppointmentWizard({
  isOpen,
  onClose,
  patientId,
  existingCycles = [],
  onAppointmentCreated,
  onCycleCreated,
}: CycleAppointmentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [appointmentMode, setAppointmentMode] = useState<"existing" | "new">("existing")
  const [selectedCycleId, setSelectedCycleId] = useState("")
  const [newCycleData, setNewCycleData] = useState({
    treatmentType: "",
    protocol: "",
    totalCycles: 6,
    startDate: "",
    endDate: "",
    notes: "",
  })
  const [appointmentData, setAppointmentData] = useState({
    title: "",
    type: "treatment",
    date: "",
    time: "",
    duration: 60,
    location: "",
    doctor: "",
    notes: "",
    requirements: [] as string[],
  })

  const steps = [
    { id: 1, title: "Selectare Ciclu", icon: Activity },
    { id: 2, title: "Detalii Programare", icon: Calendar },
    { id: 3, title: "Confirmare", icon: Plus },
  ]

  const appointmentTypes = [
    { value: "treatment", label: "Tratament", description: "Administrare chimioterapie, radioterapie" },
    { value: "consultation", label: "Consultație", description: "Consultație medicală, evaluare" },
    { value: "test", label: "Investigații", label: "Analize, imagistică, teste" },
    { value: "follow-up", label: "Control", description: "Control post-tratament, monitorizare" },
  ]

  const treatmentProtocols = [
    { value: "r-chop", label: "R-CHOP", description: "Rituximab + CHOP" },
    { value: "folfox", label: "FOLFOX", description: "Oxaliplatin + 5-FU + Leucovorin" },
    { value: "ac-t", label: "AC-T", description: "Adriamycin + Cyclophosphamide + Taxol" },
    { value: "carboplatin-taxol", label: "Carboplatin + Taxol", description: "Combinație standard ovarian" },
  ]

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return appointmentMode === "existing" ? selectedCycleId !== "" : newCycleData.treatmentType !== ""
      case 2:
        return appointmentData.title !== "" && appointmentData.date !== "" && appointmentData.time !== ""
      case 3:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 3 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      if (appointmentMode === "new") {
        // Creează ciclu nou
        const cycleData = {
          ...newCycleData,
          patientId,
          cycleNumber: 1,
          status: "scheduled",
          progress: 0,
          appointments: [appointmentData],
          sideEffects: [],
          medications: [],
        }
        onCycleCreated?.(cycleData)
      } else {
        // Adaugă programare la ciclu existent
        const appointmentWithCycle = {
          ...appointmentData,
          cycleId: selectedCycleId,
          patientId,
        }
        onAppointmentCreated?.(appointmentWithCycle)
      }
      onClose()
    } catch (error) {
      console.error("Error creating appointment/cycle:", error)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Selectează opțiunea</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Alege dacă vrei să adaugi programarea la un ciclu existent sau să creezi un ciclu nou
              </p>
            </div>

            <RadioGroup value={appointmentMode} onValueChange={(value: any) => setAppointmentMode(value)}>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="existing" id="existing" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="existing" className="font-medium cursor-pointer">
                      Adaugă la ciclu existent
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Asociază programarea cu un ciclu de tratament deja creat
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value="new" id="new" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="new" className="font-medium cursor-pointer">
                      Creează ciclu nou
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Creează un ciclu nou de tratament și adaugă prima programare
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>

            {appointmentMode === "existing" && (
              <div className="space-y-3">
                <Label>Selectează ciclul</Label>
                {existingCycles.length > 0 ? (
                  <RadioGroup value={selectedCycleId} onValueChange={setSelectedCycleId}>
                    {existingCycles
                      .filter((cycle) => cycle.status !== "completed" && cycle.status !== "cancelled")
                      .map((cycle) => (
                        <div key={cycle.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <RadioGroupItem value={cycle.id} id={cycle.id} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={cycle.id} className="font-medium cursor-pointer">
                              {cycle.treatmentType} - Ciclul {cycle.cycleNumber} din {cycle.totalCycles}
                            </Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{cycle.protocol}</Badge>
                              <Badge
                                variant={cycle.status === "in-progress" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {cycle.status === "in-progress" ? "În derulare" : "Programat"}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {cycle.appointments.length} programări • Progres: {cycle.progress}%
                            </p>
                          </div>
                        </div>
                      ))}
                  </RadioGroup>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">Nu există cicluri active pentru acest pacient.</p>
                      <Button variant="outline" className="mt-3" onClick={() => setAppointmentMode("new")}>
                        Creează primul ciclu
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {appointmentMode === "new" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="treatment-type">Tipul tratamentului</Label>
                    <Select
                      value={newCycleData.treatmentType}
                      onValueChange={(value) => setNewCycleData({ ...newCycleData, treatmentType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează tipul" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chemotherapy">Chimioterapie</SelectItem>
                        <SelectItem value="radiotherapy">Radioterapie</SelectItem>
                        <SelectItem value="immunotherapy">Imunoterapie</SelectItem>
                        <SelectItem value="targeted-therapy">Terapie țintită</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="protocol">Protocol</Label>
                    <Select
                      value={newCycleData.protocol}
                      onValueChange={(value) => setNewCycleData({ ...newCycleData, protocol: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează protocolul" />
                      </SelectTrigger>
                      <SelectContent>
                        {treatmentProtocols.map((protocol) => (
                          <SelectItem key={protocol.value} value={protocol.value}>
                            <div>
                              <div className="font-medium">{protocol.label}</div>
                              <div className="text-xs text-muted-foreground">{protocol.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="total-cycles">Total cicluri</Label>
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      value={newCycleData.totalCycles}
                      onChange={(e) =>
                        setNewCycleData({ ...newCycleData, totalCycles: Number.parseInt(e.target.value) || 6 })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="start-date">Data început</Label>
                    <Input
                      type="date"
                      value={newCycleData.startDate}
                      onChange={(e) => setNewCycleData({ ...newCycleData, startDate: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="end-date">Data sfârșit (estimată)</Label>
                    <Input
                      type="date"
                      value={newCycleData.endDate}
                      onChange={(e) => setNewCycleData({ ...newCycleData, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cycle-notes">Note ciclu</Label>
                  <Textarea
                    id="cycle-notes"
                    placeholder="Note despre planul de tratament..."
                    value={newCycleData.notes}
                    onChange={(e) => setNewCycleData({ ...newCycleData, notes: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Detalii programare</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Completează informațiile pentru programarea din cadrul ciclului
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="appointment-title">Titlul programării</Label>
                <Input
                  id="appointment-title"
                  placeholder="ex: Administrare Chimioterapie - Ziua 1"
                  value={appointmentData.title}
                  onChange={(e) => setAppointmentData({ ...appointmentData, title: e.target.value })}
                />
              </div>

              <div>
                <Label>Tipul programării</Label>
                <RadioGroup
                  value={appointmentData.type}
                  onValueChange={(value) => setAppointmentData({ ...appointmentData, type: value })}
                >
                  {appointmentTypes.map((type) => (
                    <div key={type.value} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={type.value} className="font-medium cursor-pointer">
                          {type.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="appointment-date">Data</Label>
                  <Input
                    type="date"
                    id="appointment-date"
                    value={appointmentData.date}
                    onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="appointment-time">Ora</Label>
                  <Input
                    type="time"
                    id="appointment-time"
                    value={appointmentData.time}
                    onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Durată (minute)</Label>
                  <Select
                    value={appointmentData.duration.toString()}
                    onValueChange={(value) =>
                      setAppointmentData({ ...appointmentData, duration: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minute</SelectItem>
                      <SelectItem value="45">45 minute</SelectItem>
                      <SelectItem value="60">1 oră</SelectItem>
                      <SelectItem value="90">1.5 ore</SelectItem>
                      <SelectItem value="120">2 ore</SelectItem>
                      <SelectItem value="180">3 ore</SelectItem>
                      <SelectItem value="240">4 ore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Locația</Label>
                  <Select
                    value={appointmentData.location}
                    onValueChange={(value) => setAppointmentData({ ...appointmentData, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează locația" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sala-tratament-1">Sala Tratament 1</SelectItem>
                      <SelectItem value="sala-tratament-2">Sala Tratament 2</SelectItem>
                      <SelectItem value="cabinet-oncologie">Cabinet Oncologie</SelectItem>
                      <SelectItem value="laborator">Laborator</SelectItem>
                      <SelectItem value="imagistica">Imagistică</SelectItem>
                      <SelectItem value="online">Online - Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="doctor">Medicul responsabil</Label>
                  <Select
                    value={appointmentData.doctor}
                    onValueChange={(value) => setAppointmentData({ ...appointmentData, doctor: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează medicul" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-popescu">Dr. Maria Popescu - Oncolog</SelectItem>
                      <SelectItem value="dr-ionescu">Dr. Alexandru Ionescu - Chirurg</SelectItem>
                      <SelectItem value="dr-vasilescu">Dr. Elena Vasilescu - Radiolog</SelectItem>
                      <SelectItem value="asist-ana">Asist. Ana Dumitrescu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="appointment-notes">Note programare</Label>
                <Textarea
                  id="appointment-notes"
                  placeholder="Note speciale, instrucțiuni pentru pacient..."
                  value={appointmentData.notes}
                  onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Confirmare</Label>
              <p className="text-sm text-muted-foreground mb-4">Verifică informațiile înainte de a crea programarea</p>
            </div>

            <div className="space-y-4">
              {appointmentMode === "new" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ciclu nou</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Tip tratament:</span>
                        <p className="text-muted-foreground">{newCycleData.treatmentType}</p>
                      </div>
                      <div>
                        <span className="font-medium">Protocol:</span>
                        <p className="text-muted-foreground">{newCycleData.protocol}</p>
                      </div>
                      <div>
                        <span className="font-medium">Total cicluri:</span>
                        <p className="text-muted-foreground">{newCycleData.totalCycles}</p>
                      </div>
                      <div>
                        <span className="font-medium">Perioada:</span>
                        <p className="text-muted-foreground">
                          {new Date(newCycleData.startDate).toLocaleDateString("ro-RO")} -{" "}
                          {new Date(newCycleData.endDate).toLocaleDateString("ro-RO")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Programare</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Titlu:</span>
                      <p className="text-muted-foreground">{appointmentData.title}</p>
                    </div>
                    <div>
                      <span className="font-medium">Tip:</span>
                      <p className="text-muted-foreground">
                        {appointmentTypes.find((t) => t.value === appointmentData.type)?.label}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Data și ora:</span>
                      <p className="text-muted-foreground">
                        {new Date(appointmentData.date).toLocaleDateString("ro-RO")} la {appointmentData.time}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Durată:</span>
                      <p className="text-muted-foreground">{appointmentData.duration} minute</p>
                    </div>
                    <div>
                      <span className="font-medium">Locația:</span>
                      <p className="text-muted-foreground">{appointmentData.location}</p>
                    </div>
                    <div>
                      <span className="font-medium">Doctor:</span>
                      <p className="text-muted-foreground">{appointmentData.doctor}</p>
                    </div>
                  </div>
                  {appointmentData.notes && (
                    <div className="mt-3">
                      <span className="font-medium text-sm">Note:</span>
                      <p className="text-sm text-muted-foreground mt-1">{appointmentData.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Programare în Ciclu de Tratament</DialogTitle>
          <DialogDescription>Creează o programare asociată cu un ciclu de tratament existent sau nou</DialogDescription>
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
            <Button variant="outline" onClick={onClose}>
              Anulează
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext} disabled={!isStepValid(currentStep)}>
                Următorul
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!isStepValid(currentStep)}>
                {appointmentMode === "new" ? "Creează Ciclu și Programare" : "Creează Programarea"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
