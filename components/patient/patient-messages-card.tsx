"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send } from "lucide-react"

interface PatientMessagesCardProps {
  unreadCount: number
}

export function PatientMessagesCard({ unreadCount }: PatientMessagesCardProps) {
  const messages = [
    {
      from: "Dr. Emily Carter",
      message: "Rezultatele analizelor arată o îmbunătățire. Să discutăm la următoarea consultație.",
      time: "10:30",
      isUnread: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      from: "Ana Popescu",
      message: "Nu uita să iei medicația de dimineață. Ai nevoie de ajutor cu ceva?",
      time: "Ieri",
      isUnread: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      from: "Sistem",
      message: "Programarea pentru mâine a fost confirmată. Detalii în calendar.",
      time: "2 zile",
      isUnread: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          Mesaje
          {unreadCount > 0 && <Badge className="bg-red-100 text-red-800 ml-auto">{unreadCount} noi</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 p-3 rounded-lg ${
              message.isUnread
                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                : "bg-gray-50 dark:bg-gray-800"
            }`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.from} />
              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                {message.from
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm">{message.from}</p>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{message.message}</p>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full" size="sm">
          <Send className="h-4 w-4 mr-2" />
          Trimite Mesaj
        </Button>
      </CardContent>
    </Card>
  )
}
