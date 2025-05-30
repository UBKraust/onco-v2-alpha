"use client"

import type React from "react"
import { MedicalRecordInterface } from "@/components/medical/medical-record-interface"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { AppointmentScheduler } from "@/components/appointments/appointment-scheduler"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Stethoscope, Pill, TestTube, Activity, FileText, Upload, AlertTriangle, TrendingUp } from "lucide-react"

export default function MedicalFileClientPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)
  const [appointmentForm, setAppointmentForm] = useState({
    type: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
    priority: "normal",
  })

  // Mock data for overview statistics
  const overviewStats = {
    totalDocuments: 24,
    newDocuments: 3,
    pendingAlerts: 2,
    nextAppointment: "25 Nov 2024",
    lastUpdate: "20 Nov 2024",
    adherenceScore: 85,
  }

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking appointment:", appointmentForm)
    // Here you would typically send the data to your backend
    setShowAppointmentDialog(false)
    setAppointmentForm({
      type: "",
      doctor: "",
      date: "",
      time: "",
      reason: "",
      priority: "normal",
    })
  }

  const updateAppointmentForm = (field: string, value: string) => {
    setAppointmentForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="container py-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dosar Medical</h1>
          <p className="text-muted-foreground">Gestionează și monitorizează toate aspectele îngrijirii tale medicale</p>
        </div>
        <div className="flex gap-2">
          <AppointmentScheduler variant="outline" />
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Documente</p>
                <p className="text-2xl font-bold">{overviewStats.totalDocuments}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
            {overviewStats.newDocuments > 0 && (
              <Badge variant="secondary" className="mt-2">
                {overviewStats.newDocuments} noi
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alerte Active</p>
                <p className="text-2xl font-bold">{overviewStats.pendingAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
            {overviewStats.pendingAlerts > 0 && (
              <Badge variant="destructive" className="mt-2">
                Necesită atenție
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aderență Tratament</p>
                <p className="text-2xl font-bold">{overviewStats.adherenceScore}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <Badge variant="outline" className="mt-2">
              Foarte bună
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Următoarea Programare</p>
                <p className="text-lg font-semibold">{overviewStats.nextAppointment}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
            <Badge variant="outline" className="mt-2">
              Dr. Elena Oncolog
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Prezentare
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Date Personale
          </TabsTrigger>
          <TabsTrigger value="diagnosis" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Diagnostic
          </TabsTrigger>
          <TabsTrigger value="treatment" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Tratament
          </TabsTrigger>
          <TabsTrigger value="lab-results" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Analize
          </TabsTrigger>
          <TabsTrigger value="symptoms" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Simptome
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Istoric
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activitate Recentă</CardTitle>
                  <CardDescription>Ultimele evenimente din dosarul tău medical</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        type: "document",
                        title: "Rezultate CT Abdomen",
                        date: "20 Nov 2024",
                        status: "nou",
                        icon: FileText,
                      },
                      {
                        type: "symptom",
                        title: "Raportare simptome - Oboseală moderată",
                        date: "19 Nov 2024",
                        status: "monitorizat",
                        icon: Activity,
                      },
                      {
                        type: "treatment",
                        title: "Ciclu 3 Chimioterapie - Finalizat",
                        date: "18 Nov 2024",
                        status: "complet",
                        icon: Pill,
                      },
                      {
                        type: "lab",
                        title: "Analize Sânge - Hemoglobina scăzută",
                        date: "17 Nov 2024",
                        status: "alertă",
                        icon: TestTube,
                      },
                    ].map((activity, index) => {
                      const IconComponent = activity.icon
                      return (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">{activity.date}</p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              activity.status === "nou"
                                ? "default"
                                : activity.status === "alertă"
                                  ? "destructive"
                                  : activity.status === "complet"
                                    ? "secondary"
                                    : "outline"
                            }
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Încărcare Documente</CardTitle>
                  <CardDescription>Adaugă documente noi în dosarul tău medical</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Încarcă documente medicale</p>
                    <p className="text-sm text-muted-foreground mb-4">Suportă PDF, JPG, PNG până la 10MB</p>
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Selectează Fișiere
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alerte și Notificări</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-orange-800">Hemoglobina scăzută</span>
                    </div>
                    <p className="text-sm text-orange-700 mt-1">Valoare: 9.2 g/dL (Normal: 12-15 g/dL)</p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Programare apropiată</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">Consultație oncologie în 5 zile</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progres Tratament</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cicluri Chimioterapie</span>
                        <span>3/6</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Aderență Medicație</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other Tabs - Placeholder content */}
        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Date Personale</CardTitle>
              <CardDescription>Informațiile tale personale și de contact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-semibold mb-2">Date Personale</p>
                <p className="text-muted-foreground">Modulul în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnosis" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic</CardTitle>
              <CardDescription>Informații despre diagnosticul tău</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Stethoscope className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-semibold mb-2">Diagnostic</p>
                <p className="text-muted-foreground">Modulul în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tratament</CardTitle>
              <CardDescription>Planul tău de tratament</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-semibold mb-2">Tratament</p>
                <p className="text-muted-foreground">Modulul în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab-results" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analize</CardTitle>
              <CardDescription>Rezultatele analizelor tale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TestTube className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-semibold mb-2">Analize</p>
                <p className="text-muted-foreground">Modulul în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symptoms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Simptome</CardTitle>
              <CardDescription>Monitorizarea simptomelor tale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-semibold mb-2">Simptome</p>
                <p className="text-muted-foreground">Modulul în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Istoric</CardTitle>
              <CardDescription>Timeline-ul evenimentelor medicale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-semibold mb-2">Istoric</p>
                <p className="text-muted-foreground">Modulul în dezvoltare</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Medical Record Interface */}
      <MedicalRecordInterface />
    </div>
  )
}
