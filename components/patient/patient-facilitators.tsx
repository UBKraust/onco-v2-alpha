"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Phone, MessageSquare, BookOpen, Users, Smartphone } from "lucide-react"

export function PatientFacilitators() {
  const facilitators = [
    {
      category: "Tehnologic",
      icon: <Smartphone className="h-5 w-5" />,
      items: [
        { name: "Aplicație mobilă simplă", status: "active", progress: 100 },
        { name: "Tutorial video interactiv", status: "active", progress: 90 },
        { name: "Suport tehnic 24/7", status: "active", progress: 85 },
        { name: "Interfață în română", status: "active", progress: 100 },
      ],
    },
    {
      category: "Comunicare",
      icon: <MessageSquare className="h-5 w-5" />,
      items: [
        { name: "Chat în timp real", status: "development", progress: 70 },
        { name: "Videocall integrat", status: "planned", progress: 30 },
        { name: "Traducere automată", status: "planned", progress: 20 },
        { name: "Mesagerie vocală", status: "active", progress: 95 },
      ],
    },
    {
      category: "Educațional",
      icon: <BookOpen className="h-5 w-5" />,
      items: [
        { name: "Biblioteca de resurse", status: "active", progress: 100 },
        { name: "Webinarii educaționale", status: "active", progress: 80 },
        { name: "Ghiduri personalizate", status: "development", progress: 60 },
        { name: "FAQ interactiv", status: "active", progress: 90 },
      ],
    },
    {
      category: "Social",
      icon: <Users className="h-5 w-5" />,
      items: [
        { name: "Grupuri de suport", status: "planned", progress: 40 },
        { name: "Mentoring pacient-pacient", status: "planned", progress: 25 },
        { name: "Forum comunitate", status: "development", progress: 55 },
        { name: "Evenimente virtuale", status: "active", progress: 75 },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "development":
        return "bg-yellow-100 text-yellow-800"
      case "planned":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Activ"
      case "development":
        return "În dezvoltare"
      case "planned":
        return "Planificat"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">🤝 Facilitatori pentru Pacienți</h2>
        <p className="text-muted-foreground">Instrumente și servicii care îmbunătățesc experiența pacientului</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facilitators.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.icon}
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.items.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <Badge className={getStatusColor(item.status)}>{getStatusLabel(item.status)}</Badge>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">Progres implementare: {item.progress}%</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions pentru Facilitatori */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Acțiuni Rapide - Facilitatori</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Phone className="h-6 w-6 mb-2" />
              <span className="text-xs">Suport Tehnic</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BookOpen className="h-6 w-6 mb-2" />
              <span className="text-xs">Tutorial</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-xs">Comunitate</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Heart className="h-6 w-6 mb-2" />
              <span className="text-xs">Suport Emoțional</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
