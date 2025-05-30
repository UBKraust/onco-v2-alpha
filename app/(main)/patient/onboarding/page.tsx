"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle } from "lucide-react"

export default function PatientOnboardingPage() {
  const [formData, setFormData] = useState({
    // Section 1: Date Personale
    prenume: "",
    numeFamily: "",
    cnp: "",
    dataNasterii: "",
    sex: "",
    statusAsigurare: "",
    email: "",
    telefon: "",
    strada: "",
    oras: "",
    judet: "",
    codPostal: "",

    // Section 2: Date Medicale
    diagnosticPrincipal: "",
    dataDiagnostic: "",
    alergii: "",
    medicamenteCurente: "",
    simptome: "",
    tratamentCurent: "",
    testGenetic: false,

    // Section 3: Contact și Social
    ocupatie: "",
    situatieFamiliala: "",
    limbaPreferata: "",
    intervalContact: "",
    observatiiSpeciale: "",
    numeContact: "",
    relatieContact: "",
    telefonContact: "",
    emailContact: "",
    adresaContact: "",

    // Section 4: Documente
    documenteAtasate: "",

    // Section 5: Finalizare
    noteNavigator: "",
    gdprConsent: false,
  })

  const [errors, setErrors] = useState<string[]>([])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const fillTestData = () => {
    setFormData({
      prenume: "Maria",
      numeFamily: "Popescu",
      cnp: "2801015123456",
      dataNasterii: "1980-01-15",
      sex: "Feminin",
      statusAsigurare: "CAS",
      email: "maria.popescu@email.com",
      telefon: "0721123456",
      strada: "Str. Exemplului, Nr. 10",
      oras: "București",
      judet: "Ilfov",
      codPostal: "014523",
      diagnosticPrincipal: "Cancer mamar invasiv",
      dataDiagnostic: "2024-01-15",
      alergii: "Penicilină",
      medicamenteCurente: "Letrozol, Gabapentin",
      simptome: "Noduli mamar, Durere localizată",
      tratamentCurent: "Chimioterapie ACT (Doxil 240)",
      testGenetic: true,
      ocupatie: "Profesoară",
      situatieFamiliala: "Căsătorită, 2 copii",
      limbaPreferata: "Română",
      intervalContact: "08:00-17:00",
      observatiiSpeciale: "Preferă comunicarea prin email",
      numeContact: "Ion Popescu",
      relatieContact: "Soț/Soție",
      telefonContact: "0721654321",
      emailContact: "ion.popescu@email.com",
      adresaContact: "Str. Exemplului, Nr. 10, București",
      documenteAtasate: "buletin_maria.pdf, test_genetic.pdf",
      noteNavigator: "Pacientă colaborantă, are sprijin familial. Recomandări speciale pentru...",
      gdprConsent: true,
    })
  }

  const handleSubmit = () => {
    const requiredFields = ["prenume", "numeFamily", "cnp", "email", "telefon"]
    const newErrors = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (!formData.gdprConsent) {
      newErrors.push("gdprConsent")
    }

    setErrors(newErrors)

    if (newErrors.length === 0) {
      console.log("Form submitted:", formData)
      // Handle form submission
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Înregistrare Pacient Nou</h1>
            <p className="text-gray-600 mt-2">
              OncoLink - Sistem de management pentru pacienți și gestionarea eficientă
            </p>
          </div>
          <Button variant="ghost" onClick={fillTestData} className="text-sm">
            Încarcă Date Demo
          </Button>
        </div>

        <div className="space-y-8">
          {/* Section 1: Date Personale */}
          <Card className="rounded-2xl shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                Date Personale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prenume">Prenume *</Label>
                  <Input
                    id="prenume"
                    value={formData.prenume}
                    onChange={(e) => handleInputChange("prenume", e.target.value)}
                    className={errors.includes("prenume") ? "border-red-500" : ""}
                    placeholder="Introduceți prenumele"
                  />
                </div>
                <div>
                  <Label htmlFor="numeFamily">Nume de Familie *</Label>
                  <Input
                    id="numeFamily"
                    value={formData.numeFamily}
                    onChange={(e) => handleInputChange("numeFamily", e.target.value)}
                    className={errors.includes("numeFamily") ? "border-red-500" : ""}
                    placeholder="Introduceți numele de familie"
                  />
                </div>
                <div>
                  <Label htmlFor="cnp">CNP (Cod Numeric Personal) *</Label>
                  <Input
                    id="cnp"
                    value={formData.cnp}
                    onChange={(e) => handleInputChange("cnp", e.target.value)}
                    className={errors.includes("cnp") ? "border-red-500" : ""}
                    placeholder="1234567890123"
                  />
                </div>
                <div>
                  <Label htmlFor="dataNasterii">Data Nașterii</Label>
                  <Input
                    id="dataNasterii"
                    type="date"
                    value={formData.dataNasterii}
                    onChange={(e) => handleInputChange("dataNasterii", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sex">Sex</Label>
                  <Select value={formData.sex} onValueChange={(value) => handleInputChange("sex", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectați sexul" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculin">Masculin</SelectItem>
                      <SelectItem value="Feminin">Feminin</SelectItem>
                      <SelectItem value="Altul">Altul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="statusAsigurare">Statut Asigurare Medicală</Label>
                  <Select
                    value={formData.statusAsigurare}
                    onValueChange={(value) => handleInputChange("statusAsigurare", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectați tipul asigurării" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CAS">CAS</SelectItem>
                      <SelectItem value="Privat">Privat</SelectItem>
                      <SelectItem value="Fără">Fără</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.includes("email") ? "border-red-500" : ""}
                    placeholder="exemplu@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="telefon">Telefon *</Label>
                  <Input
                    id="telefon"
                    value={formData.telefon}
                    onChange={(e) => handleInputChange("telefon", e.target.value)}
                    className={errors.includes("telefon") ? "border-red-500" : ""}
                    placeholder="0721123456"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Adresă</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Strada și numărul"
                    value={formData.strada}
                    onChange={(e) => handleInputChange("strada", e.target.value)}
                  />
                  <Input
                    placeholder="Orașul"
                    value={formData.oras}
                    onChange={(e) => handleInputChange("oras", e.target.value)}
                  />
                  <Input
                    placeholder="Județul"
                    value={formData.judet}
                    onChange={(e) => handleInputChange("judet", e.target.value)}
                  />
                  <Input
                    placeholder="Cod poștal"
                    value={formData.codPostal}
                    onChange={(e) => handleInputChange("codPostal", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Date Medicale */}
          <Card className="rounded-2xl shadow-sm bg-purple-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                Date Medicale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="diagnosticPrincipal">Diagnostic Principal</Label>
                  <Input
                    id="diagnosticPrincipal"
                    value={formData.diagnosticPrincipal}
                    onChange={(e) => handleInputChange("diagnosticPrincipal", e.target.value)}
                    placeholder="Cancer mamar invasiv"
                  />
                </div>
                <div>
                  <Label htmlFor="dataDiagnostic">Data Diagnostic (Opțional)</Label>
                  <Input
                    id="dataDiagnostic"
                    type="date"
                    value={formData.dataDiagnostic}
                    onChange={(e) => handleInputChange("dataDiagnostic", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="alergii">Alergii Cunoscute (Opțional)</Label>
                <Input
                  id="alergii"
                  value={formData.alergii}
                  onChange={(e) => handleInputChange("alergii", e.target.value)}
                  placeholder="Introduceți alergiile separate prin virgulă"
                  className="text-red-600 placeholder:text-red-400"
                />
              </div>

              <div>
                <Label htmlFor="medicamenteCurente">Medicamente Curente (Opțional)</Label>
                <Input
                  id="medicamenteCurente"
                  value={formData.medicamenteCurente}
                  onChange={(e) => handleInputChange("medicamenteCurente", e.target.value)}
                  placeholder="Introduceți medicamentele separate prin virgulă"
                  className="text-red-600 placeholder:text-red-400"
                />
              </div>

              <div>
                <Label htmlFor="simptome">Simptome și Diagnostice Asociate (Opțional)</Label>
                <Input
                  id="simptome"
                  value={formData.simptome}
                  onChange={(e) => handleInputChange("simptome", e.target.value)}
                  placeholder="Introduceți simptomele separate prin virgulă"
                  className="text-red-600 placeholder:text-red-400"
                />
              </div>

              <div>
                <Label htmlFor="tratamentCurent">Tratament Curent (Opțional)</Label>
                <Textarea
                  id="tratamentCurent"
                  value={formData.tratamentCurent}
                  onChange={(e) => handleInputChange("tratamentCurent", e.target.value)}
                  placeholder="Descrieți tratamentul curent"
                  className="text-red-600 placeholder:text-red-400"
                />
              </div>

              <div className="flex items-center space-x-2 p-4 bg-green-50 rounded-lg">
                <Switch
                  id="testGenetic"
                  checked={formData.testGenetic}
                  onCheckedChange={(checked) => handleInputChange("testGenetic", checked)}
                />
                <Label htmlFor="testGenetic" className="text-sm">
                  Test Genetic Efectuat - Bifați dacă există teste genetice efectuate (ex: BRCA)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Contact și Social */}
          <Card className="rounded-2xl shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                Contact și Social
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ocupatie">Ocupație / Profesie (Opțional)</Label>
                  <Input
                    id="ocupatie"
                    value={formData.ocupatie}
                    onChange={(e) => handleInputChange("ocupatie", e.target.value)}
                    placeholder="Profesoară"
                  />
                </div>
                <div>
                  <Label htmlFor="situatieFamiliala">Situație Familială (Opțional)</Label>
                  <Input
                    id="situatieFamiliala"
                    value={formData.situatieFamiliala}
                    onChange={(e) => handleInputChange("situatieFamiliala", e.target.value)}
                    placeholder="Căsătorită, 2 copii"
                  />
                </div>
                <div>
                  <Label htmlFor="limbaPreferata">Limba Preferată pentru Comunicare</Label>
                  <Select
                    value={formData.limbaPreferata}
                    onValueChange={(value) => handleInputChange("limbaPreferata", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectați limba" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Română">Română</SelectItem>
                      <SelectItem value="Engleză">Engleză</SelectItem>
                      <SelectItem value="Maghiară">Maghiară</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="intervalContact">Interval Preferat de Contact (Opțional)</Label>
                  <Select
                    value={formData.intervalContact}
                    onValueChange={(value) => handleInputChange("intervalContact", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectați intervalul" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dimineața">Dimineața</SelectItem>
                      <SelectItem value="08:00-17:00">08:00-17:00</SelectItem>
                      <SelectItem value="seara">Seara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="observatiiSpeciale">Observații Speciale Pacient</Label>
                <Textarea
                  id="observatiiSpeciale"
                  value={formData.observatiiSpeciale}
                  onChange={(e) => handleInputChange("observatiiSpeciale", e.target.value)}
                  placeholder="Notele observațiilor speciale și întrebări"
                />
              </div>

              {/* Persoană de Contact Subsection */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Persoană de Contact (Aparținător)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numeContact">Nume Complet Aparținător</Label>
                    <Input
                      id="numeContact"
                      value={formData.numeContact}
                      onChange={(e) => handleInputChange("numeContact", e.target.value)}
                      placeholder="Ion Popescu"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relatieContact">Relația cu Pacientul</Label>
                    <Input
                      id="relatieContact"
                      value={formData.relatieContact}
                      onChange={(e) => handleInputChange("relatieContact", e.target.value)}
                      placeholder="Soț/Soție"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefonContact">Telefon Aparținător</Label>
                    <Input
                      id="telefonContact"
                      value={formData.telefonContact}
                      onChange={(e) => handleInputChange("telefonContact", e.target.value)}
                      placeholder="0721123456"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emailContact">Email Aparținător (Opțional)</Label>
                    <Input
                      id="emailContact"
                      type="email"
                      value={formData.emailContact}
                      onChange={(e) => handleInputChange("emailContact", e.target.value)}
                      placeholder="ion.popescu@email.com"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="adresaContact">Adresă Aparținător (Opțional)</Label>
                  <Input
                    id="adresaContact"
                    value={formData.adresaContact}
                    onChange={(e) => handleInputChange("adresaContact", e.target.value)}
                    placeholder="Str. Exemplului, Nr. 10, București"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Documente */}
          <Card className="rounded-2xl shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold">
                  4
                </div>
                Documente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Încărcați documentele medicale relevante pentru pacient, separate prin virgulă. Upload și fișiere se fac
                în modulul "Dosar Medical Digital"
              </p>

              {/* Drag and Drop Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">Simulare Drag & Drop pentru fișiere</p>
                <p className="text-sm text-gray-500">
                  Funcționalitatea de upload va fi în modulul "Dosar Medical Digital"
                </p>
              </div>

              <div>
                <Label htmlFor="documenteAtasate">Documente Medicale Inițiale (Opțional)</Label>
                <Textarea
                  id="documenteAtasate"
                  value={formData.documenteAtasate}
                  onChange={(e) => handleInputChange("documenteAtasate", e.target.value)}
                  placeholder="buletin_maria.pdf, test_genetic.pdf"
                  className="bg-gray-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Finalizare și Consimțământ */}
          <Card className="rounded-2xl shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-semibold">
                  5
                </div>
                Finalizare și Consimțământ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="noteNavigator">Note Inițiale Navigator (Opțional)</Label>
                <Textarea
                  id="noteNavigator"
                  value={formData.noteNavigator}
                  onChange={(e) => handleInputChange("noteNavigator", e.target.value)}
                  placeholder="Pacientă colaborantă, are sprijin familial. Recomandări speciale pentru..."
                  rows={4}
                />
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-4">
                  Acceptă să citit și să vă veți conforma cu privire la consimțământ:
                </p>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="gdprConsent"
                    checked={formData.gdprConsent}
                    onCheckedChange={(checked) => handleInputChange("gdprConsent", checked as boolean)}
                    className={errors.includes("gdprConsent") ? "border-red-500" : ""}
                  />
                  <Label htmlFor="gdprConsent" className="text-sm leading-relaxed">
                    <strong>Consimțământ Prelucrare Date (GDPR)</strong>
                    <br />
                    Confirm că am citit și sunt de acord cu Politica de Confidențialitate și Termenii Serviciului.
                    Datele mele vor fi prelucrate în scopul îngrijirii medicale și comunicării cu echipa medicală.
                    Înțeleg că pot retrage consimțământul în orice moment.
                  </Label>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-xl"
                size="lg"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Înregistrează Pacientul
              </Button>

              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium">Vă rugăm să completați câmpurile obligatorii:</p>
                  <ul className="text-red-700 text-sm mt-2 list-disc list-inside">
                    {errors.includes("prenume") && <li>Prenume</li>}
                    {errors.includes("numeFamily") && <li>Nume de Familie</li>}
                    {errors.includes("cnp") && <li>CNP</li>}
                    {errors.includes("email") && <li>Email</li>}
                    {errors.includes("telefon") && <li>Telefon</li>}
                    {errors.includes("gdprConsent") && <li>Consimțământ GDPR</li>}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
