"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, Check, X, AlertTriangle, Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocumentRequirement {
  id: string
  name: string
  description: string
  isRequired: boolean
  status: "pending" | "uploaded" | "verified" | "rejected"
  uploadedFile?: {
    name: string
    size: string
    uploadDate: string
  }
  rejectionReason?: string
}

interface AppointmentRequirementsManagerProps {
  appointmentId: string
  requirements: DocumentRequirement[]
  onDocumentUpload?: (requirementId: string, file: File) => void
  onDocumentRemove?: (requirementId: string) => void
  isReadOnly?: boolean
}

export function AppointmentRequirementsManager({
  appointmentId,
  requirements,
  onDocumentUpload,
  onDocumentRemove,
  isReadOnly = false,
}: AppointmentRequirementsManagerProps) {
  const [uploadingId, setUploadingId] = useState<string | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploaded":
        return <Upload className="h-4 w-4 text-blue-600" />
      case "verified":
        return <Check className="h-4 w-4 text-green-600" />
      case "rejected":
        return <X className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-amber-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "uploaded":
        return <Badge variant="secondary">Încărcat</Badge>
      case "verified":
        return (
          <Badge variant="default" className="bg-green-600">
            Verificat
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Respins</Badge>
      default:
        return <Badge variant="outline">În așteptare</Badge>
    }
  }

  const handleFileUpload = async (requirementId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingId(requirementId)

    try {
      // Simulăm upload-ul
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onDocumentUpload?.(requirementId, file)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploadingId(null)
    }
  }

  const completedRequirements = requirements.filter((req) => req.status === "verified").length
  const totalRequirements = requirements.filter((req) => req.isRequired).length
  const progressPercentage = totalRequirements > 0 ? (completedRequirements / totalRequirements) * 100 : 100

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Documente Necesare</CardTitle>
            <Badge variant={progressPercentage === 100 ? "default" : "secondary"}>
              {completedRequirements}/{totalRequirements} completate
            </Badge>
          </div>
          <CardDescription>Progres documente: {Math.round(progressPercentage)}%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                progressPercentage === 100 ? "bg-green-600" : "bg-primary",
              )}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Requirements List */}
      <div className="space-y-3">
        {requirements.map((requirement) => (
          <Card
            key={requirement.id}
            className={cn(
              "transition-all duration-200",
              requirement.status === "verified" &&
                "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20",
              requirement.status === "rejected" && "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20",
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(requirement.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-sm">{requirement.name}</CardTitle>
                      {requirement.isRequired && (
                        <Badge variant="outline" className="text-xs">
                          Obligatoriu
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-xs mt-1">{requirement.description}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(requirement.status)}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {requirement.status === "pending" && !isReadOnly && (
                <div className="space-y-2">
                  <input
                    type="file"
                    id={`file-${requirement.id}`}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => handleFileUpload(requirement.id, e)}
                    disabled={uploadingId === requirement.id}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById(`file-${requirement.id}`)?.click()}
                    disabled={uploadingId === requirement.id}
                    className="w-full"
                  >
                    {uploadingId === requirement.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                        Se încarcă...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Încarcă Document
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Formate acceptate: PDF, JPG, PNG, DOC, DOCX (max 10MB)
                  </p>
                </div>
              )}

              {requirement.uploadedFile && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{requirement.uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {requirement.uploadedFile.size} • {requirement.uploadedFile.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {!isReadOnly && requirement.status !== "verified" && (
                      <Button variant="ghost" size="sm" onClick={() => onDocumentRemove?.(requirement.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {requirement.status === "rejected" && requirement.rejectionReason && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <X className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-900 dark:text-red-100">Document respins</p>
                      <p className="text-sm text-red-700 dark:text-red-200">{requirement.rejectionReason}</p>
                    </div>
                  </div>
                </div>
              )}

              {requirement.status === "verified" && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-700 dark:text-green-200">Document verificat și aprobat</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {requirements.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Nu sunt necesare documente pentru această programare</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
