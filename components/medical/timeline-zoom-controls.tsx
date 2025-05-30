"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, RotateCcw, Calendar, Clock, Maximize2 } from "lucide-react"

interface TimelineZoomControlsProps {
  onZoomChange: (zoom: number) => void
  onViewChange: (view: "day" | "week" | "month" | "year") => void
  onScrollToDate: (date: Date) => void
  currentZoom: number
  currentView: "day" | "week" | "month" | "year"
}

export function TimelineZoomControls({
  onZoomChange,
  onViewChange,
  onScrollToDate,
  currentZoom,
  currentView,
}: TimelineZoomControlsProps) {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])

  const zoomLevels = [
    { value: 0.5, label: "50%" },
    { value: 0.75, label: "75%" },
    { value: 1, label: "100%" },
    { value: 1.25, label: "125%" },
    { value: 1.5, label: "150%" },
    { value: 2, label: "200%" },
  ]

  const viewOptions = [
    { value: "day" as const, label: "Zi", icon: Clock },
    { value: "week" as const, label: "Săptămână", icon: Calendar },
    { value: "month" as const, label: "Lună", icon: Calendar },
    { value: "year" as const, label: "An", icon: Calendar },
  ]

  const handleZoomIn = () => {
    const currentIndex = zoomLevels.findIndex((level) => level.value === currentZoom)
    if (currentIndex < zoomLevels.length - 1) {
      onZoomChange(zoomLevels[currentIndex + 1].value)
    }
  }

  const handleZoomOut = () => {
    const currentIndex = zoomLevels.findIndex((level) => level.value === currentZoom)
    if (currentIndex > 0) {
      onZoomChange(zoomLevels[currentIndex - 1].value)
    }
  }

  const handleReset = () => {
    onZoomChange(1)
    onViewChange("month")
  }

  const handleScrollToDate = () => {
    onScrollToDate(new Date(selectedDate))
  }

  return (
    <Card className="p-4 mb-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Controale zoom */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={currentZoom <= 0.5}>
            <ZoomOut className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2 min-w-[120px]">
            <Slider
              value={[currentZoom]}
              onValueChange={([value]) => onZoomChange(value)}
              min={0.5}
              max={2}
              step={0.25}
              className="flex-1"
            />
            <span className="text-sm font-medium min-w-[40px]">{Math.round(currentZoom * 100)}%</span>
          </div>

          <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={currentZoom >= 2}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-300" />

        {/* Opțiuni vizualizare */}
        <div className="flex items-center gap-1">
          {viewOptions.map((option) => {
            const Icon = option.icon
            return (
              <Button
                key={option.value}
                variant={currentView === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onViewChange(option.value)}
                className={currentView === option.value ? "bg-pink-600 hover:bg-pink-700" : ""}
              >
                <Icon className="h-4 w-4 mr-1" />
                {option.label}
              </Button>
            )
          })}
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-300" />

        {/* Navigare la dată */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          />
          <Button variant="outline" size="sm" onClick={handleScrollToDate}>
            <Calendar className="h-4 w-4 mr-1" />
            Navighează
          </Button>
        </div>

        {/* Reset */}
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>

        {/* Fullscreen */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const element = document.querySelector(".timeline-container")
            if (element?.requestFullscreen) {
              element.requestFullscreen()
            }
          }}
        >
          <Maximize2 className="h-4 w-4 mr-1" />
          Fullscreen
        </Button>
      </div>
    </Card>
  )
}
