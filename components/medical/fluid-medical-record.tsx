"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Activity, Pill, Download, Search, Filter, ChevronDown, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MedicalDocument {
  id: string
  title: string
  type: "consultation" | "analysis" | "imaging" | "prescription"
  date: string
  doctor: string
  status: "completed" | "pending" | "scheduled"
  priority: "low" | "medium" | "high"
  summary?: string
}

const mockDocuments: MedicalDocument[] = [
  {
    id: "1",
    title: "Consultație oncologie",
    type: "consultation",
    date: "2024-01-15",
    doctor: "Dr. Maria Popescu",
    status: "completed",
    priority: "high",
    summary: "Evaluare progres tratament, ajustare doze",
  },
  {
    id: "2",
    title: "Analize sanguine complete",
    type: "analysis",
    date: "2024-01-10",
    doctor: "Lab. Central",
    status: "completed",
    priority: "medium",
    summary: "Hemograma, biochimie, markeri tumorali",
  },
  {
    id: "3",
    title: "CT torace-abdomen",
    type: "imaging",
    date: "2024-01-08",
    doctor: "Dr. Ion Radu",
    status: "completed",
    priority: "high",
    summary: "Evaluare răspuns la tratament",
  },
]

const typeIcons = {
  consultation: FileText,
  analysis: Activity,
  imaging: Eye,
  prescription: Pill,
}

const typeLabels = {
  consultation: "Consultație",
  analysis: "Analize",
  imaging: "Imagistică",
  prescription: "Rețete",
}

const statusColors = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-blue-100 text-blue-800",
}

const priorityColors = {
  low: "border-l-gray-300",
  medium: "border-l-yellow-400",
  high: "border-l-red-400",
}

export function FluidMedicalRecord() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [filteredDocuments, setFilteredDocuments] = useState(mockDocuments)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    let filtered = mockDocuments

    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((doc) => doc.type === selectedType)
    }

    setFilteredDocuments(filtered)
  }, [searchTerm, selectedType])

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dosar Medical</h1>
          <p className="text-gray-600">Istoricul complet al consultațiilor și investigațiilor</p>
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Căutare documente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtre
            <ChevronDown className={cn("h-4 w-4 transition-transform", isFilterOpen && "rotate-180")} />
          </Button>

          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedType === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType("all")}
                  >
                    Toate
                  </Button>
                  {Object.entries(typeLabels).map(([type, label]) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Documents Grid */}
      <motion.div layout className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredDocuments.map((document, index) => {
            const Icon = typeIcons[document.type]

            return (
              <motion.div
                key={document.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                whileHover={{ scale: 1.01 }}
                className="group"
              >
                <Card
                  className={cn(
                    "border-l-4 transition-all duration-200 hover:shadow-lg",
                    priorityColors[document.priority],
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 truncate">{document.title}</h3>
                            <Badge className={statusColors[document.status]}>
                              {document.status === "completed"
                                ? "Finalizat"
                                : document.status === "pending"
                                  ? "În așteptare"
                                  : "Programat"}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Dr. {document.doctor}</p>
                            <p>{new Date(document.date).toLocaleDateString("ro-RO")}</p>
                            {document.summary && <p className="text-gray-500">{document.summary}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nu au fost găsite documente</h3>
          <p className="text-gray-600 mb-4">Încercați să modificați criteriile de căutare sau filtrele.</p>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Adaugă document nou
          </Button>
        </motion.div>
      )}

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {Object.entries(typeLabels).map(([type, label]) => {
          const count = mockDocuments.filter((doc) => doc.type === type).length
          const Icon = typeIcons[type as keyof typeof typeIcons]

          return (
            <Card key={type} className="text-center">
              <CardContent className="p-4">
                <Icon className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{label}</div>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>
    </div>
  )
}
