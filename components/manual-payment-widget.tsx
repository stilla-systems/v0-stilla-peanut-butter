"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Copy, CheckCircle2, X, Phone, CreditCard } from "lucide-react"
import AnimatedButton from "@/components/animated-button"
import { usePathname } from "next/navigation"

export default function ManualPaymentWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [ussdCopied, setUssdCopied] = useState(false)
  const [accountCopied, setAccountCopied] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Only show widget when visitor is on checkout page for 10 seconds
    if (pathname?.includes("/checkout")) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 10000) // 10 seconds

      return () => clearTimeout(timer)
    } else {
      // Hide widget if not on checkout page
      setIsVisible(false)
    }
  }, [pathname])

  const handleClose = () => {
    setIsVisible(false)
  }

  const copyUssdCode = () => {
    navigator.clipboard.writeText("*415*1137#")
    setUssdCopied(true)
    setTimeout(() => setUssdCopied(false), 2000)
  }

  const copyAccountNumber = () => {
    navigator.clipboard.writeText("Stillapay")
    setAccountCopied(true)
    setTimeout(() => setAccountCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-amber-200"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-400 rounded-full opacity-20"></div>

            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-red-600 p-3 sm:p-4 text-white">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base sm:text-lg flex items-center text-white">
                  <Phone className="mr-2 h-4 w-4" /> Payment Options
                </h3>
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors p-2 sm:p-3 rounded-full hover:bg-white/10 touch-manipulation"
                  aria-label="Close payment options"
                  style={{ minHeight: "44px", minWidth: "44px" }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content - Simplified Layout */}
            <div className="p-4 sm:p-5">
              <div className="space-y-4 sm:space-y-5">
                {/* Option 1: Automatic Payment */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 sm:p-4 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-800 mb-2 sm:mb-3 flex items-center">
                    <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                      1
                    </span>
                    Automatic Payment (Recommended)
                  </h4>
                  <p className="text-green-700 text-xs sm:text-sm mb-3 sm:mb-4">
                    The fastest way to complete your purchase securely.
                  </p>
                  <AnimatedButton
                    className="bg-green-600 hover:bg-green-700 text-white font-bold w-full text-sm py-2 sm:py-3"
                    asChild
                  >
                    <Link href="/checkout/stillapay-checkout" className="flex items-center justify-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay Now with Stillapay
                    </Link>
                  </AnimatedButton>
                </div>

                {/* Option 2: Manual Payment */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2 sm:mb-3 flex items-center">
                    <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                      2
                    </span>
                    Manual Payment
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div>
                      <p className="text-xs text-blue-700 mb-1 sm:mb-2">USSD Code:</p>
                      <div className="flex items-center">
                        <div className="font-mono text-xs sm:text-sm font-bold text-blue-800 bg-white px-2 sm:px-3 py-2 rounded-md">
                          *415*1137#
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={copyUssdCode}
                          className="ml-2 text-blue-600 hover:text-blue-800 p-2"
                        >
                          {ussdCopied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                        </motion.button>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-blue-700 mb-1 sm:mb-2">Merchant Name:</p>
                      <div className="flex items-center">
                        <div className="font-mono text-xs sm:text-sm font-bold text-blue-800 bg-white px-2 sm:px-3 py-2 rounded-md">
                          Stillapay
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={copyAccountNumber}
                          className="ml-2 text-blue-600 hover:text-blue-800 p-2"
                        >
                          {accountCopied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <AnimatedButton
                    variant="outline"
                    className="w-full border-blue-600 text-blue-700 hover:bg-blue-50 text-xs sm:text-sm py-2 sm:py-3"
                    onClick={() => {}}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    View Manual Payment Details
                  </AnimatedButton>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClose}
                  className="text-xs text-gray-500 hover:text-gray-700 underline flex items-center justify-center w-full mt-2 py-2"
                >
                  I'll pay later
                </motion.button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 border-t border-gray-200">
              <div className="flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/324-3247748_mobile-money-logo-png-transparent-png-4x1tWstOkHbFCoJa13xdKuwUsW6WTV.png"
                  alt="Payment Options - Visa, Mastercard, MTN Mobile Money, Vodafone Cash, Airtel Money, Tigo Cash"
                  className="h-8 sm:h-10 object-contain w-full"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
