"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type DemoRole = "patient" | "navigator" | "admin"

interface DemoRoleState {
  demoMode: boolean
  currentDemoRole: DemoRole
  setDemoMode: (enabled: boolean) => void
  setDemoRole: (role: DemoRole) => void
  toggleDemoMode: () => void
}

export const useDemoRole = create<DemoRoleState>()(
  persist(
    (set, get) => ({
      demoMode: false,
      currentDemoRole: "patient",
      setDemoMode: (enabled) => set({ demoMode: enabled }),
      setDemoRole: (role) => set({ currentDemoRole: role }),
      toggleDemoMode: () => set({ demoMode: !get().demoMode }),
    }),
    {
      name: "oncolink-demo-role",
    },
  ),
)

// Hook actualizat pentru detectarea rolului cu suport demo
export function useCurrentRole() {
  const { demoMode, currentDemoRole } = useDemoRole()

  // În modul demo, folosește rolul selectat
  if (demoMode) {
    return {
      currentRole: currentDemoRole,
      isDemoMode: true,
      // ... restul funcționalităților
    }
  }

  // Logica originală pentru detectarea rolului din rută
  // ... cod existent
}
