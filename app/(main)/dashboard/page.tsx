import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  FileText,
  Activity,
  Bell,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Shield,
  Heart,
  GraduationCap,
  Palette,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Principal</h1>
          <p className="text-muted-foreground">Bine ai revenit! Aici găsești un rezumat al activității medicale.</p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-pink-500">MP</AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="font-medium">Maria Popescu</p>
            <p className="text-sm text-muted-foreground">Utilizator Activ</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programări</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Următoarea: Mâine la 10:00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documente</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Ultimul adăugat ieri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activitate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Înregistrări astăzi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notificări</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Noi mesaje</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activitate Recentă</CardTitle>
            <CardDescription>Ultimele acțiuni și evenimente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Control Medical</p>
                <p className="text-sm text-muted-foreground">Dr. Emily Carter</p>
              </div>
              <Badge>Mâine 10:00</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Rezultate Analize</p>
                <p className="text-sm text-muted-foreground">Laborator Central</p>
              </div>
              <Badge variant="outline">Disponibile</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Consultație Nutriționist</p>
                <p className="text-sm text-muted-foreground">Sarah Miller, RD</p>
              </div>
              <Badge variant="secondary">2 Nov 11:30</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sarcini Zilnice</CardTitle>
            <CardDescription>Activitățile programate pentru astăzi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm line-through">Medicația de dimineață</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded border-2 border-gray-300"></div>
              <span className="text-sm">Înregistrează simptomele</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded border-2 border-gray-300"></div>
              <span className="text-sm">Activitate fizică (30 min)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded border-2 border-gray-300"></div>
              <span className="text-sm">Pregătește întrebări pentru medic</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acțiuni Rapide</CardTitle>
          <CardDescription>Accesează rapid funcțiile principale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild className="h-20 flex-col">
              <Link href="/patient/symptoms">
                <Activity className="h-6 w-6 mb-2" />
                Monitorizare Simptome
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/patient/appointments">
                <Calendar className="h-6 w-6 mb-2" />
                Programări
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/patient/medical-file">
                <FileText className="h-6 w-6 mb-2" />
                Dosar Medical
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/patient/resources">
                <FileText className="h-6 w-6 mb-2" />
                Resurse
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/patient" className="group">
          <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-pink-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Dashboard Pacient</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Acces la dosarul medical, monitorizare simptome, programări și comunicare cu echipa medicală
                  </p>
                </div>
                <div className="flex items-center text-pink-600 text-sm font-medium">
                  Accesează Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/navigator" className="group">
          <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-blue-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Dashboard Navigator</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Gestionare pacienți, coordonare îngrijire, alerte și comunicare cu echipa medicală
                  </p>
                </div>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  Accesează Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin" className="group">
          <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-purple-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Dashboard Administrator</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Administrare sistem, gestionare utilizatori, configurări și rapoarte globale
                  </p>
                </div>
                <div className="flex items-center text-purple-600 text-sm font-medium">
                  Accesează Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/caregiver" className="group">
          <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-green-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Dashboard Îngrijitor</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Suport pentru îngrijitorii de familie, resurse și comunicare cu echipa medicală
                  </p>
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  Accesează Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/training" className="group">
          <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-orange-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <GraduationCap className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Platformă Training</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Cursuri de formare, certificări și dezvoltare profesională pentru echipa medicală
                  </p>
                </div>
                <div className="flex items-center text-orange-600 text-sm font-medium">
                  Accesează Training
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/design-system" className="group">
          <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-gray-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Palette className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Design System</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Componente UI, ghiduri de stil și documentație pentru dezvoltatori
                  </p>
                </div>
                <div className="flex items-center text-gray-600 text-sm font-medium">
                  Vezi Design System
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
