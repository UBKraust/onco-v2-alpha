import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Shield, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Despre OncaLink Medical Platform</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O platformă inovatoare dedicată îmbunătățirii îngrijirii pacienților oncologici prin tehnologie avansată și
            suport personalizat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle>Îngrijire Centrată pe Pacient</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Punem pacientul în centrul atenției cu soluții personalizate pentru fiecare nevoie.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle>Echipă Dedicată</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Navigatori medicali specializați oferă suport continuu și ghidare expertă.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardTitle>Securitate Maximă</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Datele medicale sunt protejate cu cele mai înalte standarde de securitate.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <CardTitle>Excelență Medicală</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Colaborăm cu cei mai buni specialiști pentru a oferi îngrijire de calitate superioară.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Misiunea Noastră</h2>
            <p className="text-gray-600 mb-4">
              OncaLink Medical Platform a fost creată cu scopul de a transforma experiența pacienților oncologici prin
              tehnologie inovatoare și suport uman dedicat.
            </p>
            <p className="text-gray-600 mb-4">
              Credem că fiecare pacient merită acces la îngrijire medicală de calitate, informații clare și suport
              emoțional pe parcursul întregii călătorii de tratament.
            </p>
            <p className="text-gray-600">
              Platforma noastră conectează pacienții cu navigatori medicali specializați, oferind instrumente digitale
              avansate pentru monitorizarea sănătății și comunicarea eficientă cu echipa medicală.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Viziunea Noastră</h2>
            <p className="text-gray-600 mb-4">
              Aspirăm să devenim platforma de referință pentru îngrijirea pacienților oncologici, îmbunătățind
              rezultatele tratamentului prin tehnologie și empatie.
            </p>
            <p className="text-gray-600 mb-4">
              Viziunea noastră este un viitor în care fiecare pacient oncologic beneficiază de suport personalizat,
              acces facil la informații medicale și comunicare seamless cu echipa de îngrijire.
            </p>
            <p className="text-gray-600">
              Prin inovație continuă și focusul pe nevoile pacienților, contribuim la îmbunătățirea calității vieții și
              a rezultatelor medicale în oncologie.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Începe Călătoria Ta</h2>
          <p className="text-xl text-gray-600 mb-8">
            Alătură-te comunității noastre și descoperă cum putem să te ajutăm.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/register">Înregistrează-te</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contactează-ne</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
