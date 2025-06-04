"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { StickyNote, Plus, Edit, Trash2, Lock, Calendar, User } from "lucide-react"

interface PatientNote {
  id: string
  content: string
  category: "general" | "medical" | "behavioral" | "family" | "urgent"
  priority: "low" | "normal" | "high"
  createdAt: string
  updatedAt: string
  navigatorId: string
  navigatorName: string
  isPrivate: boolean
}

interface PatientNotesManagerProps {
  patientId: string
  patientName: string
  currentNavigatorId: string
  currentNavigatorName: string
}

const mockNotes: PatientNote[] = [
  {
    id: "1",
    content:
      "Pacientul manifestă anxietate ridicată înainte de ședințele de chimioterapie. Recomand consiliere psihologică.",
    category: "behavioral",
    priority: "high",
    createdAt: "2024-01-10T10:30:00Z",
    updatedAt: "2024-01-10T10:30:00Z",
    navigatorId: "nav-1",
    navigatorName: "Dr. Maria Ionescu",
    isPrivate: true,
  },
  {
    id: "2",
    content: "Familie foarte suportivă. Soția participă activ la toate consultațiile și urmărește medicația.",
    category: "family",
    priority: "normal",
    createdAt: "2024-01-08T14:15:00Z",
    updatedAt: "2024-01-08T14:15:00Z",
    navigatorId: "nav-1",
    navigatorName: "Dr. Maria Ionescu",
    isPrivate: false,
  },
  {
    id: "3",
    content:
      "Pacientul a raportat efecte adverse severe după ultima ședință. Contactat medicul oncolog pentru ajustarea dozei.",
    category: "medical",
    priority: "urgent",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
    navigatorId: "nav-1",
    navigatorName: "Dr. Maria Ionescu",
    isPrivate: true,
  },
]

const categoryLabels = {
  general: "General",
  medical: "Medical",
  behavioral: "Comportamental",
  family: "Familie",
  urgent: "Urgent",
}

const priorityLabels = {
  low: "Scăzută",
  normal: "Normală",
  high: "Ridicată",
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "medical":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "behavioral":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    case "family":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "urgent":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "normal":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    default:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  }
}

export function PatientNotesManager({
  patientId,
  patientName,
  currentNavigatorId,
  currentNavigatorName,
}: PatientNotesManagerProps) {
  const [notes, setNotes] = useState<PatientNote[]>(mockNotes)
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [editingNote, setEditingNote] = useState<PatientNote | null>(null)
  const [newNoteContent, setNewNoteContent] = useState("")
  const [newNoteCategory, setNewNoteCategory] = useState<PatientNote["category"]>("general")
  const [newNotePriority, setNewNotePriority] = useState<PatientNote["priority"]>("normal")
  const [newNoteIsPrivate, setNewNoteIsPrivate] = useState(true)

  const handleAddNote = async () => {
    if (!newNoteContent.trim()) {
      toast({
        title: "Eroare",
        description: "Conținutul notei nu poate fi gol.",
        variant: "destructive",
      })
      return
    }

    const newNote: PatientNote = {
      id: Date.now().toString(),
      content: newNoteContent,
      category: newNoteCategory,
      priority: newNotePriority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      navigatorId: currentNavigatorId,
      navigatorName: currentNavigatorName,
      isPrivate: newNoteIsPrivate,
    }

    setNotes([newNote, ...notes])
    setNewNoteContent("")
    setNewNoteCategory("general")
    setNewNotePriority("normal")
    setNewNoteIsPrivate(true)
    setIsAddingNote(false)

    toast({
      title: "Notă adăugată",
      description: "Nota a fost salvată cu succes.",
    })
  }

  const handleEditNote = async () => {
    if (!editingNote || !newNoteContent.trim()) return

    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id
        ? {
            ...note,
            content: newNoteContent,
            category: newNoteCategory,
            priority: newNotePriority,
            isPrivate: newNoteIsPrivate,
            updatedAt: new Date().toISOString(),
          }
        : note,
    )

    setNotes(updatedNotes)
    setEditingNote(null)
    setNewNoteContent("")

    toast({
      title: "Notă actualizată",
      description: "Modificările au fost salvate.",
    })
  }

  const handleDeleteNote = async (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId))
    toast({
      title: "Notă ștearsă",
      description: "Nota a fost eliminată.",
    })
  }

  const startEdit = (note: PatientNote) => {
    setEditingNote(note)
    setNewNoteContent(note.content)
    setNewNoteCategory(note.category)
    setNewNotePriority(note.priority)
    setNewNoteIsPrivate(note.isPrivate)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <StickyNote className="h-5 w-5" />
              Note Private Navigator
            </CardTitle>
            <CardDescription>Note personale pentru {patientName}</CardDescription>
          </div>
          <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adaugă Notă
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adaugă Notă Nouă</DialogTitle>
                <DialogDescription>Creează o notă privată pentru acest pacient</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="content">Conținut</Label>
                  <Textarea
                    id="content"
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Scrie nota aici..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categorie</Label>
                    <Select value={newNoteCategory} onValueChange={(value: any) => setNewNoteCategory(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Prioritate</Label>
                    <Select value={newNotePriority} onValueChange={(value: any) => setNewNotePriority(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(priorityLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="private"
                    checked={newNoteIsPrivate}
                    onChange={(e) => setNewNoteIsPrivate(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="private" className="text-sm">
                    Notă privată (vizibilă doar pentru mine)
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingNote(false)}>
                  Anulează
                </Button>
                <Button onClick={handleAddNote}>Salvează Nota</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <StickyNote className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nu există note pentru acest pacient</p>
              <p className="text-sm">Adaugă prima notă pentru a începe urmărirea</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(note.category)}>{categoryLabels[note.category]}</Badge>
                    <Badge className={getPriorityColor(note.priority)}>{priorityLabels[note.priority]}</Badge>
                    {note.isPrivate && (
                      <Badge variant="outline" className="text-xs">
                        <Lock className="h-3 w-3 mr-1" />
                        Privat
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(note)}
                      disabled={note.navigatorId !== currentNavigatorId}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                      disabled={note.navigatorId !== currentNavigatorId}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm leading-relaxed">{note.content}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {note.navigatorName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(note.createdAt)}
                    </div>
                  </div>
                  {note.updatedAt !== note.createdAt && (
                    <span className="italic">Modificat: {formatDate(note.updatedAt)}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editează Nota</DialogTitle>
              <DialogDescription>Modifică conținutul și setările notei</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-content">Conținut</Label>
                <Textarea
                  id="edit-content"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-category">Categorie</Label>
                  <Select value={newNoteCategory} onValueChange={(value: any) => setNewNoteCategory(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-priority">Prioritate</Label>
                  <Select value={newNotePriority} onValueChange={(value: any) => setNewNotePriority(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(priorityLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-private"
                  checked={newNoteIsPrivate}
                  onChange={(e) => setNewNoteIsPrivate(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="edit-private" className="text-sm">
                  Notă privată (vizibilă doar pentru mine)
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingNote(null)}>
                Anulează
              </Button>
              <Button onClick={handleEditNote}>Salvează Modificările</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
