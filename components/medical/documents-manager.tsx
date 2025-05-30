"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Upload } from "lucide-react"
import type { MedicalDocument } from "@/types/medical-record"

interface DocumentsManagerProps {
  documents: MedicalDocument[]
  onAddDocument: (document: Omit<MedicalDocument, "id" | "isNew">) => void
  compact?: boolean
  showViewAll?: boolean
}

export function DocumentsManager({
  documents,
  onAddDocument,
  compact = false,
  showViewAll = false,
}: DocumentsManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const getDocumentTypeIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-blue-500" />
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documente Medicale
          </CardTitle>
          {showViewAll && (
            <Button variant="outline" size="sm">
              Vezi toate
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {documents.length === 0 ? (
          <div className="text-center py-4">
            <p>Nu există documente disponibile.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getDocumentTypeIcon(doc.type)}
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {doc.isNew && <Badge>Nou</Badge>}
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!compact && (
          <Button className="w-full mt-4">
            <Upload className="mr-2 h-4 w-4" />
            Încarcă Document
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
