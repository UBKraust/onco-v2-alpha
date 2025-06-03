"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigatorOverview } from "./navigator-overview"
import { PatientManagement } from "./patient-management"
import { AlertsManagement } from "./alerts-management"
import { PatientDetailView } from "./patient-detail-view"
import { BreadcrumbNavigation } from "@/components/ui/breadcrumb-navigation"
import { PageTransition } from "@/components/ui/page-transition"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  Calendar,
  MessageSquare,
  BarChart3,
  GraduationCap,
  Menu,
  User,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useNavigatorData } from "@/hooks/useNavigatorData"
import { AppointmentWizard } from "./appointment-wizard"
import { Clock, FileText } from "lucide-react"

export function NavigatorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { getPatientDetail } = useNavigatorData()

  // Obține detaliile pacientului selectat pentru breadcrumbs
  const selectedPatient = selectedPatientId ? getPatientDetail(selectedPatientId) : null

  // Închide meniul mobil când se schimbă tab-ul
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [activeTab])

  // Funcție pentru selectarea unui pacient
  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId)
    // Dacă nu suntem deja pe tab-ul pacienți, navighează acolo
    if (activeTab !== "patients") {
      setActiveTab("patients")
    }
  }

  // Funcție pentru revenire la lista de pacienți
  const handleBackToList = () => {
    setSelectedPatientId(null)
  }

  // Generează breadcrumbs în funcție de tab-ul activ și pacientul selectat
  const getBreadcrumbs = () => {
    const baseCrumb = {
      label:
        activeTab === "overview"
          ? "Dashboard"
          : activeTab === "patients"
            ? "Pacienți"
            : activeTab === "alerts"
              ? "Alerte"
              : activeTab === "appointments"
                ? "Programări"
                : activeTab === "communication"
                  ? "Comunicare"
                  : activeTab === "analytics"
                    ? "Rapoarte"
                    : "Training",
      href: `/navigator-dashboard/${activeTab}`,
    }

    if (selectedPatientId && selectedPatient) {
      return [
        baseCrumb,
        {
          label: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
          icon: <User className="h-3.5 w-3.5" />,
        },
      ]
    }

    return [baseCrumb]
  }

  // Componenta pentru meniul mobil
  const MobileMenu = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Meniu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <div className="py-6 space-y-1">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === "patients" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("patients")}
          >
            <Users className="mr-2 h-5 w-5" />
            Pacienți
          </Button>
          <Button
            variant={activeTab === "alerts" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("alerts")}
          >
            <AlertTriangle className="mr-2 h-5 w-5" />
            Alerte
          </Button>
          <Button
            variant={activeTab === "appointments" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("appointments")}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Programări
          </Button>
          <Button
            variant={activeTab === "communication" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("communication")}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Comunicare
          </Button>
          <Button
            variant={activeTab === "analytics" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            Rapoarte
          </Button>
          <Button
            variant={activeTab === "training" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("training")}
          >
            <GraduationCap className="mr-2 h-5 w-5" />
            Training
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <div className="min-h-screen bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Header cu navigare */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            {/* Meniu mobil și breadcrumbs */}
            <div className="flex items-center justify-between h-14 md:hidden">
              <MobileMenu />
              <BreadcrumbNavigation items={getBreadcrumbs()} />
            </div>

            {/* Tabs pentru desktop */}
            <TabsList className="hidden md:grid w-full grid-cols-7 h-14">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="patients" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Pacienți</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="hidden sm:inline">Alerte</span>
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Programări</span>
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Comunicare</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Rapoarte</span>
              </TabsTrigger>
              <TabsTrigger value="training" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Training</span>
              </TabsTrigger>
            </TabsList>

            {/* Breadcrumbs pentru desktop */}
            <div className="hidden md:flex h-10 items-center border-t">
              <BreadcrumbNavigation items={getBreadcrumbs()} />
            </div>
          </div>
        </div>

        {/* Conținut principal cu animații de tranziție */}
        <div className="container mx-auto px-4 py-6">
          <TabsContent value="overview" className="mt-0">
            <PageTransition>
              <NavigatorOverview onSelectPatient={handleSelectPatient} />
            </PageTransition>
          </TabsContent>

          <TabsContent value="patients" className="mt-0">
            <PageTransition>
              {selectedPatientId ? (
                <PatientDetailView patientId={selectedPatientId} onBack={handleBackToList} />
              ) : (
                <PatientManagement onSelectPatient={handleSelectPatient} />
              )}
            </PageTransition>
          </TabsContent>

          <TabsContent value="alerts" className="mt-0">
            <PageTransition>
              <AlertsManagement onSelectPatient={handleSelectPatient} />
            </PageTransition>
          </TabsContent>

          <TabsContent value="appointments" className="mt-0">
            <PageTransition>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">Gestionare Programări</h1>
                    <p className="text-muted-foreground">Coordonează programările pentru toți pacienții</p>
                  </div>
                  <AppointmentWizard
                    onAppointmentCreated={(appointment) => {
                      // Handle appointment creation
                      console.log("New appointment created:", appointment)
                    }}
                  />
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Programări Astăzi</h3>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+2 față de ieri</p>
                  </div>

                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">În Așteptare</h3>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">Confirmări necesare</p>
                  </div>

                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Documente Lipsă</h3>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">Necesită urmărire</p>
                  </div>

                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Urgente</h3>
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">Prioritate ridicată</p>
                  </div>
                </div>

                {/* Appointments List */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6 pb-4">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Programări Recente</h3>
                    <p className="text-sm text-muted-foreground">Lista programărilor din ultimele zile</p>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="space-y-4">
                      {/* Mock appointment items */}
                      {[
                        {
                          patient: "Maria Popescu",
                          type: "Consultație Oncologie",
                          date: "2024-01-15",
                          time: "09:00",
                          status: "confirmed",
                        },
                        {
                          patient: "Ion Vasilescu",
                          type: "Chimioterapie",
                          date: "2024-01-15",
                          time: "10:30",
                          status: "pending",
                        },
                        {
                          patient: "Ana Georgescu",
                          type: "Control",
                          date: "2024-01-15",
                          time: "14:00",
                          status: "documents_missing",
                        },
                        {
                          patient: "Mihai Ionescu",
                          type: "Radioterapie",
                          date: "2024-01-16",
                          time: "08:00",
                          status: "urgent",
                        },
                      ].map((appointment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <div>
                              <p className="font-medium">{appointment.patient}</p>
                              <p className="text-sm text-muted-foreground">{appointment.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">{appointment.date}</p>
                              <p className="text-sm text-muted-foreground">{appointment.time}</p>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                appointment.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : appointment.status === "documents_missing"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.status === "confirmed"
                                ? "Confirmată"
                                : appointment.status === "pending"
                                  ? "În așteptare"
                                  : appointment.status === "documents_missing"
                                    ? "Documente lipsă"
                                    : "Urgentă"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </PageTransition>
          </TabsContent>

          <TabsContent value="communication" className="mt-0">
            <PageTransition>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">Centru Comunicare</h1>
                  <p className="text-muted-foreground">Gestionează comunicarea cu pacienții și echipa medicală</p>
                </div>
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground">Centru Comunicare</p>
                  <p className="text-muted-foreground">Secțiunea în dezvoltare</p>
                </div>
              </div>
            </PageTransition>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <PageTransition>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">Rapoarte și Analytics</h1>
                  <p className="text-muted-foreground">Analizează performanța și tendințele pacienților</p>
                </div>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground">Dashboard Analytics</p>
                  <p className="text-muted-foreground">Secțiunea în dezvoltare</p>
                </div>
              </div>
            </PageTransition>
          </TabsContent>

          <TabsContent value="training" className="mt-0">
            <PageTransition>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">Training și Dezvoltare</h1>
                  <p className="text-muted-foreground">Resurse educaționale pentru navigatori medicali</p>
                </div>
                <div className="text-center py-12">
                  <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground">Training Navigator</p>
                  <p className="text-muted-foreground">Secțiunea în dezvoltare</p>
                </div>
              </div>
            </PageTransition>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
