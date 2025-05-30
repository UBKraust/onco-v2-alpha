import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Download, Eye, Edit } from "lucide-react"

export default function PatientMedicalFilePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dosar Medical - Pacient {params.id}</h1>
          <p className="text-muted-foreground">Gestionează documentele medicale ale pacientului</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Încarcă Document
        </Button>
      </div>

      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Documente</TabsTrigger>
          <TabsTrigger value="analyses">Analize</TabsTrigger>
          <TabsTrigger value="imaging">Imagistică</TabsTrigger>
          <TabsTrigger value="reports">Rapoarte</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Toate Documentele</CardTitle>
              <CardDescription>Documentele medicale ale pacientului organizate cronologic</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Rezultate CT Abdomen",
                  date: "20 Oct 2024",
                  type: "PDF",
                  category: "Imagistică",
                  status: "Nou",
                },
                {
                  name: "Analize Sânge Complete",
                  date: "18 Oct 2024",
                  type: "PDF",
                  category: "Analize",
                  status: "Revizuit",
                },
                {
                  name: "Raport Chimioterapie #2",
                  date: "15 Oct 2024",
                  type: "Document",
                  category: "Tratament",
                  status: "Revizuit",
                },
                {
                  name: "Consultație Oncologie",
                  date: "10 Oct 2024",
                  type: "Raport",
                  category: "Consultație",
                  status: "Revizuit",
                },
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">{doc.date}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {doc.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={doc.status === "Nou" ? "default" : "secondary"}>{doc.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyses">
          <Card>
            <CardHeader>
              <CardTitle>Analize Medicale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analizele medicale vor fi afișate aici...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imaging">
          <Card>
            <CardHeader>
              <CardTitle>Imagistică Medicală</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Imaginile medicale vor fi afișate aici...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Rapoarte Medicale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Rapoartele medicale vor fi afișate aici...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
