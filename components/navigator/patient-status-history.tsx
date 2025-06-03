"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PatientStatusBadge } from "./patient-status-badge"
import type { PatientStatus } from "@/types/patient-status"
import { History } from "lucide-react"

interface StatusHistoryItem {
  id: string
  status: PatientStatus
  previousStatus?: PatientStatus
  date: string
  updatedBy: string
  note?: string
}

interface PatientStatusHistoryProps {
  history: StatusHistoryItem[]
}

export function PatientStatusHistory({ history }: PatientStatusHistoryProps) {
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Istoric Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nu există istoric de statusuri</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Istoric Status ({history.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item, index) => (
            <div key={item.id} className="flex gap-4">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-blue-500" : "bg-gray-300"}`} />
                {index < history.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-2" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <PatientStatusBadge status={item.status} size="sm" />
                  {item.previousStatus && (
                    <>
                      <span className="text-xs text-muted-foreground">din</span>
                      <PatientStatusBadge status={item.previousStatus} size="sm" />
                    </>
                  )}
                  {index === 0 && (
                    <Badge variant="outline" className="text-xs">
                      Curent
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {item.updatedBy
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{item.updatedBy}</span>
                  <span>•</span>
                  <span>{new Date(item.date).toLocaleString("ro-RO")}</span>
                </div>

                {item.note && (
                  <div className="text-sm bg-gray-50 rounded-lg p-3 mt-2">
                    <p className="italic">"{item.note}"</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
