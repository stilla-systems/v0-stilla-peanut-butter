"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Gift, Trophy, Phone, AlertCircle, MessageCircle } from "lucide-react"
import DynamicPromoCountdown from "@/components/dynamic-promo-countdown"
import { getCurrentFestivityName } from "@/utils/festivity-dates"
import { checkPromoCode } from "@/utils/promo-codes"

export default function PromotionsPage() {
  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<null | { success: boolean; message: string; prize?: string }>(null)
  const [festivityName, setFestivityName] = useState("Easter")

  useEffect(() => {
    setFestivityName(getCurrentFestivityName())
  }, [])

  // Update the handleSubmit function to handle the new prize types
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const checkResult = checkPromoCode(code)

      if (checkResult.valid) {
        if (checkResult.prizeType === "peanutButter") {
          setResult({
            success: true,
            message:
              "Congratulations! You've won a free jar of Stilla Peanut Butter! Please send your code to our WhatsApp support to claim your prize.",
            prize: "Free Stilla Peanut Butter",
          })
        } else if (checkResult.prizeType === "airtime") {
          setResult({
            success: true,
            message: `Congratulations! You've won ${checkResult.airtimeAmount} cedis airtime! Please send your code to our WhatsApp support to claim your prize.`,
            prize: `${checkResult.airtimeAmount} cedis airtime`,
          })
        } else if (checkResult.prizeType === "data") {
          setResult({
            success: true,
            message: `Congratulations! You've won ${checkResult.airtimeAmount} cedis data bundle! Please send your code to our WhatsApp support to claim your prize.`,
            prize: `${checkResult.airtimeAmount} cedis data bundle`,
          })
        } else if (checkResult.prizeType === "luxury") {
          setResult({
            success: true,
            message:
              checkResult.message ||
              `CONGRATULATIONS! You've won the GRAND PRIZE - a luxury stay at Mövenpick Hotel for ${festivityName}! Please send your code to our WhatsApp support to claim your prize.`,
            prize: `Luxury stay at Mövenpick Hotel for ${festivityName}`,
          })
        } else if (checkResult.prizeType === "betterLuck") {
          setResult({
            success: false,
            message:
              checkResult.message || "Better luck next time! Keep trying with more Stilla Peanut Butter purchases.",
          })
        }
      } else {
        setResult({
          success: false,
          message: "Sorry, this code is invalid or has already been redeemed. Please check your code and try again.",
        })
      }

      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <main className="pt-16 pb-16">
      <section className="bg-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">Christmas Promotion</h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
              Buy any Stilla Peanut Butter product and win amazing prizes, including a luxurious Christmas stay at the
              Mövenpick Hotel!
            </p>
            <div className="bg-white/10 rounded-lg p-4 sm:p-6 inline-block">
              <DynamicPromoCountdown />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900 mb-6">How It Works</h2>
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">Buy Stilla Peanut Butter</h3>
                      <p className="text-gray-700">
                        Purchase any Stilla Peanut Butter product from your local store or online.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">Find Your Promo Code</h3>
                      <p className="text-gray-700">
                        Look for the unique promo code inside the package or under the lid of your Stilla Peanut Butter
                        jar.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">Enter Your Code</h3>
                      <p className="text-gray-700">
                        Enter your promo code in the form on this page to see if you've won one of our amazing prizes!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">Claim Your Prize</h3>
                      <p className="text-gray-700">
                        Send your winning code to our WhatsApp support at +233597397912 to claim your prize!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h3 className="font-semibold text-amber-900 mb-2">Christmas Special Offer!</h3>
                  <p className="text-gray-700 mb-4">
                    Don't miss your chance to win! Buy Stilla Peanut Butter today and enter our Christmas promotion.
                  </p>
                  <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
                    <Link href="/checkout/stillapay-checkout">Buy Now</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900 mb-6">Enter Your Promo Code</h2>

                {result && (
                  <Alert
                    className={`mb-6 ${
                      result.success
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="text-base sm:text-lg">
                      {result.success ? "Congratulations!" : "Invalid Code"}
                    </AlertTitle>
                    <AlertDescription className="text-sm sm:text-base">{result.message}</AlertDescription>
                    {result.success && result.prize && (
                      <div className="mt-4 p-3 bg-white rounded-md flex items-center">
                        <Trophy className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                        <span className="font-semibold text-sm sm:text-base">Your Prize: {result.prize}</span>
                      </div>
                    )}

                    {result.success && (
                      <div className="mt-4 w-full">
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center w-full sm:w-auto"
                          onClick={() =>
                            window.open(
                              `https://wa.me/233597397912?text=Hi! I won a prize with code: ${code.toUpperCase()}. Please help me claim it.`,
                              "_blank",
                            )
                          }
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Contact WhatsApp Support to Claim
                        </Button>
                      </div>
                    )}
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 bg-amber-50 p-4 sm:p-6 rounded-lg">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium mb-2 text-amber-900">
                      Your Promo Code
                    </label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="Enter your code (e.g., GOLDENWIN1)"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Checking..." : "Check My Code"}
                  </Button>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-4">Prizes You Can Win</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                      <div className="bg-amber-100 p-2 rounded-full mr-4 flex-shrink-0">
                        <Trophy className="h-5 w-5 text-amber-900" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900">Grand Prize</h4>
                        <p className="text-gray-700">Luxury {festivityName} stay at the Mövenpick Hotel</p>
                      </div>
                    </div>

                    <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                      <div className="bg-amber-100 p-2 rounded-full mr-4 flex-shrink-0">
                        <Gift className="h-5 w-5 text-amber-900" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900">Free Product</h4>
                        <p className="text-gray-700">Free jar of Stilla Peanut Butter</p>
                      </div>
                    </div>

                    <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                      <div className="bg-amber-100 p-2 rounded-full mr-4 flex-shrink-0">
                        <Phone className="h-5 w-5 text-amber-900" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900">Airtime Vouchers</h4>
                        <p className="text-gray-700">5, 10, or 20 cedis airtime for your mobile phone</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-8 text-center">Terms and Conditions</h2>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Promotion Period</h3>
                  <p className="text-gray-700">
                    The promotion runs for two months leading up to each festivity (Easter). All entries must be
                    submitted before the festivity date.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Eligibility</h3>
                  <p className="text-gray-700">
                    The promotion is open to all customers who purchase any Stilla Peanut Butter product during the
                    promotion period. Employees of Stilla Trading and their immediate family members are not eligible to
                    participate.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Prize Redemption</h3>
                  <p className="text-gray-700">
                    Prizes must be claimed within 30 days of winning notification. The grand prize (Mövenpick Hotel
                    stay) must be redeemed during the festivity period. Airtime vouchers will be sent directly to the
                    winner's mobile phone number after verification via WhatsApp.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">General Conditions</h3>
                  <p className="text-gray-700">
                    Stilla Trading reserves the right to substitute any prize with another of equivalent value without
                    giving notice. By entering this promotion, participants agree to be bound by these terms and
                    conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Don't Miss Your Christmas Chance to Win!</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Buy Stilla Peanut Butter today and enter our Christmas promotion for a chance to win amazing prizes,
            including a luxury stay at the Mövenpick Hotel!
          </p>
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold" asChild>
            <Link href="/checkout/stillapay-checkout">Buy Stilla Peanut Butter</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
