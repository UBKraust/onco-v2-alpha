"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, UserPlus, AlertTriangle, TrendingUp, MessageSquare, Users } from "lucide-react"
import { usePatientList } from "@/hooks/usePatientList"
import { useNavigatorData } from "@/hooks/useNavigatorData"
import { PatientCard } from "./patient-card"
import { useToast } from "@/hooks/use-toast"
import { PatientOnboardingDialog } from "./patient-onboarding-dialog"

interface PatientManagementProps {
  onSelectPatient: (patientId: string) => void
}

export function PatientManagement({ onSelectPatient }: PatientManagementProps) {
  const { patients, getSummaryMetrics, getPatientsByFilter } = usePatientList()
  const { initiatePhoneCall, sendMessage } = useNavigatorData()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [showOnboarding, setShowOnboarding] = useState(false)

  const metrics = getSummaryMetrics()

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRisk = riskFilter === "all" || patient.riskLevel === riskFilter

    return matchesSearch && matchesRisk
  })

  const handlePhoneCall = async (patientId: string) => {
    const result = await initiatePhoneCall(patientId)
    toast({
      title: result.success ? "Apel inițiat" : "Eroare",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    })
  }

  const handleSendMessage = async (patientId: string) => {
    const result = await sendMessage(patientId, "Mesaj rapid din dashboard")
    toast({
      title: result.success ? "Mesaj trimis" : "Eroare",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    })
  }

  const handleViewProfile = (patientId: string) => {
    // Navigate to patient profile page
    window.location.href = `/navigator/patients/${patientId}/details`
  }

  const getTabPatients = (tab: string) => {
    switch (tab) {
      case "critical":
        return getPatientsByFilter("critical")
      case "high-priority":
        return getPatientsByFilter("high-priority")
      case "recent-contact":
        return getPatientsByFilter("recent-contact")
      default:
        return filteredPatients
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestionare Pacienți</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitorizează și gestionează pacienții din grija ta</p>
        </div>
        <Button onClick={() => setShowOnboarding(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Onboarding Pacient
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pacienți</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metrics.total}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{metrics.criticalPatients} critici</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Aderență Medie</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{metrics.averageAdherence}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">+5% față de luna trecută</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Alerte Active</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{metrics.activeAlerts}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{metrics.criticalPatients} critice</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesaje Nerezolvate</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metrics.unreadMessages}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">De la pacienți</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white dark:bg-gray-900">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Caută pacienți după nume sau diagnostic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-48 bg-white dark:bg-gray-800">
                <SelectValue placeholder="Filtrează după risc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toți pacienții</SelectItem>
                <SelectItem value="critical">Risc critic</SelectItem>
                <SelectItem value="high">Risc înalt</SelectItem>
                <SelectItem value="medium">Risc mediu</SelectItem>
                <SelectItem value="low">Risc scăzut</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Mai multe filtre
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white dark:bg-gray-900 border">
          <TabsTrigger value="all">Toți Pacienții ({metrics.total})</TabsTrigger>
          <TabsTrigger value="critical">Critici ({metrics.criticalPatients})</TabsTrigger>
          <TabsTrigger value="high-priority">Prioritate Înaltă ({metrics.highPriorityPatients})</TabsTrigger>
          <TabsTrigger value="recent-contact">Contact Recent ({metrics.recentContactPatients})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                {activeTab === "all" && "Lista Completă Pacienți"}
                {activeTab === "critical" && "Pacienți cu Risc Critic"}
                {activeTab === "high-priority" && "Pacienți Prioritate Înaltă"}
                {activeTab === "recent-contact" && "Contact Recent"}
              </CardTitle>
              <CardDescription>
                {activeTab === "all" && "Toți pacienții din grija ta"}
                {activeTab === "critical" && "Pacienții cu cel mai înalt nivel de risc"}
                {activeTab === "high-priority" && "Pacienții cu prioritate înaltă"}
                {activeTab === "recent-contact" && "Pacienții contactați recent"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in-50 duration-500">
                {getTabPatients(activeTab).map((patient, index) => (
                  <div
                    key={patient.id}
                    className="animate-in slide-in-from-bottom-4 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <PatientCard
                      patient={patient}
                      onSelectPatient={onSelectPatient}
                      onPhoneCall={handlePhoneCall}
                      onSendMessage={handleSendMessage}
                      onViewProfile={() => onSelectPatient(patient.id)}
                    />
                  </div>
                ))}
              </div>

              {getTabPatients(activeTab).length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-gray-600 dark:text-gray-400">Nu există pacienți în această categorie</p>
                  <p className="text-gray-500 dark:text-gray-500">Încearcă să modifici filtrele de căutare</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <PatientOnboardingDialog
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onPatientCreated={(newPatient) => {
          toast({
            title: "Pacient adăugat cu succes!",
            description: `${newPatient.firstName} ${newPatient.lastName} a fost înregistrat în sistem.`,
          })
          setShowOnboarding(false)
        }}
      />
    </div>
  )
}
