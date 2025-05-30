"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageSquare, Send, Search, AlertTriangle, Clock, CheckCircle } from "lucide-react"
import { usePatientData } from "@/hooks/usePatientData"

export function Messaging() {
  const { messages, markMessageAsRead } = usePatientData()
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const unreadMessages = messages.filter((msg) => !msg.isRead)
  const filteredMessages = messages.filter(
    (msg) =>
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.from.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "Urgent"
      case "high":
        return "Prioritate Înaltă"
      case "normal":
        return "Normal"
      case "low":
        return "Prioritate Scăzută"
      default:
        return "Normal"
    }
  }

  const handleMessageClick = (message: any) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      markMessageAsRead(message.id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mesagerie</h1>
          <p className="text-muted-foreground">Comunicarea cu echipa medicală</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Mesaj Nou
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mesaj Nou</DialogTitle>
              <DialogDescription>Trimite un mesaj către echipa medicală</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Către</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Dr. Emily Carter - Oncolog</option>
                  <option>Ana Ionescu - Navigator Medical</option>
                  <option>Sarah Miller - Nutriționist</option>
                  <option>Echipa Medicală</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subiect</label>
                <Input placeholder="Subiectul mesajului..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mesaj</label>
                <Textarea
                  placeholder="Scrie mesajul aici..."
                  rows={5}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Prioritate</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="normal">Normal</option>
                  <option value="high">Prioritate Înaltă</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Trimite Mesaj
                </Button>
                <Button variant="outline">Anulează</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mesaje Necitite</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{unreadMessages.length}</div>
            <p className="text-xs text-muted-foreground">
              {unreadMessages.filter((msg) => msg.priority === "high" || msg.priority === "urgent").length} prioritare
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mesaje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">În ultimele 30 zile</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timp Răspuns</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h</div>
            <p className="text-xs text-muted-foreground">Timp mediu de răspuns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground">Echipa medicală disponibilă</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută mesaje..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mesaje</CardTitle>
            <CardDescription>Conversațiile cu echipa medicală</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  !message.isRead ? "border-blue-200 bg-blue-50" : ""
                }`}
                onClick={() => handleMessageClick(message)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder-doctor.jpg" />
                      <AvatarFallback>
                        {message.from
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{message.from}</p>
                      <p className="text-xs text-muted-foreground">{new Date(message.date).toLocaleString("ro-RO")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!message.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                    <Badge className={getPriorityColor(message.priority)}>
                      {getPriorityIcon(message.priority)}
                      <span className="ml-1">{getPriorityLabel(message.priority)}</span>
                    </Badge>
                  </div>
                </div>

                <h4 className={`font-medium mb-1 ${!message.isRead ? "font-semibold" : ""}`}>{message.subject}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card>
          <CardHeader>
            <CardTitle>Detalii Mesaj</CardTitle>
            <CardDescription>
              {selectedMessage ? "Vizualizează mesajul selectat" : "Selectează un mesaj pentru a-l vizualiza"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Avatar>
                    <AvatarImage src="/placeholder-doctor.jpg" />
                    <AvatarFallback>
                      {selectedMessage.from
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{selectedMessage.from}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedMessage.date).toLocaleString("ro-RO")}
                    </p>
                  </div>
                  <Badge className={getPriorityColor(selectedMessage.priority)}>
                    {getPriorityLabel(selectedMessage.priority)}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">{selectedMessage.subject}</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm leading-relaxed">{selectedMessage.content}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Textarea placeholder="Scrie un răspuns..." rows={4} className="mb-3" />
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Send className="mr-2 h-4 w-4" />
                      Trimite Răspuns
                    </Button>
                    <Button variant="outline">Marchează ca Citit</Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-muted-foreground">Selectează un mesaj pentru a-l vizualiza</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
