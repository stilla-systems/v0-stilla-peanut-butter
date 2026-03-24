'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StillaPayIntegrationProps {
  amount: number
  email: string
  reference?: string
  onSuccess?: (response: any) => void
  onClose?: () => void
}

export default function StillaPayIntegration({
  amount,
  email,
  reference = `ref_${Math.floor(Math.random() * 1000000000)}`,
  onSuccess,
  onClose,
}: StillaPayIntegrationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Stilla Paystack integration using official Paystack link
  const PAYSTACK_PUBLIC_KEY = 'pk_live_c52e5b65e8b04588b855646aeec65a407c9624da'

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      const amountInPesewas = Math.round(amount * 100)

      // Initialize payment with backend
      const initResponse = await fetch('/api/initialize-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: amountInPesewas,
          reference,
          publicKey: PAYSTACK_PUBLIC_KEY,
        }),
      })

      const initData = await initResponse.json()

      if (initData.status && initData.data.authorization_url) {
        // Redirect to Paystack checkout
        window.location.href = initData.data.authorization_url
      } else {
        throw new Error(initData.message || 'Payment initialization failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {isSuccess ? (
        <motion.div
          className="bg-green-50 p-6 rounded-lg text-center border border-green-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h3>
          <p className="text-green-700 mb-4">Your Stilla Peanut Butter order has been confirmed.</p>
          <p className="text-sm text-green-600">Thank you for your purchase!</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Amount:</strong> GHC {amount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Email:</strong> {email}
            </p>
            <p className="text-xs text-gray-500">
              Powered by Paystack • Secure payment for Stilla Peanut Butter
            </p>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-600 to-red-500 hover:from-amber-700 hover:to-red-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Pay with Stilla Pay'
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            Your payment is secure and encrypted by Paystack
          </p>
        </div>
      )}
    </div>
  )
}
