"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type PatientStatus, getStatusInfo, getStatusColor } from "@/types/patient-status"
import { Clock, Activity, Eye, CheckCircle, Pause, Check } from "lucide-react"

interface PatientStatusBadgeProps {
  status: PatientStatus
  className?: string
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
}

const iconMap = {
  Clock,
  Activity,
  Eye,
  CheckCircle,
  Pause,
  Check,
}

export function PatientStatusBadge({ status, className, showIcon = true, size = "md" }: PatientStatusBadgeProps) {
  const statusInfo = getStatusInfo(status)
  const IconComponent = iconMap[statusInfo.icon as keyof typeof iconMap]

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <Badge variant="outline" className={cn(getStatusColor(status), sizeClasses[size], "font-medium border", className)}>
      {showIcon && IconComponent && <IconComponent className={cn(iconSizes[size], "mr-1")} />}
      {statusInfo.label}
    </Badge>
  )
}
