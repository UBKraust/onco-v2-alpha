"use client"

import type React from "react"

import { useState } from "react"
import { EnhancedHeader } from "@/components/ui/enhanced-header"
import { DarkModeSidebar } from "@/components/ui/dark-mode-sidebar"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} isMenuOpen={sidebarOpen} />
      <div className="flex">
        <DarkModeSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6 md:ml-0 transition-all duration-300">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  )
}
