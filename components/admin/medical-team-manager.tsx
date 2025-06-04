"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { toast } from "sonner"
import { UserPlus, Edit, Trash2, Phone, Mail, MapPin, Stethoscope, Users } from "lucide-react"
import { useAdminData } from "@/hooks/useAdminData"
import type { MedicalTeamMember } from "@/types/admin"

export function MedicalTeamManager() {
  const { medicalTeam, clinics, addMedicalTeamMember, updateMedicalTeamMember, deleteMedicalTeamMember } =
    useAdminData()
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<MedicalTeamMember | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: [] as string[],
    department: "",
    clinicId: "",
    patientCapacity: 40,
    status: "active" as "active" | "inactive" | "vacation",
  })

  const specializations = [
    "Oncologie Medicală",
    "Radioterapie",
    "Chirurgie Oncologică",
    "Hematologie",
    "Ginecologie Oncologică",
    "Urologie Oncologică",
    "Pneumologie",
    "Gastroenterologie",
    "Dermatologie",
    "Neurochirurgie",
  ]

  const departments = [
    "Oncologie Medicală",
    "Radioterapie",
    "Chirurgie",
    "Hematologie",
    "Imagistică",
    "Laborator",
    "Farmacia Clinică",
  ]

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialization: [],
      department: "",
      clinicId: "",
      patientCapacity: 40,
      status: "active",
    })
  }

  const handleAdd = async () => {
    if (!formData.name || !formData.email || !formData.department || !formData.clinicId) {
      toast.error("Completează toate câmpurile obligatorii")
      return
    }

    try {
      await addMedicalTeamMember({
        ...formData,
        currentPatients: 0,
        schedule: {
          monday: { start: "08:00", end: "16:00", available: true },
          tuesday: { start: "08:00", end: "16:00", available: true },
          wednesday: { start: "08:00", end: "16:00", available: true },
          thursday: { start: "08:00", end: "16:00", available: true },
          friday: { start: "08:00", end: "16:00", available: true },
        },
      })

      toast.success("Membru echipă medicală adăugat cu succes")
      setAddDialogOpen(false)
      resetForm()
    } catch (error) {
      toast.error("Eroare la adăugarea membrului")
    }
  }

  const handleEdit = (member: MedicalTeamMember) => {
    setSelectedMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      specialization: member.specialization,
      department: member.department,
      clinicId: member.clinicId,
      patientCapacity: member.patientCapacity,
      status: member.status,
    })
    setEditDialogOpen(true)
  }

  const handleUpdate = async () => {
    if (!selectedMember) return

    try {
      await updateMedicalTeamMember(selectedMember.id, formData)
      toast.success("Membru actualizat cu succes")
      setEditDialogOpen(false)
      setSelectedMember(null)
      resetForm()
    } catch (error) {
      toast.error("Eroare la actualizarea membrului")
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Ești sigur că vrei să ștergi acest membru?")) {
      try {
        await deleteMedicalTeamMember(id)
        toast.success("Membru șters cu succes")
      } catch (error) {
        toast.error("Eroare la ștergerea membrului")
      }
    }
  }

  const getClinicName = (clinicId: string) => {
    const clinic = clinics.find((c) => c.id === clinicId)
    return clinic?.name || "Necunoscut"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Echipa Medicală</h1>
          <p className="text-muted-foreground">Gestionează medicii și specialiștii din platformă</p>
        </div>

        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Adaugă Medic
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adaugă Membru Echipă Medicală</DialogTitle>
              <DialogDescription>Completează informațiile pentru noul membru al echipei medicale</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nume complet *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Dr. Nume Prenume"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="email@spital.ro"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+40721234567"
                />
              </div>

              <div>
                <Label htmlFor="capacity">Capacitate pacienți</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.patientCapacity}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, patientCapacity: Number.parseInt(e.target.value) }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="clinic">Clinică *</Label>
                <Select
                  value={formData.clinicId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, clinicId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează clinica" />
                  </SelectTrigger>
                  <SelectContent>
                    {clinics.map((clinic) => (
                      <SelectItem key={clinic.id} value={clinic.id}>
                        {clinic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department">Departament *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează departamentul" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Specializări</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {specializations.map((spec) => (
                  <div key={spec} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={spec}
                      checked={formData.specialization.includes(spec)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({ ...prev, specialization: [...prev.specialization, spec] }))
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            specialization: prev.specialization.filter((s) => s !== spec),
                          }))
                        }
                      }}
                    />
                    <Label htmlFor={spec} className="text-sm">
                      {spec}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Anulează
              </Button>
              <Button onClick={handleAdd}>Adaugă Medic</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Total Medici
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicalTeam.length}</div>
            <p className="text-sm text-muted-foreground">
              {medicalTeam.filter((m) => m.status === "active").length} activi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Specializări
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(medicalTeam.flatMap((m) => m.specialization)).size}</div>
            <p className="text-sm text-muted-foreground">Specializări disponibile</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Clinici
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clinics.length}</div>
            <p className="text-sm text-muted-foreground">Locații active</p>
          </CardContent>
        </Card>
      </div>

      {/* Medical Team List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista Echipei Medicale</CardTitle>
          <CardDescription>Toți medicii și specialiștii înregistrați</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicalTeam.map((member) => (
              <div key={member.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-lg">{member.name}</h4>
                      <Badge
                        variant={
                          member.status === "active"
                            ? "default"
                            : member.status === "vacation"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {member.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{member.email}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{member.phone}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{getClinicName(member.clinicId)}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {member.currentPatients}/{member.patientCapacity} pacienți
                        </span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>Departament:</strong> {member.department}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {member.specialization.map((spec) => (
                          <Badge key={spec} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(member.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editează Membru Echipă</DialogTitle>
            <DialogDescription>Actualizează informațiile membrului echipei medicale</DialogDescription>
          </DialogHeader>

          {/* Same form as add dialog but with update handler */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name">Nume complet</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="edit-phone">Telefon</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive" | "vacation") =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activ</SelectItem>
                  <SelectItem value="vacation">În concediu</SelectItem>
                  <SelectItem value="inactive">Inactiv</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Anulează
            </Button>
            <Button onClick={handleUpdate}>Actualizează</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
