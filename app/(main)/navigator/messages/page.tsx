"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Send, Phone, Video, MoreVertical } from "lucide-react"
import { useState } from "react"

export default function NavigatorMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState("1")

  const conversations = [
    {
      id: "1",
      patientName: "Maria Popescu",
      lastMessage: "Mulțumesc pentru informații. Mă simt mult mai bine astăzi.",
      timestamp: "acum 5 min",
      unread: 2,
      status: "online",
      priority: "normal",
    },
    {
      id: "2",
      patientName: "Ion Georgescu",
      lastMessage: "Am o întrebare despre medicația de mâine...",
      timestamp: "acum 1 oră",
      unread: 1,
      status: "offline",
      priority: "high",
    },
    {
      id: "3",
      patientName: "Ana Dumitrescu",
      lastMessage: "Programarea de săptămâna viitoare este confirmată?",
      timestamp: "acum 3 ore",
      unread: 0,
      status: "away",
      priority: "normal",
    },
  ]

  const messages = [
    {
      id: "1",
      sender: "patient",
      content: "Bună ziua! Am o întrebare despre tratamentul meu.",
      timestamp: "10:30",
      read: true,
    },
    {
      id: "2",
      sender: "navigator",
      content: "Bună ziua, Maria! Cu plăcere vă ajut. Care este întrebarea dumneavoastră?",
      timestamp: "10:32",
      read: true,
    },
    {
      id: "3",
      sender: "patient",
      content: "Mulțumesc pentru informații. Mă simt mult mai bine astăzi.",
      timestamp: "10:45",
      read: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mesaje</h1>
          <p className="text-muted-foreground">Comunicare cu pacienții</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Lista conversații */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversații</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Caută conversații..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                    selectedConversation === conversation.id ? "border-l-blue-500 bg-blue-50" : "border-l-transparent"
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {conversation.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          conversation.status === "online"
                            ? "bg-green-500"
                            : conversation.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversation.patientName}</p>
                        <div className="flex items-center space-x-1">
                          {conversation.priority === "high" && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                          {conversation.unread > 0 && (
                            <Badge variant="default" className="text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Zona de chat */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>MP</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">Maria Popescu</CardTitle>
                  <CardDescription>Online acum 5 minute</CardDescription>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-[400px]">
            {/* Mesaje */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "navigator" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === "navigator" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === "navigator" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input pentru mesaj nou */}
            <div className="border-t pt-4">
              <div className="flex space-x-2">
                <Input placeholder="Scrie un mesaj..." className="flex-1" />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
