"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, History, AlertCircle, TrendingDown, TrendingUp, CheckCircle } from "lucide-react"
import { useDoseAdjustments } from "@/hooks/useDoseAdjustments"

interface DoseAdjustment {
  id: string
  date: string
  medication: string
  previousDose: number
  newDose: number
  adjustmentType: "reduction" | "increase" | "hold" | "discontinue"
  reason: string
  adverseEvents: string[]
  labValues: Record<string, number>
  approvedBy: string
  nextReview: string
  notes: string
}

const MEDICATIONS = [
  { id: "carboplatin", name: "Carboplatin", unit: "mg/m²", maxDose: 800 },
  { id: "paclitaxel", name: "Paclitaxel", unit: "mg/m²", maxDose: 200 },
  { id: "doxorubicin", name: "Doxorubicin", unit: "mg/m²", maxDose: 75 },
  { id: "cyclophosphamide", name: "Cyclophosphamide", unit: "mg/m²", maxDose: 600 },
]

const ADJUSTMENT_REASONS = [
  "Neutropenia Grade 3-4",
  "Thrombocytopenia Grade 3-4",
  "Neuropathy Grade 2-3",
  "Mucositis Grade 3-4",
  "Hepatotoxicity",
  "Nephrotoxicity",
  "Patient request",
  "Physician discretion",
]

const DOSE_REDUCTION_PROTOCOLS = {
  neutropenia: { grade3: 0.75, grade4: 0.5 },
  thrombocytopenia: { grade3: 0.75, grade4: 0.5 },
  neuropathy: { grade2: 0.75, grade3: 0.5 },
  mucositis: { grade3: 0.75, grade4: 0.5 },
}

