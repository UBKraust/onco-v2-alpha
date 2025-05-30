"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, FileText, ImageIcon, X, Eye, AlertCircle, CheckCircle, File } from "lucide-react"
import { useDocumentUpload } from "@/hooks/useDocumentUpload"

interface FileWithPreview extends File {
  id: string
  preview?: string
  category?: string
  uploadProgress?: number
  uploadStatus?: "pending" | "uploading" | "success" | "error"
  errorMessage?: string
}

interface DocumentUploadZoneProps {
  onUploadComplete?: (files: FileWithPreview[]) => void
  maxFiles?: number
  maxFileSize?: number // in MB
  acceptedTypes?: string[]
}

export function DocumentUploadZone({
  onUploadComplete,
  maxFiles = 10,
  maxFileSize = 10,
  acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png", ".gif", ".doc", ".docx"],
}: DocumentUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [previewFile, setPreviewFile] = useState<FileWithPreview | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { uploadDocument, uploading, progress, error, clearError } = useDocumentUpload()

  const generateFileId = () => Math.random().toString(36).substr(2, 9)

  const createFilePreview = useCallback((file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.onerror = () => resolve(undefined)
        reader.readAsDataURL(file)
      } else {
        resolve(undefined)
      }
    })
  }, [])

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return {
        valid: false,
        error: `Fișierul este prea mare. Dimensiunea maximă permisă este ${maxFileSize}MB.`,
      }
    }

    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      return {
        valid: false,
        error: `Tipul de fișier nu este permis. Tipuri acceptate: ${acceptedTypes.join(", ")}`,
      }
    }

    return { valid: true }
  }

  const processFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const newFiles: FileWithPreview[] = []

      for (const file of Array.from(fileList)) {
        if (files.length + newFiles.length >= maxFiles) {
          alert(`Puteți încărca maximum ${maxFiles} fișiere odată.`)
          break
        }

        const validation = validateFile(file)
        const preview = await createFilePreview(file)

        const fileWithPreview: FileWithPreview = Object.assign(file, {
          id: generateFileId(),
          preview,
          uploadStatus: validation.valid ? ("pending" as const) : ("error" as const),
          errorMessage: validation.error,
          uploadProgress: 0,
        })

        newFiles.push(fileWithPreview)
      }

      setFiles((prev) => [...prev, ...newFiles])
    },
    [files.length, maxFiles, createFilePreview],
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files)
      }
    },
    [processFiles],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files)
    }
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const openPreview = (file: FileWithPreview) => {
    setPreviewFile(file)
    setPreviewOpen(true)
  }

  const getFileIcon = (file: FileWithPreview) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />
    } else if (file.type === "application/pdf") {
      return <FileText className="h-8 w-8 text-red-500" />
    } else {
      return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const getStatusIcon = (file: FileWithPreview) => {
    switch (file.uploadStatus) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "uploading":
        return <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      default:
        return null
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const uploadAllFiles = async () => {
    const validFiles = files.filter((file) => file.uploadStatus === "pending")

    for (const file of validFiles) {
      // Update status to uploading
      setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, uploadStatus: "uploading" as const } : f)))

      try {
        const result = await uploadDocument(file, {
          category: "other",
          type: "pdf",
          uploadedBy: "Pacient",
        })

        if (result) {
          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, uploadStatus: "success" as const } : f)))
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, uploadStatus: "error" as const, errorMessage: "Upload failed" } : f,
            ),
          )
        }
      } catch (err) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, uploadStatus: "error" as const, errorMessage: "Upload failed" } : f,
          ),
        )
      }
    }

    if (onUploadComplete) {
      onUploadComplete(files.filter((f) => f.uploadStatus === "success"))
    }
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <Card
        className={`transition-all duration-200 ${
          dragActive
            ? "border-pink-500 bg-pink-50 border-2"
            : "border-dashed border-2 border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Upload className={`h-12 w-12 mb-4 ${dragActive ? "text-pink-500" : "text-gray-400"}`} />
          <h3 className="text-lg font-semibold mb-2">
            {dragActive ? "Eliberați pentru a încărca" : "Încărcați documente medicale"}
          </h3>
          <p className="text-muted-foreground text-center mb-4">
            Trageți fișierele aici sau faceți clic pentru a selecta
            <br />
            <span className="text-sm">
              Tipuri acceptate: {acceptedTypes.join(", ")} • Max {maxFileSize}MB per fișier
            </span>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button onClick={() => fileInputRef.current?.click()} variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Selectați Fișiere
          </Button>
        </CardContent>
      </Card>

      {/* Files List */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Fișiere selectate ({files.length})</h4>
              <div className="flex gap-2">
                <Button
                  onClick={uploadAllFiles}
                  disabled={uploading || !files.some((f) => f.uploadStatus === "pending")}
                  size="sm"
                >
                  Încarcă Toate
                </Button>
                <Button onClick={() => setFiles([])} variant="outline" size="sm">
                  Șterge Toate
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">{getFileIcon(file)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{file.name}</p>
                      {getStatusIcon(file)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)} • {file.type}
                    </p>
                    {file.uploadStatus === "uploading" && (
                      <Progress value={file.uploadProgress || 0} className="mt-2" />
                    )}
                    {file.uploadStatus === "error" && file.errorMessage && (
                      <p className="text-sm text-red-600 mt-1">{file.errorMessage}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {(file.preview || file.type === "application/pdf") && (
                      <Button variant="outline" size="sm" onClick={() => openPreview(file)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => removeFile(file.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Preview: {previewFile?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            {previewFile && (
              <div className="space-y-4">
                {previewFile.preview ? (
                  <div className="flex justify-center">
                    <img
                      src={previewFile.preview || "/placeholder.svg"}
                      alt={previewFile.name}
                      className="max-w-full max-h-96 object-contain rounded-lg border"
                    />
                  </div>
                ) : previewFile.type === "application/pdf" ? (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 mx-auto text-red-500 mb-4" />
                    <p className="text-lg font-semibold">Document PDF</p>
                    <p className="text-muted-foreground">Preview-ul PDF va fi disponibil după încărcare</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <File className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                    <p className="text-lg font-semibold">Preview indisponibil</p>
                    <p className="text-muted-foreground">Acest tip de fișier nu poate fi previzualizat</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Nume fișier:</p>
                    <p className="text-muted-foreground">{previewFile.name}</p>
                  </div>
                  <div>
                    <p className="font-medium">Dimensiune:</p>
                    <p className="text-muted-foreground">{formatFileSize(previewFile.size)}</p>
                  </div>
                  <div>
                    <p className="font-medium">Tip:</p>
                    <p className="text-muted-foreground">{previewFile.type}</p>
                  </div>
                  <div>
                    <p className="font-medium">Status:</p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(previewFile)}
                      <span className="text-muted-foreground capitalize">{previewFile.uploadStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
