"use client"

import { useState } from "react"
import { z } from "zod"

// Validation schemas for each step
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Prenumele trebuie să aibă cel puțin 2 caractere"),
  lastName: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere"),
  dateOfBirth: z.string().min(1, "Data nașterii este obligatorie"),
  gender: z.enum(["male", "female", "other"], { required_error: "Genul este obligatoriu" }),
  phone: z.string().min(10, "Numărul de telefon trebuie să aibă cel puțin 10 cifre"),
  email: z.string().email("Email invalid").optional(),
  address: z.string().min(5, "Adresa trebuie să aibă cel puțin 5 caractere"),
})

const medicalInfoSchema = z.object({
  diagnosis: z.string().min(1, "Diagnosticul este obligatoriu"),
  stage: z.string().min(1, "Stadiul este obligatoriu"),
  primaryPhysician: z.string().min(1, "Medicul primar este obligatoriu"),
  treatmentCenter: z.string().min(1, "Centrul de tratament este obligatoriu"),
  treatmentStartDate: z.string().min(1, "Data începerii tratamentului este obligatorie"),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
})

const emergencyContactSchema = z.object({
  emergencyContactName: z.string().min(2, "Numele contactului de urgență este obligatoriu"),
  emergencyContactPhone: z.string().min(10, "Telefonul contactului de urgență este obligatoriu"),
  emergencyContactRelation: z.string().min(1, "Relația cu contactul de urgență este obligatorie"),
  caregiverName: z.string().optional(),
  caregiverPhone: z.string().optional(),
})

const preferencesSchema = z.object({
  preferredCommunication: z.enum(["phone", "email", "sms"], {
    required_error: "Metoda de comunicare este obligatorie",
  }),
  languagePreference: z.string().min(1, "Preferința de limbă este obligatorie"),
  notificationPreferences: z.array(z.string()).optional(),
  specialNeeds: z.string().optional(),
})

export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type MedicalInfo = z.infer<typeof medicalInfoSchema>
export type EmergencyContact = z.infer<typeof emergencyContactSchema>
export type Preferences = z.infer<typeof preferencesSchema>

export interface OnboardingData {
  personalInfo: Partial<PersonalInfo>
  medicalInfo: Partial<MedicalInfo>
  emergencyContact: Partial<EmergencyContact>
  preferences: Partial<Preferences>
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isActive: boolean
}

export function usePatientOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    personalInfo: {},
    medicalInfo: {},
    emergencyContact: {},
    preferences: {},
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps: OnboardingStep[] = [
    {
      id: "personal",
      title: "Informații Personale",
      description: "Date de identificare și contact",
      isCompleted: false,
      isActive: currentStep === 0,
    },
    {
      id: "medical",
      title: "Informații Medicale",
      description: "Diagnostic și tratament curent",
      isCompleted: false,
      isActive: currentStep === 1,
    },
    {
      id: "emergency",
      title: "Contacte de Urgență",
      description: "Persoane de contact în caz de urgență",
      isCompleted: false,
      isActive: currentStep === 2,
    },
    {
      id: "preferences",
      title: "Preferințe",
      description: "Setări de comunicare și notificări",
      isCompleted: false,
      isActive: currentStep === 3,
    },
  ]

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }))
  }

  const updateMedicalInfo = (info: Partial<MedicalInfo>) => {
    setData((prev) => ({
      ...prev,
      medicalInfo: { ...prev.medicalInfo, ...info },
    }))
  }

  const updateEmergencyContact = (contact: Partial<EmergencyContact>) => {
    setData((prev) => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, ...contact },
    }))
  }

  const updatePreferences = (prefs: Partial<Preferences>) => {
    setData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...prefs },
    }))
  }

  const validateCurrentStep = (): boolean => {
    setErrors({})

    try {
      switch (currentStep) {
        case 0:
          personalInfoSchema.parse(data.personalInfo)
          break
        case 1:
          medicalInfoSchema.parse(data.medicalInfo)
          break
        case 2:
          emergencyContactSchema.parse(data.emergencyContact)
          break
        case 3:
          preferencesSchema.parse(data.preferences)
          break
      }
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path.join(".")] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitOnboarding = async () => {
    if (!validateCurrentStep()) {
      return { success: false, message: "Vă rugăm să completați toate câmpurile obligatorii" }
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new patient object
      const newPatient = {
        id: Date.now().toString(),
        firstName: data.personalInfo.firstName || "",
        lastName: data.personalInfo.lastName || "",
        age: new Date().getFullYear() - new Date(data.personalInfo.dateOfBirth || "").getFullYear(),
        diagnosis: data.medicalInfo.diagnosis || "",
        stage: data.medicalInfo.stage || "",
        riskLevel: "medium" as const,
        adherenceScore: 85,
        lastContact: new Date().toISOString(),
        primaryPhysician: data.medicalInfo.primaryPhysician || "",
        treatmentPhase: "Evaluare inițială",
        unreadMessages: 0,
        activeAlerts: 0,
        recentSymptoms: "Fără simptome raportate",
      }

      return { success: true, patient: newPatient, message: "Pacientul a fost înregistrat cu succes!" }
    } catch (error) {
      return { success: false, message: "A apărut o eroare la înregistrarea pacientului" }
    }
  }

  const resetOnboarding = () => {
    setCurrentStep(0)
    setData({
      personalInfo: {},
      medicalInfo: {},
      emergencyContact: {},
      preferences: {},
    })
    setErrors({})
  }

  return {
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
    validateCurrentStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
  }
}
