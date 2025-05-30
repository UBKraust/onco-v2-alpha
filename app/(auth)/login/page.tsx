import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Conectare</CardTitle>
        <CardDescription>Introdu datele tale pentru a accesa platforma</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nume@exemplu.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Parolă</Label>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full">Conectare</Button>
        <div className="text-center text-sm">
          <Link href="/register" className="text-blue-600 hover:underline">
            Nu ai cont? Înregistrează-te
          </Link>
        </div>
        <div className="text-center text-sm">
          <Link href="/reset-password" className="text-blue-600 hover:underline">
            Ai uitat parola?
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
