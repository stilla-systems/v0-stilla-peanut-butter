"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export default function LaunchAnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    // Check if the banner has been shown in this session
    const bannerShown = sessionStorage.getItem("launchBannerShown")

    if (!bannerShown) {
      // Show the banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
        setHasBeenShown(true)
        sessionStorage.setItem("launchBannerShown", "true")
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setHasBeenShown(true)
    }
  }, [])

  // Measure content height to ensure proper sizing
  useEffect(() => {
    if (contentRef.current && isVisible) {
      // Add a small padding to ensure no clipping
      setContentHeight(contentRef.current.scrollHeight + 24)

      // Set up resize observer to handle window resizing
      const resizeObserver = new ResizeObserver(() => {
        if (contentRef.current) {
          setContentHeight(contentRef.current.scrollHeight + 24)
        }
      })

      resizeObserver.observe(contentRef.current)

      return () => {
        if (contentRef.current) {
          resizeObserver.unobserve(contentRef.current)
        }
      }
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
          <motion.div
            className="w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 pointer-events-auto"
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.6,
            }}
          >
            <div
              className="relative bg-white/80 backdrop-blur-md rounded-b-lg shadow-lg border border-amber-200/50 overflow-hidden"
              style={{ minHeight: `${Math.max(contentHeight, 200)}px` }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-amber-900/60 hover:text-amber-900 transition-colors"
                aria-label="Close announcement"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div ref={contentRef} className="flex flex-col items-center justify-center h-full p-4 sm:p-6 text-center">
                <div className="bg-amber-100/50 px-4 py-1 rounded-full text-amber-800 text-xs font-medium mb-3">
                  PRE-LAUNCH
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-2 sm:mb-3">
                  Service Launch Announcement
                </h2>
                <p className="text-sm sm:text-base text-amber-800 max-w-lg mx-auto leading-relaxed">
                  Stilla Peanut Butter is currently in pre-launch. Our full suite of services will go live on{" "}
                  <span className="font-semibold">September 1st, 2026</span>. We invite you to explore the site in preview
                  mode while we finalize our platform to deliver a seamless, professional-grade shopping experience.
                </p>
                <div className="mt-4 sm:mt-5">
                  <button
                    onClick={handleClose}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Continue to Preview
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
