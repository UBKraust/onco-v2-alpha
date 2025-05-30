"use client"

import { memo, useMemo, useCallback, useState, useTransition, useEffect } from "react"
import { Search, X, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDebounce } from "@/hooks/use-debounce"

interface OptimizedSearchProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: SearchFilters) => void
  placeholder?: string
  className?: string
}

interface SearchFilters {
  category?: string
  priority?: string
  status?: string
}

export const OptimizedSearch = memo<OptimizedSearchProps>(
  ({ onSearch, onFilterChange, placeholder = "Search...", className }) => {
    const [query, setQuery] = useState("")
    const [filters, setFilters] = useState<SearchFilters>({})
    const [isPending, startTransition] = useTransition()

    const debouncedQuery = useDebounce(query, 300)

    // Fixed: Use useEffect instead of useMemo for side effects
    useEffect(() => {
      if (debouncedQuery !== undefined) {
        startTransition(() => {
          onSearch(debouncedQuery)
        })
      }
    }, [debouncedQuery, onSearch])

    const handleQueryChange = useCallback((value: string) => {
      setQuery(value)
    }, [])

    const clearSearch = useCallback(() => {
      setQuery("")
      startTransition(() => {
        onSearch("")
      })
    }, [onSearch])

    const updateFilter = useCallback(
      (key: keyof SearchFilters, value: string | undefined) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)
        startTransition(() => {
          onFilterChange(newFilters)
        })
      },
      [filters, onFilterChange],
    )

    const activeFiltersCount = useMemo(() => {
      return Object.values(filters).filter(Boolean).length
    }, [filters])

    return (
      <div className={className}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={placeholder}
            className="pl-10 pr-20"
            aria-label="Search cards"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {isPending && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            )}
            {query && (
              <Button variant="ghost" size="sm" onClick={clearSearch} className="h-6 w-6 p-0" aria-label="Clear search">
                <X className="h-3 w-3" />
              </Button>
            )}
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 relative" aria-label="Filters">
              <Filter className="h-3 w-3" />
              {activeFiltersCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  },
)

OptimizedSearch.displayName = "OptimizedSearch"
