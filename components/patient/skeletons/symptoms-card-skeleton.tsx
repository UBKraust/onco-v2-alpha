"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { Activity } from "lucide-react"

export function SymptomsCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-600" />
            Simptome Raportate
          </CardTitle>
          <Skeleton className="h-9 w-32" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weekly Overview Skeleton */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
          <Skeleton className="h-5 w-48 mb-3" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Skeleton className="h-8 w-12 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Recent Symptoms Skeleton */}
        <div>
          <Skeleton className="h-5 w-32 mb-3" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-3 rounded-lg border bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                </div>
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
