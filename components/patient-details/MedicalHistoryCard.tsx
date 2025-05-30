"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download } from "lucide-react"
import { useMockMedicalHistory } from "@/hooks/useMockMedicalHistory"

interface MedicalHistoryCardProps {
  patientId: string
}

export function MedicalHistoryCard({ patientId }: MedicalHistoryCardProps) {
  const historyData = useMockMedicalHistory(patientId)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Istoric Medical Detaliat
          <Button size="sm" variant="outline" className="ml-auto">
            <Download className="h-4 w-4 mr-1" />
            Export Complet
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="tratament">Tratament</TabsTrigger>
              <TabsTrigger value="analize">Analize</TabsTrigger>
              <TabsTrigger value="imagistica">Imagistică</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Antecedente Personale</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Alergii:</span> {historyData?.personalHistory?.allergies || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Intervenții chirurgicale:</span>{" "}
                    {historyData?.personalHistory?.surgeries || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Medicație cronică:</span>{" "}
                    {historyData?.personalHistory?.chronicMedication || "N/A"}
                  </p>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Antecedente Familiale</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Mamă:</span> {historyData?.familyHistory?.mother || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Tată:</span> {historyData?.familyHistory?.father || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Oncologie:</span> {historyData?.familyHistory?.oncology || "N/A"}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tratament" className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">
                  Protocol Actual: {historyData?.currentTreatment?.protocol || "N/A"}
                </h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Început:</span> {historyData?.currentTreatment?.startDate || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Cicluri planificate:</span>{" "}
                    {historyData?.currentTreatment?.plannedCycles || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Interval:</span> {historyData?.currentTreatment?.interval || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Răspuns:</span> {historyData?.currentTreatment?.response || "N/A"}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analize" className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Analize Recente ({historyData?.recentAnalysis?.date || "N/A"})</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    {historyData?.recentAnalysis?.results ? (
                      Object.entries(historyData.recentAnalysis.results)
                        .slice(0, 3)
                        .map(([key, value]) => (
                          <p key={key}>
                            <span className="font-medium">{key}:</span> {value || "N/A"}
                          </p>
                        ))
                    ) : (
                      <p>Niciun rezultat disponibil</p>
                    )}
                  </div>
                  <div>
                    {historyData?.recentAnalysis?.results ? (
                      Object.entries(historyData.recentAnalysis.results)
                        .slice(3)
                        .map(([key, value]) => (
                          <p key={key}>
                            <span className="font-medium">{key}:</span> {value || "N/A"}
                          </p>
                        ))
                    ) : (
                      <p>Niciun rezultat disponibil</p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="imagistica" className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">
                  {historyData?.imaging?.type || "N/A"} ({historyData?.imaging?.date || "N/A"})
                </h4>
                <div className="text-sm">
                  <p>
                    <span className="font-medium">Rezultat:</span> {historyData?.imaging?.result || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Progres:</span> {historyData?.imaging?.progress || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Recomandări:</span> {historyData?.imaging?.recommendations || "N/A"}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
