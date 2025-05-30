"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Edit, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PatientInfo } from "@/types/medical-record"
import { Textarea } from "@/components/ui/textarea"

interface PatientInfoCardProps {
  patientInfo: PatientInfo
  onUpdate: (updatedInfo: Partial<PatientInfo>) => void
}

export function PatientInfoCard({ patientInfo, onUpdate }: PatientInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedInfo, setEditedInfo] = useState<Partial<PatientInfo>>({})

  const handleEdit = () => {
    setEditedInfo({
      phone: patientInfo.phone,
      email: patientInfo.email,
      address: patientInfo.address,
      emergencyContact: { ...patientInfo.emergencyContact },
    })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedInfo({})
  }

  const handleSave = () => {
    // Validare de bază
    if (!editedInfo.phone || !editedInfo.email) {
      alert("Telefon și email sunt obligatorii")
      return
    }

    onUpdate(editedInfo)
    setIsEditing(false)
  }

  const handleChange = (field: string, value: string) => {
    if (field.startsWith("emergencyContact.")) {
      const contactField = field.split(".")[1]
      setEditedInfo({
        ...editedInfo,
        emergencyContact: {
          ...editedInfo.emergencyContact,
          [contactField]: value,
        },
      })
    } else {
      setEditedInfo({
        ...editedInfo,
        [field]: value,
      })
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Informații Pacient
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-patient.jpg" />
            <AvatarFallback>{getInitials(`${patientInfo.firstName} ${patientInfo.lastName}`)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{`${patientInfo.firstName} ${patientInfo.lastName}`}</h3>
            <p className="text-muted-foreground">Data nașterii: {patientInfo.dateOfBirth}</p>
            <p className="text-muted-foreground">
              Sex: {patientInfo.gender} • CNP: {patientInfo.cnp}
            </p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" value={editedInfo.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={editedInfo.email} onChange={(e) => handleChange("email", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adresă</Label>
              <Input
                id="address"
                value={editedInfo.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Note suplimentare</Label>
              <Textarea
                id="notes"
                placeholder="Note despre pacient..."
                value={editedInfo.notes || ""}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Persoană de contact în caz de urgență</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Nume"
                  value={editedInfo.emergencyContact?.name}
                  onChange={(e) => handleChange("emergencyContact.name", e.target.value)}
                />
                <Input
                  placeholder="Telefon"
                  value={editedInfo.emergencyContact?.phone}
                  onChange={(e) => handleChange("emergencyContact.phone", e.target.value)}
                />
              </div>
              <Input
                placeholder="Relație"
                value={editedInfo.emergencyContact?.relationship}
                onChange={(e) => handleChange("emergencyContact.relationship", e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                <Check className="mr-2 h-4 w-4" />
                Salvează
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex-1">
                <X className="mr-2 h-4 w-4" />
                Anulează
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Contact:</p>
                <p className="text-muted-foreground">{patientInfo.phone}</p>
                <p className="text-muted-foreground">{patientInfo.email}</p>
                <p className="text-muted-foreground mt-2">{patientInfo.address}</p>
              </div>
              <div>
                <p className="font-medium">Persoană de contact:</p>
                <p className="text-muted-foreground">{patientInfo.emergencyContact.name}</p>
                <p className="text-muted-foreground">{patientInfo.emergencyContact.phone}</p>
                <p className="text-muted-foreground">{patientInfo.emergencyContact.relationship}</p>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Editează Date Personale
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
