"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye, Plus, FileText, Stethoscope, Clipboard } from "lucide-react"
import type { MedicalConsultation } from "@/types/medical-record"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ConsultationsReportsProps {
  consultations: MedicalConsultation[]
  showViewAll?: boolean
}

export function ConsultationsReports({ consultations, showViewAll = false }: ConsultationsReportsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType ? consultation.type === selectedType : true

    return matchesSearch && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "consultation":
        return <Stethoscope className="h-5 w-5 text-purple-500" />
      case "report":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "discharge":
        return <Clipboard className="h-5 w-5 text-green-500" />
      case "prescription":
        return <FileText className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "consultation":
        return "Consultație"
      case "report":
        return "Raport Medical"
      case "discharge":
        return "Bilet de Externare"
      case "prescription":
        return "Rețetă"
      default:
        return "Document"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consultation":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "report":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "discharge":
        return "bg-green-100 text-green-800 border-green-200"
      case "prescription":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Consultații și Rapoarte Medicale
            </CardTitle>
            <CardDescription>Vizualizați istoricul consultațiilor și rapoartelor medicale</CardDescription>
          </div>
          {showViewAll && (
            <Button variant="outline" size="sm">
              Vezi toate
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută consultații și rapoarte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrează
          </Button>
        </div>

        {/* Consultations List */}
        <div className="space-y-4">
          {filteredConsultations.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nu există consultații sau rapoarte</h3>
              <p className="text-muted-foreground mb-4">
                Nu au fost găsite consultații sau rapoarte care să corespundă criteriilor de căutare.
              </p>
            </div>
          ) : (
            filteredConsultations.map((consultation) => (
              <div
                key={consultation.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">{getTypeIcon(consultation.type)}</div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{consultation.title}</h3>
                      <Badge variant="outline" className={getTypeColor(consultation.type)}>
                        {getTypeLabel(consultation.type)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {consultation.doctor} • {consultation.specialty}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {consultation.date} • {consultation.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Vezi Detalii
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{consultation.title}</DialogTitle>
                        <DialogDescription>{consultation.date}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className={getTypeColor(consultation.type)}>
                            {getTypeLabel(consultation.type)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">Medic:</p>
                            <p>{consultation.doctor}</p>
                          </div>
                          <div>
                            <p className="font-medium">Specialitate:</p>
                            <p>{consultation.specialty}</p>
                          </div>
                          <div>
                            <p className="font-medium">Locație:</p>
                            <p>{consultation.location}</p>
                          </div>
                          <div>
                            <p className="font-medium">Data:</p>
                            <p>{consultation.date}</p>
                          </div>
                        </div>

                        <div>
                          <p className="font-medium">Descriere:</p>
                          <p>{consultation.description}</p>
                        </div>

                        {consultation.documents && consultation.documents.length > 0 && (
                          <div>
                            <p className="font-medium">Documente asociate:</p>
                            <ul className="list-disc list-inside">
                              {consultation.documents.map((doc, index) => (
                                <li key={index}>{doc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Consultation Button */}
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Adaugă Consultație sau Raport
        </Button>
      </CardContent>
    </Card>
  )
}
