import type React from "react"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  )
}
