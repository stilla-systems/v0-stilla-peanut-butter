"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookieConsent")
    if (!hasAccepted) {
      // Small delay to show the cookie consent after page load
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 pr-4 max-w-3xl">
                <p className="text-gray-700">
                  We use cookies to enhance your experience. By continuing to visit this site you agree to our use of
                  cookies.{" "}
                  <Link href="/cookie-policy" className="text-amber-600 underline hover:text-amber-800">
                    Learn more
                  </Link>
                </p>
              </div>
              <div className="flex space-x-4">
                <Button className="bg-amber-900 hover:bg-amber-800 text-white" onClick={acceptCookies}>
                  Accept All
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-900 text-amber-900 hover:bg-amber-900/10"
                  onClick={acceptCookies}
                >
                  Essential Only
                </Button>
                <Button variant="ghost" size="icon" onClick={acceptCookies} className="text-gray-500 hover:bg-gray-100">
                  <X size={20} />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
