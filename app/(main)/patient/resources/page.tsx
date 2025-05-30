import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Resurse Educaționale</h1>
        <p className="text-muted-foreground">Materiale și informații utile pentru îngrijirea ta</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Managementul Grețului în Timpul Chimioterapiei",
            description: "Sfaturi practice și recomandări pentru gestionarea efectelor secundare.",
            type: "Articol",
            icon: FileText,
            duration: "5 min citire",
            category: "Tratament",
          },
          {
            title: "Importanța Nutriției pentru Pacientul Oncologic",
            description: "Ghid video cu un nutriționist specialist în oncologie.",
            type: "Video",
            icon: Video,
            duration: "15 min",
            category: "Nutriție",
          },
          {
            title: "Exerciții Recomandate în Timpul Tratamentului",
            description: "Program de exerciții adaptate pentru pacienții în tratament.",
            type: "Ghid",
            icon: BookOpen,
            duration: "10 min citire",
            category: "Activitate Fizică",
          },
          {
            title: "Gestionarea Anxietății și Stresului",
            description: "Tehnici de relaxare și mindfulness pentru pacienți.",
            type: "Video",
            icon: Video,
            duration: "20 min",
            category: "Sănătate Mentală",
          },
          {
            title: "Înțelegerea Rezultatelor Analizelor",
            description: "Cum să interpretezi rezultatele analizelor medicale.",
            type: "Articol",
            icon: FileText,
            duration: "8 min citire",
            category: "Educație Medicală",
          },
          {
            title: "Comunicarea cu Echipa Medicală",
            description: "Cum să comunici eficient cu medicii și asistentele.",
            type: "Ghid",
            icon: BookOpen,
            duration: "6 min citire",
            category: "Comunicare",
          },
        ].map((resource, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <resource.icon className="h-8 w-8 text-blue-500" />
                <Badge variant="outline">{resource.type}</Badge>
              </div>
              <CardTitle className="text-lg">{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{resource.duration}</p>
                  <Badge variant="secondary" className="text-xs">
                    {resource.category}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Citește
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resurse Personalizate</CardTitle>
          <CardDescription>Materiale recomandate special pentru tine de către echipa medicală</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6 text-blue-500" />
              <div>
                <p className="font-medium">Ghid Nutriție pentru Chimioterapie CHOP</p>
                <p className="text-sm text-muted-foreground">Recomandat de Dr. Emily Carter</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Descarcă PDF
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
            <div className="flex items-center space-x-3">
              <Video className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-medium">Exerciții de Respirație pentru Anxietate</p>
                <p className="text-sm text-muted-foreground">Recomandat de Sarah Miller, RD</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Vizionează
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
