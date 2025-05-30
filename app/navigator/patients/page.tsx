"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Search,
  UserPlus,
  Phone,
  MessageSquare,
  FileText,
  Calendar,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import Link from "next/link"

const mockPatients = [
  {
    id: "1",
    name: "Maria Popescu",
    age: 45,
    diagnosis: "Cancer de sân",
    stage: "Stadiul II",
    priority: "Critic",
    lastContact: "acum 2 ore",
    nextAppointment: "Mâine, 10:00",
    adherence: 85,
    trend: "down",
    phone: "+40 721 123 456",
    status: "active",
  },
  {
    id: "2",
    name: "Ion Georgescu",
    age: 62,
    diagnosis: "Cancer pulmonar",
    stage: "Stadiul III",
    priority: "Înalt",
    lastContact: "acum 4 ore",
    nextAppointment: "Joi, 14:30",
    adherence: 92,
    trend: "up",
    phone: "+40 721 234 567",
    status: "active",
  },
  {
    id: "3",
    name: "Ana Dumitrescu",
    age: 38,
    diagnosis: "Cancer ovarian",
    stage: "Stadiul I",
    priority: "Mediu",
    lastContact: "ieri",
    nextAppointment: "Vineri, 09:15",
    adherence: 78,
    trend: "stable",
    phone: "+40 721 345 678",
    status: "active",
  },
  {
    id: "4",
    name: "Gheorghe Ionescu",
    age: 55,
    diagnosis: "Cancer colorectal",
    stage: "Stadiul II",
    priority: "Mediu",
    lastContact: "acum 6 ore",
    nextAppointment: "Luni, 11:00",
    adherence: 88,
    trend: "up",
    phone: "+40 721 456 789",
    status: "active",
  },
  {
    id: "5",
    name: "Elena Vasilescu",
    age: 41,
    diagnosis: "Cancer de sân",
    stage: "Stadiul I",
    priority: "Scăzut",
    lastContact: "acum 1 zi",
    nextAppointment: "Marți, 15:45",
    adherence: 95,
    trend: "up",
    phone: "+40 721 567 890",
    status: "active",
  },
]

export default function NavigatorPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = priorityFilter === "all" || patient.priority === priorityFilter
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter

    return matchesSearch && matchesPriority && matchesStatus
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critic":
        return "destructive"
      case "Înalt":
        return "default"
      case "Mediu":
        return "secondary"
      case "Scăzut":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestionare Pacienți</h1>
          <p className="text-muted-foreground">Monitorizează și gestionează toți pacienții din grija ta</p>
        </div>
        <Button asChild>
          <Link href="/navigator/patients/new">
            <UserPlus className="h-4 w-4 mr-2" />
            Adaugă Pacient
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pacienți</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Prioritate Critică</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Programări Astăzi</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aderență Medie</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrare și Căutare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Caută după nume sau diagnostic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Prioritate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate prioritățile</SelectItem>
                <SelectItem value="Critic">Critic</SelectItem>
                <SelectItem value="Înalt">Înalt</SelectItem>
                <SelectItem value="Mediu">Mediu</SelectItem>
                <SelectItem value="Scăzut">Scăzut</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate statusurile</SelectItem>
                <SelectItem value="active">Activ</SelectItem>
                <SelectItem value="inactive">Inactiv</SelectItem>
                <SelectItem value="completed">Finalizat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista Pacienților ({filteredPatients.length})</CardTitle>
          <CardDescription>Pacienții din grija ta cu informații actualizate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <Badge variant={getPriorityColor(patient.priority)}>{patient.priority}</Badge>
                      <span className="text-sm text-muted-foreground">{patient.age} ani</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Diagnostic:</span> {patient.diagnosis}
                      </div>
                      <div>
                        <span className="font-medium">Stadiu:</span> {patient.stage}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">Ultimul contact:</span> {patient.lastContact}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className="font-medium">Următoarea programare:</span> {patient.nextAppointment}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Aderență:</span>
                        <span className="text-sm">{patient.adherence}%</span>
                        {getTrendIcon(patient.trend)}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {patient.phone}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/navigator/patients/${patient.id}`}>
                        <FileText className="h-4 w-4 mr-1" />
                        Detalii
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Sună
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Mesaj
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/navigator/appointments/new?patient=${patient.id}`}>
                        <Calendar className="h-4 w-4 mr-1" />
                        Programează
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
