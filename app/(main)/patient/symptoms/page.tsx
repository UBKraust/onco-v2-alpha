"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Plus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Activity,
  Heart,
  Thermometer,
  Zap,
  Brain,
  StickerIcon as Stomach,
  Eye,
  Download,
} from "lucide-react"
import { format } from "date-fns"
import { ro } from "date-fns/locale"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { toast } from "@/components/ui/use-toast"

interface Symptom {
  id: string
  name: string
  severity: number
  category: "pain" | "nausea" | "fatigue" | "mood" | "sleep" | "appetite" | "other"
  date: string
  time: string
  notes?: string
  triggers?: string[]
  medication?: string
}

interface SymptomTrend {
  date: string
  severity: number
  category: string
}

const symptomCategories = [
  { value: "pain", label: "Durere", icon: Zap, color: "text-red-500" },
  { value: "nausea", label: "Greață", icon: Stomach, color: "text-green-500" },
  { value: "fatigue", label: "Oboseală", icon: Activity, color: "text-blue-500" },
  { value: "mood", label: "Dispoziție", icon: Brain, color: "text-purple-500" },
  { value: "sleep", label: "Somn", icon: Eye, color: "text-indigo-500" },
  { value: "appetite", label: "Apetit", icon: Heart, color: "text-pink-500" },
  { value: "other", label: "Altele", icon: AlertTriangle, color: "text-gray-500" },
]

const mockSymptoms: Symptom[] = [
  {
    id: "1",
    name: "Durere de cap",
    severity: 6,
    category: "pain",
    date: "2024-12-06",
    time: "14:30",
    notes: "Durere pulsatilă în zona temporală",
    triggers: ["stres", "lumină puternică"],
  },
  {
    id: "2",
    name: "Oboseală",
    severity: 8,
    category: "fatigue",
    date: "2024-12-06",
    time: "09:00",
    notes: "Oboseală extremă dimineața",
    medication: "Paracetamol",
  },
  {
    id: "3",
    name: "Greață ușoară",
    severity: 4,
    category: "nausea",
    date: "2024-12-05",
    time: "16:45",
    notes: "După masă",
  },
]

