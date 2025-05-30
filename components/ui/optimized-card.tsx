"use client"

import type React from "react"

import { memo, forwardRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface OptimizedCardProps {
  id: string
  title: string
  children: React.ReactNode
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  isDragging?: boolean
  className?: string
  priority?: "high" | "medium" | "low"
  category?: string
}

export const OptimizedCard = memo(
  forwardRef<HTMLDivElement, OptimizedCardProps>(
    ({ id, title, children, isCollapsed, onToggleCollapse, isDragging, className, priority, category }, ref) => {
      return (
        <Card
          ref={ref}
          className={cn(
            "transition-all duration-200 ease-in-out",
            "hover:shadow-md focus-within:ring-2 focus-within:ring-primary/20",
            isDragging && "shadow-lg scale-105 rotate-1",
            priority === "high" && "border-l-4 border-l-red-500",
            priority === "medium" && "border-l-4 border-l-yellow-500",
            priority === "low" && "border-l-4 border-l-green-500",
            className,
          )}
          data-card-id={id}
          data-category={category}
          data-priority={priority}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
                {title}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className="h-8 w-8 p-0"
                aria-label={isCollapsed ? "Expand card" : "Collapse card"}
              >
                {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          {!isCollapsed && <CardContent className="pt-0">{children}</CardContent>}
        </Card>
      )
    },
  ),
)

OptimizedCard.displayName = "OptimizedCard"
