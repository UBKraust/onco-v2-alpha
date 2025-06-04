"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Eye,
  Download,
  ArrowRight,
  Calendar,
  User,
  FileImage,
  FileSpreadsheet,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"

export function PatientMedicalFileCard() {
  const recentFiles = [
    {
      id: "1",
      name: "Rezultate Analize Complete",
      type: "Analize Laborator",
      date: "15 Ian 2025",
      doctor: "Dr. Maria Popescu",
      size: "2.4 MB",
      format: "PDF",
      status: "Nou",
      priority: "high",
      icon: FileText,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200",
    },
    {
      id: "2",
      name: "Imagistică CT Torace",
      type: "Imagistică",
      date: "12 Ian 2025",
      doctor: "Dr. Alex Radiolog",
      size: "15.2 MB",
      format: "DICOM",
      status: "Vizualizat",
      priority: "normal",
      icon: FileImage,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200",
    },
    {
      id: "3",
      name: "Raport Consultație",
      type: "Consultație",
      date: "10 Ian 2025",
      doctor: "Dr. Elena Oncolog",
      size: "1.1 MB",
      format: "PDF",
      status: "Vizualizat",
      priority: "normal",
      icon: FileSpreadsheet,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200",
    },
  ]

  const vitalSigns = [
    {
      name: "Tensiune Arterială",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      icon: Heart,
      color: "text-green-600",
    },
    {
      name: "Temperatură",
      value: "36.8",
      unit: "°C",
      status: "normal",
      icon: Thermometer,
      color: "text-blue-600",
    },
    {
      name: "Greutate",
      value: "72.5",
      unit: "kg",
      status: "stable",
      icon: Weight,
      color: "text-purple-600",
    },
    {
      name: "Puls",
      value: "78",
      unit: "bpm",
      status: "normal",
      icon: Activity,
      color: "text-orange-600",
    },
  ]

  const fileStats = {
    totalFiles: 47,
    newFiles: 3,
    categories: 8,
    lastUpdate: "15 Ian 2025",
    completeness: 85,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nou":
        return "bg-red-100 text-red-800 border-red-200"
      case "Vizualizat":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Arhivat":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "normal":
        return "bg-blue-500"
      case "low":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            Dosar Medical
          </CardTitle>
          <Link href="/patient/medical-file">
            <Button size="sm" className="flex items-center gap-1">
              Vezi Complet
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Statistics */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-2xl font-bold text-blue-600">{fileStats.totalFiles}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Documente</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{fileStats.newFiles}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Documente Noi</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-blue-700 dark:text-blue-300">Completitudine Dosar</span>
              <span className="font-medium text-blue-600">{fileStats.completeness}%</span>
            </div>
            <Progress value={fileStats.completeness} className="h-2" />
          </div>
        </div>

        {/* Recent Files */}
        <div>
          <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Fișiere Recente</h4>
          <div className="space-y-3">
            {recentFiles.map((file) => {
              const IconComponent = file.icon
              return (
                <div
                  key={file.id}
                  className={`p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer ${file.bgColor} ${file.borderColor}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <IconComponent className={`h-5 w-5 mt-0.5 ${file.color}`} />
                      <div
                        className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getPriorityColor(file.priority)}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h5 className="font-medium text-sm text-gray-900 dark:text-white truncate pr-2">{file.name}</h5>
                        <Badge variant="outline" className={`${getStatusColor(file.status)} text-xs shrink-0`}>
                          {file.status}
                        </Badge>
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {file.type} • {file.format} • {file.size}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <User className="h-3 w-3" />
                          {file.doctor}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          {file.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Vital Signs Preview */}
        <div>
          <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Semne Vitale Recente</h4>
          <div className="grid grid-cols-2 gap-3">
            {vitalSigns.map((vital, index) => {
              const IconComponent = vital.icon
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className={`h-4 w-4 ${vital.color}`} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{vital.name}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{vital.value}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{vital.unit}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Încarcă Document
          </Button>
          <Link href="/patient/medical-file" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              Vezi Istoric
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
