"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { AdminUser } from "@/types/admin"

interface UserPermissionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: AdminUser
}

const permissionGroups = {
  Pacienți: [
    { id: "view_patients", label: "Vizualizare pacienți", description: "Poate vedea lista și detaliile pacienților" },
    { id: "edit_patients", label: "Editare pacienți", description: "Poate modifica informațiile pacienților" },
    { id: "create_patients", label: "Creare pacienți", description: "Poate adăuga pacienți noi" },
    { id: "delete_patients", label: "Ștergere pacienți", description: "Poate șterge pacienți din sistem" },
  ],
  Programări: [
    { id: "view_appointments", label: "Vizualizare programări", description: "Poate vedea programările" },
    { id: "create_appointments", label: "Creare programări", description: "Poate crea programări noi" },
    { id: "edit_appointments", label: "Editare programări", description: "Poate modifica programările" },
    { id: "cancel_appointments", label: "Anulare programări", description: "Poate anula programări" },
  ],
  Documente: [
    { id: "view_documents", label: "Vizualizare documente", description: "Poate vedea documentele medicale" },
    { id: "upload_documents", label: "Încărcare documente", description: "Poate încărca documente noi" },
    { id: "edit_documents", label: "Editare documente", description: "Poate modifica documentele" },
    { id: "delete_documents", label: "Ștergere documente", description: "Poate șterge documente" },
  ],
  Rapoarte: [
    { id: "view_reports", label: "Vizualizare rapoarte", description: "Poate vedea rapoartele" },
    { id: "create_reports", label: "Creare rapoarte", description: "Poate genera rapoarte noi" },
    { id: "export_reports", label: "Export rapoarte", description: "Poate exporta rapoartele" },
  ],
  Administrare: [
    { id: "manage_users", label: "Gestionare utilizatori", description: "Poate gestiona utilizatorii" },
    { id: "manage_settings", label: "Gestionare setări", description: "Poate modifica setările sistemului" },
    { id: "view_audit_logs", label: "Vizualizare audit", description: "Poate vedea jurnalul de audit" },
    { id: "system_backup", label: "Backup sistem", description: "Poate face backup la sistem" },
  ],
}

export function UserPermissionsDialog({ open, onOpenChange, user }: UserPermissionsDialogProps) {
  const { toast } = useToast()
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setSelectedPermissions(user.permissions || [])
    }
  }, [user])

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setSelectedPermissions((prev) => (checked ? [...prev, permissionId] : prev.filter((p) => p !== permissionId)))
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Simulare actualizare permisiuni
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Permisiuni actualizate",
        description: `Permisiunile pentru ${user.name} au fost actualizate.`,
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-au putut actualiza permisiunile.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getRolePermissions = (role: string) => {
    switch (role) {
      case "admin":
        return Object.values(permissionGroups)
          .flat()
          .map((p) => p.id)
      case "navigator":
        return ["view_patients", "edit_patients", "create_appointments", "view_documents", "upload_documents"]
      case "patient":
        return ["view_documents", "view_appointments"]
      default:
        return []
    }
  }

  const recommendedPermissions = getRolePermissions(user.role)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestionare Permisiuni - {user.name}</DialogTitle>
          <DialogDescription>
            Configurează permisiunile pentru acest utilizator.
            <Badge className="ml-2" variant="outline">
              {user.role === "admin" && "Administrator"}
              {user.role === "navigator" && "Navigator"}
              {user.role === "patient" && "Pacient"}
              {user.role === "caregiver" && "Îngrijitor"}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {Object.entries(permissionGroups).map(([groupName, permissions]) => (
            <div key={groupName} className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">{groupName}</h4>
              <div className="space-y-3">
                {permissions.map((permission) => {
                  const isRecommended = recommendedPermissions.includes(permission.id)
                  const isSelected = selectedPermissions.includes(permission.id)

                  return (
                    <div key={permission.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={permission.id}
                        checked={isSelected}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={permission.id} className="text-sm font-medium">
                            {permission.label}
                          </Label>
                          {isRecommended && (
                            <Badge variant="secondary" className="text-xs">
                              Recomandat
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Anulează
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Se salvează..." : "Salvează Permisiunile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
