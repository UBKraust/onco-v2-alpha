"use client"

import { useState } from "react"
import { Bell, Search, Menu, X, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./theme-toggle"
import { useCurrentRole } from "@/hooks/use-current-role"

interface HeaderProps {
  onMenuToggle?: () => void
  isMenuOpen?: boolean
}

export function EnhancedHeader({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const { roleConfig, currentRole } = useCurrentRole()

  const notificationCount = 3

  return (
    <>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium"
        aria-label="Sari la conținutul principal"
      >
        Sari la conținut
      </a>

      <header
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-200"
        role="banner"
        aria-label="Antet principal aplicație"
      >
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onMenuToggle}
              aria-label={isMenuOpen ? "Închide meniul de navigare" : "Deschide meniul de navigare"}
              aria-expanded={isMenuOpen}
              aria-controls="main-navigation"
              aria-haspopup="true"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>

            {/* Logo */}
            <div className="flex items-center gap-2" role="img" aria-label="Logo OncoLink">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm" aria-hidden="true">
                  OL
                </span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">OncoLink</h1>
                <p className="text-xs text-muted-foreground">
                  {currentRole === "navigator" ? "Navigator Dashboard" : roleConfig.displayName}
                </p>
              </div>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-4" role="search" aria-label="Căutare globală">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                placeholder={
                  currentRole === "navigator" ? "Caută pacienți, documente, mesaje..." : "Caută pacienți, documente..."
                }
                className="pl-10 bg-muted/50 border-0 focus:bg-background transition-colors duration-200"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                aria-label="Câmp de căutare"
                aria-describedby="search-description"
                role="searchbox"
                aria-autocomplete="list"
                aria-expanded={searchOpen}
              />
              <div id="search-description" className="sr-only">
                Introduceți termenii de căutare pentru a găsi pacienți, documente sau mesaje
              </div>
            </div>
          </div>

          {/* Right Section */}
          <nav className="flex items-center gap-2" role="navigation" aria-label="Acțiuni utilizator">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Notificări. ${notificationCount} notificări noi`}
              aria-describedby="notification-count"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {notificationCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  aria-hidden="true"
                >
                  {notificationCount}
                </Badge>
              )}
              <span id="notification-count" className="sr-only">
                {notificationCount} notificări noi
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                  aria-label="Meniu utilizator"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="/avatar-placeholder.png"
                      alt={`Avatar utilizator ${
                        currentRole === "patient"
                          ? "Maria Popescu"
                          : currentRole === "navigator"
                            ? "Dr. Ana Ionescu"
                            : "Admin User"
                      }`}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-blue-600 text-white">
                      {currentRole === "patient" ? "P" : currentRole === "navigator" ? "N" : "A"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount role="menu" aria-label="Opțiuni utilizator">
                <DropdownMenuLabel className="font-normal" role="none">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {currentRole === "patient"
                        ? "Maria Popescu"
                        : currentRole === "navigator"
                          ? "Dr. Ana Ionescu - Navigator"
                          : "Admin User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">{roleConfig.displayName}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" role="menuitem">
                  <User className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" role="menuitem">
                  <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Setări</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400" role="menuitem">
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Deconectare</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>
    </>
  )
}
