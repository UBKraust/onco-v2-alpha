import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, MessageSquare, AlertTriangle, Phone, FileText } from "lucide-react"

export default function CaregiverDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Aparținător</h1>
        <p className="text-muted-foreground">Monitorizează și oferă suport persoanei dragi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Starea Pacientului</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Stabilă</div>
            <p className="text-xs text-muted-foreground">Ultima actualizare: acum 2 ore</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programări</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Următoarea: Mâine la 10:00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mesaje</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 necitite</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerte</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-xs text-muted-foreground">Medicație întârziată</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activitate Recentă</CardTitle>
            <CardDescription>Ultimele actualizări despre pacient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-sm">Medicația administrată</p>
                <p className="text-xs text-muted-foreground">Acum 2 ore • Chimioterapie orală</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-sm">Simptome înregistrate</p>
                <p className="text-xs text-muted-foreground">Acum 4 ore • Oboseală ușoară</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-sm">Consultație completată</p>
                <p className="text-xs text-muted-foreground">Ieri • Dr. Emily Carter</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acțiuni Rapide</CardTitle>
            <CardDescription>Funcții importante pentru aparținători</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <Phone className="mr-2 h-4 w-4" />
              Contactează Echipa Medicală
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Trimite Mesaj Navigator
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Vezi Programări
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Raport Zilnic
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informații Pacient</CardTitle>
          <CardDescription>Maria Popescu - Informații generale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Tratament Curent</h4>
              <p className="text-sm text-muted-foreground">Protocol CHOP - Ciclul 2/6</p>
              <Badge className="mt-2">Activ</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Medic Curant</h4>
              <p className="text-sm text-muted-foreground">Dr. Emily Carter</p>
              <p className="text-xs text-muted-foreground">Oncologie</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Navigator</h4>
              <p className="text-sm text-muted-foreground">Ana Ionescu</p>
              <p className="text-xs text-muted-foreground">Navigator Medical</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Urgențe</h4>
              <p className="text-sm text-muted-foreground">+40 21 123 4568</p>
              <p className="text-xs text-muted-foreground">24/7 Disponibil</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
