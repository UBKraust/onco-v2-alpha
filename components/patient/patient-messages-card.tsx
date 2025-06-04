"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, Clock, AlertCircle } from "lucide-react"

interface PatientMessagesCardProps {
  unreadCount: number
}

export function PatientMessagesCard({ unreadCount }: PatientMessagesCardProps) {
  const recentMessages = [
    {
      id: 1,
      sender: "Dr. Emily Carter",
      role: "Oncolog Principal",
      message: "Rezultatele analizelor arată o îmbunătățire semnificativă. Să discutăm la următoarea consultație.",
      timestamp: "Azi, 14:30",
      isRead: false,
      isUrgent: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      sender: "As. Ana Popescu",
      role: "Navigator Pacient",
      message: "Nu uitați să luați medicația de suport înainte de următorul ciclu de chimioterapie.",
      timestamp: "Azi, 09:15",
      isRead: false,
      isUrgent: true,
    },
    {
      id: 3,
      sender: "Secretariat Medical",
      role: "Administrație",
      message: "Programarea pentru 22 ianuarie a fost confirmată. Vă rugăm să ajungeți cu 15 minute mai devreme.",
      timestamp: "Ieri, 16:45",
      isRead: true,
      isUrgent: false,
    },
    {
      id: 4,
      sender: "Dr. Mihai Ionescu",
      role: "Specialist Chimioterapie",
      message: "Felicitări pentru aderența excelentă la tratament! Continuați așa.",
      timestamp: "2 zile în urmă",
      isRead: true,
      isUrgent: false,
    },
  ]

  const quickReplies = ["Mulțumesc pentru informații", "Am o întrebare", "Confirm programarea", "Raportez un simptom"]

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Mesaje
            {unreadCount > 0 && <Badge className="bg-red-500 text-white text-xs">{unreadCount}</Badge>}
          </CardTitle>
          <Button size="sm" className="flex items-center gap-1">
            <Send className="h-4 w-4" />
            Nou
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recentMessages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg border transition-all hover:shadow-sm ${
                !message.isRead
                  ? "border-blue-200 bg-blue-50 dark:bg-blue-900/10"
                  : "border-gray-200 bg-white dark:bg-gray-800"
              } ${message.isUrgent ? "border-l-4 border-l-red-500" : ""}`}
            >
              {/* Message Header */}
              <div className="flex items-start gap-3 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-xs font-semibold">
                    {message.sender
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">{message.sender}</h4>
                      {message.isUrgent && <AlertCircle className="h-4 w-4 text-red-500" />}
                    </div>
                    {!message.isRead && <div className="h-2 w-2 bg-blue-500 rounded-full" />}
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{message.role}</p>
                </div>
              </div>

              {/* Message Content */}
              <p className="text-sm text-gray-800 dark:text-gray-200 mb-2 leading-relaxed">{message.message}</p>

              {/* Message Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  {message.timestamp}
                </div>

                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    Răspunde
                  </Button>
                  {!message.isRead && (
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      Marchează citit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <h5 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Răspunsuri Rapide:</h5>
          <div className="grid grid-cols-1 gap-1">
            {quickReplies.map((reply, index) => (
              <Button key={index} variant="outline" size="sm" className="justify-start text-xs h-8">
                {reply}
              </Button>
            ))}
          </div>
        </div>

        {/* Message Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Mesaje necitite:</span>
            <span className="font-medium text-red-600">{unreadCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600 dark:text-gray-400">Timp răspuns mediu:</span>
            <span className="font-medium text-green-600">{"< 2 ore"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Vezi Toate
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Arhivă
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
