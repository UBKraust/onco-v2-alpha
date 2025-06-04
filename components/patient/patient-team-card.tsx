"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageSquare, Phone, Calendar } from "lucide-react"

export function PatientTeamCard() {
  const medicalTeam = [
    {
      id: 1,
      name: "Dr. Emily Carter",
      role: "Oncolog Principal",
      specialty: "Hematologie-Oncologie",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastContact: "Azi, 10:30",
      phone: "+40 721 123 456",
      isLead: true,
    },
    {
      id: 2,
      name: "As. Ana Popescu",
      role: "Navigator Pacient",
      specialty: "Coordonare Îngrijiri",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastContact: "Ieri, 16:45",
      phone: "+40 721 123 457",
      isLead: false,
    },
    {
      id: 3,
      name: "Dr. Mihai Ionescu",
      role: "Specialist Chimioterapie",
      specialty: "Oncologie Medicală",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastContact: "3 zile în urmă",
      phone: "+40 721 123 458",
      isLead: false,
    },
    {
      id: 4,
      name: "Psih. Maria Dumitrescu",
      role: "Psiholog Oncologic",
      specialty: "Suport Psihologic",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      lastContact: "Săptămâna trecută",
      phone: "+40 721 123 459",
      isLead: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Disponibil"
      case "away":
        return "Ocupat"
      case "offline":
        return "Offline"
      default:
        return "Necunoscut"
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Echipa Ta Medicală
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {medicalTeam.map((member) => (
          <div
            key={member.id}
            className={`p-4 rounded-xl border-2 transition-all hover:shadow-sm ${
              member.isLead
                ? "border-purple-200 bg-purple-50 dark:bg-purple-900/10"
                : "border-gray-200 bg-white dark:bg-gray-800"
            }`}
          >
            {/* Member Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(
                    member.status,
                  )}`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">{member.name}</h4>
                  {member.isLead && <Badge className="bg-purple-100 text-purple-800 text-xs">Medic Principal</Badge>}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{member.role}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{member.specialty}</p>
              </div>
            </div>

            {/* Status & Last Contact */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${getStatusColor(member.status)}`} />
                <span>{getStatusText(member.status)}</span>
              </div>
              <span>Ultimul contact: {member.lastContact}</span>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
                <MessageSquare className="h-3 w-3" />
                Mesaj
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
                <Phone className="h-3 w-3" />
                Sună
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                Programează
              </Button>
            </div>
          </div>
        ))}

        {/* Team Summary */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Echipa completă:</span>
              <span className="font-medium">{medicalTeam.length} membri</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600 dark:text-gray-400">Disponibili acum:</span>
              <span className="font-medium text-green-600">
                {medicalTeam.filter((m) => m.status === "online").length} membri
              </span>
            </div>
          </div>
        </div>

        {/* Contact Emergency */}
        <div className="pt-2">
          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            <Phone className="h-4 w-4 mr-2" />
            Contact Urgență: +40 721 URGENTA
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
