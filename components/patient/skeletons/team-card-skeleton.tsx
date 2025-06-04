"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { Users } from "lucide-react"

export function TeamCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Echipa Ta Medicală
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Team Members Skeleton */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="p-4 rounded-xl border-2 border-gray-200 bg-white dark:bg-gray-800">
            {/* Member Header */}
            <div className="flex items-start gap-3 mb-3">
              <Skeleton variant="circular" className="h-12 w-12" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Skeleton className="h-5 w-32" />
                  {index === 0 && <Skeleton className="h-5 w-24" />}
                </div>
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>

            {/* Status & Last Contact */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ))}

        {/* Team Summary */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>

        {/* Contact Emergency */}
        <div className="pt-2">
          <Skeleton className="h-9 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
