'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Droplets, Heart, Award, Zap, BarChart3 } from 'lucide-react'
import { ScrollAnimationWrapper } from '@/components/scroll-animations'
import HowItsMadeHero from '@/components/how-its-made-hero'

export default function HowItsMade() {
  const [activeStep, setActiveStep] = useState(0)

  const productionSteps = [
    {
      title: 'Sourcing & Harvesting',
      description: "We partner with local farmers across Ghana's fertile regions to source the finest peanuts.",
      details: [
        'Sustainable farming practices',
        'Handpicked selection process',
        'Immediate quality inspection',
      ],
    },
    {
      title: 'Cleaning & Sorting',
      description: 'Every peanut is thoroughly cleaned and sorted to remove any impurities.',
      details: [
        'Advanced cleaning machinery',
        'Manual quality control',
        'Size and quality standardization',
      ],
    },
    {
      title: 'Roasting to Perfection',
      description: 'Peanuts are roasted at precise temperatures to enhance flavor and aroma.',
      details: [
        'Temperature-controlled roasting',
        'Even heat distribution',
        'Optimal flavor development',
      ],
    },
    {
      title: 'Grinding & Processing',
      description: 'Roasted peanuts are ground into a smooth, creamy butter.',
      details: [
        'Multi-stage grinding process',
        'Natural oil extraction',
        'No additives or fillers',
      ],
    },
    {
      title: 'Quality Testing',
      description: 'Every batch undergoes rigorous testing for safety, taste, and consistency.',
      details: [
        'Microbiological testing',
        'Nutritional analysis',
        'Taste verification',
      ],
    },
    {
      title: 'Packaging & Distribution',
      description: 'Sealed in eco-friendly packaging and distributed to retailers nationwide.',
      details: [
        'Sustainable packaging materials',
        'Climate-controlled storage',
        'Efficient logistics',
      ],
    },
  ]

  const nutritionFacts = [
    { icon: Zap, label: 'Protein', value: '8g', detail: 'Per serving' },
    { icon: Droplets, label: 'Healthy Fats', value: '16g', detail: 'Per serving' },
    { icon: Heart, label: 'No Trans Fat', value: '0g', detail: 'Guaranteed' },
    { icon: Award, label: 'All Natural', value: '100%', detail: 'Pure peanuts' },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Premium Video Hero */}
      <HowItsMadeHero />

      {/* Production Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-16">
            <h2 className="text-5xl md:text-5xl font-black text-amber-900 mb-6 tracking-tight">
              Our 6-Step Craftsmanship Process
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              From sustainable farming to packaging, each step is executed with precision and passion
            </p>
          </ScrollAnimationWrapper>

          <div className="space-y-8">
            {productionSteps.map((step, idx) => (
              <ScrollAnimationWrapper
                key={idx}
                animationType="fadeInUp"
                delay={idx * 0.1}
                className={`p-8 rounded-xl border-2 transition-all cursor-pointer ${
                  activeStep === idx ? 'border-amber-600 bg-amber-50' : 'border-gray-200 hover:border-amber-400'
                }`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-black flex-shrink-0">
                    {idx + 1}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-amber-900 mb-3 leading-tight">{step.title}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed font-medium">{step.description}</p>
                    <ul className="space-y-2.5">
                      {step.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-sm md:text-base text-gray-600 font-medium leading-relaxed"
                        >
                          <span className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-1.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
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
              className="relative h-96 rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/peanut-farm-wide-premium.jpg"
                alt="Peanut Farm Cultivation"
                fill
                className="object-cover"
                priority
              />
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper animationType="fadeInRight" duration={0.8}>
              <h2 className="text-5xl md:text-5xl font-black text-amber-900 mb-6 tracking-tight">
                Our Sustainable Farms
              </h2>
              <p className="text-gray-700 text-lg md:text-lg mb-6 leading-relaxed font-medium">
                We operate over 500 hectares of dedicated peanut farms across Ghana's fertile regions. Each hectare is
                carefully managed using sustainable agricultural practices that respect the environment and support
                local communities.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white font-black text-lg">500+</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-amber-900 mb-1">Hectares Cultivated</h3>
                    <p className="text-gray-700 font-medium">Spread across multiple regions in Ghana</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-amber-900 mb-1">Sustainable Practices</h3>
                    <p className="text-gray-700 font-medium">Crop rotation, minimal pesticides, soil conservation</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-amber-900 mb-1">Community Support</h3>
                    <p className="text-gray-700 font-medium">Fair wages and support for local farming families</p>
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
          <ScrollAnimationWrapper animationType="fadeInDown" className="text-center mb-16">
            <h2 className="text-5xl md:text-5xl font-black text-amber-900 mb-6 tracking-tight">
              Hygiene & Safety Standards
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              We maintain the highest standards of personal hygiene and food safety throughout our production process
            </p>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'ISO 22000 Certified',
                description: 'International food safety management standards',
              },
              {
                icon: Zap,
                title: 'HACCP Compliant',
                description: 'Hazard analysis and critical control points protocol',
              },
              {
                icon: BarChart3,
                title: 'Regular Testing',
                description: 'Continuous quality monitoring and safety checks',
              },
            ].map((item, idx) => (
              <ScrollAnimationWrapper key={idx} animationType="scaleUp" delay={idx * 0.1}>
                <div className="p-8 rounded-xl border-2 border-gray-200 hover:border-amber-600 transition-all text-center">
                  <item.icon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700 font-medium">{item.description}</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-16">
            <h2 className="text-5xl md:text-5xl font-black text-amber-900 mb-6 tracking-tight">
              Our Simple Ingredient
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Stilla Peanut Butter contains just one ingredient: premium roasted peanuts. No additives, no
              preservatives, no shortcuts.
            </p>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollAnimationWrapper
              animationType="parallax"
              parallaxIntensity={0.5}
              className="relative h-96 rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/ingredients-display-premium.jpg"
                alt="Peanut Butter Ingredients"
                fill
                className="object-cover"
                priority
              />
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper animationType="fadeInLeft" duration={0.8}>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border-2 border-amber-200">
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">100% Peanuts</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    No added oils, salts, or sugars. Just pure, natural peanut goodness in every spoonful.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-amber-200">
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">Cold Pressed Process</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Our proprietary process preserves all the nutritional benefits and natural flavors without high heat
                    damage.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-amber-200">
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">Naturally Creamy</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    The natural oils in peanuts create a smooth, creamy texture without artificial emulsifiers.
                  </p>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Nutrition & Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollAnimationWrapper animationType="fadeInLeft" duration={0.8}>
              <h2 className="text-5xl md:text-5xl font-black text-amber-900 mb-6 tracking-tight">
                Packed with Nutrition
              </h2>
              <p className="text-gray-700 text-lg md:text-lg mb-8 leading-relaxed font-medium">
                Every spoonful of Stilla Peanut Butter delivers essential nutrients to support your health and energy
                levels throughout the day.
              </p>

              <div className="space-y-6">
                {nutritionFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <fact.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-900 text-lg">{fact.label}</h3>
                      <p className="text-gray-700">
                        <span className="font-bold">{fact.value}</span> - {fact.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper
              animationType="parallax"
              parallaxIntensity={0.3}
              className="relative h-96 rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/production-process-premium.jpg"
                alt="Production Process"
                fill
                className="object-cover"
              />
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper animationType="rotateIn" className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-5xl font-black mb-8 tracking-tight">Ready to Taste the Difference?</h2>
            <p className="text-xl md:text-2xl mb-10 text-amber-50 leading-relaxed font-medium">
              Experience the pure, natural taste of Stilla Peanut Butter crafted with care and tradition.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-amber-900 hover:bg-amber-50 font-bold text-lg group"
                asChild
              >
                <Link href="/checkout/stillapay-checkout">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold text-lg"
                asChild
              >
                <Link href="/recipes">Explore Recipes</Link>
              </Button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </main>
  )
}
