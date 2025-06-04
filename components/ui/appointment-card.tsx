"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, MapPin, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "pending"

interface AppointmentCardProps {
  id: string
  title: string
  doctor: string
  specialty: string
  date: string
  time: string
  location: string
  status: AppointmentStatus
  notes?: string
  priority?: "low" | "normal" | "high" | "urgent"
  className?: string
  onReschedule?: (id: string) => void
  onCancel?: (id: string) => void
}

export function AppointmentCard({
  id,
  title,
  doctor,
  specialty,
  date,
  time,
  location,
  status,
  notes,
  priority = "normal",
  className,
  onReschedule,
  onCancel,
}: AppointmentCardProps) {
  // Configurare pentru statusuri
  const statusConfig = {
    scheduled: {
      label: "Programată",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      icon: Calendar,
    },
    completed: {
      label: "Finalizată",
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      icon: CheckCircle,
    },
    cancelled: { label: "Anulată", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", icon: XCircle },
    pending: {
      label: "În așteptare",
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      icon: AlertCircle,
    },
  }

  // Configurare pentru priorități
  const priorityConfig = {
    low: { label: "Scăzută", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
    normal: { label: "Normală", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    high: { label: "Ridicată", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200" },
    urgent: { label: "Urgentă", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  }

  const StatusIcon = statusConfig[status].icon

  return (
    <Card
      className={cn(
        "transition-shadow",
        "hover:shadow-lg",
        "border border-border",
        "dark:border-dark-border",
        className,
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={statusConfig[status].color}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {statusConfig[status].label}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <User className="h-3 w-3" />
          {doctor} • <span className="text-xs">{specialty}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{location}</span>
          </div>
          {notes && (
            <div className="flex items-start gap-2 mt-2">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground">{notes}</p>
            </div>
          )}
          {priority && (
            <div className="mt-2">
              <Badge className={priorityConfig[priority].color}>Prioritate: {priorityConfig[priority].label}</Badge>
            </div>
          )}
        </div>
      </CardContent>
      {(status === "scheduled" || status === "pending") && (
        <CardFooter className="pt-2 flex gap-2">
          {onReschedule && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReschedule(id)}
              className={cn(
                "flex-1",
                "transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "active:bg-secondary active:text-secondary-foreground",
                "disabled:bg-muted disabled:text-muted-foreground",
                "dark:hover:bg-accent dark:hover:text-accent-foreground",
                "dark:active:bg-secondary dark:active:text-secondary-foreground",
                "dark:disabled:bg-muted dark:disabled:text-muted-foreground",
              )}
            >
              Reprogramează
            </Button>
          )}
          {onCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(id)}
              className={cn(
                "flex-1",
                "text-red-500 border-red-200",
                "hover:bg-red-50 hover:text-red-600 hover:border-red-300",
                "active:bg-red-100 active:text-red-700",
                "disabled:bg-muted disabled:text-muted-foreground disabled:border-muted",
                "dark:text-red-400 dark:border-red-900",
                "dark:hover:bg-red-950 dark:hover:text-red-300 dark:hover:border-red-800",
                "dark:active:bg-red-900 dark:active:text-red-200",
                "dark:disabled:bg-muted dark:disabled:text-muted-foreground dark:disabled:border-muted",
              )}
            >
              Anulează
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
