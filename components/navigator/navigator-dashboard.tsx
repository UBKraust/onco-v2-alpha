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
                <div>
                  <h1 className="text-3xl font-bold">Gestionare Programări</h1>
                  <p className="text-muted-foreground">Coordonează programările pentru toți pacienții</p>
                </div>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground">Gestionare Programări</p>
                  <p className="text-muted-foreground">Secțiunea în dezvoltare</p>
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
