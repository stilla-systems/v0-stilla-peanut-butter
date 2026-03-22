"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gift, X, Sparkles, AlertCircle, Loader2 } from "lucide-react"
import confetti from "canvas-confetti"

interface PromoCodeCheckerProps {
  onClose: () => void
  onApply: (code: string, discount: number) => void
}

export default function PromoCodeChecker({ onClose, onApply }: PromoCodeCheckerProps) {
  const [code, setCode] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<{ valid: boolean; message: string; discount?: number } | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Update the handleCheckCode function to include the new promo codes
  const handleCheckCode = () => {
    if (!code.trim()) return

    setIsChecking(true)
    setResult(null)

    // Simulate API call to check promo code
    setTimeout(() => {
      const upperCode = code.toUpperCase()

      // Grand Prize codes
      if (upperCode === "GDA1B2C3" || upperCode === "GD4E5F6") {
        const festivity = upperCode === "GDA1B2C3" ? "Easter" : "Christmas"
        setResult({
          valid: true,
          message: `CONGRATULATIONS! You've won the GRAND PRIZE - a luxury stay at Mövenpick Hotel for ${festivity}!`,
          discount: 100, // Special value for grand prize
        })
        // Trigger confetti effect on success
        if (typeof window !== "undefined") {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ["#FFD700", "#FFA500", "#FF4500"],
          })
        }
      }
      // Free Jar codes (PB prefix)
      else if (upperCode.startsWith("PB")) {
        setResult({
          valid: true,
          message: "Congratulations! You've won a free jar of Stilla Peanut Butter!",
          discount: 45, // Value of a jar
        })
        // Trigger confetti effect on success
        if (typeof window !== "undefined") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        }
      }
      // AIR20 codes (AR prefix)
      else if (upperCode.startsWith("AR")) {
        setResult({
          valid: true,
          message: "Congratulations! You've won 20 cedis airtime!",
          discount: 20,
        })
        // Trigger confetti effect on success
        if (typeof window !== "undefined") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        }
      }
      // AIR10 codes (MB prefix)
      else if (upperCode.startsWith("MB")) {
        setResult({
          valid: true,
          message: "Congratulations! You've won 10 cedis airtime!",
          discount: 10,
        })
        // Trigger confetti effect on success
        if (typeof window !== "undefined") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        }
      }
      // Original codes for backward compatibility
      else if (upperCode === "XMAS10") {
        setResult({
          valid: true,
          message: "10% discount applied to your order!",
          discount: 10,
        })
        // Trigger confetti effect on success
        if (typeof window !== "undefined") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        }
      } else if (upperCode === "STILLA20") {
        setResult({
          valid: true,
          message: "20% discount applied to your order!",
          discount: 20,
        })
        // Trigger confetti effect on success
        if (typeof window !== "undefined") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        }
      } else if (upperCode === "FREESHIP") {
        setResult({
          valid: true,
          message: "Free shipping applied to your order!",
          discount: 10, // Assuming shipping cost is 10 GHC
        })
        // Trigger confetti effect on success
        if (typeof window !== "undefined") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        }
      } else {
        // Check if it's a DATA10 code (alphanumeric pattern)
        const dataCodePattern = /^[A-Z0-9]{8}$/
        if (dataCodePattern.test(upperCode)) {
          setResult({
            valid: true,
            message: "Congratulations! You've won 10 cedis data bundle!",
            discount: 10,
          })
          // Trigger confetti effect on success
          if (typeof window !== "undefined") {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            })
          }
        } else {
          setResult({
            valid: false,
            message: "Invalid promo code. Please try again.",
          })
        }
      }
      setIsChecking(false)
    }, 1500)
  }

  const handleApply = () => {
    if (result?.valid && result.discount) {
      onApply(code.toUpperCase(), result.discount)
    }
  }

  return (
    <motion.div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={widgetRef}
        className="bg-white rounded-xl shadow-xl overflow-hidden max-w-md w-full relative"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-red-400 rounded-full opacity-20"></div>

        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-red-500 p-3 sm:p-4 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Gift className="mr-2 h-5 w-5" />
                <h3 className="font-bold text-base sm:text-lg">Promo Code</h3>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors focus:outline-none p-2"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <Label htmlFor="promoCode" className="text-sm font-medium mb-1 block">
                Enter your promo code
              </Label>
              <div className="flex gap-2">
                <Input
                  id="promoCode"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g., XMAS10"
                  className="flex-1"
                  autoComplete="off"
                />
                <Button
                  onClick={handleCheckCode}
                  disabled={!code.trim() || isChecking}
                  className="bg-amber-500 hover:bg-amber-600 text-white min-w-[60px] px-2 sm:px-3"
                >
                  {isChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check"}
                </Button>
              </div>
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 ${
                  result.valid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-start">
                  {result.valid ? (
                    <Sparkles className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                  ) : (
                    <AlertCircle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                  )}
                  <p className={`text-sm ${result.valid ? "text-green-800" : "text-red-800"}`}>{result.message}</p>
                </div>
              </motion.div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} className="text-sm">
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                disabled={!result?.valid}
                className="bg-amber-500 hover:bg-amber-600 text-white text-sm"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Available promo codes hint */}
          <div className="bg-gray-50 p-3 sm:p-4 border-t border-gray-100">
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">Available promo codes:</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white p-2 rounded border border-gray-200 text-center text-xs">
                <span className="font-mono font-bold text-amber-600">XMAS10</span>
                <p className="text-xs text-gray-500">10% off</p>
              </div>
              <div className="bg-white p-2 rounded border border-gray-200 text-center text-xs">
                <span className="font-mono font-bold text-amber-600">STILLA20</span>
                <p className="text-xs text-gray-500">20% off</p>
              </div>
              <div className="bg-white p-2 rounded border border-gray-200 text-center text-xs">
                <span className="font-mono font-bold text-amber-600">FREESHIP</span>
                <p className="text-xs text-gray-500">Free shipping</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
