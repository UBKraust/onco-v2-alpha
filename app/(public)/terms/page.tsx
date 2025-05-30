import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Termeni și Condiții</h1>
          <p className="text-gray-600">Ultima actualizare: 1 Noiembrie 2024</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptarea Termenilor</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Prin accesarea și utilizarea platformei OncaLink Medical Platform, acceptați să fiți legați de acești
                termeni și condiții. Dacă nu sunteți de acord cu oricare dintre acești termeni, vă rugăm să nu utilizați
                serviciile noastre.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Descrierea Serviciilor</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                OncaLink Medical Platform oferă servicii de navigare medicală pentru pacienții oncologici, incluzând:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>Monitorizarea simptomelor și stării de sănătate</li>
                <li>Gestionarea programărilor medicale</li>
                <li>Comunicarea cu echipa medicală</li>
                <li>Accesul la resurse educaționale</li>
                <li>Suport din partea navigatorilor medicali</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Eligibilitatea Utilizatorilor</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>Pentru a utiliza serviciile noastre, trebuie să îndepliniți următoarele condiții:</p>
              <ul className="list-disc pl-6 mt-4">
                <li>Să aveți vârsta de cel puțin 18 ani</li>
                <li>Să fiți pacient oncologic sau navigator medical autorizat</li>
                <li>Să furnizați informații exacte și complete la înregistrare</li>
                <li>Să respectați toate legile și reglementările aplicabile</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Confidențialitatea și Protecția Datelor</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Protecția datelor dumneavoastră personale și medicale este o prioritate pentru noi. Respectăm toate
                reglementările GDPR și utilizăm măsuri de securitate avansate pentru a proteja informațiile sensibile.
              </p>
              <p className="mt-4">
                Pentru detalii complete despre cum colectăm, utilizăm și protejăm datele dumneavoastră, consultați
                Politica noastră de Confidențialitate.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Responsabilitățile Utilizatorilor</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>Ca utilizator al platformei, vă angajați să:</p>
              <ul className="list-disc pl-6 mt-4">
                <li>Furnizați informații exacte și actualizate</li>
                <li>Mențineți confidențialitatea datelor de autentificare</li>
                <li>Utilizați platforma doar în scopuri medicale legitime</li>
                <li>Respectați drepturile și confidențialitatea altor utilizatori</li>
                <li>Nu distribuiți informații medicale fără autorizare</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Limitări de Responsabilitate</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Platforma OncaLink Medical Platform oferă suport și instrumente pentru gestionarea îngrijirii medicale,
                dar nu înlocuiește consultația medicală profesională. În caz de urgență medicală, contactați imediat
                serviciile de urgență locale.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Modificări ale Termenilor</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment. Modificările vor fi
                comunicate utilizatorilor prin platformă și vor intra în vigoare la data specificată în notificare.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Contact</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>Pentru întrebări despre acești termeni și condiții, ne puteți contacta la:</p>
              <ul className="list-none mt-4">
                <li>Email: legal@oncalink.ro</li>
                <li>Telefon: +40 21 123 4567</li>
                <li>Adresă: Str. Medicală Nr. 123, București, România</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