const mockTrendData: SymptomTrend[] = [
  { date: "2024-12-01", severity: 3, category: "pain" },
  { date: "2024-12-02", severity: 5, category: "pain" },
  { date: "2024-12-03", severity: 4, category: "pain" },
  { date: "2024-12-04", severity: 7, category: "pain" },
  { date: "2024-12-05", severity: 6, category: "pain" },
  { date: "2024-12-06", severity: 6, category: "pain" },
]

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState<Symptom[]>(mockSymptoms)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isAddingSymptom, setIsAddingSymptom] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [newSymptom, setNewSymptom] = useState({
    name: "",
    severity: [5],
    category: "pain" as Symptom["category"],
    notes: "",
    triggers: "",
    medication: "",
  })

  const handleAddSymptom = () => {
    if (!newSymptom.name.trim()) {
      toast({
        title: "Eroare",
        description: "Te rugăm să introduci numele simptomului.",
        variant: "destructive",
      })
      return
    }

    const symptom: Symptom = {
      id: Date.now().toString(),
      name: newSymptom.name,
      severity: newSymptom.severity[0],
      category: newSymptom.category,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: format(new Date(), "HH:mm"),
      notes: newSymptom.notes || undefined,
      triggers: newSymptom.triggers ? newSymptom.triggers.split(",").map((t) => t.trim()) : undefined,
      medication: newSymptom.medication || undefined,
    }

    setSymptoms([symptom, ...symptoms])
    setNewSymptom({
      name: "",
      severity: [5],
      category: "pain",
      notes: "",
      triggers: "",
      medication: "",
    })
    setIsAddingSymptom(false)

    toast({
      title: "Simptom adăugat",
      description: "Simptomul a fost înregistrat cu succes.",
    })
  }

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return "text-green-500 bg-green-50"
    if (severity <= 6) return "text-yellow-500 bg-yellow-50"
    return "text-red-500 bg-red-50"
  }

  const getSeverityLabel = (severity: number) => {
    if (severity <= 3) return "Ușor"
    if (severity <= 6) return "Moderat"
    return "Sever"
  }

  const filteredSymptoms = symptoms.filter((symptom) =>
    selectedCategory === "all" ? true : symptom.category === selectedCategory,
  )

  const todaySymptoms = symptoms.filter((symptom) => symptom.date === format(new Date(), "yyyy-MM-dd"))

  const averageSeverity = symptoms.length > 0 ? symptoms.reduce((acc, s) => acc + s.severity, 0) / symptoms.length : 0

  const categoryStats = symptomCategories.map((cat) => {
    const categorySymptoms = symptoms.filter((s) => s.category === cat.value)
    const avgSeverity =
      categorySymptoms.length > 0
        ? categorySymptoms.reduce((acc, s) => acc + s.severity, 0) / categorySymptoms.length
        : 0
    return {
      ...cat,
      count: categorySymptoms.length,
      avgSeverity: Math.round(avgSeverity * 10) / 10,
    }
  })

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Simptome & Stare</h1>
          <p className="text-muted-foreground">Monitorizează și înregistrează simptomele tale zilnice.</p>
        </div>
        <Dialog open={isAddingSymptom} onOpenChange={setIsAddingSymptom}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adaugă Simptom
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Înregistrează Simptom Nou</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="symptom-name">Numele simptomului</Label>
                <Input
                  id="symptom-name"
                  value={newSymptom.name}
                  onChange={(e) => setNewSymptom({ ...newSymptom, name: e.target.value })}
                  placeholder="ex: Durere de cap"
                />
              </div>
              <div>
                <Label>Categoria</Label>
                <Select
                  value={newSymptom.category}
                  onValueChange={(value) => setNewSymptom({ ...newSymptom, category: value as Symptom["category"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {symptomCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <cat.icon className={`h-4 w-4 ${cat.color}`} />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Severitate: {newSymptom.severity[0]}/10</Label>
                <Slider
                  value={newSymptom.severity}
                  onValueChange={(value) => setNewSymptom({ ...newSymptom, severity: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Ușor</span>
                  <span>Moderat</span>
                  <span>Sever</span>
                </div>
              </div>
              <div>
                <Label htmlFor="symptom-notes">Note (opțional)</Label>
                <Textarea
                  id="symptom-notes"
                  value={newSymptom.notes}
                  onChange={(e) => setNewSymptom({ ...newSymptom, notes: e.target.value })}
                  placeholder="Detalii suplimentare..."
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="symptom-triggers">Factori declanșatori (opțional)</Label>
                <Input
                  id="symptom-triggers"
                  value={newSymptom.triggers}
                  onChange={(e) => setNewSymptom({ ...newSymptom, triggers: e.target.value })}
                  placeholder="ex: stres, mâncare, medicament (separat prin virgulă)"
                />
              </div>
              <div>
                <Label htmlFor="symptom-medication">Medicament luat (opțional)</Label>
                <Input
                  id="symptom-medication"
                  value={newSymptom.medication}
                  onChange={(e) => setNewSymptom({ ...newSymptom, medication: e.target.value })}
                  placeholder="ex: Paracetamol 500mg"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddSymptom} className="flex-1">
                  Salvează
                </Button>
                <Button variant="outline" onClick={() => setIsAddingSymptom(false)} className="flex-1">
                  Anulează
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Simptome Astăzi</p>
                <p className="text-2xl font-bold">{todaySymptoms.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Severitate Medie</p>
                <p className="text-2xl font-bold">{averageSeverity.toFixed(1)}/10</p>
              </div>
              <Thermometer className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Înregistrări</p>
                <p className="text-2xl font-bold">{symptoms.length}</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tendință</p>
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">Îmbunătățire</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Prezentare Generală</TabsTrigger>
          <TabsTrigger value="trends">Tendințe</TabsTrigger>
          <TabsTrigger value="categories">Categorii</TabsTrigger>
          <TabsTrigger value="history">Istoric</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Simptome Recente</CardTitle>
                <CardDescription>Ultimele simptome înregistrate</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {symptoms.slice(0, 5).map((symptom) => {
                      const category = symptomCategories.find((cat) => cat.value === symptom.category)
                      return (
                        <div key={symptom.id} className="flex items-start justify-between p-3 border rounded-lg">
                          <div className="flex items-start gap-3">
                            {category && <category.icon className={`h-5 w-5 mt-0.5 ${category.color}`} />}
                            <div>
                              <h4 className="font-medium">{symptom.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(symptom.date), "dd MMM", { locale: ro })} la {symptom.time}
                              </p>
                              {symptom.notes && <p className="text-sm text-muted-foreground mt-1">{symptom.notes}</p>}
                            </div>
                          </div>
                          <Badge className={getSeverityColor(symptom.severity)}>
                            {symptom.severity}/10 - {getSeverityLabel(symptom.severity)}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grafic Severitate (Ultima Săptămână)</CardTitle>
                <CardDescription>Evoluția severității simptomelor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "dd/MM")} />
                    <YAxis domain={[0, 10]} />
                    <Tooltip
                      labelFormatter={(value) => format(new Date(value), "dd MMM yyyy", { locale: ro })}
                      formatter={(value) => [`${value}/10`, "Severitate"]}
                    />
                    <Line type="monotone" dataKey="severity" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analiza Tendințelor</CardTitle>
              <CardDescription>Evoluția simptomelor în timp</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "dd/MM")} />
                  <YAxis domain={[0, 10]} />
                  <Tooltip
                    labelFormatter={(value) => format(new Date(value), "dd MMM yyyy", { locale: ro })}
                    formatter={(value) => [`${value}/10`, "Severitate"]}
                  />
                  <Bar dataKey="severity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStats.map((stat) => (
              <Card key={stat.value}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      <h3 className="font-medium">{stat.label}</h3>
                    </div>
                    <Badge variant="outline">{stat.count}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Severitate medie:</span>
                      <span className="font-medium">{stat.avgSeverity}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(stat.avgSeverity / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Istoric Complet</CardTitle>
                  <CardDescription>Toate simptomele înregistrate</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrează categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toate categoriile</SelectItem>
                      {symptomCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {filteredSymptoms.map((symptom) => {
                    const category = symptomCategories.find((cat) => cat.value === symptom.category)
                    return (
                      <div key={symptom.id} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {category && <category.icon className={`h-5 w-5 mt-0.5 ${category.color}`} />}
                            <div>
                              <h4 className="font-medium">{symptom.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(symptom.date), "dd MMMM yyyy", { locale: ro })} la {symptom.time}
                              </p>
                            </div>
                          </div>
                          <Badge className={getSeverityColor(symptom.severity)}>
                            {symptom.severity}/10 - {getSeverityLabel(symptom.severity)}
                          </Badge>
                        </div>
                        {symptom.notes && (
                          <div className="ml-8">
                            <p className="text-sm text-muted-foreground">{symptom.notes}</p>
                          </div>
                        )}
                        {symptom.triggers && (
                          <div className="ml-8">
                            <p className="text-xs text-muted-foreground">
                              Factori declanșatori: {symptom.triggers.join(", ")}
                            </p>
                          </div>
                        )}
                        {symptom.medication && (
                          <div className="ml-8">
                            <p className="text-xs text-muted-foreground">Medicament: {symptom.medication}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
