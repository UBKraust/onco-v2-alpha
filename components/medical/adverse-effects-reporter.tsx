"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { AlertTriangle, Camera, Clock, FileText } from "lucide-react"
import { useAdverseEffects } from "@/hooks/useAdverseEffects"

interface AdverseEffect {
  id: string
  category: string
  name: string
  grade: number
  severity: number
  impact: number
  startDate: string
  endDate?: string
  description: string
  interventions: string[]
  photos?: string[]
  relatedTreatment: string
}

const CTCAE_CATEGORIES = [
  {
    id: "gastrointestinal",
    name: "Gastrointestinal",
    icon: "🫃",
    effects: ["Nausea", "Vomiting", "Diarrhea", "Constipation", "Mucositis", "Loss of appetite"],
  },
  {
    id: "hematologic",
    name: "Hematologic",
    icon: "🩸",
    effects: ["Anemia", "Neutropenia", "Thrombocytopenia", "Leukopenia"],
  },
  {
    id: "neurologic",
    name: "Neurologic",
    icon: "🧠",
    effects: ["Peripheral neuropathy", "Cognitive disturbance", "Dizziness", "Headache"],
  },
  {
    id: "dermatologic",
    name: "Dermatologic",
    icon: "🫱",
    effects: ["Rash", "Dry skin", "Hair loss", "Nail changes", "Hand-foot syndrome"],
  },
  {
    id: "constitutional",
    name: "Constitutional",
    icon: "😴",
    effects: ["Fatigue", "Fever", "Weight loss", "Insomnia"],
  },
]

const SEVERITY_LEVELS = [
  { value: 1, label: "Mild", color: "bg-green-100 text-green-800", description: "Minimal symptoms" },
  { value: 2, label: "Moderate", color: "bg-yellow-100 text-yellow-800", description: "Moderate symptoms" },
  { value: 3, label: "Severe", color: "bg-orange-100 text-orange-800", description: "Severe symptoms" },
  { value: 4, label: "Life-threatening", color: "bg-red-100 text-red-800", description: "Life-threatening" },
  { value: 5, label: "Death", color: "bg-gray-100 text-gray-800", description: "Death related to AE" },
]

export function AdverseEffectsReporter() {
  const { adverseEffects, addAdverseEffect, updateAdverseEffect } = useAdverseEffects()
  const [selectedCategory, setSelectedCategory] = useState("gastrointestinal")
  const [selectedEffect, setSelectedEffect] = useState("")
  const [formData, setFormData] = useState({
    grade: 1,
    severity: 1,
    impact: 1,
    description: "",
    interventions: "",
    startDate: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = () => {
    if (!selectedEffect) return

    const newEffect: AdverseEffect = {
      id: Date.now().toString(),
      category: selectedCategory,
      name: selectedEffect,
      grade: formData.grade,
      severity: formData.severity,
      impact: formData.impact,
      startDate: formData.startDate,
      description: formData.description,
      interventions: formData.interventions
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      relatedTreatment: "Current Protocol",
    }

    addAdverseEffect(newEffect)

    // Reset form
    setSelectedEffect("")
    setFormData({
      grade: 1,
      severity: 1,
      impact: 1,
      description: "",
      interventions: "",
      startDate: new Date().toISOString().split("T")[0],
    })
  }

  const getSeverityBadge = (grade: number) => {
    const level = SEVERITY_LEVELS.find((l) => l.value === grade)
    return level ? (
      <Badge className={level.color}>
        Grade {grade} - {level.label}
      </Badge>
    ) : null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Raportare Efecte Adverse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-5 w-full">
              {CTCAE_CATEGORIES.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {CTCAE_CATEGORIES.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {category.effects.map((effect) => (
                    <Button
                      key={effect}
                      variant={selectedEffect === effect ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedEffect(effect)}
                      className="justify-start"
                    >
                      {effect}
                    </Button>
                  ))}
                </div>

                {selectedEffect && (
                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Raportare: {selectedEffect}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Grad CTCAE: {formData.grade}</Label>
                          <Slider
                            value={[formData.grade]}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, grade: value[0] }))}
                            max={5}
                            min={1}
                            step={1}
                            className="mt-2"
                          />
                          {getSeverityBadge(formData.grade)}
                        </div>

                        <div>
                          <Label>Severitate (1-10): {formData.severity}</Label>
                          <Slider
                            value={[formData.severity]}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, severity: value[0] }))}
                            max={10}
                            min={1}
                            step={1}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>Impact calitate viață (1-10): {formData.impact}</Label>
                          <Slider
                            value={[formData.impact]}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, impact: value[0] }))}
                            max={10}
                            min={1}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Descriere detaliată</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Descrieți simptomele, durata, factori declanșatori..."
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="interventions">Intervenții/Tratamente (separate prin virgulă)</Label>
                        <Textarea
                          id="interventions"
                          value={formData.interventions}
                          onChange={(e) => setFormData((prev) => ({ ...prev, interventions: e.target.value }))}
                          placeholder="Medicație, modificări dietă, alte măsuri..."
                          className="mt-1"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleSubmit} className="bg-pink-600 hover:bg-pink-700">
                          <FileText className="h-4 w-4 mr-2" />
                          Raportează Efectul Advers
                        </Button>
                        <Button variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Adaugă Foto
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Istoric Efecte Adverse */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Istoric Efecte Adverse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {adverseEffects.map((effect) => (
              <div key={effect.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{effect.name}</span>
                    {getSeverityBadge(effect.grade)}
                  </div>
                  <span className="text-sm text-gray-500">{effect.startDate}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Severitate:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: `${(effect.severity / 10) * 100}%` }}
                        />
                      </div>
                      <span>{effect.severity}/10</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-600">Impact:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${(effect.impact / 10) * 100}%` }}
                        />
                      </div>
                      <span>{effect.impact}/10</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-600">Status:</span>
                    <Badge variant={effect.endDate ? "secondary" : "destructive"}>
                      {effect.endDate ? "Rezolvat" : "Activ"}
                    </Badge>
                  </div>
                </div>

                {effect.description && <p className="text-sm text-gray-700">{effect.description}</p>}

                {effect.interventions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {effect.interventions.map((intervention, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {intervention}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
