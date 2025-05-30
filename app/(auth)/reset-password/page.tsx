import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ResetPasswordPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Resetare Parolă</CardTitle>
        <CardDescription>Introdu adresa de email pentru a primi instrucțiuni de resetare</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nume@exemplu.com" />
        </div>
        <Button className="w-full">Trimite instrucțiuni</Button>
        <div className="text-center text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">
            Înapoi la conectare
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
