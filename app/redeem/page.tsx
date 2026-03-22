"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Gift, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RedeemPage() {
  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<null | { success: boolean; message: string }>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll consider codes starting with "WIN" as winners
      if (code.toUpperCase().startsWith("WIN")) {
        setResult({
          success: true,
          message:
            "Congratulations! You've won a free jar of Stilla Peanut Butter! Our team will contact you shortly with details on how to claim your prize.",
        })
      } else if (code.toUpperCase() === "SPB500") {
        setResult({
          success: true,
          message:
            "Promo code SPB500 applied! You'll receive free delivery on your next purchase of a Combo Pack or orders over GHC1500.",
        })
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
    <main className="pt-20 pb-16">
      <section className="bg-amber-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Redeem Your Code</h1>
          <p className="text-lg text-center max-w-3xl mx-auto mb-8">
            Enter your promo code from your Stilla Peanut Butter scratch card to see if you've won a prize!
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-6">Enter Your Code</h2>

                {result && (
                  <Alert
                    className={result.success ? "bg-green-50 border-green-200 mb-6" : "bg-red-50 border-red-200 mb-6"}
                  >
                    <AlertCircle className={result.success ? "h-4 w-4 text-green-600" : "h-4 w-4 text-red-600"} />
                    <AlertTitle>{result.success ? "Success!" : "Invalid Code"}</AlertTitle>
                    <AlertDescription>{result.message}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium mb-2">
                      Promo Code
                    </label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="Enter your code (e.g., SPB500)"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Checking..." : "Check Code"}
                  </Button>
                </form>

                <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Gift className="h-4 w-4 mr-2" />
                    How to Find Your Code
                  </h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Purchase any Stilla Peanut Butter product</li>
                    <li>Look for the scratch card attached to your product</li>
                    <li>Gently scratch the silver area to reveal your unique code</li>
                    <li>Enter the code above to see if you've won</li>
                  </ol>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="relative h-80 md:h-96">
                  <Image
                    src="/images/scratch-card-large.png"
                    alt="Scratch Card Example"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold mb-4">Prizes Include:</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <Image
                        src="/images/prize-hotel.png"
                        alt="Hotel Stay"
                        width={80}
                        height={80}
                        className="mx-auto mb-2"
                      />
                      <p className="text-sm font-medium">Hotel Stay</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <Image
                        src="/images/prize-airtime.png"
                        alt="Airtime"
                        width={80}
                        height={80}
                        className="mx-auto mb-2"
                      />
                      <p className="text-sm font-medium">Airtime</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <Image
                        src="/images/prize-peanut-butter.png"
                        alt="Free Product"
                        width={80}
                        height={80}
                        className="mx-auto mb-2"
                      />
                      <p className="text-sm font-medium">Free Product</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
