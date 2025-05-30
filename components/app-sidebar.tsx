import { Sidebar } from "@/components/ui/sidebar"
import { useCurrentRole } from "@/hooks/use-current-role"

export function AppSidebar() {
  const { currentRole, roleConfig } = useCurrentRole()

  return <Sidebar></Sidebar>
}
