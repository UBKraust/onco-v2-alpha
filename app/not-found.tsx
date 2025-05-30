import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-xl text-slate-600 mb-6">Pagina nu a fost găsită</h2>
        <Button asChild>
          <Link href="/dashboard">Înapoi la Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
