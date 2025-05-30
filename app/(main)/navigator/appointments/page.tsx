import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Plus } from "lucide-react"

export default function NavigatorAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendar Programări</h1>
          <p className="text-muted-foreground">Gestionează programările pentru toți pacienții</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Programare Nouă
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <CardTitle className="text-sm font-medium">Săptămâna Aceasta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">+4 față de săptămâna trecută</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacienți Unici</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">din 24 pacienți activi</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Programări Astăzi</CardTitle>
            <CardDescription>Agenda ta pentru ziua de astăzi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { time: "09:00", patient: "Maria Popescu", type: "Consultație de urmărire", status: "Confirmat" },
              { time: "10:30", patient: "Ion Georgescu", type: "Evaluare simptome", status: "În curs" },
              { time: "11:45", patient: "Ana Dumitrescu", type: "Planificare tratament", status: "Confirmat" },
              { time: "14:00", patient: "Gheorghe Ionescu", type: "Consultație nutriție", status: "Confirmat" },
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <p className="font-bold text-sm">{appointment.time}</p>
                  </div>
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={appointment.status === "În curs" ? "default" : "outline"}>{appointment.status}</Badge>
                  <Button variant="outline" size="sm">
                    Detalii
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar Săptămânal</CardTitle>
            <CardDescription>Vizualizare generală a programărilor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-muted-foreground">Calendar widget (placeholder)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
