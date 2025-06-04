"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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
  const [announcements, setAnnouncements] = useState<string[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const unreadCount = messages.filter((m) => !m.read && m.sender === "navigator").length

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus textarea when expanded
  useEffect(() => {
    if (isExpanded && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isExpanded])

  // Announce new messages to screen readers
  const announceMessage = (content: string, sender: string) => {
    const announcement = `Mesaj nou de la ${sender}: ${content}`
    setAnnouncements((prev) => [...prev, announcement])

    // Clear announcement after it's been read
    setTimeout(() => {
      setAnnouncements((prev) => prev.slice(1))
    }, 3000)
  }

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
      announceMessage(newMessage, "pacient")
      setNewMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    const announcement = isExpanded ? "Widget mesagerie închis" : "Widget mesagerie deschis"
    announceMessage(announcement, "sistem")
  }

  if (!isExpanded) {
    return (
      <>
        {/* Screen reader announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {announcements.map((announcement, index) => (
            <div key={index}>{announcement}</div>
          ))}
        </div>

        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={toggleExpanded}
            className="rounded-full h-12 w-12 shadow-lg"
            size="icon"
            aria-label={`Deschide mesageria rapidă${unreadCount > 0 ? `, ${unreadCount} mesaje necitite` : ""}`}
            aria-describedby="message-widget-description"
          >
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
            {unreadCount > 0 && (
              <Badge
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center"
                aria-label={`${unreadCount} mesaje necitite`}
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
          <div id="message-widget-description" className="sr-only">
            Widget pentru mesagerie rapidă cu echipa medicală
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4 z-50 w-80">
        <Card role="dialog" aria-labelledby="message-widget-title" aria-describedby="message-widget-desc">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle id="message-widget-title" className="text-sm flex items-center gap-2">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Mesagerie Rapidă
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={toggleExpanded} aria-label="Închide mesageria rapidă">
                ✕
              </Button>
            </div>
            <div id="message-widget-desc" className="sr-only">
              Conversație cu echipa medicală. Folosiți Enter pentru a trimite mesaje, Shift+Enter pentru linie nouă.
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Lista mesaje */}
            <div
              className="max-h-40 overflow-y-auto space-y-2"
              role="log"
              aria-label="Istoric mesaje"
              aria-live="polite"
            >
              {messages.slice(-3).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"}`}
                  role="article"
                  aria-label={`Mesaj de la ${message.sender === "patient" ? "dvs." : "navigator"} la ${message.timestamp}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-sm ${
                      message.sender === "patient" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1" aria-label={`Trimis la ${message.timestamp}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input mesaj nou */}
            <div className="flex gap-2" role="group" aria-label="Trimitere mesaj nou">
              <Textarea
                ref={textareaRef}
                placeholder="Scrie un mesaj..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[60px] resize-none"
                onKeyDown={handleKeyDown}
                aria-label="Câmp mesaj nou"
                aria-describedby="message-input-help"
              />
              <Button
                onClick={sendMessage}
                size="icon"
                className="self-end"
                disabled={!newMessage.trim()}
                aria-label="Trimite mesajul"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <div id="message-input-help" className="sr-only">
              Apăsați Enter pentru a trimite mesajul sau Shift+Enter pentru o linie nouă
            </div>

            <Button
              variant="outline"
              className="w-full"
              size="sm"
              aria-label="Deschide toate mesajele în pagina principală"
            >
              Vezi toate mesajele
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
