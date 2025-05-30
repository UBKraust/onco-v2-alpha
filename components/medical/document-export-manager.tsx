"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Download,
  Archive,
  Share2,
  FileText,
  Calendar,
  User,
  Lock,
  Clock,
  Copy,
  Mail,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react"
import type { MedicalDocument } from "@/types/medical-record"

interface DocumentExportManagerProps {
  documents: MedicalDocument[]
  selectedDocuments: string[]
  onSelectionChange: (documentIds: string[]) => void
}

interface ShareLink {
  id: string
  url: string
  expiresAt: string
  accessCount: number
  maxAccess: number
  password?: string
  permissions: {
    canView: boolean
    canDownload: boolean
    canShare: boolean
  }
  sharedWith: {
    email: string
    role: string
    accessedAt?: string
  }[]
  createdAt: string
}

interface ExportProgress {
  isExporting: boolean
  progress: number
  currentFile: string
  totalFiles: number
  completedFiles: number
}

export function DocumentExportManager({ documents, selectedDocuments, onSelectionChange }: DocumentExportManagerProps) {
  const [exportProgress, setExportProgress] = useState<ExportProgress>({
    isExporting: false,
    progress: 0,
    currentFile: "",
    totalFiles: 0,
    completedFiles: 0,
  })

  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareSettings, setShareSettings] = useState({
    expiresIn: "7", // days
    maxAccess: 10,
    requirePassword: false,
    password: "",
    allowDownload: true,
    allowShare: false,
    notifyByEmail: true,
    shareWithEmails: "",
    message: "",
  })

  const [activeShareLinks, setActiveShareLinks] = useState<ShareLink[]>([
    {
      id: "1",
      url: "https://oncolink.ro/share/abc123def456",
      expiresAt: "2024-02-15",
      accessCount: 3,
      maxAccess: 10,
      password: "med2024",
      permissions: {
        canView: true,
        canDownload: true,
        canShare: false,
      },
      sharedWith: [
        {
          email: "dr.popescu@spital.ro",
          role: "Medic Oncolog",
          accessedAt: "2024-01-20 14:30",
        },
        {
          email: "asist.maria@spital.ro",
          role: "Asistent Medical",
          accessedAt: "2024-01-19 09:15",
        },
      ],
      createdAt: "2024-01-15",
    },
  ])

  const selectedDocs = documents.filter((doc) => selectedDocuments.includes(doc.id))

  const handleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(documents.map((doc) => doc.id))
    }
  }

  const handleDocumentToggle = (documentId: string) => {
    if (selectedDocuments.includes(documentId)) {
      onSelectionChange(selectedDocuments.filter((id) => id !== documentId))
    } else {
      onSelectionChange([...selectedDocuments, documentId])
    }
  }

  const simulateExport = useCallback(async () => {
    setExportProgress({
      isExporting: true,
      progress: 0,
      currentFile: "",
      totalFiles: selectedDocs.length,
      completedFiles: 0,
    })

    for (let i = 0; i < selectedDocs.length; i++) {
      const doc = selectedDocs[i]
      setExportProgress((prev) => ({
        ...prev,
        currentFile: doc.name,
        progress: ((i + 1) / selectedDocs.length) * 100,
        completedFiles: i + 1,
      }))

      // Simulate file processing time
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    // Simulate ZIP creation
    setExportProgress((prev) => ({
      ...prev,
      currentFile: "Crearea arhivei ZIP...",
      progress: 100,
    }))

    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate download
    const link = document.createElement("a")
    link.href = "#"
    link.download = `documente-medicale-${new Date().toISOString().split("T")[0]}.zip`
    link.click()

    setExportProgress({
      isExporting: false,
      progress: 0,
      currentFile: "",
      totalFiles: 0,
      completedFiles: 0,
    })
  }, [selectedDocs])

  const handleExportZIP = () => {
    if (selectedDocs.length === 0) {
      alert("Selectați cel puțin un document pentru export.")
      return
    }
    simulateExport()
  }

  const generateShareLink = () => {
    const newLink: ShareLink = {
      id: Date.now().toString(),
      url: `https://oncolink.ro/share/${Math.random().toString(36).substring(2, 15)}`,
      expiresAt: new Date(Date.now() + Number.parseInt(shareSettings.expiresIn) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      accessCount: 0,
      maxAccess: shareSettings.maxAccess,
      password: shareSettings.requirePassword ? shareSettings.password : undefined,
      permissions: {
        canView: true,
        canDownload: shareSettings.allowDownload,
        canShare: shareSettings.allowShare,
      },
      sharedWith: shareSettings.shareWithEmails
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean)
        .map((email) => ({
          email,
          role: "Invitat",
        })),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setActiveShareLinks((prev) => [newLink, ...prev])
    setShareDialogOpen(false)

    // Reset form
    setShareSettings({
      expiresIn: "7",
      maxAccess: 10,
      requirePassword: false,
      password: "",
      allowDownload: true,
      allowShare: false,
      notifyByEmail: true,
      shareWithEmails: "",
      message: "",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In a real app, show a toast notification
    alert("Link copiat în clipboard!")
  }

  const revokeShareLink = (linkId: string) => {
    setActiveShareLinks((prev) => prev.filter((link) => link.id !== linkId))
  }

  const getTotalSize = () => {
    return selectedDocs.reduce((total, doc) => {
      const size = Number.parseFloat(doc.size.replace(/[^\d.]/g, ""))
      return total + size
    }, 0)
  }

  return (
    <div className="space-y-6">
      {/* Selection Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Export și Partajare Documente
          </CardTitle>
          <CardDescription>Exportați documentele selectate sau creați link-uri de partajare securizate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selection Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedDocuments.length === documents.length}
                onCheckedChange={handleSelectAll}
                id="select-all"
              />
              <Label htmlFor="select-all" className="text-sm font-medium">
                Selectează toate ({documents.length} documente)
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{selectedDocuments.length} selectate</Badge>
              {selectedDocs.length > 0 && <Badge variant="outline">{getTotalSize().toFixed(1)} MB total</Badge>}
            </div>
          </div>

          {/* Document List */}
          <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-3">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <Checkbox
                  checked={selectedDocuments.includes(document.id)}
                  onCheckedChange={() => handleDocumentToggle(document.id)}
                  id={`doc-${document.id}`}
                />
                <FileText className="h-4 w-4 text-pink-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{document.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{document.date}</span>
                    <span>•</span>
                    <span>{document.size}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {document.category}
                </Badge>
              </div>
            ))}
          </div>

          {/* Export Progress */}
          {exportProgress.isExporting && (
            <div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Export în progres...</span>
                <span className="text-sm text-muted-foreground">
                  {exportProgress.completedFiles}/{exportProgress.totalFiles} fișiere
                </span>
              </div>
              <Progress value={exportProgress.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">{exportProgress.currentFile}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleExportZIP}
              disabled={selectedDocs.length === 0 || exportProgress.isExporting}
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Export ZIP ({selectedDocs.length} fișiere)
            </Button>

            <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={selectedDocs.length === 0} className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Partajează Securizat
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Partajare Securizată Documente</DialogTitle>
                  <DialogDescription>
                    Creați un link securizat pentru partajarea documentelor selectate
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Selected Documents Summary */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Documente selectate pentru partajare:</p>
                    <div className="space-y-1">
                      {selectedDocs.slice(0, 3).map((doc) => (
                        <p key={doc.id} className="text-xs text-muted-foreground">
                          • {doc.name}
                        </p>
                      ))}
                      {selectedDocs.length > 3 && (
                        <p className="text-xs text-muted-foreground">... și încă {selectedDocs.length - 3} documente</p>
                      )}
                    </div>
                  </div>

                  {/* Share Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expires">Expiră în</Label>
                      <Select
                        value={shareSettings.expiresIn}
                        onValueChange={(value) => setShareSettings((prev) => ({ ...prev, expiresIn: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 zi</SelectItem>
                          <SelectItem value="3">3 zile</SelectItem>
                          <SelectItem value="7">7 zile</SelectItem>
                          <SelectItem value="14">14 zile</SelectItem>
                          <SelectItem value="30">30 zile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="maxAccess">Accesări maxime</Label>
                      <Input
                        id="maxAccess"
                        type="number"
                        value={shareSettings.maxAccess}
                        onChange={(e) =>
                          setShareSettings((prev) => ({ ...prev, maxAccess: Number.parseInt(e.target.value) }))
                        }
                        min="1"
                        max="100"
                      />
                    </div>
                  </div>

                  {/* Password Protection */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="requirePassword"
                        checked={shareSettings.requirePassword}
                        onCheckedChange={(checked) =>
                          setShareSettings((prev) => ({ ...prev, requirePassword: checked }))
                        }
                      />
                      <Label htmlFor="requirePassword">Protejare cu parolă</Label>
                    </div>
                    {shareSettings.requirePassword && (
                      <Input
                        placeholder="Introduceți parola"
                        type="password"
                        value={shareSettings.password}
                        onChange={(e) => setShareSettings((prev) => ({ ...prev, password: e.target.value }))}
                      />
                    )}
                  </div>

                  {/* Permissions */}
                  <div className="space-y-3">
                    <Label>Permisiuni</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="allowDownload"
                          checked={shareSettings.allowDownload}
                          onCheckedChange={(checked) =>
                            setShareSettings((prev) => ({ ...prev, allowDownload: checked }))
                          }
                        />
                        <Label htmlFor="allowDownload">Permite descărcarea</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="allowShare"
                          checked={shareSettings.allowShare}
                          onCheckedChange={(checked) => setShareSettings((prev) => ({ ...prev, allowShare: checked }))}
                        />
                        <Label htmlFor="allowShare">Permite re-partajarea</Label>
                      </div>
                    </div>
                  </div>

                  {/* Share with specific people */}
                  <div className="space-y-3">
                    <Label htmlFor="shareEmails">Partajează cu (email-uri separate prin virgulă)</Label>
                    <Textarea
                      id="shareEmails"
                      placeholder="dr.popescu@spital.ro, asist.maria@spital.ro"
                      value={shareSettings.shareWithEmails}
                      onChange={(e) => setShareSettings((prev) => ({ ...prev, shareWithEmails: e.target.value }))}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-3">
                    <Label htmlFor="message">Mesaj opțional</Label>
                    <Textarea
                      id="message"
                      placeholder="Adăugați un mesaj pentru destinatari..."
                      value={shareSettings.message}
                      onChange={(e) => setShareSettings((prev) => ({ ...prev, message: e.target.value }))}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={generateShareLink} className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Creează Link Securizat
                    </Button>
                    <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
                      Anulează
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Active Share Links */}
      {activeShareLinks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Link-uri de Partajare Active
            </CardTitle>
            <CardDescription>Gestionați link-urile de partajare existente și monitorizați accesul</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeShareLinks.map((link) => (
                <div key={link.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Link Securizat</span>
                      {link.password && <Badge variant="outline">Protejat cu parolă</Badge>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={link.accessCount < link.maxAccess ? "default" : "destructive"}>
                        {link.accessCount}/{link.maxAccess} accesări
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(link.url)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => revokeShareLink(link.id)}>
                        <EyeOff className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Expiră pe {link.expiresAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span>Creat pe {link.createdAt}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-2 font-mono text-xs break-all">{link.url}</div>

                  {link.sharedWith.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Partajat cu:</p>
                      <div className="space-y-1">
                        {link.sharedWith.map((person, index) => (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              <span>{person.email}</span>
                              <Badge variant="outline" className="text-xs">
                                {person.role}
                              </Badge>
                            </div>
                            {person.accessedAt && (
                              <span className="text-muted-foreground">Accesat: {person.accessedAt}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>Vizualizare</span>
                    </div>
                    {link.permissions.canDownload && (
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>Descărcare</span>
                      </div>
                    )}
                    {link.permissions.canShare && (
                      <div className="flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        <span>Re-partajare</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
