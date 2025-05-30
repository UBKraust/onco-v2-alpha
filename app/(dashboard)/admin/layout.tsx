import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DarkModeSidebar } from "@/components/ui/dark-mode-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-background to-purple-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20">
        <DarkModeSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 overflow-auto bg-gray-100/50 dark:bg-transparent">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
