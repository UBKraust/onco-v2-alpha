"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import type { AlertFilters as AlertFiltersType } from "@/hooks/useAlertFilters"

interface AlertFiltersProps {
  filters: AlertFiltersType
  onFilterChange: (key: keyof AlertFiltersType, value: any) => void
  onToggleFilter: (key: "type" | "category", value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
  sortBy: string
  sortOrder: string
  onSortChange: (value: string) => void
  onSortOrderChange: (value: string) => void
}

export function AlertFilters({
  filters,
  onFilterChange,
  onToggleFilter,
  onClearFilters,
  hasActiveFilters,
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderChange,
}: AlertFiltersProps) {
  const alertTypes = [
    { value: "critical", label: "Critice", color: "bg-red-100 text-red-800 border-red-200" },
    { value: "high", label: "Prioritate Înaltă", color: "bg-orange-100 text-orange-800 border-orange-200" },
    { value: "medium", label: "Prioritate Medie", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { value: "low", label: "Prioritate Scăzută", color: "bg-gray-100 text-gray-800 border-gray-200" },
  ]

  const alertCategories = [
    { value: "medical", label: "Medical" },
    { value: "appointment", label: "Programare" },
    { value: "medication", label: "Medicație" },
    { value: "communication", label: "Comunicare" },
    { value: "system", label: "Sistem" },
  ]

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-4 space-y-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Caută după pacient, titlu sau descriere..."
            value={filters.searchTerm}
            onChange={(e) => onFilterChange("searchTerm", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Sort and actions */}
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sortează după" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="timestamp">Data</SelectItem>
              <SelectItem value="priority">Prioritate</SelectItem>
              <SelectItem value="patient">Pacient</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={onSortOrderChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">↓</SelectItem>
              <SelectItem value="asc">↑</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-1" />
              Șterge
            </Button>
          )}
        </div>
      </div>

      {/* Filter badges */}
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium mb-2 block">Tip Alertă</Label>
          <div className="flex flex-wrap gap-2">
            {alertTypes.map((type) => (
              <Badge
                key={type.value}
                variant={filters.type.includes(type.value) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.type.includes(type.value) ? type.color : "hover:bg-gray-50"
                }`}
                onClick={() => onToggleFilter("type", type.value)}
              >
                {type.label}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Categorie</Label>
          <div className="flex flex-wrap gap-2">
            {alertCategories.map((category) => (
              <Badge
                key={category.value}
                variant={filters.category.includes(category.value) ? "default" : "outline"}
                className="cursor-pointer transition-colors hover:bg-gray-50"
                onClick={() => onToggleFilter("category", category.value)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Status toggles */}
        <div className="flex gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-resolved"
              checked={filters.showResolved}
              onCheckedChange={(checked) => onFilterChange("showResolved", checked)}
            />
            <Label htmlFor="show-resolved" className="text-sm">
              Arată rezolvate
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-read"
              checked={filters.showRead}
              onCheckedChange={(checked) => onFilterChange("showRead", checked)}
            />
            <Label htmlFor="show-read" className="text-sm">
              Arată citite
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
