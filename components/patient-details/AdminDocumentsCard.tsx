"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clipboard, Upload, AlertTriangle, CheckCircle, Clock, Eye, Download } from "lucide-react"
import { useMockAdminDocuments } from "@/hooks/useMockAdminDocuments"

interface AdminDocumentsCardProps {
  patientId: string
}

export function AdminDocumentsCard({ patientId }: AdminDocumentsCardProps) {
  const documentsData = useMockAdminDocuments(patientId)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clipboard className="h-5 w-5" />
          Documente Administrative
          <Button size="sm" variant="outline" className="ml-auto">
            <Upload className="h-4 w-4 mr-1" />
            Încarcă
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Status Documente</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Complete:</span>
                  <span className="font-medium text-green-600">
                    {documentsData.completed}/{documentsData.total}
                  </span>
                </div>
                <Progress value={documentsData.completionPercentage} className="h-2" />
                <p className="text-xs text-blue-600">{documentsData.completionPercentage}% completare</p>
              </div>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Acțiuni Necesare</h4>
              <div className="space-y-1 text-sm">
                {documentsData.pendingActions.map((action, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-orange-500" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Documente Disponibile</h4>
            <div className="space-y-2">
              {documentsData.documents.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(document.status)}
                    <span className="text-sm">{document.name}</span>
                  </div>
                  <div className="flex gap-2">
                    {document.status === "complete" ? (
                      <>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="ghost">
                        <Upload className="h-3 w-3" />
                      </Button>
                    )}
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
