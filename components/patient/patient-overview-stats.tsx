"use client"

import { useState, useEffect } from "react"
import { Activity, Calendar, FileText, AlertTriangle } from "lucide-react"
import { OverviewStatsSkeleton } from "./skeletons/overview-stats-skeleton"

export function PatientOverviewStats() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState([
    {
      title: "Aderență Tratament",
      value: "92%",
      change: "+4%",
      trend: "up",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Programări Viitoare",
      value: "3",
      change: "Următoarea: 22 Ian",
      trend: "neutral",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Documente Recente",
      value: "5",
      change: "3 noi săptămâna aceasta",
      trend: "up",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Alerte Active",
      value: "2",
      change: "1 prioritate înaltă",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ])

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <OverviewStatsSkeleton />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</h3>
              <div className={`p-2 rounded-full ${stat.bgColor} dark:bg-opacity-20`}>
                <IconComponent className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{stat.change}</span>
              <div className="flex items-center gap-1">
                {stat.trend === "up" && <span className="text-green-500">↑</span>}
                {stat.trend === "down" && <span className="text-red-500">↓</span>}
                {stat.trend === "neutral" && <span className="text-gray-500">→</span>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
