"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  FileText,
  Calendar,
  User,
  Pill,
  Activity,
  Eye,
  Filter,
  Plus,
  Edit,
  Stethoscope,
  Clipboard,
} from "lucide-react"

interface PatientInfo {
  name: string
  dateOfBirth: string
  gender: string
  cnp: string
  address: string
  phone: string
  email: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

interface MedicalHistoryItem {
  id: string
  type: "consultation" | "report" | "discharge" | "prescription"
  title: string
  date: string
  doctor: string
  specialty: string
  description: string
  status: "completed" | "pending" | "cancelled"
  documents?: string[]
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  prescribedBy: string
  status: "active" | "completed" | "discontinued"
  instructions: string
}

interface Diagnosis {
  primary: string
  date: string
  stage: string
  doctor: string
  description: string
}

export function MedicalRecordInterface() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("consultations")

  // Mock data
  const patientInfo: PatientInfo = {
    name: "Maria Popescu",
    dateOfBirth: "18.03.1979",
    gender: "F",
    cnp: "2790318123456",
    address: "Str. Exemplu Nr. 123, București",
    phone: "+40 721 123 456",
    email: "maria.popescu@email.com",
    emergencyContact: {
      name: "Ion Popescu",
      phone: "+40 721 654 321",
      relationship: "Soț",
    },
  }

  const diagnosis: Diagnosis = {
    primary: "Carcinom mamar invaziv, Stad. IA, Dr. Florin Oncolog",
    date: "05.11.2023",
    stage: "Stadiul IA",
    doctor: "Dr. Florin Oncolog (medic familie)",
    description: "Diagnostic confirmat prin biopsie și imagistică",
  }

  const medicalHistory: MedicalHistoryItem[] = [
    {
      id: "1",
      type: "consultation",
      title: "Consultație de control oncologic",
      date: "15 ian 2024",
      doctor: "Dr. Elena Oncolog",
      specialty: "Oncologie",
      description: "Pacient stabil, continuă tratamentul conform protocolului. Urmează cursul pentru 3 luni.",
      status: "completed",
    },
    {
      id: "2",
      type: "report",
      title: "Scrisoare Medicală - Recomandări post-externare",
      date: "12 ian 2024",
      doctor: "Dr. Radu Internist",
      specialty: "Medicină Internă",
      description: "Recomandări pentru regimul alimentar, activități fizice și monitorizarea simptomelor.",
      status: "completed",
    },
    {
      id: "3",
      type: "discharge",
      title: "Bilet de Externare - Spitalul Clinic Județean",
      date: "10 ian 2024",
      doctor: "Dr. Elena Georgescu",
      specialty: "Chirurgie",
      description: "Intervenție pentru investigații. Evoluție favorabilă. Externare beneficiară.",
      status: "completed",
    },
    {
      id: "4",
      type: "report",
      title: "Sumar Internare - Chimioterapie Ciclu #2",
      date: "07 ian 2024",
      doctor: "Dr. Centrul Oncologic",
      specialty: "Oncologie",
      description: "Administrare doza #2 de chimioterapie conform protocolului. Toleranță bună.",
      status: "completed",
    },
    {
      id: "5",
      type: "report",
      title: "Raport Medical Imagistic - PET-CT",
      date: "03 ian 2024",
      doctor: "Dr. Alex Radiolog",
      specialty: "Radiologie",
      description:
        "Comparativ cu examinarea anterioară, se observă o ușoară reducere a activității metabolice în nodulul pulmonar cunoscut.",
      status: "completed",
    },
  ]

