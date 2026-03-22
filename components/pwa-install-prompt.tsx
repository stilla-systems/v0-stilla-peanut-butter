"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if on iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    // Check if already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    if (isStandalone) return

    // For non-iOS devices, use the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Only show after 5 seconds on the site
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000)
    }

    // For iOS devices, show instructions after 5 seconds
    if (isIOSDevice) {
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt && !isIOS) return

    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setShowPrompt(false)
      }
      setDeferredPrompt(null)
    }
  }

  const closePrompt = () => {
    setShowPrompt(false)
    // Don't show again for this session
    sessionStorage.setItem("pwa-prompt-dismissed", "true")
  }

  // Check if prompt was previously dismissed in this session
  useEffect(() => {
    const wasDismissed = sessionStorage.getItem("pwa-prompt-dismissed") === "true"
    if (wasDismissed) {
      setShowPrompt(false)
    }
  }, [])

  if (!showPrompt) return null

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-4 border border-amber-200/50"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 mr-3 bg-amber-100 rounded-full flex items-center justify-center">
                <img src="/images/stilla-peanut-butter.png" alt="Stilla" className="w-8 h-8 object-contain" />
              </div>
              <h3 className="font-bold text-amber-900">Install Stilla App</h3>
            </div>
            <button onClick={closePrompt} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          {isIOS ? (
            <div className="mb-3 text-sm text-gray-600">
              <p>To install this app on your iPhone:</p>
              <ol className="list-decimal pl-5 mt-1 space-y-1">
                <li>
                  Tap the share icon{" "}
                  <span className="inline-block w-5 h-5 bg-gray-200 rounded-md text-center leading-5">⎙</span>
                </li>
                <li>Scroll down and tap "Add to Home Screen"</li>
                <li>Tap "Add" in the top right</li>
              </ol>
            </div>
          ) : (
            <p className="mb-3 text-sm text-gray-600">
              Install our app for a better experience and offline access to Stilla Peanut Butter!
            </p>
          )}

          {!isIOS && (
            <Button onClick={handleInstall} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              Install App
            </Button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
