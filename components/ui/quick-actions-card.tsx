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
      >
        <Icon className="w-6 h-6" />
        <span className="text-sm font-medium text-center">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground text-center hidden group-hover:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded whitespace-nowrap z-10">
            {description}
          </span>
        )}
      </Button>

      {showNote && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute -bottom-2 -right-2 h-6 w-6 p-0 bg-blue-100 hover:bg-blue-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => {
            e.stopPropagation()
            onNoteClick?.()
          }}
        >
          <FileText className="w-3 h-3 text-blue-600" />
        </Button>
      )}
    </div>
  )
}

export default function QuickActionsCard() {
  const [activeNote, setActiveNote] = useState<string | null>(null)

  const handleAction = (action: string) => {
    console.log(`Navigating to: ${action}`)
    // Here you would implement navigation or modal opening
    // Example: router.push(`/${action}`)
  }

  const handleNoteClick = (context: string) => {
    setActiveNote(activeNote === context ? null : context)
    console.log(`Adding note for: ${context}`)
  }

  return (
    <Card className="rounded-2xl bg-white shadow-lg p-6 w-full max-w-4xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Acțiuni Rapide</CardTitle>
            <CardDescription className="text-gray-600 mt-1">
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
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Pacient
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionButton
              icon={UserPlus}
              label="Adaugă Pacient"
              description="Înregistrează un pacient nou în sistem"
              variant="default"
              onClick={() => handleAction("patient/onboarding")}
            />
          </div>
        </div>

        {/* Section 2: Îngrijire Medicală */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Îngrijire Medicală
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickActionButton
              icon={Pill}
              label="Tratament"
              description="Adaugă un nou tratament"
              showNote
              onClick={() => handleAction("add-treatment")}
              onNoteClick={() => handleNoteClick("treatment")}
            />
            <QuickActionButton
              icon={Stethoscope}
              label="Consultație"
              description="Programează o consultație"
              showNote
              onClick={() => handleAction("add-consultation")}
              onNoteClick={() => handleNoteClick("consultation")}
            />
            <QuickActionButton
              icon={TestTube}
              label="Analiză"
              description="Adaugă rezultate analize"
              showNote
              onClick={() => handleAction("add-analysis")}
              onNoteClick={() => handleNoteClick("analysis")}
            />
            <QuickActionButton
              icon={CalendarPlus}
              label="Programare"
              description="Creează o programare nouă"
              showNote
              onClick={() => handleAction("add-appointment")}
              onNoteClick={() => handleNoteClick("appointment")}
            />
          </div>
        </div>

        {/* Section 3: Note */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            Documentare
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionButton
              icon={StickyNote}
              label="Notă Generală"
              description="Adaugă o notă generală"
              className="border-amber-200 hover:border-amber-300"
              onClick={() => handleAction("add-general-note")}
            />
          </div>
        </div>

        {/* Active Note Form */}
        {activeNote && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-blue-900">
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
              >
                ✕
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-blue-800 block mb-1">Tip Notă</label>
                <select className="w-full text-sm border border-blue-200 rounded px-2 py-1 bg-white">
                  <option>Observație clinică</option>
                  <option>Instrucțiuni pacient</option>
                  <option>Follow-up necesar</option>
                  <option>Altele</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-blue-800 block mb-1">Text Notă</label>
                <textarea
                  className="w-full text-sm border border-blue-200 rounded px-2 py-1 bg-white resize-none"
                  rows={3}
                  placeholder="Introduceți nota aici..."
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-3 h-3 mr-1" />
                  Salvează Nota
                </Button>
                <Button variant="outline" size="sm" onClick={() => setActiveNote(null)}>
                  Anulează
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
