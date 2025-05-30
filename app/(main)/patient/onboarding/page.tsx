"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, CheckCircle, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PatientOnboarding() {
  const searchParams = useSearchParams()
  const source = searchParams.get("source")
  const isCallCenter = source === "callcenter"

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cnp: "",
    birthDate: "",
    gender: "",
    insuranceStatus: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    county: "",
    postalCode: "",

    diagnosis: "",
    diagnosisDate: "",
    allergies: "",
    currentMedication: "",
    symptoms: "",
    currentTreatment: "",
    geneticTest: false,

    occupation: "",
    familyStatus: "",
    preferredLanguage: "",
    preferredContactTime: "",
    specialNotes: "",

    contactName: "",
    contactRelation: "",
    contactPhone: "",
    contactEmail: "",
    contactAddress: "",

    documents: "",

    navigatorNotes: "",
    gdprConsent: false,
  })

  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate validation
    const newErrors: Record<string, boolean> = {}

    // Required fields
    const requiredFields = ["firstName", "lastName", "cnp", "birthDate", "gender", "phone"]
    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Submit form
    console.log("Form submitted:", formData)
    alert("Pacient înregistrat cu succes!")
  }

  const loadDemoData = () => {
    setFormData({
      firstName: "Maria",
      lastName: "Popescu",
      cnp: "2790315123456",
      birthDate: "1979-03-15",
      gender: "Feminin",
      insuranceStatus: "CAS",
      email: "maria.popescu@email.com",
      phone: "0721234567",
      street: "Str. Exemplului",
      city: "București",
      county: "Sector 1",
      postalCode: "012345",

      diagnosis: "Cancer mamar invaziv",
      diagnosisDate: "2024-01-15",
      allergies: "Penicilină",
      currentMedication: "Letrozol 2.5 mg/zi",
      symptoms: "Dureri moderate, oboseală localizată",
      currentTreatment: "Chimioterapie AC-T (doză 30%)",
      geneticTest: true,

      occupation: "Profesoară",
      familyStatus: "Căsătorită, 2 copii",
      preferredLanguage: "Română",
      preferredContactTime: "08:00-17:00",
      specialNotes: "Preferă comunicare prin email",

      contactName: "Ion Popescu",
      contactRelation: "Soț",
      contactPhone: "0731234567",
      contactEmail: "ion.popescu@email.com",
      contactAddress: "Str. Exemplului 10, București",

      documents: "buletin_maria.pdf, analize_recente.pdf",

      navigatorNotes: "Pacienta colaborează, are sprijin familial. Recomand suport psihologic.",
      gdprConsent: false,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Înregistrare Pacient Nou</h1>
            <p className="text-sm text-gray-600">
              Introducere datele necesare pentru gestionarea pacienților eficientă
            </p>
          </div>

          {isCallCenter && (
            <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <span className="mr-1">●</span> Onboarding Telefonic
            </div>
          )}

          <Button variant="ghost" size="sm" onClick={loadDemoData} className="text-gray-500 hover:text-gray-700">
            Încarcă Date Demo
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Date Personale */}
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Date Personale</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className={cn(errors.firstName && "text-red-500")}>
                    Prenume <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className={cn(errors.firstName && "border-red-500")}
                    placeholder={errors.firstName ? "Câmp obligatoriu" : ""}
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className={cn(errors.lastName && "text-red-500")}>
                    Nume de Familie <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className={cn(errors.lastName && "border-red-500")}
                    placeholder={errors.lastName ? "Câmp obligatoriu" : ""}
                  />
                </div>

                <div>
                  <Label htmlFor="cnp" className={cn(errors.cnp && "text-red-500")}>
                    CNP (Cod Numeric Personal) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cnp"
                    value={formData.cnp}
                    onChange={(e) => handleChange("cnp", e.target.value)}
                    className={cn(errors.cnp && "border-red-500")}
                    placeholder={errors.cnp ? "Câmp obligatoriu" : ""}
                  />
                </div>

                <div>
                  <Label htmlFor="birthDate" className={cn(errors.birthDate && "text-red-500")}>
                    Data Nașterii <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleChange("birthDate", e.target.value)}
                      className={cn(errors.birthDate && "border-red-500", "pr-10")}
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="gender" className={cn(errors.gender && "text-red-500")}>
                    Sex <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger className={cn(errors.gender && "border-red-500")}>
                      <SelectValue placeholder={errors.gender ? "Câmp obligatoriu" : "Selectează"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculin">Masculin</SelectItem>
                      <SelectItem value="Feminin">Feminin</SelectItem>
                      <SelectItem value="Altul">Altul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="insuranceStatus">Statut Asigurare Medicală</Label>
                  <Select
                    value={formData.insuranceStatus}
                    onValueChange={(value) => handleChange("insuranceStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CAS">CAS</SelectItem>
                      <SelectItem value="Privat">Privat</SelectItem>
                      <SelectItem value="Fără">Fără</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className={cn(errors.phone && "text-red-500")}>
                    Telefon <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={cn(errors.phone && "border-red-500")}
                    placeholder={errors.phone ? "Câmp obligatoriu" : ""}
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="address">Adresă</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => handleChange("street", e.target.value)}
                    placeholder="Stradă, Bloc, Ap."
                  />
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Oraș"
                  />
                  <Input
                    id="county"
                    value={formData.county}
                    onChange={(e) => handleChange("county", e.target.value)}
                    placeholder="Județ/Sector"
                  />
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    placeholder="Cod Poștal"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Date Medicale */}
          <Card className="rounded-2xl shadow-sm overflow-hidden bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold mr-3">
                  2
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Date Medicale</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="diagnosis">Diagnostic Principal</Label>
                  <Input
                    id="diagnosis"
                    value={formData.diagnosis}
                    onChange={(e) => handleChange("diagnosis", e.target.value)}
                    placeholder="ex: Cancer mamar invaziv"
                    className="placeholder:text-red-300"
                  />
                </div>

                <div>
                  <Label htmlFor="diagnosisDate">Data Diagnostic</Label>
                  <div className="relative">
                    <Input
                      id="diagnosisDate"
                      type="date"
                      value={formData.diagnosisDate}
                      onChange={(e) => handleChange("diagnosisDate", e.target.value)}
                      className="pr-10"
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="allergies">Alergii</Label>
                  <Input
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => handleChange("allergies", e.target.value)}
                    placeholder="separate prin virgulă"
                    className="placeholder:text-red-300"
                  />
                </div>

                <div>
                  <Label htmlFor="currentMedication">Medicamente Curente</Label>
                  <Input
                    id="currentMedication"
                    value={formData.currentMedication}
                    onChange={(e) => handleChange("currentMedication", e.target.value)}
                    placeholder="ex: Letrozol 2.5 mg/zi"
                    className="placeholder:text-red-300"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="symptoms">Simptome și Diagnostice Asociate</Label>
                  <Input
                    id="symptoms"
                    value={formData.symptoms}
                    onChange={(e) => handleChange("symptoms", e.target.value)}
                    placeholder="ex: Dureri moderate, oboseală"
                    className="placeholder:text-red-300"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="currentTreatment">Tratament Curent</Label>
                  <Textarea
                    id="currentTreatment"
                    value={formData.currentTreatment}
                    onChange={(e) => handleChange("currentTreatment", e.target.value)}
                    placeholder="Descrieți tratamentul curent"
                    className="placeholder:text-red-300"
                  />
                </div>

                <div className="col-span-2 flex items-center space-x-2">
                  <Switch
                    id="geneticTest"
                    checked={formData.geneticTest}
                    onCheckedChange={(checked) => handleChange("geneticTest", checked)}
                  />
                  <Label htmlFor="geneticTest" className="text-sm">
                    Test Genetic Efectuat{" "}
                    <span className="text-xs text-gray-500">
                      (Bifați dacă există teste genetice efectuate ex: BRCA)
                    </span>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Contact și Social */}
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                  3
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Contact și Social</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="occupation">Ocupație / Profesie</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleChange("occupation", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="familyStatus">Situație Familială</Label>
                  <Input
                    id="familyStatus"
                    value={formData.familyStatus}
                    onChange={(e) => handleChange("familyStatus", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="preferredLanguage">Limba preferată pentru comunicare</Label>
                  <Select
                    value={formData.preferredLanguage}
                    onValueChange={(value) => handleChange("preferredLanguage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Română">Română</SelectItem>
                      <SelectItem value="Engleză">Engleză</SelectItem>
                      <SelectItem value="Maghiară">Maghiară</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="preferredContactTime">Interval preferat de contact</Label>
                  <Select
                    value={formData.preferredContactTime}
                    onValueChange={(value) => handleChange("preferredContactTime", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dimineață">Dimineață</SelectItem>
                      <SelectItem value="08:00-17:00">08:00-17:00</SelectItem>
                      <SelectItem value="seara">Seara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <Label htmlFor="specialNotes">Observații speciale pacient</Label>
                  <Textarea
                    id="specialNotes"
                    value={formData.specialNotes}
                    onChange={(e) => handleChange("specialNotes", e.target.value)}
                    placeholder="Notițe speciale despre pacient"
                  />
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <h3 className="font-medium text-gray-800 mb-3">Persoană de Contact</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Nume complet</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleChange("contactName", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactRelation">Relație</Label>
                    <Input
                      id="contactRelation"
                      value={formData.contactRelation}
                      onChange={(e) => handleChange("contactRelation", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPhone">Telefon</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => handleChange("contactPhone", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      value={formData.contactEmail}
                      onChange={(e) => handleChange("contactEmail", e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="contactAddress">Adresă</Label>
                    <Input
                      id="contactAddress"
                      value={formData.contactAddress}
                      onChange={(e) => handleChange("contactAddress", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Documente */}
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold mr-3">
                  4
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Documente</h2>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Încărcați documentele medicale (bilete trimitere de pacient, analize etc)
                  </p>
                  <p className="text-xs text-gray-500">Upload și afișare se face în modulul "Dosar Medical Digital"</p>

                  <Button variant="outline" size="sm" className="mt-4">
                    Simulare "Drag & Drop"
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="documents">Documente Medicale Inițiale</Label>
                <Textarea
                  id="documents"
                  value={formData.documents}
                  onChange={(e) => handleChange("documents", e.target.value)}
                  placeholder="Listați documentele atașate"
                  className="h-20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Finalizare și Consimțământ */}
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold mr-3">
                  5
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Finalizare și Consimțământ</h2>
              </div>

              <div>
                <Label htmlFor="navigatorNotes">Notele Inițiale Navigator</Label>
                <Textarea
                  id="navigatorNotes"
                  value={formData.navigatorNotes}
                  onChange={(e) => handleChange("navigatorNotes", e.target.value)}
                  placeholder="Adăugați notițe inițiale despre pacient"
                  className="h-24"
                />
              </div>

              <div className="flex items-start space-x-2 mt-4">
                <Checkbox
                  id="gdprConsent"
                  checked={formData.gdprConsent}
                  onCheckedChange={(checked) => handleChange("gdprConsent", checked === true)}
                />
                <Label htmlFor="gdprConsent" className="text-sm">
                  Sunt de acord cu{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Politica de Confidențialitate
                  </a>{" "}
                  și{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Termenii Serviciului
                  </a>
                  . Datele vor fi utilizate doar pentru scopurile medicale declarate.
                </Label>
              </div>

              <div className="mt-6 flex justify-end">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Înregistrează Pacientul
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
