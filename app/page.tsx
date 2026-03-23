"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import DynamicPromoCountdown from "@/components/dynamic-promo-countdown"
import { getCurrentFestivityName } from "@/utils/festivity-dates"
import LaunchAnnouncementBanner from "@/components/launch-announcement-banner"
import { ScrollAnimationWrapper } from "@/components/scroll-animations"

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)
  const festivityName = getCurrentFestivityName()

  // Animation for product range image
  const productRangeRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(productRangeRef, { once: false, amount: 0.3 })
  const productRangeControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      productRangeControls.start({
        scale: [0.8, 1.05, 1],
        opacity: [0, 1],
        rotate: [0, -2, 0],
        transition: {
          duration: 1.2,
          ease: "easeOut",
          times: [0, 0.7, 1],
        },
      })
    }
  }, [isInView, productRangeControls])

  return (
    <main className="flex min-h-screen flex-col">
      {/* Launch Announcement Banner */}
      <LaunchAnnouncementBanner />

      {/* Hero Section with Parallax */}
      <section className="relative py-12 md:py-16 lg:py-24 bg-amber-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-16">
            <ScrollAnimationWrapper animationType="fadeInLeft" duration={0.8} className="w-full md:w-1/2 space-y-4 md:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 leading-tight">
                100% Natural Peanut Butter, Made Just For You
              </h1>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-amber-800">
                Stilla Peanut Butter is made from only the finest peanuts. No additives, no preservatives - just pure,
                delicious peanut goodness.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-base md:text-lg group"
                  asChild
                >
                  <Link href="/checkout/stillapay-checkout">
                    Buy Now
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-amber-900 text-amber-900 hover:bg-amber-900/10 font-medium text-base md:text-lg bg-transparent"
                  asChild
                >
                  <Link href="/promotions">Special Promotion</Link>
                </Button>
              </div>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper 
              animationType="parallax" 
              parallaxIntensity={0.3}
              className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0"
            >
              <motion.div
                className="relative w-[220px] sm:w-[280px] md:w-[320px] lg:w-[400px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05, rotate: isHovered ? 5 : 0 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <Image
                  src="/images/stilla-peanut-butter.png"
                  alt="Stilla Peanut Butter Jar"
                  width={400}
                  height={600}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Rest of the homepage content remains unchanged */}
      {/* Festivity Promo Banner */}
      <section className="bg-red-600 text-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Christmas Promotion!</h2>
              <p className="text-white/90 text-sm sm:text-base">
                Buy any Stilla product and win a luxury stay at Mövenpick Hotel!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <DynamicPromoCountdown />
              <Button className="bg-white text-red-600 hover:bg-gray-100 w-full sm:w-auto" asChild>
                <Link href="/promotions">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper animationType="fadeInDown" className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">100% Natural Ingredients</h2>
            <p className="text-lg text-gray-700">
              At Stilla, we believe in keeping things simple. Our peanut butter is made from just one ingredient:
              premium quality peanuts. No added sugar, salt, or preservatives.
            </p>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Pure & Natural",
                description: "Made from 100% roasted peanuts with no additives or preservatives.",
              },
              {
                title: "Rich in Protein",
                description: "Excellent source of plant-based protein to fuel your day.",
              },
              {
                title: "Healthy Fats",
                description: "Contains heart-healthy monounsaturated fats.",
              },
            ].map((feature, index) => (
              <ScrollAnimationWrapper
                key={index}
                animationType="scaleUp"
                duration={0.6}
                delay={index * 0.1}
                className="bg-amber-50 p-6 rounded-lg"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-amber-100 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-amber-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900">{feature.title}</h3>
                </div>
                <p className="text-gray-700 ml-11">{feature.description}</p>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase with Parallax */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ScrollAnimationWrapper 
              animationType="parallax"
              parallaxIntensity={0.5}
              className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-lg"
            >
              <motion.div
                ref={productRangeRef}
                animate={productRangeControls}
                initial={{ opacity: 0, scale: 0.8 }}
              >
                <div className="relative">
                  <Image
                    src="/images/product-range-new.png"
                    alt="Stilla Peanut Butter Product Range"
                    width={600}
                    height={400}
                    className="w-full h-auto transform transition-all duration-700 hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-red-500/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper
              animationType="fadeInRight"
              duration={0.8}
              className="w-full md:w-1/2 space-y-6"
            >
              <h2 className="text-3xl font-bold text-amber-900">Our Product Range</h2>
              <p className="text-lg text-gray-700">
                Stilla Peanut Butter comes in different varieties to suit your taste preferences. Whether you prefer
                smooth or crunchy, we have the perfect option for you.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-900 mr-2" />
                  <span className="text-gray-700">Stilla Smooth Peanut Butter - Creamy texture for spreading</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-900 mr-2" />
                  <span className="text-gray-700">
                    Stilla Crunchy Peanut Butter - With peanut pieces for extra texture
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-900 mr-2" />
                  <span className="text-gray-700">Stilla Family Size - Perfect for peanut butter lovers</span>
                </li>
              </ul>
              <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
                <Link href="/checkout/stillapay-checkout">Shop Now</Link>
              </Button>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimationWrapper
            animationType="rotateIn"
            duration={0.8}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Experience Stilla?</h2>
            <p className="text-xl mb-8">
              Try our 100% natural peanut butter today and taste the difference. Plus, enter our Christmas promotion for
              a chance to win amazing prizes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-amber-900 hover:bg-gray-100 font-bold" asChild>
                <Link href="/checkout/stillapay-checkout">Buy Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 font-medium bg-transparent"
                asChild
              >
                <Link href="/promotions">Enter Promotion</Link>
              </Button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </main>
  )
}
