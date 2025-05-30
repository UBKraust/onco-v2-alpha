import { Suspense } from "react"
import { EnhancedBreadcrumb } from "@/components/ui/enhanced-breadcrumb"
import { PageTransition } from "@/components/ui/page-transition"
import { CardSkeleton } from "@/components/ui/loading-skeleton"
import { DarkModeMedicalRecord } from "@/components/medical/dark-mode-medical-record"

export default function MedicalFilePage() {
  return (
    <PageTransition variant="slide" className="space-y-6">
      <EnhancedBreadcrumb />

      <Suspense
        fallback={
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        }
      >
        <DarkModeMedicalRecord />
      </Suspense>
    </PageTransition>
  )
}
