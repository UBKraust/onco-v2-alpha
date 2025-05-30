"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Plus } from "lucide-react"
import type { MedicalNote } from "@/types/medical-record"

interface MedicalNotesViewProps {
  notes: MedicalNote[]
  onAddNote: (note: Omit<MedicalNote, "id" | "date">) => void
}

export function MedicalNotesView({ notes, onAddNote }: MedicalNotesViewProps) {
  const [showPrivateNotes, setShowPrivateNotes] = useState(false)

  const visibleNotes = notes.filter((note) => !note.isPrivate || showPrivateNotes)

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "observation":
        return "Observație"
      case "recommendation":
        return "Recomandare"
      case "reminder":
        return "Reminder"
      default:
        return "Altele"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "observation":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "recommendation":
        return "bg-green-100 text-green-800 border-green-200"
      case "reminder":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "doctor":
        return "Medic"
      case "navigator":
        return "Navigator"
      case "nurse":
        return "Asistent Medical"
      case "patient":
        return "Pacient"
      default:
        return role
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Note Medicale
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {visibleNotes.length === 0 ? (
          <div className="text-center py-4">
            <p>Nu există note disponibile.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleNotes.map((note) => (
              <div key={note.id} className="p-4 border rounded-lg">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline" className={getCategoryColor(note.category)}>
                    {getCategoryLabel(note.category)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {note.date} • {getRoleLabel(note.authorRole)}: {note.author}
                  </span>
                  {note.isPrivate && (
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                      Privat
                    </Badge>
                  )}
                </div>
                <p>{note.content}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button className="flex-1">
            <Plus className="mr-2 h-4 w-4" />
            Adaugă Notă
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => setShowPrivateNotes(!showPrivateNotes)}>
            {showPrivateNotes ? "Ascunde Notele Private" : "Arată Notele Private"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
