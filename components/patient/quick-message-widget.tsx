"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send } from "lucide-react"

interface Message {
  id: string
  sender: "patient" | "navigator"
  content: string
  timestamp: string
  read: boolean
}

export function QuickMessageWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "navigator",
      content: "Bună ziua! Cum vă simțiți astăzi?",
      timestamp: "10:30",
      read: true,
    },
    {
      id: "2",
      sender: "patient",
      content: "Bună ziua! Mă simt mai bine, mulțumesc.",
      timestamp: "10:35",
      read: true,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const unreadCount = messages.filter((m) => !m.read && m.sender === "navigator").length

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "patient",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" }),
        read: true,
      }
      setMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsExpanded(true)} className="rounded-full h-12 w-12 shadow-lg" size="icon">
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Mesagerie Rapidă
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Lista mesaje */}
          <div className="max-h-40 overflow-y-auto space-y-2">
            {messages.slice(-3).map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.sender === "patient" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input mesaj nou */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Scrie un mesaj..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
            />
            <Button onClick={sendMessage} size="icon" className="self-end">
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" className="w-full" size="sm">
            Vezi toate mesajele
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
