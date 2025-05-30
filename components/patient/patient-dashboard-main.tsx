"use client"
import { PatientOverviewCard } from "./patient-overview-card"
import { RecentActivityList } from "./recent-activity-list"
import { AlertsNotifications } from "./alerts-notifications"
import { TreatmentProgressBar } from "./treatment-progress-bar"
import { DocumentUploadArea } from "./document-upload-area"
import { QuickMessageWidget } from "./quick-message-widget"

// Mock data
const mockData = {
  overview: {
    totalDocuments: 24,
    activeAlerts: 2,
    treatmentAdherence: 85,
    nextAppointment: {
      date: "15 Ianuarie 2024",
      doctor: "Maria Popescu",
    },
  },
  activities: [
    {
      id: "1",
      type: "document" as const,
      title: "Rezultate CT Abdomen",
      date: "12 Ianuarie 2024",
      status: "nou" as const,
    },
    {
      id: "2",
      type: "symptom" as const,
      title: "Raportare simptome (oboseală moderată)",
      date: "11 Ianuarie 2024",
      status: "monitorizat" as const,
    },
    {
      id: "3",
      type: "treatment" as const,
      title: "Ciclu 3 chimioterapie finalizat",
      date: "10 Ianuarie 2024",
      status: "complet" as const,
    },
    {
      id: "4",
      type: "analysis" as const,
      title: "Analize sânge (Hemoglobină scăzută)",
      date: "9 Ianuarie 2024",
      status: "alertă" as const,
    },
  ],
  alerts: [
    {
      id: "1",
      type: "critical" as const,
      title: "Hemoglobină scăzută",
      description: "Valoare: 9.2 g/dL (Normal: 12-15 g/dL). Vă rugăm să contactați medicul.",
      actionLabel: "Contactează medicul",
    },
    {
      id: "2",
      type: "warning" as const,
      title: "Programare apropiată",
      description: "Consultație oncologică în 5 zile cu Dr. Maria Popescu.",
      actionLabel: "Vezi detalii",
    },
  ],
  treatment: {
    chemoCycles: {
      completed: 3,
      total: 6,
    },
    medicationAdherence: 85,
    nextTreatment: {
      date: "20 Ianuarie 2024",
      type: "Ciclu 4 Chimioterapie",
    },
  },
}

export function PatientDashboardMain() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Pacient</h1>
        <p className="text-muted-foreground">Gestionează și monitorizează toate aspectele îngrijirii tale medicale</p>
      </div>

      {/* Overview Cards */}
      <PatientOverviewCard {...mockData.overview} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <RecentActivityList activities={mockData.activities} />
          <DocumentUploadArea />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <AlertsNotifications alerts={mockData.alerts} />
          <TreatmentProgressBar {...mockData.treatment} />
        </div>
      </div>

      {/* Quick Message Widget */}
      <QuickMessageWidget />
    </div>
  )
}
