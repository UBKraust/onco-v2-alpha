"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Download, Eye, Calendar, FileImage, FileSpreadsheet, File } from "lucide-react"

export function PatientDocumentsCard() {
  const recentDocuments = [
    {
      id: 1,
      name: "Rezultate Analize - Ianuarie 2025",
      type: "Analize Laborator",
      date: "14 Ian 2025",
      size: "2.4 MB",
      format: "PDF",
      status: "Nou",
      isImportant: true,
      icon: FileText,
      color: "text-red-600",
    },
    {
      id: 2,
      name: "Imagistică CT Torace",
      type: "Imagistică",
      date: "10 Ian 2025",
      size: "15.2 MB",
      format: "DICOM",
      status: "Vizualizat",
      isImportant: true,
      icon: FileImage,
      color: "text-blue-600",
    },
    {
      id: 3,
      name: "Raport Consultație Oncologie",
      type: "Consultație",
      date: "8 Ian 2025",
      size: "1.1 MB",
      format: "PDF",
      status: "Vizualizat",
      isImportant: false,
      icon: FileText,
      color: "text-green-600",
    },
    {
      id: 4,
      name: "Plan Tratament Actualizat",
      type: "Plan Tratament",
      date: "5 Ian 2025",
      size: "856 KB",
      format: "PDF",
      status: "Vizualizat",
      isImportant: true,
      icon: FileSpreadsheet,
      color: "text-purple-600",
    },
    {
      id: 5,
      name: "Formular Consimțământ",
      type: "Documente Administrative",
      date: "3 Ian 2025",
      size: "445 KB",
      format: "PDF",
      status: "Semnat",
      isImportant: false,
      icon: File,
      color: "text-gray-600",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nou":
        return "bg-red-100 text-red-800 border-red-200"
      case "Vizualizat":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Semnat":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const documentStats = {
    total: 24,
    newDocuments: 3,
    pendingReview: 2,
    totalSize: "156 MB",
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Documente Recente
          </CardTitle>
          <Button size="sm" className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            Încarcă
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Documents Overview */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-lg font-bold text-blue-600">{documentStats.total}</div>
              <div className="text-blue-700 dark:text-blue-300">Total documente</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">{documentStats.newDocuments}</div>
              <div className="text-blue-700 dark:text-blue-300">Documente noi</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-600">Spațiu utilizat: {documentStats.totalSize}</div>
        </div>

        {/* Recent Documents List */}
        <div className="space-y-3">
          {recentDocuments.slice(0, 4).map((doc) => {
            const IconComponent = doc.icon
            return (
              <div
                key={doc.id}
                className={`p-3 rounded-lg border transition-all hover:shadow-sm ${
                  doc.isImportant
                    ? "border-orange-200 bg-orange-50 dark:bg-orange-900/10"
                    : "border-gray-200 bg-white dark:bg-gray-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <IconComponent className={`h-5 w-5 mt-0.5 ${doc.color}`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate pr-2">{doc.name}</h4>
                      <Badge variant="outline" className={`${getStatusColor(doc.status)} text-xs shrink-0`}>
                        {doc.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {doc.type} • {doc.format} • {doc.size}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3" />
                        {doc.date}
                      </div>

                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Upload Categories */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <h5 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Încarcă Rapid:</h5>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Analize", icon: FileText },
              { name: "Imagistică", icon: FileImage },
              { name: "Rețete", icon: File },
              { name: "Alte Doc.", icon: FileText },
            ].map((category) => {
              const IconComponent = category.icon
              return (
                <Button key={category.name} variant="outline" size="sm" className="flex items-center gap-1 text-xs">
                  <IconComponent className="h-3 w-3" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Vezi Toate
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Organizează
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
