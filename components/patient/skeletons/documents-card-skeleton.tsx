"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { FileText } from "lucide-react"

export function DocumentsCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Documente Recente
          </CardTitle>
          <Skeleton className="h-9 w-24" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Documents Overview Skeleton */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Skeleton className="h-6 w-12 mb-1" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div>
              <Skeleton className="h-6 w-12 mb-1" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <Skeleton className="h-4 w-40 mt-2" />
        </div>

        {/* Recent Documents List Skeleton */}
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-3 rounded-lg border border-gray-200 bg-white dark:bg-gray-800">
              <div className="flex items-start gap-3">
                <Skeleton className="h-5 w-5 mt-0.5" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-5 w-16 shrink-0" />
                  </div>

                  <Skeleton className="h-3 w-32 mb-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-3 w-3" />
                      <Skeleton className="h-3 w-16" />
                    </div>

                    <div className="flex gap-1">
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Upload Categories */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <Skeleton className="h-5 w-32 mb-2" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-full" />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
