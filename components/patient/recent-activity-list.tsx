"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, AlertTriangle, CheckCircle, Activity } from "lucide-react"

interface ActivityItem {
  id: string
  type: "document" | "symptom" | "treatment" | "analysis"
  title: string
  date: string
  status: "nou" | "complet" | "alertă" | "monitorizat"
}

interface RecentActivityListProps {
  activities: ActivityItem[]
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "document":
      return <FileText className="h-4 w-4" />
    case "symptom":
      return <AlertTriangle className="h-4 w-4" />
    case "treatment":
      return <CheckCircle className="h-4 w-4" />
    case "analysis":
      return <Activity className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "nou":
      return <Badge variant="default">Nou</Badge>
    case "complet":
      return <Badge variant="secondary">Complet</Badge>
    case "alertă":
      return <Badge variant="destructive">Alertă</Badge>
    case "monitorizat":
      return <Badge variant="outline">Monitorizat</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activitate Recentă</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-muted-foreground">{getActivityIcon(activity.type)}</div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
              </div>
              <div>{getStatusBadge(activity.status)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
