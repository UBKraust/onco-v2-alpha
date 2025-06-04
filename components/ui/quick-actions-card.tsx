"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Pill, Stethoscope, TestTube, CalendarPlus, FileText, StickyNote, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickActionProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  description?: string
  variant?: "default" | "outline" | "secondary"
  className?: string
  onClick?: () => void
  showNote?: boolean
  onNoteClick?: () => void
  ariaLabel?: string
}

function QuickActionButton({
  icon: Icon,
  label,
  description,
  variant = "outline",
  className,
  onClick,
  showNote = false,
  onNoteClick,
  ariaLabel,
}: QuickActionProps) {
  return (
    <div className="relative group">
      <Button
        variant={variant}
        className={cn(
          "h-24 w-full flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-200",
          variant === "default" && "bg-green-600 hover:bg-green-700 text-white",
          className,
        )}
        onClick={onClick}
        aria-label={ariaLabel || `${label}${description ? `: ${description}` : ""}`}
        aria-describedby={description ? `desc-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined}
      >
        <Icon className="w-6 h-6" aria-hidden="true" />
        <span className="text-sm font-medium text-center">{label}</span>
      </Button>

      {/* Hidden description for screen readers */}
      {description && (
        <div id={`desc-${label.replace(/\s+/g, "-").toLowerCase()}`} className="sr-only">
          {description}
        </div>
      )}

      {/* Tooltip for visual users */}
      {description && (
        <div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          role="tooltip"
          aria-hidden="true"
        >
          {description}
        </div>
      )}

      {showNote && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute -bottom-2 -right-2 h-6 w-6 p-0 bg-blue-100 hover:bg-blue-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => {
            e.stopPropagation()
            onNoteClick?.()
          }}
          aria-label={`Adaugă notă pentru ${label}`}
        >
          <FileText className="w-3 h-3 text-blue-600" aria-hidden="true" />
        </Button>
      )}
    </div>
  )
}

export default function QuickActionsCard() {
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [noteContent, setNoteContent] = useState("")
  const [noteType, setNoteType] = useState("Observație clinică")

  const handleAction = (action: string) => {
    console.log(`Navigating to: ${action}`)
    // Announce action to screen readers
    const announcement = `Navigare către ${action}`
    const announcer = document.createElement("div")
    announcer.setAttribute("aria-live", "polite")
    announcer.className = "sr-only"
    announcer.textContent = announcement
    document.body.appendChild(announcer)

    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
  }

  const handleNoteClick = (context: string) => {
    const newActiveNote = activeNote === context ? null : context
    setActiveNote(newActiveNote)

    // Announce note form state
    const announcement = newActiveNote ? `Formular de notă deschis pentru ${context}` : "Formular de notă închis"

    const announcer = document.createElement("div")
    announcer.setAttribute("aria-live", "polite")
    announcer.className = "sr-only"
    announcer.textContent = announcement
    document.body.appendChild(announcer)

    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
  }

  const handleSaveNote = () => {
    console.log(`Saving note for ${activeNote}:`, { noteType, noteContent })

    // Announce successful save
    const announcer = document.createElement("div")
    announcer.setAttribute("aria-live", "polite")
    announcer.className = "sr-only"
    announcer.textContent = "Nota a fost salvată cu succes"
    document.body.appendChild(announcer)

    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)

    setActiveNote(null)
    setNoteContent("")
    setNoteType("Observație clinică")
  }

  return (
    <Card
      className="rounded-2xl bg-white shadow-lg p-6 w-full max-w-4xl"
      role="region"
      aria-labelledby="quick-actions-title"
      aria-describedby="quick-actions-description"
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle id="quick-actions-title" className="text-xl font-semibold text-gray-900">
              Acțiuni Rapide
            </CardTitle>
            <CardDescription id="quick-actions-description" className="text-gray-600 mt-1">
              Accesează rapid funcțiile de bază pentru pacienți
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            OncoLink
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Section 1: Pacient */}
        <section aria-labelledby="patient-section-title">
          <h3 id="patient-section-title" className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
            Pacient
          </h3>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            role="group"
            aria-labelledby="patient-section-title"
          >
            <QuickActionButton
              icon={UserPlus}
              label="Adaugă Pacient"
              description="Înregistrează un pacient nou în sistem"
              variant="default"
              onClick={() => handleAction("patient/onboarding")}
              ariaLabel="Adaugă un pacient nou în sistem"
            />
          </div>
        </section>

        {/* Section 2: Îngrijire Medicală */}
        <section aria-labelledby="medical-care-section-title">
          <h3
            id="medical-care-section-title"
            className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true"></div>
            Îngrijire Medicală
          </h3>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            role="group"
            aria-labelledby="medical-care-section-title"
          >
            <QuickActionButton
              icon={Pill}
              label="Tratament"
              description="Adaugă un nou tratament"
              showNote
              onClick={() => handleAction("add-treatment")}
              onNoteClick={() => handleNoteClick("treatment")}
              ariaLabel="Adaugă un nou tratament medical"
            />
            <QuickActionButton
              icon={Stethoscope}
              label="Consultație"
              description="Programează o consultație"
              showNote
              onClick={() => handleAction("add-consultation")}
              onNoteClick={() => handleNoteClick("consultation")}
              ariaLabel="Programează o consultație medicală"
            />
            <QuickActionButton
              icon={TestTube}
              label="Analiză"
              description="Adaugă rezultate analize"
              showNote
              onClick={() => handleAction("add-analysis")}
              onNoteClick={() => handleNoteClick("analysis")}
              ariaLabel="Adaugă rezultate de analize medicale"
            />
            <QuickActionButton
              icon={CalendarPlus}
              label="Programare"
              description="Creează o programare nouă"
              showNote
              onClick={() => handleAction("add-appointment")}
              onNoteClick={() => handleNoteClick("appointment")}
              ariaLabel="Creează o programare medicală nouă"
            />
          </div>
        </section>

        {/* Section 3: Note */}
        <section aria-labelledby="documentation-section-title">
          <h3
            id="documentation-section-title"
            className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-amber-500 rounded-full" aria-hidden="true"></div>
            Documentare
          </h3>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            role="group"
            aria-labelledby="documentation-section-title"
          >
            <QuickActionButton
              icon={StickyNote}
              label="Notă Generală"
              description="Adaugă o notă generală"
              className="border-amber-200 hover:border-amber-300"
              onClick={() => handleAction("add-general-note")}
              ariaLabel="Adaugă o notă generală în dosarul pacientului"
            />
          </div>
        </section>

        {/* Active Note Form */}
        {activeNote && (
          <section
            className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            role="form"
            aria-labelledby="note-form-title"
            aria-describedby="note-form-description"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 id="note-form-title" className="text-sm font-medium text-blue-900">
                Adaugă Notă pentru{" "}
                {activeNote === "treatment"
                  ? "Tratament"
                  : activeNote === "consultation"
                    ? "Consultație"
                    : activeNote === "analysis"
                      ? "Analiză"
                      : "Programare"}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveNote(null)}
                className="text-blue-600 hover:text-blue-800"
                aria-label="Închide formularul de notă"
              >
                ✕
              </Button>
            </div>

            <div id="note-form-description" className="sr-only">
              Formular pentru adăugarea unei note medicale. Completați tipul notei și conținutul.
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="note-type" className="text-xs font-medium text-blue-800 block mb-1">
                  Tip Notă
                </label>
                <select
                  id="note-type"
                  className="w-full text-sm border border-blue-200 rounded px-2 py-1 bg-white"
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value)}
                  aria-describedby="note-type-help"
                >
                  <option>Observație clinică</option>
                  <option>Instrucțiuni pacient</option>
                  <option>Follow-up necesar</option>
                  <option>Altele</option>
                </select>
                <div id="note-type-help" className="sr-only">
                  Selectați tipul de notă medicală din lista disponibilă
                </div>
              </div>

              <div>
                <label htmlFor="note-content" className="text-xs font-medium text-blue-800 block mb-1">
                  Text Notă
                </label>
                <textarea
                  id="note-content"
                  className="w-full text-sm border border-blue-200 rounded px-2 py-1 bg-white resize-none"
                  rows={3}
                  placeholder="Introduceți nota aici..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  aria-describedby="note-content-help"
                />
                <div id="note-content-help" className="sr-only">
                  Introduceți conținutul notei medicale în acest câmp
                </div>
              </div>

              <div className="flex gap-2" role="group" aria-label="Acțiuni formular notă">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleSaveNote}
                  disabled={!noteContent.trim()}
                  aria-label="Salvează nota medicală"
                >
                  <Plus className="w-3 h-3 mr-1" aria-hidden="true" />
                  Salvează Nota
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveNote(null)}
                  aria-label="Anulează adăugarea notei"
                >
                  Anulează
                </Button>
              </div>
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  )
}
