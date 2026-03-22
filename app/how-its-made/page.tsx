"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ScrollAnimationWrapper } from "@/components/scroll-animations"
import ProductShowcaseHero from "@/components/product-showcase-hero"
import { ArrowRight, Leaf, Droplets, Heart, Award, Zap, BarChart3 } from "lucide-react"
import { Metadata } from "next"

export default function HowItsMade() {
  const [activeStep, setActiveStep] = useState(0)

  const productionSteps = [
    {
      number: "01",
      title: "Farm Selection & Cultivation",
      description:
        "We work with carefully selected peanut farms across Ghana, cultivating over 500 hectares of premium peanut crops. Our farmers follow sustainable agricultural practices with zero pesticide use in select premium batches.",
      details: [
        "500+ hectares of dedicated peanut farms",
        "Crop rotation for soil sustainability",
        "Manual harvesting to preserve quality",
        "Quality grading at harvest",
      ],
      icon: Leaf,
    },
    {
      number: "02",
      title: "Harvesting & Drying",
      description:
        "Peanuts are hand-harvested during peak season and dried naturally under the Ghanaian sun. Each batch is carefully monitored to ensure optimal moisture content and peak flavor development.",
      details: [
        "Seasonal hand-harvesting process",
        "Sun-drying for natural flavor",
        "Moisture content monitoring",
        "50+ days natural drying period",
      ],
      icon: Droplets,
    },
    {
      number: "03",
      title: "Personal Hygiene & Inspection",
      description:
        "All collection and preparation staff follow strict hygiene protocols including medical checkups, hand sanitization, and protective equipment. Peanuts undergo rigorous inspection and cleaning processes.",
      details: [
        "Staff medical certifications required",
        "Daily hand sanitization protocols",
        "Food-grade protective equipment",
        "Multi-stage inspection system",
      ],
      icon: Heart,
    },
    {
      number: "04",
      title: "Roasting & Processing",
      description:
        "Peanuts are roasted at precise temperatures to bring out natural flavors without any added oils or salts. Our proprietary roasting process ensures consistent quality across every batch.",
      details: [
        "Temperature-controlled roasting",
        "Small batch processing",
        "Traditional roasting methods",
        "Flavor preservation techniques",
      ],
      icon: Zap,
    },
    {
      number: "05",
      title: "Grinding & Craftsmanship",
      description:
        "The roasted peanuts are ground using stone mills in our dedicated facility. This traditional method preserves the peanuts' natural oils and creates the perfect creamy texture without additives.",
      details: [
        "Stone mill grinding process",
        "No artificial additives",
        "Natural oil preservation",
        "Small batch consistency",
      ],
      icon: Award,
    },
    {
      number: "06",
      title: "Quality Assurance & Packaging",
      description:
        "Every batch is tested for taste, texture, and nutritional content. The finished product is packaged in our climate-controlled facility using sustainable, food-safe materials.",
      details: [
        "Taste & texture testing",
        "Nutritional analysis",
        "Batch traceability",
        "Eco-friendly packaging",
      ],
      icon: BarChart3,
    },
  ]

  const ingredients = [
    { name: "Peanuts (Legume)", percentage: "100%", description: "Premium quality, carefully selected and roasted" },
  ]

  const nutritionFacts = [
    { name: "Protein", value: "8g per serving", icon: "💪" },
    { name: "Healthy Fats", value: "16g per serving", icon: "❤️" },
    { name: "Fiber", value: "2.5g per serving", icon: "✨" },
    { name: "Calories", value: "190 per serving", icon: "⚡" },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Premium Product Showcase Hero */}
      <ProductShowcaseHero />

      {/* Production Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Our 6-Step Craftsmanship Process</h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              From sustainable farming to packaging, each step is executed with precision and passion
            </p>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {productionSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <ScrollAnimationWrapper
                  key={index}
                  animationType="scaleUp"
                  delay={index * 0.1}
                  className="cursor-pointer"
                  onClick={() => setActiveStep(index)}
                >
                  <motion.div
                    className={`p-8 rounded-lg border-2 transition-all duration-300 ${
                      activeStep === index
                        ? "bg-amber-50 border-amber-600 shadow-lg"
                        : "bg-white border-gray-200 hover:border-amber-300"
                    }`}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex items-center justify-center w-16 h-16 rounded-full flex-shrink-0 ${
                          activeStep === index ? "bg-amber-600" : "bg-amber-100"
                        }`}
                      >
                        <Icon
                          className={`w-8 h-8 ${activeStep === index ? "text-white" : "text-amber-900"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-amber-900 mb-2">{step.title}</h3>
                        <p className="text-gray-700 mb-4">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <span className="w-2 h-2 bg-amber-600 rounded-full mr-2" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </ScrollAnimationWrapper>
              )
            })}
          </div>
        </div>
      </section>

      {/* Farm Details Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollAnimationWrapper
              animationType="parallax"
              parallaxIntensity={0.4}
              className="relative h-96 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src="/images/peanut-farm-wide.jpg"
                alt="Peanut Farm Cultivation"
                fill
                className="object-cover"
              />
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper animationType="fadeInRight" duration={0.8}>
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Sustainable Farms</h2>
              <p className="text-gray-700 text-lg mb-4">
                We operate over 500 hectares of dedicated peanut farms across Ghana's fertile regions. Each hectare is
                carefully managed using sustainable agricultural practices that respect the environment and support
                local communities.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">500+</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900">Hectares Cultivated</h3>
                    <p className="text-gray-600">Spread across multiple regions in Ghana</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900">Sustainable Practices</h3>
                    <p className="text-gray-600">Crop rotation, minimal pesticides, soil conservation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900">Community Support</h3>
                    <p className="text-gray-600">Fair wages and support for local farming families</p>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Hygiene & Safety Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper animationType="fadeInDown" className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Hygiene & Safety Standards</h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              We maintain the highest standards of personal hygiene and food safety throughout our production process
            </p>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Medical Certifications",
                description: "All staff undergo regular health checkups and medical certifications",
              },
              {
                title: "Protective Equipment",
                description: "Food-grade protective gear worn during collection and processing",
              },
              {
                title: "Hand Sanitization",
                description: "Daily sanitization protocols and hygiene training for all staff",
              },
              {
                title: "Quality Inspection",
                description: "Multi-stage inspection system to ensure product purity",
              },
            ].map((item, index) => (
              <ScrollAnimationWrapper
                key={index}
                animationType="scaleUp"
                delay={index * 0.1}
                className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200"
              >
                <h3 className="text-lg font-semibold text-amber-900 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Our Simple Ingredient</h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Stilla Peanut Butter contains just one ingredient: premium roasted peanuts. No additives, no
              preservatives, no shortcuts.
            </p>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ingredients.map((ingredient, index) => (
              <ScrollAnimationWrapper
                key={index}
                animationType="fadeInLeft"
                delay={index * 0.1}
                className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-amber-600"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-amber-900">{ingredient.name}</h3>
                  <span className="text-3xl font-bold text-amber-600">{ingredient.percentage}</span>
                </div>
                <p className="text-gray-700">{ingredient.description}</p>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition & Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollAnimationWrapper animationType="fadeInLeft" duration={0.8}>
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Packed with Nutrition</h2>
              <p className="text-gray-700 text-lg mb-8">
                Every spoonful of Stilla Peanut Butter delivers essential nutrients to support your health and energy
                levels throughout the day.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {nutritionFacts.map((fact, index) => (
                  <ScrollAnimationWrapper
                    key={index}
                    animationType="scaleUp"
                    delay={index * 0.1}
                    className="bg-amber-50 p-6 rounded-lg text-center"
                  >
                    <div className="text-4xl mb-2">{fact.icon}</div>
                    <h3 className="text-amber-900 font-semibold mb-2">{fact.name}</h3>
                    <p className="text-gray-700 font-bold">{fact.value}</p>
                  </ScrollAnimationWrapper>
                ))}
              </div>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper
              animationType="parallax"
              parallaxIntensity={0.5}
              className="relative h-96 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src="/images/ingredients-display.jpg"
                alt="Peanut Butter Ingredients"
                fill
                className="object-cover"
              />
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "50+",
                title: "Days of Drying",
                description: "Natural sun-drying process for optimal flavor development",
              },
              {
                number: "100%",
                title: "Natural Processing",
                description: "No artificial additives, preservatives, or processing aids",
              },
              {
                number: "1928+",
                title: "Customer Satisfaction",
                description: "Trusted by thousands of happy customers across Ghana",
              },
            ].map((stat, index) => (
              <ScrollAnimationWrapper
                key={index}
                animationType="scaleUp"
                delay={index * 0.1}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <h3 className="text-5xl font-bold text-amber-600 mb-2">{stat.number}</h3>
                <h4 className="text-xl font-semibold text-amber-900 mb-3">{stat.title}</h4>
                <p className="text-gray-700">{stat.description}</p>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper animationType="rotateIn" className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Taste the Difference?</h2>
            <p className="text-xl mb-8 text-amber-50">
              Experience the pure, natural taste of Stilla Peanut Butter crafted with care and tradition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-amber-900 hover:bg-gray-100 font-bold" asChild>
                <Link href="/checkout/stillapay-checkout">
                  Buy Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold bg-transparent"
                asChild
              >
                <Link href="/promotions">Special Offers</Link>
              </Button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </main>
  )
}
