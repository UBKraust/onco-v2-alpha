import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Înregistrare</CardTitle>
        <CardDescription>Creează un cont nou pentru a accesa platforma</CardDescription>
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
          <Label htmlFor="role">Rol</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selectează rolul" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patient">Pacient</SelectItem>
              <SelectItem value="navigator">Navigator</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Parolă</Label>
          <Input id="password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmă parola</Label>
          <Input id="confirmPassword" type="password" />
        </div>
        <Button className="w-full">Înregistrare</Button>
        <div className="text-center text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">
            Ai deja cont? Conectează-te
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