export function DoseAdjustmentSystem() {
  const { adjustments, addAdjustment, calculateRecommendedDose } = useDoseAdjustments()
  const [selectedMedication, setSelectedMedication] = useState("")
  const [currentDose, setCurrentDose] = useState("")
  const [adjustmentReason, setAdjustmentReason] = useState("")
  const [labValues, setLabValues] = useState({
    neutrophils: "",
    platelets: "",
    hemoglobin: "",
    creatinine: "",
    bilirubin: "",
  })
  const [notes, setNotes] = useState("")

  const calculateNewDose = () => {
    if (!selectedMedication || !currentDose || !adjustmentReason) return null

    const dose = Number.parseFloat(currentDose)
    let reductionFactor = 1

    // Algoritm simplificat pentru reducerea dozei
    if (adjustmentReason.includes("Grade 3")) {
      reductionFactor = 0.75
    } else if (adjustmentReason.includes("Grade 4")) {
      reductionFactor = 0.5
    } else if (adjustmentReason.includes("Grade 2")) {
      reductionFactor = 0.75
    }

    return Math.round(dose * reductionFactor)
  }

  const getAdjustmentColor = (type: string) => {
    switch (type) {
      case "reduction":
        return "bg-orange-100 text-orange-800"
      case "increase":
        return "bg-green-100 text-green-800"
      case "hold":
        return "bg-yellow-100 text-yellow-800"
      case "discontinue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAdjustmentIcon = (type: string) => {
    switch (type) {
      case "reduction":
        return <TrendingDown className="h-4 w-4" />
      case "increase":
        return <TrendingUp className="h-4 w-4" />
      case "hold":
        return <AlertCircle className="h-4 w-4" />
      case "discontinue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const handleSubmitAdjustment = () => {
    if (!selectedMedication || !currentDose || !adjustmentReason) return

    const newDose = calculateNewDose()
    if (newDose === null) return

    const adjustmentType =
      newDose < Number.parseFloat(currentDose)
        ? "reduction"
        : newDose > Number.parseFloat(currentDose)
          ? "increase"
          : "hold"

    const adjustment: DoseAdjustment = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      medication: selectedMedication,
      previousDose: Number.parseFloat(currentDose),
      newDose,
      adjustmentType,
      reason: adjustmentReason,
      adverseEvents: [],
      labValues: Object.fromEntries(
        Object.entries(labValues)
          .filter(([_, value]) => value !== "")
          .map(([key, value]) => [key, Number.parseFloat(value)]),
      ),
      approvedBy: "Dr. Oncolog",
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      notes,
    }

    addAdjustment(adjustment)

    // Reset form
    setSelectedMedication("")
    setCurrentDose("")
    setAdjustmentReason("")
    setLabValues({
      neutrophils: "",
      platelets: "",
      hemoglobin: "",
      creatinine: "",
      bilirubin: "",
    })
    setNotes("")
  }

  const recommendedDose = calculateNewDose()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-500" />
            Calculator Ajustări Dozaj
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator">
            <TabsList>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="protocols">Protocoale</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medication">Medicament</Label>
                  <Select value={selectedMedication} onValueChange={setSelectedMedication}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează medicamentul" />
                    </SelectTrigger>
                    <SelectContent>
                      {MEDICATIONS.map((med) => (
                        <SelectItem key={med.id} value={med.id}>
                          {med.name} ({med.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currentDose">Doza Curentă</Label>
                  <Input
                    id="currentDose"
                    type="number"
                    value={currentDose}
                    onChange={(e) => setCurrentDose(e.target.value)}
                    placeholder="Introduceți doza curentă"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Motivul Ajustării</Label>
                <Select value={adjustmentReason} onValueChange={setAdjustmentReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează motivul" />
                  </SelectTrigger>
                  <SelectContent>
                    {ADJUSTMENT_REASONS.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="neutrophils">Neutrofile</Label>
                  <Input
                    id="neutrophils"
                    type="number"
                    value={labValues.neutrophils}
                    onChange={(e) => setLabValues((prev) => ({ ...prev, neutrophils: e.target.value }))}
                    placeholder="x10³/μL"
                  />
                </div>
                <div>
                  <Label htmlFor="platelets">Trombocite</Label>
                  <Input
                    id="platelets"
                    type="number"
                    value={labValues.platelets}
                    onChange={(e) => setLabValues((prev) => ({ ...prev, platelets: e.target.value }))}
                    placeholder="x10³/μL"
                  />
                </div>
                <div>
                  <Label htmlFor="hemoglobin">Hemoglobină</Label>
                  <Input
                    id="hemoglobin"
                    type="number"
                    value={labValues.hemoglobin}
                    onChange={(e) => setLabValues((prev) => ({ ...prev, hemoglobin: e.target.value }))}
                    placeholder="g/dL"
                  />
                </div>
                <div>
                  <Label htmlFor="creatinine">Creatinină</Label>
                  <Input
                    id="creatinine"
                    type="number"
                    value={labValues.creatinine}
                    onChange={(e) => setLabValues((prev) => ({ ...prev, creatinine: e.target.value }))}
                    placeholder="mg/dL"
                  />
                </div>
                <div>
                  <Label htmlFor="bilirubin">Bilirubină</Label>
                  <Input
                    id="bilirubin"
                    type="number"
                    value={labValues.bilirubin}
                    onChange={(e) => setLabValues((prev) => ({ ...prev, bilirubin: e.target.value }))}
                    placeholder="mg/dL"
                  />
                </div>
              </div>

              {recommendedDose !== null && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Recomandare Dozaj</span>
                    </div>
                    <div className="text-lg">
                      <span className="text-gray-600">Doza recomandată:</span>
                      <span className="font-bold text-green-700 ml-2">
                        {recommendedDose} {MEDICATIONS.find((m) => m.id === selectedMedication)?.unit}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Reducere de {Math.round((1 - recommendedDose / Number.parseFloat(currentDose || "1")) * 100)}%
                      față de doza anterioară
                    </div>
                  </CardContent>
                </Card>
              )}

              <div>
                <Label htmlFor="notes">Note Suplimentare</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Observații, instrucțiuni speciale..."
                />
              </div>

              <Button
                onClick={handleSubmitAdjustment}
                disabled={!selectedMedication || !currentDose || !adjustmentReason}
                className="bg-pink-600 hover:bg-pink-700"
              >
                Salvează Ajustarea
              </Button>
            </TabsContent>

            <TabsContent value="protocols">
              <div className="space-y-4">
                <h3 className="font-medium">Protocoale Standard de Reducere Dozaj</h3>
                <div className="grid gap-4">
                  {Object.entries(DOSE_REDUCTION_PROTOCOLS).map(([condition, reductions]) => (
                    <Card key={condition}>
                      <CardContent className="pt-4">
                        <h4 className="font-medium capitalize mb-2">{condition}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Grade 3: Reducere la {reductions.grade3 * 100}%</div>
                          <div>Grade 4: Reducere la {reductions.grade4 * 100}%</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Istoric Ajustări */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-purple-500" />
            Istoric Ajustări Dozaj
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {adjustments.map((adjustment) => (
              <div key={adjustment.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{MEDICATIONS.find((m) => m.id === adjustment.medication)?.name}</span>
                    <Badge className={getAdjustmentColor(adjustment.adjustmentType)}>
                      {getAdjustmentIcon(adjustment.adjustmentType)}
                      {adjustment.adjustmentType}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">{adjustment.date}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-2">
                  <div>
                    <span className="text-gray-600">Doza anterioară:</span>
                    <div className="font-medium">
                      {adjustment.previousDose} {MEDICATIONS.find((m) => m.id === adjustment.medication)?.unit}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Doza nouă:</span>
                    <div className="font-medium">
                      {adjustment.newDose} {MEDICATIONS.find((m) => m.id === adjustment.medication)?.unit}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Motiv:</span>
                    <div className="font-medium">{adjustment.reason}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Următoarea evaluare:</span>
                    <div className="font-medium">{adjustment.nextReview}</div>
                  </div>
                </div>

                {Object.keys(adjustment.labValues).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(adjustment.labValues).map(([key, value]) => (
                      <Badge key={key} variant="outline" className="text-xs">
                        {key}: {value}
                      </Badge>
                    ))}
                  </div>
                )}

                {adjustment.notes && <p className="text-sm text-gray-700 mt-2">{adjustment.notes}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
