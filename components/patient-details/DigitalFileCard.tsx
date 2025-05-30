"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Search, Filter, Download, Upload, Camera, Eye } from "lucide-react"
import { useMockPatient } from "@/hooks/useMockPatient"

interface DigitalFileCardProps {
  patientId: string
}

export function DigitalFileCard({ patientId }: DigitalFileCardProps) {
  const patient = useMockPatient(patientId)

  if (!patient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dosarul Digital
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Se încarcă datele...</p>
        </CardContent>
      </Card>
    )
  }

  // Mock data - în viitor va fi înlocuit cu hook real
  const fileData = {
    completion: {
      completed: 12,
      total: 24,
      percentage: 50,
    },
    recentDocuments: [
      {
        id: "1",
        name: "Analize sanguine",
        date: "10.11.2024",
        type: "analysis",
      },
      {
        id: "2",
        name: "Imagistică CT",
        date: "08.11.2024",
        type: "imaging",
      },
      {
        id: "3",
        name: "Raport histopatologic",
        date: "05.11.2024",
        type: "report",
      },
    ],
    categories: [
      { name: "Analize", count: 8, total: 12 },
      { name: "Imagistică", count: 3, total: 6 },
      { name: "Rapoarte", count: 1, total: 6 },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Dosarul Digital
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Status Completare */}
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium">Completare dosar</h4>
                <p className="text-sm text-gray-600">{fileData.completion.percentage}% completat</p>
              </div>
            </div>
            <div className="text-right">
              <Progress value={fileData.completion.percentage} className="w-24 h-2 mb-1" />
              <p className="text-xs text-gray-600">
                {fileData.completion.completed}/{fileData.completion.total} documente
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Documente Recente */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Documente Recente</h4>
              <div className="space-y-1">
                {fileData.recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm"
                  >
                    <span>
                      {doc.name} - {doc.date}
                    </span>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Acțiuni Rapide */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Acțiuni Rapide</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Încarcă Document
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Camera className="h-4 w-4 mr-2" />
                  Scanează Document
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Categorii Documente */}
          <div>
            <h4 className="font-medium text-sm mb-2">Progres pe Categorii</h4>
            <div className="space-y-2">
              {fileData.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{category.name}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(category.count / category.total) * 100} className="w-16 h-1" />
                    <span className="text-xs text-gray-600">
                      {category.count}/{category.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
