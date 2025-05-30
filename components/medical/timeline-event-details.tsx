"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  User,
  FileText,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import type { MedicalEvent } from "@/types/medical-record"

interface TimelineEventDetailsProps {
  event: MedicalEvent
  isExpanded: boolean
  onToggleExpand: () => void
}

export function TimelineEventDetails({ event, isExpanded, onToggleExpand }: TimelineEventDetailsProps) {
  const [showFullDialog, setShowFullDialog] = useState(false)

  const getEventIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return Calendar
      case "consultation":
        return User
      case "test":
        return FileText
      case "treatment":
        return AlertCircle
      case "medication":
        return CheckCircle
      default:
        return FileText
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "consultation":
        return "bg-green-100 text-green-800 border-green-200"
      case "test":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "treatment":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medication":
        return "bg-pink-100 text-pink-800 border-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "cancelled":
        return XCircle
      case "pending":
        return Clock
      default:
        return AlertCircle
    }
  }

  const Icon = getEventIcon(event.type)
  const StatusIcon = getStatusIcon(event.status)

  return (
    <>
      <Card className={`transition-all duration-200 ${isExpanded ? "ring-2 ring-pink-200" : ""}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${getEventColor(event.type)}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-base font-medium">{event.title}</CardTitle>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(event.date).toLocaleDateString("ro-RO")}
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <StatusIcon className="h-3 w-3" />
                    <Badge variant="outline" className="text-xs">
                      {event.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onToggleExpand}>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* Descriere scurtă */}
              {event.description && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Descriere</h4>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              )}

              {/* Informații rapide */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {event.doctor && (
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">{event.doctor}</span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">Locație:</span>
                    <span className="font-medium">{event.location}</span>
                  </div>
                )}
              </div>

              {/* Documente atașate */}
              {event.attachments && event.attachments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Documente atașate</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.attachments.map((attachment, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {attachment.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Acțiuni */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" onClick={() => setShowFullDialog(true)}>
                  <FileText className="h-3 w-3 mr-1" />
                  Detalii complete
                </Button>
                {event.attachments && event.attachments.length > 0 && (
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Descarcă
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Share2 className="h-3 w-3 mr-1" />
                  Partajează
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Dialog detalii complete */}
      <Dialog open={showFullDialog} onOpenChange={setShowFullDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-pink-600" />
              {event.title}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Detalii</TabsTrigger>
              <TabsTrigger value="attachments">Documente</TabsTrigger>
              <TabsTrigger value="notes">Note</TabsTrigger>
              <TabsTrigger value="history">Istoric</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informații generale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Data și ora</label>
                      <p className="text-sm">
                        {new Date(event.date).toLocaleDateString("ro-RO")} {event.time}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <p className="text-sm">
                        <Badge variant="outline">{event.status}</Badge>
                      </p>
                    </div>
                    {event.doctor && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Doctor</label>
                        <p className="text-sm">{event.doctor}</p>
                      </div>
                    )}
                    {event.location && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Locație</label>
                        <p className="text-sm">{event.location}</p>
                      </div>
                    )}
                  </div>
                  {event.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Descriere</label>
                      <p className="text-sm mt-1">{event.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attachments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documente atașate</CardTitle>
                </CardHeader>
                <CardContent>
                  {event.attachments && event.attachments.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {event.attachments.map((attachment, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-gray-400" />
                            <div className="flex-1">
                              <p className="font-medium">{attachment.name}</p>
                              <p className="text-sm text-gray-600">{attachment.size}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-8">Nu există documente atașate</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Note medicale</CardTitle>
                </CardHeader>
                <CardContent>
                  {event.notes && event.notes.length > 0 ? (
                    <div className="space-y-3">
                      {event.notes.map((note, index) => (
                        <Card key={index} className="p-3">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-sm">{note.author}</span>
                            <span className="text-xs text-gray-600">{note.date}</span>
                          </div>
                          <p className="text-sm">{note.content}</p>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-8">Nu există note disponibile</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Istoric modificări</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Eveniment creat</p>
                        <p className="text-xs text-gray-600">
                          de Dr. Popescu • {new Date(event.date).toLocaleDateString("ro-RO")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
