"use client"
import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TimelinePDFExport } from "./timeline-pdf-export"
import { TimelineZoomControls } from "./timeline-zoom-controls"
import { TimelineEventDetails } from "./timeline-event-details"
import type { MedicalEvent } from "@/types/medical-record"

interface MedicalTimelineProps {
  events?: MedicalEvent[]
  patientName?: string
  patientId?: string
}

export function MedicalTimeline({
  events = [],
  patientName = "Pacient Necunoscut",
  patientId = "P000",
}: MedicalTimelineProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "year">("month")
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set())

  // Ensure events have required properties
  const safeEvents = useMemo(() => {
    return events.filter((event) => event && event.id && event.date && event.title)
  }, [events])

  const filteredEvents = safeEvents // In the future, filter based on viewMode

  if (!safeEvents || safeEvents.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Nu există evenimente în istoric.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Istoric Medical</h2>
        <TimelinePDFExport events={filteredEvents} patientName={patientName} patientId={patientId} />
      </div>

      <TimelineZoomControls
        currentZoom={zoomLevel}
        currentView={viewMode}
        onZoomChange={setZoomLevel}
        onViewChange={setViewMode}
        onScrollToDate={(date) => {
          // Implementează scroll la dată
          console.log("Scroll to date:", date)
        }}
      />

      <div
        className="timeline-container space-y-6"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
      >
        {filteredEvents.map((event) => (
          <TimelineEventDetails
            key={event.id}
            event={event}
            isExpanded={expandedEvents.has(event.id)}
            onToggleExpand={() => {
              const newExpanded = new Set(expandedEvents)
              if (newExpanded.has(event.id)) {
                newExpanded.delete(event.id)
              } else {
                newExpanded.add(event.id)
              }
              setExpandedEvents(newExpanded)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default MedicalTimeline
