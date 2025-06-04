"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { User, Heart, Users, FileText, CheckCircle, ArrowLeft, ArrowRight, Save } from "lucide-react"
import { cn } from "@/lib/utils"

interface PatientData {
  // Date personale
  firstName: string
  lastName: string
  cnp: string
  dateOfBirth: string
  phone: string
  email: string
  address: string
  city: string
  county: string

  // Date medicale
  diagnosis: string
  stage: string
  primaryPhysician: string
  clinic: string
  treatmentStartDate: string

  // Contact aparținător
  caregiverName: string
  caregiverRelation: string
  caregiverPhone: string
  caregiverEmail: string

  // Date suplimentare
  height: string
  weight: string
  bloodType: string
  allergies: string
  emergencyContact: string
  emergencyPhone: string

  // Consimțăminte
  consentTreatment: boolean
  consentData: boolean
  consentCommunication: boolean
}

interface OnboardingWizardProps {
  onComplete: (data: PatientData) => void
  onCancel: () => void
}

const STEPS = [
  {
    id: 1,
    title: "Date Personale",
    description: "Informații de bază ale pacientului",
    icon: User,
  },
  {
    id: 2,
    title: "Date Medicale",
    description: "Diagnostic și echipa medicală",
    icon: Heart,
  },
  {
    id: 3,
    title: "Contact Aparținător",
    description: "Persoana de contact și suport",
    icon: Users,
  },
  {
    id: 4,
    title: "Date Suplimentare",
    description: "Informații medicale detaliate",
    icon: FileText,
  },
  {
    id: 5,
    title: "Finalizare",
    description: "Consimțăminte și confirmare",
    icon: CheckCircle,
  },
]

