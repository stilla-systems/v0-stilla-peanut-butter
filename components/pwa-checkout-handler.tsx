"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function PWACheckoutHandler() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Check if we're in PWA mode
    const isInPWA = window.matchMedia("(display-mode: standalone)").matches

    // If we're in PWA mode and trying to access any checkout page except the Stillapay checkout
    if (isInPWA && pathname?.includes("/checkout") && !pathname?.includes("/checkout/stillapay-checkout")) {
      // Redirect to the Stillapay checkout page
      router.push("/checkout/stillapay-checkout")
    }
  }, [pathname, router])

  return null
}
