"use client"

import { useParams } from "next/navigation"
import { PatientDetailsHeader } from "@/components/patient-details/PatientDetailsHeader"
import { PatientOverviewCard } from "@/components/patient-details/PatientOverviewCard"
import { AppointmentsCard } from "@/components/patient-details/AppointmentsCard"
import { TreatmentPlanCard } from "@/components/patient-details/TreatmentPlanCard"
import { QuickStatsCards } from "@/components/patient-details/QuickStatsCards"
import { AlertsRisksCard } from "@/components/patient-details/AlertsRisksCard"
import { SupportNetworkCard } from "@/components/patient-details/SupportNetworkCard"
import { DigitalFileCard } from "@/components/patient-details/DigitalFileCard"
import { ComplianceAICard } from "@/components/patient-details/ComplianceAICard"
import { AdherenceCard } from "@/components/patient-details/AdherenceCard"
import { ObjectivesCard } from "@/components/patient-details/ObjectivesCard"
import { EducationCard } from "@/components/patient-details/EducationCard"
import { BiomarkersCard } from "@/components/patient-details/BiomarkersCard"
import { TimelineCard } from "@/components/patient-details/TimelineCard"
import { ConsultationsCard } from "@/components/patient-details/ConsultationsCard"
import { AdminDocumentsCard } from "@/components/patient-details/AdminDocumentsCard"
import { PsychologicalCard } from "@/components/patient-details/PsychologicalCard"
import { ChatbotCostsCard } from "@/components/patient-details/ChatbotCostsCard"
import { MedicalHistoryCard } from "@/components/patient-details/MedicalHistoryCard"
import { CalendarCard } from "@/components/patient-details/CalendarCard"
import { AIProtocolCard } from "@/components/patient-details/AIProtocolCard"

export default function PatientDetailsPage() {
  const params = useParams()
  const patientId = params.id as string

  return (
    <div className="container mx-auto p-4 space-y-6">
      <PatientDetailsHeader patientId={patientId} />

      <QuickStatsCards patientId={patientId} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cardurile 1-6 */}
        <PatientOverviewCard patientId={patientId} />
        <AppointmentsCard patientId={patientId} />
        <TreatmentPlanCard patientId={patientId} />
        <AlertsRisksCard patientId={patientId} />
        <SupportNetworkCard patientId={patientId} />
        <DigitalFileCard patientId={patientId} />

        {/* Cardurile 7-12 */}
        <ComplianceAICard patientId={patientId} />
        <AdherenceCard patientId={patientId} />
        <ObjectivesCard patientId={patientId} />
        <EducationCard patientId={patientId} />
        <BiomarkersCard patientId={patientId} />
        <TimelineCard patientId={patientId} />

        {/* Cardurile 13-19 */}
        <ConsultationsCard patientId={patientId} />
        <AdminDocumentsCard patientId={patientId} />
        <PsychologicalCard patientId={patientId} />
        <ChatbotCostsCard patientId={patientId} />
        <MedicalHistoryCard patientId={patientId} />
        <CalendarCard patientId={patientId} />
        <AIProtocolCard patientId={patientId} />
      </div>
    </div>
  )
}
