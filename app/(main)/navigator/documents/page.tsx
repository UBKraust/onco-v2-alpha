"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Download, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"

export default function NavigatorDocumentsPage() {
  const documents = [
    {
      id: "1",
      name: "Protocol Chimioterapie CHOP",
      type: "Protocol",
      category: "treatment",
      size: "2.4 MB",
      lastModified: "2024-11-10",
      author: "Dr. Emily Carter",
      status: "active",
      patients: 8,
    },
    {
      id: "2",
      name: "Ghid Aderență Medicație",
      type: "Ghid",
      category: "education",
      size: "1.8 MB",
      lastModified: "2024-11-08",
      author: "Ana Ionescu",
      status: "active",
      patients: 15,
    },
    {
      id: "3",
      name: "Formular Evaluare Simptome",
      type: "Formular",
      category: "assessment",
      size: "0.5 MB",
      lastModified: "2024-11-05",
      author: "Sistem",
      status: "active",
      patients: 24,
    },
    {
      id: "4",
      name: "Raport Lunar Octombrie",
      type: "Raport",
      category: "reporting",
      size: "3.2 MB",
      lastModified: "2024-10-31",
      author: "Ana Ionescu",
      status: "archived",
      patients: 0,
    },
  ]

  const templates = [
    {
      id: "t1",
      name: "Plan de Îngrijire Personalizat",
      description: "Template pentru planuri de îngrijire individualizate",
      category: "care-plan",
      uses: 45,
    },
    {
      id: "t2",
      name: "Raport Progres Pacient",
      description: "Template pentru raportarea progresului pacienților",
      category: "progress",
      uses: 32,
    },
    {
      id: "t3",
      name: "Checklist Pre-Chimioterapie",
      description: "Lista de verificare înainte de ședințele de chimioterapie",
      category: "checklist",
      uses: 28,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documente și Template-uri</h1>
          <p className="text-muted-foreground">Gestionează documentele, protocoalele și template-urile</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Încarcă Document
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Caută documente..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtrează
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documente</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">Toate categoriile</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {documents.filter((d) => d.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">În utilizare</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Template-uri</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{templates.length}</div>
            <p className="text-xs text-muted-foreground">Disponibile</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilizări Luna</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Descărcări/vizualizări</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Documente</TabsTrigger>
          <TabsTrigger value="templates">Template-uri</TabsTrigger>
          <TabsTrigger value="protocols">Protocoale</TabsTrigger>
          <TabsTrigger value="reports">Rapoarte</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Toate Documentele</CardTitle>
              <CardDescription>Documentele și fișierele tale organizate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.size} • Modificat: {doc.lastModified}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Autor: {doc.author} • Utilizat de {doc.patients} pacienți
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={doc.status === "active" ? "default" : "secondary"}>
                        {doc.status === "active" ? "Activ" : "Arhivat"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template-uri Disponibile</CardTitle>
              <CardDescription>Template-uri predefinite pentru documentele frecvente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{template.uses} utilizări</Badge>
                        <Button size="sm">Folosește</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Protocoale Medicale</CardTitle>
              <CardDescription>Protocoale și ghiduri de tratament</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents
                  .filter((doc) => doc.category === "treatment")
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-green-500" />
                        <div>
                          <h3 className="font-semibold">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Protocol • {doc.size} • Actualizat: {doc.lastModified}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">Protocol Activ</Badge>
                        <Button variant="outline" size="sm">
                          Vizualizează
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapoarte Generate</CardTitle>
              <CardDescription>Rapoartele și analizele create</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents
                  .filter((doc) => doc.category === "reporting")
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-purple-500" />
                        <div>
                          <h3 className="font-semibold">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Raport • {doc.size} • Generat: {doc.lastModified}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Arhivat</Badge>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Descarcă
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
