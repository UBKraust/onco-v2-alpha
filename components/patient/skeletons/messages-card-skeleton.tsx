"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { MessageSquare } from "lucide-react"

export function MessagesCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Mesaje
          </CardTitle>
          <Skeleton className="h-9 w-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages List Skeleton */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-3 rounded-lg border border-gray-200 bg-white dark:bg-gray-800">
              {/* Message Header */}
              <div className="flex items-start gap-3 mb-2">
                <Skeleton variant="circular" className="h-8 w-8" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-32" />
                      {index === 1 && <Skeleton className="h-4 w-4" />}
                    </div>
                    {index < 2 && <Skeleton className="h-2 w-2 rounded-full" />}
                  </div>

                  <Skeleton className="h-3 w-24 mb-2" />
                </div>
              </div>

              {/* Message Content */}
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6 mb-2" />

              {/* Message Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-3 w-20" />
                </div>

                <div className="flex gap-1">
                  <Skeleton className="h-6 w-16" />
                  {index < 2 && <Skeleton className="h-6 w-24" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <Skeleton className="h-5 w-32 mb-2" />
          <div className="grid grid-cols-1 gap-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-full" />
            ))}
          </div>
        </div>

        {/* Message Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
