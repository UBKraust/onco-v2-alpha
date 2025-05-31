"use client"

import { useState, useCallback } from "react"

export interface AlertFilters {
  type: string[]
  category: string[]
  showResolved: boolean
  showRead: boolean
  searchTerm: string
  dateRange: {
    from: Date | null
    to: Date | null
  }
}

export function useAlertFilters() {
  const [filters, setFilters] = useState<AlertFilters>({
    type: [],
    category: [],
    showResolved: true,
    showRead: true,
    searchTerm: "",
    dateRange: {
      from: null,
      to: null,
    },
  })

  const [sortBy, setSortBy] = useState<"timestamp" | "priority" | "patient">("timestamp")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const updateFilter = useCallback((key: keyof AlertFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const toggleFilterValue = useCallback((key: "type" | "category", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      type: [],
      category: [],
      showResolved: true,
      showRead: true,
      searchTerm: "",
      dateRange: {
        from: null,
        to: null,
      },
    })
  }, [])

  const hasActiveFilters =
    filters.type.length > 0 ||
    filters.category.length > 0 ||
    !filters.showResolved ||
    !filters.showRead ||
    filters.searchTerm.length > 0 ||
    filters.dateRange.from ||
    filters.dateRange.to

  return {
    filters,
    sortBy,
    sortOrder,
    updateFilter,
    toggleFilterValue,
    clearFilters,
    setSortBy,
    setSortOrder,
    hasActiveFilters,
  }
}
