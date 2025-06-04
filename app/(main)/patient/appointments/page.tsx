import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Plus } from "lucide-react"

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Programări</h1>
          <p className="text-muted-foreground">Gestionează programările tale medicale</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Programare Nouă
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Programări Viitoare</CardTitle>
              <CardDescription>Următoarele tale programări medicale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Control Oncologic",
                  doctor: "Dr. Emily Carter",
                  date: "Mâine",
                  time: "10:00",
                  location: "Clinica de Oncologie, Et.2, Cam.302",
                  status: "Confirmat",
                  type: "control",
                },
                {
                  title: "Ședința de Chimioterapie #3",
                  doctor: "Centrul de Cancer",
                  date: "28 Oct",
                  time: "14:00",
                  location: "Secția Oncologie",
                  status: "Confirmat",
                  type: "tratament",
                },
                {
                  title: "Consultație Nutriționist",
                  doctor: "Sarah Miller, RD",
                  date: "2 Nov",
                  time: "11:30",
                  location: "Întâlnire virtuală",
                  status: "În așteptare",
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
                        <Badge variant={appointment.status === "Confirmat" ? "default" : "secondary"}>
                          {appointment.status}
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

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-muted-foreground">Calendar widget (placeholder)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistici</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Programări luna aceasta:</span>
                <span className="font-bold">8</span>
              </div>
              <div className="flex justify-between">
                <span>Programări confirmate:</span>
                <span className="font-bold text-green-600">6</span>
              </div>
              <div className="flex justify-between">
                <span>În așteptare:</span>
                <span className="font-bold text-yellow-600">2</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
