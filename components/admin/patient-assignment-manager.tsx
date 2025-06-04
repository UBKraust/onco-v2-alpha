"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { UserPlus, Search, Filter, ArrowRight } from "lucide-react"
import { useAdminData } from "@/hooks/useAdminData"
import { useMockPatient } from "@/hooks/useMockPatient"

export function PatientAssignmentManager() {
  const { users, assignPatientToNavigator, bulkAssignPatients } = useAdminData()
  const { patients } = useMockPatient()
  const [selectedPatients, setSelectedPatients] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [navigatorFilter, setNavigatorFilter] = useState<string>("all")
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedNavigator, setSelectedNavigator] = useState("")
  const [assignmentReason, setAssignmentReason] = useState("")

  const navigators = users.filter((u) => u.role === "navigator")

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.cnp.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    const matchesNavigator = navigatorFilter === "all" || patient.navigatorId === navigatorFilter

    return matchesSearch && matchesStatus && matchesNavigator
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPatients(filteredPatients.map((p) => p.id))
    } else {
      setSelectedPatients([])
    }
  }

  const handleSelectPatient = (patientId: string, checked: boolean) => {
    if (checked) {
      setSelectedPatients((prev) => [...prev, patientId])
    } else {
      setSelectedPatients((prev) => prev.filter((id) => id !== patientId))
    }
  }

  const handleBulkAssign = async () => {
    if (!selectedNavigator || selectedPatients.length === 0) {
      toast.error("Selectează navigatorul și cel puțin un pacient")
      return
    }

    try {
      await bulkAssignPatients(selectedPatients, selectedNavigator, assignmentReason)
      toast.success(`${selectedPatients.length} pacienți asignați cu succes`)
      setSelectedPatients([])
      setAssignDialogOpen(false)
      setSelectedNavigator("")
      setAssignmentReason("")
    } catch (error) {
      toast.error("Eroare la asignarea pacienților")
    }
  }

  const getNavigatorName = (navigatorId: string) => {
    const navigator = navigators.find((n) => n.id === navigatorId)
    return navigator?.name || "Neasignat"
  }

  const getNavigatorWorkload = (navigatorId: string) => {
    const assignedCount = patients.filter((p) => p.navigatorId === navigatorId).length
    return assignedCount
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Asignare Pacienți</h1>
          <p className="text-muted-foreground">Gestionează asignarea pacienților la navigatori</p>
        </div>

        {selectedPatients.length > 0 && (
          <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Asignează {selectedPatients.length} pacienți
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Asignare Pacienți</DialogTitle>
                <DialogDescription>
                  Asignează {selectedPatients.length} pacienți selectați la un navigator
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="navigator">Navigator</Label>
                  <Select value={selectedNavigator} onValueChange={setSelectedNavigator}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează navigator" />
                    </SelectTrigger>
                    <SelectContent>
                      {navigators.map((navigator) => (
                        <SelectItem key={navigator.id} value={navigator.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{navigator.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {getNavigatorWorkload(navigator.id)} pacienți
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reason">Motiv asignare</Label>
                  <Textarea
                    id="reason"
                    placeholder="Motivul pentru această asignare..."
                    value={assignmentReason}
                    onChange={(e) => setAssignmentReason(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
                  Anulează
                </Button>
                <Button onClick={handleBulkAssign}>Asignează Pacienții</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtrare și Căutare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Căutare</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nume sau CNP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate statusurile</SelectItem>
                  <SelectItem value="pre-treatment">Pre-tratament</SelectItem>
                  <SelectItem value="in-treatment">În tratament</SelectItem>
                  <SelectItem value="monitoring">Monitorizare</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="suspended">Suspendat</SelectItem>
                  <SelectItem value="completed">Finalizat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="navigator">Navigator</Label>
              <Select value={navigatorFilter} onValueChange={setNavigatorFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toți navigatorii</SelectItem>
                  <SelectItem value="none">Neasignați</SelectItem>
                  {navigators.map((navigator) => (
                    <SelectItem key={navigator.id} value={navigator.id}>
                      {navigator.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Resetează Filtre
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigator Workload Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuția Pacienților pe Navigatori</CardTitle>
          <CardDescription>Vizualizare rapidă a încărcăturii fiecărui navigator</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {navigators.map((navigator) => {
              const workload = getNavigatorWorkload(navigator.id)
              const capacity = 40 // Capacitate standard
              const percentage = (workload / capacity) * 100

              return (
                <div key={navigator.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{navigator.name}</h4>
                    <Badge variant={percentage > 90 ? "destructive" : percentage > 75 ? "default" : "secondary"}>
                      {workload}/{capacity}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage > 90 ? "bg-red-600" : percentage > 75 ? "bg-yellow-600" : "bg-green-600"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{percentage.toFixed(1)}% capacitate</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista Pacienți ({filteredPatients.length})</span>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <Label className="text-sm">Selectează tot</Label>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedPatients.includes(patient.id)}
                    onCheckedChange={(checked) => handleSelectPatient(patient.id, checked as boolean)}
                  />

                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{patient.name}</h4>
                      <Badge variant="outline">{patient.cnp}</Badge>
                      <Badge
                        variant={
                          patient.status === "in-treatment"
                            ? "default"
                            : patient.status === "monitoring"
                              ? "secondary"
                              : patient.status === "completed"
                                ? "default"
                                : "outline"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {patient.diagnosis} • {patient.age} ani
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{getNavigatorName(patient.navigatorId)}</p>
                    <p className="text-xs text-muted-foreground">Navigator</p>
                  </div>

                  <Button variant="outline" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
