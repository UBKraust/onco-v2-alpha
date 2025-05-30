"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, AlertTriangle } from "lucide-react"
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
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Tipuri de consultații disponibile
const appointmentTypes = [
  { id: "general", name: "Consultație generală" },
  { id: "oncology", name: "Consultație oncologie" },
  { id: "followup", name: "Control periodic" },
  { id: "emergency", name: "Urgență" },
]

// Doctori disponibili
const doctors = [
  { id: "dr-popescu", name: "Dr. Popescu Maria", specialty: "Oncologie" },
  { id: "dr-ionescu", name: "Dr. Ionescu Alexandru", specialty: "Oncologie" },
  { id: "dr-vasilescu", name: "Dr. Vasilescu Elena", specialty: "Hematologie" },
  { id: "dr-georgescu", name: "Dr. Georgescu Andrei", specialty: "Chirurgie oncologică" },
]

// Ore disponibile
const availableHours = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
]

// Niveluri de prioritate
const priorityLevels = [
  { id: "low", name: "Scăzută", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  { id: "normal", name: "Normală", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  { id: "high", name: "Ridicată", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200" },
  { id: "urgent", name: "Urgentă", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
]

interface AppointmentSchedulerProps {
  variant?: "default" | "outline" | "secondary"
  className?: string
}

export function AppointmentScheduler({ variant = "default", className }: AppointmentSchedulerProps) {
  const [open, setOpen] = useState(false)
  const [appointmentType, setAppointmentType] = useState("")
  const [doctor, setDoctor] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [priority, setPriority] = useState("normal")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Funcție pentru a verifica dacă data este în viitor
  const isDateValid = (dateString: string) => {
    if (!dateString) return false
    const selectedDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today
  }

  // Funcție pentru a verifica dacă toate câmpurile obligatorii sunt completate
  const isFormValid = () => {
    return appointmentType && doctor && date && isDateValid(date) && time && reason.trim().length > 0
  }

  // Funcție pentru a reseta formularul
  const resetForm = () => {
    setAppointmentType("")
    setDoctor("")
    setDate("")
    setTime("")
    setPriority("normal")
    setReason("")
  }

  // Funcție pentru a programa consultația
  const handleScheduleAppointment = async () => {
    if (!isFormValid()) return

    setIsSubmitting(true)

    try {
      // Simulăm un apel API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Afișăm un mesaj de succes
      toast({
        title: "Programare realizată cu succes!",
        description: `Consultația a fost programată pentru data de ${date} la ora ${time}`,
        variant: "default",
      })

      // Închidem dialogul și resetăm formularul
      setOpen(false)
      resetForm()
    } catch (error) {
      toast({
        title: "Eroare la programare",
        description: "A apărut o eroare la programarea consultației. Vă rugăm să încercați din nou.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className={cn(
            "transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            "active:bg-secondary active:text-secondary-foreground",
            "disabled:bg-muted disabled:text-muted-foreground",
            "dark:hover:bg-accent dark:hover:text-accent-foreground",
            "dark:active:bg-secondary dark:active:text-secondary-foreground",
            "dark:disabled:bg-muted dark:disabled:text-muted-foreground",
            className,
          )}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Programează Consultație
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Programare consultație medicală</DialogTitle>
          <DialogDescription>
            Completați detaliile pentru a programa o consultație cu medicul specialist.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="appointment-type">Tipul consultației</Label>
            <Select value={appointmentType} onValueChange={setAppointmentType}>
              <SelectTrigger
                id="appointment-type"
                className={cn(
                  "transition-colors",
                  "hover:border-accent",
                  "focus:border-primary focus:ring-1 focus:ring-primary",
                  "dark:hover:border-accent",
                  "dark:focus:border-primary dark:focus:ring-1 dark:focus:ring-primary",
                )}
              >
                <SelectValue placeholder="Selectați tipul consultației" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="doctor">Medic</Label>
            <Select value={doctor} onValueChange={setDoctor}>
              <SelectTrigger
                id="doctor"
                className={cn(
                  "transition-colors",
                  "hover:border-accent",
                  "focus:border-primary focus:ring-1 focus:ring-primary",
                  "dark:hover:border-accent",
                  "dark:focus:border-primary dark:focus:ring-1 dark:focus:ring-primary",
                )}
              >
                <SelectValue placeholder="Selectați medicul" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    <div className="flex flex-col">
                      <span>{doc.name}</span>
                      <span className="text-xs text-muted-foreground">{doc.specialty}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className={cn(
                  "transition-colors",
                  "hover:border-accent",
                  "focus:border-primary focus:ring-1 focus:ring-primary",
                  "dark:hover:border-accent",
                  "dark:focus:border-primary dark:focus:ring-1 dark:focus:ring-primary",
                  !isDateValid(date) && date ? "border-red-500 dark:border-red-500" : "",
                )}
              />
              {!isDateValid(date) && date && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Data trebuie să fie în viitor
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="time">Ora</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger
                  id="time"
                  className={cn(
                    "transition-colors",
                    "hover:border-accent",
                    "focus:border-primary focus:ring-1 focus:ring-primary",
                    "dark:hover:border-accent",
                    "dark:focus:border-primary dark:focus:ring-1 dark:focus:ring-primary",
                  )}
                >
                  <SelectValue placeholder="Selectați ora" />
                </SelectTrigger>
                <SelectContent>
                  {availableHours.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Prioritate</Label>
            <RadioGroup value={priority} onValueChange={setPriority} className="flex space-x-2">
              {priorityLevels.map((level) => (
                <div key={level.id} className="flex items-center space-x-1">
                  <RadioGroupItem
                    value={level.id}
                    id={`priority-${level.id}`}
                    className={cn(
                      "transition-colors",
                      "hover:border-accent",
                      "focus:border-primary focus:ring-1 focus:ring-primary",
                      "dark:hover:border-accent",
                      "dark:focus:border-primary dark:focus:ring-1 dark:focus:ring-primary",
                    )}
                  />
                  <Label htmlFor={`priority-${level.id}`} className={cn("text-xs px-2 py-1 rounded-full", level.color)}>
                    {level.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reason">Motivul consultației</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Descrieți pe scurt motivul pentru care doriți să programați o consultație..."
              className={cn(
                "min-h-[100px]",
                "transition-colors",
                "hover:border-accent",
                "focus:border-primary focus:ring-1 focus:ring-primary",
                "dark:hover:border-accent",
                "dark:focus:border-primary dark:focus:ring-1 dark:focus:ring-primary",
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className={cn(
              "transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "active:bg-secondary active:text-secondary-foreground",
              "disabled:bg-muted disabled:text-muted-foreground",
              "dark:hover:bg-accent dark:hover:text-accent-foreground",
              "dark:active:bg-secondary dark:active:text-secondary-foreground",
              "dark:disabled:bg-muted dark:disabled:text-muted-foreground",
            )}
          >
            Anulează
          </Button>
          <Button
            onClick={handleScheduleAppointment}
            disabled={!isFormValid() || isSubmitting}
            className={cn(
              "transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "active:bg-secondary active:text-secondary-foreground",
              "disabled:bg-muted disabled:text-muted-foreground",
              "dark:hover:bg-accent dark:hover:text-accent-foreground",
              "dark:active:bg-secondary dark:active:text-secondary-foreground",
              "dark:disabled:bg-muted dark:disabled:text-muted-foreground",
            )}
          >
            {isSubmitting ? "Se programează..." : "Programează"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
