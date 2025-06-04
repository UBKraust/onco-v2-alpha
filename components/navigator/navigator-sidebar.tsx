"use client"

import {
  Calendar,
  Users,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  FileText,
  Activity,
  Clock,
  Target,
  Phone,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navigatorRoutes = [
  {
    title: "Dashboard",
    url: "/navigator",
    icon: Activity,
  },
  {
    title: "Pacienți",
    url: "/navigator/patients",
    icon: Users,
  },
  {
    title: "Programări",
    url: "/navigator/appointments",
    icon: Calendar,
  },
  {
    title: "Mesaje",
    url: "/navigator/messages",
    icon: MessageSquare,
  },
  {
    title: "Onboarding Telefonic",
    url: "/patient/onboarding?source=callcenter",
    icon: Phone,
    badge: "Call Center",
    description: "Înregistrare pacienți prin telefon",
  },
  {
    title: "Alerte",
    url: "/navigator/alerts",
    icon: Bell,
  },
  {
    title: "Rapoarte",
    url: "/navigator/reports",
    icon: BarChart3,
  },
  {
    title: "Sarcini",
    url: "/navigator/tasks",
    icon: Clock,
  },
  {
    title: "Obiective",
    url: "/navigator/goals",
    icon: Target,
  },
  {
    title: "Documente",
    url: "/navigator/documents",
    icon: FileText,
  },
  {
    title: "Setări",
    url: "/navigator/settings",
    icon: Settings,
  },
]

export function NavigatorSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">Navigator Panel</h2>
          <p className="text-sm text-muted-foreground">Gestionează pacienții</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigare Principală</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigatorRoutes.map((route) => (
                <SidebarMenuItem key={route.url}>
                  <SidebarMenuButton asChild isActive={pathname === route.url}>
                    <Link href={route.url}>
                      <route.icon className="h-4 w-4" />
                      <span>{route.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-muted-foreground">Navigator Dashboard v2.0</div>
      </SidebarFooter>
    </Sidebar>
  )
}
