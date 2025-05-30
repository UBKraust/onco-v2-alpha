"use client"

import type React from "react"

import { memo, Suspense } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { Skeleton } from "@/components/ui/loading-skeleton"

interface LazyCardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

export const LazyCard = memo<LazyCardProps>(
  ({ children, fallback = <Skeleton className="h-48 w-full" />, className }) => {
    const { ref, isIntersecting } = useIntersectionObserver({
      threshold: 0.1,
      triggerOnce: true,
    })

    return (
      <div ref={ref} className={className}>
        {isIntersecting ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
      </div>
    )
  },
)

LazyCard.displayName = "LazyCard"
