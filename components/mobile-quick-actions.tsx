"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Home, Gift, Info, Phone, ChevronUp } from "lucide-react"

export default function MobileQuickActions() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Only show on mobile devices
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      // Show after scrolling down a bit
      const handleScroll = () => {
        const scrollPosition = window.scrollY
        setIsVisible(scrollPosition > 300)
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Hide on desktop
  if (typeof window !== "undefined" && window.innerWidth >= 768) {
    return null
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const actionItems = [
    { icon: <Home size={20} />, label: "Home", href: "/" },
    { icon: <Gift size={20} />, label: "Promos", href: "/promotions" },
    { icon: <Info size={20} />, label: "About", href: "/about" },
    { icon: <Phone size={20} />, label: "Contact", href: "/contact" },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-28 right-4 z-40 flex flex-col items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {/* Expanded menu */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="mb-3 flex flex-col gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {actionItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={item.href}>
                      <motion.div
                        className="flex items-center bg-white shadow-md rounded-full px-4 py-2.5 touch-manipulation"
                        whileTap={{ scale: 0.95 }}
                        style={{ minHeight: "44px" }}
                      >
                        <span className="mr-2 text-amber-900">{item.icon}</span>
                        <span className="text-sm font-medium text-amber-900">{item.label}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={toggleExpanded}
              className="bg-amber-100 text-amber-900 rounded-full p-3 shadow-lg touch-manipulation"
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              style={{ minHeight: "48px", minWidth: "48px" }}
              aria-label={isExpanded ? "Close menu" : "Open menu"}
            >
              <ChevronUp size={24} />
            </motion.button>

            <Link href="/checkout/stillapay-checkout">
              <motion.button
                className="bg-red-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ minHeight: "48px", minWidth: "48px" }}
                aria-label="Checkout"
              >
                <ShoppingBag size={24} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
