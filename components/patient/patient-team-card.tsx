"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageCircle, Phone } from "lucide-react"

export function PatientTeamCard() {
  const team = [
    {
      name: "Dr. Emily Carter",
      role: "Oncolog Principal",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastContact: "Azi",
    },
    {
      name: "Ana Popescu",
      role: "Navigator Pacient",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastContact: "Ieri",
    },
    {
      name: "Dr. Maria Ionescu",
      role: "Specialist Laborator",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastContact: "3 zile",
    },
  ]

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Echipa Medicală
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {team.map((member, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback className="bg-purple-100 text-purple-700">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                  member.status === "online" ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{member.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{member.role}</p>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full" size="sm">
          Vezi Echipa Completă
        </Button>
      </CardContent>
    </Card>
  )
}
