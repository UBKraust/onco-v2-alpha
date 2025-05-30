"use client"

import { useState, useCallback } from "react"
import type { MedicalDocument } from "@/types/medical-record"

interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

interface UploadError {
  code: string
  message: string
}

export function useDocumentUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<UploadProgress>({ loaded: 0, total: 0, percentage: 0 })
  const [error, setError] = useState<UploadError | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<MedicalDocument[]>([])

  const validateFile = (file: File): UploadError | null => {
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return {
        code: "FILE_TOO_LARGE",
        message: "Fișierul este prea mare. Dimensiunea maximă permisă este 10MB.",
      }
    }

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      return {
        code: "INVALID_FILE_TYPE",
        message: "Tipul de fișier nu este permis. Sunt acceptate: PDF, JPG, PNG, GIF, DOC, DOCX.",
      }
    }

    return null
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const uploadDocument = useCallback(
    async (
      file: File,
      metadata: {
        category: MedicalDocument["category"]
        type: MedicalDocument["type"]
        uploadedBy: string
        tags?: string[]
      },
    ): Promise<MedicalDocument | null> => {
      // Validate file
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return null
      }

      setUploading(true)
      setProgress({ loaded: 0, total: file.size, percentage: 0 })
      setError(null)

      try {
        // Simulate file upload with realistic progress
        const totalSteps = 20
        const stepSize = file.size / totalSteps

        for (let i = 0; i <= totalSteps; i++) {
          await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200))

          const loaded = Math.min(i * stepSize, file.size)
          const percentage = Math.round((loaded / file.size) * 100)

          setProgress({
            loaded,
            total: file.size,
            percentage,
          })
        }

        // Create document object
        const newDocument: MedicalDocument = {
          id: Date.now().toString(),
          name: file.name,
          type: metadata.type,
          category: metadata.category,
          date: new Date().toISOString().split("T")[0],
          uploadedBy: metadata.uploadedBy,
          size: formatFileSize(file.size),
          url: URL.createObjectURL(file), // In real app, this would be server URL
          isNew: true,
          tags: metadata.tags || [],
        }

        setUploadedFiles((prev) => [newDocument, ...prev])
        setUploading(false)

        return newDocument
      } catch (err) {
        const uploadError: UploadError = {
          code: "UPLOAD_FAILED",
          message: "Încărcarea fișierului a eșuat. Vă rugăm să încercați din nou.",
        }
        setError(uploadError)
        setUploading(false)
        return null
      }
    },
    [],
  )

  const uploadMultipleDocuments = useCallback(
    async (
      files: File[],
      metadata: {
        category: MedicalDocument["category"]
        type: MedicalDocument["type"]
        uploadedBy: string
        tags?: string[]
      },
    ): Promise<MedicalDocument[]> => {
      const uploadedDocs: MedicalDocument[] = []

      for (const file of files) {
        const doc = await uploadDocument(file, metadata)
        if (doc) {
          uploadedDocs.push(doc)
        }
      }

      return uploadedDocs
    },
    [uploadDocument],
  )

  const cancelUpload = useCallback(() => {
    setUploading(false)
    setProgress({ loaded: 0, total: 0, percentage: 0 })
    setError(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const removeUploadedFile = useCallback((fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }, [])

  return {
    uploadDocument,
    uploadMultipleDocuments,
    cancelUpload,
    clearError,
    removeUploadedFile,
    uploading,
    progress,
    error,
    uploadedFiles,
    validateFile,
  }
}
