"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Upload, Download, Eye, Search, Filter, ImageIcon } from "lucide-react"
import { usePatientData } from "@/hooks/usePatientData"

export function MedicalRecords() {
  const { documents } = usePatientData()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />
      case "image":
        return <ImageIcon className="h-8 w-8 text-blue-500" />
      case "report":
        return <FileText className="h-8 w-8 text-green-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "test-results":
        return "Rezultate Analize"
      case "imaging":
        return "Imagistică"
      case "prescription":
        return "Rețete"
      case "report":
        return "Rapoarte"
      default:
        return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "test-results":
        return "bg-blue-100 text-blue-800"
      case "imaging":
        return "bg-purple-100 text-purple-800"
      case "prescription":
        return "bg-green-100 text-green-800"
      case "report":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dosar Medical</h1>
          <p className="text-muted-foreground">Vizualizează și gestionează documentele tale medicale</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Încarcă Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documente</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">{documents.filter((doc) => doc.isNew).length} noi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rezultate Analize</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter((doc) => doc.category === "test-results").length}
            </div>
            <p className="text-xs text-muted-foreground">Ultimul: ieri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Imagistică</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.filter((doc) => doc.category === "imaging").length}</div>
            <p className="text-xs text-muted-foreground">CT, RMN, Radiografii</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rapoarte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.filter((doc) => doc.category === "report").length}</div>
            <p className="text-xs text-muted-foreground">Consultații, Tratamente</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Caută documente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrează
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Toate</TabsTrigger>
          <TabsTrigger value="test-results">Analize</TabsTrigger>
          <TabsTrigger value="imaging">Imagistică</TabsTrigger>
          <TabsTrigger value="prescription">Rețete</TabsTrigger>
          <TabsTrigger value="report">Rapoarte</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Toate Documentele</CardTitle>
              <CardDescription>Documentele medicale organizate cronologic</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    {getDocumentIcon(document.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{document.name}</p>
                        {document.isNew && <Badge className="bg-red-500 text-white">Nou</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(document.date).toLocaleDateString("ro-RO")} • {document.size}
                      </p>
                      <Badge className={getCategoryColor(document.category)} variant="outline">
                        {getCategoryLabel(document.category)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{document.name}</DialogTitle>
                          <DialogDescription>
                            Vizualizare document • {document.size} •{" "}
                            {new Date(document.date).toLocaleDateString("ro-RO")}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                          <div className="text-center">
                            {getDocumentIcon(document.type)}
                            <p className="text-muted-foreground mt-2">Previzualizare document</p>
                            <p className="text-sm text-muted-foreground">Vizualizare în dezvoltare</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar content for other tabs */}
        <TabsContent value="test-results">
          <Card>
            <CardHeader>
              <CardTitle>Rezultate Analize</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Rezultatele analizelor medicale...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imaging">
          <Card>
            <CardHeader>
              <CardTitle>Imagistică Medicală</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Imaginile medicale (CT, RMN, radiografii)...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescription">
          <Card>
            <CardHeader>
              <CardTitle>Rețete Medicale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Rețetele și prescripțiile medicale...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report">
          <Card>
            <CardHeader>
              <CardTitle>Rapoarte Medicale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Rapoartele de consultații și tratamente...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acțiuni Rapide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Upload className="h-6 w-6 mb-2" />
              Încarcă Analize
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              Solicită Copie
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
