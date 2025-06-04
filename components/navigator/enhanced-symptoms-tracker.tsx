"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Activity, Plus, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Symptom {
  id: string
  name: string
  severity: number // 1-10
  frequency: "rare" | "occasional" | "frequent" | "constant"
  category: "pain" | "nausea" | "fatigue" | "emotional" | "digestive" | "other"
  notes: string
  reportedAt: string
  reportedBy: "patient" | "navigator" | "caregiver"
}

interface SymptomTrend {
  date: string
  severity: number
  symptomName: string
}

const mockSymptoms: Symptom[] = [
  {
    id: "1",
    name: "Durere abdominală",
    severity: 7,
    frequency: "frequent",
    category: "pain",
    notes: "Durere intensă după mese, ameliorată de analgezice",
    reportedAt: "2024-01-15T10:30:00Z",
    reportedBy: "patient",
  },
  {
    id: "2",
    name: "Greață",
    severity: 5,
    frequency: "occasional",
    category: "nausea",
    notes: "Apare dimineața, îmbunătățită după medicație",
    reportedAt: "2024-01-14T08:15:00Z",
    reportedBy: "patient",
  },
  {
    id: "3",
    name: "Oboseală extremă",
    severity: 8,
    frequency: "constant",
    category: "fatigue",
    notes: "Oboseală persistentă, afectează activitățile zilnice",
    reportedAt: "2024-01-13T16:45:00Z",
    reportedBy: "navigator",
  },
]

const mockTrendData: SymptomTrend[] = [
  { date: "2024-01-10", severity: 6, symptomName: "Durere" },
  { date: "2024-01-11", severity: 7, symptomName: "Durere" },
  { date: "2024-01-12", severity: 5, symptomName: "Durere" },
  { date: "2024-01-13", severity: 8, symptomName: "Durere" },
  { date: "2024-01-14", severity: 6, symptomName: "Durere" },
  { date: "2024-01-15", severity: 7, symptomName: "Durere" },
]

const symptomCategories = {
  pain: "Durere",
  nausea: "Greață",
  fatigue: "Oboseală",
  emotional: "Emoțional",
  digestive: "Digestiv",
  other: "Altele",
}

