import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, Download } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rapoarte și Statistici</h1>
          <p className="text-muted-foreground">Analizează performanța și aderența pacienților</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Raport
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aderență Medie</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">+5% față de luna trecută</p>
          </CardContent>
        </Card>

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
            <CardTitle className="text-sm font-medium">Programări Luna</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12% față de luna trecută</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfacție</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">Bazat pe 45 evaluări</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aderența pe Pacienți</CardTitle>
            <CardDescription>Top pacienți după scorul de aderență</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Gheorghe Ionescu", adherence: 98, trend: "up" },
              { name: "Ion Georgescu", adherence: 95, trend: "up" },
              { name: "Ana Dumitrescu", adherence: 89, trend: "stable" },
              { name: "Maria Popescu", adherence: 85, trend: "down" },
            ].map((patient, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">Pacient #{index + 1}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      patient.adherence >= 90 ? "default" : patient.adherence >= 80 ? "secondary" : "destructive"
                    }
                  >
                    {patient.adherence}%
                  </Badge>
                  <TrendingUp
                    className={`h-4 w-4 ${
                      patient.trend === "up"
                        ? "text-green-500"
                        : patient.trend === "down"
                          ? "text-red-500"
                          : "text-gray-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendințe Lunare</CardTitle>
            <CardDescription>Evoluția indicatorilor cheie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-muted-foreground">Grafic tendințe (placeholder)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
