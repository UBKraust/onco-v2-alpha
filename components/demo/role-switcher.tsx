"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDemoRole, type DemoRole } from "@/hooks/use-demo-role"
import { useRouter } from "next/navigation"
import { User, UserCheck, Shield, Settings, Eye, Shuffle, Info } from "lucide-react"

const roleConfig = {
  patient: {
    label: "Pacient",
    description: "Vizualizează dashboard-ul pacientului cu monitorizare simptome",
    icon: User,
    color: "bg-pink-600",
    route: "/patient",
    features: ["Monitorizare simptome", "Programări", "Dosar medical", "Resurse educaționale"],
  },
  navigator: {
    label: "Navigator Medical",
    description: "Gestionează pacienții și coordonează îngrijirea",
    icon: UserCheck,
    color: "bg-blue-600",
    route: "/navigator",
    features: ["Gestionare pacienți", "Sistem alerte", "Rapoarte", "Comunicare echipă"],
  },
  admin: {
    label: "Administrator",
    description: "Administrează platforma și utilizatorii",
    icon: Shield,
    color: "bg-purple-600",
    route: "/admin",
    features: ["Gestionare utilizatori", "Configurări sistem", "Securitate", "Analytics"],
  },
}

export function RoleSwitcher() {
  const { demoMode, currentDemoRole, setDemoMode, setDemoRole } = useDemoRole()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleRoleChange = (newRole: DemoRole) => {
    setDemoRole(newRole)
    router.push(roleConfig[newRole].route)
    setIsOpen(false)
  }

  const handleDemoToggle = (enabled: boolean) => {
    setDemoMode(enabled)
    if (enabled) {
      router.push(roleConfig[currentDemoRole].route)
    } else {
      router.push("/")
    }
  }

  if (!demoMode) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="fixed top-4 right-4 z-50">
            <Eye className="mr-2 h-4 w-4" />
            Mod Demo
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shuffle className="h-5 w-5" />
              Activează Modul Demo
            </DialogTitle>
            <DialogDescription>
              Explorează platforma OncoLink din perspectiva diferitelor tipuri de utilizatori
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch id="demo-mode" checked={demoMode} onCheckedChange={handleDemoToggle} />
              <Label htmlFor="demo-mode">Activează modul demo</Label>
            </div>

            <div className="grid gap-4">
              <h4 className="font-medium">Roluri disponibile:</h4>
              {Object.entries(roleConfig).map(([key, config]) => {
                const IconComponent = config.icon
                return (
                  <Card key={key} className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${config.color} text-white`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{config.label}</CardTitle>
                          <CardDescription className="text-sm">{config.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1">
                        {config.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Despre modul demo:</p>
                  <p>
                    Modul demo îți permite să explorezi toate funcționalitățile platformei din perspectiva diferitelor
                    tipuri de utilizatori, cu date simulate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const currentConfig = roleConfig[currentDemoRole]
  const CurrentIcon = currentConfig.icon

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        <Eye className="mr-1 h-3 w-3" />
        Demo Mode
      </Badge>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <CurrentIcon className="mr-2 h-4 w-4" />
            {currentConfig.label}
            <Settings className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schimbă Rolul Demo</DialogTitle>
            <DialogDescription>Selectează rolul pentru a explora diferite funcționalități</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="demo-toggle">Mod Demo</Label>
              <Switch id="demo-toggle" checked={demoMode} onCheckedChange={handleDemoToggle} />
            </div>

            <div className="space-y-2">
              <Label>Selectează Rolul</Label>
              <Select value={currentDemoRole} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleConfig).map(([key, config]) => {
                    const IconComponent = config.icon
                    return (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{config.label}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${currentConfig.color} text-white`}>
                    <CurrentIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{currentConfig.label}</CardTitle>
                    <CardDescription className="text-sm">{currentConfig.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Funcționalități disponibile:</p>
                  <div className="flex flex-wrap gap-1">
                    {currentConfig.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button onClick={() => handleRoleChange(currentDemoRole)} className="flex-1">
                Accesează Dashboard
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Anulează
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
