"use client"

import { Button } from "@/components/ui/button"
import { Plus, Calendar, Upload, MessageSquare } from "lucide-react"

export function PatientQuickActions() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="outline" className="flex items-center gap-1">
        <Plus className="h-4 w-4" />
        Adaugă Simptom
      </Button>
      <Button size="sm" variant="outline" className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        Programează
      </Button>
      <Button size="sm" variant="outline" className="flex items-center gap-1">
        <Upload className="h-4 w-4" />
        Încarcă Document
      </Button>
      <Button size="sm" className="flex items-center gap-1">
        <MessageSquare className="h-4 w-4" />
        Trimite Mesaj
      </Button>
    </div>
  )
}
