"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, Settings, Calendar, User, Printer } from "lucide-react"
import type { MedicalEvent } from "@/types/medical-record"

interface TimelinePDFExportProps {
  events: MedicalEvent[]
  patientName: string
  patientId: string
}

export function TimelinePDFExport({ events, patientName, patientId }: TimelinePDFExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportOptions, setExportOptions] = useState({
    includeImages: true,
    includeDetails: true,
    includeNotes: true,
    groupByMonth: false,
    colorCoded: true,
    pageBreaks: true,
  })

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    // Simulare export PDF
    const steps = [
      { message: "Pregătire date...", progress: 20 },
      { message: "Generare layout...", progress: 40 },
      { message: "Procesare imagini...", progress: 60 },
      { message: "Formatare document...", progress: 80 },
      { message: "Finalizare PDF...", progress: 100 },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setExportProgress(step.progress)
    }

    // Simulare download
    const blob = new Blob(["PDF content"], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `istoric-medical-${patientName.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsExporting(false)
    setExportProgress(0)
  }

  const eventsByType = events.reduce(
    (acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-pink-600" />
            Export Istoric Medical PDF
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informații pacient */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <User className="h-4 w-4" />
                Informații Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Pacient:</span>
                <span className="font-medium">{patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ID Pacient:</span>
                <span className="font-medium">{patientId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total evenimente:</span>
                <span className="font-medium">{events.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Perioada:</span>
                <span className="font-medium">
                  {events.length > 0 &&
                    `${new Date(Math.min(...events.map((e) => new Date(e.date).getTime()))).toLocaleDateString("ro-RO")} - ${new Date(Math.max(...events.map((e) => new Date(e.date).getTime()))).toLocaleDateString("ro-RO")}`}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Statistici evenimente */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Distribuție Evenimente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(eventsByType).map(([type, count]) => (
                  <div key={type} className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="capitalize">{type}:</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Opțiuni export */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Opțiuni Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeImages"
                    checked={exportOptions.includeImages}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, includeImages: checked as boolean }))
                    }
                  />
                  <Label htmlFor="includeImages" className="text-sm">
                    Include imagini
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeDetails"
                    checked={exportOptions.includeDetails}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, includeDetails: checked as boolean }))
                    }
                  />
                  <Label htmlFor="includeDetails" className="text-sm">
                    Include detalii
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeNotes"
                    checked={exportOptions.includeNotes}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, includeNotes: checked as boolean }))
                    }
                  />
                  <Label htmlFor="includeNotes" className="text-sm">
                    Include note
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="groupByMonth"
                    checked={exportOptions.groupByMonth}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, groupByMonth: checked as boolean }))
                    }
                  />
                  <Label htmlFor="groupByMonth" className="text-sm">
                    Grupează pe luni
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="colorCoded"
                    checked={exportOptions.colorCoded}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, colorCoded: checked as boolean }))
                    }
                  />
                  <Label htmlFor="colorCoded" className="text-sm">
                    Codificare culori
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pageBreaks"
                    checked={exportOptions.pageBreaks}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, pageBreaks: checked as boolean }))
                    }
                  />
                  <Label htmlFor="pageBreaks" className="text-sm">
                    Pauze de pagină
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress și acțiuni */}
          {isExporting && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Generare PDF...</span>
                    <span>{exportProgress}%</span>
                  </div>
                  <Progress value={exportProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" disabled={isExporting}>
              <Printer className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleExport} disabled={isExporting} className="bg-pink-600 hover:bg-pink-700">
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Exportare..." : "Descarcă PDF"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
