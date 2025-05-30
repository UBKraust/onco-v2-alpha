"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, TrendingUp, Calendar, Activity } from "lucide-react"
import { usePatientData } from "@/hooks/usePatientData"

export function SymptomsTracker() {
  const { symptoms, addSymptom } = usePatientData()
  const [isAddingSymptom, setIsAddingSymptom] = useState(false)
  const [newSymptom, setNewSymptom] = useState({
    name: "",
    severity: [5],
    category: "other" as const,
    notes: "",
  })

  const handleAddSymptom = () => {
    if (newSymptom.name) {
      addSymptom({
        name: newSymptom.name,
        severity: newSymptom.severity[0],
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" }),
        category: newSymptom.category,
        notes: newSymptom.notes || undefined,
      })
      setNewSymptom({ name: "", severity: [5], category: "other", notes: "" })
      setIsAddingSymptom(false)
    }
  }

  const todaySymptoms = symptoms.filter((s) => s.date === new Date().toISOString().split("T")[0])
  const weekSymptoms = symptoms.filter((s) => {
    const symptomDate = new Date(s.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return symptomDate >= weekAgo
  })

  const averageSeverity =
    weekSymptoms.length > 0
      ? (weekSymptoms.reduce((sum, s) => sum + s.severity, 0) / weekSymptoms.length).toFixed(1)
      : "0"

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "pain":
        return "bg-red-100 text-red-800"
      case "nausea":
        return "bg-yellow-100 text-yellow-800"
      case "fatigue":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "pain":
        return "Durere"
      case "nausea":
        return "Greață"
      case "fatigue":
        return "Oboseală"
      default:
        return "Altele"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Jurnal Simptome</h1>
          <p className="text-muted-foreground">Monitorizează și înregistrează simptomele tale zilnice</p>
        </div>
        <Dialog open={isAddingSymptom} onOpenChange={setIsAddingSymptom}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adaugă Simptom
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adaugă Simptom Nou</DialogTitle>
              <DialogDescription>Înregistrează un simptom pentru monitorizare</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symptom-name">Numele simptomului</Label>
                <Input
                  id="symptom-name"
                  value={newSymptom.name}
                  onChange={(e) => setNewSymptom((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="ex: Durere de cap, Oboseală..."
                />
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={newSymptom.category}
                  onValueChange={(value: any) => setNewSymptom((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pain">Durere</SelectItem>
                    <SelectItem value="nausea">Greață</SelectItem>
                    <SelectItem value="fatigue">Oboseală</SelectItem>
                    <SelectItem value="other">Altele</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Severitate: {newSymptom.severity[0]}/10</Label>
                <Slider
                  value={newSymptom.severity}
                  onValueChange={(value) => setNewSymptom((prev) => ({ ...prev, severity: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Ușor</span>
                  <span>Moderat</span>
                  <span>Sever</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptom-notes">Note (opțional)</Label>
                <Textarea
                  id="symptom-notes"
                  value={newSymptom.notes}
                  onChange={(e) => setNewSymptom((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Detalii suplimentare despre simptom..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddSymptom} className="flex-1">
                  Adaugă Simptom
                </Button>
                <Button variant="outline" onClick={() => setIsAddingSymptom(false)}>
                  Anulează
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Simptome Astăzi</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaySymptoms.length}</div>
            <p className="text-xs text-muted-foreground">
              {todaySymptoms.length > 0 ? `Ultimul: acum 2 ore` : "Niciun simptom înregistrat"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendință Săptămânală</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Îmbunătățire</div>
            <p className="text-xs text-muted-foreground">față de săptămâna trecută</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Severitate Medie</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageSeverity}/10</div>
            <p className="text-xs text-muted-foreground">în ultimele 7 zile</p>
          </CardContent>
        </Card>
      </div>

      {/* Symptoms List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Simptome Recente</CardTitle>
            <CardDescription>Ultimele simptome înregistrate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {symptoms.slice(0, 10).map((symptom) => (
              <div key={symptom.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{symptom.name}</p>
                    <Badge className={getCategoryColor(symptom.category)}>{getCategoryLabel(symptom.category)}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(symptom.date).toLocaleDateString("ro-RO")} la {symptom.time}
                  </p>
                  {symptom.notes && <p className="text-xs text-muted-foreground mt-1">{symptom.notes}</p>}
                </div>
                <Badge
                  variant={symptom.severity >= 7 ? "destructive" : symptom.severity >= 4 ? "default" : "secondary"}
                  className="ml-2"
                >
                  {symptom.severity}/10
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grafic Săptămânal</CardTitle>
            <CardDescription>Evoluția simptomelor în ultima săptămână</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-muted-foreground">Grafic simptome</p>
                <p className="text-sm text-muted-foreground">Vizualizare în dezvoltare</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
