"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { FileText, Activity, TrendingUp, Calendar, MessageCircle, Users, Target } from "lucide-react"
import { QuickMessageWidget } from "./quick-message-widget"

export function PatientDashboardNew() {
  // Mock patient data
  const patientData = {
    name: "Maria Popescu",
    age: 45,
    diagnosis: "Limfom Non-Hodgkin",
    avatar: "/avatar-placeholder.png",
    nextAppointment: {
      date: "15 Ianuarie 2025",
      time: "10:30",
      doctor: "Dr. Emily Carter",
      type: "Consultație Oncologie",
    },
    treatment: {
      name: "Chimioterapie R-CHOP",
      cycle: "3/6",
      progress: 50,
      status: "Activ",
    },
    adherence: 85,
    wellbeingScore: 7.2,
    unreadMessages: 2,
    activeAlerts: 1,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Patient Info */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={patientData.avatar || "/placeholder.svg"} alt={patientData.name} />
                <AvatarFallback className="bg-violet-100 text-violet-700 text-lg font-semibold">
                  {patientData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Bună ziua, {patientData.name.split(" ")[0]}!
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {patientData.age} ani • {patientData.diagnosis}
                </p>
                <div className="flex items-center mt-2 space-x-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Tratament {patientData.treatment.status}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Activity className="h-4 w-4 mr-1" />
                    Wellbeing: {patientData.wellbeingScore}/10
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Programare Nouă
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Mesaj Rapid
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Următoarea Programare</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{patientData.nextAppointment.date}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {patientData.nextAppointment.time} • {patientData.nextAppointment.doctor}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aderență Tratament</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{patientData.adherence}%</p>
                  <Progress value={patientData.adherence} className="w-full mt-2" />
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesaje Necitite</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{patientData.unreadMessages}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">De la echipa medicală</p>
                </div>
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Alerte Active</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{patientData.activeAlerts}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Necesită atenție</p>
                </div>
                <Activity className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Primary Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Treatment Progress */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Progres Tratament
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{patientData.treatment.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Ciclu {patientData.treatment.cycle}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{patientData.treatment.status}</Badge>
                  </div>
                  <Progress value={patientData.treatment.progress} className="w-full" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {patientData.treatment.progress}% completat
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Programări Viitoare
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{patientData.nextAppointment.type}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{patientData.nextAppointment.doctor}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          {patientData.nextAppointment.date} la {patientData.nextAppointment.time}
                        </p>
                      </div>
                      <Badge variant="outline">Confirmat</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Vezi Toate Programările
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Secondary Info */}
          <div className="space-y-6">
            {/* Medical Team */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Echipa Medicală
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>EC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Dr. Emily Carter</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Oncolog Principal</p>
                    </div>
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Ana Stoica</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Navigator Pacient</p>
                    </div>
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Contactează Echipa
                </Button>
              </CardContent>
            </Card>

            {/* Recent Documents */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  Documente Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Analize Sânge</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Azi, 14:30</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Nou
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Raport CT</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Ieri, 16:45</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Vezi Dosarul Complet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Educational Resources */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Resurse Educaționale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Ghid Nutriție în Chimioterapie</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Recomandări pentru menținerea unei alimentații sănătoase
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100">Exerciții Recomandate</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Activități fizice adaptate pentru perioada de tratament
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Vezi Toate Resursele
              </Button>
            </CardContent>
          </Card>

          {/* Wellbeing Tracker */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Stare Generală
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-purple-600 mb-2">{patientData.wellbeingScore}/10</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Scor wellbeing astăzi</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Energie</span>
                  <Progress value={75} className="w-20 h-2" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dispoziție</span>
                  <Progress value={80} className="w-20 h-2" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Somn</span>
                  <Progress value={65} className="w-20 h-2" />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Actualizează Starea
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Message Widget */}
      <QuickMessageWidget />
    </div>
  )
}
