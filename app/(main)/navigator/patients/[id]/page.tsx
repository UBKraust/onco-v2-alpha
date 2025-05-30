import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Phone, Mail } from "lucide-react"

export default function PatientDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>MP</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Maria Popescu</h1>
            <p className="text-muted-foreground">Pacient ID: {params.id}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="destructive">Prioritate Critică</Badge>
              <Badge>Activ în tratament</Badge>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Sună
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Mesaj
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aderență Tratament</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">85%</div>
            <p className="text-xs text-muted-foreground">Ultimele 30 zile</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Simptome Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Ultimul raport: azi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Programări</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Următoarea: mâine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ultimul Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h</div>
            <p className="text-xs text-muted-foreground">Mesaj în platformă</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Prezentare Generală</TabsTrigger>
          <TabsTrigger value="medical">Dosar Medical</TabsTrigger>
          <TabsTrigger value="symptoms">Simptome</TabsTrigger>
          <TabsTrigger value="appointments">Programări</TabsTrigger>
          <TabsTrigger value="communication">Comunicare</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informații Pacient</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Vârstă</p>
                    <p className="text-sm text-muted-foreground">45 ani</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sex</p>
                    <p className="text-sm text-muted-foreground">Feminin</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Diagnostic</p>
                    <p className="text-sm text-muted-foreground">Limfom Non-Hodgkin</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Stadiu</p>
                    <p className="text-sm text-muted-foreground">III</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Data Diagnostic</p>
                    <p className="text-sm text-muted-foreground">15 Sept 2024</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Medic Curant</p>
                    <p className="text-sm text-muted-foreground">Dr. Emily Carter</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan de Tratament Curent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Protocol CHOP</h4>
                    <p className="text-sm text-muted-foreground">Ciclul 2 din 6</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Progres:</span>
                      <span className="text-sm font-medium">33%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Următoarea ședință: 28 Octombrie 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Dosar Medical</CardTitle>
              <CardDescription>Documentele medicale ale pacientului</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conținutul dosarului medical va fi afișat aici...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symptoms">
          <Card>
            <CardHeader>
              <CardTitle>Monitorizare Simptome</CardTitle>
              <CardDescription>Istoricul simptomelor raportate de pacient</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Graficele și datele despre simptome vor fi afișate aici...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Programări</CardTitle>
              <CardDescription>Istoricul și programările viitoare</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Lista programărilor va fi afișată aici...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication">
          <Card>
            <CardHeader>
              <CardTitle>Istoric Comunicare</CardTitle>
              <CardDescription>Toate interacțiunile cu pacientul</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Istoricul mesajelor și apelurilor va fi afișat aici...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
