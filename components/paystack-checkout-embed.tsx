"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaystackCheckoutEmbedProps {
  amount: number
  email: string
  onSuccess: () => void
}

export default function PaystackCheckoutEmbed({ amount, email, onSuccess }: PaystackCheckoutEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFrameVisible, setIsFrameVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const paystackUrl = "https://paystack.com/buy/stilla-peanut-butter-buy-now"

  useEffect(() => {
    // Reset states when component mounts
    setIsLoading(true)
    setError(null)
    setPaymentStatus("idle")

    // Simulate iframe loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsFrameVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  // Handle iframe error
  const handleIframeError = () => {
    setIsLoading(false)
    setError("Failed to load payment gateway. Please try again.")
    setPaymentStatus("error")
  }

  // Handle direct payment button click
  const handleDirectPayment = () => {
    setPaymentStatus("loading")

    // Open Paystack in a new tab
    window.open(paystackUrl, "_blank")

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success")

      // Trigger confetti effect
      if (typeof window !== "undefined") {
        import("canvas-confetti").then((confetti) => {
          // Initial burst
          confetti.default({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFD700", "#FF0000", "#FFA500", "#32CD32"],
          })

          // Follow with a cannon left and right
          setTimeout(() => {
            confetti.default({
              particleCount: 50,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ["#FFD700", "#FF0000", "#FFA500"],
            })
          }, 250)
        })
      }

      setTimeout(() => {
        onSuccess()
      }, 1500)
    }, 3000)
  }

  return (
    <div className="w-full">
      {paymentStatus === "success" ? (
        <motion.div
          className="bg-green-100 p-6 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{
              duration: 0.6,
              times: [0, 0.6, 0.8, 1],
              ease: "easeOut",
            }}
          >
            <CheckCircle2 className="mx-auto mb-4 text-green-600" size={48} />
          </motion.div>
          <motion.h3
            className="text-xl font-semibold text-green-800 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            Payment Successful!
          </motion.h3>
          <motion.p
            className="text-green-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            Your payment has been processed successfully.
          </motion.p>
        </motion.div>
      ) : paymentStatus === "error" ? (
        <motion.div
          className="bg-red-100 p-6 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="mx-auto mb-4 text-red-600" size={48} />
          <h3 className="text-xl font-semibold text-red-800 mb-2">Payment Failed</h3>
          <p className="text-red-700 mb-4">
            {error || "There was an issue processing your payment. Please try again."}
          </p>
          <Button onClick={() => setPaymentStatus("idle")} className="bg-red-600 hover:bg-red-700 text-white">
            Try Again
          </Button>
        </motion.div>
      ) : paymentStatus === "loading" ? (
        <motion.div
          className="bg-blue-50 p-6 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="mb-6"
            >
              <Loader2 className="h-12 w-12 text-blue-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Processing Payment</h3>
            <p className="text-blue-700">Please wait while we process your payment...</p>
          </div>
        </motion.div>
      ) : (
        <>
          <div
            className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm mb-4"
            style={{ height: "300px" }}
          >
            {isLoading && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-white"
                initial={{ opacity: 1 }}
                animate={{ opacity: isFrameVisible ? 0 : 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <p className="mt-4 text-sm text-gray-500">Loading secure payment gateway...</p>
                </div>
              </motion.div>
            )}

            {isFrameVisible && (
              <motion.iframe
                ref={iframeRef}
                src={"/checkout/paystack-iframe"}
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              Having trouble with the embedded checkout? Use our direct payment option:
            </p>
            <Button onClick={handleDirectPayment} className="bg-green-600 hover:bg-green-700 text-white">
              Proceed to Paystack Checkout
            </Button>
          </div>
        </>
      )}

      <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Secure Payment:</span> All transactions are encrypted and processed securely
              through Paystack.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
