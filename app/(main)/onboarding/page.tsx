import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, ArrowRight, Play } from "lucide-react"

export default function OnboardingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Onboarding</h1>
        <p className="text-muted-foreground">Ghid de introducere în platformă pentru utilizatori noi</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progresul tău</CardTitle>
          <CardDescription>Completează pașii de mai jos pentru a te familiariza cu platforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progres general</span>
              <span>60%</span>
            </div>
            <Progress value={60} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pași de Onboarding</CardTitle>
            <CardDescription>Urmează acești pași pentru a începe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Completează profilul",
                description: "Adaugă informațiile personale și de contact",
                status: "completed",
                duration: "5 min",
              },
              {
                title: "Configurează preferințele",
                description: "Setează notificările și preferințele de comunicare",
                status: "completed",
                duration: "3 min",
              },
              {
                title: "Explorează dashboard-ul",
                description: "Fă un tur ghidat prin interfața principală",
                status: "current",
                duration: "10 min",
              },
              {
                title: "Primul pacient",
                description: "Adaugă primul pacient în sistem (doar navigatori)",
                status: "pending",
                duration: "15 min",
              },
              {
                title: "Training de bază",
                description: "Completează cursul introductiv",
                status: "pending",
                duration: "30 min",
              },
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="mt-1">
                  {step.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : step.status === "current" ? (
                    <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{step.title}</h3>
                    <Badge
                      variant={
                        step.status === "completed" ? "default" : step.status === "current" ? "secondary" : "outline"
                      }
                    >
                      {step.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  {step.status === "current" && (
                    <Button size="sm" className="mt-2">
                      <Play className="mr-2 h-4 w-4" />
                      Începe
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resurse Utile</CardTitle>
            <CardDescription>Materiale suplimentare pentru a te ajuta să începi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">Ghid de Utilizare</h4>
                <p className="text-sm text-muted-foreground mt-1">Manual complet pentru utilizarea platformei</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Citește
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">Video Tutorial</h4>
                <p className="text-sm text-muted-foreground mt-1">Prezentare video a funcționalităților principale</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Play className="mr-2 h-4 w-4" />
                  Vizionează
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">Întrebări Frecvente</h4>
                <p className="text-sm text-muted-foreground mt-1">Răspunsuri la cele mai comune întrebări</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Explorează
                </Button>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <h4 className="font-medium">Suport Tehnic</h4>
                <p className="text-sm text-muted-foreground mt-1">Ai nevoie de ajutor? Contactează echipa de suport</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Contactează
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
