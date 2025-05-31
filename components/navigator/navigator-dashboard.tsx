"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageTransition } from "@/components/ui/page-transition"
import { AlertsManagement } from "./alerts-management"
import { PatientManagement } from "./patient-management"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { AdvancedAppointmentScheduler } from "@/components/appointments/advanced-appointment-scheduler"
import { AppointmentManagement } from "@/components/appointments/appointment-management"
import { AppointmentCalendarView } from "@/components/appointments/appointment-calendar-view"

export function NavigatorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { toast } = useToast()

  const handleSelectPatient = (patientId: string) => {
    router.push(`/navigator/patients/${patientId}`)
    toast({
      title: "Pacient selectat",
      description: `Navigare către profilul pacientului #${patientId}`,
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Navigator</h1>
        <p className="text-muted-foreground">
          Gestionează pacienții, alertele și programările din rolul tău de navigator oncologic.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="sticky top-0 z-10 bg-background pt-2 pb-4">
          <TabsList className="w-full bg-white dark:bg-gray-900 border">
            <TabsTrigger value="overview" className="flex-1">
              Prezentare Generală
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex-1">
              Pacienți
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex-1">
              Alerte
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex-1">
              Programări
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex-1">
              Comunicare
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1">
              Analize
            </TabsTrigger>
            <TabsTrigger value="training" className="flex-1">
              Training
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-0">
          <PageTransition>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pacienți Activi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 față de luna trecută</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alerte Nerezolvate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 în ultimele 24h</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Programări Astăzi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">3 în următoarele 2 ore</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aderență Medie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">86%</div>
                  <p className="text-xs text-muted-foreground">+2% față de luna trecută</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
              <Card className="col-span-4 bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Activitate Recentă</CardTitle>
                  <CardDescription>Ultimele 10 interacțiuni cu pacienții</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder pentru activitate recentă */}
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4 border-b pb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="space-y-1">
                          <p className="font-medium">Interacțiune cu pacientul</p>
                          <p className="text-sm text-gray-500">Acum {i + 1} ore</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Alerte Critice</CardTitle>
                  <CardDescription>Alerte care necesită atenție imediată</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder pentru alerte critice */}
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-red-800 dark:text-red-300">Alertă critică #{i + 1}</p>
                          <span className="text-xs text-red-700 dark:text-red-400">Acum {i * 2 + 1}h</span>
                        </div>
                        <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                          Descriere alertă critică care necesită atenție imediată
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </PageTransition>
        </TabsContent>

        <TabsContent value="patients" className="mt-0">
          <PageTransition>
            <PatientManagement onSelectPatient={handleSelectPatient} />
          </PageTransition>
        </TabsContent>

        <TabsContent value="alerts" className="mt-0">
          <PageTransition>
            <AlertsManagement />
          </PageTransition>
        </TabsContent>

        <TabsContent value="appointments" className="mt-0">
          <PageTransition>
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Programări</CardTitle>
                <CardDescription>Gestionează programările pacienților</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Programări Recente</h3>
                  <AdvancedAppointmentScheduler />
                </div>

                <div className="grid gap-6 lg:grid-cols-7">
                  <Card className="lg:col-span-3 bg-white dark:bg-gray-900">
                    <CardHeader>
                      <CardTitle className="text-base">Programări Viitoare</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <AppointmentManagement showAllAppointments />
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-4 bg-white dark:bg-gray-900">
                    <CardHeader>
                      <CardTitle className="text-base">Calendar Programări</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <AppointmentCalendarView showFilters={false} />
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </PageTransition>
        </TabsContent>

        <TabsContent value="communication" className="mt-0">
          <PageTransition>
            <div className="grid gap-4">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Comunicare</CardTitle>
                  <CardDescription>Gestionează comunicarea cu pacienții</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder pentru comunicare */}
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Funcționalitate în dezvoltare</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </PageTransition>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <PageTransition>
            <div className="grid gap-4">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Analize</CardTitle>
                  <CardDescription>Vizualizează analizele pacienților</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder pentru analize */}
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Funcționalitate în dezvoltare</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </PageTransition>
        </TabsContent>

        <TabsContent value="training" className="mt-0">
          <PageTransition>
            <div className="grid gap-4">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Training</CardTitle>
                  <CardDescription>Accesează resurse de training</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder pentru training */}
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Funcționalitate în dezvoltare</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </PageTransition>
        </TabsContent>
      </Tabs>
    </div>
  )
}
