"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Eye, Plus, Calendar, Hospital, User } from "lucide-react"
import type { Diagnosis } from "@/types/medical-record"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DiagnosisCardProps {
  diagnoses: Diagnosis[]
}

export function DiagnosisCard({ diagnoses }: DiagnosisCardProps) {
  // Sort diagnoses by date (newest first) and active status
  const sortedDiagnoses = [...diagnoses].sort((a, b) => {
    // Active diagnoses first
    if (a.isActive && !b.isActive) return -1
    if (!a.isActive && b.isActive) return 1

    // Then by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const primaryDiagnosis = sortedDiagnoses.find((d) => d.isActive) || sortedDiagnoses[0]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Diagnoze
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {primaryDiagnosis && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Diagnostic Principal
              </h3>
              {primaryDiagnosis.isActive && <Badge className="bg-green-600 text-white">Activ</Badge>}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-lg mb-2">{primaryDiagnosis.name}</p>
              {primaryDiagnosis.stage && <p className="text-muted-foreground mb-2">{primaryDiagnosis.stage}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{primaryDiagnosis.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{primaryDiagnosis.doctor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hospital className="h-4 w-4 text-muted-foreground" />
                  <span>{primaryDiagnosis.hospital}</span>
                </div>
                {primaryDiagnosis.icd10Code && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">ICD-10:</span>
                    <span className="font-mono">{primaryDiagnosis.icd10Code}</span>
                  </div>
                )}
              </div>

              <p className="text-sm mt-3 text-muted-foreground">{primaryDiagnosis.description}</p>
            </div>
          </div>
        )}

        {sortedDiagnoses.length > 1 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Alte Diagnostice</h3>
            <div className="space-y-2">
              {sortedDiagnoses
                .filter((d) => d !== primaryDiagnosis)
                .map((diagnosis) => (
                  <div key={diagnosis.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">{diagnosis.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {diagnosis.date} - {diagnosis.doctor}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {diagnosis.isActive && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Activ
                        </Badge>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{diagnosis.name}</DialogTitle>
                            <DialogDescription>
                              {diagnosis.date} - {diagnosis.doctor}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            {diagnosis.stage && (
                              <div>
                                <p className="font-medium">Stadiu:</p>
                                <p>{diagnosis.stage}</p>
                              </div>
                            )}
                            <div>
                              <p className="font-medium">Descriere:</p>
                              <p>{diagnosis.description}</p>
                            </div>
                            <div>
                              <p className="font-medium">Medic:</p>
                              <p>{diagnosis.doctor}</p>
                            </div>
                            <div>
                              <p className="font-medium">Unitate medicală:</p>
                              <p>{diagnosis.hospital}</p>
                            </div>
                            {diagnosis.icd10Code && (
                              <div>
                                <p className="font-medium">Cod ICD-10:</p>
                                <p>{diagnosis.icd10Code}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Adaugă Diagnostic
        </Button>
      </CardContent>
    </Card>
  )
}
