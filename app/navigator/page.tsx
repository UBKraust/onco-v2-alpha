import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, TrendingUp, AlertTriangle, Clock, Phone, MessageSquare, FileText } from "lucide-react"
import Link from "next/link"

export default function NavigatorPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Navigator</h1>
          <p className="text-muted-foreground">Monitorizează și gestionează pacienții din grija ta</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/navigator/patients/new">
              <Users className="h-4 w-4 mr-2" />
              Pacient Nou
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/navigator/appointments/new">
              <Calendar className="h-4 w-4 mr-2" />
              Programare Nouă
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Patients */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pacienți cu Prioritate Înaltă</CardTitle>
                <CardDescription>Pacienți care necesită atenție imediată</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/navigator/patients">Vezi Toți</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: "1",
                name: "Maria Popescu",
                condition: "Valori anormale analize",
                priority: "Critic",
                lastContact: "acum 2 ore",
                phone: "+40 721 123 456",
              },
              {
                id: "2",
                name: "Ion Georgescu",
                condition: "Simptome severe",
                priority: "Înalt",
                lastContact: "acum 4 ore",
                phone: "+40 721 234 567",
              },
              {
                id: "3",
                name: "Ana Dumitrescu",
                condition: "Lipsă la programare",
                priority: "Mediu",
                lastContact: "ieri",
                phone: "+40 721 345 678",
              },
            ].map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{patient.name}</p>
                    <Badge
                      variant={
                        patient.priority === "Critic"
                          ? "destructive"
                          : patient.priority === "Înalt"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {patient.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {patient.lastContact}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {patient.phone}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/navigator/patients/${patient.id}`}>
                      <FileText className="h-4 w-4 mr-1" />
                      Detalii
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Sună
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Mesaj
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Programul de Astăzi</CardTitle>
            <CardDescription>Programări și activități planificate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { time: "09:00", patient: "Maria Popescu", type: "Consultație", status: "completed" },
              { time: "10:30", patient: "Ion Georgescu", type: "Follow-up", status: "upcoming" },
              { time: "11:15", patient: "Ana Dumitrescu", type: "Evaluare", status: "upcoming" },
              { time: "14:00", patient: "Gheorghe Ionescu", type: "Consultație", status: "upcoming" },
              { time: "15:30", patient: "Elena Vasilescu", type: "Follow-up", status: "upcoming" },
            ].map((appointment, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div
                  className={`w-3 h-3 rounded-full ${
                    appointment.status === "completed" ? "bg-green-500" : "bg-blue-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{appointment.time}</p>
                    <Badge variant="outline" className="text-xs">
                      {appointment.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{appointment.patient}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link href="/navigator/appointments">
                <Calendar className="h-4 w-4 mr-2" />
                Vezi Toate Programările
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activitate Recentă</CardTitle>
          <CardDescription>Ultimele acțiuni și evenimente din sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                action: "Document nou adăugat",
                patient: "Maria Popescu",
                time: "acum 30 min",
                type: "document",
              },
              {
                action: "Programare confirmată",
                patient: "Ion Georgescu",
                time: "acum 1 oră",
                type: "appointment",
              },
              {
                action: "Simptome înregistrate",
                patient: "Ana Dumitrescu",
                time: "acum 2 ore",
                type: "symptoms",
              },
              {
                action: "Mesaj trimis",
                patient: "Gheorghe Ionescu",
                time: "acum 3 ore",
                type: "message",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "document"
                      ? "bg-blue-500"
                      : activity.type === "appointment"
                        ? "bg-green-500"
                        : activity.type === "symptoms"
                          ? "bg-orange-500"
                          : "bg-purple-500"
                  }`}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.action}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {activity.patient} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
