"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import PaystackLogoRemover from "@/components/paystack-logo-remover"
import SuccessAnimation from "@/components/success-animation"
import StillapayLoader from "@/components/stillapay-loader"

export default function StillapayCheckoutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [viewportHeight, setViewportHeight] = useState("100vh")
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const iframeUrl = "https://paystack.com/buy/stilla-peanut-butter-buy-now"

  // Calculate viewport height on mount and resize
  useEffect(() => {
    const updateViewportHeight = () => {
      // Subtract any potential browser chrome (especially on mobile)
      const vh = window.innerHeight
      setViewportHeight(`${vh}px`)

      // Also update any iframe container if needed
      if (iframeRef.current) {
        iframeRef.current.style.height = `${vh - 50}px` // Subtract header height
      }
    }

    updateViewportHeight()
    window.addEventListener("resize", updateViewportHeight)

    // Handle orientation change specifically for mobile
    window.addEventListener("orientationchange", () => {
      setTimeout(updateViewportHeight, 100) // Small delay to ensure accurate calculation
    })

    return () => {
      window.removeEventListener("resize", updateViewportHeight)
      window.removeEventListener("orientationchange", updateViewportHeight)
    }
  }, [])

  // Simulate iframe loading with a minimum display time for the loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Show loader for at least 3 seconds for branding impact
    return () => clearTimeout(timer)
  }, [])

  // Listen for payment success message
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.status === "success") {
        setShowSuccessAnimation(true)

        // Trigger confetti effect
        if (typeof window !== "undefined") {
          import("canvas-confetti").then((confetti) => {
            confetti.default({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#FFD700", "#FF0000", "#FFA500", "#32CD32"],
            })
          })
        }
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <div className="relative bg-amber-50 overflow-hidden" style={{ height: viewportHeight }}>
      {/* Back button - absolute positioned to not affect layout */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/"
          className="flex items-center text-amber-900 hover:text-amber-700 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-md"
          style={{ minHeight: "36px" }} // Ensure good touch target size
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>

      {/* Branded loading animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StillapayLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen iframe */}
      <div
        className="w-full h-full"
        style={{
          visibility: isLoading ? "hidden" : "visible",
          height: viewportHeight,
        }}
      >
        <iframe
          ref={iframeRef}
          src={iframeUrl}
          className="w-full h-full border-0"
          style={{ height: viewportHeight }}
          frameBorder="0"
          allow="payment"
          title="Stillapay Payment Gateway"
        />
        <PaystackLogoRemover />
      </div>

      {/* Success animation overlay */}
      <SuccessAnimation show={showSuccessAnimation} />
    </div>
  )
}
