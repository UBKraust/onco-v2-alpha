import type React from "react"
import { NavigatorSidebar } from "@/components/navigator/navigator-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function NavigatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <NavigatorSidebar />
      <SidebarInset>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
