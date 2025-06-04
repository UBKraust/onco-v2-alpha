"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Calendar, FileText, Activity, Bell, Settings } from "lucide-react"

export function PatientQuickActions() {
  const patientData = {
    name: "Maria Popescu",
    age: 45,
    diagnosis: "Limfom Non-Hodgkin",
    avatar: "/avatar-placeholder.png",
    wellbeingScore: 7.2,
    unreadMessages: 2,
    activeAlerts: 1,
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={patientData.avatar || "/placeholder.svg"} alt={patientData.name} />
            <AvatarFallback className="bg-violet-100 text-violet-700 text-lg font-semibold">
              {patientData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Bună ziua, {patientData.name.split(" ")[0]}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {patientData.age} ani • {patientData.diagnosis}
            </p>
            <div className="flex items-center mt-2 space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Tratament Activ
              </Badge>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Activity className="h-4 w-4 mr-1" />
                Wellbeing: {patientData.wellbeingScore}/10
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="relative">
            <MessageSquare className="h-4 w-4 mr-2" />
            Mesaje
            {patientData.unreadMessages > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                {patientData.unreadMessages}
              </Badge>
            )}
          </Button>

          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Programări
          </Button>

          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Documente
          </Button>

          <Button variant="outline" size="sm" className="relative">
            <Bell className="h-4 w-4 mr-2" />
            Alerte
            {patientData.activeAlerts > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center p-0">
                {patientData.activeAlerts}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
