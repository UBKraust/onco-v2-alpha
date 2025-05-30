"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MessageSquare,
  FileText,
  Bell,
  BarChart3,
  UserPlus,
  Settings,
  Activity,
  Shield,
  ChevronRight,
  AlertTriangle,
  Eye,
  Plus,
  User,
} from "lucide-react"

export default function Component() {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({})

  const toggleTask = (taskId: string) => {
    setCheckedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }))
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-800 border-r border-slate-700 p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
            <Settings className="w-5 h-5" />
            <span className="text-sm">Panou de control</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg cursor-pointer">
            <Activity className="w-5 h-5" />
            <span className="text-sm">Monitorizare Simptome</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg cursor-pointer">
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm">Mesagerie Securizată</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg cursor-pointer">
            <FileText className="w-5 h-5" />
            <span className="text-sm">Dosar Medical Digital</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="text-sm">Notificări Inteligente</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg cursor-pointer">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm">Statistici Personalizate</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg cursor-pointer">
            <UserPlus className="w-5 h-5" />
            <span className="text-sm">Înregistrare Pacient</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-pink-500">MP</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-pink-400">Bine ai revenit, Maria Popescu!</h1>
              <p className="text-sm text-slate-400">
                Rol: Pacient • Email: maria.popescu@exemplu.com • Ultima conectare: Azi, 10:35
              </p>
              <p className="text-xs text-slate-500">
                Ești sumarit să-ți iei pentru astăzi. Medicul(a) îți sugerează să te suspendezi.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              Editează Profil
            </Button>
            <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
              Vezi Dosarul Medical
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Programări Viitoare */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-400" />
                <CardTitle className="text-lg">Programări Viitoare</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400">
                Vezi Toate <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-400">Consultații și tratamente programate.</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-slate-600 text-xs">CC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">Control Oncologic</p>
                      <p className="text-xs text-slate-400">Mâine, 10:00 Dr. Emily Carter</p>
                      <p className="text-xs text-slate-500">Clinica de Oncologie, Et.2, Cam.302</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-pink-500 text-white">Confirmat</Badge>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Detalii
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Reprogramează
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-pink-500 text-xs">CC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">Ședința de Chimioterapie #3</p>
                      <p className="text-xs text-slate-400">28 Oct, 14:00 cu Centrul de Cancer</p>
                      <p className="text-xs text-slate-500">Secția Oncologie</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-pink-500 text-white">Confirmat</Badge>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Detalii
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Reprogramează
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-slate-600 text-xs">CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">Consultație Nutriționist</p>
                      <p className="text-xs text-slate-400">2 Nov, 11:30 cu Sarah Miller, RD</p>
                      <p className="text-xs text-slate-500">Întâlnire virtuală</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-blue-400 text-blue-400">
                      În așteptare
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Detalii
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Reprogramează
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sarcini pentru Azi */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-pink-400" />
                <CardTitle className="text-lg">Sarcini pentru Azi</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400">
                Vezi Toate <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-400">Rămai la curent cu planul tău zilnic.</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={checkedTasks["task1"] || false} onCheckedChange={() => toggleTask("task1")} />
                    <span className="text-sm">Administrează medicația de dimineață (Set 1)</span>
                  </div>
                  <Badge className="bg-red-500 text-white">Ratată</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={checkedTasks["task2"] || false} onCheckedChange={() => toggleTask("task2")} />
                    <span className="text-sm">Pregătește întrebări pentru Dr. Carter</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Modific
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm">Ești minim 21 de apă</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Modific
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={checkedTasks["task4"] || false} onCheckedChange={() => toggleTask("task4")} />
                    <span className="text-sm">Plimbarea ușoară seara (30 min)</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Scurtă
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Notificări Critice */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <CardTitle className="text-lg">Notificări Critice</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400">
                Vezi Toate <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-400">Alerte și informații importante.</p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-red-400">Valori anormale analize sânge</p>
                    <p className="text-xs text-slate-400">Contactează medicul curant pentru interpretare.</p>
                    <p className="text-xs text-slate-500">Azi, 09:30</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-yellow-400">Programare chimioterapie reprogramată</p>
                    <p className="text-xs text-slate-400">Noua dată este Marți, ora 10:00. Verifică calendarul.</p>
                    <p className="text-xs text-slate-500">Ieri, 17:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plan de Tratament Activ */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-pink-400" />
                <CardTitle className="text-lg">Plan de Tratament Activ</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-400">Sumarul planului tău curent de îngrijire.</p>

              <div className="p-4 bg-slate-700 rounded-lg">
                <h3 className="font-semibold mb-2">Protocol CHOP - Ciclul 2/6</h3>
                <p className="text-sm text-slate-400 mb-2">Data început: 15 Octombrie 2024</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs">Status:</span>
                  <Badge className="bg-green-600 text-white">Activ în desfășurare</Badge>
                </div>
                <p className="text-xs text-slate-400 mb-4">Următorul pas: Ședința de chimioterapie #3 - 28 Octombrie</p>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                    Detalii Plan Complet
                  </Button>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    Istoric Tratamente
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Ultimele Documente */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-pink-400" />
                <CardTitle className="text-lg">Ultimele Documente</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400">
                Vezi Tot Dosarul <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-400">Documentele medicale adăugate recent.</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Rezultate CT Abdomen</p>
                    <p className="text-xs text-slate-400">Adăugat: 20 Oct 2024</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      PDF
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Sumar Consultație Dr. Carter</p>
                    <p className="text-xs text-slate-400">Adăugat: 18 Oct 2024</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      Raport
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Analize Sânge Pre-chimioterapie</p>
                    <p className="text-xs text-slate-400">Adăugat: 15 Oct 2024</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      PDF
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resurse Utile */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-pink-400" />
                <CardTitle className="text-lg">Resurse Utile</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400">
                Vezi Toate <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-400">Materiale educaționale recomandate.</p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Managementul Grețului în Timpul Chimioterapiei</p>
                      <p className="text-xs text-slate-400">Sfaturi practice și recomandări.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Importanța Nutriției pentru Pacientul Oncologic</p>
                      <p className="text-xs text-slate-400">Ghid video cu un nutriționist.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-pink-400" />
              <CardTitle className="text-lg">Acțiuni Rapide</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400 mb-4">Accesează rapid funcțiile cheie ale OncaLink Assist.</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-64 right-0 bg-slate-800 border-t border-slate-700 p-4">
        <div className="flex justify-center gap-8">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-pink-400">
            <Activity className="w-5 h-5" />
            <span className="text-xs">Monitorizare Simptome</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Mesaje</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <FileText className="w-5 h-5" />
            <span className="text-xs">Dosar Medical</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Statistici Sănătate</span>
          </Button>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-6 flex flex-col gap-3">
        <Button size="icon" className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600">
          <Plus className="w-6 h-6" />
        </Button>
        <Button size="icon" className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600">
          <User className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
