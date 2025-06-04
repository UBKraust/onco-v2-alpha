"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageSquare, AlertTriangle, TrendingUp } from "lucide-react"

interface PatientOverviewStatsProps {
  nextAppointment: {
    date: string
    time: string
    doctor: string
    type: string
  }
  adherence: number
  unreadMessages: number
  activeAlerts: number
}

export function PatientOverviewStats({
  nextAppointment,
  adherence,
  unreadMessages,
  activeAlerts,
}: PatientOverviewStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Next Appointment */}
      <Card className="rounded-2xl border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Următoarea Programare</CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-blue-600">{nextAppointment.date}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {nextAppointment.time} • {nextAppointment.doctor}
          </p>
          <Badge variant="outline" className="mt-2 text-xs">
            {nextAppointment.type}
          </Badge>
        </CardContent>
      </Card>

      {/* Treatment Adherence */}
      <Card className="rounded-2xl border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aderență Tratament</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{adherence}%</div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Excelent progres!</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${adherence}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className="rounded-2xl border-l-4 border-l-purple-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mesaje</CardTitle>
          <MessageSquare className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{unreadMessages}</div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {unreadMessages > 0 ? "Mesaje necitite" : "Toate citite"}
          </p>
          {unreadMessages > 0 && <Badge className="mt-2 bg-purple-100 text-purple-800">Nou</Badge>}
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="rounded-2xl border-l-4 border-l-orange-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alerte</CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{activeAlerts}</div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {activeAlerts > 0 ? "Necesită atenție" : "Totul în regulă"}
          </p>
          {activeAlerts > 0 && (
            <Badge variant="destructive" className="mt-2">
              Urgent
            </Badge>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
