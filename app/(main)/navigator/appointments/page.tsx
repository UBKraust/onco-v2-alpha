import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, TrendingUp, AlertTriangle } from "lucide-react"
import { AdvancedAppointmentScheduler } from "@/components/appointments/advanced-appointment-scheduler"
import { AppointmentManagement } from "@/components/appointments/appointment-management"

export default function NavigatorAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendar Programări</h1>
          <p className="text-muted-foreground">Gestionează programările pentru toți pacienții</p>
        </div>
        <AdvancedAppointmentScheduler />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programări Astăzi</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2 față de ieri
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Săptămâna Aceasta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8 față de săptămâna trecută</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacienți Unici</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">din 35 pacienți activi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Necesită Atenție</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">3</div>
            <p className="text-xs text-muted-foreground">Programări urgente</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Acțiuni Rapide</CardTitle>
            <CardDescription>Operațiuni frecvente pentru programări</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Vezi calendarul săptămânii
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              Programări de urgență
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Lista de așteptare
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Conflicte de program
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Programări Astăzi</CardTitle>
            <CardDescription>Agenda pentru ziua curentă</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                time: "09:00",
                patient: "Maria Popescu",
                doctor: "Dr. Marinescu",
                type: "Chimioterapie",
                status: "confirmed",
                priority: "normal",
              },
              {
                time: "10:30",
                patient: "Ion Georgescu",
                doctor: "Dr. Georgescu",
                type: "Consultație",
                status: "scheduled",
                priority: "high",
              },
              {
                time: "11:45",
                patient: "Ana Dumitrescu",
                doctor: "Dr. Popescu",
                type: "Control",
                status: "confirmed",
                priority: "normal",
              },
              {
                time: "14:00",
                patient: "Gheorghe Ionescu",
                doctor: "Dr. Ionescu",
                type: "Radioterapie",
                status: "scheduled",
                priority: "urgent",
              },
            ].map((appointment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-center min-w-[60px]">
                    <p className="font-bold text-sm">{appointment.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.doctor} • {appointment.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={appointment.status === "confirmed" ? "default" : "outline"}
                    className={
                      appointment.priority === "urgent"
                        ? "border-red-500 text-red-700"
                        : appointment.priority === "high"
                          ? "border-amber-500 text-amber-700"
                          : ""
                    }
                  >
                    {appointment.status === "confirmed" ? "Confirmat" : "Programat"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Detalii
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Appointment Management */}
      <Card>
        <CardHeader>
          <CardTitle>Toate Programările</CardTitle>
          <CardDescription>Gestionează toate programările din sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentManagement showAllAppointments={true} />
        </CardContent>
      </Card>
    </div>
  )
}
