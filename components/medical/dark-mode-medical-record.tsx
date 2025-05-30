"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  User,
  Stethoscope,
  Pill,
  Activity,
  Eye,
  Plus,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockDocuments = [
  {
    id: 1,
    title: "Analize de sânge - Hemoleucogramă",
    type: "Analize",
    date: "2024-01-15",
    doctor: "Dr. Maria Ionescu",
    priority: "normal",
    status: "completed",
    category: "laboratory",
  },
  {
    id: 2,
    title: "Tomografie computerizată - Torace",
    type: "Imagistică",
    date: "2024-01-10",
    doctor: "Dr. Alexandru Popescu",
    priority: "high",
    status: "completed",
    category: "imaging",
  },
  {
    id: 3,
    title: "Consultație oncologică",
    type: "Consultație",
    date: "2024-01-08",
    doctor: "Dr. Elena Radu",
    priority: "normal",
    status: "completed",
    category: "consultation",
  },
  {
    id: 4,
    title: "Plan de tratament - Chimioterapie",
    type: "Tratament",
    date: "2024-01-05",
    doctor: "Dr. Elena Radu",
    priority: "high",
    status: "active",
    category: "treatment",
  },
]

const categoryIcons = {
  laboratory: Activity,
  imaging: Eye,
  consultation: Stethoscope,
  treatment: Pill,
  general: FileText,
}

const priorityColors = {
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  normal: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  urgent: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
}

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  active: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
}

export function DarkModeMedicalRecord() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dosar Medical</h1>
          <p className="text-muted-foreground">Gestionează și vizualizează documentele medicale</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adaugă Document
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Caută documente, medici..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Categorie
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedCategory("all")}>Toate</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory("laboratory")}>Analize</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory("imaging")}>Imagistică</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory("consultation")}>Consultații</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory("treatment")}>Tratamente</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((document) => {
          const CategoryIcon = categoryIcons[document.category as keyof typeof categoryIcons] || FileText

          return (
            <Card
              key={document.id}
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-0 bg-card/50 backdrop-blur"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <CategoryIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                        {document.title}
                      </CardTitle>
                      <CardDescription className="text-sm">{document.type}</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Vizualizează</DropdownMenuItem>
                      <DropdownMenuItem>Descarcă</DropdownMenuItem>
                      <DropdownMenuItem>Partajează</DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem className="text-red-600">Șterge</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(document.date).toLocaleDateString("ro-RO")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{document.doctor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={priorityColors[document.priority as keyof typeof priorityColors]}
                    >
                      {document.priority === "high"
                        ? "Prioritate mare"
                        : document.priority === "low"
                          ? "Prioritate mică"
                          : "Normal"}
                    </Badge>
                    <Badge variant="outline" className={statusColors[document.status as keyof typeof statusColors]}>
                      {document.status === "completed"
                        ? "Finalizat"
                        : document.status === "active"
                          ? "Activ"
                          : document.status === "pending"
                            ? "În așteptare"
                            : "Anulat"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <Card className="border-0 bg-card/50 backdrop-blur">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nu s-au găsit documente</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Nu există documente care să corespundă criteriilor de căutare. Încearcă să modifici filtrele sau să adaugi
              un document nou.
            </p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Adaugă primul document
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
