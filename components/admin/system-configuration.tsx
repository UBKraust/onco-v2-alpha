"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Save, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { SystemConfiguration } from "@/types/system"

interface SystemConfigurationProps {
  configurations: SystemConfiguration[]
  onUpdateConfiguration: (id: string, value: string | number | boolean) => void
}

export function SystemConfig({ configurations, onUpdateConfiguration }: SystemConfigurationProps) {
  const [editingValues, setEditingValues] = useState<Record<string, any>>({})
  const { toast } = useToast()

  const categories = ["general", "security", "notifications", "backup", "performance"]

  const handleValueChange = (configId: string, value: any) => {
    setEditingValues((prev) => ({
      ...prev,
      [configId]: value,
    }))
  }

  const handleSave = (config: SystemConfiguration) => {
    const newValue = editingValues[config.id] ?? config.value
    onUpdateConfiguration(config.id, newValue)
    setEditingValues((prev) => {
      const { [config.id]: _, ...rest } = prev
      return rest
    })
    toast({
      title: "Configurație actualizată",
      description: `${config.key} a fost actualizat cu succes.`,
    })
  }

  const handleReset = (configId: string) => {
    setEditingValues((prev) => {
      const { [configId]: _, ...rest } = prev
      return rest
    })
  }

  const renderConfigInput = (config: SystemConfiguration) => {
    const currentValue = editingValues[config.id] ?? config.value
    const hasChanges = editingValues[config.id] !== undefined

    switch (config.type) {
      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={currentValue as boolean}
              onCheckedChange={(checked) => handleValueChange(config.id, checked)}
            />
            <span className="text-sm">{currentValue ? "Activat" : "Dezactivat"}</span>
          </div>
        )

      case "select":
        return (
          <Select value={currentValue as string} onValueChange={(value) => handleValueChange(config.id, value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {config.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "number":
        return (
          <Input
            type="number"
            value={currentValue as number}
            onChange={(e) => handleValueChange(config.id, Number.parseInt(e.target.value))}
          />
        )

      default:
        return (
          <Input
            type="text"
            value={currentValue as string}
            onChange={(e) => handleValueChange(config.id, e.target.value)}
          />
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configurații Sistem
        </CardTitle>
        <CardDescription>Gestionare setări și parametri sistem</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category === "general"
                  ? "General"
                  : category === "security"
                    ? "Securitate"
                    : category === "notifications"
                      ? "Notificări"
                      : category === "backup"
                        ? "Backup"
                        : category === "performance"
                          ? "Performanță"
                          : category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {configurations
                .filter((config) => config.category === category)
                .map((config) => {
                  const hasChanges = editingValues[config.id] !== undefined
                  return (
                    <div key={config.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{config.key}</h4>
                            {hasChanges && <Badge variant="secondary">Modificat</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{config.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {hasChanges && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => handleReset(config.id)}>
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                              <Button size="sm" onClick={() => handleSave(config)}>
                                <Save className="h-4 w-4 mr-2" />
                                Salvează
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">{renderConfigInput(config)}</div>
                        <div className="text-xs text-muted-foreground">
                          Actualizat: {config.updatedAt.toLocaleDateString("ro-RO")}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