export function PatientOnboardingWizard({ onComplete, onCancel }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<PatientData>({
    firstName: "",
    lastName: "",
    cnp: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    county: "",
    diagnosis: "",
    stage: "",
    primaryPhysician: "",
    clinic: "",
    treatmentStartDate: "",
    caregiverName: "",
    caregiverRelation: "",
    caregiverPhone: "",
    caregiverEmail: "",
    height: "",
    weight: "",
    bloodType: "",
    allergies: "",
    emergencyContact: "",
    emergencyPhone: "",
    consentTreatment: false,
    consentData: false,
    consentCommunication: false,
  })

  const updateFormData = (field: keyof PatientData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    onComplete(formData)
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.cnp && formData.phone
      case 2:
        return formData.diagnosis && formData.primaryPhysician && formData.clinic
      case 3:
        return formData.caregiverName && formData.caregiverPhone
      case 4:
        return true // Optional fields
      case 5:
        return formData.consentTreatment && formData.consentData
      default:
        return false
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Adăugare Pacient Nou</h1>
        <p className="text-muted-foreground">Completează informațiile necesare pentru înregistrarea pacientului</p>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progres completare</span>
            <span className="text-sm text-muted-foreground">
              {currentStep} din {STEPS.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Steps Navigation */}
      <div className="flex justify-between mb-8 overflow-x-auto">
        {STEPS.map((step, index) => {
          const Icon = step.icon
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id
          const isValid = isStepValid(step.id)

          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center min-w-0 flex-1 px-2",
                index < STEPS.length - 1 && "border-r border-border",
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors",
                  isActive && "bg-primary text-primary-foreground",
                  isCompleted && "bg-green-500 text-white",
                  !isActive && !isCompleted && "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-center">
                <p className={cn("text-sm font-medium", isActive && "text-primary", isCompleted && "text-green-600")}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(STEPS[currentStep - 1].icon, { className: "h-5 w-5" })}
            {STEPS[currentStep - 1].title}
          </CardTitle>
          <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Date Personale */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prenume *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  placeholder="Prenumele pacientului"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nume *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  placeholder="Numele de familie"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnp">CNP *</Label>
                <Input
                  id="cnp"
                  value={formData.cnp}
                  onChange={(e) => updateFormData("cnp", e.target.value)}
                  placeholder="1234567890123"
                  maxLength={13}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Data nașterii</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="0712345678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="pacient@email.com"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Adresa</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  placeholder="Strada, numărul, sector/oraș"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Oraș</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  placeholder="București"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="county">Județ</Label>
                <Select value={formData.county} onValueChange={(value) => updateFormData("county", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează județul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bucuresti">București</SelectItem>
                    <SelectItem value="ilfov">Ilfov</SelectItem>
                    <SelectItem value="cluj">Cluj</SelectItem>
                    <SelectItem value="timis">Timiș</SelectItem>
                    <SelectItem value="brasov">Brașov</SelectItem>
                    {/* Add more counties */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Date Medicale */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnostic *</Label>
                <Select value={formData.diagnosis} onValueChange={(value) => updateFormData("diagnosis", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează diagnosticul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cancer-san">Cancer de sân</SelectItem>
                    <SelectItem value="cancer-pulmonar">Cancer pulmonar</SelectItem>
                    <SelectItem value="cancer-colon">Cancer de colon</SelectItem>
                    <SelectItem value="limfom-hodgkin">Limfom Hodgkin</SelectItem>
                    <SelectItem value="limfom-non-hodgkin">Limfom Non-Hodgkin</SelectItem>
                    <SelectItem value="leucemie">Leucemie</SelectItem>
                    <SelectItem value="cancer-prostata">Cancer de prostată</SelectItem>
                    <SelectItem value="cancer-ovarian">Cancer ovarian</SelectItem>
                    <SelectItem value="altul">Altul</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stage">Stadiul</Label>
                <Select value={formData.stage} onValueChange={(value) => updateFormData("stage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează stadiul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="I">Stadiul I</SelectItem>
                    <SelectItem value="II">Stadiul II</SelectItem>
                    <SelectItem value="III">Stadiul III</SelectItem>
                    <SelectItem value="IV">Stadiul IV</SelectItem>
                    <SelectItem value="remisie">În remisie</SelectItem>
                    <SelectItem value="necunoscut">Necunoscut</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryPhysician">Medic primar *</Label>
                <Select
                  value={formData.primaryPhysician}
                  onValueChange={(value) => updateFormData("primaryPhysician", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează medicul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-popescu">Dr. Popescu Maria</SelectItem>
                    <SelectItem value="dr-ionescu">Dr. Ionescu Alexandru</SelectItem>
                    <SelectItem value="dr-georgescu">Dr. Georgescu Ana</SelectItem>
                    <SelectItem value="dr-dumitrescu">Dr. Dumitrescu Ion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic">Clinica *</Label>
                <Select value={formData.clinic} onValueChange={(value) => updateFormData("clinic", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează clinica" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fundeni">Institutul Fundeni</SelectItem>
                    <SelectItem value="elias">Spitalul Elias</SelectItem>
                    <SelectItem value="floreasca">Spitalul Floreasca</SelectItem>
                    <SelectItem value="colentina">Spitalul Colentina</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="treatmentStartDate">Data începerii tratamentului</Label>
                <Input
                  id="treatmentStartDate"
                  type="date"
                  value={formData.treatmentStartDate}
                  onChange={(e) => updateFormData("treatmentStartDate", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3: Contact Aparținător */}
          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="caregiverName">Nume aparținător *</Label>
                <Input
                  id="caregiverName"
                  value={formData.caregiverName}
                  onChange={(e) => updateFormData("caregiverName", e.target.value)}
                  placeholder="Numele complet al aparținătorului"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caregiverRelation">Relația cu pacientul</Label>
                <Select
                  value={formData.caregiverRelation}
                  onValueChange={(value) => updateFormData("caregiverRelation", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează relația" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sot">Soț/Soție</SelectItem>
                    <SelectItem value="copil">Copil</SelectItem>
                    <SelectItem value="parinte">Părinte</SelectItem>
                    <SelectItem value="frate">Frate/Soră</SelectItem>
                    <SelectItem value="prieten">Prieten apropiat</SelectItem>
                    <SelectItem value="altul">Altul</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="caregiverPhone">Telefon aparținător *</Label>
                <Input
                  id="caregiverPhone"
                  value={formData.caregiverPhone}
                  onChange={(e) => updateFormData("caregiverPhone", e.target.value)}
                  placeholder="0712345678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caregiverEmail">Email aparținător</Label>
                <Input
                  id="caregiverEmail"
                  type="email"
                  value={formData.caregiverEmail}
                  onChange={(e) => updateFormData("caregiverEmail", e.target.value)}
                  placeholder="aparinator@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Contact de urgență</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                  placeholder="Nume persoană contact urgență"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Telefon urgență</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => updateFormData("emergencyPhone", e.target.value)}
                  placeholder="0712345678"
                />
              </div>
            </div>
          )}

          {/* Step 4: Date Suplimentare */}
          {currentStep === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="height">Înălțime (cm)</Label>
                <Input
                  id="height"
                  value={formData.height}
                  onChange={(e) => updateFormData("height", e.target.value)}
                  placeholder="175"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Greutate (kg)</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => updateFormData("weight", e.target.value)}
                  placeholder="70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodType">Grupa sanguină</Label>
                <Select value={formData.bloodType} onValueChange={(value) => updateFormData("bloodType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează grupa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="allergies">Alergii cunoscute</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => updateFormData("allergies", e.target.value)}
                  placeholder="Enumeră alergiile cunoscute (medicamente, alimente, etc.)"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 5: Finalizare */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Rezumat informații pacient</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Nume:</strong> {formData.firstName} {formData.lastName}
                  </div>
                  <div>
                    <strong>CNP:</strong> {formData.cnp}
                  </div>
                  <div>
                    <strong>Telefon:</strong> {formData.phone}
                  </div>
                  <div>
                    <strong>Diagnostic:</strong> {formData.diagnosis}
                  </div>
                  <div>
                    <strong>Medic primar:</strong> {formData.primaryPhysician}
                  </div>
                  <div>
                    <strong>Aparținător:</strong> {formData.caregiverName}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Consimțăminte necesare</h3>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consentTreatment"
                    checked={formData.consentTreatment}
                    onCheckedChange={(checked) => updateFormData("consentTreatment", checked as boolean)}
                  />
                  <Label htmlFor="consentTreatment" className="text-sm leading-relaxed">
                    Consimțământ pentru tratament și îngrijire medicală *
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consentData"
                    checked={formData.consentData}
                    onCheckedChange={(checked) => updateFormData("consentData", checked as boolean)}
                  />
                  <Label htmlFor="consentData" className="text-sm leading-relaxed">
                    Consimțământ pentru prelucrarea datelor personale conform GDPR *
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consentCommunication"
                    checked={formData.consentCommunication}
                    onCheckedChange={(checked) => updateFormData("consentCommunication", checked as boolean)}
                  />
                  <Label htmlFor="consentCommunication" className="text-sm leading-relaxed">
                    Consimțământ pentru comunicare prin email, SMS și telefon
                  </Label>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Anulează
          </Button>
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          {currentStep < STEPS.length ? (
            <Button onClick={nextStep} disabled={!isStepValid(currentStep)}>
              Continuă
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid(currentStep)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvează Pacient
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
