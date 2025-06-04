"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Upload, MessageSquare, Activity } from "lucide-react"

export function PatientQuickActions() {
  return (
    <div className="flex items-center space-x-3">
      {/* Add Symptom */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Adaugă Simptom
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adaugă Simptom Nou</DialogTitle>
            <DialogDescription>Înregistrează un simptom pentru monitorizare</DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <p className="text-sm text-gray-600">Form pentru adăugare simptom...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Appointment */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Programează
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Programează Consultație</DialogTitle>
            <DialogDescription>Solicită o programare cu echipa medicală</DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <p className="text-sm text-gray-600">Form pentru programare...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Document */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Încarcă Document
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Încarcă Document Medical</DialogTitle>
            <DialogDescription>Adaugă analize, rețete sau alte documente medicale</DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <p className="text-sm text-gray-600">Upload zone...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Message */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700">
            <MessageSquare className="h-4 w-4" />
            Trimite Mesaj
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mesaj către Echipa Medicală</DialogTitle>
            <DialogDescription>Trimite o întrebare sau informație către echipa ta medicală</DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <p className="text-sm text-gray-600">Form pentru mesaj...</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
