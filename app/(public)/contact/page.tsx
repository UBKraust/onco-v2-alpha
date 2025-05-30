import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactează-ne</h1>
          <p className="text-xl text-gray-600">
            Suntem aici să te ajutăm. Contactează-ne pentru orice întrebare sau suport.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Trimite-ne un Mesaj</CardTitle>
                <CardDescription>
                  Completează formularul de mai jos și îți vom răspunde în cel mai scurt timp.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prenume</Label>
                    <Input id="firstName" placeholder="Ion" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nume</Label>
                    <Input id="lastName" placeholder="Popescu" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="nume@exemplu.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" type="tel" placeholder="+40 123 456 789" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subiect</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează subiectul" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Suport Tehnic</SelectItem>
                      <SelectItem value="medical">Întrebări Medicale</SelectItem>
                      <SelectItem value="billing">Facturare</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Altele</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mesaj</Label>
                  <Textarea id="message" placeholder="Descrie-ne cum te putem ajuta..." rows={5} />
                </div>

                <Button className="w-full">Trimite Mesajul</Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Informații de Contact</CardTitle>
                <CardDescription>Modalități alternative de a ne contacta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">contact@oncalink.ro</p>
                    <p className="text-gray-600">suport@oncalink.ro</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Telefon</h3>
                    <p className="text-gray-600">+40 21 123 4567</p>
                    <p className="text-gray-600">Linia de urgență: +40 21 123 4568</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Adresă</h3>
                    <p className="text-gray-600">
                      Strada Medicală Nr. 123
                      <br />
                      Sector 1, București
                      <br />
                      România, 010101
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Program</h3>
                    <p className="text-gray-600">
                      Luni - Vineri: 08:00 - 20:00
                      <br />
                      Sâmbătă: 09:00 - 17:00
                      <br />
                      Duminică: 10:00 - 16:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suport de Urgență</CardTitle>
                <CardDescription>Pentru situații medicale urgente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Urgență Medicală</h3>
                  <p className="text-red-700 text-sm mb-3">
                    În caz de urgență medicală, contactați imediat serviciile de urgență locale sau mergeți la cea mai
                    apropiată unitate de primiri urgențe.
                  </p>
                  <div className="space-y-2">
                    <p className="text-red-800 font-semibold">Numărul de urgență: 112</p>
                    <p className="text-red-800 font-semibold">Linia directă OncaLink: +40 21 123 4568</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Întrebări Frecvente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Înainte de a ne contacta, verifică secțiunea noastră de întrebări frecvente pentru răspunsuri rapide
                  la cele mai comune întrebări.
                </p>
                <Button variant="outline" className="w-full">
                  Vezi Întrebările Frecvente
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
