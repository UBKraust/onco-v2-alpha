"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Plus } from "lucide-react"
import { toast } from "sonner"

interface AppointmentWizardProps {
  onAppointmentCreated?: (appointment: any) => void
}

export function AppointmentWizard({ onAppointmentCreated }: AppointmentWizardProps) {
  const [open, setOpen] = useState(false)

  const handleCreateAppointment = () => {
    // Mock appointment creation
    const newAppointment = {
      id: Date.now().toString(),
      patient: "Pacient Nou",
      type: "Consultație",
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      status: "pending",
    }

    onAppointmentCreated?.(newAppointment)
    toast.success("Programarea a fost creată cu succes!")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Programare Nouă
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Programare Nouă</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="text-center py-8">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium">Wizard Programări</p>
            <p className="text-muted-foreground">Funcționalitatea va fi implementată în curând</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Anulează
            </Button>
            <Button onClick={handleCreateAppointment}>Creează Programarea</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
