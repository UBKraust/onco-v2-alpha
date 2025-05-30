"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  Calendar,
  AlertTriangle,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  Phone,
  Clock,
  UserPlus,
  CalendarPlus,
  Activity,
  Heart,
  Stethoscope,
} from "lucide-react"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/navigator",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Pacienți",
    href: "/navigator/patients",
    icon: Users,
    badge: "24",
  },
  {
    title: "Programări",
    href: "/navigator/appointments",
    icon: Calendar,
    badge: "8",
  },
  {
    title: "Alerte",
    href: "/navigator/alerts",
    icon: AlertTriangle,
    badge: "3",
  },
  {
    title: "Mesaje",
    href: "/navigator/messages",
    icon: MessageSquare,
    badge: "12",
  },
  {
    title: "Rapoarte",
    href: "/navigator/reports",
    icon: BarChart3,
    badge: null,
  },
]

const quickActions = [
  {
    title: "Pacient Nou",
    href: "/navigator/patients/new",
    icon: UserPlus,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Programare Nouă",
    href: "/navigator/appointments/new",
    icon: CalendarPlus,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Apel Urgent",
    href: "/navigator/emergency-call",
    icon: Phone,
    color: "bg-red-500 hover:bg-red-600",
  },
]

const recentPatients = [
  { name: "Maria Popescu", status: "critical", lastSeen: "2h" },
  { name: "Ion Georgescu", status: "stable", lastSeen: "4h" },
  { name: "Ana Dumitrescu", status: "follow-up", lastSeen: "1d" },
]

export function NavigatorSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">OncoLink Navigator</span>
            <span className="text-xs text-muted-foreground">Portal Navigator</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          {/* Quick Actions */}
          <div className="p-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Acțiuni Rapide
            </h4>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Button
                  key={action.href}
                  asChild
                  size="sm"
                  className={cn("w-full justify-start text-white", action.color)}
                >
                  <Link href={action.href}>
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Main Navigation */}
          <SidebarMenu className="p-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Navigare</h4>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} className="w-full">
                  <Link href={item.href} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.title}
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <Separator />

          {/* Recent Patients */}
          <div className="p-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Pacienți Recenți
            </h4>
            <div className="space-y-2">
              {recentPatients.map((patient, index) => (
                <Button key={index} variant="ghost" size="sm" className="w-full justify-start h-auto p-2" asChild>
                  <Link href={`/navigator/patients/${index + 1}`}>
                    <div className="flex items-center w-full">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full mr-3",
                          patient.status === "critical"
                            ? "bg-red-500"
                            : patient.status === "stable"
                              ? "bg-green-500"
                              : "bg-yellow-500",
                        )}
                      />
                      <div className="flex-1 text-left">
                        <p className="text-xs font-medium truncate">{patient.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {patient.lastSeen}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* System Status */}
          <div className="p-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Status Sistem</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center">
                  <Activity className="h-3 w-3 mr-2 text-green-500" />
                  Sistem Online
                </span>
                <Badge variant="outline" className="text-xs">
                  99.9%
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center">
                  <Heart className="h-3 w-3 mr-2 text-red-500" />
                  Monitorizare Activă
                </span>
                <Badge variant="outline" className="text-xs">
                  24/7
                </Badge>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold">DN</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">Dr. Navigator</span>
              <span className="text-xs text-muted-foreground">Navigator Medical</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
