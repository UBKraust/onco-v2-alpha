"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PatientOnboardingWizard } from "./patient-onboarding-wizard"
import { useToast } from "@/hooks/use-toast"

interface PatientData {
  firstName: string
  lastName: string
  cnp: string
  dateOfBirth: string
  phone: string
  email: string
  address: string
  city: string
  county: string
  diagnosis: string
  stage: string
  primaryPhysician: string
  clinic: string
  treatmentStartDate: string
  caregiverName: string
  caregiverRelation: string
  caregiverPhone: string
  caregiverEmail: string
  height: string
  weight: string
  bloodType: string
  allergies: string
  emergencyContact: string
  emergencyPhone: string
  consentTreatment: boolean
  consentData: boolean
  consentCommunication: boolean
}

interface PatientOnboardingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPatientAdded?: (patient: PatientData) => void
}

export function PatientOnboardingDialog({ open, onOpenChange, onPatientAdded }: PatientOnboardingDialogProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleComplete = async (data: PatientData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Here you would typically make an API call to save the patient
      console.log("Saving patient data:", data)

      toast({
        title: "Pacient adăugat cu succes!",
        description: `${data.firstName} ${data.lastName} a fost înregistrat în sistem.`,
      })

      onPatientAdded?.(data)
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Eroare la salvare",
        description: "Nu s-a putut salva pacientul. Încearcă din nou.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Adăugare Pacient Nou</DialogTitle>
        </DialogHeader>

        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-lg font-medium">Se salvează pacientul...</p>
            <p className="text-muted-foreground">Te rugăm să aștepți</p>
          </div>
        ) : (
          <PatientOnboardingWizard onComplete={handleComplete} onCancel={handleCancel} />
        )}
      </DialogContent>
    </Dialog>
  )
}