const frequencyLabels = {
  rare: "Rar",
  occasional: "Ocazional",
  frequent: "Frecvent",
  constant: "Constant",
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "pain":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "nausea":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "fatigue":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    case "emotional":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    case "digestive":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

const getSeverityColor = (severity: number) => {
  if (severity <= 3) return "text-green-600"
  if (severity <= 6) return "text-yellow-600"
  return "text-red-600"
}

interface EnhancedSymptomsTrackerProps {
  patientId: string
  patientName: string
}

export function EnhancedSymptomsTracker({ patientId, patientName }: EnhancedSymptomsTrackerProps) {
  const [symptoms, setSymptoms] = useState<Symptom[]>(mockSymptoms)
  const [isAddingSymptom, setIsAddingSymptom] = useState(false)
  const [newSymptom, setNewSymptom] = useState({
    name: "",
    severity: 5,
    frequency: "occasional" as Symptom["frequency"],
    category: "other" as Symptom["category"],
    notes: "",
  })

  const handleAddSymptom = async () => {
    if (!newSymptom.name.trim()) {
      toast({
        title: "Eroare",
        description: "Numele simptomului este obligatoriu.",
        variant: "destructive",
      })
      return
    }

    const symptom: Symptom = {
      id: Date.now().toString(),
      ...newSymptom,
      reportedAt: new Date().toISOString(),
      reportedBy: "navigator",
    }

    setSymptoms([symptom, ...symptoms])
    setNewSymptom({
      name: "",
      severity: 5,
      frequency: "occasional",
      category: "other",
      notes: "",
    })
    setIsAddingSymptom(false)

    toast({
      title: "Simptom adăugat",
      description: "Simptomul a fost înregistrat cu succes.",
    })
  }

  const getAverageSeverity = () => {
    if (symptoms.length === 0) return 0
    return symptoms.reduce((sum, symptom) => sum + symptom.severity, 0) / symptoms.length
  }

  const getMostFrequentCategory = () => {
    const categoryCounts = symptoms.reduce(
      (acc, symptom) => {
        acc[symptom.category] = (acc[symptom.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const mostFrequent = Object.entries(categoryCounts).reduce((a, b) => (a[1] > b[1] ? a : b), ["", 0])
    return mostFrequent[0] ? symptomCategories[mostFrequent[0] as keyof typeof symptomCategories] : "N/A"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header with Quick Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Tracker Simptome
              </CardTitle>
              <CardDescription>Monitorizare simptome pentru {patientName}</CardDescription>
            </div>
            <Dialog open={isAddingSymptom} onOpenChange={setIsAddingSymptom}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Raportează Simptom
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Raportează Simptom Nou</DialogTitle>
                  <DialogDescription>Adaugă un simptom observat la pacient</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="symptom-name">Numele simptomului</Label>
                    <Select
                      value={newSymptom.name}
                      onValueChange={(value) => setNewSymptom({ ...newSymptom, name: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează simptomul" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Durere abdominală">Durere abdominală</SelectItem>
                        <SelectItem value="Durere de cap">Durere de cap</SelectItem>
                        <SelectItem value="Greață">Greață</SelectItem>
                        <SelectItem value="Vomă">Vomă</SelectItem>
                        <SelectItem value="Oboseală">Oboseală</SelectItem>
                        <SelectItem value="Pierdere apetit">Pierdere apetit</SelectItem>
                        <SelectItem value="Dificultăți respiratorii">Dificultăți respiratorii</SelectItem>
                        <SelectItem value="Anxietate">Anxietate</SelectItem>
                        <SelectItem value="Depresie">Depresie</SelectItem>
                        <SelectItem value="Insomnie">Insomnie</SelectItem>
                        <SelectItem value="Altul">Altul (specifică în note)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="severity">Severitate (1-10)</Label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={newSymptom.severity}
                        onChange={(e) => setNewSymptom({ ...newSymptom, severity: Number.parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Ușor (1)</span>
                        <span className={getSeverityColor(newSymptom.severity)}>Severitate: {newSymptom.severity}</span>
                        <span>Sever (10)</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="frequency">Frecvență</Label>
                      <Select
                        value={newSymptom.frequency}
                        onValueChange={(value: any) => setNewSymptom({ ...newSymptom, frequency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(frequencyLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Categorie</Label>
                      <Select
                        value={newSymptom.category}
                        onValueChange={(value: any) => setNewSymptom({ ...newSymptom, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(symptomCategories).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Note suplimentare</Label>
                    <Textarea
                      id="notes"
                      value={newSymptom.notes}
                      onChange={(e) => setNewSymptom({ ...newSymptom, notes: e.target.value })}
                      placeholder="Detalii despre simptom, context, factori declanșatori..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingSymptom(false)}>
                    Anulează
                  </Button>
                  <Button onClick={handleAddSymptom}>Salvează Simptomul</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{symptoms.length}</div>
              <div className="text-sm text-muted-foreground">Simptome raportate</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getSeverityColor(getAverageSeverity())}`}>
                {getAverageSeverity().toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Severitate medie</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{getMostFrequentCategory()}</div>
              <div className="text-sm text-muted-foreground">Categorie dominantă</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Evoluția Simptomelor
          </CardTitle>
          <CardDescription>Tendința severității în ultimele zile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="severity" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Symptoms List */}
      <Card>
        <CardHeader>
          <CardTitle>Simptome Recente</CardTitle>
          <CardDescription>Lista simptomelor raportate recent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {symptoms.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nu sunt simptome raportate</p>
                <p className="text-sm">Adaugă primul simptom pentru a începe monitorizarea</p>
              </div>
            ) : (
              symptoms.map((symptom) => (
                <div key={symptom.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{symptom.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getCategoryColor(symptom.category)}>
                          {symptomCategories[symptom.category]}
                        </Badge>
                        <Badge variant="outline">{frequencyLabels[symptom.frequency]}</Badge>
                        <span className="text-sm text-muted-foreground">
                          Raportată de:{" "}
                          {symptom.reportedBy === "patient"
                            ? "Pacient"
                            : symptom.reportedBy === "navigator"
                              ? "Navigator"
                              : "Aparținător"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getSeverityColor(symptom.severity)}`}>
                        {symptom.severity}/10
                      </div>
                      <div className="text-xs text-muted-foreground">{formatDate(symptom.reportedAt)}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Progress value={symptom.severity * 10} className="h-2" />
                    {symptom.notes && <p className="text-sm text-muted-foreground">{symptom.notes}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
