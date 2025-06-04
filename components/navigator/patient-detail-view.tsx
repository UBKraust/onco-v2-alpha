"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
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
  patient: Patient
}

export function PatientDetailView({ patient }: PatientDetailViewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Add error handling for missing patient data
  if (!patient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Detalii Pacient</CardTitle>
          <CardDescription>Nu s-au putut încărca datele pacientului.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Vă rugăm să încercați din nou sau contactați suportul tehnic.</p>
        </CardContent>
      </Card>
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
              <AvatarImage src={patient.avatarUrl || "/placeholder.svg"} alt={`Fotografie profil ${patient.name}`} />
              <AvatarFallback aria-label={`Inițiale ${patient.name}`}>{patient.name.substring(0, 2)}</AvatarFallback>
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
              <Label htmlFor="patient-address">Adresă</Label>
              <Input
                id="patient-address"
                type="text"
                value={patient.address}
                readOnly
                aria-label="Adresa pacientului"
              />
            </div>
            <div>
              <Label htmlFor="patient-phone">Telefon</Label>
              <Input
                id="patient-phone"
                type="tel"
                value={patient.phone}
                readOnly
                aria-label="Numărul de telefon al pacientului"
              />
            </div>
            <div>
              <Label htmlFor="patient-email">Email</Label>
              <Input
                id="patient-email"
                type="email"
                value={patient.email}
                readOnly
                aria-label="Adresa de email a pacientului"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="general" className="w-full space-y-4">
        <TabsList aria-label="Secțiuni informații pacient">
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
          {patient && patient.id ? (
            <EnhancedSymptomsTracker patientId={patient.id} />
          ) : (
            <p>Nu se pot încărca simptomele. ID pacient lipsă.</p>
          )}
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