  const medications: Medication[] = [
    {
      id: "1",
      name: "Tamoxifen",
      dosage: "20mg",
      frequency: "1 dată pe zi",
      startDate: "15.11.2023",
      prescribedBy: "Dr. Elena Oncolog",
      status: "active",
      instructions: "Se administrează dimineața, pe stomacul gol",
    },
    {
      id: "2",
      name: "Acid Folic",
      dosage: "5mg",
      frequency: "3 ori pe săptămână",
      startDate: "20.11.2023",
      prescribedBy: "Dr. Elena Oncolog",
      status: "active",
      instructions: "Luni, Miercuri, Vineri",
    },
    {
      id: "3",
      name: "Omeprazol",
      dosage: "20mg",
      frequency: "1 dată pe zi",
      startDate: "15.11.2023",
      endDate: "15.02.2024",
      prescribedBy: "Dr. Radu Internist",
      status: "completed",
      instructions: "Cu 30 minute înainte de masă",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "consultation":
        return <Stethoscope className="h-4 w-4" />
      case "report":
        return <FileText className="h-4 w-4" />
      case "discharge":
        return <Clipboard className="h-4 w-4" />
      case "prescription":
        return <Pill className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return <Badge variant="default">Consultație</Badge>
      case "report":
        return <Badge variant="secondary">Scrisoare Medicală</Badge>
      case "discharge":
        return <Badge variant="outline">Bilet de Externare</Badge>
      case "prescription":
        return <Badge variant="destructive">Rețetă</Badge>
      default:
        return <Badge variant="outline">Document</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Activ</Badge>
      case "completed":
        return <Badge variant="outline">Completat</Badge>
      case "discontinued":
        return <Badge variant="destructive">Întrerupt</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredHistory = medicalHistory.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Dosarul Meu Medical</h1>
        <p className="text-muted-foreground">
          Accesați și gestionați toate informațiile medicale înregistrate în sistem.
        </p>
      </div>

      {/* Patient Info and Diagnosis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informații Pacient
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-patient.jpg" />
                <AvatarFallback>MP</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{patientInfo.name}</h3>
                <p className="text-muted-foreground">Data nașterii: {patientInfo.dateOfBirth}</p>
                <p className="text-muted-foreground">
                  Sex: {patientInfo.gender} • CNP: {patientInfo.cnp}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Contact:</p>
                <p className="text-muted-foreground">{patientInfo.phone}</p>
                <p className="text-muted-foreground">{patientInfo.email}</p>
              </div>
              <div>
                <p className="font-medium">Persoană de contact:</p>
                <p className="text-muted-foreground">{patientInfo.emergencyContact.name}</p>
                <p className="text-muted-foreground">{patientInfo.emergencyContact.phone}</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Edit className="mr-2 h-4 w-4" />
              Editează Date Personale
            </Button>
          </CardContent>
        </Card>

        {/* Primary Diagnosis Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Diagnoză Principală
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">{diagnosis.primary}</h3>
              <p className="text-muted-foreground mt-2">
                {diagnosis.date} - {diagnosis.doctor}
              </p>
              <p className="text-sm mt-2">{diagnosis.description}</p>
            </div>

            <Button variant="outline" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              Adaugă Diagnostic
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="consultations" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            <span className="hidden sm:inline">Istoric Programări</span>
            <span className="sm:hidden">Programări</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Consultații și Rapoarte</span>
            <span className="sm:hidden">Rapoarte</span>
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span className="hidden sm:inline">Planul de Tratament</span>
            <span className="sm:hidden">Tratament</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Documente Generale</span>
            <span className="sm:hidden">Documente</span>
          </TabsTrigger>
        </TabsList>

        {/* Medical History Tab */}
        <TabsContent value="consultations" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Istoric Consultații și Rapoarte Medicale</h2>
              <p className="text-muted-foreground">
                Vizualizați sumarul consultațiilor, rapoartelor medicale, biletelor de externare etc.
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adaugă Înregistrare Medicală
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Caută după tip, doctor, tip, specialitate..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrează
            </Button>
          </div>

          {/* Medical History Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{item.doctor}</p>
                    <p className="text-sm text-muted-foreground">{item.specialty}</p>
                  </div>

                  <div className="flex items-center gap-2">{getTypeBadge(item.type)}</div>

                  <p className="text-sm">{item.description}</p>

                  <Button className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Vezi Detalii
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Rapoarte Medicale</h3>
            <p className="text-muted-foreground mb-4">Aici vor fi afișate rapoartele medicale detaliate</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adaugă Raport
            </Button>
          </div>
        </TabsContent>

        {/* Medications Tab */}
        <TabsContent value="medications" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Planul de Tratament Activ</h2>
              <p className="text-muted-foreground">Sumarul medicației și tratamentelor în curs</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adaugă Medicament
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {medications.map((medication) => (
              <Card key={medication.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Pill className="h-5 w-5" />
                        {medication.name}
                      </CardTitle>
                      <CardDescription>
                        {medication.dosage} • {medication.frequency}
                      </CardDescription>
                    </div>
                    {getStatusBadge(medication.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Data început:</p>
                      <p className="text-muted-foreground">{medication.startDate}</p>
                    </div>
                    {medication.endDate && (
                      <div>
                        <p className="font-medium">Data sfârșit:</p>
                        <p className="text-muted-foreground">{medication.endDate}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-sm">Prescris de:</p>
                    <p className="text-muted-foreground text-sm">{medication.prescribedBy}</p>
                  </div>

                  <div>
                    <p className="font-medium text-sm">Instrucțiuni:</p>
                    <p className="text-sm">{medication.instructions}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Editează
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      Detalii
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Documente Generale</h3>
            <p className="text-muted-foreground mb-4">Aici vor fi afișate documentele generale și formularele</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Încarcă Document
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
