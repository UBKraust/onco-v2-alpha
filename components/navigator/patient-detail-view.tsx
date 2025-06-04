"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { EnhancedSymptomsTracker } from "@/components/navigator/enhanced-symptoms-tracker"

interface Patient {
  id: string
  name: string
  avatarUrl?: string
  age: number
  gender: string
  address: string
  phone: string
  email: string
}

interface PatientDetailViewProps {
  patientId: string
  onBack?: () => void
}

export function PatientDetailView({ patientId, onBack }: PatientDetailViewProps) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    // Simulate fetching patient data
    const fetchPatient = async () => {
      setLoading(true)
      try {
        // In a real app, you would fetch from an API
        // For now, we'll simulate with mock data
        const mockPatient: Patient = {
          id: patientId,
          name: "Maria Popescu",
          age: 42,
          gender: "Feminin",
          address: "Str. Primăverii 15, București",
          phone: "0712345678",
          email: "maria.popescu@example.com",
        }

        setTimeout(() => {
          setPatient(mockPatient)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching patient:", error)
        setLoading(false)
      }
    }

    fetchPatient()
  }, [patientId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Se încarcă datele pacientului...</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="p-4 border rounded-md bg-red-50 text-red-700">
        Nu s-au putut încărca datele pacientului. Vă rugăm încercați din nou.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Detalii Pacient</CardTitle>
          <CardDescription>Informații de bază despre pacient.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={patient.avatarUrl || "/placeholder.svg"} />
              <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{patient.name}</p>
              <p className="text-sm text-muted-foreground">
                Vârstă: {patient.age}, {patient.gender}
              </p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Adresă</Label>
              <Input type="text" value={patient.address} readOnly />
            </div>
            <div>
              <Label>Telefon</Label>
              <Input type="tel" value={patient.phone} readOnly />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={patient.email} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="general" className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="symptoms">Simptome</TabsTrigger>
          <TabsTrigger value="history">Istoric Medical</TabsTrigger>
          <TabsTrigger value="appointments">Programări</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthdate">Data de naștere</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Alege o dată</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Observații</Label>
              <Textarea placeholder="Adaugă observații despre pacient..." />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="symptoms" className="space-y-6">
          <EnhancedSymptomsTracker patientId={patient.id} />
        </TabsContent>
        <TabsContent value="history" className="space-y-6">
          <div>
            <p>Istoricul medical al pacientului va fi afișat aici.</p>
          </div>
        </TabsContent>
        <TabsContent value="appointments" className="space-y-6">
          <div>
            <p>Programările pacientului vor fi afișate aici.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
