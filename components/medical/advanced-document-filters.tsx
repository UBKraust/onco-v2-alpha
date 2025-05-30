"use client"

import React from "react"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, SortAsc, SortDesc, Tag, User, RotateCcw, ChevronDown } from "lucide-react"
import type { MedicalDocument } from "@/types/medical-record"

interface FilterState {
  searchTerm: string
  categories: string[]
  types: string[]
  dateRange: { from?: Date; to?: Date } | undefined
  uploadedBy: string[]
  tags: string[]
  status: string[]
  sizeRange: { min: number; max: number }
}

interface SortState {
  field: "date" | "name" | "size" | "relevance" | "uploadedBy"
  direction: "asc" | "desc"
  secondary?: {
    field: "date" | "name" | "size"
    direction: "asc" | "desc"
  }
}

interface AdvancedDocumentFiltersProps {
  documents: MedicalDocument[]
  onFilteredDocuments: (filtered: MedicalDocument[]) => void
  onFiltersChange?: (filters: FilterState) => void
  onSortChange?: (sort: SortState) => void
}

export function AdvancedDocumentFilters({
  documents = [],
  onFilteredDocuments,
  onFiltersChange,
  onSortChange,
}: AdvancedDocumentFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    categories: [],
    types: [],
    dateRange: undefined,
    uploadedBy: [],
    tags: [],
    status: [],
    sizeRange: { min: 0, max: 100 },
  })

  const [sort, setSort] = useState<SortState>({
    field: "date",
    direction: "desc",
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    if (!documents || documents.length === 0) {
      return { categories: [], types: [], uploadedBy: [], tags: [], status: [] }
    }

    const categories = [...new Set(documents.map((doc) => doc?.category).filter(Boolean))]
    const types = [...new Set(documents.map((doc) => doc?.type).filter(Boolean))]
    const uploadedBy = [...new Set(documents.map((doc) => doc?.uploadedBy).filter(Boolean))]
    const tags = [...new Set(documents.flatMap((doc) => doc?.tags || []).filter(Boolean))]
    const status = [...new Set(documents.map((doc) => (doc?.isNew ? "new" : "read")))]

    return { categories, types, uploadedBy, tags, status }
  }, [documents])

  // Fuzzy search function with null checks
  const fuzzySearch = (text: string | undefined, searchTerm: string | undefined): number => {
    if (!searchTerm || !text) return searchTerm ? 0 : 1

    const term = searchTerm.toLowerCase()
    const target = text.toLowerCase()

    // Exact match gets highest score
    if (target.includes(term)) return 1

    // Character-by-character fuzzy matching
    let score = 0
    let termIndex = 0

    for (let i = 0; i < target.length && termIndex < term.length; i++) {
      if (target[i] === term[termIndex]) {
        score++
        termIndex++
      }
    }

    return termIndex === term.length ? score / term.length : 0
  }

  // Apply filters and sorting
  const filteredAndSortedDocuments = useMemo(() => {
    if (!documents || documents.length === 0) {
      return []
    }

    let filtered = documents.filter((doc) => {
      if (!doc) return false

      // Search term (fuzzy search in name, uploadedBy, tags)
      if (filters.searchTerm) {
        const searchScore =
          fuzzySearch(doc.name, filters.searchTerm) +
          fuzzySearch(doc.uploadedBy, filters.searchTerm) +
          (doc.tags?.reduce((acc, tag) => acc + fuzzySearch(tag, filters.searchTerm), 0) || 0)

        if (searchScore === 0) return false
      }

      // Categories
      if (filters.categories.length > 0 && (!doc.category || !filters.categories.includes(doc.category))) {
        return false
      }

      // Types
      if (filters.types.length > 0 && (!doc.type || !filters.types.includes(doc.type))) {
        return false
      }

      // Date range
      if (filters.dateRange?.from || filters.dateRange?.to) {
        if (!doc.date) return false
        const docDate = new Date(doc.date)
        if (filters.dateRange.from && docDate < filters.dateRange.from) return false
        if (filters.dateRange.to && docDate > filters.dateRange.to) return false
      }

      // Uploaded by
      if (filters.uploadedBy.length > 0 && (!doc.uploadedBy || !filters.uploadedBy.includes(doc.uploadedBy))) {
        return false
      }

      // Tags
      if (filters.tags.length > 0) {
        const docTags = doc.tags || []
        if (!filters.tags.some((tag) => docTags.includes(tag))) {
          return false
        }
      }

      // Status
      if (filters.status.length > 0) {
        const docStatus = doc.isNew ? "new" : "read"
        if (!filters.status.includes(docStatus)) {
          return false
        }
      }

      // Size range
      if (doc.size) {
        const sizeInMB = Number.parseFloat(doc.size.replace(/[^\d.]/g, "")) || 0
        if (sizeInMB < filters.sizeRange.min || sizeInMB > filters.sizeRange.max) {
          return false
        }
      }

      return true
    })

    // Add relevance score for search
    if (filters.searchTerm) {
      filtered = filtered.map((doc) => ({
        ...doc,
        relevanceScore:
          fuzzySearch(doc.name, filters.searchTerm) +
          fuzzySearch(doc.uploadedBy, filters.searchTerm) +
          (doc.tags?.reduce((acc, tag) => acc + fuzzySearch(tag, filters.searchTerm), 0) || 0),
      }))
    }

    // Sort documents
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sort.field) {
        case "date":
          const dateA = a.date ? new Date(a.date).getTime() : 0
          const dateB = b.date ? new Date(b.date).getTime() : 0
          comparison = dateA - dateB
          break
        case "name":
          comparison = (a.name || "").localeCompare(b.name || "")
          break
        case "size":
          const sizeA = a.size ? Number.parseFloat(a.size.replace(/[^\d.]/g, "")) || 0 : 0
          const sizeB = b.size ? Number.parseFloat(b.size.replace(/[^\d.]/g, "")) || 0 : 0
          comparison = sizeA - sizeB
          break
        case "relevance":
          comparison = (a.relevanceScore || 0) - (b.relevanceScore || 0)
          break
        case "uploadedBy":
          comparison = (a.uploadedBy || "").localeCompare(b.uploadedBy || "")
          break
      }

      if (comparison === 0 && sort.secondary) {
        switch (sort.secondary.field) {
          case "date":
            const dateA = a.date ? new Date(a.date).getTime() : 0
            const dateB = b.date ? new Date(b.date).getTime() : 0
            comparison = dateA - dateB
            break
          case "name":
            comparison = (a.name || "").localeCompare(b.name || "")
            break
          case "size":
            const sizeA = a.size ? Number.parseFloat(a.size.replace(/[^\d.]/g, "")) || 0 : 0
            const sizeB = b.size ? Number.parseFloat(b.size.replace(/[^\d.]/g, "")) || 0 : 0
            comparison = sizeA - sizeB
            break
        }
        comparison = sort.secondary.direction === "asc" ? comparison : -comparison
      }

      return sort.direction === "asc" ? comparison : -comparison
    })

    return filtered
  }, [documents, filters, sort])

  // Update filtered documents when they change
  React.useEffect(() => {
    if (onFilteredDocuments) {
      onFilteredDocuments(filteredAndSortedDocuments)
    }
  }, [filteredAndSortedDocuments, onFilteredDocuments])

  // Notify parent components of changes
  React.useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters)
    }
  }, [filters, onFiltersChange])

  React.useEffect(() => {
    if (onSortChange) {
      onSortChange(sort)
    }
  }, [sort, onSortChange])

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const toggleArrayFilter = <K extends keyof FilterState>(key: K, value: string) => {
    setFilters((prev) => {
      const currentArray = prev[key] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value]
      return { ...prev, [key]: newArray }
    })
  }

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      categories: [],
      types: [],
      dateRange: undefined,
      uploadedBy: [],
      tags: [],
      status: [],
      sizeRange: { min: 0, max: 100 },
    })
  }

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.searchTerm) count++
    if (filters.categories.length > 0) count++
    if (filters.types.length > 0) count++
    if (filters.dateRange?.from || filters.dateRange?.to) count++
    if (filters.uploadedBy.length > 0) count++
    if (filters.tags.length > 0) count++
    if (filters.status.length > 0) count++
    if (filters.sizeRange.min > 0 || filters.sizeRange.max < 100) count++
    return count
  }, [filters])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtrare și Sortare Documente
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                {activeFiltersCount} filtre active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
              <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
              {showAdvanced ? "Ascunde" : "Avansate"}
            </Button>
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <RotateCcw className="h-4 w-4" />
                Resetează
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Search and Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută în documente..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={sort.field} onValueChange={(value) => setSort((prev) => ({ ...prev, field: value as any }))}>
            <SelectTrigger>
              <SelectValue placeholder="Sortează după" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Data</SelectItem>
              <SelectItem value="name">Nume</SelectItem>
              <SelectItem value="size">Dimensiune</SelectItem>
              <SelectItem value="uploadedBy">Încărcat de</SelectItem>
              {filters.searchTerm && <SelectItem value="relevance">Relevanță</SelectItem>}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSort((prev) => ({ ...prev, direction: prev.direction === "asc" ? "desc" : "asc" }))}
              className="flex-1"
            >
              {sort.direction === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              {sort.direction === "asc" ? "Crescător" : "Descrescător"}
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Categories */}
              <div className="space-y-2">
                <Label>Categorii</Label>
                <div className="space-y-2">
                  {filterOptions.categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => toggleArrayFilter("categories", category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Types */}
              <div className="space-y-2">
                <Label>Tipuri</Label>
                <div className="space-y-2">
                  {filterOptions.types.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.types.includes(type)}
                        onCheckedChange={() => toggleArrayFilter("types", type)}
                      />
                      <Label htmlFor={`type-${type}`} className="text-sm">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-new"
                      checked={filters.status.includes("new")}
                      onCheckedChange={() => toggleArrayFilter("status", "new")}
                    />
                    <Label htmlFor="status-new" className="text-sm">
                      Documente noi
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-read"
                      checked={filters.status.includes("read")}
                      onCheckedChange={() => toggleArrayFilter("status", "read")}
                    />
                    <Label htmlFor="status-read" className="text-sm">
                      Documente citite
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {filterOptions.tags.length > 0 && (
              <div className="space-y-2">
                <Label>Tag-uri</Label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={filters.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayFilter("tags", tag)}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Uploaded By */}
            <div className="space-y-2">
              <Label>Încărcat de</Label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.uploadedBy.map((person) => (
                  <Badge
                    key={person}
                    variant={filters.uploadedBy.includes(person) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleArrayFilter("uploadedBy", person)}
                  >
                    <User className="h-3 w-3 mr-1" />
                    {person}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
          <span>
            {filteredAndSortedDocuments.length} din {documents.length} documente
          </span>
          {filters.searchTerm && <span>Căutare pentru: "{filters.searchTerm}"</span>}
        </div>
      </CardContent>
    </Card>
  )
}
