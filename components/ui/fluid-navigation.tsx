"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { User, FileText, Calendar, MessageSquare, Activity, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
  badge?: string
}

const patientNavigation: NavigationItem[] = [
  {
    id: "overview",
    label: "Prezentare generală",
    href: "/patient",
    icon: User,
    description: "Informații generale și activitate recentă",
  },
  {
    id: "medical-file",
    label: "Dosar medical",
    href: "/patient/medical-file",
    icon: FileText,
    description: "Istoricul medical complet și documente",
  },
  {
    id: "appointments",
    label: "Programări",
    href: "/patient/appointments",
    icon: Calendar,
    description: "Programări viitoare și istoricul consultațiilor",
  },
  {
    id: "symptoms",
    label: "Monitorizare simptome",
    href: "/patient/symptoms",
    icon: Activity,
    description: "Înregistrarea și urmărirea simptomelor",
  },
  {
    id: "messages",
    label: "Mesaje",
    href: "/patient/messages",
    icon: MessageSquare,
    description: "Comunicare cu echipa medicală",
    badge: "3",
  },
]

export function FluidNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const currentItem = patientNavigation.find((item) => pathname.startsWith(item.href))
    if (currentItem) {
      setActiveItem(currentItem.id)
    }
  }, [pathname])

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navigation Sidebar */}
      <motion.nav
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-xl z-50",
          "lg:translate-x-0 lg:static lg:shadow-none lg:bg-white lg:backdrop-blur-none",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Portal Pacient</h2>
                <p className="text-sm text-gray-500">OncoLink</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4 space-y-2">
            {patientNavigation.map((item) => {
              const isActive = activeItem === item.id
              const Icon = item.icon

              return (
                <Link key={item.id} href={item.href} onClick={() => setIsOpen(false)} className="block">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative p-4 rounded-xl transition-all duration-200 group",
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm"
                        : "hover:bg-gray-50 border border-transparent",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          isActive
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-medium truncate", isActive ? "text-gray-900" : "text-gray-700")}>
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && <p className="text-xs text-gray-500 mt-1 truncate">{item.description}</p>}
                      </div>

                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isActive ? "text-blue-600" : "text-gray-400",
                          "group-hover:translate-x-1",
                        )}
                      />
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">OncoLink v2.0 • Suport medical integrat</div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}
