"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Smartphone, CheckCircle2, Loader2, Lock, Copy, Phone, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AnimatedButton from "@/components/animated-button"

interface PayPluxEmbedProps {
  amount: number
  customerEmail?: string
  customerName?: string
  onSuccess?: () => void
}

export default function PayPluxEmbed({ amount, customerEmail = "", customerName = "", onSuccess }: PayPluxEmbedProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState(customerName)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [network, setNetwork] = useState("mtn")
  const [showManualPayment, setShowManualPayment] = useState(false)
  const [ussdCopied, setUssdCopied] = useState(false)
  const [accountCopied, setAccountCopied] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [showIframe, setShowIframe] = useState(false)

  // Paystack link
  const paystackLink = "https://paystack.com/buy/stilla-peanut-butter-buy-now"

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value)
    setExpiryDate(formattedValue)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      if (onSuccess) {
        onSuccess()
      }
    }, 2000)
  }

  const handlePayNow = () => {
    // Redirect to the Paystack payment page
    window.open(paystackLink, "_blank")

    // For demo purposes, we'll simulate a successful payment after a delay
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      if (onSuccess) {
        onSuccess()
      }
    }, 5000)
  }

  const copyUssdCode = () => {
    navigator.clipboard.writeText("*415*1137#")
    setUssdCopied(true)
    setTimeout(() => setUssdCopied(false), 2000)
  }

  const copyAccountNumber = () => {
    navigator.clipboard.writeText("0597397912")
    setAccountCopied(true)
    setTimeout(() => setAccountCopied(false), 2000)
  }

  if (isComplete) {
    return (
      <motion.div
        className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CheckCircle2 className="mx-auto mb-4 text-green-500" size={48} />
        <h3 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h3>
        <p className="text-green-700 mb-4">Your order has been placed successfully.</p>
        <AnimatedButton asChild className="bg-green-600 hover:bg-green-700 text-white">
          <a href="/">Return to Home</a>
        </AnimatedButton>
      </motion.div>
    )
  }

  if (isProcessing) {
    return (
      <motion.div
        className="bg-white border border-gray-200 rounded-lg p-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h3>
          <p className="text-gray-600">Please wait while we process your payment...</p>
          <p className="text-sm text-gray-500 mt-4">Do not close this window</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="border border-gray-200 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white p-1 rounded mr-2">
              <img src="/images/stilla-peanut-butter.png" alt="Stilla Peanut Butter" className="h-6" />
            </div>
            <span className="font-semibold">Secure Payment</span>
          </div>
          <div className="text-sm">
            <span className="opacity-80">Amount:</span> <span className="font-bold">GHC {amount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">PAY WITH</h3>

        <Tabs defaultValue="card" className="mb-4" onValueChange={setPaymentMethod}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="card" className="flex items-center justify-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Cards
            </TabsTrigger>
            <TabsTrigger value="momo" className="flex items-center justify-center">
              <Smartphone className="mr-2 h-4 w-4" />
              Mobile Money
            </TabsTrigger>
            <TabsTrigger value="apple" className="flex items-center justify-center">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.0425 11.8048C17.0242 9.1697 19.2026 7.79543 19.2956 7.73972C18.0625 5.96265 16.1214 5.70541 15.4477 5.68856C13.8136 5.52856 12.2288 6.6983 11.3977 6.6983C10.5497 6.6983 9.25909 5.70541 7.87546 5.73909C6.09839 5.77277 4.44368 6.78251 3.52368 8.36856C1.62256 11.6048 3.04256 16.3983 4.86962 18.9811C5.78962 20.2477 6.85839 21.6651 8.25839 21.6145C9.62518 21.5639 10.1425 20.7327 11.7934 20.7327C13.4274 20.7327 13.9108 21.6145 15.3445 21.5808C16.8288 21.5639 17.7488 20.3142 18.6351 19.0308C19.6954 17.5633 20.1282 16.1121 20.1451 16.0277C20.1114 16.0108 17.0608 14.8283 17.0425 11.8048Z" />
                <path d="M14.5477 3.9473C15.2889 3.05414 15.7892 1.83097 15.6539 0.591309C14.6104 0.641309 13.3269 1.31097 12.5519 2.18731C11.8612 2.96231 11.2589 4.21914 11.4112 5.42547C12.5857 5.50801 13.7727 4.82364 14.5477 3.9473Z" />
              </svg>
              Apple Pay
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 flex items-start">
              <Lock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>Pay securely with your credit or debit card. We accept Visa, Mastercard, and other major cards.</p>
            </div>

            <div className="flex flex-col space-y-4">
              <AnimatedButton onClick={handlePayNow} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <ExternalLink className="mr-2 h-4 w-4" />
                Pay with Paystack
              </AnimatedButton>

              <Dialog>
                <DialogTrigger asChild>
                  <AnimatedButton variant="outline" className="w-full border-blue-600 text-blue-600">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay with Card Details
                  </AnimatedButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          className="mt-1"
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="mt-1"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        className="mt-1"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>

                    <AnimatedButton type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Pay Now
                    </AnimatedButton>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex justify-center space-x-4 pt-2">
              <img src="/images/visa-logo.png" alt="Visa" className="h-6" />
              <img src="/images/mastercard-logo.png" alt="Mastercard" className="h-6" />
            </div>
          </TabsContent>

          <TabsContent value="momo" className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 flex items-start">
              <Lock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>Pay using mobile money. We support MTN Mobile Money, Vodafone Cash, and AirtelTigo Money.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatedButton onClick={handlePayNow} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <ExternalLink className="mr-2 h-4 w-4" />
                Pay with Paystack
              </AnimatedButton>

              <Dialog>
                <DialogTrigger asChild>
                  <AnimatedButton variant="outline" className="w-full border-blue-600 text-blue-600">
                    <Phone className="mr-2 h-4 w-4" />
                    Manual USSD Payment
                  </AnimatedButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">PAY WITH</h3>
                      <div className="flex justify-center gap-4 mb-6">
                        <div className="border-2 border-cyan-500 rounded-lg px-6 py-2 text-center">
                          <span className="font-bold text-lg">Mobile Money</span>
                        </div>
                        <div className="border-2 border-cyan-500 rounded-lg px-6 py-2 text-center">
                          <span className="font-bold text-lg">Apple Pay</span>
                        </div>
                        <div className="border-2 border-cyan-500 rounded-lg px-6 py-2 text-center">
                          <span className="font-bold text-lg">Cards</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-gray-500 mb-2">DIAL USSD CODE</h4>
                        <div className="flex items-center justify-center">
                          <p className="text-4xl font-bold text-gray-900">*415*1137#</p>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={copyUssdCode}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                            aria-label="Copy USSD code"
                          >
                            {ussdCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                          </motion.button>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-gray-500 mb-2">MERCHANT NAME</h4>
                        <p className="text-3xl font-bold text-gray-900">Stillapay</p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-gray-500 mb-2">ACCOUNT NUMBER</h4>
                        <div className="flex items-center justify-center">
                          <p className="text-3xl font-bold text-gray-900">0597397912</p>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={copyAccountNumber}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                            aria-label="Copy account number"
                          >
                            {accountCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                          </motion.button>
                        </div>
                      </div>

                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-lg">QR Scan to Pay</h4>
                            <p className="text-sm text-gray-600 text-left">
                              Scan the QR code to pay with
                              <br />
                              <span className="font-semibold">Apple Pay, Mobile Money</span> or other
                              <br />
                              channels on your phone.
                            </p>
                          </div>
                          <div className="relative w-32 h-32">
                            <Image
                              src="/images/stilla-peanut-butter.png"
                              alt="Payment QR Code"
                              width={128}
                              height={128}
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center space-x-4 pt-4">
                        <img src="/images/mtn-mobile.png" alt="MTN Mobile" className="h-8" />
                        <img src="/images/telecel-cash.png" alt="Telecel Cash" className="h-8" />
                        <img src="/images/airtel-money.png" alt="Airtel Money" className="h-8" />
                        <img src="/images/apple-pay-logo.png" alt="Apple Pay" className="h-8" />
                        <img src="/images/mastercard-logo.png" alt="Mastercard" className="h-8" />
                        <img src="/images/visa-logo.png" alt="Visa" className="h-8" />
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex justify-center space-x-4 pt-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
              <div className="w-8 h-8 bg-red-500 rounded-full"></div>
              <div className="w-8 h-8 bg-red-600 rounded-full"></div>
            </div>
          </TabsContent>

          <TabsContent value="apple" className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 flex items-start">
              <Lock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>Pay securely with Apple Pay. Fast, secure, and convenient.</p>
            </div>

            <AnimatedButton onClick={handlePayNow} className="w-full bg-black hover:bg-gray-800 text-white">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.0425 11.8048C17.0242 9.1697 19.2026 7.79543 19.2956 7.73972C18.0625 5.96265 16.1214 5.70541 15.4477 5.68856C13.8136 5.52856 12.2288 6.6983 11.3977 6.6983C10.5497 6.6983 9.25909 5.70541 7.87546 5.73909C6.09839 5.77277 4.44368 6.78251 3.52368 8.36856C1.62256 11.6048 3.04256 16.3983 4.86962 18.9811C5.78962 20.2477 6.85839 21.6651 8.25839 21.6145C9.62518 21.5639 10.1425 20.7327 11.7934 20.7327C13.4274 20.7327 13.9108 21.6145 15.3445 21.5808C16.8288 21.5639 17.7488 20.3142 18.6351 19.0308C19.6954 17.5633 20.1282 16.1121 20.1451 16.0277C20.1114 16.0108 17.0608 14.8283 17.0425 11.8048Z" />
                <path d="M14.5477 3.9473C15.2889 3.05414 15.7892 1.83097 15.6539 0.591309C14.6104 0.641309 13.3269 1.31097 12.5519 2.18731C11.8612 2.96231 11.2589 4.21914 11.4112 5.42547C12.5857 5.50801 13.7727 4.82364 14.5477 3.9473Z" />
              </svg>
              Pay with Apple Pay
            </AnimatedButton>

            <div className="flex justify-center pt-2">
              <img src="/images/apple-pay-logo.png" alt="Apple Pay" className="h-8" />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-gray-50 p-3 text-center text-xs text-gray-500 border-t flex items-center justify-center">
        <Lock className="h-3 w-3 mr-1" />
        <p>Secured by Paystack. Your payment information is encrypted and secure.</p>
      </div>
    </motion.div>
  )
}
