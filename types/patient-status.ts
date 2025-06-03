export type PatientStatus = "in-treatment" | "monitoring" | "completed" | "suspended" | "pre-treatment" | "follow-up"

export interface PatientStatusInfo {
  status: PatientStatus
  statusDate: string
  statusNote?: string
  updatedBy: string
  previousStatus?: PatientStatus
}

export interface StatusOption {
  value: PatientStatus
  label: string
  description: string
  color: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
  icon: string
}

export const PATIENT_STATUS_OPTIONS: StatusOption[] = [
  {
    value: "pre-treatment",
    label: "Pre-tratament",
    description: "Pacient în pregătire pentru începerea tratamentului",
    color: "outline",
    icon: "Clock",
  },
  {
    value: "in-treatment",
    label: "În Tratament",
    description: "Pacient în curs de tratament activ",
    color: "default",
    icon: "Activity",
  },
  {
    value: "monitoring",
    label: "Monitorizare",
    description: "Pacient în perioada de monitorizare post-tratament",
    color: "secondary",
    icon: "Eye",
  },
  {
    value: "follow-up",
    label: "Follow-up",
    description: "Pacient în urmărire pe termen lung",
    color: "success",
    icon: "CheckCircle",
  },
  {
    value: "suspended",
    label: "Suspendat",
    description: "Tratament suspendat temporar",
    color: "warning",
    icon: "Pause",
  },
  {
    value: "completed",
    label: "Finalizat",
    description: "Tratament finalizat cu succes",
    color: "success",
    icon: "Check",
  },
]

export function getStatusInfo(status: PatientStatus): StatusOption {
  return PATIENT_STATUS_OPTIONS.find((option) => option.value === status) || PATIENT_STATUS_OPTIONS[0]
}

export function getStatusColor(status: PatientStatus): string {
  const statusInfo = getStatusInfo(status)
  switch (statusInfo.color) {
    case "default":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "secondary":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "destructive":
      return "bg-red-100 text-red-800 border-red-200"
    case "success":
      return "bg-green-100 text-green-800 border-green-200"
    case "warning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "outline":
      return "bg-white text-gray-600 border-gray-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}
