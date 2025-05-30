"use client"

import { useState, useEffect } from "react"
import type { MedicalDocument } from "@/types/medical-record"

export function useMedicalDocuments(patientId?: string) {
  const [documents, setDocuments] = useState<MedicalDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Mock documents data
  const mockDocuments: MedicalDocument[] = [
    {
      id: "1",
      name: "Rezultate CT Abdomen",
      type: "pdf",
      category: "imaging",
      date: "2024-01-20",
      uploadedBy: "Dr. Alex Radiolog",
      size: "2.4 MB",
      url: "/documents/ct-abdomen.pdf",
      isNew: true,
      tags: ["CT", "abdomen", "control"],
    },
    {
      id: "2",
      name: "Analize Sânge Complete",
      type: "pdf",
      category: "test-results",
      date: "2024-01-18",
      uploadedBy: "Laborator Central",
      size: "1.2 MB",
      url: "/documents/analize-sange.pdf",
      isNew: false,
      tags: ["hemograma", "biochimie"],
    },
    {
      id: "3",
      name: "Raport Consultație Oncologie",
      type: "report",
      category: "report",
      date: "2024-01-15",
      uploadedBy: "Dr. Elena Oncolog",
      size: "856 KB",
      url: "/documents/raport-consultatie.pdf",
      isNew: false,
      tags: ["consultație", "oncologie"],
    },
    {
      id: "4",
      name: "Scrisoare Medicală",
      type: "report",
      category: "discharge",
      date: "2024-01-12",
      uploadedBy: "Dr. Radu Internist",
      size: "1.1 MB",
      url: "/documents/scrisoare-medicala.pdf",
      isNew: false,
      tags: ["externare", "recomandări"],
    },
    {
      id: "5",
      name: "Rețetă Medicală",
      type: "pdf",
      category: "prescription",
      date: "2024-01-10",
      uploadedBy: "Dr. Elena Oncolog",
      size: "245 KB",
      url: "/documents/reteta.pdf",
      isNew: false,
      tags: ["rețetă", "medicație"],
    },
  ]

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setDocuments(mockDocuments)
        setError(null)
      } catch (err) {
        setError("Failed to fetch documents")
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [patientId])

  // Filter and sort documents
  const filteredAndSortedDocuments = documents
    .filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.tags && doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())))

      const matchesCategory = selectedCategory ? doc.category === selectedCategory : true

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "size":
          const sizeA = Number.parseFloat(a.size.replace(/[^\d.]/g, ""))
          const sizeB = Number.parseFloat(b.size.replace(/[^\d.]/g, ""))
          comparison = sizeA - sizeB
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

  const addDocument = (document: Omit<MedicalDocument, "id" | "isNew">) => {
    const newDocument: MedicalDocument = {
      ...document,
      id: Date.now().toString(),
      isNew: true,
    }
    setDocuments((prev) => [newDocument, ...prev])
  }

  const deleteDocument = (documentId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
  }

  const markAsRead = (documentId: string) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === documentId ? { ...doc, isNew: false } : doc)))
  }

  const getDocumentsByCategory = (category: string) => {
    return documents.filter((doc) => doc.category === category)
  }

  const getRecentDocuments = (days = 7) => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    return documents.filter((doc) => new Date(doc.date) >= cutoffDate)
  }

  return {
    documents: filteredAndSortedDocuments,
    allDocuments: documents,
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
    getDocumentsByCategory,
    getRecentDocuments,
  }
}
