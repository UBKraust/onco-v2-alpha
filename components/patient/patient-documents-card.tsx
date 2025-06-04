"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Upload } from "lucide-react"

export function PatientDocumentsCard() {
  const documents = [
    {
      name: "Rezultate Analize 15.01.2025",
      type: "Analize",
      date: "15 Ian 2025",
      size: "2.4 MB",
      status: "new",
    },
    {
      name: "Plan Tratament Actualizat",
      type: "Tratament",
      date: "10 Ian 2025",
      size: "1.8 MB",
      status: "viewed",
    },
    {
      name: "Imagistică CT Torace",
      type: "Imagistică",
      date: "8 Ian 2025",
      size: "15.2 MB",
      status: "viewed",
    },
  ]

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          Documente Recente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium truncate">{doc.name}</p>
                {doc.status === "new" && <Badge className="bg-blue-100 text-blue-800 text-xs">Nou</Badge>}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span>{doc.type}</span>
                <span>•</span>
                <span>{doc.date}</span>
                <span>•</span>
                <span>{doc.size}</span>
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Încarcă
          </Button>
          <Button variant="outline" className="flex-1" size="sm">
            Vezi Toate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
