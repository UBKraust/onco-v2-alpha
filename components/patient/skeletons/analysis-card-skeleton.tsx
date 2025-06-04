"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { BarChart3 } from "lucide-react"

export function AnalysisCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-cyan-600" />
          Analize și Tendințe
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Health Score Skeleton */}
        <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-6 w-16" />
          </div>

          <div className="flex items-center gap-4 mb-3">
            <Skeleton className="h-8 w-16" />
            <div className="flex-1">
              <Skeleton className="h-3 w-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Lab Results Skeleton */}
        <div>
          <Skeleton className="h-5 w-40 mb-3" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-6 w-12 inline-block" />
                    <Skeleton className="h-4 w-8 inline-block ml-1" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-3 w-24 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vital Signs Skeleton */}
        <div>
          <Skeleton className="h-5 w-24 mb-3" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-4" />
                </div>
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
