"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, ImageIcon, Pill, Activity, Stethoscope, ClipboardList, FolderOpen, Tag } from "lucide-react"

interface DocumentCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  types: string[]
}

interface DocumentCategorySelectorProps {
  onCategorySelect: (category: DocumentCategory, metadata: DocumentMetadata) => void
  selectedFiles: File[]
}

interface DocumentMetadata {
  category: string
  type: string
  tags: string[]
  description: string
  date: string
}

const categories: DocumentCategory[] = [
  {
    id: "test-results",
    name: "Rezultate Analize",
    description: "Analize de sânge, urină, biopsii, markeri tumorali",
    icon: <Activity className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    types: ["Analize sânge", "Analize urină", "Biopsie", "Markeri tumorali", "Alte analize"],
  },
  {
    id: "imaging",
    name: "Imagistică Medicală",
    description: "CT, RMN, radiografii, ecografii, PET-CT",
    icon: <ImageIcon className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    types: ["CT", "RMN", "Radiografie", "Ecografie", "PET-CT", "Mamografie"],
  },
  {
    id: "prescription",
    name: "Rețete și Medicație",
    description: "Rețete medicale, scheme de tratament, ajustări dozaj",
    icon: <Pill className="h-5 w-5" />,
    color: "bg-green-100 text-green-800 border-green-200",
    types: ["Rețetă", "Schemă tratament", "Ajustare dozaj", "Medicație suport"],
  },
  {
    id: "consultation",
    name: "Consultații Medicale",
    description: "Sumere consultații, recomandări, planuri de tratament",
    icon: <Stethoscope className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-800 border-orange-200",
    types: ["Consultație oncologie", "Consultație cardiologie", "Consultație nutriție", "Alte consultații"],
  },
  {
    id: "discharge",
    name: "Documente Spital",
    description: "Bilete externare, internare, transferuri",
    icon: <ClipboardList className="h-5 w-5" />,
    color: "bg-red-100 text-red-800 border-red-200",
    types: ["Bilet externare", "Bilet internare", "Transfer", "Foaie observație"],
  },
  {
    id: "other",
    name: "Alte Documente",
    description: "Documente diverse, formulare, declarații",
    icon: <FolderOpen className="h-5 w-5" />,
    color: "bg-gray-100 text-gray-800 border-gray-200",
    types: ["Formular", "Declarație", "Certificat", "Altele"],
  },
]

export function DocumentCategorySelector({ onCategorySelect, selectedFiles }: DocumentCategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | null>(null)
  const [selectedType, setSelectedType] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [description, setDescription] = useState("")
  const [documentDate, setDocumentDate] = useState(new Date().toISOString().split("T")[0])

  const handleCategorySelect = (category: DocumentCategory) => {
    setSelectedCategory(category)
    setSelectedType("")
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = () => {
    if (!selectedCategory || !selectedType) {
      alert("Vă rugăm să selectați categoria și tipul documentului")
      return
    }

    const metadata: DocumentMetadata = {
      category: selectedCategory.id,
      type: selectedType,
      tags,
      description,
      date: documentDate,
    }

    onCategorySelect(selectedCategory, metadata)
  }

  return (
    <div className="space-y-6">
      {/* Selected Files Summary */}
      {selectedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fișiere pentru încărcare ({selectedFiles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{file.name}</span>
                  <span className="text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Selectați Categoria Documentului</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory?.id === category.id
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-md ${category.color}`}>{category.icon}</div>
                  <h3 className="font-semibold">{category.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Type and Metadata Selection */}
      {selectedCategory && (
        <Card>
          <CardHeader>
            <CardTitle>Detalii Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipul documentului</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectați tipul" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory.types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Data documentului</Label>
                <Input id="date" type="date" value={documentDate} onChange={(e) => setDocumentDate(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descriere (opțional)</Label>
              <Textarea
                id="description"
                placeholder="Adăugați o descriere pentru acest document..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Tag-uri (opțional)</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Adăugați un tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} variant="outline">
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Button onClick={handleSubmit} className="w-full" disabled={!selectedCategory || !selectedType}>
              Continuă cu Încărcarea
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
