"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  asChild?: boolean
  href?: string
}

export default function AnimatedButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  disabled = false,
  type = "button",
  asChild = false,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
      <Button
        className={cn(className)}
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled}
        type={type}
        asChild={asChild}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}
