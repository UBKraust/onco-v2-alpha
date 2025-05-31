"use client"

import { useState, useMemo } from "react"

export interface AlertFilters {
  searchTerm: string
  type: string[]
  category: string[]
  dateRange: {
    from: Date | null
    to: Date | null
  }
  showResolved: boolean
  showRead: boolean
  assignedTo: string[]
  escalationLevel: number | null
}

const initialFilters: AlertFilters = {
  searchTerm: "",
  type: [],
  category: [],
  dateRange: {
    from: null,
    to: null,
  },
  showResolved: false,
  showRead: true,
  assignedTo: [],
  escalationLevel: null,
}

export function useAlertFilters() {
  const [filters, setFilters] = useState<AlertFilters>(initialFilters)
  const [sortBy, setSortBy] = useState("timestamp")
  const [sortOrder, setSortOrder] = useState("desc")

  const updateFilter = (key: keyof AlertFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const toggleFilterValue = (key: "type" | "category" | "assignedTo", value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key] as string[]
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]

      return {
        ...prev,
        [key]: newValues,
      }
    })
  }

  const clearFilters = () => {
    setFilters(initialFilters)
  }

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchTerm !== "" ||
      filters.type.length > 0 ||
      filters.category.length > 0 ||
      filters.dateRange.from !== null ||
      filters.dateRange.to !== null ||
      !filters.showRead ||
      filters.showResolved ||
      filters.assignedTo.length > 0 ||
      filters.escalationLevel !== null
    )
  }, [filters])

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
