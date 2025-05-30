"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { useDemoRole } from "./use-demo-role"

export type UserRole = "patient" | "navigator" | "admin" | "public"

export interface RoleConfig {
  role: UserRole
  displayName: string
  theme: {
    primary: string
    background: string
    sidebar: string
  }
  permissions: string[]
}

const roleConfigs: Record<UserRole, RoleConfig> = {
  patient: {
    role: "patient",
    displayName: "Pacient",
    theme: {
      primary: "bg-pink-600",
      background: "bg-slate-900",
      sidebar: "bg-slate-800",
    },
    permissions: ["view_own_data", "update_symptoms", "view_appointments", "message_navigator"],
  },
  navigator: {
    role: "navigator",
    displayName: "Navigator Medical",
    theme: {
      primary: "bg-blue-600",
      background: "bg-gray-50",
      sidebar: "bg-white",
    },
    permissions: ["view_patients", "manage_appointments", "send_messages", "create_reports", "manage_alerts"],
  },
  admin: {
    role: "admin",
    displayName: "Administrator",
    theme: {
      primary: "bg-purple-600",
      background: "bg-gray-100",
      sidebar: "bg-white",
    },
    permissions: ["manage_users", "system_config", "view_all_data", "manage_security", "export_data"],
  },
  public: {
    role: "public",
    displayName: "Vizitator",
    theme: {
      primary: "bg-gray-600",
      background: "bg-white",
      sidebar: "bg-gray-50",
    },
    permissions: ["view_public_content"],
  },
}

export function useCurrentRole() {
  const pathname = usePathname()
  const { demoMode, currentDemoRole } = useDemoRole()

  const currentRole = useMemo((): UserRole => {
    // În modul demo, folosește rolul selectat
    if (demoMode) {
      return currentDemoRole
    }

    // Detectează rolul bazat pe rută
    if (pathname.startsWith("/patient")) return "patient"
    if (pathname.startsWith("/navigator")) return "navigator"
    if (pathname.startsWith("/admin")) return "admin"

    // Rutele publice
    if (
      pathname === "/" ||
      pathname.startsWith("/about") ||
      pathname.startsWith("/contact") ||
      pathname.startsWith("/terms")
    ) {
      return "public"
    }

    // Default pentru rute necunoscute
    return "public"
  }, [pathname, demoMode, currentDemoRole])

  const roleConfig = roleConfigs[currentRole]

  const hasPermission = (permission: string): boolean => {
    return roleConfig.permissions.includes(permission)
  }

  const isRole = (role: UserRole): boolean => {
    return currentRole === role
  }

  const canAccess = (requiredRole: UserRole | UserRole[]): boolean => {
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(currentRole)
    }
    return currentRole === requiredRole
  }

  return {
    currentRole,
    roleConfig,
    hasPermission,
    isRole,
    canAccess,
    isPatient: currentRole === "patient",
    isNavigator: currentRole === "navigator",
    isAdmin: currentRole === "admin",
    isPublic: currentRole === "public",
    isDemoMode: demoMode,
  }
}

// Hook pentru verificarea permisiunilor
export function usePermissions() {
  const { hasPermission, canAccess, currentRole } = useCurrentRole()

  return {
    hasPermission,
    canAccess,
    currentRole,
    // Permisiuni specifice comune
    canViewPatients: hasPermission("view_patients"),
    canManageUsers: hasPermission("manage_users"),
    canSendMessages: hasPermission("send_messages"),
    canViewOwnData: hasPermission("view_own_data"),
    canManageAppointments: hasPermission("manage_appointments"),
  }
}

// Hook pentru tema bazată pe rol
export function useRoleTheme() {
  const { roleConfig } = useCurrentRole()

  return {
    theme: roleConfig.theme,
    primaryColor: roleConfig.theme.primary,
    backgroundColor: roleConfig.theme.background,
    sidebarColor: roleConfig.theme.sidebar,
  }
}
