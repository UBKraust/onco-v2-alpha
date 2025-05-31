"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { usePatientOnboarding } from "@/hooks/usePatientOnboarding"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, ChevronRight, User, Heart, Phone, Settings, CheckCircle } from "lucide-react"

interface PatientOnboardingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPatientCreated: (patient: any) => void
}

export function PatientOnboardingDialog({ open, onOpenChange, onPatientCreated }: PatientOnboardingDialogProps) {
  const {
    currentStep,
    steps,
    data,
    errors,
    updatePersonalInfo,
    updateMedicalInfo,
    updateEmergencyContact,
    updatePreferences,
    nextStep,
    prevStep,
    submitOnboarding,
    resetOnboarding,
    isFirstStep,
    isLastStep,
  } = usePatientOnboarding()

  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const result = await submitOnboarding()

    if (result.success && result.patient) {
      onPatientCreated(result.patient)
      resetOnboarding()
      toast({
        title: "Succes!",
        description: result.message,
      })
    } else {
      toast({
        title: "Eroare",
        description: result.message,
        variant: "destructive",
      })
    }
    setIsSubmitting(false)
  }

  const getStepIcon = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <User className="h-5 w-5" />
      case 1:
        return <Heart className="h-5 w-5" />
      case 2:
        return <Phone className="h-5 w-5" />
      case 3:
        return <Settings className="h-5 w-5" />
      default:
        return <CheckCircle className="h-5 w-5" />
    }
  }

  const renderPersonalInfoStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Prenume *</Label>
          <Input
            id="firstName"
            value={data.personalInfo.firstName || ""}
            onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
            className={errors["firstName"] ? "border-red-500" : ""}
          />
          {errors["firstName"] && <p className="text-sm text-red-500 mt-1">{errors["firstName"]}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Nume *</Label>
          <Input
            id="lastName"
            value={data.personalInfo.lastName || ""}
            onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
            className={errors["lastName"] ? "border-red-500" : ""}
          />
          {errors["lastName"] && <p className="text-sm text-red-500 mt-1">{errors["lastName"]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">Data nașterii *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.personalInfo.dateOfBirth || ""}
            onChange={(e) => updatePersonalInfo({ dateOfBirth: e.target.value })}
            className={errors["dateOfBirth"] ? "border-red-500" : ""}
          />
          {errors["dateOfBirth"] && <p className="text-sm text-red-500 mt-1">{errors["dateOfBirth"]}</p>}
        </div>
        <div>
          <Label htmlFor="gender">Gen *</Label>
          <Select
            value={data.personalInfo.gender || ""}
            onValueChange={(value) => updatePersonalInfo({ gender: value as any })}
          >
            <SelectTrigger className={errors["gender"] ? "border-red-500" : ""}>
              <SelectValue placeholder="Selectează genul" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Masculin</SelectItem>
              <SelectItem value="female">Feminin</SelectItem>
              <SelectItem value="other">Altul</SelectItem>
            </SelectContent>
          </Select>
          {errors["gender"] && <p className="text-sm text-red-500 mt-1">{errors["gender"]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Telefon *</Label>
          <Input
            id="phone"
            value={data.personalInfo.phone || ""}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            className={errors["phone"] ? "border-red-500" : ""}
          />
          {errors["phone"] && <p className="text-sm text-red-500 mt-1">{errors["phone"]}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email || ""}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            className={errors["email"] ? "border-red-500" : ""}
          />
          {errors["email"] && <p className="text-sm text-red-500 mt-1">{errors["email"]}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="address">Adresa *</Label>
        <Textarea
          id="address"
          value={data.personalInfo.address || ""}
          onChange={(e) => updatePersonalInfo({ address: e.target.value })}
          className={errors["address"] ? "border-red-500" : ""}
        />
        {errors["address"] && <p className="text-sm text-red-500 mt-1">{errors["address"]}</p>}
      </div>
    </div>
  )

  const renderMedicalInfoStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="diagnosis">Diagnostic *</Label>
          <Input
            id="diagnosis"
            value={data.medicalInfo.diagnosis || ""}
            onChange={(e) => updateMedicalInfo({ diagnosis: e.target.value })}
            className={errors["diagnosis"] ? "border-red-500" : ""}
          />
          {errors["diagnosis"] && <p className="text-sm text-red-500 mt-1">{errors["diagnosis"]}</p>}
        </div>
        <div>
          <Label htmlFor="stage">Stadiu *</Label>
          <Input
            id="stage"
            value={data.medicalInfo.stage || ""}
            onChange={(e) => updateMedicalInfo({ stage: e.target.value })}
            className={errors["stage"] ? "border-red-500" : ""}
          />
          {errors["stage"] && <p className="text-sm text-red-500 mt-1">{errors["stage"]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="primaryPhysician">Medic primar *</Label>
          <Input
            id="primaryPhysician"
            value={data.medicalInfo.primaryPhysician || ""}
            onChange={(e) => updateMedicalInfo({ primaryPhysician: e.target.value })}
            className={errors["primaryPhysician"] ? "border-red-500" : ""}
          />
          {errors["primaryPhysician"] && <p className="text-sm text-red-500 mt-1">{errors["primaryPhysician"]}</p>}
        </div>
        <div>
          <Label htmlFor="treatmentCenter">Centru de tratament *</Label>
          <Input
            id="treatmentCenter"
            value={data.medicalInfo.treatmentCenter || ""}
            onChange={(e) => updateMedicalInfo({ treatmentCenter: e.target.value })}
            className={errors["treatmentCenter"] ? "border-red-500" : ""}
          />
          {errors["treatmentCenter"] && <p className="text-sm text-red-500 mt-1">{errors["treatmentCenter"]}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="treatmentStartDate">Data începerii tratamentului *</Label>
        <Input
          id="treatmentStartDate"
          type="date"
          value={data.medicalInfo.treatmentStartDate || ""}
          onChange={(e) => updateMedicalInfo({ treatmentStartDate: e.target.value })}
          className={errors["treatmentStartDate"] ? "border-red-500" : ""}
        />
        {errors["treatmentStartDate"] && <p className="text-sm text-red-500 mt-1">{errors["treatmentStartDate"]}</p>}
      </div>

      <div>
        <Label htmlFor="allergies">Alergii</Label>
        <Textarea
          id="allergies"
          value={data.medicalInfo.allergies || ""}
          onChange={(e) => updateMedicalInfo({ allergies: e.target.value })}
          placeholder="Listează orice alergii cunoscute..."
        />
      </div>

      <div>
        <Label htmlFor="currentMedications">Medicație curentă</Label>
        <Textarea
          id="currentMedications"
          value={data.medicalInfo.currentMedications || ""}
          onChange={(e) => updateMedicalInfo({ currentMedications: e.target.value })}
          placeholder="Listează medicația curentă..."
        />
      </div>
    </div>
  )

  const renderEmergencyContactStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="emergencyContactName">Nume contact urgență *</Label>
          <Input
            id="emergencyContactName"
            value={data.emergencyContact.emergencyContactName || ""}
            onChange={(e) => updateEmergencyContact({ emergencyContactName: e.target.value })}
            className={errors["emergencyContactName"] ? "border-red-500" : ""}
          />
          {errors["emergencyContactName"] && (
            <p className="text-sm text-red-500 mt-1">{errors["emergencyContactName"]}</p>
          )}
        </div>
        <div>
          <Label htmlFor="emergencyContactPhone">Telefon contact urgență *</Label>
          <Input
            id="emergencyContactPhone"
            value={data.emergencyContact.emergencyContactPhone || ""}
            onChange={(e) => updateEmergencyContact({ emergencyContactPhone: e.target.value })}
            className={errors["emergencyContactPhone"] ? "border-red-500" : ""}
          />
          {errors["emergencyContactPhone"] && (
            <p className="text-sm text-red-500 mt-1">{errors["emergencyContactPhone"]}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="emergencyContactRelation">Relația cu contactul de urgență *</Label>
        <Input
          id="emergencyContactRelation"
          value={data.emergencyContact.emergencyContactRelation || ""}
          onChange={(e) => updateEmergencyContact({ emergencyContactRelation: e.target.value })}
          className={errors["emergencyContactRelation"] ? "border-red-500" : ""}
          placeholder="ex: soț/soție, fiu/fiică, părinte"
        />
        {errors["emergencyContactRelation"] && (
          <p className="text-sm text-red-500 mt-1">{errors["emergencyContactRelation"]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="caregiverName">Nume îngrijitor (opțional)</Label>
          <Input
            id="caregiverName"
            value={data.emergencyContact.caregiverName || ""}
            onChange={(e) => updateEmergencyContact({ caregiverName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="caregiverPhone">Telefon îngrijitor (opțional)</Label>
          <Input
            id="caregiverPhone"
            value={data.emergencyContact.caregiverPhone || ""}
            onChange={(e) => updateEmergencyContact({ caregiverPhone: e.target.value })}
          />
        </div>
      </div>
    </div>
  )

  const renderPreferencesStep = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="preferredCommunication">Metoda preferată de comunicare *</Label>
        <Select
          value={data.preferences.preferredCommunication || ""}
          onValueChange={(value) => updatePreferences({ preferredCommunication: value as any })}
        >
          <SelectTrigger className={errors["preferredCommunication"] ? "border-red-500" : ""}>
            <SelectValue placeholder="Selectează metoda de comunicare" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="phone">Telefon</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
          </SelectContent>
        </Select>
        {errors["preferredCommunication"] && (
          <p className="text-sm text-red-500 mt-1">{errors["preferredCommunication"]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="languagePreference">Limba preferată *</Label>
        <Select
          value={data.preferences.languagePreference || ""}
          onValueChange={(value) => updatePreferences({ languagePreference: value })}
        >
          <SelectTrigger className={errors["languagePreference"] ? "border-red-500" : ""}>
            <SelectValue placeholder="Selectează limba" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ro">Română</SelectItem>
            <SelectItem value="en">Engleză</SelectItem>
            <SelectItem value="hu">Maghiară</SelectItem>
          </SelectContent>
        </Select>
        {errors["languagePreference"] && <p className="text-sm text-red-500 mt-1">{errors["languagePreference"]}</p>}
      </div>

      <div>
        <Label htmlFor="specialNeeds">Nevoi speciale (opțional)</Label>
        <Textarea
          id="specialNeeds"
          value={data.preferences.specialNeeds || ""}
          onChange={(e) => updatePreferences({ specialNeeds: e.target.value })}
          placeholder="Descrie orice nevoi speciale sau cerințe de îngrijire..."
        />
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfoStep()
      case 1:
        return renderMedicalInfoStep()
      case 2:
        return renderEmergencyContactStep()
      case 3:
        return renderPreferencesStep()
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Onboarding Pacient Nou
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Progres</span>
              <span>
                {currentStep + 1} din {steps.length}
              </span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>

          {/* Steps Navigation */}
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 ${
                  index === currentStep
                    ? "text-blue-600 dark:text-blue-400"
                    : index < currentStep
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-400 dark:text-gray-600"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    index === currentStep
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : index < currentStep
                        ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {getStepIcon(index)}
                </div>
                <div className="hidden md:block">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-xs">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">{steps[currentStep].title}</CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent>{renderCurrentStep()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={isFirstStep} className="flex items-center space-x-2">
              <ChevronLeft className="h-4 w-4" />
              <span>Înapoi</span>
            </Button>

            {isLastStep ? (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center space-x-2">
                {isSubmitting ? "Se salvează..." : "Finalizează Înregistrarea"}
              </Button>
            ) : (
              <Button onClick={nextStep} className="flex items-center space-x-2">
                <span>Următorul</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
