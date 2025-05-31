"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, Trash2, ArrowUp, Eye, EyeOff, MoreHorizontal } from "lucide-react"
import type { PatientAlert } from "@/types/navigator"

interface AlertBulkActionsProps {
  alerts: PatientAlert[]
  selectedAlerts: string[]
  onSelectAlert: (alertId: string) => void
  onSelectAll: () => void
  onClearSelection: () => void
  onBulkResolve: (alertIds: string[], note: string) => void
  onBulkDelete: (alertIds: string[]) => void
  onBulkMarkAsRead: (alertIds: string[]) => void
  onBulkEscalate: (alertIds: string[]) => void
}

export function AlertBulkActions({
  alerts,
  selectedAlerts,
  onSelectAlert,
  onSelectAll,
  onClearSelection,
  onBulkResolve,
  onBulkDelete,
  onBulkMarkAsRead,
  onBulkEscalate,
}: AlertBulkActionsProps) {
  const [showResolveDialog, setShowResolveDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [resolutionNote, setResolutionNote] = useState("")

  const isAllSelected = alerts.length > 0 && selectedAlerts.length === alerts.length
  const isPartiallySelected = selectedAlerts.length > 0 && selectedAlerts.length < alerts.length

  const handleBulkResolve = () => {
    if (resolutionNote.trim()) {
      onBulkResolve(selectedAlerts, resolutionNote)
      setResolutionNote("")
      setShowResolveDialog(false)
      onClearSelection()
    }
  }

  const handleBulkDelete = () => {
    onBulkDelete(selectedAlerts)
    setShowDeleteDialog(false)
    onClearSelection()
  }

  if (selectedAlerts.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isAllSelected}
          ref={(el) => {
            if (el) el.indeterminate = isPartiallySelected
          }}
          onCheckedChange={onSelectAll}
        />
        <span className="text-sm text-muted-foreground">Selectează toate ({alerts.length})</span>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isAllSelected}
            ref={(el) => {
              if (el) el.indeterminate = isPartiallySelected
            }}
            onCheckedChange={onSelectAll}
          />
          <Badge variant="secondary">{selectedAlerts.length} selectate</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => onBulkMarkAsRead(selectedAlerts)}>
            <Eye className="h-4 w-4 mr-1" />
            Marchează citite
          </Button>

          <Button size="sm" variant="outline" onClick={() => setShowResolveDialog(true)}>
            <CheckCircle className="h-4 w-4 mr-1" />
            Rezolvă
          </Button>

          <Button size="sm" variant="outline" onClick={() => onBulkEscalate(selectedAlerts)}>
            <ArrowUp className="h-4 w-4 mr-1" />
            Escaladează
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Șterge
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onClearSelection}>
                <EyeOff className="h-4 w-4 mr-2" />
                Deselectează toate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bulk Resolve Dialog */}
      <AlertDialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rezolvă alerte selectate</AlertDialogTitle>
            <AlertDialogDescription>
              Ești pe cale să marchezi {selectedAlerts.length} alerte ca rezolvate. Adaugă o notă pentru a documenta
              acțiunile întreprinse.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <Label htmlFor="bulk-resolution-note">Notă rezolvare</Label>
            <Textarea
              id="bulk-resolution-note"
              placeholder="Descrie acțiunile întreprinse pentru rezolvarea acestor alerte..."
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              rows={3}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkResolve} disabled={!resolutionNote.trim()}>
              Rezolvă alertele
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Șterge alerte selectate</AlertDialogTitle>
            <AlertDialogDescription>
              Ești pe cale să ștergi {selectedAlerts.length} alerte. Această acțiune nu poate fi anulată.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
              Șterge alertele
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
