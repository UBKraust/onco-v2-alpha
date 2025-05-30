import { CalendarView } from "@/components/ui/calendar-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Filter, Download } from "lucide-react"
import { usePatientData } from "@/hooks/usePatientData"

export default function CalendarPage() {
  const { appointments } = usePatientData()

  const handleAppointmentClick = (appointment: any) => {
    console.log("Appointment clicked:", appointment)
  }

  const handleDateSelect = (date: Date) => {
    console.log("Date selected:", date)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendar Medical</h1>
          <p className="text-muted-foreground">Vizualizează și gestionează toate programările tale</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrează
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportă
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Programare Nouă
          </Button>
        </div>
      </div>

      {/* Calendar Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programări Luna Aceasta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 față de luna trecută</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">9</div>
            <p className="text-xs text-muted-foreground">75% din total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">În Așteptare</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <p className="text-xs text-muted-foreground">Necesită confirmare</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Următoarea</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mâine</div>
            <p className="text-xs text-muted-foreground">Control oncologic</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar Programări</CardTitle>
          <CardDescription>
            Vizualizează toate programările tale medicale într-o vedere de calendar interactivă
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CalendarView
            appointments={appointments}
            onAppointmentClick={handleAppointmentClick}
            onDateSelect={handleDateSelect}
          />
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Legendă</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-sm">Consultații</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-sm">Tratamente</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-sm">Teste</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span className="text-sm">Follow-up</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
