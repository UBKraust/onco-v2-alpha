"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Shield, UserCheck, UserX, Download, Mail } from "lucide-react"
import { useAdminData } from "@/hooks/useAdminData"
import { UserCreateDialog } from "./user-create-dialog"
import { UserEditDialog } from "./user-edit-dialog"
import { UserPermissionsDialog } from "./user-permissions-dialog"
import type { AdminUser } from "@/types/admin"

export function UserManagement() {
  const { users, loading } = useAdminData()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "navigator":
        return "bg-blue-100 text-blue-800"
      case "patient":
        return "bg-green-100 text-green-800"
      case "caregiver":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user)
    setShowEditDialog(true)
  }

  const handleManagePermissions = (user: AdminUser) => {
    setSelectedUser(user)
    setShowPermissionsDialog(true)
  }

  const handleSuspendUser = async (userId: string) => {
    // Implementare suspendare utilizator
    console.log("Suspending user:", userId)
  }

  const handleActivateUser = async (userId: string) => {
    // Implementare activare utilizator
    console.log("Activating user:", userId)
  }

  const handleDeleteUser = async (userId: string) => {
    // Implementare ștergere utilizator
    console.log("Deleting user:", userId)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-200 rounded animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Managementul Utilizatorilor</h1>
          <p className="text-muted-foreground">Gestionează utilizatorii, rolurile și permisiunile din sistem</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Utilizator Nou
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Utilizatori</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Activi</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Navigatori</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.role === "navigator").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Suspendați</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "suspended").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtre și Căutare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Caută după nume sau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtru rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate rolurile</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="navigator">Navigator</SelectItem>
                <SelectItem value="patient">Pacient</SelectItem>
                <SelectItem value="caregiver">Îngrijitor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtru status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate statusurile</SelectItem>
                <SelectItem value="active">Activ</SelectItem>
                <SelectItem value="inactive">Inactiv</SelectItem>
                <SelectItem value="suspended">Suspendat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista Utilizatori ({filteredUsers.length})</CardTitle>
          <CardDescription>Gestionează utilizatorii din sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilizator</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ultima Conectare</TableHead>
                <TableHead>Creat</TableHead>
                <TableHead>Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`/avatars/${user.id}.jpg`} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role === "admin" && "Administrator"}
                      {user.role === "navigator" && "Navigator"}
                      {user.role === "patient" && "Pacient"}
                      {user.role === "caregiver" && "Îngrijitor"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status === "active" && "Activ"}
                      {user.status === "inactive" && "Inactiv"}
                      {user.status === "suspended" && "Suspendat"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{user.lastLogin.toLocaleDateString("ro-RO")}</div>
                    <div className="text-xs text-muted-foreground">{user.lastLogin.toLocaleTimeString("ro-RO")}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{user.createdAt.toLocaleDateString("ro-RO")}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acțiuni</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editează
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleManagePermissions(user)}>
                          <Shield className="mr-2 h-4 w-4" />
                          Permisiuni
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem onClick={() => handleSuspendUser(user.id)} className="text-orange-600">
                            <UserX className="mr-2 h-4 w-4" />
                            Suspendă
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateUser(user.id)} className="text-green-600">
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activează
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Șterge
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <UserCreateDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />

      {selectedUser && (
        <>
          <UserEditDialog open={showEditDialog} onOpenChange={setShowEditDialog} user={selectedUser} />
          <UserPermissionsDialog
            open={showPermissionsDialog}
            onOpenChange={setShowPermissionsDialog}
            user={selectedUser}
          />
        </>
      )}
    </div>
  )
}
