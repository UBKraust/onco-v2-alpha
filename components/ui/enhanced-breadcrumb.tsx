"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

const pathLabels: Record<string, string> = {
  patient: "Pacient",
  "medical-file": "Dosar Medical",
  appointments: "Programări",
  symptoms: "Simptome",
  messages: "Mesaje",
  navigator: "Navigator",
  dashboard: "Dashboard",
}

export function EnhancedBreadcrumb() {
  const pathname = usePathname()

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Acasă", href: "/" }]

    let currentPath = ""
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      const isActive = index === segments.length - 1

      breadcrumbs.push({
        label,
        href: currentPath,
        isActive,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  if (breadcrumbs.length <= 1) return null

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
    >
      {breadcrumbs.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center"
        >
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}

          {item.isActive ? (
            <span className="font-medium text-gray-900 flex items-center gap-1">
              {index === 0 && <Home className="h-4 w-4" />}
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "hover:text-blue-600 transition-colors flex items-center gap-1",
                "hover:underline underline-offset-2",
              )}
            >
              {index === 0 && <Home className="h-4 w-4" />}
              {item.label}
            </Link>
          )}
        </motion.div>
      ))}
    </motion.nav>
  )
}
