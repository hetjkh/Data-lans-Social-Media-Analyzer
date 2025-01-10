"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-[100%] m-4 flex items-center justify-start flex-wrap">
          <Sun className="relative dark:w-[0px] dark:h-[0px] h-[20px] w-[10%] p-1 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="relative h-[0px] w-[0px] dark:h-[20px] dark:w-[10%] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="relative w-[70%] text-left">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
