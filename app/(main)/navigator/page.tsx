import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, TrendingUp, AlertTriangle } from "lucide-react"
import QuickActionsCard from "@/components/ui/quick-actions-card"

export default function NavigatorDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Navigator</h1>
        <p className="text-muted-foreground">Monitorizează și gestionează pacienții din grija ta</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacienți Activi</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 față de luna trecută</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programări Astăzi</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Următoarea la 10:30</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerte Critice</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Necesită atenție imediată</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aderență Medie</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">+5% față de săptămâna trecută</p>
          </CardContent>
        </Card>
      </div>

      <QuickActionsCard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pacienți cu Prioritate Înaltă</CardTitle>
            <CardDescription>Pacienți care necesită atenție imediată</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Maria Popescu",
                condition: "Valori anormale analize",
                priority: "Critic",
                lastContact: "acum 2 ore",
              },
              { name: "Ion Georgescu", condition: "Simptome severe", priority: "Înalt", lastContact: "acum 4 ore" },
              { name: "Ana Dumitrescu", condition: "Lipsă la programare", priority: "Mediu", lastContact: "ieri" },
            ].map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  <p className="text-xs text-muted-foreground">Ultimul contact: {patient.lastContact}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      patient.priority === "Critic"
                        ? "destructive"
                        : patient.priority === "Înalt"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {patient.priority}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Contactează
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activitate Recentă</CardTitle>
            <CardDescription>Ultimele acțiuni și evenimente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "Document nou adăugat", patient: "Maria Popescu", time: "acum 30 min" },
              { action: "Programare confirmată", patient: "Ion Georgescu", time: "acum 1 oră" },
              { action: "Simptome înregistrate", patient: "Ana Dumitrescu", time: "acum 2 ore" },
              { action: "Mesaj trimis", patient: "Gheorghe Ionescu", time: "acum 3 ore" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.patient} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
