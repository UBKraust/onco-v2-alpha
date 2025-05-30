import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, TrendingUp, Calendar } from "lucide-react"

export default function SymptomsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Jurnal Simptome</h1>
          <p className="text-muted-foreground">Monitorizează și înregistrează simptomele tale zilnice</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adaugă Simptom
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Simptome Astăzi</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Ultimul: acum 2 ore</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendință</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Îmbunătățire</div>
            <p className="text-xs text-muted-foreground">față de săptămâna trecută</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Severitate Medie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/10</div>
            <p className="text-xs text-muted-foreground">în ultimele 7 zile</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Simptome Recente</CardTitle>
            <CardDescription>Ultimele simptome înregistrate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { symptom: "Oboseală", severity: 6, time: "acum 2 ore", trend: "stabil" },
              { symptom: "Durere de cap", severity: 4, time: "acum 4 ore", trend: "îmbunătățire" },
              { symptom: "Greață", severity: 3, time: "ieri 18:00", trend: "îmbunătățire" },
              { symptom: "Durere articulară", severity: 5, time: "ieri 14:30", trend: "agravare" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{item.symptom}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{item.severity}/10</Badge>
                  <Badge
                    variant={
                      item.trend === "îmbunătățire"
                        ? "default"
                        : item.trend === "agravare"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {item.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grafic Săptămânal</CardTitle>
            <CardDescription>Evoluția simptomelor în ultima săptămână</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-muted-foreground">Grafic simptome (placeholder)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
