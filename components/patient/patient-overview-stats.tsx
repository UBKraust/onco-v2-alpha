"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageSquare, AlertTriangle, TrendingUp } from "lucide-react"

interface PatientOverviewStatsProps {
  nextAppointment?: {
    date: string
    time: string
    doctor: string
    type: string
  }
  adherence?: number
  unreadMessages?: number
  activeAlerts?: number
}

export function PatientOverviewStats({
  nextAppointment = {
    date: "15 Ianuarie 2025",
    time: "10:30",
    doctor: "Dr. Emily Carter",
    type: "Consultație Oncologie",
  },
  adherence = 85,
  unreadMessages = 0,
  activeAlerts = 0,
}: PatientOverviewStatsProps) {
  const stats = [
    {
      title: "Următoarea Programare",
      value: nextAppointment.date,
      subtitle: `${nextAppointment.time} • ${nextAppointment.doctor}`,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Aderență Tratament",
      value: `${adherence}%`,
      subtitle: "Ultima săptămână",
      icon: TrendingUp,
      color: adherence >= 80 ? "text-green-600" : adherence >= 60 ? "text-yellow-600" : "text-red-600",
      bgColor:
        adherence >= 80
          ? "bg-green-50 dark:bg-green-900/20"
          : adherence >= 60
            ? "bg-yellow-50 dark:bg-yellow-900/20"
            : "bg-red-50 dark:bg-red-900/20",
    },
    {
      title: "Mesaje Necitite",
      value: unreadMessages.toString(),
      subtitle: "De la echipa medicală",
      icon: MessageSquare,
      color: unreadMessages > 0 ? "text-orange-600" : "text-gray-600",
      bgColor: unreadMessages > 0 ? "bg-orange-50 dark:bg-orange-900/20" : "bg-gray-50 dark:bg-gray-900/20",
    },
    {
      title: "Alerte Active",
      value: activeAlerts.toString(),
      subtitle: "Necesită atenție",
      icon: AlertTriangle,
      color: activeAlerts > 0 ? "text-red-600" : "text-gray-600",
      bgColor: activeAlerts > 0 ? "bg-red-50 dark:bg-red-900/20" : "bg-gray-50 dark:bg-gray-900/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card key={index} className="rounded-2xl">
            <CardContent className="p-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  {(stat.title === "Mesaje Necitite" && unreadMessages > 0) ||
                  (stat.title === "Alerte Active" && activeAlerts > 0) ? (
                    <Badge variant="destructive" className="text-xs">
                      {stat.title === "Mesaje Necitite" ? unreadMessages : activeAlerts}
                    </Badge>
                  ) : null}
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
