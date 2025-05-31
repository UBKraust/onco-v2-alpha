import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, TrendingUp, AlertCircle } from "lucide-react"
import { AdvancedAppointmentScheduler } from "@/components/appointments/advanced-appointment-scheduler"
import { AppointmentManagement } from "@/components/appointments/appointment-management"

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Programări</h1>
          <p className="text-muted-foreground">Gestionează programările tale medicale</p>
        </div>
        <AdvancedAppointmentScheduler patientId="patient-1" />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Următoarea Programare</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mâine</div>
            <p className="text-xs text-muted-foreground">Control oncologic la 10:00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Luna Aceasta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2 față de luna trecută
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmate</CardTitle>
            <AlertCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">6</div>
            <p className="text-xs text-muted-foreground">din 8 programări</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">În Așteptare</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">2</div>
            <p className="text-xs text-muted-foreground">Necesită confirmare</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Acțiuni Rapide</CardTitle>
            <CardDescription>Operațiuni frecvente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Vezi calendarul complet
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              Programări urgente
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Locații și indicații
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Programări Viitoare</CardTitle>
            <CardDescription>Următoarele tale consultații</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Control Oncologic",
                doctor: "Dr. Emily Carter",
                date: "Mâine",
                time: "10:00",
                location: "Clinica de Oncologie, Et.2, Cam.302",
                status: "confirmed",
                type: "control",
              },
              {
                title: "Ședința de Chimioterapie #3",
                doctor: "Dr. Andreea Marinescu",
                date: "28 Oct",
                time: "14:00",
                location: "Secția Oncologie, Sala 3",
                status: "confirmed",
                type: "tratament",
              },
              {
                title: "Consultație Nutriționist",
                doctor: "Sarah Miller, RD",
                date: "2 Nov",
                time: "11:30",
                location: "Întâlnire virtuală",
                status: "pending",
                type: "consultatie",
              },
            ].map((appointment, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{appointment.title}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {appointment.time}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {appointment.location}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                        {appointment.status === "confirmed" ? "Confirmat" : "În așteptare"}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          Detalii
                        </Button>
                        <Button variant="outline" size="sm">
                          Reprogramează
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Patient Appointment Management */}
      <Card>
        <CardHeader>
          <CardTitle>Istoricul Programărilor</CardTitle>
          <CardDescription>Toate programările tale medicale</CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentManagement patientId="patient-1" />
        </CardContent>
      </Card>
    </div>
  )
}
