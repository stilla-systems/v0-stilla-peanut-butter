"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gift, Trophy, Phone, AlertCircle, Sparkles, Loader2, X } from "lucide-react"
import PromoCountdown from "@/components/promo-countdown"
import confetti from "canvas-confetti"

export default function SpecialPromoPage() {
  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<null | { success: boolean; message: string; prize?: string }>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const festivityName = "Christmas" // Define the festivity name

  // List of valid promo codes
  const validCodes = {
    // Grand Prize codes
    GDA1B2C3: `Luxury stay at Mövenpick Hotel for Easter`,
    GD4E5F6: `Luxury stay at Mövenpick Hotel for Christmas`,

    // Free peanut butter codes (sample of PB codes)
    PBA1B2C3: "Free Stilla Peanut Butter",
    PBD4E5F6: "Free Stilla Peanut Butter",
    PBG7H8I9: "Free Stilla Peanut Butter",

    // AIR20 codes (sample)
    ARA1B2C3: "20 cedis airtime",
    ARD4E5F6: "20 cedis airtime",

    // AIR10 codes (sample)
    MBA1B2C3: "10 cedis airtime",
    MBD4E5F6: "10 cedis airtime",

    // DATA10 codes (sample)
    A7B9C2D5: "10 cedis data bundle",
    Z3L8K7T2: "10 cedis data bundle",

    // Better luck codes
    BETTER1: "Better luck next time",
    TRYLUCK1: "Better luck next time",

    // Original codes for backward compatibility
    FREEPB01: "Free Stilla Peanut Butter",
    FREEPB02: "Free Stilla Peanut Butter",
    AIRTIME5: "5 cedis airtime",
    AIRTIME10: "10 cedis airtime",
    AIRTIME20: "20 cedis airtime",
    GOLDENWIN: `Luxury stay at Mövenpick Hotel for ${festivityName}`,
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code.trim()) return

    setIsSubmitting(true)
    setResult(null)

    // Simulate API call
    setTimeout(() => {
      const codeUpper = code.toUpperCase()
      if (validCodes[codeUpper]) {
        setResult({
          success: true,
          message: `Congratulations! You've won ${validCodes[codeUpper]}! ${
            validCodes[codeUpper].includes("Mövenpick Hotel")
              ? `Our team will contact you within 24 hours to arrange your ${festivityName} prize.`
              : "We'll send your code to your phone shortly."
          }`,
          prize: validCodes[codeUpper],
        })
        triggerConfetti()
      } else {
        setResult({
          success: false,
          message: "Sorry, this code is invalid or has already been redeemed. Please check your code and try again.",
        })
      }

      setIsSubmitting(false)

      // Scroll to result if on mobile
      if (window.innerWidth < 768 && formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 1500)
  }

  const triggerConfetti = () => {
    if (typeof window !== "undefined") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  return (
    <main className="pt-16 pb-16">
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-block"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/34229_83932-ZXRgya4HjvevLOSD8ZJ2Uu695FAS2G.gif"
                alt="Special Offer"
                width={300}
                height={150}
                className="object-contain"
              />
            </motion.div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">Christmas Special Promotion</h1>
            <p className="text-xl mb-8">
              Buy any Stilla Peanut Butter product from November 1st to December 20th and win amazing prizes, including
              a luxurious Christmas stay at the Mövenpick Hotel!
            </p>
            <div className="bg-white/10 rounded-lg p-6 inline-block">
              <p className="text-lg font-semibold mb-2">Promotion Ends In:</p>
              <PromoCountdown targetDate="2023-12-20T23:59:59" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="mb-12"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/409892_913826-HvUjiSoIsjfnnSaBFPgDIhFK2GJteo.webp"
                  alt="Christmas Promotion"
                  width={1000}
                  height={800}
                  className="w-full h-auto"
                />

                {/* Content overlaid on the frames */}
                <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center">
                  <div className="w-full md:w-1/2 p-4 md:p-8 md:pl-16 md:pr-4 flex flex-col items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md">
                      <h2 className="text-2xl font-bold text-red-600 mb-4">How It Works</h2>
                      <ol className="space-y-4">
                        <li className="flex items-start">
                          <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-0.5 flex-shrink-0">
                            1
                          </div>
                          <p>Purchase any Stilla Peanut Butter product from your local store or online.</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-0.5 flex-shrink-0">
                            2
                          </div>
                          <p>Find your unique promo code inside the package or under the lid.</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-0.5 flex-shrink-0">
                            3
                          </div>
                          <p>Enter your code in the form below to see if you've won!</p>
                        </li>
                      </ol>
                      <div className="mt-6">
                        <Button className="bg-red-600 hover:bg-red-700 text-white w-full" asChild>
                          <Link href="/checkout">Buy Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 p-4 md:p-8 md:pr-16 md:pl-4 flex flex-col items-center justify-center mt-8 md:mt-0">
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md">
                      <h2 className="text-2xl font-bold text-red-600 mb-4">Amazing Prizes</h2>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Trophy className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                          <p>
                            <span className="font-bold">Grand Prize:</span> Luxury Christmas stay at the Mövenpick Hotel
                          </p>
                        </li>
                        <li className="flex items-start">
                          <Gift className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <p>
                            <span className="font-bold">Second Prize:</span> Free jar of Stilla Peanut Butter
                          </p>
                        </li>
                        <li className="flex items-start">
                          <Phone className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <p>
                            <span className="font-bold">Instant Prizes:</span> 5, 10, or 20 cedis airtime vouchers
                          </p>
                        </li>
                      </ul>
                      <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-amber-800 text-sm">
                          <span className="font-bold">Tip:</span> Try codes like AIRTIME5, AIRTIME10, AIRTIME20,
                          FREESTILLA, or GOLDENWIN to test your luck!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-red-100"
                ref={formRef}
              >
                <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Enter Your Promo Code</h2>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-lg ${
                      result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-start">
                      {result.success ? (
                        <Sparkles className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
                      ) : (
                        <AlertCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" size={20} />
                      )}
                      <div>
                        <h3 className={`font-bold ${result.success ? "text-green-800" : "text-red-800"}`}>
                          {result.success ? "Congratulations!" : "Invalid Code"}
                        </h3>
                        <p className={result.success ? "text-green-700" : "text-red-700"}>{result.message}</p>
                        {result.success && result.prize && (
                          <div className="mt-3 p-2 bg-white rounded-md inline-block">
                            <span className="font-semibold text-amber-700">Your Prize: {result.prize}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="promoCode" className="text-gray-700 font-medium">
                      Your Promo Code
                    </Label>
                    <div className="mt-1 relative">
                      <Input
                        id="promoCode"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter your code (e.g., GOLDENWIN)"
                        className="pr-10"
                        disabled={isSubmitting}
                      />
                      {code && (
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setCode("")}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-2"
                      disabled={!code.trim() || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        "Check My Code"
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-500 text-sm">
                    Don't have a code yet?{" "}
                    <Link href="/checkout" className="text-red-600 hover:underline">
                      Buy Stilla Peanut Butter
                    </Link>{" "}
                    to get your promo code!
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Don't Miss Your Chance to Win!</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Buy Stilla Peanut Butter today and enter our Christmas promotion for a chance to win amazing prizes,
            including a luxury stay at the Mövenpick Hotel!
          </p>
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold" asChild>
            <Link href="/checkout">Buy Stilla Peanut Butter</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
