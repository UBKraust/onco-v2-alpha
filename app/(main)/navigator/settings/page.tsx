"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, Palette, Clock } from "lucide-react"

export default function NavigatorSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Setări</h1>
          <p className="text-muted-foreground">Configurează preferințele și setările contului</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Notificări</TabsTrigger>
          <TabsTrigger value="preferences">Preferințe</TabsTrigger>
          <TabsTrigger value="security">Securitate</TabsTrigger>
          <TabsTrigger value="schedule">Program</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Informații Profil</span>
              </CardTitle>
              <CardDescription>Actualizează informațiile personale și profesionale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Schimbă Fotografia</Button>
                  <p className="text-sm text-muted-foreground mt-1">JPG, PNG sau GIF. Maxim 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prenume</Label>
                  <Input id="firstName" defaultValue="Ana" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nume</Label>
                  <Input id="lastName" defaultValue="Ionescu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="ana.ionescu@oncolink.ro" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" defaultValue="+40 123 456 789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specializare</Label>
                  <Input id="specialization" defaultValue="Oncologie" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Departament</Label>
                  <Input id="department" defaultValue="Navigare Pacienți Oncologici" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografie Profesională</Label>
                <Textarea
                  id="bio"
                  placeholder="Descrie experiența și specializarea ta..."
                  defaultValue="Navigator pacienți cu 5 ani experiență în oncologie. Specializat în suportul pacienților cu cancer și îmbunătățirea aderenței la tratament."
                />
              </div>

              <Button>Salvează Modificările</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Setări Notificări</span>
              </CardTitle>
              <CardDescription>Configurează cum și când primești notificări</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alerte Critice</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificări pentru situații care necesită atenție imediată
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mesaje Noi</Label>
                    <p className="text-sm text-muted-foreground">Notificări pentru mesajele noi de la pacienți</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Programări</Label>
                    <p className="text-sm text-muted-foreground">Reminder-uri pentru programările viitoare</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Rapoarte Săptămânale</Label>
                    <p className="text-sm text-muted-foreground">Rezumat săptămânal al activității</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificări Email</Label>
                    <p className="text-sm text-muted-foreground">Primește notificări și pe email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Ore Liniște</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quietStart">De la</Label>
                    <Input id="quietStart" type="time" defaultValue="22:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quietEnd">Până la</Label>
                    <Input id="quietEnd" type="time" defaultValue="08:00" />
                  </div>
                </div>
              </div>

              <Button>Salvează Setările</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Preferințe Interfață</span>
              </CardTitle>
              <CardDescription>Personalizează aspectul și comportamentul aplicației</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Temă</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Luminos</SelectItem>
                      <SelectItem value="dark">Întunecat</SelectItem>
                      <SelectItem value="system">Sistem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Limbă</Label>
                  <Select defaultValue="ro">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ro">Română</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Fus Orar</Label>
                  <Select defaultValue="europe/bucharest">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe/bucharest">Europa/București</SelectItem>
                      <SelectItem value="europe/london">Europa/Londra</SelectItem>
                      <SelectItem value="america/new_york">America/New York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animații</Label>
                    <p className="text-sm text-muted-foreground">Activează animațiile în interfață</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sunetele</Label>
                    <p className="text-sm text-muted-foreground">Redă sunete pentru notificări</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button>Salvează Preferințele</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Securitate</span>
              </CardTitle>
              <CardDescription>Gestionează securitatea contului și accesul</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Parola Curentă</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Parola Nouă</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmă Parola</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autentificare cu Doi Factori</Label>
                    <p className="text-sm text-muted-foreground">Adaugă un nivel suplimentar de securitate</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sesiuni Active</Label>
                    <p className="text-sm text-muted-foreground">Gestionează dispozitivele conectate</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Vizualizează
                  </Button>
                </div>
              </div>

              <Button>Actualizează Parola</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Program de Lucru</span>
              </CardTitle>
              <CardDescription>Configurează programul de lucru și disponibilitatea</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"].map((day, index) => (
                  <div key={day} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Switch defaultChecked={index < 5} />
                      <Label className="w-20">{day}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="time" defaultValue="08:00" className="w-24" disabled={index >= 5} />
                      <span>-</span>
                      <Input type="time" defaultValue="16:00" className="w-24" disabled={index >= 5} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Capacitate Maximă Pacienți</Label>
                <Input type="number" defaultValue="30" />
                <p className="text-sm text-muted-foreground">
                  Numărul maxim de pacienți pe care îi poți gestiona simultan
                </p>
              </div>

              <Button>Salvează Programul</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
