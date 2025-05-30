"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Shield, Calendar, FileText, MessageCircle, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-600 text-white">
              <Heart className="h-4 w-4" />
            </div>
            <span className="font-bold text-xl text-gray-900">OncoLink.ro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              Cum te putem ajuta?
            </Link>
            <Link href="/conditions" className="text-gray-600 hover:text-gray-900">
              Afecțiuni
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              Despre noi
            </Link>
            <Link href="/articles" className="text-gray-600 hover:text-gray-900">
              Articole
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-6">
              <Link href="/patient/onboarding">PROGRAMARE</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">Sprijin complet pentru pacienții oncologici</h1>
              <p className="text-xl mb-8 text-pink-100">
                Bine ați venit pe OncoLink.ro, platforma dedicată pacienților oncologici, familiilor acestora și tuturor
                celor implicați în lupta împotriva cancerului. Misiunea noastră este de a oferi sprijin complet,
                informații clare și acces la resurse medicale de top pentru a face călătoria fiecărui pacient mai ușoară
                și mai sigură.
              </p>
              <Button size="lg" className="bg-pink-700 hover:bg-pink-800 text-white">
                AFLĂ MAI MULTE
              </Button>
            </div>
            <div className="hidden lg:block">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Sprijin medical oncologic"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Access Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Acces la Platformă</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accesează dashboard-ul personalizat în funcție de rolul tău în procesul de îngrijire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-lg">Dashboard Pacient</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4">
                  Monitorizare simptome, programări, comunicare cu echipa medicală
                </CardDescription>
                <Button asChild className="w-full bg-pink-600 hover:bg-pink-700">
                  <Link href="/patient">Acces Pacient</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Dashboard Navigator</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4">
                  Gestionare pacienți, alerte, triaj și coordonare îngrijire
                </CardDescription>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/navigator-dashboard">Acces Navigator</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <ShieldCheck className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Dashboard Administrator</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4">
                  Administrare platformă, utilizatori, rapoarte și configurări
                </CardDescription>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href="/admin">Acces Administrator</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-sm font-semibold text-pink-600 mb-2">DESPRE NOI</h3>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Acces facil la resurse medicale și sprijin personalizat
              </h2>
              <p className="text-gray-600 mb-6">
                OncoLink.ro este conceput pentru a facilita accesul rapid și facil la toate informațiile necesare,
                ghidându-vă la fiecare pas al drumului, de la diagnosticare până la recuperare. Fie că aveți nevoie de
                informații despre tipul de cancer, opțiuni de tratament sau resurse de sprijin, platforma noastră vă
                oferă tot ce aveți nevoie.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-pink-600" />
                  <span className="text-gray-700">Programări online</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-pink-600" />
                  <span className="text-gray-700">Dosare medicale digitale</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-pink-600" />
                  <span className="text-gray-700">Comunicare directă</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-pink-600" />
                  <span className="text-gray-700">Suport personalizat</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Profesionist medical"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-600">
                  <Heart className="h-4 w-4" />
                </div>
                <span className="font-bold text-xl">OncoLink.ro</span>
              </div>
              <p className="text-gray-400">Platformă medicală dedicată îngrijirii pacienților oncologici.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platformă</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    Despre noi
                  </Link>
                </li>
                <li>
                  <Link href="/conditions" className="hover:text-white">
                    Afecțiuni
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="hover:text-white">
                    Articole
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suport</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Ajutor
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>contact@oncolink.ro</li>
                <li>+40 21 123 4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OncoLink.ro Medical Platform. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
