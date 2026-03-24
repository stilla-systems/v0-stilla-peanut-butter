"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  Check,
  ChevronRight,
  CreditCard,
  Gift,
  X,
  ArrowLeft,
  Phone,
  CheckCircle2,
  Copy,
  ShieldCheck,
  Truck,
  Clock,
  CreditCardIcon,
  Info,
  ShoppingCart,
  Loader2,
} from "lucide-react"
import DynamicPromoCountdown from "@/components/dynamic-promo-countdown"
import PromoCodeChecker from "@/components/promo-code-checker"
import { getCurrentFestivityName } from "@/utils/festivity-dates"
import Link from "next/link"
import AnimatedButton from "@/components/animated-button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PaystackCheckoutEmbed from "@/components/paystack-checkout-embed"
import StillaPayIntegration from "@/components/stilla-pay-integration"

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("medium")
  const [showPayment, setShowPayment] = useState(false)
  const [showPromoWidget, setShowPromoWidget] = useState(false)
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [discount, setDiscount] = useState(0)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [ussdCopied, setUssdCopied] = useState(false)
  const [accountCopied, setAccountCopied] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("paystack")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const festivityName = getCurrentFestivityName()
  const checkoutRef = useRef<HTMLDivElement>(null)

  const prices = {
    small: 35,
    medium: 55,
    large: 85,
  }

  useEffect(() => {
    // Check if form is valid
    const { firstName, lastName, email, phone, address, city, region } = customerInfo
    setIsFormValid(
      firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        email.trim() !== "" &&
        phone.trim() !== "" &&
        address.trim() !== "" &&
        city.trim() !== "" &&
        region.trim() !== "",
    )
  }, [customerInfo])

  const calculateTotal = () => {
    const subtotal = prices[selectedSize as keyof typeof prices] * quantity
    return subtotal - discount
  }

  const handlePromoApplied = (code: string, discountAmount: number) => {
    setAppliedPromo(code)
    setDiscount(discountAmount)
    setShowPromoWidget(false)
  }

  const removePromo = () => {
    setAppliedPromo(null)
    setDiscount(0)
  }

  const handleProceedToPayment = () => {
    setActiveStep(2)
    setShowPayment(true)
    // Scroll to top of checkout section
    if (checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleBackToOrder = () => {
    setActiveStep(1)
    setShowPayment(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePaymentSuccess = () => {
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
      setShowSuccessAnimation(true)

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

          // Follow with cannon left and right
          setTimeout(() => {
            confetti.default({
              particleCount: 50,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ["#FFD700", "#FF0000", "#FFA500"],
            })

            confetti.default({
              particleCount: 50,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: ["#FFD700", "#FF0000", "#FFA500"],
            })
          }, 250)
        })
      }
    }, 2000)
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

  const handlePayNow = () => {
    setIsProcessing(true)

    // Direct to Stilla Pay integration with Paystack
    window.open("https://paystack.shop/pay/8sim7vb1jf", "_blank")

    // Simulate successful payment after a delay
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
      setShowSuccessAnimation(true)

      // Trigger confetti effect
      if (typeof window !== "undefined") {
        import("canvas-confetti").then((confetti) => {
          confetti.default({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFD700", "#FF0000", "#FFA500", "#32CD32"],
          })
        })
      }
    }, 3000)
  }

  if (orderComplete) {
    return (
      <main className="pt-20 pb-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 text-center border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.5,
                    times: [0, 0.6, 1],
                  }}
                >
                  <Check className="h-12 w-12 text-green-600" />
                </motion.div>
              </motion.div>

              <motion.h1
                className="text-3xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                  scale: {
                    delay: 0.8,
                    duration: 0.5,
                    times: [0, 0.5, 1],
                  },
                }}
              >
                Order Confirmed!
              </motion.h1>

              <motion.p
                className="text-lg text-gray-600 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
              </motion.p>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {[
                  {
                    icon: <CreditCardIcon className="h-6 w-6 text-blue-600" />,
                    title: "Payment Complete",
                    description: "Your payment has been processed successfully",
                    color: "blue",
                  },
                  {
                    icon: <Truck className="h-6 w-6 text-amber-600" />,
                    title: "Shipping Soon",
                    description: "Your order will be shipped within 24 hours",
                    color: "amber",
                  },
                  {
                    icon: <Clock className="h-6 w-6 text-green-600" />,
                    title: "Estimated Delivery",
                    description: "Your order will arrive in 2-3 business days",
                    color: "green",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`bg-${item.color}-50 p-4 rounded-lg border border-${item.color}-100`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      y: [0, -5, 0],
                    }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.5,
                      y: {
                        delay: 1.2 + index * 0.2,
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        repeatDelay: 1,
                        ease: "easeInOut",
                      },
                    }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-center mb-2">{item.icon}</div>
                    <h3 className={`font-medium text-${item.color}-800`}>{item.title}</h3>
                    <p className={`text-sm text-${item.color}-600`}>{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="bg-amber-50 p-6 rounded-lg mb-8 border border-amber-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-amber-900 mb-4">Don't Forget Your Promo Code!</h2>
                <p className="text-gray-700 mb-4">
                  Check under the lid of your Stilla Peanut Butter jar for your unique promo code and enter it on our
                  promotions page for a chance to win amazing prizes!
                </p>
                <AnimatedButton className="bg-amber-600 hover:bg-amber-700 text-white" asChild>
                  <Link href="/promotions">Enter Your Promo Code</Link>
                </AnimatedButton>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <AnimatedButton className="bg-red-600 hover:bg-red-700 text-white" asChild>
                  <Link href="/">Return to Home</Link>
                </AnimatedButton>

                <AnimatedButton variant="outline" className="border-gray-300" asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </AnimatedButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  // Processing screen with enhanced animations
  if (isProcessing) {
    return (
      <main className="pt-20 pb-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div
                  className="relative w-20 h-20 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 border-4 border-amber-600 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute inset-2 border-4 border-amber-300 border-b-transparent rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                <motion.h3
                  className="text-2xl font-semibold text-gray-800 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Processing Your Order
                </motion.h3>

                <motion.p
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Please wait while we process your payment and prepare your order...
                </motion.p>

                <motion.div
                  className="w-full max-w-md bg-gray-100 h-3 rounded-full overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-red-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </motion.div>

                <motion.div
                  className="mt-8 flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <p className="text-sm text-gray-500 mb-2">Processing steps:</p>
                  <ul className="text-left text-sm text-gray-600 space-y-2">
                    <motion.li
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" /> Verifying payment information
                    </motion.li>
                    <motion.li
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0, duration: 0.3 }}
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" /> Processing payment
                    </motion.li>
                    <motion.li
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2, duration: 0.3 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="mr-2"
                      >
                        <Loader2 className="h-4 w-4 text-amber-500" />
                      </motion.div>
                      Preparing your order
                    </motion.li>
                  </ul>
                </motion.div>

                <motion.p
                  className="text-sm text-gray-500 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  Please do not close this window
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20 pb-16 bg-gradient-to-b from-amber-50 to-white" ref={checkoutRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-900">Checkout</h1>
            <p className="text-gray-600">Complete your purchase and get ready to enjoy Stilla Peanut Butter!</p>

            {/* Checkout Progress */}
            <div className="mt-6 mb-8 overflow-x-auto">
              <div className="flex items-center justify-between min-w-[480px] max-w-md mx-auto px-2">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeStep >= 1 ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    1
                  </div>
                  <span
                    className={`text-xs sm:text-sm mt-1 ${activeStep >= 1 ? "text-amber-600 font-medium" : "text-gray-500"}`}
                  >
                    Order Details
                  </span>
                </div>

                <div className={`flex-1 h-1 mx-2 ${activeStep >= 2 ? "bg-amber-600" : "bg-gray-200"}`}></div>

                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeStep >= 2 ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    2
                  </div>
                  <span
                    className={`text-xs sm:text-sm mt-1 ${activeStep >= 2 ? "text-amber-600 font-medium" : "text-gray-500"}`}
                  >
                    Payment
                  </span>
                </div>

                <div className={`flex-1 h-1 mx-2 ${activeStep >= 3 ? "bg-amber-600" : "bg-gray-200"}`}></div>

                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeStep >= 3 ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    3
                  </div>
                  <span
                    className={`text-xs sm:text-sm mt-1 ${activeStep >= 3 ? "text-amber-600 font-medium" : "text-gray-500"}`}
                  >
                    Confirmation
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Summary - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                  <span className="bg-amber-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-amber-800">
                    <ShoppingCart className="h-4 w-4" />
                  </span>
                  Your Order
                </h2>

                <div className="flex items-start gap-4 sm:gap-6 bg-amber-50/50 p-3 sm:p-4 rounded-lg">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                    <Image
                      src="/images/stilla-peanut-butter.png"
                      alt="Stilla Peanut Butter"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-base sm:text-lg text-amber-900">
                      Stilla Peanut Butter - 100% Natural
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                      Pure peanut goodness with no additives
                    </p>

                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <Label htmlFor="size-select" className="text-xs sm:text-sm font-medium">
                          Size
                        </Label>
                        <RadioGroup
                          id="size-select"
                          value={selectedSize}
                          onValueChange={setSelectedSize}
                          className="flex flex-wrap gap-2 sm:gap-4 mt-1"
                        >
                          <div className="flex items-center">
                            <RadioGroupItem value="small" id="small" />
                            <Label htmlFor="small" className="ml-2 text-xs sm:text-sm">
                              Small (250g) - GHC {prices.small}
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium" className="ml-2 text-xs sm:text-sm">
                              Medium (500g) - GHC {prices.medium}
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="large" id="large" />
                            <Label htmlFor="large" className="ml-2 text-xs sm:text-sm">
                              Large (1kg) - GHC {prices.large}
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label htmlFor="quantity" className="text-xs sm:text-sm font-medium">
                          Quantity
                        </Label>
                        <div className="flex items-center mt-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            className="h-8 w-8 p-0 flex items-center justify-center border rounded-md bg-amber-50"
                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                          >
                            -
                          </motion.button>
                          <span className="mx-4 min-w-[2rem] text-center font-medium">{quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            className="h-8 w-8 p-0 flex items-center justify-center border rounded-md bg-amber-50"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500 flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    <span>Free shipping on orders over GHC 150</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-1" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </motion.div>

              {!showPayment && (
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h2 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                    <span className="bg-amber-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-amber-800">
                      <Truck className="h-4 w-4" />
                    </span>
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={customerInfo.firstName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={customerInfo.lastName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="text-sm font-medium">
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium">
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="region" className="text-sm font-medium">
                        Region
                      </Label>
                      <Input
                        id="region"
                        name="region"
                        value={customerInfo.region}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Festivity Promo Banner */}
              <motion.div
                className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-sm p-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{festivityName} Promotion!</h2>
                    <p>Buy any Stilla product and win a luxury stay at Mövenpick Hotel!</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <DynamicPromoCountdown />
                  </div>
                </div>
              </motion.div>

              {showPayment && (
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h2 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                    <span className="bg-amber-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-amber-800">
                      <CreditCard className="h-4 w-4" />
                    </span>
                    Payment Options
                  </h2>

                  <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
                    <Info className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-700 text-sm">
                      All transactions are secure and encrypted. We accept credit cards, mobile money, and other payment
                      methods.
                    </p>
                  </div>

                  <Tabs defaultValue="paystack" className="mb-4" onValueChange={setPaymentMethod}>
                    <TabsList className="grid grid-cols-2 mb-6">
                      <TabsTrigger value="paystack" className="flex items-center justify-center">
                        <CreditCardIcon className="mr-2 h-4 w-4" />
                        Automatic Payment
                      </TabsTrigger>
                      <TabsTrigger value="manual" className="flex items-center justify-center">
                        <Phone className="mr-2 h-4 w-4" />
                        Manual Payment
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="paystack" className="space-y-4">
                      <motion.div
                        className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="bg-white p-2 rounded-lg mr-4">
                            <img src="/images/visa-logo.png" alt="Visa" className="h-6" />
                          </div>
                          <div className="bg-white p-2 rounded-lg mr-4">
                            <img src="/images/mastercard-logo.png" alt="Mastercard" className="h-6" />
                          </div>
                          <div className="bg-white p-2 rounded-lg">
                            <img src="/images/mtn-mobile.png" alt="MTN Mobile" className="h-6" />
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-green-800 mb-2">Secure Payment with Stillapay</h3>
                        <p className="text-green-700 mb-4">
                          Complete your purchase securely using our trusted payment gateway.
                        </p>

                        <div className="mb-6">
                          <PaystackCheckoutEmbed
                            amount={calculateTotal() + 10}
                            email={customerInfo.email || "customer@example.com"}
                            onSuccess={handlePaymentSuccess}
                          />
                        </div>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="manual" className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">Manual Payment Options</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center mb-3">
                              <img src="/images/mtn-mobile.png" alt="MTN Mobile" className="h-8 mr-2" />
                              <h4 className="font-medium">USSD Payment</h4>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-mono text-lg font-bold text-gray-800 bg-blue-50 px-3 py-1 rounded-md">
                                *415*1137#
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={copyUssdCode}
                                className="text-blue-600 hover:text-blue-800 bg-blue-100 p-2 rounded-full"
                              >
                                {ussdCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                              </motion.button>
                            </div>
                            <p className="text-sm text-gray-600">Dial this code to make payment</p>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center mb-3">
                              <img src="/images/airtel-money.png" alt="Mobile Money" className="h-8 mr-2" />
                              <h4 className="font-medium">Mobile Money Transfer</h4>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-mono text-lg font-bold text-gray-800 bg-blue-50 px-3 py-1 rounded-md">
                                0597397912
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={copyAccountNumber}
                                className="text-blue-600 hover:text-blue-800 bg-blue-100 p-2 rounded-full"
                              >
                                {accountCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                              </motion.button>
                            </div>
                            <p className="text-sm text-gray-600">Send to this number (Merchant: Stillapay)</p>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">Manual Payment Instructions</h4>
                          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                            <li>Choose your preferred payment method above</li>
                            <li>Complete the payment using the USSD code or mobile money number</li>
                            <li>Use your order number as reference when prompted</li>
                            <li>Keep your payment receipt for verification</li>
                          </ol>
                        </div>

                        <AnimatedButton
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={handlePayNow}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Confirm Manual Payment
                        </AnimatedButton>
                      </div>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}
            </div>

            {/* Order Summary - Right Column */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white rounded-xl shadow-sm p-6 sticky top-24 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {showPayment && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBackToOrder}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    <span>Back to order details</span>
                  </motion.button>
                )}

                <h2 className="text-xl font-semibold text-amber-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>GHC {(prices[selectedSize as keyof typeof prices] * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>GHC 10.00</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center">
                        Discount
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={removePromo}
                          className="ml-1 text-gray-400 hover:text-gray-600"
                        >
                          <X size={14} />
                        </motion.button>
                      </span>
                      <span>-GHC {discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span>GHC {(calculateTotal() + 10).toFixed(2)}</span>
                </div>

                {appliedPromo ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-start">
                    <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-green-800 text-sm font-medium">Promo code applied: {appliedPromo}</p>
                      <p className="text-green-700 text-xs">You saved GHC {discount.toFixed(2)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <AnimatedButton
                      variant="outline"
                      className="w-full border-dashed border-amber-300 text-amber-700 hover:bg-amber-50"
                      onClick={() => setShowPromoWidget(true)}
                    >
                      <Gift size={16} className="mr-2" />
                      Apply Promo Code
                    </AnimatedButton>
                  </div>
                )}

                {!showPayment ? (
                  <div className="space-y-3">
                    <AnimatedButton
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium"
                      onClick={handleProceedToPayment}
                      disabled={!isFormValid}
                    >
                      Proceed to Payment
                      <ChevronRight size={16} className="ml-1" />
                    </AnimatedButton>

                    <Dialog>
                      <DialogTrigger asChild>
                        <AnimatedButton
                          variant="outline"
                          className="w-full border-amber-600 text-amber-700 hover:bg-amber-50"
                          disabled={false} // Ensure this is always enabled
                        >
                          <Phone size={16} className="mr-2" />
                          Manual Payment Options
                        </AnimatedButton>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <div className="space-y-4">
                          <div className="text-center">
                            <h3 className="text-lg font-bold text-amber-900 mb-4">Manual Payment Options</h3>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-amber-50 p-4 rounded-lg">
                                <h4 className="font-bold text-amber-900 mb-2">USSD Payment</h4>
                                <div className="flex items-center justify-between">
                                  <div className="font-mono text-lg font-bold text-amber-800">*415*1137#</div>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={copyUssdCode}
                                    className="text-amber-600 hover:text-amber-800"
                                  >
                                    {ussdCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                                  </motion.button>
                                </div>
                                <p className="text-sm text-amber-700 mt-2">Dial this code on your phone</p>
                              </div>

                              <div className="bg-red-50 p-4 rounded-lg">
                                <h4 className="font-bold text-red-900 mb-2">Mobile Money</h4>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-mono text-lg font-bold text-red-800">0597397912</div>
                                    <div className="text-sm text-red-700">Merchant: Stillapay</div>
                                  </div>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={copyAccountNumber}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    {accountCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                                  </motion.button>
                                </div>
                              </div>
                            </div>

                            <div className="relative w-full h-48 rounded-lg overflow-hidden border-4 border-amber-200 shadow-lg mb-4">
                              <Image
                                src="/images/stilla-peanut-butter.png"
                                alt="Stilla Peanut Butter"
                                fill
                                className="object-contain"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                <div className="p-4 text-white">
                                  <h4 className="font-bold text-lg">Scan to Pay</h4>
                                  <p className="text-sm">Use your mobile money app to scan this QR code</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-center space-x-4 pt-4">
                              <img src="/images/mtn-mobile.png" alt="MTN Mobile" className="h-8" />
                              <img src="/images/telecel-cash.png" alt="Telecel Cash" className="h-8" />
                              <img src="/images/airtel-money.png" alt="Airtel Money" className="h-8" />
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <h3 className="font-medium text-amber-800 mb-2">Order Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Product:</span>
                          <span className="font-medium">Stilla Peanut Butter</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium">
                            {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-medium">{quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping:</span>
                          <span className="font-medium">GHC 10.00</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-start">
                      <ShieldCheck className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-green-800 mb-1">Secure Payment</h3>
                        <p className="text-sm text-green-700">Your payment information is encrypted and secure.</p>
                      </div>
                    </div>

                    <AnimatedButton
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium"
                      onClick={handlePayNow}
                    >
                      Complete Purchase
                      <ChevronRight size={16} className="ml-1" />
                    </AnimatedButton>
                  </div>
                )}

                <div className="mt-4 text-center text-xs text-gray-500">
                  <p>Secure payment powered by Stillapay</p>
                  <div className="flex justify-center mt-2 space-x-2">
                    <CreditCardIcon size={16} />
                    <span>We accept all major credit cards and mobile money</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code Checker Widget */}
      <AnimatePresence>
        {showPromoWidget && <PromoCodeChecker onClose={() => setShowPromoWidget(false)} onApply={handlePromoApplied} />}
      </AnimatePresence>
    </main>
  )
}
