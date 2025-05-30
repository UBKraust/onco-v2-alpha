"use client"

import type React from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { ThemeProvider } from "@/components/theme-provider"

// Mock data providers for testing
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }

// Test data generators
export const generateMockPatient = (overrides = {}) => ({
  id: "1",
  name: "Test Patient",
  age: 45,
  condition: "Test Condition",
  status: "Active",
  phone: "+40 123 456 789",
  email: "test@example.com",
  address: "Test Address",
  cycle: "1/6",
  adherence: "90%",
  alerts: 1,
  wellbeing: "8.0/10",
  weight: "70 kg",
  height: "170 cm",
  bloodType: "O+",
  allergies: "None",
  cnp: "1234567890123",
  gender: "Male",
  dateOfBirth: "01.01.1979",
  emergencyContact: {
    name: "Emergency Contact",
    phone: "+40 123 456 790",
    relationship: "Spouse",
  },
  ...overrides,
})

// Mock API responses
export const mockApiResponses = {
  patient: generateMockPatient(),
  appointments: [
    {
      id: "1",
      date: "2024-02-01",
      time: "10:00",
      type: "Consultation",
      doctor: "Dr. Smith",
      status: "scheduled",
    },
  ],
  treatments: [
    {
      id: "1",
      name: "Chemotherapy",
      cycle: "4/6",
      nextDate: "2024-02-15",
      status: "active",
    },
  ],
}
