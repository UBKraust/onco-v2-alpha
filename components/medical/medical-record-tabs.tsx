"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, User, Pill, Activity, Stethoscope, BarChart, MessageSquare } from "lucide-react"
import { PatientInfoCard } from "./patient-info-card"
import { DiagnosisCard } from "./diagnosis-card"
import { AppointmentsHistory } from "./appointments-history"
import { ConsultationsReports } from "./consultations-reports"
import { TreatmentPlanView } from "./treatment-plan-view"
import { DocumentsManager } from "./documents-manager"
import { SymptomTracker } from "./symptom-tracker"
import { AdherenceScoreCard } from "./adherence-score-card"
import { MedicalNotesView } from "./medical-notes-view"
import { useMedicalRecord } from "@/hooks/useMedicalRecord"

export function MedicalRecordTabs() {
  const [activeTab, setActiveTab] = useState("overview")
  const { medicalRecord, loading, error, addDocument, addSymptom, addNote, updatePatientInfo } = useMedicalRecord()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (error || !medicalRecord) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Nu s-a putut încărca dosarul medical</h3>
        <p className="text-muted-foreground mb-4">
          A apărut o eroare la încărcarea datelor. Vă rugăm să încercați din nou.
        </p>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">Reîncarcă</button>
      </div>
    )
  }

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
        <PatientInfoCard patientInfo={medicalRecord.patientInfo} onUpdate={updatePatientInfo} />
        <DiagnosisCard diagnoses={medicalRecord.diagnoses} />
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Sumar</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Programări</span>
          </TabsTrigger>
          <TabsTrigger value="consultations" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            <span className="hidden sm:inline">Consultații</span>
          </TabsTrigger>
          <TabsTrigger value="treatment" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span className="hidden sm:inline">Tratament</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Documente</span>
          </TabsTrigger>
          <TabsTrigger value="symptoms" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Simptome</span>
          </TabsTrigger>
          <TabsTrigger value="adherence" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Aderență</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Note</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AdherenceScoreCard adherenceScores={medicalRecord.adherenceScores} className="lg:col-span-3" />

            <div className="space-y-6 lg:col-span-2">
              <AppointmentsHistory appointments={medicalRecord.appointments.slice(0, 3)} showViewAll={true} />

              <ConsultationsReports consultations={medicalRecord.consultations.slice(0, 3)} showViewAll={true} />
            </div>

            <div className="space-y-6">
              <TreatmentPlanView
                treatmentPlans={medicalRecord.treatmentPlans}
                medications={medicalRecord.medications}
                compact={true}
              />

              <DocumentsManager
                documents={medicalRecord.documents.slice(0, 3)}
                onAddDocument={addDocument}
                compact={true}
                showViewAll={true}
              />
            </div>
          </div>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-6">
          <AppointmentsHistory appointments={medicalRecord.appointments} showViewAll={false} />
        </TabsContent>

        {/* Consultations Tab */}
        <TabsContent value="consultations" className="space-y-6">
          <ConsultationsReports consultations={medicalRecord.consultations} showViewAll={false} />
        </TabsContent>

        {/* Treatment Tab */}
        <TabsContent value="treatment" className="space-y-6">
          <TreatmentPlanView
            treatmentPlans={medicalRecord.treatmentPlans}
            medications={medicalRecord.medications}
            compact={false}
          />
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <DocumentsManager
            documents={medicalRecord.documents}
            onAddDocument={addDocument}
            compact={false}
            showViewAll={false}
          />
        </TabsContent>

        {/* Symptoms Tab */}
        <TabsContent value="symptoms" className="space-y-6">
          <SymptomTracker symptoms={medicalRecord.symptoms} onAddSymptom={addSymptom} />
        </TabsContent>

        {/* Adherence Tab */}
        <TabsContent value="adherence" className="space-y-6">
          <AdherenceScoreCard adherenceScores={medicalRecord.adherenceScores} detailed={true} />
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-6">
          <MedicalNotesView notes={medicalRecord.notes} onAddNote={addNote} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
