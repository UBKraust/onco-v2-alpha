"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { Target } from "lucide-react"

export function ObjectivesCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Obiective Personale
          </CardTitle>
          <Skeleton className="h-9 w-24" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress Skeleton */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-6 w-6" />
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-10" />
            </div>
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        {/* Objectives List Skeleton */}
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-4 rounded-xl border-2 border-gray-200 bg-white dark:bg-gray-800">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2">
                  <Skeleton className="h-5 w-5 mt-0.5" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-48 mb-1" />
                    <Skeleton className="h-3 w-40 mt-1" />
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-end">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              {/* Progress */}
              {index < 3 && (
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
