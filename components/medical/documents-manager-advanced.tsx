"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  FileText,
  Upload,
  Search,
  Download,
  Eye,
  Trash2,
  MoreVertical,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react"
import { useMedicalDocuments } from "@/hooks/useMedicalDocuments"
import { useDocumentUpload } from "@/hooks/useDocumentUpload"
import type { MedicalDocument } from "@/types/medical-record"

interface DocumentsManagerAdvancedProps {
  patientId?: string
  showUpload?: boolean
}

export function DocumentsManagerAdvanced({ patientId, showUpload = true }: DocumentsManagerAdvancedProps) {
  const {
    documents,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    addDocument,
    deleteDocument,
    markAsRead,
  } = useMedicalDocuments(patientId)

  const { uploadDocument, uploading, progress, error: uploadError, clearError } = useDocumentUpload()

  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const categories = [
    { value: "test-results", label: "Rezultate Analize" },
    { value: "imaging", label: "Imagistică" },
    { value: "prescription", label: "Rețete" },
    { value: "report", label: "Rapoarte Medicale" },
    { value: "discharge", label: "Bilete Externare" },
    { value: "other", label: "Altele" },
  ]

  const getCategoryLabel = (category: string) => {
    return categories.find((cat) => cat.value === category)?.label || category
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "test-results":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "imaging":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "prescription":
        return "bg-green-100 text-green-800 border-green-200"
      case "report":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "discharge":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      setSelectedFiles(files)
      setUploadDialogOpen(true)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setSelectedFiles(files)
      setUploadDialogOpen(true)
    }
  }

  const handleUpload = async (category: string, type: string) => {
    for (const file of selectedFiles) {
      const document = await uploadDocument(file, {
        category: category as MedicalDocument["category"],
        type: type as MedicalDocument["type"],
        uploadedBy: "Pacient", // In real app, this would be current user
      })

      if (document) {
        addDocument(document)
      }
    }

    setSelectedFiles([])
    setUploadDialogOpen(false)
  }

  const handleDownload = (document: MedicalDocument) => {
    // In a real app, this would download the file from the server
    const link = document.createElement("a")
    link.href = document.url
    link.download = document.name
    link.click()
  }

  const handleDelete = (documentId: string) => {
    if (confirm("Sunteți sigur că doriți să ștergeți acest document?")) {
      deleteDocument(documentId)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p>Se încarcă documentele...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documente Medicale
        </CardTitle>
        <CardDescription>Gestionați documentele medicale ale pacientului</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        {showUpload && (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive ? "border-pink-500 bg-pink-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Trageți fișierele aici sau faceți clic pentru a selecta
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                Selectați Fișiere
              </Button>
            </label>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută documente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value || null)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Toate categoriile" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate categoriile</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as "date" | "name" | "size")}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Data</SelectItem>
              <SelectItem value="name">Nume</SelectItem>
              <SelectItem value="size">Dimensiune</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nu există documente</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory
                  ? "Nu au fost găsite documente care să corespundă criteriilor de căutare."
                  : "Nu au fost încărcate documente încă."}
              </p>
            </div>
          ) : (
            documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-pink-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{document.name}</h3>
                      {document.isNew && <Badge className="bg-red-500 text-white">Nou</Badge>}
                      <Badge variant="outline" className={getCategoryColor(document.category)}>
                        {getCategoryLabel(document.category)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{document.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{document.uploadedBy}</span>
                      </div>
                      <span>{document.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleDownload(document)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => markAsRead(document.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Marchează ca citit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(document.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Șterge
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Upload Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Încărcare Documente</DialogTitle>
              <DialogDescription>Selectați categoria și tipul pentru documentele selectate</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedFiles.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Fișiere selectate:</p>
                  <ul className="space-y-1">
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Categorie</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectați categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Tip</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectați tipul" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="image">Imagine</SelectItem>
                      <SelectItem value="report">Raport</SelectItem>
                      <SelectItem value="other">Altul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Se încarcă...</span>
                    <span className="text-sm">{progress.percentage}%</span>
                  </div>
                  <Progress value={progress.percentage} />
                </div>
              )}

              {uploadError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-700">{uploadError.message}</span>
                  <Button variant="ghost" size="sm" onClick={clearError}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => handleUpload("test-results", "pdf")}
                  disabled={uploading || selectedFiles.length === 0}
                  className="flex-1"
                >
                  Încarcă Documente
                </Button>
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Anulează
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
