"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface PaystackPaymentFormProps {
  amount: number // Amount in Ghana cedis
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function PaystackPaymentForm({ amount, onSuccess, onError }: PaystackPaymentFormProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Convert amount to pesewas (smallest currency unit)
      const amountInPesewas = Math.round(amount * 100)

      const response = await fetch("/api/initialize-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amountInPesewas,
        }),
      })

      const data = await response.json()

      if (data.status) {
        // Redirect to Paystack payment page
        window.location.href = data.data.authorization_url
        if (onSuccess) onSuccess()
      } else {
        setError(data.message || "Payment initialization failed")
        if (onError) onError(data.message || "Payment initialization failed")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      setError(errorMessage)
      if (onError) onError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="mt-1"
        />
      </div>

      <div className="bg-amber-50 p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Amount:</span>
          <span className="font-bold text-amber-900">GHC {amount.toFixed(2)}</span>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">{error}</div>}

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay with Paystack"
        )}
      </Button>
    </form>
  )
}
