"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface UserCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const availablePermissions = [
  { id: "view_patients", label: "Vizualizare pacienți" },
  { id: "edit_patients", label: "Editare pacienți" },
  { id: "create_appointments", label: "Creare programări" },
  { id: "manage_documents", label: "Gestionare documente" },
  { id: "view_reports", label: "Vizualizare rapoarte" },
  { id: "admin_access", label: "Acces administrator" },
]

export function UserCreateDialog({ open, onOpenChange }: UserCreateDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    clinicId: "",
    departmentId: "",
    permissions: [] as string[],
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulare creare utilizator
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Utilizator creat cu succes",
        description: `${formData.name} a fost adăugat în sistem.`,
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        clinicId: "",
        departmentId: "",
        permissions: [],
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut crea utilizatorul.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked ? [...prev.permissions, permissionId] : prev.permissions.filter((p) => p !== permissionId),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Creare Utilizator Nou</DialogTitle>
          <DialogDescription>Completează informațiile pentru a crea un utilizator nou în sistem.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nume complet *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Maria Popescu"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="maria.popescu@oncolink.ro"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+40721234567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rol *</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selectează rolul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="navigator">Navigator</SelectItem>
                  <SelectItem value="patient">Pacient</SelectItem>
                  <SelectItem value="caregiver">Îngrijitor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Permisiuni</Label>
            <div className="grid grid-cols-2 gap-2">
              {availablePermissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission.id}
                    checked={formData.permissions.includes(permission.id)}
                    onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                  />
                  <Label htmlFor={permission.id} className="text-sm">
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Anulează
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Se creează..." : "Creează Utilizator"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
