"use client"

import type React from "react"

import { memo, useMemo, useCallback, useState, useTransition } from "react"
import { OptimizedCard } from "./optimized-card"
import { OptimizedSearch } from "./optimized-search"
import { LazyCard } from "./lazy-card"
import { PerformanceMonitor } from "./performance-monitor"
import { Button } from "@/components/ui/button"
import { Grid, List, Settings } from "lucide-react"

interface CardData {
  id: string
  title: string
  content: React.ReactNode
  category: string
  priority: "high" | "medium" | "low"
  isCollapsed?: boolean
}

interface OptimizedDashboardProps {
  cards: CardData[]
  onCardUpdate: (id: string, updates: Partial<CardData>) => void
  className?: string
}

export const OptimizedDashboard = memo<OptimizedDashboardProps>(({ cards, onCardUpdate, className }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<any>({})
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isPending, startTransition] = useTransition()

  // Memoized filtered cards
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        !searchQuery ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !filters.category || card.category === filters.category
      const matchesPriority = !filters.priority || card.priority === filters.priority

      return matchesSearch && matchesCategory && matchesPriority
    })
  }, [cards, searchQuery, filters])

  // Optimized handlers
  const handleSearch = useCallback((query: string) => {
    startTransition(() => {
      setSearchQuery(query)
    })
  }, [])

  const handleFilterChange = useCallback((newFilters: any) => {
    startTransition(() => {
      setFilters(newFilters)
    })
  }, [])

  const handleCardToggle = useCallback(
    (cardId: string) => {
      const card = cards.find((c) => c.id === cardId)
      if (card) {
        onCardUpdate(cardId, { isCollapsed: !card.isCollapsed })
      }
    },
    [cards, onCardUpdate],
  )

  const gridClasses = useMemo(() => {
    return viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"
  }, [viewMode])

  return (
    <div className={className}>
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <OptimizedSearch
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          placeholder="Search cards..."
          className="flex-1 max-w-md"
        />

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 text-sm text-muted-foreground">
        {isPending ? (
          <span>Searching...</span>
        ) : (
          <span>
            Showing {filteredCards.length} of {cards.length} cards
          </span>
        )}
      </div>

      {/* Cards Grid */}
      <div className={gridClasses}>
        {filteredCards.map((card) => (
          <LazyCard key={card.id}>
            <OptimizedCard
              id={card.id}
              title={card.title}
              isCollapsed={card.isCollapsed}
              onToggleCollapse={() => handleCardToggle(card.id)}
              priority={card.priority}
              category={card.category}
            >
              {card.content}
            </OptimizedCard>
          </LazyCard>
        ))}
      </div>

      {/* Performance Monitor (dev only) */}
      <PerformanceMonitor />
    </div>
  )
})

OptimizedDashboard.displayName = "OptimizedDashboard"
