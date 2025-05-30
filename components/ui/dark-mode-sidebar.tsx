"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  FileText,
  Calendar,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  Heart,
  Stethoscope,
  BookOpen,
  AlertTriangle,
} from "lucide-react"
import { useCurrentRole } from "@/hooks/use-current-role"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const patientNavItems = [
  {
    title: "Dashboard",
    href: "/patient",
    icon: Home,
    badge: null,
  },
  {
    title: "Dosar Medical",
    href: "/patient/medical-file",
    icon: FileText,
    badge: null,
  },
  {
    title: "Simptome",
    href: "/patient/symptoms",
    icon: Activity,
    badge: "2",
  },
  {
    title: "Programări",
    href: "/patient/appointments",
    icon: Calendar,
    badge: null,
  },
  {
    title: "Mesaje",
    href: "/patient/messages",
    icon: MessageSquare,
    badge: "3",
  },
  {
    title: "Resurse",
    href: "/patient/resources",
    icon: BookOpen,
    badge: null,
  },
]

const navigatorNavItems = [
  {
    title: "Dashboard",
    href: "/navigator",
    icon: Home,
    badge: null,
  },
  {
    title: "Pacienți",
    href: "/navigator/patients",
    icon: Users,
    badge: "12",
  },
  {
    title: "Programări",
    href: "/navigator/appointments",
    icon: Calendar,
    badge: null,
  },
  {
    title: "Alerte",
    href: "/navigator/alerts",
    icon: AlertTriangle,
    badge: "5",
  },
  {
    title: "Rapoarte",
    href: "/navigator/reports",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Mesaje",
    href: "/navigator/messages",
    icon: MessageSquare,
    badge: "8",
  },
]

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
    badge: null,
  },
  {
    title: "Utilizatori",
    href: "/admin/users",
    icon: Users,
    badge: null,
  },
  {
    title: "Sistem",
    href: "/admin/system",
    icon: Settings,
    badge: null,
  },
  {
    title: "Rapoarte",
    href: "/admin/reports",
    icon: BarChart3,
    badge: null,
  },
]

export function DarkModeSidebar({ isOpen, onToggle }: SidebarProps) {
  const { currentRole, roleConfig } = useCurrentRole()
  const pathname = usePathname()

  const getNavItems = () => {
    switch (currentRole) {
      case "patient":
        return patientNavItems
      case "navigator":
        return navigatorNavItems
      case "admin":
        return adminNavItems
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 transform border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:w-16",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Integrated Header */}
          <div className="flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur px-4">
            {isOpen ? (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm">OncoLink</span>
                  <p className="text-xs text-muted-foreground">{roleConfig.displayName}</p>
                </div>
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground mx-auto">
                <Activity className="h-4 w-4" />
              </div>
            )}

            <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8 md:flex hidden">
              {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>

          {/* Role Indicator */}
          {isOpen && (
            <div className="px-4 pb-4">
              <div
                className={cn(
                  "rounded-lg p-3 text-white",
                  currentRole === "patient" && "bg-gradient-to-r from-pink-500 to-pink-600",
                  currentRole === "navigator" && "bg-gradient-to-r from-blue-500 to-blue-600",
                  currentRole === "admin" && "bg-gradient-to-r from-purple-500 to-purple-600",
                )}
              >
                <div className="flex items-center gap-2">
                  {currentRole === "patient" && <Heart className="h-5 w-5" />}
                  {currentRole === "navigator" && <Stethoscope className="h-5 w-5" />}
                  {currentRole === "admin" && <Settings className="h-5 w-5" />}
                  <div>
                    <p className="font-medium">{roleConfig.displayName}</p>
                    <p className="text-xs opacity-90">
                      {currentRole === "patient" && "Monitorizare activă"}
                      {currentRole === "navigator" && "12 pacienți activi"}
                      {currentRole === "admin" && "Sistem operațional"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3">
            <nav className="space-y-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <div
                    key={item.href}
                    className="group relative"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <Link href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 h-12 transition-all duration-300 ease-out relative overflow-hidden",
                          "hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10",
                          "group-hover:bg-gradient-to-r group-hover:from-primary/5 group-hover:to-transparent",
                          isActive &&
                            "bg-gradient-to-r from-primary/15 to-primary/5 text-primary border-r-4 border-primary shadow-lg shadow-primary/20",
                          !isOpen && "justify-center px-2 w-12 mx-auto",
                        )}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/50 rounded-r-full" />
                        )}

                        {/* Icon with animation */}
                        <div
                          className={cn(
                            "relative transition-all duration-300",
                            isActive && "scale-110",
                            "group-hover:scale-110 group-hover:rotate-3",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-5 w-5 transition-colors duration-300",
                              isActive && "text-primary drop-shadow-sm",
                              "group-hover:text-primary",
                            )}
                          />

                          {/* Glow effect for active item */}
                          {isActive && (
                            <div className="absolute inset-0 h-5 w-5 bg-primary/20 rounded-full blur-sm -z-10" />
                          )}
                        </div>

                        {isOpen && (
                          <>
                            <span
                              className={cn(
                                "flex-1 text-left font-medium transition-all duration-300",
                                isActive && "text-primary",
                                "group-hover:translate-x-1",
                              )}
                            >
                              {item.title}
                            </span>

                            {/* Badge with enhanced styling */}
                            {item.badge && (
                              <Badge
                                variant={isActive ? "default" : "secondary"}
                                className={cn(
                                  "h-6 min-w-[24px] text-xs font-bold transition-all duration-300",
                                  "group-hover:scale-110 group-hover:shadow-md",
                                  isActive && "bg-primary text-primary-foreground shadow-lg shadow-primary/30",
                                  !isActive &&
                                    "bg-muted-foreground/20 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary",
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}

                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </Link>

                    {/* Tooltip for collapsed state */}
                    {!isOpen && (
                      <div className="absolute left-16 top-1/2 -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                        <div className="bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg border text-sm font-medium whitespace-nowrap">
                          {item.title}
                          {item.badge && (
                            <Badge variant="secondary" className="ml-2 h-5 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover border-l border-b rotate-45" />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Quick Actions Section */}
            {isOpen && (
              <div className="mt-8 pt-4 border-t border-border/50">
                <div className="px-2 mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acțiuni Rapide</p>
                </div>
                <div className="space-y-1">
                  {currentRole === "patient" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 h-9 text-xs hover:bg-green-500/10 hover:text-green-600"
                      >
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        Raportează Simptom
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 h-9 text-xs hover:bg-blue-500/10 hover:text-blue-600"
                      >
                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                        Programare Urgentă
                      </Button>
                    </>
                  )}

                  {currentRole === "navigator" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 h-9 text-xs hover:bg-orange-500/10 hover:text-orange-600"
                      >
                        <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse" />
                        Alertă Nouă
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 h-9 text-xs hover:bg-purple-500/10 hover:text-purple-600"
                      >
                        <div className="h-2 w-2 bg-purple-500 rounded-full" />
                        Raport Rapid
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          {isOpen && (
            <div className="p-4 border-t">
              <div className="text-center text-xs text-muted-foreground">
                <p>OncoLink Platform</p>
                <p className="mt-1">v2.1.0</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
