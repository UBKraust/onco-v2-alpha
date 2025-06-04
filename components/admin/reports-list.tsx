"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Calendar, Download, Play, Edit, Trash2, MoreHorizontal, Search, Plus } from "lucide-react"
import type { Report } from "@/types/reports"

interface ReportsListProps {
  reports: Report[]
  loading: boolean
  onExecute: (reportId: string) => void
  onEdit: (report: Report) => void
  onDelete: (reportId: string) => void
  onCreate: () => void
}

export function ReportsList({ reports, loading, onExecute, onEdit, onDelete, onCreate }: ReportsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || report.type === typeFilter
    const matchesStatus = statusFilter === "all" || report.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: Report["status"]) => {
    const variants = {
      active: "default" as const,
      draft: "secondary" as const,
      archived: "outline" as const,
    }

    const labels = {
      active: "Activ",
      draft: "Draft",
      archived: "Arhivat",
    }

    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  const getTypeBadge = (type: Report["type"]) => {
    const colors = {
      patient: "bg-blue-100 text-blue-800",
      navigator: "bg-green-100 text-green-800",
      system: "bg-purple-100 text-purple-800",
      financial: "bg-yellow-100 text-yellow-800",
      clinical: "bg-red-100 text-red-800",
    }

    const labels = {
      patient: "Pacienți",
      navigator: "Navigatori",
      system: "Sistem",
      financial: "Financiar",
      clinical: "Clinic",
    }

    return <Badge className={colors[type]}>{labels[type]}</Badge>
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "-"
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rapoarte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Rapoarte</CardTitle>
            <CardDescription>Gestionează și execută rapoarte administrative</CardDescription>
          </div>
          <Button onClick={onCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Raport Nou
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filtre */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută rapoarte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tip raport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate tipurile</SelectItem>
              <SelectItem value="patient">Pacienți</SelectItem>
              <SelectItem value="navigator">Navigatori</SelectItem>
              <SelectItem value="system">Sistem</SelectItem>
              <SelectItem value="financial">Financiar</SelectItem>
              <SelectItem value="clinical">Clinic</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate</SelectItem>
              <SelectItem value="active">Activ</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Arhivat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabel rapoarte */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nume Raport</TableHead>
              <TableHead>Tip</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ultima Generare</TableHead>
              <TableHead>Dimensiune</TableHead>
              <TableHead>Programare</TableHead>
              <TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">{report.description}</div>
                  </div>
                </TableCell>
                <TableCell>{getTypeBadge(report.type)}</TableCell>
                <TableCell>{getStatusBadge(report.status)}</TableCell>
                <TableCell>
                  {report.lastGenerated ? (
                    <div className="text-sm">
                      {report.lastGenerated.toLocaleDateString("ro-RO")}
                      <br />
                      <span className="text-muted-foreground">
                        {report.lastGenerated.toLocaleTimeString("ro-RO", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Niciodată</span>
                  )}
                </TableCell>
                <TableCell>{formatFileSize(report.size)}</TableCell>
                <TableCell>
                  {report.schedule?.enabled ? (
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      {report.schedule.frequency}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Manual</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button size="sm" variant="outline" onClick={() => onExecute(report.id)}>
                      <Play className="h-3 w-3 mr-1" />
                      Rulează
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(report)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editează
                        </DropdownMenuItem>
                        {report.downloadUrl && (
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => onDelete(report.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Șterge
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Nu există rapoarte</h3>
            <p className="text-muted-foreground">
              {searchTerm || typeFilter !== "all" || statusFilter !== "all"
                ? "Nu s-au găsit rapoarte cu criteriile selectate."
                : "Creează primul raport pentru a începe."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
