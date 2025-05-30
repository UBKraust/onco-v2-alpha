"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Activity,
  Calendar,
  FileText,
  MessageSquare,
  AlertTriangle,
  GraduationCap,
  Clock,
  ArrowLeft,
  Phone,
  Video,
  Mail,
  User,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useNavigatorData } from "@/hooks/useNavigatorData"
import { motion } from "framer-motion"

interface PatientDetailViewProps {
  patientId: string
  onBack: () => void
}

export function PatientDetailView({ patientId, onBack }: PatientDetailViewProps) {
  const { getPatientDetail } = useNavigatorData()
  const [activeTab, setActiveTab] = useState("overview")
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const patient = getPatientDetail(patientId)

  // Detectează scroll pentru a fixa header-ul
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Pacient negăsit</h3>
          <p className="text-muted-foreground">Nu am putut găsi informațiile pentru acest pacient.</p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi
          </Button>
        </div>
      </div>
    )
  }

  const getAdherenceColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case "critical":
        return "Critic"
      case "high":
        return "Risc Înalt"
      case "medium":
        return "Risc Mediu"
      default:
        return "Risc Scăzut"
    }
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  // Animații pentru tab-uri
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header cu informații pacient - sticky pe scroll */}
      <div
        className={`${
          isScrolled
            ? "sticky top-[104px] md:top-24 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b pb-4"
            : ""
        } transition-all duration-200`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <Avatar className="h-16 w-16 shrink-0">
              <AvatarImage
                src={`/placeholder.svg?height=64&width=64&text=${patient.firstName[0]}${patient.lastName[0]}`}
              />
              <AvatarFallback>
                {patient.firstName[0]}
                {patient.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-2xl font-bold truncate">
                  {patient.firstName} {patient.lastName}
                </h2>
                <Badge variant={getRiskBadgeVariant(patient.riskLevel)}>{getRiskLabel(patient.riskLevel)}</Badge>
              </div>

              <p className="text-muted-foreground mb-2 truncate">
                {patient.diagnosis} • Stadiul {patient.stage} • {patient.age} ani
              </p>

              <div className="flex items-center gap-4 text-sm flex-wrap">
                <div>
                  <span className="text-muted-foreground">Aderență:</span>
                  <span className={`ml-1 font-medium ${getAdherenceColor(patient.adherenceScore)}`}>
                    {patient.adherenceScore}%
                  </span>
                </div>

                <Separator orientation="vertical" className="h-4 hidden sm:block" />

                <div>
                  <span className="text-muted-foreground">Tratament:</span>
                  <span className="ml-1">{patient.treatmentPhase}</span>
                </div>

                {patient.nextAppointment && (
                  <>
                    <Separator orientation="vertical" className="h-4 hidden sm:block" />
                    <div>
                      <span className="text-muted-foreground">Următoarea programare:</span>
                      <span className="ml-1">{new Date(patient.nextAppointment).toLocaleDateString("ro-RO")}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Acțiuni rapide - vizibile doar pe desktop când nu e scrolled */}
          <div className={`hidden md:flex gap-2 ${isScrolled ? "opacity-0" : "opacity-100"} transition-opacity`}>
            <Button size="sm" variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              <span>Contactează</span>
            </Button>
            <Button size="sm" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              <span>Email</span>
            </Button>
            <Button size="sm" variant="outline">
              <Video className="mr-2 h-4 w-4" />
              <span>Video</span>
            </Button>
            <Button size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Programare</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs pentru diferite secțiuni - cu scroll horizontal pe mobile */}
      <div className="relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative">
            {/* Indicatori de scroll pentru mobile */}
            {isMobile && (
              <>
                <div className="absolute left-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-r from-background to-transparent flex items-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-80">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute right-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-l from-background to-transparent flex items-center justify-end">
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-80">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {/* Tabs cu scroll horizontal */}
            <div className="overflow-x-auto scrollbar-hide">
              <TabsList className="w-max min-w-full">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Cronologie</span>
                </TabsTrigger>
                <TabsTrigger value="symptoms" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span>Simptome</span>
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Documente</span>
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Note</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Educație</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Tab Overview */}
          <TabsContent value="overview" className="mt-6">
            <motion.div
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Conținut tab overview - același ca înainte */}
              {/* ... */}
            </motion.div>
          </TabsContent>

          {/* Celelalte tab-uri cu animații */}
          <TabsContent value="timeline" className="mt-6">
            <motion.div variants={tabVariants} initial="hidden" animate="visible">
              {/* Conținut tab timeline - același ca înainte */}
              {/* ... */}
            </motion.div>
          </TabsContent>

          {/* Restul tab-urilor cu animații */}
          {/* ... */}
        </Tabs>
      </div>

      {/* Quick Actions Bar pentru mobile - cu animație de slide-up */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-background border-t p-2 flex justify-center gap-2 md:hidden z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 30 }}
      >
        <Button variant="outline" size="sm" className="flex-1">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Mail className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Calendar className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <AlertTriangle className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  )
}
